function DocsSection({
  id,
  eyebrow,
  title,
  description,
  last = false,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-10 sm:px-10 sm:py-12 xl:px-12 ${last ? "" : "border-b border-border"}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={`${id}-title`}
          className={`${eyebrow ? "mt-3 " : ""}text-2xl font-semibold tracking-[-0.04em] sm:text-3xl`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export { DocsSection };
