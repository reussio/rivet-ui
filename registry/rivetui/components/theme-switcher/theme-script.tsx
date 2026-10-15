type Theme = "light" | "dark" | "system";

type ThemeScriptProps = {
  defaultTheme?: Theme;
  nonce?: string;
  storageKey?: string;
};

function ThemeScript({ defaultTheme = "system", storageKey = "theme", nonce }: ThemeScriptProps) {
  const serializedStorageKey = serializeScriptValue(storageKey);
  const serializedDefaultTheme = serializeScriptValue(defaultTheme);
  const script = `try{var t=localStorage.getItem(${serializedStorageKey})||${serializedDefaultTheme};var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}`;

  return (
    <script
      id="rivet-ui-theme"
      nonce={nonce}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Values are JSON-encoded and escaped before insertion.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

function serializeScriptValue(value: string) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export type { ThemeScriptProps };
export { ThemeScript };
