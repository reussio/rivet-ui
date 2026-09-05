import { Highlight, type PrismTheme } from "prism-react-renderer";

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
        color: "color-mix(in oklab, var(--foreground) 72%, var(--muted-foreground))",
      },
    },
    {
      types: ["keyword", "module", "control-flow", "important", "atrule"],
      style: {
        color: "var(--foreground)",
        fontWeight: "600",
      },
    },
    {
      types: [
        "function",
        "function-variable",
        "class-name",
        "builtin",
        "property",
        "tag",
        "attr-name",
      ],
      style: {
        color: "color-mix(in oklab, var(--foreground) 88%, var(--muted-foreground))",
        fontWeight: "600",
      },
    },
    {
      types: ["boolean", "number", "constant", "symbol", "variable"],
      style: {
        color: "color-mix(in oklab, var(--foreground) 80%, var(--muted-foreground))",
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

function SyntaxHighlight({ code, language, showLineNumbers = false }: SyntaxHighlightProps) {
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

            if (showLineNumbers) {
              return (
                <span
                  {...lineProps}
                  key={lineIds[lineIndex]}
                  className={`${lineProps.className} table w-full min-w-max table-fixed`}
                >
                  <span
                    key="line-number"
                    aria-hidden="true"
                    className="table-cell w-12 select-none border-r border-border pr-3 text-right tabular-nums text-muted-foreground/60"
                  >
                    {lineIndex + 1}
                  </span>
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
