  <template>
    <div class="main">
      <div class="hotels_article">
        <div class="container">
          <h3 class="article_heading">KHÁCH SẠN</h3>
          
          <div class="row">
            <div class="col" v-for="(hotel, index) in hotels" :key="index" @click="selectHotel(hotel)">
              <div class="article_link">
                <div class="article_container" :style="{ 'background-image': `url(${hotel.image})` }">
                  <p class="article_container-text">{{ hotel.title }} <br><p style="  color: #ffd700 ; font-weight: bold;">{{ hotel.price }}.000 VND</p> </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tab nội dung chi tiết khách sạn -->
          <div v-if="selectedHotel" class="hotel-detail-overlay" @click="closeOnOverlayClick($event)">
            <div class="hotel-detail">
              <div class="hotel-detail-image">
                <img :src="selectedHotel.image" alt="hotel image" />
              </div>
              <div class="hotel-detail-content">
                <button class="close-button" @click="closeHotelDetail">&times;</button>
                <h1>{{ selectedHotel.title }}</h1>
                <div class="info">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ selectedHotel.address }}</span>
              </div>
                <p>{{ selectedHotel.content }}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const hotels = ref([
    { 
      title: 'KHÁCH SẠN RẠNG ĐÔNG',
      price: 650,
      content:'Ưu đãi lên đến 55% khi đặt phòng trong tuần lễ du lịch 2023 áp dụng cho vận động viên "Giải chạy marathon Quốc Tế lần thứ 6". Chỉ từ 650.000VND/phòng/đêm bao gồm ăn sáng buffet.Hãy cùng nhau trải qua những khoảnh khắc tuyệt vời khám phá nghệ thuật, sáng tạo và những món ăn đặc sắc!',
      address: '83 Cách Mạng Tháng 8, Phường Phạm Ngũ Lão, Quận 1',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczM6PPjYOnBoN-Sie2zB-cYjMicp2QhjuncTu4jEJq7tMZijV-9ts39r9ciHP0pHVm5Fk7vDETPW-E0qKAxH9zmhhbeD4cZpAF-YvXMZ3dIPkDB_RLvq9vgDeQsOa6j9G7QqKCreNnTvThpwSK3X13UQ=w1367-h911-s-no-gm?authuser=0',
    },
    { 
      title: 'NIKKO SAIGON HOTEL',
      price: 2.500,
      content: 'Tết Nguyên Đán đang đến rất gần! Khách sạn Nikko Saigon hân hạnh giới thiệu gói lưu trú nghỉ dưỡng đón Năm Mới trọn vẹn mà không cần đi đâu xa với những đặc quyền hấp dẫn.',
      address: '235 Nguyen Van Cu Street, Ward Nguyen Cu Trinh, District 1, Ho Chi Minh City',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczNUKLtKk4y3i5yHMcq2FBHoOKwf0M4yL3y2D-Lq9OiqdzMmxIEqDPP4Or_bd7bHFJenut8bZWf8LREKi3O7U1UnFBQ0u46qQ3-6Rf_PNiXLBEeFD3dNplZPQYztzxPeXpDhBIyjizdfsr1H1xz8hsdl=w1024-h681-s-no-gm?authuser=0',
    },
    { title: 'MIA SAIGON LUXURY BOUTIQUE HOTEL',
      price: 2.500 ,
      content:'Vào những ngày đầu năm 2024, hãy ghé Mia Saigon để cùng hòa chung không khí rộn ràng của những ngày Xuân mới thông qua các chương trình ẩm thực, workshop nghệ thuật, hay các hoạt động vui chơi giải trí mang đậm hơi thở Tết cổ truyền Việt Nam như là Múa Lân, Viết thư pháp, hay Chợ tết. Hãy lên kế hoạch cùng người thân ghé thăm chúng tôi và đón một cái Tết thật ấm áp và mong chờ một năm mới tràn đầy niềm vui và hứng khởi, bạn nhé!',
      address: '2-4 Street 10, An Phu, Thu Duc City (formerly District 2), Ho Chi Minh City',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczN4aKGLlLgKKYOj63Z-8tjWJycElsz91izLEcVG2Vu5I8PIGhhS73sINnt2cG-8d-sdcLRmlNNJGXlMSdG9Mah-ZVpqZlsy2SgwZd-ysbCJkmDVIcnGB--n4zBcblh4V5WuzZ_mLyWqKcM7jQJw6tB1=w550-h367-s-no-gm?authuser=0',
      
    },
    { title: 'LE MÉRIDIEN SAIGON HOTEL',
      price: 3.100 ,
      content:'Khám phá Thành phố Hồ Chí Minh thông qua một lăng kính khác cùng Le Meridien Saigon trong khoảng thời gian đẹp nhất trong năm.Gói trải nghiệm “𝗘𝗹𝗲𝘃𝗮𝘁𝗲&𝗘𝗻𝗷𝗼𝘆” mang đến những ưu đãi đặc biệt cho khách hàng cùng với những trải nghiệm lưu trú cao cấp, ẩm thực đa dạng với những hương vị khó quên được chế biến bởi những đầu bếp chuyên nghiệp, và những dịch vụ mới được chúng tôi cải tiến hàng ngày, dành riêng cho bạn!',
      address: '3C Ton Duc Thang Street, District 1, Ho Chi Minh City',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczPErXMRLMw2eAJFgKuIjT7pp1ehrsQ7qZR5Jbk6HG_Dg1xdX_KnZvYfnqPSzdGjWvx4NhIVl0CfoVXqG_hT7-fGgSLL2dpW2rN31wfin3KObopIWeGwJsqPXMdrd2XSoADRnuefb02HAtI38AxbjxXu=w1560-h626-s-no-gm?authuser=0',
      
    },
    { title: 'INTERCONTINENTAL SAIGON HOTEL',
      price: 4.170 ,
      content:'𝐓𝐞̂́𝐭-𝐂𝐚𝐭𝐢𝐨𝐧 𝐏𝐚𝐜𝐤𝐚𝐠𝐞 𝐚𝐭 𝐈𝐧𝐭𝐞𝐫𝐂𝐨𝐧𝐭𝐢𝐧𝐞𝐧𝐭𝐚𝐥 𝐒𝐚𝐢𝐠𝐨𝐧 Bạn đang tìm kiếm một kì nghỉ trọn vẹn cho dịp Tết nhưng lại ngại phải di chuyển xa? Gói Tết-cation của chúng tôi được thiết kế để dành riêng cho bạn! Đó sẽ là một kỳ nghỉ sang trong và đáng nhớ bên những người thân yêu, cùng thưởng thức buffet sáng được yêu thích nhất thành phố, hay tận hưởng những giây phút thư giãn với ưu đãi giảm giá 20% tại Spa InterContinental và tín dụng ẩm thực trị giá 500.000 VND để sử dụng tại các nhà hàng thuộc InterContinental Saigon.',
      address: 'Corner Hai Ba Trung Street & Le Duan Blvd, Ho Chi Minh City',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczMWe7wvTleQ3Ax9A4csL3TOBRUjgtAE46QsKpgHJ_Ai3wNyRXPwTIyszhfdy8azjqH357Ul0aBTio3UQp77a8X9SDUjQlImdEZZk9i5eMPb32YgWM6JnYO6qtQtr__DKID0WbzCETSprg8eVXn_JGdk=w1200-h600-s-no-gm?authuser=0',
      
    },
    { title: 'HÔTEL DES ARTS SAIGON',
      price: 5.000 ,
      content:'Thêm hương vị lãng mạn cho tình yêu bằng chuyến du hành đến miền Đông Dương trọn gói ngay tại khách sạn nghệ thuật duy nhất với gói "Limitless Romance" từ VND 4,980,000++/ đêm, bao gồm bữa sáng và tối cho hai khách, cùng nhiều tiện ích đi kèm.',
      address: '76-78 Nguyen Thi Minh Khai, Vo Thi Sau Ward, District 3, Ho Chi Minh City',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczPv1wwk0jnegh3KSo9ZEog9AoNmw6eyLmklMhAFbywVYcyXM04nZKJz_IQvbN7U1CBFOUpdT9bddzpZ1wqlhdpFWANOFcMQ1_ALy8vRf55PwI-00l75W_a4V6IfGt95ZDIE6vkrjKHmiw7l9YEkeuSL=w1363-h911-s-no-gm?authuser=0',
      
    },
    { title: 'Sofitel Saigon Plaza',
      price: 4.000 ,
      content:'Hãy tận hưởng kì nghỉ của bạn với những trải nghiệm trọn vẹn mà 𝐒𝐨𝐟𝐢𝐭𝐞𝐥 𝐒𝐚𝐢𝐠𝐨𝐧 𝐏𝐥𝐚𝐳𝐚 mang lại trong mùa Festive này. Nghỉ dưỡng trong phòng nghỉ hiện đại mang âm hưởng Pháp cùng với những dịch vụ đẳng cấp tại 𝐇𝐨𝐮𝐬𝐞 𝐨𝐟 𝐁𝐚𝐫𝐛𝐚𝐚𝐫𝐝 và 𝐑𝐄𝐒𝐄𝐓:   25% Discount Voucher các dịch vụ tại 𝐇𝐨𝐮𝐬𝐞 𝐨𝐟 𝐁𝐚𝐫𝐛𝐚𝐚𝐫𝐝Tiệm Barber truyền thống độc đáo dành riêng cho những quý ông lịch lãm   15% Discount Voucher các dịch vụ tại 𝐑𝐄𝐒𝐄𝐓 - 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 𝐖𝐞𝐥𝐥𝐧𝐞𝐬𝐬 𝐂𝐥𝐮𝐛Sofitel Fitness & Wellness nổi bật với các thiết bị hiện đại bao gồm Techno-gym, các lớp yoga cá nhân hóa và Liệu pháp chăm sóc sức khỏe RESET, mang đến cho bạn những trải nghiệm sảng khoái và trẻ hóa.Nghỉ dưỡng và nhận Voucher tại quầy Lễ Tân - G Floor tại Sofitel Saigon Plaza',
      
      address: '17 Đ. Lê Duẩn, Bến Nghé, Quận 1',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczMy7kb3Ja5Rdnt9crtactrZgxDqV9C5ZDOmCYNpYQaqP-u2Yrjp-gU6wgzQlWTCEWWlHQyDluKsPyMXKKE9aXGwavKAWHfNqdReVhD2SvliXq5jTAeDZQyH5zyEZTje2hpr6qrTuf_JX8tHZiH-4x-5=w801-h630-s-no-gm?authuser=0',
      
    },

    // Thêm các khách sạn khác nếu cần
  ]);

  const selectedHotel = ref(null);

  const selectHotel = (hotel) => {
    selectedHotel.value = hotel;
  };

  const closeHotelDetail = () => {
    selectedHotel.value = null;
  };
  const closeOnOverlayClick = (event) => {
  // Kiểm tra xem nhấp chuột có xảy ra trên overlay hay không
  if (event.target.classList.contains('hotel-detail-overlay'))
   {
    closeHotelDetail();
  }
}
  </script>

  <style scoped>

