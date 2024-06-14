
<template>
  <div class="Container">
    <h1 style="flex: 100%;color: black">Lịch trình được yêu thích</h1>
    <!-- Iterate over items and display each one -->
    <div v-for="(item, index) in items" :key="index" class="Content">
<a :href="item.link" @click.prevent="callFunction(item.link)">
  <img :src="item.image" alt="Plan Image">
  <p>{{ item.title }}</p>
</a>
</div>
  </div>
    <v-card >
  <v-tabs
    v-model="tab"
    bg-color="cyan-darken-1"
    
    style="justify-content:center;"
  >
      <div class="nav">
<v-tab value="one">Thành Phố</v-tab>
<v-tab value="two" >Mua Sắm</v-tab>
<v-tab value="three" >Khám Phá</v-tab>
<v-tab value="four" >Ẩm Thực</v-tab>

      </div>
  </v-tabs>

 
    <v-window v-model="tab">
      <v-window-item value="one">

        <div class="Container-2">
        
<div v-for="(item, index) in items2" :key="index" class="Content" >
      <a :href="item.link" @click.prevent="callFunction(item.link)">
        <img :src="item.image" alt="Plan Image">
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
      </v-window-item>

      <v-window-item value="two">

        <div class="Container-2">
          <div v-for="(item, index) in items3" :key="index" class="Content">
      <a :href="item.link" @click.prevent="callFunction(item.link)">
        <img :src="item.image" alt="Plan Image">
        <p>{{ item.title }}</p>
      </a>
    </div>
</div>
      </v-window-item>

      <v-window-item value="three">
        <div class="Container-2">
          <div v-for="(item, index) in items4" :key="index" class="Content">
      <a :href="item.link" @click.prevent="callFunction(item.link)">
        <img :src="item.image" alt="Plan Image">
        <p>{{ item.title }}</p>
      </a>
    </div>
</div>
      </v-window-item>

      <v-window-item value="four">
        <div class="Container-2">
          <div v-for="(item, index) in items5" :key="index" class="Content">
      <a :href="item.link" @click.prevent="callFunction(item.link)">
        <img :src="item.image" alt="Plan Image">
        <p>{{ item.title }}</p>
      </a>
    </div>
</div>
      </v-window-item>
    </v-window>
  
</v-card>

<div class="tour">
<section id="a"></section>
<div v-for="(item, index) in tours" :key="index" class="">
        <button @click="addToDetail(index)">
          <div class="img"><img :src="item.image" alt="Plan Image"></div>
          <div class="tour-content">
            <h3>{{ item.title }}</h3>
            <p><i class="fa-solid fa-map-pin" style='color:red; margin: auto 5px'></i>{{ item.addres}}</p>
          <p>{{ item.content }}</p>
          </div>
          <p style="color: red; position: absolute; bottom: 0; right: 0;">Xem Thêm</p>
          <i class="fa-solid fa-location-pin"><p class="index">{{ index+1 }}</p></i>
        </button>
    </div>
</div>

<!-- map -->
<div class="map" style="overflow: hidden;">
  <l-map :use-global-leaflet="false" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <!-- Add markers for each location -->
    <l-marker v-for="(location, index) in locations" :key="index" :lat-lng="location.coordinates">
      <l-popup>
      {{ location.name }} - Cách bạn: {{ calculateDistance(userLocation[0], userLocation[1], location.coordinates[0], location.coordinates[1]) }} km
      </l-popup>
    </l-marker>
    <l-marker v-if="userLocation" :lat-lng="userLocation" :icon="userIcon">
      <l-popup>Vị trí của bạn</l-popup>
    </l-marker>
  </l-map>
</div>

<div class="Container">
  <a href="#"><i class="fa-solid fa-angles-up" style="color: black; font-size: 200%; margin: 20px"></i></a>
</div>

<div class="detail" v-if="showdetail">
    <!-- Hiển thị chi tiết tour ở đây -->
      <div>
      <button @click="toggleDetail" style="position: absolute; top: 7px; right: 20px;font-size: 400%; z-index: 2">
<i class="fa-solid fa-square-arrow-up-right" style="color: #74C0FC;"></i></button>
    <div><img :src="selectedTour.image" alt="Plan Image"></div>
    <div>
    <h3><i class="fa-solid fa-star" style="color: #ff0000;font-size:150%"></i>{{ selectedTour.title }}</h3>
    <p><i class="fa-solid fa-location-dot"></i>{{ selectedTour.addres }}</p>
    <div class="scrollable-container" style="font-weight: 200;">
      <div v-html="selectedTour.content"></div>
    </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch  } from 'vue'; 
