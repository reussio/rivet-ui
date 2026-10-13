import { type ComponentSlug, componentDocs } from "@/content/components";

const groupDefinitions = [
  {
    name: "Controls",
    slugs: [
      "button",
      "checkbox",
      "input",
      "input-otp",
      "password-field",
      "radio-group",
      "rating",
      "search-field",
      "select",
      "slider",
      "switch",
      "textarea",
    ],
  },
  {
    name: "Forms & pickers",
    slugs: ["field", "combobox", "date-picker", "time-picker", "color-picker", "file-upload"],
  },
  {
    name: "Navigation",
    slugs: ["breadcrumb", "pagination", "stepper", "tabs", "website-link"],
  },
  {
    name: "Overlays",
    slugs: [
      "alert-dialog",
      "command-bar",
      "context-menu",
      "dialog",
      "drawer",
      "dropdown-menu",
      "popover",
      "sheet",
      "tooltip",
    ],
  },
  {
    name: "Feedback",
    slugs: [
      "alert",
      "badge",
      "empty-state",
      "loading-bar",
      "progress",
      "skeleton",
      "spinner",
      "status",
      "toast",
    ],
  },
  {
    name: "Layout & data",
    slugs: [
      "accordion",
      "avatar",
      "card",
      "collapsible",
      "data-list",
      "data-table",
      "separator",
      "table",
    ],
  },
  {
    name: "Developer tools",
    slugs: ["code-block", "keyboard-shortcut", "qr-code", "terminal", "theme-switcher"],
  },
] as const satisfies readonly {
  readonly name: string;
  readonly slugs: readonly ComponentSlug[];
}[];

function getIndexedComponent(slug: ComponentSlug) {
  const component = componentDocs.find((item) => item.slug === slug);

  if (!component) {
    throw new Error(`Missing component documentation for ${slug}.`);
  }

  return component;
}

export const componentGroups = groupDefinitions.map((group) => ({
  name: group.name,
  components: group.slugs.map(getIndexedComponent),
}));

export const homeSections = [
  { id: "introduction", label: "Introduction" },
  { id: "quick-start", label: "Quick start" },
  { id: "principles", label: "Principles" },
  { id: "components", label: "Components" },
] as const;
