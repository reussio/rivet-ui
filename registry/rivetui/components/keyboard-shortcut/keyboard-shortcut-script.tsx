type KeyboardShortcutScriptProps = {
  nonce?: string;
};

function KeyboardShortcutScript({ nonce }: KeyboardShortcutScriptProps) {
  const script = `try{var n=navigator;var h=n.userAgentData&&n.userAgentData.platform;var s=[h,n.platform,n.userAgent].filter(Boolean).join(" ").toLowerCase();var p=/mac|iphone|ipad|ipod/.test(s)?"mac":s.includes("win")?"windows":/linux|android/.test(s)?"linux":"unknown";document.documentElement.dataset.rivetPlatform=p}catch(e){}`;

  return (
    <script
      id="rivet-ui-platform"
      nonce={nonce}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: The script is static and contains no consumer-controlled values.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

export type { KeyboardShortcutScriptProps };
export { KeyboardShortcutScript };
