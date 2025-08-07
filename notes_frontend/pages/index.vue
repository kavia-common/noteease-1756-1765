<template>
  <div>
    <NoteDetail v-if="selectedNoteId" :noteId="selectedNoteId" />
    <div v-else style="height:100vh;display:flex;justify-content:center;align-items:center;">
      <span style="color:#aaa;font-size:1.15rem;">No notes yet.<br>Add a note to get started!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import NoteDetail from '@/components/NoteDetail.vue'
const notesStore = useNotesStore()
const selectedNoteId = notesStore.selectedNoteId
</script>
