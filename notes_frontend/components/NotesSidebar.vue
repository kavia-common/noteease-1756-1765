<template>
  <section class="sidebar-section">
    <div class="search-add-row">
      <input
        v-model="searchTerm"
        @input="onSearch"
        type="text"
        class="search-input"
        placeholder="Search notes..."
      />
      <button class="add-btn" @click="onAddClick" title="Add note">
        +
      </button>
    </div>
    <ul class="notes-list">
      <li
        v-for="note in filteredNotes"
        :key="note.id"
        :class="['notes-list-item', note.id === selectedNoteId ? 'active' : '']"
        @click="selectNote(note.id)"
      >
        <span class="note-title">{{ note.title || '(Untitled)' }}</span>
        <button
          class="delete-note"
          @click.stop="deleteNote(note.id)"
          title="Delete note"
        >🗑</button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'

const notesStore = useNotesStore()
const router = useRouter()

const searchTerm = ref('')
const selectedNoteId = computed(() => notesStore.selectedNoteId)
const filteredNotes = computed(() => {
  return notesStore.searchNotes(searchTerm.value)
})

function onSearch() {
  // No-op since filteredNotes is reactive.
}

function onAddClick() {
  const note = notesStore.addNote()
  router.push({ path: `/note/${note.id}` })
}

function selectNote(id: string) {
  notesStore.selectNote(id)
  router.push({ path: `/note/${id}` })
}

function deleteNote(id: string) {
  if (window.confirm('Delete this note?')) {
    notesStore.deleteNote(id)
  }
}

// Make sure the UI reacts to selection changes and route changes.
watch(() => router.currentRoute.value.params.id, (id: any) => {
  if (id) notesStore.selectNote(String(id))
})
</script>

<style scoped>
.sidebar-section {
  padding: 0.8rem 0 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68px);
}

.search-add-row {
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem 0.5rem 1.2rem;
  gap: 0.6rem;
}

.search-input {
  flex: 1;
  border: 1.5px solid #ececec;
  border-radius: 6px;
  padding: 0.45rem 0.9rem;
  font-size: 1rem;
  background: #fff;
  color: #111;
  outline: none;
  transition: border 0.17s;
}
.search-input:focus {
  border-color: #1e90ff;
}

.add-btn {
  background: #fbbf24; /* Accent */
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  width: 36px;
  height: 36px;
  margin-left: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover, .add-btn:focus {
  background: #fde68a;
  color: #222;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.6rem 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

.notes-list-item {
  padding: 0.8rem 1.5rem 0.8rem 1.35rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.12s;
  border-left: 4px solid transparent;
  background: transparent;
  font-weight: 500;
}
.notes-list-item.active {
  background: #e9f1fd;
  border-left: 4px solid #1e90ff;
}

.note-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete-note {
  background: transparent;
  color: #374151;
  border: none;
  padding: 0 0 0 7px;
  cursor: pointer;
  font-size: 1.07rem;
  opacity: 0;
  transition: opacity .13s;
}
.notes-list-item:hover .delete-note,
.notes-list-item.active .delete-note {
  opacity: 0.8;
}
.delete-note:hover {
  color: #f87171;
}
</style>

