"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/registry/rivetui/components/alert/alert";
import { Button } from "@/registry/rivetui/components/button/button";
import { Field, FieldLabel } from "@/registry/rivetui/components/field/field";
import { Input } from "@/registry/rivetui/components/input/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@/registry/rivetui/components/input-otp/input-otp";
import { PasswordField } from "@/registry/rivetui/components/password-field/password-field";

type AuthenticationView = "recovery" | "sign-in" | "verify";

type AuthenticationProps = Omit<React.ComponentProps<"section">, "onSubmit"> & {
  defaultView?: AuthenticationView;
  onSubmit?: (view: AuthenticationView, formData: FormData) => void;
  onViewChange?: (view: AuthenticationView) => void;
};

function Authentication({
  className,
  defaultView = "sign-in",
  onSubmit,
  onViewChange,
  ...props
}: AuthenticationProps) {
  const [view, setView] = React.useState<AuthenticationView>(defaultView);

  function changeView(nextView: AuthenticationView) {
    setView(nextView);
    onViewChange?.(nextView);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(view, new FormData(event.currentTarget));

    if (view === "sign-in" && !onSubmit) {
      changeView("verify");
    }
  }

  return (
    <section
      aria-labelledby="authentication-title"
      className={cn("w-full max-w-md border border-border bg-background", className)}
      {...props}
    >
      <header className="border-b border-border p-5 sm:p-6">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          Secure access
        </p>
        <h2 id="authentication-title" className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
          {view === "sign-in" ? "Sign in" : view === "verify" ? "Verify access" : "Recover access"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {view === "sign-in"
            ? "Use your workspace credentials to continue."
            : view === "verify"
              ? "Enter the six-digit code sent to your trusted device."
              : "We will send a recovery link to your account email."}
        </p>
      </header>

      <form className="grid gap-5 p-5 sm:p-6" onSubmit={handleSubmit}>
        {view === "sign-in" ? (
          <>
            <Field>
              <FieldLabel htmlFor="auth-email">Email</FieldLabel>
              <Input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </Field>
            <Field>
              <div className="flex items-center justify-between gap-4">
                <FieldLabel htmlFor="auth-password">Password</FieldLabel>
                <button
                  type="button"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  onClick={() => changeView("recovery")}
                >
                  Forgot password?
                </button>
              </div>
              <PasswordField
                id="auth-password"
                name="password"
                autoComplete="current-password"
                required
              />
            </Field>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </>
        ) : null}

        {view === "verify" ? (
          <>
            <Alert role="status">
              <AlertContent>
                <AlertTitle>Code sent</AlertTitle>
                <AlertDescription>Check your authenticator or trusted device.</AlertDescription>
              </AlertContent>
            </Alert>
            <Field>
              <FieldLabel htmlFor="auth-code">Verification code</FieldLabel>
              <InputOTP
                id="auth-code"
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                required
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
            </Field>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => changeView("sign-in")}>
                Back
              </Button>
              <Button type="submit">Verify</Button>
            </div>
          </>
        ) : null}

        {view === "recovery" ? (
          <>
            <Field>
              <FieldLabel htmlFor="recovery-email">Account email</FieldLabel>
              <Input
                id="recovery-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </Field>
            <Alert variant="warning" role="note">
              <AlertContent>
                <AlertTitle>Recovery window</AlertTitle>
                <AlertDescription>The recovery link expires after 20 minutes.</AlertDescription>
              </AlertContent>
            </Alert>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => changeView("sign-in")}>
                Back
              </Button>
              <Button type="submit">Send recovery link</Button>
            </div>
          </>
        ) : null}
      </form>
    </section>
  );
}

export type { AuthenticationProps, AuthenticationView };
export { Authentication };
