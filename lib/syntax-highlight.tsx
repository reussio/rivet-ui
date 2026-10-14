import {
  Highlight,
  normalizeTokens,
  Prism,
  type PrismGrammar,
  type PrismTheme,
  type Token as SyntaxToken,
} from "prism-react-renderer";

const languageAliases: Record<string, string> = {
  html: "markup",
  js: "javascript",
  jsx: "jsx",
  md: "markdown",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  tsx: "tsx",
  xml: "markup",
  yml: "yaml",
};

const shellGrammar: PrismGrammar = {
  comment: {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    greedy: true,
  },
  string: [
    {
      pattern: /"(?:\\[\s\S]|[^"\\])*"/,
      greedy: true,
    },
    {
      pattern: /'(?:[^']*)'/,
      greedy: true,
    },
  ],
  variable: [
    /\$(?:[a-z_][\w]*|\d+|[?$!#@*-])/i,
    {
      pattern: /\$\{[^}]+\}/,
      greedy: true,
    },
  ],
  option: {
    pattern: /(^|\s)--?[\w-]+(?:=[^\s]+)?/,
    lookbehind: true,
    alias: "attr-name",
  },
  command: {
    pattern: /(^|[\n;|&]\s*)[\w@./-]+/m,
    lookbehind: true,
    alias: "function",
  },
  symbol: /@[\w./-]+/,
  operator: /&&|\|\||[|;&]|>>?|<<?/,
  punctuation: /[()[\]{}]/,
};

if (!Prism.languages.bash) {
  Prism.languages.bash = shellGrammar;
}

const rivetSyntaxThemeClassName = [
  "[--syntax-comment:#6f7378]",
  "[--syntax-foreground:#24292e]",
  "[--syntax-function:#6f42c1]",
  "[--syntax-keyword:#d32f2f]",
  "[--syntax-number:#1976d2]",
  "[--syntax-punctuation:#212121]",
  "[--syntax-string:#22863a]",
  "[--syntax-text:#24292e]",
  "[--syntax-variable:#1976d2]",
  "dark:[--syntax-comment:#8b949e]",
  "dark:[--syntax-foreground:#b392f0]",
  "dark:[--syntax-function:#b392f0]",
  "dark:[--syntax-keyword:#f97583]",
  "dark:[--syntax-number:#f8f8f8]",
  "dark:[--syntax-punctuation:#bbbbbb]",
  "dark:[--syntax-string:#ffab70]",
  "dark:[--syntax-text:#f8f8f8]",
  "dark:[--syntax-variable:#79b8ff]",
].join(" ");

const rivetSyntaxTheme: PrismTheme = {
  plain: {
    color: "var(--syntax-foreground)",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "var(--syntax-comment)",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation", "operator", "entity", "url"],
      style: {
        color: "var(--syntax-punctuation)",
      },
    },
    {
      types: ["string", "char", "attr-value", "regex", "inserted"],
      style: {
        color: "var(--syntax-string)",
      },
    },
    {
      types: ["keyword", "module", "control-flow", "important", "atrule"],
      style: {
        color: "var(--syntax-keyword)",
      },
    },
    {
      types: ["function", "function-variable", "class-name", "builtin", "property", "tag"],
      style: {
        color: "var(--syntax-function)",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "var(--syntax-variable)",
      },
    },
    {
      types: ["boolean", "number", "constant", "symbol"],
      style: {
        color: "var(--syntax-number)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "var(--destructive)",
      },
    },
  ],
};

type SyntaxHighlightProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLinesOnHover?: boolean;
  softWrap?: boolean;
};

function normalizeLanguage(language: string | undefined) {
  const normalizedLanguage = language?.trim().toLowerCase() || "text";

  return languageAliases[normalizedLanguage] ?? normalizedLanguage;
}

function getLineIds(code: string) {
  const occurrences = new Map<string, number>();

  return code.split("\n").map((content) => {
    const occurrence = (occurrences.get(content) ?? 0) + 1;
    occurrences.set(content, occurrence);

    return `${content}-${occurrence}`;
  });
}

function findJsxTagEnd(content: string) {
  let braceDepth = 0;
  let quote: '"' | "'" | null = null;
  let isEscaped = false;

  for (let index = 1; index < content.length; index += 1) {
    const character = content[index];

    if (quote) {
      if (isEscaped) {
        isEscaped = false;
      } else if (character === "\\") {
        isEscaped = true;
      } else if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
    } else if (character === "{") {
      braceDepth += 1;
    } else if (character === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
    } else if (character === ">" && braceDepth === 0) {
      return index;
    }
  }

  return -1;
}

function normalizeEmbeddedJsxTags(tokens: SyntaxToken[][], language: string) {
  if (language !== "jsx" && language !== "tsx") {
    return tokens;
  }

  return tokens.map((line) =>
    line.flatMap((token) => {
      if (!token.types.includes("plain-text") || !/^<[A-Za-z]/.test(token.content)) {
        return token;
      }

      const normalized: SyntaxToken[] = [];
      let remainingContent = token.content;

      while (/^<[A-Za-z]/.test(remainingContent)) {
        const tagEnd = findJsxTagEnd(remainingContent);

        if (tagEnd === -1) {
          break;
        }

        const tag = remainingContent.slice(0, tagEnd + 1);
        const tagTokens = normalizeTokens(Prism.tokenize(tag, Prism.languages.jsx)).flat();
        normalized.push(...tagTokens);
        remainingContent = remainingContent.slice(tagEnd + 1);
      }

      if (remainingContent) {
        normalized.push({ ...token, content: remainingContent });
      }

      return normalized.length > 0 ? normalized : token;
    }),
  );
}

