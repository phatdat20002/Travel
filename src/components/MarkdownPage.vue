<template>
   <!-- <div class="home">
    <a href="/">Back<i class="fa-solid fa-house"></i></a> >
  </div> -->
  <div class="markdown-content" v-html="markdownContent">
  </div>
  <FirestoreExample />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { marked } from 'marked'; // Sử dụng export đúng của 'marked'

const route = useRoute();
const markdownContent = ref('');

onMounted(async () => {
  const { mdFile } = route.params;
  try {
    const response = await axios.get(`/markdown/${mdFile}.md`);
    markdownContent.value = marked.parse(response.data);
  } catch (error) {
    console.error(error);
    markdownContent.value = '<p>Error loading content</p>';
  }
});
import '/public/markdown/cssmd.css';
</script>

<style scoped>
.markdown-content,.home {
  padding: 0;
  background-color:#ffffff;
  color:#000000;

}
</style>
