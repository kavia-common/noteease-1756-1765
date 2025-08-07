<template>
  <header class="logo-header">
    <span class="logo-dot" />
    <h1 class="logo-title">NoteEase</h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.logo-header {
  padding: 2rem 1rem 0.7rem 1.2rem;
  display: flex;
  align-items: center;
  height: 68px;
  font-weight: 700;
  font-size: 1.35rem;
  border-bottom: 1px solid #ececec;
}
.logo-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 12px;
  margin-right: 0.85rem;
  background: #fbbf24; /* Accent */
}
.logo-title {
  font-size: 1.35rem;
  color: #374151; /* Secondary */
  font-weight: 700;
  letter-spacing: 1px;
}
</style>