function getJsxTextTokenKeys(tokens: SyntaxToken[][], language: string) {
  const textTokenKeys = new Set<string>();

  if (language !== "jsx" && language !== "tsx") {
    return textTokenKeys;
  }

  let jsxDepth = 0;
  let expressionDepth = 0;
  let isInsideTag = false;
  let isClosingTag = false;

  tokens.forEach((line, lineIndex) => {
    line.forEach((token, tokenIndex) => {
      const { content, types } = token;

      if (isInsideTag) {
        if (content.includes("/>")) {
          isInsideTag = false;
          isClosingTag = false;
          return;
        }

        if (content.includes(">")) {
          jsxDepth = isClosingTag ? Math.max(0, jsxDepth - 1) : jsxDepth + 1;
          isInsideTag = false;
          isClosingTag = false;
        }

        return;
      }

      if (expressionDepth > 0) {
        expressionDepth += (content.match(/\{/g) ?? []).length;
        expressionDepth -= (content.match(/\}/g) ?? []).length;
        return;
      }

      if (jsxDepth > 0 && content.includes("{")) {
        expressionDepth = (content.match(/\{/g) ?? []).length - (content.match(/\}/g) ?? []).length;
        return;
      }

      const startsTag =
        (content === "<" || content === "</") && (types.includes("tag") || jsxDepth > 0);

      if (startsTag) {
        isInsideTag = true;
        isClosingTag = content === "</";
        return;
      }

      if (jsxDepth > 0 && content.trim()) {
        textTokenKeys.add(`${lineIndex}:${tokenIndex}`);
      }
    });
  });

  return textTokenKeys;
}

function SyntaxHighlight({
  code,
  language,
  showLineNumbers = false,
  highlightLinesOnHover = false,
  softWrap = false,
}: SyntaxHighlightProps) {
  const normalizedLanguage = normalizeLanguage(language);
  const lineIds = getLineIds(code);
  const lineNumberWidth = `calc(${String(lineIds.length).length}ch + 1.5rem)`;

  return (
    <Highlight code={code} language={normalizedLanguage} theme={rivetSyntaxTheme}>
      {({ tokens, getLineProps, getTokenProps }) => {
        const normalizedTokens = normalizeEmbeddedJsxTags(tokens, normalizedLanguage);
        const jsxTextTokenKeys = getJsxTextTokenKeys(normalizedTokens, normalizedLanguage);

        return (
          <code
            data-language={language}
            className={`language-${normalizedLanguage} ${rivetSyntaxThemeClassName} ${
              softWrap ? "block min-w-0 whitespace-pre-wrap wrap-anywhere" : ""
            }`}
          >
            {normalizedTokens.map((line, lineIndex) => {
              const lineProps = getLineProps({ line });
              const tokenOccurrences = new Map<string, number>();
              const content = line.map((token, tokenIndex) => {
                const tokenProps = getTokenProps({ token });
                const signature = `${token.types.join(":")}-${token.content}`;
                const occurrence = (tokenOccurrences.get(signature) ?? 0) + 1;
                tokenOccurrences.set(signature, occurrence);

                if (jsxTextTokenKeys.has(`${lineIndex}:${tokenIndex}`)) {
                  tokenProps.style = {
                    ...tokenProps.style,
                    color: "var(--syntax-text)",
                  };
                }

                return <span {...tokenProps} key={`${signature}-${occurrence}`} />;
              });

              if (showLineNumbers || highlightLinesOnHover) {
                return (
                  <span
                    {...lineProps}
                    key={lineIds[lineIndex]}
                    className={`${lineProps.className} flex w-full ${
                      softWrap ? "min-w-0" : "min-w-max"
                    } ${
                      highlightLinesOnHover
                        ? "transition-colors duration-100 hover:bg-muted/50 motion-reduce:transition-none"
                        : ""
                    }`}
                  >
                    {showLineNumbers ? (
                      <span
                        key="line-number"
                        aria-hidden="true"
                        className="shrink-0 select-none border-r border-border pr-2 pl-4 text-right tabular-nums text-muted-foreground/60"
                        style={{ width: lineNumberWidth }}
                      >
                        {lineIndex + 1}
                      </span>
                    ) : null}
                    <span
                      key="line-content"
                      className={`px-4 ${
                        softWrap
                          ? "min-w-0 flex-1 whitespace-pre-wrap wrap-anywhere"
                          : "min-w-max flex-1 whitespace-pre"
                      }`}
                    >
                      {content}
                    </span>
                  </span>
                );
              }

              return (
                <span {...lineProps} key={lineIds[lineIndex]}>
                  {content}
                  {lineIndex < normalizedTokens.length - 1 ? "\n" : null}
                </span>
              );
            })}
          </code>
        );
      }}
    </Highlight>
  );
}

export type { SyntaxHighlightProps };
export { SyntaxHighlight };
