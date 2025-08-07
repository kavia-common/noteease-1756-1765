import { ref, computed } from 'vue'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'NoteEaseNotes-v1'

function loadNotes(): Note[] {
  let n: Note[] = []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) n = JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return n
}
function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

// PUBLIC_INTERFACE
export function useNotesStore() {
  const notes = ref<Note[]>(loadNotes())
  const selectedNoteId = ref<string | null>(null)

  function persist() {
    saveNotes(notes.value)
  }

  // PUBLIC_INTERFACE
  function addNote(): Note {
    const now = new Date().toISOString()
    const note: Note = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    }
    notes.value.unshift(note)
    selectedNoteId.value = note.id
    persist()
    return note
  }

  // PUBLIC_INTERFACE
  function updateNote(id: string, fields: Partial<Note>) {
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx >= 0) {
      notes.value[idx] = {
        ...notes.value[idx],
        ...fields,
        updatedAt: new Date().toISOString(),
      }
      persist()
    }
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx >= 0) {
      notes.value.splice(idx, 1)
      if (selectedNoteId.value === id)
        selectedNoteId.value = notes.value.length ? notes.value[0].id : null
      persist()
    }
  }

  // PUBLIC_INTERFACE
  function selectNote(id: string) {
    selectedNoteId.value = id
  }

  // PUBLIC_INTERFACE
  function getNote(id: string) {
    return notes.value.find(n => n.id === id) ?? null
  }

  // PUBLIC_INTERFACE
  function searchNotes(query: string): Note[] {
    if (!query) return notes.value
    const q = query.toLowerCase()
    return notes.value.filter(
      n =>
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.content && n.content.toLowerCase().includes(q))
    )
  }

  return {
    notes,
    selectedNoteId,
    addNote,
    updateNote,
    deleteNote,
    selectNote,
    getNote,
    searchNotes,
  }
}
