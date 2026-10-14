import { ComponentExample } from "@/app/component-example";
import { Input } from "@/registry/rivetui/components/input/input";

const defaultCode = `import { Input } from "@/components/ui/input"

export function EmailInput() {
  return <Input type="email" placeholder="ops@rivet.run" aria-label="Email address" />
}`;

const statesCode = `import { Input } from "@/components/ui/input"

export function InputStates() {
  return (
    <div className="grid gap-3">
      <Input aria-label="Workspace" defaultValue="rivet-production" />
      <Input aria-label="Invalid token" defaultValue="invalid-token" aria-invalid />
      <Input aria-label="Archived project" defaultValue="Archived project" disabled />
    </div>
  )
}`;

const nativeTypesCode = `import { Input } from "@/components/ui/input"

export function NativeInputTypes() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input type="email" placeholder="name@example.com" aria-label="Email address" />
      <Input type="password" defaultValue="rivet-pass" aria-label="Password" />
      <Input type="search" placeholder="Search…" aria-label="Search" />
      <Input type="date" aria-label="Start date" />
    </div>
  )
}`;

export function InputPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Use the native input type that matches the value being collected."
        code={defaultCode}
      >
        <Input
          className="max-w-md"
          type="email"
          placeholder="ops@rivet.run"
          aria-label="Email address"
        />
      </ComponentExample>

      <ComponentExample
        title="States"
        description="Populated, invalid, and disabled inputs share the same geometry and semantic state treatment."
        code={statesCode}
      >
        <div className="grid w-full max-w-md gap-3">
          <Input aria-label="Workspace" defaultValue="rivet-production" />
          <Input aria-label="Invalid token" defaultValue="invalid-token" aria-invalid />
          <Input aria-label="Archived project" defaultValue="Archived project" disabled />
        </div>
      </ComponentExample>

      <ComponentExample
        title="Native types"
        description="Preserve browser behavior by forwarding native email, password, search, and date types."
        code={nativeTypesCode}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Input type="email" placeholder="name@example.com" aria-label="Email address" />
          <Input type="password" defaultValue="rivet-pass" aria-label="Password" />
          <Input type="search" placeholder="Search…" aria-label="Search" />
          <Input type="date" aria-label="Start date" />
        </div>
      </ComponentExample>
    </div>
  );
}
