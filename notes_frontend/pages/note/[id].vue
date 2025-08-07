<template>
  <NoteDetail :noteId="id" />
</template>
<script setup lang="ts">
import NoteDetail from '@/components/NoteDetail.vue'
const route = useRoute()
const id = computed(() => route.params.id as string)
</script>