.container {
  max-width: 80%; /* Giới hạn tổng chiều rộng của các bài báo là 80% của màn hình */
  margin: 0 auto; /* Căn giữa container */
}

.col {
  flex: 1 0 30%; 
  margin: 15px;
  max-width: 30%; 
  box-sizing: border-box; 
}
  .main {
    background-color: #ffffff;
    padding-top: 20px; 
  }

  .hotels_article {
    background-color: #ffffff;
    color: #2a2a2a;
  }

  .article_heading {
    text-align: center;
    font-size: 46px;
    margin: 40px 0;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col {
    flex: 1 0 30%;
    margin: 15px;
    cursor: pointer;
  }

  .article_link {
    width: 100%;
    overflow: hidden;
    border-radius: 24px;
    display: block;
  }
  .article_container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%; /* Điều chỉnh chiều cao của lớp phủ */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    pointer-events: none; /* Đảm bảo lớp phủ không ảnh hưởng đến các sự kiện chuột */
    z-index: 0; /* Đặt lớp phủ dưới chữ */
  }
  .article_container-text {
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Thêm bóng cho chữ */
    z-index: 1; /* Đảm bảo chữ nằm trên lớp phủ */
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

  /* CSS cho tab chi tiết khách sạn */
  /* Overlay for the detailed view */
.hotel-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Container for the hotel detail */
.hotel-detail {
  background: white;
  display: flex;
  width: 90%; /* Adjusted width to make it 50% larger than before */
  max-width: 1800px; /* Ensure the modal doesn't get too wide */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.hotel-detail-image {
  width: 50%; /* Use 50% of the width for the image */
}

.hotel-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-detail-content {
  width: 50%; /* Use 50% of the width for the content */
  padding: 30px; /* Adjusted padding for better spacing */
  position: relative;
  overflow-y: auto; /* Enable scrolling for overflowing content */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #ffffff;
  border: none;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #f1f1f1;
}

.hotel-detail-content h1 {
  margin-top: 0;
  font-size: 24px; /* Adjusted font size */
  font-weight: bold;
}

.hotel-detail-content p {
  margin: 20px 0;
  line-height: 1.6;
  font-size: 16px;
}

.hotel-detail-content .info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.hotel-detail-content .info svg {
  margin-right: 10px;
}

.hotel-detail-content .btn {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #d50017;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.hotel-detail-content .btn:hover {
  background-color: #b40014;
}

.hotel-detail-content .social-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.hotel-detail-content .social-icons a {
  font-size: 20px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.hotel-detail-content .social-icons a:hover {
  color: #d50017;
}

  </style>
