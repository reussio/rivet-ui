"use client";

import { ArrowRight, KeyRound, RotateCcw } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/rivetui/components/field/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/registry/rivetui/components/input-otp/input-otp";

const sixSlotIndexes = [0, 1, 2, 3, 4, 5] as const;

export function InputOTPPreview() {
  const [value, setValue] = React.useState("");

  return (
    <section
      className="w-full border border-border bg-background"
      aria-labelledby="input-otp-title"
    >
      <header className="flex items-start justify-between gap-6 border-b border-border p-5 sm:p-6">
        <div className="space-y-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            Component / 047
          </p>
          <h2
            id="input-otp-title"
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Input OTP
          </h2>
        </div>
        <span className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Verification
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="p-5 sm:p-8 lg:border-r lg:border-border">
          <form
            className="mx-auto w-full max-w-xl border border-border"
            aria-label="Verify sign in"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-3 border-b border-border p-4">
              <span className="grid size-9 place-items-center border border-border text-muted-foreground">
                <KeyRound className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">Verify your sign in</p>
                <p className="text-sm text-muted-foreground">
                  Enter the code sent to t•••@rivet.run.
                </p>
              </div>
            </div>

            <div className="p-5">
              <Field>
                <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
                <InputOTP
                  id="verification-code"
                  name="verification-code"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={value}
                  onValueChange={setValue}
                  required
                  aria-describedby="verification-code-description verification-code-status"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <FieldDescription id="verification-code-description">
                    Paste the complete code or type it normally.
                  </FieldDescription>
                  <span
                    id="verification-code-status"
                    className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground"
                    aria-live="polite"
                  >
                    {value.length} / 6
                  </span>
                </div>
              </Field>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-4">
              <Button type="button" variant="ghost" size="sm">
                <RotateCcw aria-hidden="true" />
                Resend code
              </Button>
              <Button type="submit" size="sm" disabled={value.length !== 6}>
                Verify
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </form>
        </div>

        <aside
          className="border-t border-border lg:border-t-0"
          aria-label="Component specification"
        >
          <dl className="divide-y divide-border font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
            <Specification term="Inputs" detail="01 native" />
            <Specification term="Slots" detail="06 visual" />
            <Specification term="Autofill" detail="OTP" />
            <Specification term="Paste" detail="native" />
          </dl>
        </aside>
      </div>

      <div className="border-t border-border">
        <PreviewRow label="Four digit">
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            defaultValue="1942"
            aria-label="Four digit PIN"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </PreviewRow>

        <PreviewRow label="Alphanumeric">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            inputMode="text"
            defaultValue="RV8"
            aria-label="Alphanumeric verification code"
          >
            <InputOTPGroup>
              {sixSlotIndexes.map((slot) => (
                <InputOTPSlot key={`alphanumeric-${slot}`} index={slot} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </PreviewRow>

        <PreviewRow label="Invalid">
          <Field>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              defaultValue="000000"
              aria-label="Invalid verification code"
              aria-invalid="true"
              aria-describedby="invalid-code-error"
            >
              <InputOTPGroup>
                {sixSlotIndexes.map((slot) => (
                  <InputOTPSlot key={`invalid-${slot}`} index={slot} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError id="invalid-code-error">
              This code has expired. Request a new one.
            </FieldError>
          </Field>
        </PreviewRow>

        <PreviewRow label="Disabled">
          <InputOTP
            maxLength={6}
            defaultValue="381904"
            disabled
            aria-label="Verification code disabled"
          >
            <InputOTPGroup>
              {sixSlotIndexes.map((slot) => (
                <InputOTPSlot key={`disabled-${slot}`} index={slot} />
              ))}
            </InputOTPGroup>
          </InputOTP>
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
      <div className="flex min-w-0 flex-wrap items-center gap-3 overflow-x-auto p-4">
        {children}
      </div>
    </div>
  );
}
