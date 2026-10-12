import type { ComponentSlug } from "@/content/components";

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
    case "alert-dialog": {
      const { AlertDialogPreview } = await import("@/app/alert-dialog-preview");
      return <AlertDialogPreview />;
    }
    case "avatar": {
      const { AvatarPreview } = await import("@/app/avatar-preview");
      return <AvatarPreview />;
    }
    case "badge": {
      const { BadgePreview } = await import("@/app/badge-preview");
      return <BadgePreview />;
    }
    case "breadcrumb": {
      const { BreadcrumbPreview } = await import("@/app/breadcrumb-preview");
      return <BreadcrumbPreview />;
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
    case "code-block": {
      const { CodeBlockPreview } = await import("@/app/code-block-preview");
      return <CodeBlockPreview />;
    }
    case "color-picker": {
      const { ColorPickerPreview } = await import("@/app/color-picker-preview");
      return <ColorPickerPreview />;
    }
    case "combobox": {
      const { ComboboxPreview } = await import("@/app/combobox-preview");
      return <ComboboxPreview />;
    }
    case "command-bar": {
      const { CommandBarPreview } = await import("@/app/command-bar-preview");
      return <CommandBarPreview />;
    }
    case "collapsible": {
      const { CollapsiblePreview } = await import("@/app/collapsible-preview");
      return <CollapsiblePreview />;
    }
    case "context-menu": {
      const { ContextMenuPreview } = await import("@/app/context-menu-preview");
      return <ContextMenuPreview />;
    }
    case "date-picker": {
      const { DatePickerPreview } = await import("@/app/date-picker-preview");
      return <DatePickerPreview />;
    }
    case "dialog": {
      const { DialogPreview } = await import("@/app/dialog-preview");
      return <DialogPreview />;
    }
    case "dropdown-menu": {
      const { DropdownMenuPreview } = await import("@/app/dropdown-menu-preview");
      return <DropdownMenuPreview />;
    }
    case "empty-state": {
      const { EmptyStatePreview } = await import("@/app/empty-state-preview");
      return <EmptyStatePreview />;
    }
    case "field": {
      const { InputFieldPreview } = await import("@/app/input-field-preview");
      return <InputFieldPreview />;
    }
    case "file-upload": {
      const { FileUploadPreview } = await import("@/app/file-upload-preview");
      return <FileUploadPreview />;
    }
    case "input": {
      const { InputFieldPreview } = await import("@/app/input-field-preview");
      return <InputFieldPreview />;
    }
    case "input-otp": {
      const { InputOTPPreview } = await import("@/app/input-otp-preview");
      return <InputOTPPreview />;
    }
    case "keyboard-shortcut": {
      const { KeyboardShortcutPreview } = await import("@/app/keyboard-shortcut-preview");
      return <KeyboardShortcutPreview />;
    }
    case "loading-bar": {
      const { LoadingBarPreview } = await import("@/app/loading-bar-preview");
      return <LoadingBarPreview />;
    }
    case "pagination": {
      const { PaginationPreview } = await import("@/app/pagination-preview");
      return <PaginationPreview />;
    }
    case "password-field": {
      const { PasswordFieldPreview } = await import("@/app/password-field-preview");
      return <PasswordFieldPreview />;
    }
    case "popover": {
      const { PopoverPreview } = await import("@/app/popover-preview");
      return <PopoverPreview />;
    }
    case "progress": {
      const { ProgressPreview } = await import("@/app/progress-preview");
      return <ProgressPreview />;
    }
    case "qr-code": {
      const { QRCodePreview } = await import("@/app/qr-code-preview");
      return <QRCodePreview />;
    }
    case "radio-group": {
      const { RadioGroupPreview } = await import("@/app/radio-group-preview");
      return <RadioGroupPreview />;
    }
    case "rating": {
      const { RatingPreview } = await import("@/app/rating-preview");
      return <RatingPreview />;
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
    case "slider": {
      const { SliderPreview } = await import("@/app/slider-preview");
      return <SliderPreview />;
    }
    case "spinner": {
      const { SpinnerPreview } = await import("@/app/spinner-preview");
      return <SpinnerPreview />;
    }
    case "stepper": {
      const { StepperPreview } = await import("@/app/stepper-preview");
      return <StepperPreview />;
    }
    case "status": {
      const { StatusPreview } = await import("@/app/status-preview");
      return <StatusPreview />;
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
    case "theme-switcher": {
      const { ThemeSwitcherPreview } = await import("@/app/theme-switcher-preview");
      return <ThemeSwitcherPreview />;
    }
    case "time-picker": {
      const { TimePickerPreview } = await import("@/app/time-picker-preview");
      return <TimePickerPreview />;
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
