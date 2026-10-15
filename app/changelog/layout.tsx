import { DocsHeader } from "@/app/docs-navigation";

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#content"
        className="fixed top-2 left-2 z-50 -translate-y-20 border border-foreground bg-background px-3 py-2 text-sm focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <DocsHeader active="changelog" />
      {children}
    </div>
  );
}
