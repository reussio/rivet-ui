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

const rivetSyntaxTheme: PrismTheme = {
  plain: {
    color: "var(--foreground)",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "var(--muted-foreground)",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation", "operator", "entity", "url"],
      style: {
        color: "color-mix(in oklab, var(--muted-foreground) 84%, transparent)",
      },
    },
    {
      types: ["string", "char", "attr-value", "regex", "inserted"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 42%, oklch(0.74 0.14 155))",
      },
    },
    {
      types: ["keyword", "module", "control-flow", "important", "atrule"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 42%, oklch(0.72 0.15 300))",
        fontWeight: "600",
      },
    },
    {
      types: ["function", "function-variable", "class-name", "builtin", "property", "tag"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 42%, oklch(0.72 0.14 235))",
        fontWeight: "600",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 42%, oklch(0.74 0.14 300))",
      },
    },
    {
      types: ["boolean", "number", "constant", "symbol"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 42%, oklch(0.78 0.13 75))",
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

  return (
    <Highlight code={code} language={normalizedLanguage} theme={rivetSyntaxTheme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <code data-language={language} className={`language-${normalizedLanguage}`}>
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
                      className="table-cell w-12 select-none border-r border-border pr-3 text-right tabular-nums text-muted-foreground/60"
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
