<template>
  <v-app>
    <v-main>
      <template v-if="!isWebserverRoute">
        <Navbar />
        <Backgroud />
      </template>
      <router-view />
      <template v-if="!isWebserverRoute">
        <Footer />
      </template>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isWebserverRoute = computed(() => route.path === '/Webserver')
</script>

<style>
</style>
