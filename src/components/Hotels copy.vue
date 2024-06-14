<template>
  <v-app class="main">
    <div class="hotels_article">
      <v-container>
        <h3 class="article_heading">HOTELS</h3>
    <div v-for="(hotel, index) in hotels" :key="index" class="hotel_content">

    </div>
        <v-row>
          <v-col v-for="(item, index) in visibleItems" :key="index" cols="6" sm="6" md="6" class="img_hotel">
  <div class="article_container" :style="{ 'background-image': `url(${item.image})` }">
    <p class="article_container-text">{{ item.title }} <br> {{ item.price }}000 VND</p>
  </div>
</v-col>

      </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// const items = [
//   { title: 'Top 10 khách sạn nổi tiếng ở Thành phố Hồ Chí Minh', image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0', link: '/item top_10ks' },
// ];

const items = [
  { title: 'KHÁCH SẠN RẠNG ĐÔNG',
    price: 650 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: 'hotels',
  },
  { title: 'NIKKO SAIGON HOTEL',
    price: 2500 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },
  { title: 'MIA SAIGON LUXURY BOUTIQUE HOTEL',
    price: 2500 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },
  { title: 'LE MÉRIDIEN SAIGON HOTEL',
    price: 3100 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },
  { title: 'INTERCONTINENTAL SAIGON HOTEL',
    price: 4170 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },
  { title: 'HÔTEL DES ARTS SAIGON',
    price: 5000 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },
  { title: 'Sofitel Saigon Plaza',
    price: 4000 ,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPCDmfGwczMqrsBWhBq9nuTMkkwFAsVxIkZHGtqXlmBb1Pa759_Xysk5s2eoTADsBvwPR7lFZUZY-1rFiXQMxcXc04SdorzUKVYwNMtlKAIiTYn_M9kfJsWPUiqBjr7OtLCxOnje4MF4v2ZmrJZCMQY=w800-h600-s-no-gm?authuser=0',
    link: '/item top_10ks',
  },

  ];

const hotels = ref(
{
  tittle:'KHÁCH SẠN RẠNG ĐÔNG',
  image: '',
  content: 'Ưu đãi lên đến 55% khi đặt phòng trong tuần lễ du lịch 2023 áp dụng cho vận động viên "Giải chạy marathon Quốc Tế lần thứ 6". Chỉ từ 650.000VND/phòng/đêm bao gồm ăn sáng buffetHãy cùng nhau trải qua những khoảnh khắc tuyệt vời khám phá nghệ thuật, sáng tạo và những món ăn đặc sắc!',
}
);
const visibleItems = ref(items);

</script>

<style scoped>
.main {
  background-color: #ffffff;
}

.hotels_article{
  background-color: #ffffff;
  color: #2a2a2a;
}
.article_heading{
  text-align: center;
  font-size: 46px;
  margin: 40px 0;
}
.article_link{
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  display: block;
}
.article_link {
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  display: block;
}

.article_link:hover .article_container-text {
  margin-bottom: 24px;
  display: block;
}

.article_link:hover .article_container {
  transform: scale(1.02);
  transition: all 0.4s;
}

.article_link .article_container:hover:before {
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
.article_container {
  position: relative;
  overflow: hidden;
  height: 346px;
  border-radius: 24px;
  background: center no-repeat;
  background-size: cover;
  margin-bottom: 80px;
}

.article_container-text {
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

.article_container-text:before {
  background: #d50017;
  content: '';
  width: 6px;
  height: 24px;
  position: absolute;
  top: 0;
  left: 0;
}
@media screen and (max-width: 767px){
  .col[data-v-a487afb1]{
    max-width: 50% !important;
}
  }

</style>
