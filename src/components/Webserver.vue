<template>
  <v-carousel :show-arrows="false"
    height="100vh"
    progress="primary"
    hide-delimiters
  >
  <v-row>
    Back
  </v-row>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="back"><router-link class="back-link button-85" to="/"><i class="fa-solid fa-arrow-left"></i>Back</router-link></div>
          <div class="content">
            Hiện tại trang này<br> chúng tôi đang trong giai đoạn phát triển<br> vui lòng quay lại sau!
          </div>  
          <img :src="slide.image" :alt="`Slide ${i + 1}`" class="carousel-image">
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'

const slides = ref([
  { image: 'https://mona.solutions/template/images/blog-banner.jpg' },
])
</script>

<style scoped>
.back-link{
  color:rgb(76,175,80);
}
.back-link i {
  margin-right: 6px;
}
.back{
    position: absolute;
    z-index: 1;
    top: 4%;
    left: 1%;
}
.carousel-image {
  width: 100%;
  height: 100%;
}
.content{
  position: absolute;
    color: #ffffff;
    z-index: 1;
    font-size: 26px;
    text-transform: uppercase;
    left: 20px; 
    font-weight: bold;
  }
/* CSS */
.button-85 {
  font-size: 12px;
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-decoration: none;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
/* moblie */
@media screen and (max-width: 767px){
  .content{
    font-size: 14px;
    height: 92px;
    display: flex;
    width: 170px;
  }
  }
</style>
