<template>
  <div class="app-root">
    <aside class="sidebar">
      <LogoHeader />
      <NotesSidebar />
    </aside>
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import NotesSidebar from '@/components/NotesSidebar.vue'
import LogoHeader from '@/components/LogoHeader.vue'
</script>

<style scoped>
.app-root {
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: #fff;
  color: #222;
  font-family: 'Inter', system-ui, sans-serif;
}

.sidebar {
  width: 320px;
  background: #f9fafb;
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 250px;
}

.main-content {
  flex: 1;
  background-color: #fff;
  padding: 0;
  overflow-y: auto;
}
</style>
