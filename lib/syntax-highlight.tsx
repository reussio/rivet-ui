import { Highlight, Prism, type PrismGrammar, type PrismTheme } from "prism-react-renderer";

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
  "[--syntax-variable:#1976d2]",
  "dark:[--syntax-comment:#8b949e]",
  "dark:[--syntax-foreground:#b392f0]",
  "dark:[--syntax-function:#b392f0]",
  "dark:[--syntax-keyword:#f97583]",
  "dark:[--syntax-number:#f8f8f8]",
  "dark:[--syntax-punctuation:#bbbbbb]",
  "dark:[--syntax-string:#ffab70]",
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

function SyntaxHighlight({
  code,
  language,
  showLineNumbers = false,
  highlightLinesOnHover = false,
}: SyntaxHighlightProps) {
  const normalizedLanguage = normalizeLanguage(language);
  const lineIds = getLineIds(code);
  const lineNumberWidth = `calc(${String(lineIds.length).length}ch + 1.5rem)`;

  return (
    <Highlight code={code} language={normalizedLanguage} theme={rivetSyntaxTheme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <code
          data-language={language}
          className={`language-${normalizedLanguage} ${rivetSyntaxThemeClassName}`}
        >
          {tokens.map((line, lineIndex) => {
            const lineProps = getLineProps({ line });
            const tokenOccurrences = new Map<string, number>();
            const content = line.map((token) => {
              const tokenProps = getTokenProps({ token });
              const signature = `${token.types.join(":")}-${token.content}`;
              const occurrence = (tokenOccurrences.get(signature) ?? 0) + 1;
              tokenOccurrences.set(signature, occurrence);

              return <span {...tokenProps} key={`${signature}-${occurrence}`} />;
            });

            if (showLineNumbers || highlightLinesOnHover) {
              return (
                <span
                  {...lineProps}
                  key={lineIds[lineIndex]}
                  className={`${lineProps.className} table w-full min-w-max table-fixed ${
                    highlightLinesOnHover
                      ? "transition-colors duration-100 hover:bg-muted/50 motion-reduce:transition-none"
                      : ""
                  }`}
                >
                  {showLineNumbers ? (
                    <span
                      key="line-number"
                      aria-hidden="true"
                      className="table-cell select-none border-r border-border pr-2 pl-4 text-right tabular-nums text-muted-foreground/60"
                      style={{ width: lineNumberWidth }}
                    >
                      {lineIndex + 1}
                    </span>
                  ) : null}
                  <span key="line-content" className="table-cell px-4 whitespace-pre">
                    {content}
                  </span>
                </span>
              );
            }

            return (
              <span {...lineProps} key={lineIds[lineIndex]}>
                {content}
                {lineIndex < tokens.length - 1 ? "\n" : null}
              </span>
            );
          })}
        </code>
      )}
    </Highlight>
  );
}

export type { SyntaxHighlightProps };
export { SyntaxHighlight };
