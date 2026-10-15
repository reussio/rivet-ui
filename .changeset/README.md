# Changesets

Add a changeset for every user-visible component, API, or behavior change:

```bash
bun run changeset
```

Choose `patch` for compatible fixes, `minor` for compatible features, and `major` for breaking
changes. Documentation-only, test-only, and internal refactors do not require a changeset unless
they alter the shipped registry experience.

Changesets are consumed by the automated version pull request. After that pull request is merged,
run the GitHub `Release` workflow to execute the release gate, create the `v*` tag, and publish the
GitHub Release.
