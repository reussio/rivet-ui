# Rivet UI

Rivet UI ist eine eigenständige [shadcn/ui Registry](https://ui.shadcn.com/docs/registry/getting-started) auf Basis von Base UI, Next.js, React, TypeScript und Tailwind CSS v4. Bun übernimmt Runtime und Paketverwaltung; Biome formatiert und prüft den Code.

- Projekt- und Package-Name: `rivet-ui`
- Sichtbarer Name: `Rivet UI`
- Registry-Namespace: `@rivet`

## Voraussetzungen

- Bun 1.3.14 oder neuer

## Installation

```bash
bun install
```

## Entwicklung

```bash
bun run dev
```

Die Preview läuft unter `http://localhost:3000`. Der Registry-Katalog ist unter `http://localhost:3000/r/registry.json` erreichbar.

## Registry bauen und validieren

```bash
bun run registry:build
bun run registry:validate
```

Oder beides zusammen:

```bash
bun run registry:check
```

`shadcn build` liest die Root-Datei `registry.json` und schreibt den Katalog sowie die installierbaren Registry-Items nach `public/r`.

## Neue Registry-Komponente hinzufügen

1. Die Quelldatei unter `registry/rivet/blocks/<name>/` anlegen.
2. Das Item in der Root-`registry.json` ergänzen.
3. shadcn-Komponenten wie `button` unter `registryDependencies` deklarieren; Paketabhängigkeiten gehören unter `dependencies`.
4. `bun run registry:check` ausführen und die Preview bei Bedarf in `app/page.tsx` ergänzen.

Für normale Komponenten ist `registry:component` passend. `target` wird nur benötigt, wenn der Standard-Zielpfad überschrieben werden soll; für `registry:page` und `registry:file` ist er erforderlich.

## Registry-Komponenten lokal über `@rivet` testen

Die lokale Namespace-Zuordnung steht in `components.json`:

```json
{
  "registries": {
    "@rivet": "http://localhost:3000/r/{name}.json"
  }
}
```

Während `bun run dev` läuft, kann die Registry mit der CLI geprüft werden:

```bash
bunx --bun shadcn@latest list @rivet
bunx --bun shadcn@latest view @rivet/component-name
bunx --bun shadcn@latest add @rivet/component-name
```

In einem anderen Consumer-Projekt muss der Namespace einmalig konfiguriert werden:

```bash
bunx --bun shadcn@latest registry add @rivet=http://localhost:3000/r/{name}.json
bunx --bun shadcn@latest add @rivet/component-name
```

Rivet UI selbst ist in `components.json` mit `style: "base-nova"` auf Base UI konfiguriert.

## Veröffentlichung

Nach dem Deployment wird im Consumer die öffentliche URL der Registry hinterlegt:

```bash
bunx --bun shadcn@latest registry add @rivet=https://example.com/r/{name}.json
bunx --bun shadcn@latest add @rivet/component-name
```

Mit npm statt Bun lautet der gewünschte Installationsbefehl anschließend:

```bash
npx shadcn add @rivet/component-name
```

Wird `@rivet` später in den offiziellen shadcn Registry-Index aufgenommen, kann die vorgelagerte Namespace-Konfiguration entfallen. Alternativ lässt sich ein öffentliches GitHub-Repository ohne eigenen Registry-Server direkt verwenden:

```bash
bunx --bun shadcn@latest add username/rivet-ui/component-name
```

## Codequalität mit Biome

```bash
bun run lint
bun run check
bun run format
```

`bun run check` prüft Formatierung, Lint-Regeln und Importorganisation. `bun run check:write` wendet sichere Korrekturen und die Formatierung automatisch an. Die erzeugten Dateien unter `public/r` sind von Biome ausgenommen, da `shadcn build` sie reproduzierbar neu schreibt.
