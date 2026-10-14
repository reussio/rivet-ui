"use client";

import * as React from "react";

import { ComponentExample } from "@/app/component-example";
import { Field, FieldError } from "@/registry/rivetui/components/field/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/registry/rivetui/components/input-otp/input-otp";

const slots = [0, 1, 2, 3, 4, 5] as const;

const defaultCode = `"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@/components/ui/input-otp"

export function VerificationCode() {
  const [value, setValue] = React.useState("")

  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onValueChange={setValue}
      aria-label="Verification code"
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
  )
}`;

const alphanumericCode = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/components/ui/input-otp"

export function RecoveryCode() {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      inputMode="text"
      defaultValue="RV8"
      aria-label="Recovery code"
    >
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}`;

const invalidCode = `import { Field, FieldError } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@/components/ui/input-otp"

export function InvalidCode() {
  return (
    <Field className="w-full max-w-md">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        defaultValue="000000"
        aria-label="Invalid verification code"
        aria-invalid
        aria-describedby="code-error"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FieldError id="code-error">This code has expired.</FieldError>
    </Field>
  )
}`;

export function InputOTPPreview() {
  const [value, setValue] = React.useState("");

  return (
    <div className="mt-8 grid gap-12">
      <ComponentExample
        title="Verification code"
        description={`Use one native input behind a precise segmented display. ${value.length} of 6 digits entered.`}
        code={defaultCode}
      >
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onValueChange={setValue}
          aria-label="Verification code"
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
      </ComponentExample>

      <ComponentExample
        title="Alphanumeric"
        description="Switch the pattern and input mode when a code contains both letters and digits."
        code={alphanumericCode}
      >
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          inputMode="text"
          defaultValue="RV8"
          aria-label="Recovery code"
        >
          <InputOTPGroup>
            {slots.map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </ComponentExample>

      <ComponentExample
        title="Invalid code"
        description="Associate the segmented input with a concise error when server-side verification fails."
        code={invalidCode}
      >
        <Field className="w-full max-w-md">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            defaultValue="000000"
            aria-label="Invalid verification code"
            aria-invalid
            aria-describedby="preview-code-error"
          >
            <InputOTPGroup>
              {slots.map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <FieldError id="preview-code-error">This code has expired.</FieldError>
        </Field>
      </ComponentExample>
    </div>
  );
}
