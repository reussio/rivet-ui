const code = (...lines: string[]) => lines.join("\n");

export type ComponentDoc = {
  readonly number: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly usage: string;
  readonly notes: readonly {
    readonly title: string;
    readonly description: string;
    readonly code: string;
  }[];
  readonly api: readonly {
    readonly name: string;
    readonly type: string;
    readonly defaultValue: string;
  }[];
};

export const componentDocs = [
  {
    number: "019",
    name: "Accordion",
    slug: "accordion",
    description: "Organizes related disclosure regions in a semantic, keyboard-accessible set.",
    usage: code(
      'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"',
      "",
      '<Accordion defaultValue={["deployment"]}>',
      '  <AccordionItem value="deployment">',
      "    <AccordionTrigger>Deployment pipeline</AccordionTrigger>",
      "    <AccordionContent>Build, verify, and release.</AccordionContent>",
      "  </AccordionItem>",
      "</Accordion>",
    ),
    notes: [
      {
        title: "Single or multiple",
        description: "Allow one panel or several panels to remain expanded.",
        code: '<Accordion multiple defaultValue={["build", "deploy"]}>…</Accordion>',
      },
      {
        title: "Disabled item",
        description: "Keep unavailable sections visible without making them interactive.",
        code: '<AccordionItem value="legacy" disabled>…</AccordionItem>',
      },
    ],
    api: [
      { name: "value", type: "string[]", defaultValue: "—" },
      { name: "defaultValue", type: "string[]", defaultValue: "[]" },
      { name: "multiple", type: "boolean", defaultValue: "false" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "022",
    name: "Alert",
    slug: "alert",
    description: "Communicates contextual information, success, warnings, and failures.",
    usage: code(
      'import { Alert, AlertContent, AlertDescription, AlertTitle } from "@/components/ui/alert"',
      "",
      '<Alert variant="warning">',
      "  <AlertContent>",
      "    <AlertTitle>Production variables changed</AlertTitle>",
      "    <AlertDescription>Create a new deployment to apply them.</AlertDescription>",
      "  </AlertContent>",
      "</Alert>",
    ),
    notes: [
      {
        title: "Semantic tone",
        description: "Use color only to reinforce the meaning already present in the copy.",
        code: '<Alert variant="destructive">…</Alert>',
      },
      {
        title: "Optional action",
        description: "Place a concise follow-up control in the dedicated action region.",
        code: '<AlertAction><Button size="sm">Review</Button></AlertAction>',
      },
    ],
    api: [
      {
        name: "variant",
        type: '"default" | "success" | "warning" | "destructive"',
        defaultValue: '"default"',
      },
      { name: "role", type: "React.AriaRole", defaultValue: '"alert"' },
      { name: "className", type: "string", defaultValue: "—" },
    ],
  },
  {
    number: "016",
    name: "Badge / Status",
    slug: "badge",
    description: "Displays compact metadata or a restrained operational state.",
    usage: code(
      'import { Badge, Status } from "@/components/ui/badge"',
      "",
      '<Badge variant="outline">FRA1</Badge>',
      '<Status tone="success">Operational</Status>',
    ),
    notes: [
      {
        title: "Badge",
        description: "Use badges for identifiers, versions, filters, and compact metadata.",
        code: '<Badge variant="secondary">Preview</Badge>',
      },
      {
        title: "Status",
        description: "Use a status when the value describes a live operational condition.",
        code: '<Status tone="warning">Degraded</Status>',
      },
    ],
    api: [
      {
        name: "Badge.variant",
        type: '"default" | "secondary" | "outline" | "destructive"',
        defaultValue: '"default"',
      },
      {
        name: "Status.tone",
        type: '"neutral" | "success" | "warning" | "destructive"',
        defaultValue: '"neutral"',
      },
    ],
  },
  {
    number: "001",
    name: "Button",
    slug: "button",
    description: "Displays an interactive control for actions.",
    usage: code('import { Button } from "@/components/ui/button"', "", "<Button>Execute</Button>"),
    notes: [
      {
        title: "Variants",
        description: "Choose hierarchy by intent rather than by decoration.",
        code: '<Button variant="secondary">Review output</Button>',
      },
      {
        title: "Icon only",
        description: "Icon-only controls always need an accessible name.",
        code: '<Button size="icon" aria-label="Create item"><Plus /></Button>',
      },
      {
        title: "As a link",
        description: "Apply buttonVariants to a plain anchor to preserve link semantics.",
        code: '<a className={buttonVariants()} href="/deployments">Deployments</a>',
      },
    ],
    api: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
        defaultValue: '"default"',
      },
      {
        name: "size",
        type: '"sm" | "default" | "lg" | "icon-sm" | "icon" | "icon-lg"',
        defaultValue: '"default"',
      },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "nativeButton", type: "boolean", defaultValue: "true" },
      { name: "render", type: "ReactElement | function", defaultValue: "—" },
    ],
  },
  {
    number: "011",
    name: "Card",
    slug: "card",
    description: "Groups related content and actions into clearly defined regions.",
    usage: code(
      'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"',
      "",
      "<Card>",
      "  <CardHeader>",
      "    <CardTitle>Production gateway</CardTitle>",
      "    <CardDescription>Public traffic entry point.</CardDescription>",
      "  </CardHeader>",
      "  <CardContent>Operational</CardContent>",
      "</Card>",
    ),
    notes: [
      {
        title: "Composable regions",
        description: "Use only the header, content, action, and footer regions the content needs.",
        code: "<Card><CardHeader>…</CardHeader><CardFooter>…</CardFooter></Card>",
      },
      {
        title: "Content only",
        description: "A card may contain one region when additional hierarchy adds no value.",
        code: "<Card><CardContent>Build / 8F31C2A</CardContent></Card>",
      },
    ],
    api: [
      { name: "Card", type: 'React.ComponentProps<"div">', defaultValue: "—" },
      { name: "CardHeader", type: 'React.ComponentProps<"div">', defaultValue: "—" },
      { name: "CardContent", type: 'React.ComponentProps<"div">', defaultValue: "—" },
      { name: "CardFooter", type: 'React.ComponentProps<"div">', defaultValue: "—" },
    ],
  },
  {
    number: "004",
    name: "Checkbox",
    slug: "checkbox",
    description: "Lets a user toggle a binary or indeterminate choice.",
    usage: code(
      'import { Checkbox } from "@/components/ui/checkbox"',
      "",
      '<Checkbox id="telemetry" defaultChecked />',
      '<label htmlFor="telemetry">Anonymous telemetry</label>',
    ),
    notes: [
      {
        title: "Indeterminate",
        description: "Represent a partially selected collection without implying a third value.",
        code: '<Checkbox indeterminate aria-label="Partially selected" />',
      },
      {
        title: "Validation",
        description:
          "An invalid control shows a red border; its focus ring appears only on keyboard focus.",
        code: '<Checkbox aria-invalid="true" />',
      },
    ],
    api: [
      { name: "checked", type: "boolean", defaultValue: "—" },
      { name: "defaultChecked", type: "boolean", defaultValue: "false" },
      { name: "indeterminate", type: "boolean", defaultValue: "false" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "readOnly", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "028",
    name: "Code Block",
    slug: "code-block",
    description: "Presents source code with file metadata, copying, and optional line numbers.",
    usage: code(
      'import { CodeBlock } from "@/components/ui/code-block"',
      "",
      "<CodeBlock",
      '  filename="route.ts"',
      '  language="tsx"',
      "  code={source}",
      "  showLineNumbers",
      "/>",
    ),
    notes: [
      {
        title: "Metadata",
        description: "Filename and language remain visible without competing with the source.",
        code: '<CodeBlock filename="route.ts" language="tsx" code={source} />',
      },
      {
        title: "Line numbers",
        description: "Enable line numbers when readers need to reference exact locations.",
        code: "<CodeBlock code={source} showLineNumbers />",
      },
      {
        title: "Content only",
        description: "Remove the header when no metadata or copy action is required.",
        code: "<CodeBlock code={source} copyable={false} />",
      },
    ],
    api: [
      { name: "code", type: "string", defaultValue: "—" },
      { name: "language", type: "string", defaultValue: "—" },
      { name: "filename", type: "string", defaultValue: "—" },
      { name: "copyable", type: "boolean", defaultValue: "true" },
      { name: "showLineNumbers", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "029",
    name: "Combobox",
    slug: "combobox",
    description: "Combines text search and single selection in one keyboard-ready control.",
    usage: code(
      'import { Combobox, ComboboxContent, ComboboxInput, ComboboxInputGroup, ComboboxItem, ComboboxList, ComboboxTrigger } from "@/components/ui/combobox"',
      "",
      "<Combobox items={regions} autoHighlight>",
      "  <ComboboxInputGroup>",
      '    <ComboboxInput placeholder="Search regions" />',
      '    <ComboboxTrigger aria-label="Open regions" />',
      "  </ComboboxInputGroup>",
      "  <ComboboxContent>",
      "    <ComboboxList>",
      "      {(region) => (",
      "        <ComboboxItem key={region} value={region}>{region}</ComboboxItem>",
      "      )}",
      "    </ComboboxList>",
      "  </ComboboxContent>",
      "</Combobox>",
    ),
    notes: [
      {
        title: "Filtering",
        description:
          "Pass the complete collection to items so Base UI can filter it as the query changes.",
        code: "<Combobox items={regions}>…</Combobox>",
      },
      {
        title: "Empty result",
        description: "Keep a polite empty state mounted so screen readers receive result changes.",
        code: "<ComboboxEmpty>No regions found.</ComboboxEmpty>",
      },
      {
        title: "Keyboard",
        description:
          "Arrow keys move the active option, Enter selects, and Escape closes the popup.",
        code: "<Combobox items={regions} autoHighlight>…</Combobox>",
      },
    ],
    api: [
      { name: "items", type: "readonly Item[]", defaultValue: "—" },
      { name: "value", type: "Value | null", defaultValue: "—" },
      { name: "defaultValue", type: "Value | null", defaultValue: "—" },
      { name: "onValueChange", type: "(value: Value | null) => void", defaultValue: "—" },
      { name: "autoHighlight", type: "boolean", defaultValue: "false" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "031",
    name: "Command Bar",
    slug: "command-bar",
    description: "Searches and executes grouped application actions from a modal keyboard surface.",
    usage: code(
      'import { CommandBar, CommandBarTrigger } from "@/components/ui/command-bar"',
      "",
      "<CommandBar actions={actions}>",
      "  <CommandBarTrigger render={<Button />}>Open commands</CommandBarTrigger>",
      "</CommandBar>",
    ),
    notes: [
      {
        title: "Global shortcut",
        description: "The default Mod+K shortcut opens the bar on macOS and Windows keyboards.",
        code: "<CommandBar actions={actions} hotkey>…</CommandBar>",
      },
      {
        title: "Search metadata",
        description: "Labels, descriptions, groups, and keywords all participate in filtering.",
        code: '{ id: "deploy", label: "Deploy", keywords: ["publish", "release"] }',
      },
      {
        title: "Selection",
        description: "Arrow keys move the active command and Enter executes it.",
        code: "<CommandBar actions={actions} onActionSelect={runAction}>…</CommandBar>",
      },
    ],
    api: [
      { name: "actions", type: "readonly CommandBarAction[]", defaultValue: "—" },
      { name: "open", type: "boolean", defaultValue: "—" },
      { name: "defaultOpen", type: "boolean", defaultValue: "false" },
      { name: "hotkey", type: "boolean", defaultValue: "true" },
      { name: "closeOnSelect", type: "boolean", defaultValue: "true" },
      { name: "onActionSelect", type: "(action) => void", defaultValue: "—" },
    ],
  },
  {
    number: "020",
    name: "Collapsible",
    slug: "collapsible",
    description: "Reveals or hides one related region from a persistent trigger.",
    usage: code(
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"',
      "",
      "<Collapsible>",
      "  <CollapsibleTrigger>Advanced routing rules</CollapsibleTrigger>",
      "  <CollapsibleContent>Primary region: fra1</CollapsibleContent>",
      "</Collapsible>",
    ),
    notes: [
      {
        title: "Uncontrolled",
        description: "Use defaultOpen when the parent does not need to own the state.",
        code: "<Collapsible defaultOpen>…</Collapsible>",
      },
      {
        title: "Controlled",
        description: "Provide open and onOpenChange when disclosure state affects other UI.",
        code: "<Collapsible open={open} onOpenChange={setOpen}>…</Collapsible>",
      },
    ],
    api: [
      { name: "open", type: "boolean", defaultValue: "—" },
      { name: "defaultOpen", type: "boolean", defaultValue: "false" },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "012",
    name: "Dialog",
    slug: "dialog",
    description: "Presents a modal task with managed focus and explicit dismissal.",
    usage: code(
      'import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"',
      "",
      "<Dialog>",
      "  <DialogTrigger>New deployment</DialogTrigger>",
      "  <DialogContent>",
      "    <DialogTitle>Create deployment</DialogTitle>",
      "  </DialogContent>",
      "</Dialog>",
    ),
    notes: [
      {
        title: "Structured content",
        description: "Compose header, body, and footer regions around the task.",
        code: "<DialogContent><DialogHeader>…</DialogHeader><DialogBody>…</DialogBody></DialogContent>",
      },
      {
        title: "Custom close control",
        description: "Hide the built-in close button only when another clear dismissal is present.",
        code: "<DialogContent showCloseButton={false}>…</DialogContent>",
      },
    ],
    api: [
      { name: "open", type: "boolean", defaultValue: "—" },
      { name: "defaultOpen", type: "boolean", defaultValue: "false" },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—" },
      { name: "showCloseButton", type: "boolean", defaultValue: "true" },
    ],
  },
  {
    number: "014",
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description: "Presents contextual actions and selection controls from a compact trigger.",
    usage: code(
      'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"',
      "",
      "<DropdownMenu>",
      "  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>",
      "  <DropdownMenuContent>",
      "    <DropdownMenuItem>Inspect deployment</DropdownMenuItem>",
      "  </DropdownMenuContent>",
      "</DropdownMenu>",
    ),
    notes: [
      {
        title: "Selection controls",
        description: "Checkbox and radio items keep menu selection compact and keyboard-ready.",
        code: "<DropdownMenuCheckboxItem checked={visible}>Visible</DropdownMenuCheckboxItem>",
      },
      {
        title: "Nested menu",
        description: "Use a submenu only when grouping avoids a long, flat action list.",
        code: "<DropdownMenuSub><DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>…</DropdownMenuSub>",
      },
    ],
    api: [
      { name: "open", type: "boolean", defaultValue: "—" },
      { name: "defaultOpen", type: "boolean", defaultValue: "false" },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: '"end"',
      },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"bottom"',
      },
      { name: "sideOffset", type: "number", defaultValue: "6" },
    ],
  },
  {
    number: "003",
    name: "Field",
    slug: "field",
    description: "Connects a control with its label, supporting text, and validation message.",
    usage: code(
      'import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"',
      'import { Input } from "@/components/ui/input"',
      "",
      "<Field>",
      '  <FieldLabel htmlFor="endpoint">Endpoint</FieldLabel>',
      '  <Input id="endpoint" />',
      "  <FieldDescription>The public base URL.</FieldDescription>",
      "</Field>",
    ),
    notes: [
      {
        title: "Description",
        description:
          "Keep supporting text concise and connect it with aria-describedby when needed.",
        code: '<FieldDescription id="endpoint-description">Public base URL.</FieldDescription>',
      },
      {
        title: "Error",
        description: "Use FieldError for a concise, actionable validation message.",
        code: '<FieldError id="endpoint-error">Enter a valid URL.</FieldError>',
      },
    ],
    api: [
      { name: "Field", type: 'React.ComponentProps<"div">', defaultValue: "—" },
      { name: "FieldLabel", type: 'React.ComponentProps<"label">', defaultValue: "—" },
      { name: "FieldDescription", type: 'React.ComponentProps<"p">', defaultValue: "—" },
      { name: "FieldError.role", type: "React.AriaRole", defaultValue: '"alert"' },
    ],
  },
  {
    number: "002",
    name: "Input",
    slug: "input",
    description: "Accepts a single line of native text, search, date, or numeric input.",
    usage: code(
      'import { Input } from "@/components/ui/input"',
      "",
      '<Input type="email" placeholder="ops@rivet.run" />',
    ),
    notes: [
      {
        title: "Native types",
        description: "Use the platform input type that matches the expected value.",
        code: '<Input type="search" aria-label="Filter commands" />',
      },
      {
        title: "Validation",
        description:
          "Invalid fields keep a red border; focus treatment appears only for keyboard focus.",
        code: '<Input aria-invalid="true" aria-describedby="email-error" />',
      },
    ],
    api: [
      { name: "type", type: "HTMLInputTypeAttribute", defaultValue: '"text"' },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "readOnly", type: "boolean", defaultValue: "false" },
      { name: "aria-invalid", type: "boolean | string", defaultValue: "false" },
    ],
  },
  {
    number: "027",
    name: "Loading Bar",
    slug: "loading-bar",
    description: "Shows global navigation or loading progress along the top application edge.",
    usage: code(
      'import { LoadingBar } from "@/components/ui/loading-bar"',
      "",
      "<LoadingBar active={isNavigating} />",
    ),
    notes: [
      {
        title: "Determinate",
        description: "Provide a percentage when the application knows the exact progress.",
        code: "<LoadingBar value={68} />",
      },
      {
        title: "Local preview",
        description: "Use absolute positioning when the bar belongs to a bounded container.",
        code: '<div className="relative"><LoadingBar position="absolute" /></div>',
      },
      {
        title: "Idle",
        description:
          "Keep the component mounted and remove it from the accessibility tree while idle.",
        code: "<LoadingBar active={false} />",
      },
    ],
    api: [
      { name: "active", type: "boolean", defaultValue: "true" },
      { name: "value", type: "number", defaultValue: "—" },
      { name: "position", type: '"fixed" | "absolute"', defaultValue: '"fixed"' },
      { name: "label", type: "string", defaultValue: '"Loading page"' },
    ],
  },
  {
    number: "030",
    name: "Pagination",
    slug: "pagination",
    description: "Navigates a paginated collection with explicit current and boundary states.",
    usage: code(
      'import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"',
      "",
      "<Pagination>",
      "  <PaginationContent>",
      "    <PaginationItem>",
      '      <PaginationPrevious href="?page=1" />',
      "    </PaginationItem>",
      "    <PaginationItem>",
      '      <PaginationLink href="?page=2" isActive>2</PaginationLink>',
      "    </PaginationItem>",
      "    <PaginationItem>",
      '      <PaginationNext href="?page=3" />',
      "    </PaginationItem>",
      "  </PaginationContent>",
      "</Pagination>",
    ),
    notes: [
      {
        title: "Current page",
        description: "isActive applies the visual treatment and aria-current=page together.",
        code: '<PaginationLink href="?page=3" isActive>3</PaginationLink>',
      },
      {
        title: "Unknown range",
        description: "Use an ellipsis only where undisplayed pages exist between visible links.",
        code: "<PaginationItem><PaginationEllipsis /></PaginationItem>",
      },
      {
        title: "Boundary",
        description:
          "Expose unavailable directions as disabled and remove them from the tab order.",
        code: '<PaginationPrevious aria-disabled="true" tabIndex={-1} />',
      },
    ],
    api: [
      { name: "isActive", type: "boolean", defaultValue: "false" },
      { name: "href", type: "string", defaultValue: "—" },
      { name: "aria-label", type: "string", defaultValue: '"Pagination"' },
    ],
  },
  {
    number: "010",
    name: "Popover",
    slug: "popover",
    description: "Displays an interactive, collision-aware surface anchored to a trigger.",
    usage: code(
      'import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"',
      "",
      "<Popover>",
      "  <PopoverTrigger>Configure</PopoverTrigger>",
      "  <PopoverContent>",
      "    <PopoverTitle>Public alias</PopoverTitle>",
      "  </PopoverContent>",
      "</Popover>",
    ),
    notes: [
      {
        title: "Placement",
        description: "Choose the preferred side; collision handling keeps the content visible.",
        code: '<PopoverContent side="right" align="start">…</PopoverContent>',
      },
      {
        title: "Focus",
        description: "Trap focus only when completing the popover task requires it.",
        code: '<Popover modal="trap-focus">…</Popover>',
      },
    ],
    api: [
      { name: "open", type: "boolean", defaultValue: "—" },
      { name: "defaultOpen", type: "boolean", defaultValue: "false" },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"bottom"',
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: '"center"',
      },
      { name: "sideOffset", type: "number", defaultValue: "8" },
    ],
  },
  {
    number: "023",
    name: "Progress",
    slug: "progress",
    description: "Communicates determinate, completed, or indeterminate task progress.",
    usage: code(
      'import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@/components/ui/progress"',
      "",
      "<Progress value={72}>",
      "  <ProgressLabel>Uploading artifacts</ProgressLabel>",
      "  <ProgressValue />",
      "  <ProgressTrack><ProgressIndicator /></ProgressTrack>",
      "</Progress>",
    ),
    notes: [
      {
        title: "Indeterminate",
        description: "Pass null when the task is active but progress cannot be measured.",
        code: '<Progress value={null} aria-valuetext="Waiting for build worker">…</Progress>',
      },
      {
        title: "Custom range",
        description: "Use min and max when the task is measured in steps rather than percent.",
        code: "<Progress value={7} min={0} max={10}>…</Progress>",
      },
    ],
    api: [
      { name: "value", type: "number | null", defaultValue: "null" },
      { name: "min", type: "number", defaultValue: "0" },
      { name: "max", type: "number", defaultValue: "100" },
      { name: "locale", type: "Intl.LocalesArgument", defaultValue: '"en"' },
      { name: "getAriaValueText", type: "(formatted, value) => string", defaultValue: "—" },
    ],
  },
  {
    number: "006",
    name: "Radio Group",
    slug: "radio-group",
    description: "Lets a user select exactly one option from a visible set.",
    usage: code(
      'import { RadioGroup, RadioOption, RadioOptionLabel } from "@/components/ui/radio-group"',
      "",
      '<RadioGroup defaultValue="staging">',
      '  <RadioOption value="staging">',
      "    <RadioOptionLabel>Staging</RadioOptionLabel>",
      "  </RadioOption>",
      "</RadioGroup>",
    ),
    notes: [
      {
        title: "Description",
        description:
          "Option descriptions clarify consequences without hiding them behind a tooltip.",
        code: "<RadioOptionDescription>Mirrors production traffic.</RadioOptionDescription>",
      },
      {
        title: "Keyboard model",
        description: "Tab enters the group; arrow keys move and change the selection.",
        code: '<RadioGroup orientation="horizontal">…</RadioGroup>',
      },
    ],
    api: [
      { name: "value", type: "unknown", defaultValue: "—" },
      { name: "defaultValue", type: "unknown", defaultValue: "—" },
      { name: "onValueChange", type: "(value) => void", defaultValue: "—" },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"vertical"' },
      { name: "disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "005",
    name: "Select",
    slug: "select",
    description: "Lets a user choose one value from a compact, keyboard-accessible list.",
    usage: code(
      'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
      "",
      "<Select>",
      '  <SelectTrigger><SelectValue placeholder="Choose a region" /></SelectTrigger>',
      "  <SelectContent>",
      '    <SelectItem value="fra1">Frankfurt</SelectItem>',
      "  </SelectContent>",
      "</Select>",
    ),
    notes: [
      {
        title: "Grouped options",
        description: "Use labels and separators when a long list contains meaningful regions.",
        code: "<SelectGroup><SelectLabel>Europe</SelectLabel>…</SelectGroup>",
      },
      {
        title: "Position",
        description: "The popup aligns the selected item with the trigger by default.",
        code: "<SelectContent alignItemWithTrigger={false}>…</SelectContent>",
      },
    ],
    api: [
      { name: "value", type: "unknown", defaultValue: "—" },
      { name: "defaultValue", type: "unknown", defaultValue: "—" },
      { name: "onValueChange", type: "(value) => void", defaultValue: "—" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "alignItemWithTrigger", type: "boolean", defaultValue: "true" },
    ],
  },
  {
    number: "017",
    name: "Separator",
    slug: "separator",
    description: "Creates a semantic visual boundary between related regions.",
    usage: code('import { Separator } from "@/components/ui/separator"', "", "<Separator />"),
    notes: [
      {
        title: "Horizontal",
        description: "Divide stacked content regions without adding another container.",
        code: '<Separator orientation="horizontal" />',
      },
      {
        title: "Vertical",
        description: "Give vertical separators an explicit height through their parent.",
        code: '<div className="h-4"><Separator orientation="vertical" /></div>',
      },
    ],
    api: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
      },
      { name: "className", type: "string", defaultValue: "—" },
    ],
  },
  {
    number: "018",
    name: "Skeleton",
    slug: "skeleton",
    description: "Reserves layout space while content is loading.",
    usage: code(
      'import { Skeleton } from "@/components/ui/skeleton"',
      "",
      '<Skeleton className="h-4 w-48" />',
    ),
    notes: [
      {
        title: "Compose the shape",
        description: "Match the expected content geometry instead of drawing a generic card.",
        code: '<div className="grid gap-3"><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-full" /></div>',
      },
      {
        title: "Decorative",
        description: "Skeletons are hidden from assistive technology by default.",
        code: '<Skeleton aria-hidden="true" />',
      },
    ],
    api: [
      { name: "className", type: "string", defaultValue: "—" },
      { name: "aria-hidden", type: "boolean", defaultValue: "true" },
    ],
  },
  {
    number: "026",
    name: "Spinner",
    slug: "spinner",
    description: "Indicates indeterminate activity in controls and compact status regions.",
    usage: code(
      'import { Spinner } from "@/components/ui/spinner"',
      "",
      '<Spinner aria-label="Loading deployment" />',
    ),
    notes: [
      {
        title: "Sizes",
        description: "Match the spinner to the surrounding control or status text.",
        code: '<Spinner size="sm" /> <Spinner /> <Spinner size="lg" />',
      },
      {
        title: "Decorative",
        description: "Hide the spinner when adjacent text already communicates the loading state.",
        code: '<Button disabled><Spinner aria-hidden="true" /> Deploying</Button>',
      },
    ],
    api: [
      { name: "size", type: '"sm" | "default" | "lg"', defaultValue: '"default"' },
      { name: "aria-label", type: "string", defaultValue: '"Loading"' },
      { name: "className", type: "string", defaultValue: "—" },
    ],
  },
  {
    number: "025",
    name: "Stepper",
    slug: "stepper",
    description: "Shows progress through a sequence and lets users return to available steps.",
    usage: code(
      'import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper"',
      "",
      '<Stepper defaultValue={2} aria-label="Deployment setup">',
      "  <StepperItem step={1}>",
      "    <StepperTrigger>",
      "      <StepperIndicator />",
      "      <StepperContent><StepperTitle>Project</StepperTitle></StepperContent>",
      "    </StepperTrigger>",
      "    <StepperSeparator />",
      "  </StepperItem>",
      "  …",
      "</Stepper>",
    ),
    notes: [
      {
        title: "Controlled",
        description: "Own the active step when navigation also changes application state.",
        code: "<Stepper value={step} onValueChange={setStep}>…</Stepper>",
      },
      {
        title: "Vertical",
        description: "Use the vertical layout in narrow containers or for longer descriptions.",
        code: '<Stepper orientation="vertical" defaultValue={2}>…</Stepper>',
      },
      {
        title: "Unavailable step",
        description: "Keep a future step visible while preventing navigation to it.",
        code: "<StepperItem step={3} disabled>…</StepperItem>",
      },
    ],
    api: [
      { name: "value", type: "number", defaultValue: "—" },
      { name: "defaultValue", type: "number", defaultValue: "1" },
      { name: "onValueChange", type: "(value: number) => void", defaultValue: "—" },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
      },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "StepperItem.step", type: "number", defaultValue: "—" },
      { name: "StepperItem.disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "007",
    name: "Switch",
    slug: "switch",
    description: "Toggles a setting that takes effect immediately.",
    usage: code(
      'import { Switch } from "@/components/ui/switch"',
      "",
      '<Switch id="failover" defaultChecked />',
      '<label htmlFor="failover">Automatic failover</label>',
    ),
    notes: [
      {
        title: "Immediate effect",
        description: "Use a switch for settings applied on toggle, not choices submitted later.",
        code: "<Switch checked={enabled} onCheckedChange={setEnabled} />",
      },
      {
        title: "System states",
        description: "Disabled, read-only, and invalid states remain visually distinct.",
        code: '<Switch disabled aria-label="Locked setting" />',
      },
    ],
    api: [
      { name: "checked", type: "boolean", defaultValue: "—" },
      { name: "defaultChecked", type: "boolean", defaultValue: "false" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "—" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "readOnly", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "013",
    name: "Table",
    slug: "table",
    description: "Structures dense technical data with native table semantics.",
    usage: code(
      'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"',
      "",
      "<Table>",
      "  <TableHeader><TableRow><TableHead>Region</TableHead></TableRow></TableHeader>",
      "  <TableBody><TableRow><TableCell>fra1</TableCell></TableRow></TableBody>",
      "</Table>",
    ),
    notes: [
      {
        title: "Responsive overflow",
        description:
          "The table keeps its structure and scrolls horizontally in constrained containers.",
        code: '<Table containerClassName="max-w-lg">…</Table>',
      },
      {
        title: "Caption",
        description: "A concise caption gives the dataset an accessible description.",
        code: "<TableCaption>Deployment traffic during the last 24 hours.</TableCaption>",
      },
    ],
    api: [
      { name: "containerClassName", type: "string", defaultValue: "—" },
      { name: "className", type: "string", defaultValue: "—" },
      { name: "TableHead", type: 'React.ComponentProps<"th">', defaultValue: "—" },
      { name: "TableCell", type: 'React.ComponentProps<"td">', defaultValue: "—" },
    ],
  },
  {
    number: "008",
    name: "Tabs",
    slug: "tabs",
    description: "Switches between related panels while keeping their context visible.",
    usage: code(
      'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"',
      "",
      '<Tabs defaultValue="overview">',
      "  <TabsList>",
      '    <TabsTrigger value="overview">Overview</TabsTrigger>',
      "  </TabsList>",
      '  <TabsContent value="overview">Operational</TabsContent>',
      "</Tabs>",
    ),
    notes: [
      {
        title: "Automatic activation",
        description: "Arrow keys select tabs immediately by default.",
        code: "<TabsList activateOnFocus>…</TabsList>",
      },
      {
        title: "Manual activation",
        description:
          "For expensive panels, move focus with arrows and activate with Enter or Space.",
        code: "<TabsList activateOnFocus={false}>…</TabsList>",
      },
    ],
    api: [
      { name: "value", type: "string", defaultValue: "—" },
      { name: "defaultValue", type: "string", defaultValue: "—" },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"' },
      { name: "activateOnFocus", type: "boolean", defaultValue: "true" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
    ],
  },
  {
    number: "024",
    name: "Terminal",
    slug: "terminal",
    description: "Displays commands and output with copy support and switchable variants.",
    usage: code(
      'import { Terminal } from "@/components/ui/terminal"',
      "",
      "<Terminal",
      '  label="Install package"',
      '  defaultValue="bun"',
      "  commands={[",
      '    { value: "bun", label: "Bun", command: "bun add lucide-react" },',
      '    { value: "npm", label: "npm", command: "npm install lucide-react" },',
      "  ]}",
      "/>",
    ),
    notes: [
      {
        title: "Single command",
        description: "Use the direct command API when no choice is required.",
        code: '<Terminal command="bun run build" />',
      },
      {
        title: "Multiline",
        description: "Newlines are preserved for sequences and terminal output.",
        code: '<Terminal command={"bun install\\nbun run check\\nbun run build"} />',
      },
      {
        title: "Command variants",
        description: "Offer equivalent commands without duplicating the surrounding interface.",
        code: '<Terminal commands={[{ value: "bun", label: "Bun", command: "bun add …" }, …]} />',
      },
    ],
    api: [
      { name: "command", type: "string", defaultValue: "—" },
      { name: "commands", type: "readonly TerminalCommand[]", defaultValue: "—" },
      {
        name: "defaultValue",
        type: 'TCommands[number]["value"] | string',
        defaultValue: "first command",
      },
      {
        name: "value",
        type: 'TCommands[number]["value"] | string',
        defaultValue: "—",
      },
      { name: "onValueChange", type: "(value: string) => void", defaultValue: "—" },
      { name: "label", type: "ReactNode", defaultValue: '"Terminal"' },
      { name: "prompt", type: "ReactNode | false", defaultValue: '"$"' },
      { name: "copyable", type: "boolean", defaultValue: "true" },
    ],
  },
  {
    number: "015",
    name: "Textarea",
    slug: "textarea",
    description: "Accepts longer, multiline text using a native textarea element.",
    usage: code(
      'import { Textarea } from "@/components/ui/textarea"',
      "",
      '<Textarea placeholder="Describe this release" />',
    ),
    notes: [
      {
        title: "Vertical resize",
        description: "The default resize direction preserves the surrounding layout.",
        code: '<Textarea className="min-h-32" />',
      },
      {
        title: "Validation",
        description: "Invalid fields use a red border until keyboard focus adds the focus ring.",
        code: '<Textarea aria-invalid="true" aria-describedby="reason-error" />',
      },
    ],
    api: [
      { name: "rows", type: "number", defaultValue: "—" },
      { name: "disabled", type: "boolean", defaultValue: "false" },
      { name: "readOnly", type: "boolean", defaultValue: "false" },
      { name: "aria-invalid", type: "boolean | string", defaultValue: "false" },
    ],
  },
  {
    number: "021",
    name: "Toast",
    slug: "toast",
    description: "Delivers non-blocking feedback without interrupting the current task.",
    usage: code(
      '"use client"',
      "",
      'import { Toaster, ToastProvider, useToast } from "@/components/ui/toast"',
      "",
      "const toast = useToast()",
      "",
      'toast.add({ title: "Deployment queued", type: "success" })',
      "",
      "<ToastProvider><Toaster /></ToastProvider>",
    ),
    notes: [
      {
        title: "Priority",
        description: "Routine updates are polite; urgent failures may use high priority.",
        code: 'toast.add({ title: "Deployment failed", priority: "high", timeout: 0 })',
      },
      {
        title: "Action",
        description:
          "Add one concise action only when the notification has an immediate next step.",
        code: 'toast.add({ title: "Queued", actionProps: { children: "View" } })',
      },
    ],
    api: [
      { name: "title", type: "ReactNode", defaultValue: "—" },
      { name: "description", type: "ReactNode", defaultValue: "—" },
      { name: "type", type: '"success" | "warning" | "error" | string', defaultValue: "—" },
      { name: "priority", type: '"low" | "high"', defaultValue: '"low"' },
      { name: "timeout", type: "number", defaultValue: "5000" },
    ],
  },
  {
    number: "009",
    name: "Tooltip",
    slug: "tooltip",
    description: "Adds a supplementary hint to an already labelled interactive control.",
    usage: code(
      'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"',
      "",
      "<TooltipProvider>",
      "  <Tooltip>",
      '    <TooltipTrigger aria-label="Copy deployment URL">Copy</TooltipTrigger>',
      "    <TooltipContent>Copy deployment URL</TooltipContent>",
      "  </Tooltip>",
      "</TooltipProvider>",
    ),
    notes: [
      {
        title: "Pointer and keyboard",
        description: "The hint opens from hover and focus and dismisses with Escape.",
        code: "<Tooltip><TooltipTrigger>…</TooltipTrigger><TooltipContent>…</TooltipContent></Tooltip>",
      },
      {
        title: "Placement",
        description: "Placement is a preference; collision handling may choose a safer side.",
        code: '<TooltipContent side="right">Open settings</TooltipContent>',
      },
    ],
    api: [
      { name: "delay", type: "number", defaultValue: "400" },
      { name: "closeDelay", type: "number", defaultValue: "100" },
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"top"',
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: '"center"',
      },
    ],
  },
] as const satisfies readonly ComponentDoc[];

export type ComponentSlug = (typeof componentDocs)[number]["slug"];

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
