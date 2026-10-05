import { LIBRARY } from '@/library/registry'
import { Entry, EntryHeader } from '@/library/showcase'
import type { CategoryKey } from '@/library/types'

/** Alle Einträge einer Kategorie. Genutzt von der Komponenten-Bibliothek unter /page/komponenten-<kategorie>. */
export function CategoryEntries({ category, only }: { category: CategoryKey; only?: string }) {
  const entries = LIBRARY[category].filter((e) => !only || e.id === only)
  return (
    <>
      {entries.map((e) => (
        <Entry key={e.id} id={e.id}>
          <EntryHeader figma={e.figma} nodeId={e.nodeId} code={e.code} note={e.note} />
          {e.render()}
        </Entry>
      ))}
    </>
  )
}