import { useRouter, useRoute } from 'vue-router'; 
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import biến L từ thư viện Leaflet

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const zoom = ref(10);
const center = ref([10.9137981,106.7106361]);
const locations = ref([]);
const userLocation = ref([]);
const userIcon = L.icon({
iconUrl: '../img/maps/mapslocationactive.png', // Đường dẫn đến biểu tượng của bạn
iconSize: [30, 38], // Kích thước của biểu tượng (chiều rộng, chiều cao)
iconAnchor: [16, 32], // Điểm neo của biểu tượng
});

const locations1 = ref([
{ name: 'NHÀ HÁT MÚA RỐI NƯỚC RỒNG VÀNG', coordinates: [10.7763113,106.6902167] },
{ name: 'LANDMARK 81 VINHOMES CENTRAL PARK', coordinates: [10.7951172,106.7195211] },
]);
const locations2= ref([
{ name: 'BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH', coordinates: [10.7795159,106.6895167] },
{ name: 'NHÀ THỜ ĐỨC BÀ (VƯƠNG CUNG THÁNH ĐƯỜNG ĐỨC BÀ)', coordinates: [10.7797908,106.696444] },
{ name: 'TÀU INDOCHINA QUEEN', coordinates: [10.7602752,106.7087505] },
]);
const locations3= ref([
{ name: 'LĂNG LÊ VĂN DUYỆT', coordinates: [10.7979133,106.6850912] },
{ name: 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH', coordinates: [10.7759709,106.6970727] },
{ name: 'BẢO TÀNG LỊCH SỬ THÀNH PHỐ HỒ CHÍ MINH', coordinates: [10.775997,106.6893479] },
{ name: 'TÀU INDOCHINA QUEEN', coordinates: [10.766426,106.7073293] }
]);

const items = ref([
{ title: 'khám phá thành phố về đêm', image: 'https://lh3.googleusercontent.com/pw/AP1GczNbxcBMGsL6x8Ypquh5nrcRZ0QLt4Yno3sLBBkOzqWPLcseUukUMrXL-ti4R9mC4E9b_vJhhWVIFnOzzMzrjVXrfpUOVMAKam-jTl6-DIj_h1ANFJH4W0s8zeK-BuBLUD2860aLBSeK-fUsSTrUY0uz=w600-h400-s-no-gm?authuser=0', link: 'tour2' },
{ title: 'sắc màu di sản thành phố', image: 'https://lh3.googleusercontent.com/pw/AP1GczMTR4175CMv0ADWu2ewoyjLxlW4zG6s35VvT9TEfd-N9ya_iqTfq1zJhts_TYofrKqdOWGkk9pkNQ8j48Rz4jaPFRu3Xw6802CSXdJbi7SS7to_n_k3xAXLSbkxWLXyLPVMqArDAdhAmzg_LBSeRsmu=w600-h397-s-no-gm?authuser=0', link: 'tour' },
{ title: 'khám phá thành phố trong 60 giờ', image: 'https://lh3.googleusercontent.com/pw/AP1GczM2fkVRj3Hs0UVSlrOnk91ZAF1giq1SXrUbVkPttIFLo8ixfkXM2a2HDl6oRZCOb3OUg8mCGlGDZXXWqbxDNq8qfOO4kgrqdEypcRURWC0C15uOrmAkfRsvVqgOx1CUkOcy6adDtLmCoFwXS8Gi-itf=w600-h463-s-no-gm?authuser=0', link: 'tour3' }
]);

const items2= ref([
{ title: 'ngắm thành phố trên mây', image: 'https://lh3.googleusercontent.com/pw/AP1GczP6BFFiyZLIpGiimJX8SXIOFILrh3ls4VkoLE2M55XxaOSebvZ-S1UD54XCBElDprxwoW0nPeHsqLW09kaRC332xw2X8tb6YgCzwujC_a59rcDu8gl2Kpd3XN4WtXv8IliQ_R5IuxB5sMf23-MuKgQa=w1317-h878-s-no-gm?authuser=0', link: 'tour'},
{ title: 'thành phố - xưa và nay', image: 'https://lh3.googleusercontent.com/pw/AP1GczO9hVoOhkuoKbiKZNFmW-OpOUjLvUonHS4j8nU-Gy0mkqvXGZ4DuA4fBtt5g4n5SfHiTckuiWNIjHy9Mid2MbuhUHYp-Zp05qSLenLucqfpddIT0-EVCEezK-C2M_VBXxcW6Ua-2aqCVkBzi-4jExn2=w600-h400-s-no-gm?authuser=0', link: 'tour2' },
{ title: 'khám phá nét xưa giữa lòng thành phố', image: 'https://photos.fife.usercontent.google.com/pw/AP1GczOL-nMsRtYyOTBm3JfqlH0jv19kH8D2P5LS2WJdN_EBLnR5E-NueNXY=w250-h192-s-no-gm?authuser=0', link: 'tour3' }
]);
const items3= ref([
{ title: 'dành cho tín đồ mua sắm', image: 'https://lh3.googleusercontent.com/pw/AP1GczODPVwvfbiDkpQC0OAFvycvgRKOaxr4t8qT39JyD72rdD9-S96bUyZZUeeRYtmzR0JIPywh7VtKNxX0ChuQ2DLXzfjQHxpEoO5avUaa2RWcOtnbkWvc61iSvWb2qB1rzGxFMQr5_N8JG60dGSi5320t=w600-h399-s-no-gm?authuser=0', link: 'tour' },
{ title: 'trải nghiệm ẩm thực đa sắc', image: 'https://lh3.googleusercontent.com/pw/AP1GczNP7JjmJUuzA_dX8IwKVo8dhOVZuBUzQaBjbAgEcoLVLLcKZN9OtBKxbIyqxHXFaqnzUEX1gKF25oZlnhXV_0tWXjZC32gi-ri775spSGfK5c45qMvPextt1JLmTHCT9oAxf5mXXtlXIN6aXZ3S3ByJ=w600-h337-s-no-gm?authuser=0', link: 'tour2' },
{ title: 'hành trình 2 ngày tìm về thiên nhiên', image: 'https://lh3.googleusercontent.com/pw/AP1GczNOZGsEKmJGDaPFRYxstulVu2Gt8AHqyGyVAnMtvZ0_v6R8UHBZS9S4uD-1LyONYFUx5_j7TsC_gCh9oAYp0k9D4C3Q6dTLwjn00A5Li8VooffSpFxU-5FdNBLLzqjbpUSY3wfvsNZfakukC4eeCN1i=w600-h275-s-no-gm?authuser=0', link: 'tour3' }
]);
const items4= ref([
{ title: 'sắc màu di sản thành phố', image: 'https://lh3.googleusercontent.com/pw/AP1GczNpfy1-hRgqJEsbN1TzFdx1NUlaSlrMslmwEC_NKH2l2mPin7vD6GqQQkfr5-gT20WzYWJR6KHnnoXyPQD9LYGSFJ7teun2QRd5xwOolYhpr2fSP41mwQ58ECxTFCSMDqx_bjqE36UGjUV_mKyR0RVi=w600-h397-s-no-gm?authuser=0', link: 'tour' },
{ title: 'chuyến dừng chân lý tưởng tại thành phố', image: 'https://lh3.googleusercontent.com/pw/AP1GczNyhVb0LE3MQCKnHWZly8Omr1QIy6n22Y1DiWfdQJyjR9C56G1NQ2uceqfwc4DDink4w82LtZpYqaJwNI8S2dIV2MWGcepryXbEnNkboK-qH3TNxyLrsBudjE9SEomiMeULIxdRwntw1oNNZ98v-4a7=w600-h425-s-no-gm?authuser=0', link: 'tour2' },
{ title: 'khám phá thành phố trong 60 giờ', image: 'https://lh3.googleusercontent.com/pw/AP1GczPL6A1o-PTaIaVsm4EdfPv_GIb_GuTSbtcyghZbZBSYdPOtRwwROZQPyl8kspK079-nKoZtfsrq9CcouZ8s5383VfJSSI7mmfIgaj6X6hhaAZhJ_cR_jsbRec1w7HeausIqetGQaqE2B-9mfGwIMS4D=w600-h463-s-no-gm?authuser=0', link: 'tour3' }
]);

// /img/plan/plan11.jpg
const items5= ref([
{ title: 'thưởng thức tinh hoa ẩm thực', image: 'https://lh3.googleusercontent.com/pw/AP1GczPL6A1o-PTaIaVsm4EdfPv_GIb_GuTSbtcyghZbZBSYdPOtRwwROZQPyl8kspK079-nKoZtfsrq9CcouZ8s5383VfJSSI7mmfIgaj6X6hhaAZhJ_cR_jsbRec1w7HeausIqetGQaqE2B-9mfGwIMS4D=w600-h463-s-no-gm?authuser=0', link: 'tour' },
{ title: 'hành trình dành cho tín đồ mua sắms', image: 'https://lh3.googleusercontent.com/pw/AP1GczN2T7WwNisWf6kjbFOBwGcxbIRApjeGektbPmTvwYbWQ9d4lAdYSKSLBU6YRgqyYSs1jVM7g_wWisQCmpzTvMOdE0Mu8f2OHIxOFB3x4JDxfmUmiq0b95A2yCFVtPkScHP_h9-A3tO5x1wyg5gPQ-DX=w600-h449-s-no-gm?authuser=0', link: 'tour2' },
{ title: 'khám phá thành phố trong 60 giờ', image: 'https://lh3.googleusercontent.com/pw/AP1GczNvIUmgx1s6vR4RcAQ42INzwwWCujnanPCprtupyFIEhHn5sRN1jqSGlp9MHweuRuU_ZJvVrwtt-vRLaHG4c6OtsQNr0KZgQp9Py-hlpjPCBOEy25WvcjQ7AbB3cuzf0FncPOQXdWXfMQVSywy4Bvqu=w600-h400-s-no-gm?authuser=0', link: 'tour3' }
]);


const items6= ref([
{ title: 'NHÀ HÁT MÚA RỐI NƯỚC RỒNG VÀNG', image: 'https://lh3.googleusercontent.com/pw/AP1GczMIfRotq0XsdyX883NkeiQa1miCbBDyF0emiAUDmb1NdMIy8XDnkMWZe7wae2aM0acmTjXZ8eJ-CsVZqAxRFOvlG7QCsMftjb4d-OH_FlVUYTBorHFerDMYE0PpGsKSDL09buTUWyqyudocbpxr1QEp=w600-h340-s-no-gm?authuser=0', addres: '55B Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1'
,content: 'Với hơn 10 năm hoạt động, nhà hát múa rối nước Rồng Vàng là một trong những địa điểm thưởng thức nghệ thuật múa rối nước lớn nhất tại Thành phố Hồ Chí Minh với quy mô lên đến 200 ghế ngồi. Nhà hát có 2 suất diễn vào lúc 17h và 18h30 hàng ngày.' },
{ title: 'LANDMARK 81 VINHOMES CENTRAL PARK', image: 'https://lh3.googleusercontent.com/pw/AP1GczOBFxHzCxgOwCXou1D9H5iG1QmelBTrUrxMnCOY2CzKUZq6t_eVTHC_sYv70pWBgwPA8XAI9YIfhVfmbWRLEqU7R9qsL6VkCPyM_DN5z2QUaeGoUOfZaR8ynA6ropgHH789cptG2sDU0fefatVypaQ4=w1317-h878-s-no-gm?authuser=0', addres: '720A Điện Biên Phủ, Vinhomes Central Park, Phường 22, Quận Bình Thạnh'
,content: 'Landmark 81 is the tallest building in Vietnam built by Vingroup in 2015 and officially put into operation in 2018. Designed based on the inspiration from a bunch of Vietnamese bamboo, Landmark 81 symbolizes strength, solidarity and the spirit of rising up in the culture and spirit of each Vietnamese person. On April 28, 2019, the tower continued to inaugurate the tallest skyview observatory in Vietnam and also the tallest building in Southeast Asia at that time.' },
]);
const items7= ref([
{ title: 'BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH', image: 'https://lh3.googleusercontent.com/pw/AP1GczNDn00hP7Dc3untcPBOPaIdsvcoqgZ44H6KlnAtJIJyx-6OQHf7PlMm_p_JXzIOkABBW2Awfn6uDGN3CEinXa7AjfYPHIqvhhPVdqbS_kY7a0J5J4PyGFJMlgVZVtWwZgikpZydmnPNdRqostYKilGR=w600-h433-s-no-gm?authuser=0', addres: '28 Võ Văn Tần, Phường 6, Quận 3'
,content: 'Bảo tàng Chứng tích Chiến tranh là Bảo tàng chuyên đề nghiên cứu, sưu tầm, lưu trữ, bảo quản và trưng bày những tư liệu, hình ảnh, hiện vật về những chứng tích tội ác và hậu quả của các cuộc chiến tranh mà các thế lực xâm lược đã gây ra đối với Việt Nam.  Bảo tàng lưu giữ hơn 20.000 tài liệu, hiện vật và phim ảnh, trong đó hơn 1.500 tài liệu, hiện vật, phim ảnh đã được đưa vào giới thiệu ở 8 chuyên đề trưng bày thường xuyên. Hiện nay với khoảng 500.000 lượt khách tham quan mỗi năm, Bảo tàng Chứng tích Chiến tranh là một trong những địa chỉ văn hóa du lịch có sức thu hút cao, được sự tín nhiệm của công chúng trong và ngoài nước.' },
{ title: 'NHÀ THỜ ĐỨC BÀ (VƯƠNG CUNG THÁNH ĐƯỜNG ĐỨC BÀ)', image: 'https://lh3.googleusercontent.com/pw/AP1GczOIyVVytpvB_8XbVQwz9Ntd1vBHUa5rs_C4QFbPdnLX0RX6ZVMKuJttQaBUUB3jQRpJJVMSR3Ub3gkUkz9GnG5CnYnjBibnWOGrdVM09On5JLLJL1etByF-VhqCAqdVhzvUNx2pXHQQwfTsmIMEmEYz=w600-h399-s-no-gm?authuser=0', addres: '01 Công xã Paris, Bến Nghé, Quận 1'
,content: 'Bưu điện Trung tâm Thành phố (Bưu điện Sài Gòn) là một trong những công trình kiến trúc hiện đại mang giá trị nghệ thuật tiêu biểu được xây dựng ở Sài Gòn vào cuối thể kỷ 19 với phong cách kiến trúc cổ điển Châu Âu.<br>Khởi công xây dựng vào ngày 14/11/1886 và hoàn thành vào năm 1891 do hai kiến trúc sư người Pháp là Alfred Foulhoux và Henri Auguste Vildieu thiết kế theo phong cách Baroque và cổ điển Châu Âu. Hơn 120 năm qua, nơi đây vẫn giữ được tầm vóc của một công trình kiến trúc, văn hoá nghệ thuật tráng lệ với các nét đặc trưng từ hoa văn, cánh cửa, mái ngói và vòm cung.<br>Bưu điện Thành phố được thiết kế theo cấu trúc tòa nhà ba tầng: tầng hầm, tầng trệt và tầng lầu với bố cục cân đối, đối xứng nhau qua trục trung tâ. Tầng hầm là nơi làm việc của nhân viên bưu điện; trục trung tâm gồm có tiền sảnh, đại sảnh ở tầng trệt được thiết kế thông tầng; tầng trên là phòng làm việc được xây nhô cao hơn so với hai khối nhà ở hai bên. Mặt tiền tầng lầu được trang trí kết hợp với phong accsh kiến trúc bản địa và phương Tây.<br>Các dịch vụ/hoạt động bổ sung phục vụ khách tham quan: quầy hàng lưu niệm, gửi thư và bưu thiếp,...<br>Các tuyến xe bus có trạm dừng gần nhất: 52, 18,19.<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Nhà Thờ Đức Bà; Dinh Độc Lập; Đường Sách Nguyễn Văn Bình; Thảo Cầm Viên.<br>Tips: Từ 08:30 - 10:00 (thứ 7) hàng tuần, Bưu điện Thành phố có phục vụ biểu diễn hòa tấu nhạc cụ dân tộc.' },
{ title: 'TÀU INDOCHINA QUEEN', image: 'https://lh3.googleusercontent.com/pw/AP1GczMItAvKd1XfohBrkJReetNvlVmaAOJAgCq1NAgl1rpruZ2xlfKHuYtStUwbZdZo56Kdmug-YDemBgRqGXW7JG4nmoAqp4vMQEtd4cYf9Ok-U4Oq2c33YrQeTm2CKbP24GwUuoRCTxKRUOasIDMKhDl4=w600-h291-s-no-gm?authuser=0', addres: '5 Nguyễn Tất Thành, Phường 12, Quận 4'
,content: 'Tàu Indochina Queen sẽ đồng hành cùng du khách trên chuyến hành trình du ngoạn vượt sông Sài Gòn, ngắm nhìn khung cảnh tráng lệ của Thành phố khi lên đèn. Không gian sang trọng, thực đơn tối đa dạng hương sắc cùng những màn trình diễn âm nhạc đặc sắc, mang âm hưởng hiện đại lẫn truyền thống hứa hẹn sẽ mang lại trải nghiệm tuyệt vời cho du khách.' },
]);
const items8= ref([
{ title: 'LĂNG LÊ VĂN DUYỆT', image: 'https://lh3.googleusercontent.com/pw/AP1GczPK61OXCrJ0X8ApP2bnAGoPKMmmTaVd4zVQ4sqvyTIf_frbkzm0gR0Ge3aA_yx9ygVsAZM6EaIxH3e0Wa86j5K-87uFPxlpMU2tzpTOxxTJ6FUzxYZ1WZrB-jAOnIRFbWaVPW0mia9klf7JjMc2myMK=w250-h192-s-no-gm?authuser=0', addres: '1 Vũ Tùng, Phường 1, Quận Bình Thạnh'
,content: 'Lăng Lê Văn Duyệt (thường gọi lăng Ông - Bà Chiểu) là khu đền và mộ của Tả quân Lê Văn Duyệt (1764-1832). Ngày 6 tháng 12 năm 1989, toàn bộ khu lăng được Bộ Văn hoá công nhận là di tích Lịch sử Văn hoá cấp quốc gia. <br>Từ cổng tam quan ở phía nam (đường Vũ Tùng) vào qua một khu vườn cảnh là 3 phần chính: nhà bia nơi đặt bia đá ghi công đức, mộ tả quân và vợ (có bình phong và tường bao quanh) và miếu thờ gồm tiền điện, trung điện và chính điện.<br>Hằng năm, tại lăng đều có tổ chức lễ giỗ Lê Văn Duyệt long trọng, vào các ngày 29 hoặc 30-7, mồng 1 và 2-8 âm lịch.' },
{ title: 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH', image: 'https://lh3.googleusercontent.com/pw/AP1GczMPbC6SJHqg2U6_u0qeMCpL8SWIDIJdmW_av0PSoUmkqHcZmFtWk7r092wBkLoAebvM34I3rpWVWrlloHbHEc4OLlRkv04e64Osoa947FB6m2jl-b3U0wAP2AGp1I2_GeWZI_khfR1c8mXKwsYq6Qwz=w600-h400-s-no-gm?authuser=0', addres: '65 Lý Tự Trọng, Phường Bến Nghé, Quận 1'
,content: 'Bảo tàng Thành phố Hồ Chí Minh là một trong những công trình tại trung tâm thành phố Sài Gòn do chính quyền thực dân Pháp tiến hành xây dựng gần cuối thế kỷ 19 nhằm tạo nên một không gian bảo tàng thương mại để trưng bày các sản phẩm địa phương. Công trình do kiến trúc sư người Pháp thiết kế, xây dựng vào năm 1885 và khánh thành vào năm 1890. Sau khi khánh thành, công trình được sử dụng làm dinh thự và sau ngày 30 tháng 4 năm 1975, được sử dụng làm nơi sinh hoạt văn hoá, biểu diễn nghệ thuật và triển lãm các chuyên đề thời sự phục vụ người dân. Về kiến trúc, toà nhà được xây dựng dựa trên phong cách cổ điển châu Âu nhưng phần mái ngói nhà mang nét Á Đông khi được làm bằng thép, lợp ngói âm dương, cùng đường diềm mái là một dải phù điêu với các loại cây cỏ xen kẻ các chim thú đặc trưng miền sông nước Nam Bộ như cá sấu, tôm, cò, diệc…<br>Hiện nay, bảo tàng có diện tích trưng bày trên 2000m2, gồm các nội dung: Địa lý - Hành chính Sài Gòn - Thành phố Hồ Chí Minh - Thiên nhiên - Khảo cổ - Thương cảng - Thương mại - Dịch vụ - Công nghiệp - Tiểu thủ công nghiệp - Văn hóa - Đấu tranh Cách mạng - Kỷ vật kháng chiến – Vũ khí chiến đấu - Tiền Việt Nam - Đường hầm “Dinh Gia Long”. Tại đây, bảo tàng có các đội ngũ thuyết minh viên trực hướng dẫn bằng 02 ngôn ngữ: Tiếng Việt và tiếng Anh, khu vực nghỉ chân và nước uống phục vụ khách tham quan tại khu vực trưng bày.<br>Các tuyến xe bus có trạm dừng gần nhất: 04, 18, 93, 44, 31, 36, 28<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Phố đi bộ Nguyễn Huệ; Chợ Bến Thành; Dinh Độc Lập; Nhà thờ Đức Bà; Bưu điện Thành phố.<br>Điều lưu ý dành cho du khách khi đến tham quan và trải nghiệm: Trang phục gọn gàng, lịch sự. Gửi hành lý, tư trang tại tủ đồ của Bảo tàng (trừ tiền và các vật dụng có giá trị). Có ý thức bảo vệ di tích và tài liệu, hiện vật được trưng bày, giữ gìn vệ sinh chung. Khách tham quan có nhu cầu hướng dẫn tham quan, xin liên hệ với bộ phận thuyết minh (thuộc phòng Giáo dục – Truyền thông và quan hệ công chúng) để được phục vụ.<br>' },
{ title: 'BẢO TÀNG LỊCH SỬ THÀNH PHỐ HỒ CHÍ MINH', image: 'https://lh3.googleusercontent.com/pw/AP1GczN7fz3a5PK3lBC1RQl6gEsL2CFu3PDm9kh3pr3Nj-Xqx34k_jDn80IA7Mj_1rJ7Mm0YqX1uSydRIdKJCG3-e6_p_3qrNJQ8J9_7VHtsYPDcgitQLiE2j2qKZrNyAVgv3yeD-YQWpb02tlY7iucys1TT=w600-h400-s-no-gm?authuser=0', addres: '02 Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1'
,content: 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh là một trong số ít các công trình kiến trúc ở thành phố Hồ Chí Minh thể hiện sự giao lưu văn hóa và kiến trúc Pháp – Việt vào nửa đầu thế kỉ 20. Bảo tàng được tkiến trúc sư người Pháp thiết kế theo phong cách kiến trúc “phong cách Đông Dương” khi có sự phối hợp nghệ thuật kiến trúc truyền thống bản địa với bố cục, kỹ thuật phương Tây. Hệ thống trưng bày gồm 17 phòng, với hai nội dung chính: Giới thiệu tiến trình phát triển lịch sử Việt Nam, từ thời Tiền Sử (cách đây 500.000 năm), các triều đại phong kiến Việt Nam cho đến thời Nguyễn 1945 và giới thiệu các đặc trưng văn hóa phương Nam của Việt Nam, cũng như một số nước Châu Á. Ngoài ra, bảo tàng có các dịch vụ hỗ trợ như: dịch vụ thuyết minh, hướng dẫn, biểu diễn nghệ thuật Múa rối nước dân gian và dịch vụ chuyên môn như tư vấn giám định, trưng bày và bảo quản hiện vật.<br>Các tuyến xe bus có trạm dừng gần nhất: 05, 06, 14, 18, 53.<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Bảo tàng Chiến dịch Hồ Chí Minh; Dinh Thống Nhất; Nhà thờ Đức Bà; Bưu điện Thành phố; Đền thờ Hùng Vương.<br>Điều lưu ý dành cho du khách khi đến tham quan và trải nghiệm: Không hút thuốc trong khuôn viên Bảo tàng. Không chụp ảnh/quay phim hiện vật, không sờ, chạm hiện vật.<br>' },
{ title: 'TÀU INDOCHINA QUEEN', image: 'https://lh3.googleusercontent.com/pw/AP1GczMItAvKd1XfohBrkJReetNvlVmaAOJAgCq1NAgl1rpruZ2xlfKHuYtStUwbZdZo56Kdmug-YDemBgRqGXW7JG4nmoAqp4vMQEtd4cYf9Ok-U4Oq2c33YrQeTm2CKbP24GwUuoRCTxKRUOasIDMKhDl4=w600-h291-s-no-gm?authuser=0', addres: '5 Nguyễn Tất Thành, Phường 12, Quận 4'
,content: 'Tàu Indochina Queen sẽ đồng hành cùng du khách trên chuyến hành trình du ngoạn vượt sông Sài Gòn, ngắm nhìn khung cảnh tráng lệ của Thành phố khi lên đèn. Không gian sang trọng, thực đơn tối đa dạng hương sắc cùng những màn trình diễn âm nhạc đặc sắc, mang âm hưởng hiện đại lẫn truyền thống hứa hẹn sẽ mang lại trải nghiệm tuyệt vời cho du khách.' },]);


const tab = ref(null);
const tours = ref([]);
const selectedTour = ref({});
const showdetail = ref(false);

const updateCenter = (newCenter) => {
zoom.value = 12;
center.value = newCenter;
};

const setCoordinates = (lat, lng) => {
center.value = [lat, lng];
markerLatLng.value = [lat, lng];
};

const toggleDetail = () => {
showdetail.value = !showdetail.value;
};

const handleTabChange = (value) => {
console.log("Tab changed:", value);
};

const addToDetail = (index) => {
selectedTour.value = tours.value[index];
toggleDetail();
};

const callFunction = (value) => {
// Gọi function có tên là giá trị được truyền vào
if(value==='tour'){
  tour();
} else
if(value==='tour2'){
  tour2();
} else 
if(value==='tour3'){
  tour3();
}
}

const tour = () => {
tours.value = items6.value;
updateCenter([10.7951172,106.7195211]);
locations.value = locations1.value;
console.log(tours);
window.location.href = '#a';
};

const tour2 = () => {
tours.value = items7.value;
updateCenter([10.7797908,106.696444]);
locations.value = locations2.value;
window.location.href = '#a';
};

const tour3 = () => {
tours.value = items8.value;
updateCenter([10.775997,106.6893479]);
locations.value = locations3.value;
window.location.href = '#a';
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Tạo một marker tại vị trí của người dùng
      userLocation.value = ([userLat, userLng]);
      center.value = ([userLat, userLng]);
    },
    function(error) {
      console.error('Error getting user location:', error);
      // Xử lý lỗi
    }
  );
} else {
  console.error('Geolocation is not supported by this browser.');
  // Xử lý khi trình duyệt không hỗ trợ Geolocation API
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return distance rounded to 2 decimal places
}
</script>

