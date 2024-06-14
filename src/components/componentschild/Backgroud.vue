<template>
  <v-carousel class="carousel-container" hide-delimiter-background cycle  interval="3000" :show-arrows="false">
    <v-carousel-item v-for="(item, index) in backgrounds" :key="index">
      <img :src="item.image" :alt="'Background ' + (index + 1)" class="background-img">
      <div class="content header_background-container">
        <h3 class="header_background-container-heading">{{ item.title }}</h3>
        <p class="header_background-container-text">{{ item.description }}</p>
        <p class="header_background-container-info">{{ item.info}}</p>
        <router-link class="header_background-container-btn" :to="item.route">{{ item.buttonText }}</router-link>
      </div>
      <v-col class="box-mv-content">
      </v-col>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue';
const backgrounds = ref([
  { 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPk3EtAN7cK3vXTOVD2_6bsz35LOSOyJWbBkNJEMAxMaS7cxCawbTQKflnc518pRAg165RP7GVt262oibL8lGCOWAN0TJJmYMvY48LtI-UCvZmJ2Ny5luh8f73KRNxWhR5H1b-v9CA4JLjWnYPFDXP6=w800-h490-s-no-gm?authuser=0', 
    title: 'Ẩm Thực', 
    description: '5 Nhà hàng ăn sáng kiểu Tây ở  Thành phố Hồ Chí Minh',
    info:'Nếu bạn đang tìm kiếm nhà hàng ăn sáng kiểu tây thì danh sách sau dành cho bạn. Xem ngay danh sách...',
    buttonText: 'Xem Thêm',
    route: '/item/item4'
  },
  { 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNRls2ycAbrSjOjePvOSi3IOT2JkEPiGuXyIqRTLiqnV403h37r7DdPXGjosuaAIbz649CS77Q-2zCoI2idmMnqtbkugN7YDFtshhI9VisYGpVDdDgSLB03_u4-3wFSAXC2wxMhQTUm55SeL3w3WPfs=w1317-h878-s-no-gm?authuser=0', 
    title: 'Văn hóa & Lịch sử', 
    description: '5 địa điểm truyền cảm hứng lịch sử ở thành phố', 
    info:' ',
    buttonText: 'Xem Thêm',
    route: '/item/item6'
  },
  { 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNYhsTWTTAC5TDoJNSftAVJE9Sg6dkFPZZdizBHDQ6t1kRNPmO2kAv8PFGriThgt98EmoOGZUL8eWzZYxzhzesXbGK13bIXiHK-7RjSD0V9bwLkjJ73RQsnyjnjOUhKoE4Pu7uJCAS21lrpYk9AiHk6=w1316-h878-s-no-gm?authuser=0', 
    title: 'Văn hóa & Lịch sử', 
    description: 'Top 5 công viên lớn nhất ở TPHCM', 
    info:'Thành phố Hồ Chí Minh là một trong những đô thị đông dân nhất Việt Nam, với số lượng dân cư liên tục tăng cao. Để đáp ứng nhu cầu giải trí của người dân, thành phố đã xây dựng nhiều công viên để cung cấp không gian xanh cho mọi người. Trong bài viết này, chúng ta sẽ cùng điểm qua top 9 công viên lớn nhất ở TPHCM....',
    buttonText: 'Xem Thêm',
    route: '/item/item5'
  }
]);
</script>

<style scoped>
.v-btn{
  border-radius: 20px !important;
}
.grid {
  margin: 0 120px;
}
.background-img {
  width: 100%;
  height: 100vh; 
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.content {
  position: absolute;
  left: 20px; 
  top: 55%;
  z-index: 100;
  transform: translateY(-50%);
  color: white;
  z-index: 100; 
  max-width: 520px;
}
.header_background-container-heading {
  font-size: 12px;
  font-weight: bold;
  color: #ccc;
  position: relative;
  margin-bottom: 12px;
}
.box-mv-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    background: rgb(0, 0, 0);
    background: -moz-linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    background: -webkit-linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    z-index: 2;
  }
.header_background-container-text {
  font-size: 28px;
  font-weight: bold;
  line-height: 1.4;
}
.header_background-container-info{
  line-height: 1.4;
  font-size: 12px;
 
}
.header_background-container-heading{
  padding-left: 0.8rem;
  border-left: solid 2px #D50017;
}
.header_background-container-btn {
  text-decoration: none;
  display: block;
  margin-top: 20px;
  background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.header_background-container-btn:hover  {
    background-position: 100% 0;
    -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}
@media screen and (max-width: 767px){
    .grid {
    margin: 0 40px !important;
  }
  .header_background-container{
    margin-left:2.42vw !important;
    top: 58% !important;
  }
  .header_background-container-heading{
    font-size: 18px;
    color: #ccc;
  }
  .header_background-container-text {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  /* .header_background-container-info{

  
  } */
  .header_background-container-btn{
    display: none !important;
  }

  .background-img{
    width: 100%;
    height: 50vh; 
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .carousel-container {
      height: 50vh !important;
    }
}
@media screen and (min-width: 768px) {
    .carousel-container {
      height: 100vh !important;
    }
  }
</style>
