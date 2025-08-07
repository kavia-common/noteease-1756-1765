<template>
  <div class="note-detail-box" v-if="note">
    <div class="note-detail-header">
      <input
        class="note-title-input"
        :disabled="loading"
        v-model="editTitle"
        @input="onTitleChange"
        maxlength="64"
        placeholder="Note title"
        aria-label="Note title"
      />
      <div class="note-detail-actions">
        <button class="btn-save" :disabled="loading || !dirty" @click="saveNote">
          Save
        </button>
      </div>
    </div>
    <textarea
      class="note-content-textarea"
      v-model="editContent"
      :disabled="loading"
      @input="onContentChange"
      placeholder="Write your note here..."
      maxlength="2048"
      aria-label="Note content"
    />
    <div class="note-meta-row">
      <span class="meta-label">Created: {{ formatDate(note.createdAt) }}</span>
      <span class="meta-label">Edited: {{ formatDate(note.updatedAt) }}</span>
    </div>
  </div>
  <div v-else class="note-detail-empty">
    <span style="color:#aaa">Select or create a note →</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'

// Props
const props = defineProps<{ noteId?: string }>()

const notesStore = useNotesStore()
const note = computed(() =>
  props.noteId ? notesStore.getNote(props.noteId) : null
)
const loading = ref(false)
const editTitle = ref('')
const editContent = ref('')

const dirty = ref(false)
function resetEditor() {
  if (note.value) {
    editTitle.value = note.value.title
    editContent.value = note.value.content
    dirty.value = false
  }
}
watch(note, resetEditor, { immediate: true })

function onTitleChange() {
  dirty.value = true
}
function onContentChange() {
  dirty.value = true
}

function saveNote() {
  if (!note.value) return
  loading.value = true
  notesStore.updateNote(note.value.id, {
    title: editTitle.value.trim(),
    content: editContent.value,
  })
  dirty.value = false
  loading.value = false
}

function formatDate(dt: string) {
  const d = new Date(dt)
  return d.toLocaleString()
}
</script>

<style scoped>
.note-detail-box {
  max-width: 760px;
  margin: 2.2rem auto 0 auto;
  padding: 2.5rem 2.2rem 2rem 2.2rem;
  background: #f7fafd;
  border-radius: 24px;
  min-height: 380px;
  border: 1px solid #ececec;
  box-shadow: 0px 2px 18px 0 #f2f6ff3c;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.note-detail-header {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 0.2rem;
}
.note-title-input {
  flex: 1;
  padding: .7rem 1rem;
  border: 1.6px solid #ecedef;
  border-radius: 7px;
  font-size: 1.32rem;
  font-weight: 600;
  color: #222;
  background: #fff;
  outline: none;
  transition: border 0.18s;
  margin-right: 2px;
}
.note-title-input:focus {
  border-color: #1e90ff;
}
.note-detail-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-save {
  background: #1e90ff;
  color: #fff;
  border: none;
  font-weight: 500;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.62rem 1.4rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background .19s;
}
.btn-save:disabled {
  background: #a0c4fa !important;
  color: #eee;
  cursor: not-allowed;
}
.btn-save:not(:disabled):hover {
  background: #256ad7;
}

.note-content-textarea {
  resize: vertical;
  min-height: 160px;
  font-size: 1.12rem;
  border: 1.4px solid #e4e8ef;
  border-radius: 6px;
  padding: 1.2rem 1rem;
  background: #fff;
  color: #1e293b;
  outline: none;
  transition: border 0.17s;
  font-family: inherit;
}
.note-content-textarea:focus {
  border-color: #fbbf24;
}

.note-meta-row {
  color: #9ca3af;
  font-size: 0.97rem;
  display: flex;
  gap: 2rem;
  margin-top: -3px;
  margin-bottom: 16px;
}
.meta-label {
  font-family: monospace;
}

.note-detail-empty {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 1.25rem;
  text-align: center;
}
</style>
