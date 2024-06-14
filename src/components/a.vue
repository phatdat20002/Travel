
<template>
    <Backgroud />
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
  
        <v-card>
      <v-tabs
        v-model="tab"
        bg-color="primary"
      >
      <v-tab value="one">Chủ đề 1</v-tab>
  <v-tab value="two" >Chủ đề 2</v-tab>
  <v-tab value="three" >Chủ đề 3</v-tab>
  <v-tab value="four" >Chủ đề 4</v-tab>
  
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
    <div class="map" style="overflow: hidden;">
      <l-map :use-global-leaflet="false" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- Add markers for each location -->
        <l-marker v-for="(location, index) in locations" :key="index" :lat-lng="location.coordinates">
          <l-popup>{{ location.name }}</l-popup>
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
  
    <div></div>
    </template>
    
      <script>
      import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
      import 'leaflet/dist/leaflet.css';
      export default {
        components: {
        LMap,
      LTileLayer,
      LMarker,
      LPopup,
      },
        data() {
          return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          zoom: 1,
          center: [10.9137981,106.7106361], 
        
          locations: [],
        locations1: [
          { name: 'NHÀ HÁT MÚA RỐI NƯỚC RỒNG VÀNG', coordinates: [10.7763113,106.6902167] },
          { name: 'LANDMARK 81 VINHOMES CENTRAL PARK', coordinates: [10.7951172,106.7195211] },
        ],
        locations2: [
          { name: 'BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH', coordinates: [10.7795159,106.6895167] },
          { name: 'NHÀ THỜ ĐỨC BÀ (VƯƠNG CUNG THÁNH ĐƯỜNG ĐỨC BÀ)', coordinates: [10.7797908,106.696444] },
          { name: 'TÀU INDOCHINA QUEEN', coordinates: [10.7602752,106.7087505] },
        ],
        locations3: [
          { name: 'LĂNG LÊ VĂN DUYỆT', coordinates: [10.7979133,106.6850912] },
          { name: 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH', coordinates: [10.7759709,106.6970727] },
          { name: 'BẢO TÀNG LỊCH SỬ THÀNH PHỐ HỒ CHÍ MINH', coordinates: [10.775997,106.6893479] },
          { name: 'TÀU INDOCHINA QUEEN', coordinates: [10.766426,106.7073293] }
        ],
        
  
          tab: null,
          tours: [],
          selectedTour: {},
          showdetail: false,
          
          items: [
            { title: 'khám phá thành phố về đêm', image: '/img/plan/plan1.jpg', link: 'tour2' },
            { title: 'sắc màu di sản thành phố', image: '/img/plan/plan2.jpg', link: 'tour' },
            { title: 'khám phá thành phố trong 60 giờ', image: '/img/plan/plan3.jpg', link: 'tour3' }
          ],
  
          items2: [
            { title: 'ngắm thành phố trên mây', image: '/img/plan/plan4.jpg', link: 'tour'},
            { title: 'thành phố - xưa và nay', image: '/img/plan/plan5.jpg', link: 'tour2' },
            { title: 'khám phá nét xưa giữa lòng thành phố', image: '/img/plan/plan6.jpg', link: 'tour3' }
          ],
          items3: [
            { title: 'dành cho tín đồ mua sắm', image: '/img/plan/plan7.png', link: 'tour' },
            { title: 'trải nghiệm ẩm thực đa sắc', image: '/img/plan/plan8.jpg', link: 'tour2' },
            { title: 'hành trình 2 ngày tìm về thiên nhiên', image: '/img/plan/plan9.jpg', link: 'tour3' }
          ],
          items4: [
            { title: 'sắc màu di sản thành phố', image: '/img/plan/plan2.jpg', link: 'tour' },
            { title: 'chuyến dừng chân lý tưởng tại thành phố', image: '/img/plan/plan10.jpg', link: 'tour2' },
            { title: 'khám phá thành phố trong 60 giờ', image: '/img/plan/plan3.jpg', link: 'tour3' }
          ],
          items5: [
            { title: 'thưởng thức tinh hoa ẩm thực', image: '/img/plan/plan11.jpg', link: 'tour' },
            { title: 'hành trình dành cho tín đồ mua sắms', image: '/img/plan/plan12.jpg', link: 'tour2' },
            { title: 'khám phá thành phố trong 60 giờ', image: '/img/plan/plan1.jpg', link: 'tour3' }
          ],
  
  
          items6: [
            { title: 'NHÀ HÁT MÚA RỐI NƯỚC RỒNG VÀNG', image: '/img/plan/plan13.jpg', addres: '55B Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1'
            ,content: 'Với hơn 10 năm hoạt động, nhà hát múa rối nước Rồng Vàng là một trong những địa điểm thưởng thức nghệ thuật múa rối nước lớn nhất tại Thành phố Hồ Chí Minh với quy mô lên đến 200 ghế ngồi. Nhà hát có 2 suất diễn vào lúc 17h và 18h30 hàng ngày.' },
            { title: 'LANDMARK 81 VINHOMES CENTRAL PARK', image: '/img/plan/plan4.jpg', addres: '720A Điện Biên Phủ, Vinhomes Central Park, Phường 22, Quận Bình Thạnh'
            ,content: 'Landmark 81 is the tallest building in Vietnam built by Vingroup in 2015 and officially put into operation in 2018. Designed based on the inspiration from a bunch of Vietnamese bamboo, Landmark 81 symbolizes strength, solidarity and the spirit of rising up in the culture and spirit of each Vietnamese person. On April 28, 2019, the tower continued to inaugurate the tallest skyview observatory in Vietnam and also the tallest building in Southeast Asia at that time.' },
          ],
          items7: [
            { title: 'BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH', image: '/img/plan/plan14.jpg', addres: '28 Võ Văn Tần, Phường 6, Quận 3'
            ,content: 'Bảo tàng Chứng tích Chiến tranh là Bảo tàng chuyên đề nghiên cứu, sưu tầm, lưu trữ, bảo quản và trưng bày những tư liệu, hình ảnh, hiện vật về những chứng tích tội ác và hậu quả của các cuộc chiến tranh mà các thế lực xâm lược đã gây ra đối với Việt Nam.  Bảo tàng lưu giữ hơn 20.000 tài liệu, hiện vật và phim ảnh, trong đó hơn 1.500 tài liệu, hiện vật, phim ảnh đã được đưa vào giới thiệu ở 8 chuyên đề trưng bày thường xuyên. Hiện nay với khoảng 500.000 lượt khách tham quan mỗi năm, Bảo tàng Chứng tích Chiến tranh là một trong những địa chỉ văn hóa du lịch có sức thu hút cao, được sự tín nhiệm của công chúng trong và ngoài nước.' },
            { title: 'NHÀ THỜ ĐỨC BÀ (VƯƠNG CUNG THÁNH ĐƯỜNG ĐỨC BÀ)', image: '/img/plan/plan15.jpg', addres: '01 Công xã Paris, Bến Nghé, Quận 1'
            ,content: 'Bưu điện Trung tâm Thành phố (Bưu điện Sài Gòn) là một trong những công trình kiến trúc hiện đại mang giá trị nghệ thuật tiêu biểu được xây dựng ở Sài Gòn vào cuối thể kỷ 19 với phong cách kiến trúc cổ điển Châu Âu.<br>Khởi công xây dựng vào ngày 14/11/1886 và hoàn thành vào năm 1891 do hai kiến trúc sư người Pháp là Alfred Foulhoux và Henri Auguste Vildieu thiết kế theo phong cách Baroque và cổ điển Châu Âu. Hơn 120 năm qua, nơi đây vẫn giữ được tầm vóc của một công trình kiến trúc, văn hoá nghệ thuật tráng lệ với các nét đặc trưng từ hoa văn, cánh cửa, mái ngói và vòm cung.<br>Bưu điện Thành phố được thiết kế theo cấu trúc tòa nhà ba tầng: tầng hầm, tầng trệt và tầng lầu với bố cục cân đối, đối xứng nhau qua trục trung tâ. Tầng hầm là nơi làm việc của nhân viên bưu điện; trục trung tâm gồm có tiền sảnh, đại sảnh ở tầng trệt được thiết kế thông tầng; tầng trên là phòng làm việc được xây nhô cao hơn so với hai khối nhà ở hai bên. Mặt tiền tầng lầu được trang trí kết hợp với phong accsh kiến trúc bản địa và phương Tây.<br>Các dịch vụ/hoạt động bổ sung phục vụ khách tham quan: quầy hàng lưu niệm, gửi thư và bưu thiếp,...<br>Các tuyến xe bus có trạm dừng gần nhất: 52, 18,19.<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Nhà Thờ Đức Bà; Dinh Độc Lập; Đường Sách Nguyễn Văn Bình; Thảo Cầm Viên.<br>Tips: Từ 08:30 - 10:00 (thứ 7) hàng tuần, Bưu điện Thành phố có phục vụ biểu diễn hòa tấu nhạc cụ dân tộc.' },
            { title: 'TÀU INDOCHINA QUEEN', image: '/img/plan/plan16.jpg', addres: '5 Nguyễn Tất Thành, Phường 12, Quận 4'
            ,content: 'Tàu Indochina Queen sẽ đồng hành cùng du khách trên chuyến hành trình du ngoạn vượt sông Sài Gòn, ngắm nhìn khung cảnh tráng lệ của Thành phố khi lên đèn. Không gian sang trọng, thực đơn tối đa dạng hương sắc cùng những màn trình diễn âm nhạc đặc sắc, mang âm hưởng hiện đại lẫn truyền thống hứa hẹn sẽ mang lại trải nghiệm tuyệt vời cho du khách.' },
          ],
          items8: [
            { title: 'LĂNG LÊ VĂN DUYỆT', image: '/img/plan/plan17.jpg', addres: '1 Vũ Tùng, Phường 1, Quận Bình Thạnh'
            ,content: 'Lăng Lê Văn Duyệt (thường gọi lăng Ông - Bà Chiểu) là khu đền và mộ của Tả quân Lê Văn Duyệt (1764-1832). Ngày 6 tháng 12 năm 1989, toàn bộ khu lăng được Bộ Văn hoá công nhận là di tích Lịch sử Văn hoá cấp quốc gia. <br>Từ cổng tam quan ở phía nam (đường Vũ Tùng) vào qua một khu vườn cảnh là 3 phần chính: nhà bia nơi đặt bia đá ghi công đức, mộ tả quân và vợ (có bình phong và tường bao quanh) và miếu thờ gồm tiền điện, trung điện và chính điện.<br>Hằng năm, tại lăng đều có tổ chức lễ giỗ Lê Văn Duyệt long trọng, vào các ngày 29 hoặc 30-7, mồng 1 và 2-8 âm lịch.' },
            { title: 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH', image: '/img/plan/plan18.jpg', addres: '65 Lý Tự Trọng, Phường Bến Nghé, Quận 1'
            ,content: 'Bảo tàng Thành phố Hồ Chí Minh là một trong những công trình tại trung tâm thành phố Sài Gòn do chính quyền thực dân Pháp tiến hành xây dựng gần cuối thế kỷ 19 nhằm tạo nên một không gian bảo tàng thương mại để trưng bày các sản phẩm địa phương. Công trình do kiến trúc sư người Pháp thiết kế, xây dựng vào năm 1885 và khánh thành vào năm 1890. Sau khi khánh thành, công trình được sử dụng làm dinh thự và sau ngày 30 tháng 4 năm 1975, được sử dụng làm nơi sinh hoạt văn hoá, biểu diễn nghệ thuật và triển lãm các chuyên đề thời sự phục vụ người dân. Về kiến trúc, toà nhà được xây dựng dựa trên phong cách cổ điển châu Âu nhưng phần mái ngói nhà mang nét Á Đông khi được làm bằng thép, lợp ngói âm dương, cùng đường diềm mái là một dải phù điêu với các loại cây cỏ xen kẻ các chim thú đặc trưng miền sông nước Nam Bộ như cá sấu, tôm, cò, diệc…<br>Hiện nay, bảo tàng có diện tích trưng bày trên 2000m2, gồm các nội dung: Địa lý - Hành chính Sài Gòn - Thành phố Hồ Chí Minh - Thiên nhiên - Khảo cổ - Thương cảng - Thương mại - Dịch vụ - Công nghiệp - Tiểu thủ công nghiệp - Văn hóa - Đấu tranh Cách mạng - Kỷ vật kháng chiến – Vũ khí chiến đấu - Tiền Việt Nam - Đường hầm “Dinh Gia Long”. Tại đây, bảo tàng có các đội ngũ thuyết minh viên trực hướng dẫn bằng 02 ngôn ngữ: Tiếng Việt và tiếng Anh, khu vực nghỉ chân và nước uống phục vụ khách tham quan tại khu vực trưng bày.<br>Các tuyến xe bus có trạm dừng gần nhất: 04, 18, 93, 44, 31, 36, 28<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Phố đi bộ Nguyễn Huệ; Chợ Bến Thành; Dinh Độc Lập; Nhà thờ Đức Bà; Bưu điện Thành phố.<br>Điều lưu ý dành cho du khách khi đến tham quan và trải nghiệm: Trang phục gọn gàng, lịch sự. Gửi hành lý, tư trang tại tủ đồ của Bảo tàng (trừ tiền và các vật dụng có giá trị). Có ý thức bảo vệ di tích và tài liệu, hiện vật được trưng bày, giữ gìn vệ sinh chung. Khách tham quan có nhu cầu hướng dẫn tham quan, xin liên hệ với bộ phận thuyết minh (thuộc phòng Giáo dục – Truyền thông và quan hệ công chúng) để được phục vụ.<br>' },
            { title: 'BẢO TÀNG LỊCH SỬ THÀNH PHỐ HỒ CHÍ MINH', image: '/img/plan/plan19.jpg', addres: '02 Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1'
            ,content: 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh là một trong số ít các công trình kiến trúc ở thành phố Hồ Chí Minh thể hiện sự giao lưu văn hóa và kiến trúc Pháp – Việt vào nửa đầu thế kỉ 20. Bảo tàng được tkiến trúc sư người Pháp thiết kế theo phong cách kiến trúc “phong cách Đông Dương” khi có sự phối hợp nghệ thuật kiến trúc truyền thống bản địa với bố cục, kỹ thuật phương Tây. Hệ thống trưng bày gồm 17 phòng, với hai nội dung chính: Giới thiệu tiến trình phát triển lịch sử Việt Nam, từ thời Tiền Sử (cách đây 500.000 năm), các triều đại phong kiến Việt Nam cho đến thời Nguyễn 1945 và giới thiệu các đặc trưng văn hóa phương Nam của Việt Nam, cũng như một số nước Châu Á. Ngoài ra, bảo tàng có các dịch vụ hỗ trợ như: dịch vụ thuyết minh, hướng dẫn, biểu diễn nghệ thuật Múa rối nước dân gian và dịch vụ chuyên môn như tư vấn giám định, trưng bày và bảo quản hiện vật.<br>Các tuyến xe bus có trạm dừng gần nhất: 05, 06, 14, 18, 53.<br>Gợi ý các điểm đến lân cận trong bán kính 500m: Bảo tàng Chiến dịch Hồ Chí Minh; Dinh Thống Nhất; Nhà thờ Đức Bà; Bưu điện Thành phố; Đền thờ Hùng Vương.<br>Điều lưu ý dành cho du khách khi đến tham quan và trải nghiệm: Không hút thuốc trong khuôn viên Bảo tàng. Không chụp ảnh/quay phim hiện vật, không sờ, chạm hiện vật.<br>' },
            { title: 'TÀU INDOCHINA QUEEN', image: '/img/plan/plan16.jpg', addres: '5 Nguyễn Tất Thành, Phường 12, Quận 4'
            ,content: 'Tàu Indochina Queen sẽ đồng hành cùng du khách trên chuyến hành trình du ngoạn vượt sông Sài Gòn, ngắm nhìn khung cảnh tráng lệ của Thành phố khi lên đèn. Không gian sang trọng, thực đơn tối đa dạng hương sắc cùng những màn trình diễn âm nhạc đặc sắc, mang âm hưởng hiện đại lẫn truyền thống hứa hẹn sẽ mang lại trải nghiệm tuyệt vời cho du khách.' },]
        };
      },
      methods: {
        updateCenter(newCenter) {
          this.zoom=12;
      this.center = newCenter;
    },
        setCoordinates(lat, lng) {
        this.center = [lat, lng];
        this.markerLatLng = [lat, lng];
      },
        
        toggleDetail: function () {
                  this.showdetail = !this.showdetail;
              },
        handleTabChange(value) {
        // Xử lý khi tab được chọn
        console.log("1")}
        ,callFunction(link) {
            // Thực hiện hàm với link được truyền vào
            console.log("Function called for link:", link);
        }
  ,
        callFunction(funcName) {
      // Kiểm tra xem tên hàm có tồn tại không
      if (typeof this[funcName] === 'function') {
        // Gọi hàm từ tên hàm được truyền vào
        this[funcName]();
        window.location.href = '#a';
      } else {
        console.error('Function', funcName, 'does not exist!');
      }
  
    },
    addToDetail(index) {
        // Lấy tour từ mảng tours dựa vào chỉ mục index và gán vào selectedTour
        this.selectedTour = this.tours[index];
        this.toggleDetail();
      },
      tour() {
        this.tours = this.items6;
        this.updateCenter([10.7951172,106.7195211]);
        this.locations=this.locations1;
      },
      tour2() {
        this.tours = this.items7;
        this.updateCenter([10.7797908,106.696444]);
        this.locations=this.locations2;
      },
      tour3() {
        this.tours = this.items8;
        this.updateCenter([10.775997,106.6893479]);
        this.locations=this.locations3;
      },
    }
    };
    </script>
  
    
    <style >
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
    justify-content: center;
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
      width: 200px; /* Chiều rộng của thẻ chứa, có thể điều chỉnh theo ý muốn */
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
      max-height: 200px;
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
  
    </style>
    
  