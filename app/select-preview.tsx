import { ComponentExample } from "@/app/component-example";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/rivetui/components/select/select";

const runtimeItems = [
  { label: "Node.js 24", value: "node" },
  { label: "Bun 1.3", value: "bun" },
  { label: "Deno 2", value: "deno" },
];

const databaseItems = [
  { label: "PostgreSQL", value: "postgres" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongo" },
];

const regionItems = [{ label: "Europe", value: "eu" }];
const lockedItems = [{ label: "Locked", value: "locked" }];

const defaultCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const runtimes = [
  { label: "Node.js 24", value: "node" },
  { label: "Bun 1.3", value: "bun" },
  { label: "Deno 2", value: "deno" },
]

export function RuntimeSelect() {
  return (
    <Select items={runtimes} defaultValue="node">
      <SelectTrigger className="max-w-sm" aria-label="Runtime">
        <SelectValue placeholder="Choose a runtime" />
      </SelectTrigger>
      <SelectContent>
        {runtimes.map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}`;

const groupedCode = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const databases = [
  { label: "PostgreSQL", value: "postgres" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongo" },
]

export function DatabaseSelect() {
  return (
    <Select items={databases} defaultValue="postgres">
      <SelectTrigger className="max-w-sm" aria-label="Database engine"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Relational</SelectLabel>
          <SelectItem value="postgres">PostgreSQL</SelectItem>
          <SelectItem value="mysql">MySQL</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Document</SelectLabel>
          <SelectItem value="mongo">MongoDB</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`;

const statesCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectStates() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      <Select items={[{ label: "Europe", value: "eu" }]}>
        <SelectTrigger aria-label="Region"><SelectValue placeholder="Choose a region" /></SelectTrigger>
        <SelectContent><SelectItem value="eu">Europe</SelectItem></SelectContent>
      </Select>
      <Select items={[{ label: "Locked", value: "locked" }]} defaultValue="locked" disabled>
        <SelectTrigger aria-label="Locked"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="locked">Locked</SelectItem></SelectContent>
      </Select>
    </div>
  )
}`;

export function SelectPreview() {
  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Default"
        description="Use a compact trigger for choosing one value from a known list."
        code={defaultCode}
      >
        <Select items={runtimeItems} defaultValue="node">
          <SelectTrigger className="max-w-sm" aria-label="Runtime">
            <SelectValue placeholder="Choose a runtime" />
          </SelectTrigger>
          <SelectContent>
            {runtimeItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ComponentExample>

      <ComponentExample
        title="Grouped options"
        description="Labels and separators make longer option sets easier to scan."
        code={groupedCode}
      >
        <Select items={databaseItems} defaultValue="postgres">
          <SelectTrigger className="max-w-sm" aria-label="Database engine">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Relational</SelectLabel>
              <SelectItem value="postgres">PostgreSQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Document</SelectLabel>
              <SelectItem value="mongo">MongoDB</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ComponentExample>

      <ComponentExample
        title="States"
        description="Placeholder and disabled states retain the same trigger dimensions."
        code={statesCode}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Select items={regionItems}>
            <SelectTrigger aria-label="Region">
              <SelectValue placeholder="Choose a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eu">Europe</SelectItem>
            </SelectContent>
          </Select>
          <Select items={lockedItems} defaultValue="locked" disabled>
            <SelectTrigger aria-label="Locked">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentExample>
    </div>
  );
}
