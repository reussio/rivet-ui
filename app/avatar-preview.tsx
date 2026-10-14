import { ComponentExample } from "@/app/component-example";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/rivetui/components/avatar/avatar";

const primaryCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const portrait = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23d4d4d4'/%3E%3Cpath d='M19 96c2-23 13-34 29-34s27 11 29 34' fill='%23525252'/%3E%3Ccircle cx='48' cy='39' r='21' fill='%23808080'/%3E%3Cpath d='M28 34c4-17 34-25 42 1-9-4-13-12-15-18-5 10-14 15-27 17Z' fill='%23383838'/%3E%3C/svg%3E"

export function UserIdentity() {
  return (
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
  )
}`;

const sizesCode = `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
export function SizesExample() {
  return (
    <>
      <Avatar size="sm" aria-label="Ada Lovelace">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar aria-label="Grace Hopper">
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar size="lg" aria-label="Margaret Hamilton">
        <AvatarFallback>MH</AvatarFallback>
      </Avatar>
    </>
  );
}`;

const groupCode = `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
export function GroupExample() {
  return (
    <>
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
    </>
  );
}`;

const portrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23d4d4d4'/%3E%3Cpath d='M19 96c2-23 13-34 29-34s27 11 29 34' fill='%23525252'/%3E%3Ccircle cx='48' cy='39' r='21' fill='%23808080'/%3E%3Cpath d='M28 34c4-17 34-25 42 1-9-4-13-12-15-18-5 10-14 15-27 17Z' fill='%23383838'/%3E%3C/svg%3E";

export function AvatarPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Pair an image with initials so identity remains visible while the asset loads or fails."
        note="AvatarFallback is shown automatically when AvatarImage is unavailable."
        code={primaryCode}
        previewClassName="p-0"
      >
        <div className="p-5 sm:p-8">
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
      </ComponentExample>

      <PreviewRow
        label="Sizes"
        description="Use the three semantic sizes to align avatars with compact controls, rows, or profile summaries."
        code={sizesCode}
      >
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
      <PreviewRow
        label="Group"
        description="Collapse a team into overlapping identities and summarize the remainder with AvatarGroupCount."
        code={groupCode}
      >
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
  );
}

function PreviewRow({
  label,
  children,
  code,
  description,
}: {
  label: string;
  children: React.ReactNode;
  code: string;
  description?: string;
}) {
  return (
    <ComponentExample title={label} description={description} code={code}>
      <div className="flex min-w-0 flex-wrap items-center gap-4 p-4">{children}</div>
    </ComponentExample>
  );
}
