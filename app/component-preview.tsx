import type { ComponentSlug } from "@/app/docs-data";

export async function ComponentPreview({ slug }: { slug: ComponentSlug }) {
  switch (slug) {
    case "accordion": {
      const { AccordionPreview } = await import("@/app/accordion-preview");
      return <AccordionPreview />;
    }
    case "alert": {
      const { AlertPreview } = await import("@/app/alert-preview");
      return <AlertPreview />;
    }
    case "badge": {
      const { BadgePreview } = await import("@/app/badge-preview");
      return <BadgePreview />;
    }
    case "button": {
      const { ButtonPreview } = await import("@/app/button-preview");
      return <ButtonPreview />;
    }
    case "card": {
      const { CardPreview } = await import("@/app/card-preview");
      return <CardPreview />;
    }
    case "checkbox": {
      const { CheckboxPreview } = await import("@/app/checkbox-preview");
      return <CheckboxPreview />;
    }
    case "collapsible": {
      const { CollapsiblePreview } = await import("@/app/collapsible-preview");
      return <CollapsiblePreview />;
    }
    case "dialog": {
      const { DialogPreview } = await import("@/app/dialog-preview");
      return <DialogPreview />;
    }
    case "dropdown-menu": {
      const { DropdownMenuPreview } = await import("@/app/dropdown-menu-preview");
      return <DropdownMenuPreview />;
    }
    case "field": {
      const { InputFieldPreview } = await import("@/app/input-field-preview");
      return <InputFieldPreview />;
    }
    case "input": {
      const { InputFieldPreview } = await import("@/app/input-field-preview");
      return <InputFieldPreview />;
    }
    case "popover": {
      const { PopoverPreview } = await import("@/app/popover-preview");
      return <PopoverPreview />;
    }
    case "progress": {
      const { ProgressPreview } = await import("@/app/progress-preview");
      return <ProgressPreview />;
    }
    case "radio-group": {
      const { RadioGroupPreview } = await import("@/app/radio-group-preview");
      return <RadioGroupPreview />;
    }
    case "select": {
      const { SelectPreview } = await import("@/app/select-preview");
      return <SelectPreview />;
    }
    case "separator": {
      const { SeparatorPreview } = await import("@/app/separator-preview");
      return <SeparatorPreview />;
    }
    case "skeleton": {
      const { SkeletonPreview } = await import("@/app/skeleton-preview");
      return <SkeletonPreview />;
    }
    case "spinner": {
      const { SpinnerPreview } = await import("@/app/spinner-preview");
      return <SpinnerPreview />;
    }
    case "stepper": {
      const { StepperPreview } = await import("@/app/stepper-preview");
      return <StepperPreview />;
    }
    case "switch": {
      const { SwitchPreview } = await import("@/app/switch-preview");
      return <SwitchPreview />;
    }
    case "table": {
      const { TablePreview } = await import("@/app/table-preview");
      return <TablePreview />;
    }
    case "tabs": {
      const { TabsPreview } = await import("@/app/tabs-preview");
      return <TabsPreview />;
    }
    case "terminal": {
      const { TerminalPreview } = await import("@/app/terminal-preview");
      return <TerminalPreview />;
    }
    case "textarea": {
      const { TextareaPreview } = await import("@/app/textarea-preview");
      return <TextareaPreview />;
    }
    case "toast": {
      const { ToastPreview } = await import("@/app/toast-preview");
      return <ToastPreview />;
    }
    case "tooltip": {
      const { TooltipPreview } = await import("@/app/tooltip-preview");
      return <TooltipPreview />;
    }
  }
}
