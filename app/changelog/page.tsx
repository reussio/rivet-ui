import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog – Rivet UI",
  description: "New components, improvements, and breaking changes across Rivet UI releases.",
};

type ChangeGroup = {
  title: string;
  items: string[];
};

type Release = {
  version: string;
  groups: ChangeGroup[];
};

async function getReleases() {
  const source = await readFile(path.join(process.cwd(), "CHANGELOG.md"), "utf8");
  return parseChangelog(source);
}

function parseChangelog(source: string) {
  const releases: Release[] = [];
  let release: Release | undefined;
  let group: ChangeGroup | undefined;

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();

    if (line.startsWith("## ")) {
      release = { version: line.slice(3).trim(), groups: [] };
      releases.push(release);
      group = undefined;
      continue;
    }

    if (line.startsWith("### ") && release) {
      group = { title: line.slice(4).trim(), items: [] };
      release.groups.push(group);
      continue;
    }

    if (line.startsWith("- ") && group) {
      group.items.push(line.slice(2).trim());
      continue;
    }

    if (line && group?.items.length) {
      const lastIndex = group.items.length - 1;
      group.items[lastIndex] = `${group.items[lastIndex]} ${line}`;
    }
  }

  return releases;
}

function toId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function ChangelogPage() {
  const releases = await getReleases();
  const latestVersion = releases.at(0)?.version;

  return (
    <main id="content" className="mx-auto w-full max-w-[100rem]">
      <section className="relative overflow-hidden border-b border-border px-5 py-12 sm:px-10 sm:py-16 xl:px-12 xl:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4rem_4rem]"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            Release history
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
            Built in public,
            <span className="block text-muted-foreground">release by release.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            New components, API improvements, fixes, and breaking changes across Rivet UI.
          </p>
        </div>

        {latestVersion ? (
          <dl className="relative mt-12 grid max-w-3xl border-y border-border sm:grid-cols-2">
            <ReleaseFact term="Latest release" detail={`v${latestVersion}`} />
            <ReleaseFact
              term="Published releases"
              detail={String(releases.length).padStart(2, "0")}
            />
          </dl>
        ) : null}
      </section>

      <section aria-labelledby="release-history" className="px-5 py-10 sm:px-10 sm:py-12 xl:px-12">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            All releases
          </p>
          <h2
            id="release-history"
            className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
          >
            What changed.
          </h2>
        </div>

        {releases.length ? (
          <ol className="mt-8 max-w-5xl border-t border-border">
            {releases.map((release, releaseIndex) => (
              <li
                key={release.version}
                id={`v${release.version}`}
                className="scroll-mt-24 border-b border-border py-8 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:py-10"
              >
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {releaseIndex === 0 ? "Latest" : "Release"}
                  </p>
                  <h3 className="mt-2 font-mono text-xl font-medium tracking-[-0.03em]">
                    v{release.version}
                  </h3>
                </div>

                <div className="mt-7 grid gap-8 sm:mt-0">
                  {release.groups.map((group) => {
                    const groupId = `v${release.version}-${toId(group.title)}`;

                    return (
                      <section key={group.title} aria-labelledby={groupId}>
                        <h4 id={groupId} className="text-sm font-semibold tracking-[-0.01em]">
                          {group.title}
                        </h4>
                        <ul className="mt-3 grid gap-3">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-muted-foreground"
                            >
                              <span
                                className="mt-[0.65rem] size-1 bg-foreground"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 border-y border-border py-8 text-sm text-muted-foreground">
            No releases have been published yet.
          </p>
        )}
      </section>

      <footer className="flex flex-col gap-3 border-t border-border px-5 py-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 xl:px-12">
        <span>Rivet UI / Changelog</span>
        <span>Every meaningful change, documented.</span>
      </footer>
    </main>
  );
}

function ReleaseFact({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-b border-border py-4 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-1 text-sm font-medium">{detail}</dd>
    </div>
  );
}
