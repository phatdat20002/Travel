<template>
  <div class="slide">
    <v-container>
      <div class="scroll" ref="scrollButton" v-show="showScrollButton">
        <a href="#" class="scroll-down-button" @click="scrollToBottom">
          <i class="fa-solid fa-angles-down jump"></i>
        </a>
      </div>
      <h3 class="slide_heading">Trải nghiệm nổi bật</h3>
      <v-row>
        <v-col v-for="(item, index) in visibleItems" :key="index" cols="12" sm="6" md="3">
          <router-link :to="{ path: `/item/${item.link.split('/').pop()}`, params: { mdFile: item.link.split('/').pop() }}" class="slider_link">
            <div class="slider_container" :style="{ 'background-image': 'url(' + item.image + ')' }">
              <p class="slider_container-text">{{ item.title }}</p>
            </div>
          </router-link>
        </v-col>
      </v-row>
      <v-row v-if="showMoreButton" class="slide_showmore">
        <v-col cols="12">
          <v-btn @click="showMoreItems" class="slide_showmore-button">Xem thêm</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollButton = ref(false);

const scrollToBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth'
  });
}

const handleScroll = () => {
  showScrollButton.value = window.pageYOffset === 0;
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  setTimeout(() => {
    showScrollButton.value = false;
  }, 5000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


const items = [
  { title: 'Top 6 Cây Cầu Đẹp Nhất ở Thành phố Hồ Chí Minh', image: 'https://lh3.googleusercontent.com/pw/AP1GczMv7WRTvMCXBsGhLOCUKZjTEVnOgxs8kU_NMLkW5GwZUmHkCVjVrp23Su1ykoW9UDl8QpUeIzYdapFSPVXR1Bh_iVZ8SC-eV8FzRTZk_tLeeklkO5olGEJIn1HOWvsmZpoZGkcTA1M3sKWSxIL8w6v9=w600-h375-s-no-gm?authuser=0', link: '/item1' },
  { title: 'VÒNG QUANH THÀNH PHỐ HỒ CHÍ MINH TRÊN XE BUÝT HOP ON - HOP OFF - HÀNH TRÌNH KHÁM PHÁ NƠI QUEN MÀ LẠ', image: 'https://lh3.googleusercontent.com/pw/AP1GczMkBFwwA_VpfFAGgRRmB9RxRZrl_LMKkDEHusKsOI4oCYGALvmmv4ynXB-gDYoV1GXIc81DZAwc5gYwRIN4qUxcvWTQlyNPnijyjtpO4HB_0JXBY0x4x8VcdhHdBcToH61mIm5bNh1j04XbXXwNwO6v=w600-h400-s-no-gm?authuser=0', link: '/item2' },
  { title: 'Top 5 Quán Cafe Rooftop View đẹp Ở TPHCM', image: 'https://lh3.googleusercontent.com/pw/AP1GczOzcUXpUEvhiCs6d5cqmoILIyxB1_SJRRiNK-VmLW0SDIMKjOlZrUyGShP6UfhDeUDNuooqf2HkWe2vig5vkrSu-zr2ZZvGBBWP6jOFdw2KbWEpG-JKIH4sVHFqQV-LKBomUMIuwgBT4zfzqJl72SVA=w600-h368-s-no-gm?authuser=0', link: '/item3' },
  { title: 'Top 5 nhà hàng Pháp chuẩn vị Châu Âu tại TP.HCM', image: 'https://lh3.googleusercontent.com/pw/AP1GczNTL9T0UnILnEFEKZvp69ZRJ7Zsp3rxFvhCdz7BJG1Ij_Vv-tli8UgkkIs8wf3kSM-CCZqH0K11VBhU6cS8CTvuCLO-VuJVqFUTUtF7vhxlsdHTpePisuDkB-PR8GnhWxGpn4_iPwbsyrSdmhYilAUx=w600-h400-s-no-gm?authuser=0', link: '/item4' },
  { title: 'Top 5 công viên lớn nhất ở TPHCM', image: 'https://lh3.googleusercontent.com/pw/AP1GczP-iwAV5pvf-Lg-2yV95_WsDJ4bBIxiD-Fu5WWIYDOc5fQBzjbQtNVRa1Tfze9B3IJpDwBuk3goAs7Dj90pZFhtpTIw7sgKARRjvD1mSUwlrXf_Cy2s7c0UXDCf2-K16ltaMK4186FLhJXRD1DyjiHN=w600-h382-s-no-gm?authuser=0', link: '/item5' },
  { title: 'Từ Sài Gòn xưa đến Thành phố Hồ Chí Minh nay', image: 'https://lh3.googleusercontent.com/pw/AP1GczNFGfa46yQd7TENkHacM8IL4NnRLVwlCzQmEU36N9CrXKWpd3riQdOXfXFHfnMDlNYKdITbzWph8elTX4eczhubac5N4MxM2mb9fOEvFrcJg2m_Gz18E-ReOUeeTM_-nxc2mtOcSRQAR2OpDx3vqxvS=w600-h338-s-no-gm?authuser=0', link: '/item6' },
  { title: 'Trung tâm thương mại và khu mua sắm sầm uất giữa lòng thành phố', image: 'https://lh3.googleusercontent.com/pw/AP1GczNv1TCfBlwXQiAFNZbHrAUzv3RauqAu7Dsyq9Ddv0wdprhWyiDlqBOKDb9fYjRbSWwS8ZPrx_iyCShrSse-FUJD4m7KRLZK2J1fWTqHLCZISFAVVyv8OgE8bSa1VF3ha6lnPfBZIVVmBhjmPqNKFYha=w600-h415-s-no-gm?authuser=0', link: '/item7' },
  { title: 'Những khu chợ lớn nhất ở Thành phố Hồ Chí Minh', image: 'https://lh3.googleusercontent.com/pw/AP1GczOeHy5NB2YIqC9Di9AbebkGtCQ2lJGZhUxiEOJfV6B_5yw5QhB4Wi39AdcJQ61eaGuexFkSKDKam7sWeqb4jhYSLZIrTwoV3178JmHfk8G7yVYkx46LRnHlImcf1REQIvImvP3_kA8L3Q_rFt26ktkM=w600-h338-s-no-gm?authuser=0', link: '/item8' }
];

const visibleItems = ref(items.slice(0, 4));
const showMoreButton = ref(true);
const showMoreItems = () => {
  const currentLength = visibleItems.value.length;
  const nextItems = items.slice(currentLength, currentLength + 4);
  visibleItems.value.push(...nextItems);

  if (visibleItems.value.length >= items.length) {
    showMoreButton.value = false;
  }
};
</script>

<style scoped>
.slide {
  background-color: #ffffff;
  color: #2a2a2a;
}
.scroll{
  text-align: center;
    position: absolute;
    top: -10%;
    margin: auto;
    left: 49.2%;
}

.scroll i{
  color: #ffffff;
  font-weight: bolder;
  font-size: 24px;
}
.slide_heading {
  text-align: center;
  font-size: 46px;
  margin: 40px 0;
}

.slider_link {
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  display: block;
}

.slider_link:hover .slider_container-text {
  margin-bottom: 24px;
  display: block;
}

.slider_link:hover .slider_container {
  transform: scale(1.02);
  transition: all 0.4s;
}

.slider_link .slider_container:hover:before {
  content: '';
  background: rgb(42, 42, 42);
  background: -moz-linear-gradient(
    180deg,
    rgba(42, 42, 42, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(42, 42, 42, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    180deg,
    rgba(42, 42, 42, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  z-index: 2;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}

.slider_container {
  position: relative;
  overflow: hidden;
  height: 246px;
  border-radius: 24px;
  background: center no-repeat;
  background-size: cover;
}

.slider_container-text {
  position: absolute;
  color: #ffffff;
  z-index: 2;
  bottom: 0;
  left: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 12px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 12px;
  transition: all 0.5s;
  z-index: 2;
  letter-spacing: 1px;
}

.slider_container-text:before {
  background: #d50017;
  content: '';
  width: 6px;
  height: 24px;
  position: absolute;
  top: 0;
  left: 0;
}

.slide_showmore {
  width: 100%;
  text-align: center;
  margin-top: 24px;
}

.slide_showmore-button {
  background-color: #c0392b !important;
  font-size: 12px;
  border-radius: 24px !important;
}
.jump {
  animation: jump .8s infinite;
}

@keyframes jump {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
