<template>
  <v-overlay :value="isLoading" color="#002025">
    <v-progress-circular
      indeterminate
      color="white"
      size="120"
      class="loader-circle"
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 4000); // 4 seconds
});
</script>

<style scoped>
.loader-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