<style scoped>
html{
  scroll-behavior: smooth;
}
.Container {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 50px;
}
.nav{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.Container>h1{
  text-align: center;
}
.Content {
  max-width: 470px;
  max-height: 470px;
  overflow: hidden;
  margin: 20px;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
}
.Content img {
  height: 100%;
}

.Content p{
  z-index: 1;
  position: absolute;
  bottom: 20px;
  left: 20px;
  text-transform: uppercase;
  color: white;
  font-size: 26px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.Content img, .Content p {
  transition: transform 0.7s ease; /* Apply transition to the transform property */
}

.Content:hover img {
  transform: scale(1.2); /* Scale up the image */
  filter: brightness(0.5); /* Giảm độ sáng của hình ảnh khi hover */
}   

.Content:hover p {
  transform: translateY(-20px); /* Move the paragraph 20px upwards */
}

.Content:hover::before{
background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%);
  transition: background-color 0.3s ease; /* Smooth transition for color change */
}
.Container-2{
background-color: #F1F1F1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 40px;
}

.v-slide-group__content{
background-color: white;
color: black;
display: flex;
justify-content: center !important;
}

.v-btn {
margin: auto 5px;
border: 1px solid #333; /* Thêm border với kiểu solid và màu đen */
border-bottom: 0px;
border-radius: 20px 20px 0 0 !important;
}

.v-tab--selected{
background-color: #F1F1F1;
}

.v-tab__slider{
display: none;
}

.tour{
width: 75%;
display: flex;
flex-wrap: wrap;
margin: auto;
position: relative;
justify-content: space-between;
}
.tour::before{
position: absolute;
background-color: white;
content: "";
width: 200vw;
height: 100%;
left: -20%;
top: 0;
}

.tour>div{
width: 50%;
display: flex;
margin: 20px 0;
}

.tour button{
width: 95%;
position: relative;
overflow: hidden;
}

.tour .img{
width: 200px;
height: 200px;
overflow: hidden;
border-radius: 20px;
}

.tour button img{
width: 100%;
height: 100%
}

.tour-content{
 text-align: left;
 position: absolute;
 left: 220px;
 top: 0;
 height: 75%;
 overflow: hidden;
}

.tour-content>h3{
color: black;
font-weight: 1000;
}

.tour-content>p{
font-weight: 300;
color: black;
}

.fa-location-pin{
color: red;
position: absolute;
top: 5px;
font-size: 300%;
left: 180px;
}

.index{
color: white;
position: absolute;
font-size: 50%;
top: 10px;
left: 10px;
}

.detail{
position: fixed;
height: 100vh;
width: 100vw;
top: 0;
background-color: rgba(0, 0, 0, 0.8);
display: flex;
align-items: center;
justify-content: center;
z-index: 3;
}
.detail>div{
border-radius: 50px;
height: 80%;
width: 80%;
position: relative;
background-color: white;
overflow: hidden;
display: flex;
justify-content: space-between;
}

.detail>div>div{
width: 48%;
height: 100%;
position: relative;
}

.detail img{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover; /* hoặc background-size: cover; */
}


.detail>div>div:last-child >*{
width: 85%;
color: black;
font-size: 150%;
margin: 30px 0;
}

.scrollable-container {
  width: 100px; /* Chiều rộng của thẻ chứa, có thể điều chỉnh theo ý muốn */
  height: 50%; /* Chiều cao của thẻ chứa, có thể điều chỉnh theo ý muốn */
  overflow: auto; /* Hiển thị thanh trượt khi nội dung vượt quá kích thước của thẻ */
}

/* Đảm bảo bản đồ có kích thước cụ thể */
.leaflet-container{
height: 400%;
width: 80% !important;
z-index: 1;
border-radius: 30px;
}
.map{
width: 100vw;
height: 400px;  
background-color: white;
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
padding: 40px;
}

@media screen and (min-width: 0px) and (max-width: 1190px) {
.Content{
  max-width: 290px;
  max-height: 290px;
}
.leaflet-container{
width: 80% !important;
}
.tour>div{
  width: 100%;
}
}
@media screen and (max-width: 780px){
.Container h1{
  font-size: 160%;
}
.Content{
  max-width: 100vw;
  max-height: 320px;
}
.Content img{
  width: 80vw;
}
.tour >div{
  height: 400px;
}

.tour>div>button>div:first-child{
  top: 0;
  position: absolute;
}
.tour-content{
  top: 210px;
  left: 0px;
  height: 170px;
}
.v-btn__content{
  font-size: 60%;
}
.v-btn--variant-text{
  padding: 0px !important;
  margin: 1px !important;
}
}
/* mobile */
@media screen and (max-width: 767px){
  .Content p, .tour-content>h3{
    font-size: 14px;
  }
  .tour-content>p {
    font-size:12px;
  }
  .detail>div{
    height: 60%;
  }
  .detail>div>div:last-child >*{
    font-size: 10px;
    margin-top:30px;
    margin-bottom:12px;
  }
}
</style>

