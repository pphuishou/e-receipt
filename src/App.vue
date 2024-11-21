<script setup>
import { onUnmounted } from 'vue';

onUnmounted(() => {
  sessionStorage.removeItem('SETOPENID');
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
