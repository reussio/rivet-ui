import { ButtonPreview } from "@/app/button-preview";
import { CardPreview } from "@/app/card-preview";
import { CheckboxPreview } from "@/app/checkbox-preview";
import { DialogPreview } from "@/app/dialog-preview";
import { InputFieldPreview } from "@/app/input-field-preview";
import { PopoverPreview } from "@/app/popover-preview";
import { RadioGroupPreview } from "@/app/radio-group-preview";
import { SelectPreview } from "@/app/select-preview";
import { SwitchPreview } from "@/app/switch-preview";
import { TablePreview } from "@/app/table-preview";
import { TabsPreview } from "@/app/tabs-preview";
import { TooltipPreview } from "@/app/tooltip-preview";

export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background px-4 py-16 text-foreground sm:px-8 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          Rivet UI / Component Index
        </div>
        <div className="space-y-12">
          <ButtonPreview />
          <InputFieldPreview />
          <CheckboxPreview />
          <SelectPreview />
          <RadioGroupPreview />
          <SwitchPreview />
          <TabsPreview />
          <TooltipPreview />
          <PopoverPreview />
          <CardPreview />
          <DialogPreview />
          <TablePreview />
        </div>
      </div>
    </main>
  );
}
