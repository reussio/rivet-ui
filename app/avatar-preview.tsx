import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/rivetui/components/avatar/avatar";

const portrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23d4d4d4'/%3E%3Cpath d='M19 96c2-23 13-34 29-34s27 11 29 34' fill='%23525252'/%3E%3Ccircle cx='48' cy='39' r='21' fill='%23808080'/%3E%3Cpath d='M28 34c4-17 34-25 42 1-9-4-13-12-15-18-5 10-14 15-27 17Z' fill='%23383838'/%3E%3C/svg%3E";

export function AvatarPreview() {
  return (
    <section className="w-full border border-border bg-background" aria-labelledby="avatar-title">
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Primitive / 036
          </p>
          <h2 id="avatar-title" className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Avatar
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Identity
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <div className="flex items-center gap-4 border border-border p-4 sm:p-5">
            <Avatar size="lg">
              <AvatarImage src={portrait} alt="Portrait of Ada Lovelace" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Ada Lovelace</p>
              <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                platform / owner
              </p>
            </div>
            <span className="ml-auto size-2 shrink-0 bg-emerald-500" role="status">
              <span className="sr-only">Online</span>
            </span>
          </div>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Element" detail="span" />
            <Specification term="Shape" detail="square" />
            <Specification term="Fallback" detail="native" />
            <Specification term="Sizes" detail="03" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Sizes">
          <Avatar size="sm" aria-label="Ada Lovelace">
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar aria-label="Grace Hopper">
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
          <Avatar size="lg" aria-label="Margaret Hamilton">
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
        </PreviewRow>

        <PreviewRow label="Fallback">
          <Avatar aria-label="Failed image fallback">
            <AvatarImage src="/missing-avatar.png" alt="" />
            <AvatarFallback>TR</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">Shown automatically when an image fails.</p>
        </PreviewRow>

        <PreviewRow label="Group">
          <AvatarGroup aria-label="Deployment team">
            <Avatar aria-label="Ada Lovelace">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar aria-label="Grace Hopper">
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
            <Avatar aria-label="Margaret Hamilton">
              <AvatarFallback>MH</AvatarFallback>
            </Avatar>
            <AvatarGroupCount aria-label="4 more members">+4</AvatarGroupCount>
          </AvatarGroup>
        </PreviewRow>
      </div>
    </section>
  );
}

function Specification({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-4 p-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="text-right">{detail}</dd>
    </div>
  );
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="border-b border-border p-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:border-r md:border-b-0">
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </div>
  );
}
