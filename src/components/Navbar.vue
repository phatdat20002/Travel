<template>
  <div class="app-bar" style="z-index: 10000">
    <div class="container grid">
      <v-row align="center" class="header">
        <v-col class="info_truong_khoa">
          <v-app-bar app class="menu_mobile">
            <span class="info_iconbars" @click="toggleMenu">
              <i class="fa-solid fa-bars-staggered"></i>
            </span>
            <div class="logo-col header_logo">
              <img src="https://lh3.googleusercontent.com/pw/AP1GczMYnMhSiglIxwrHLA-6fRiyVbVOQ0visrrslp-IL_wZppd3MuxHDfOUFpdQulVNq_Hdpz6JFevLaJIPm-iWUpnDyApnwsh_MBhxOYYqkOFxBX_WDx0eNCbEY7OD67lezA0KGBydYCyYPtoPo1BvpJlB=w500-h500-s-no-gm?authuser=0" alt="Logo" class="logo_hce">
            </div>
            <div class="header_search">
              <div class="header_search_i"><i class="fa-solid fa-magnifying-glass header_search-input "  @click="toggleSearch"></i></div>
              <span class="thoitiet_open_mobile" @click="showWeather"  :style="{ color: textColor }">Thời Tiết</span> 
            </div>
          </v-app-bar>
          <div class="thoitiet thoitiet_mobile"  v-if="visible" :style="{ background: bgColor }">
          <div class="weather loading">
              <div class="city">{{ city }}</div>
              <div class="temp">{{ temp }}</div>
              <img class="may" :src="iconUrl" alt="Weather Icon" />
              <div class="description">{{ description }}</div>
              <div><span class="humidity">Độ ẩm: {{ humidity }}%</span></div>
            </div>
          </div>
         <div class="search_mobile hideon_desktop">
          <v-text-field
            v-model="searchText"
            :placeholder="showSearch ? 'Tìm Nhà Hàng, Khách Sạn, Quán Ăn....' : ''"
            v-if="showSearch"
            class="header_input-search"
            outlined
            hide-details
            @blur="closeSearch"
            @input="handleInput"
          ></v-text-field>
          <ul v-if="showDropdown" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index">
              <router-link :to="suggestion.url" @click="handleSuggestionClick(suggestion)">
                {{ suggestion.label }}
              </router-link>
            </li>
          </ul>
         </div>
          <v-navigation-drawer v-model="drawer" app>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" link :to="item.url">
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-col class="logo_info_school">
            <div class=""><img src="/img/logohce/logohce.webp" alt="Logo" class="logo_hce"></div>
          <div class=""><span class="info_school">UBND.TPHCM <br> </span><span class="info_school">Cao Đẳng Kinh Tế TPHCM <br> </span><span class="info_khoa"> Khoa Công Nghệ Thông Tin</span></div>
          </v-col>
        </v-col>
        <v-col class="logo-col header_logo hideon_mobile">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczMYnMhSiglIxwrHLA-6fRiyVbVOQ0visrrslp-IL_wZppd3MuxHDfOUFpdQulVNq_Hdpz6JFevLaJIPm-iWUpnDyApnwsh_MBhxOYYqkOFxBX_WDx0eNCbEY7OD67lezA0KGBydYCyYPtoPo1BvpJlB=w500-h500-s-no-gm?authuser=0" alt="Logo" class="logo_web_destop">
        </v-col>
        <v-col class="header_search hideon_mobile">
          <div class="teacher-info-container">
            <span v-if="route.path !== '/' && !isLoggedIn && !showLoginModal" class="login-info" @click="showLoginModal = true">Login</span>
            <span v-if="route.path !== '/' && !isLoggedIn && !showRegisterModal" class="separator">|</span>
            <span v-if="route.path !== '/' && !isLoggedIn && !showRegisterModal" class="register-info" @click="showRegisterModal = true">Register</span>
            <span v-if="isLoggedIn && route.path !== '/'" class="login-info">{{ loginUsername }}</span>
            <span v-if="route.path === '/'" class="teacher-info">GVHD:ThS.Phạm Đằng Phương</span>
            <span v-if="isLoggedIn && route.path !== '/'" class="separator">|</span>
            <span v-if="isLoggedIn && route.path !== '/'" class="login-info" @click="logout">Logout</span>
          </div>
          <span class="thoitiet_open" @click="showWeather"  :style="{ color: textColor }">Thời Tiết</span>
          <div class="thoitiet"  v-if="visible" :style="{ background: bgColor }">
          <div class="weather loading">
              <div class="city">{{ city }}</div>
              <div class="temp">{{ temp }}</div>
              <img class="may" :src="iconUrl" alt="Weather Icon" />
              <div class="description">{{ description }}</div>
              <div><span class="humidity">Độ ẩm: {{ humidity }}%</span></div>
            </div>
          </div>
          <span class="separator">|</span>
          <span @click="toggleSearch"  class="header_search-input-pc">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <v-text-field
            v-model="searchText"
            :placeholder="showSearch ? 'Tìm Nhà Hàng, Khách Sạn, Quán Ăn....' : ''"
            v-if="showSearch"
            class="header_input-search"
            outlined
            hide-details
            @blur="closeSearch"
            @input="handleInput"
          ></v-text-field>
          <ul v-if="showDropdown" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index">
              <router-link :to="suggestion.url" @click="handleSuggestionClick(suggestion)">
                {{ suggestion.label }}
              </router-link>
            </li>
          </ul>
       
        </v-col>
      </v-row>
    </div>
  </div>
  <v-row align="center" justify="center" class="header_navcontainer" :class="{ 'header_navcontainer--active': drawer }">
    <v-col class="header_nav">
      <router-link class="router-link" to="/"> Trang chủ</router-link>
    </v-col>
    <v-col class="header_nav">
      <router-link class="router-link" to="/Plan">Kế Hoạch Chuyến Đi</router-link>
    </v-col>
    <v-col class="header_nav">
      <router-link class="router-link" to="/Hotels">Khách Sạn</router-link>
    </v-col>
    <!-- <v-col class="header_nav">
      <router-link class="router-link" to="/Food">Đồ Ăn</router-link>
    </v-col> -->
  </v-row>
    <div>
  </div>
  <div class="modal" v-if="showRegisterModal" @click="closeModalOnClickOutside">
    <div class="modal_main">
      <form action="" method="POST" class="form_register" id="register-form" @submit.prevent="register">
        <div class="modal_close"  @click="showRegisterModal = false"><i  class="fa-solid fa-x"></i></div>
        <h3 class="heading">Đăng kí</h3>
        <div class="spacer"></div>
        <div class="form-group">
          <label for="fullname" class="form-label">Tên đầy đủ</label>
          <input v-model="fullname" @focus="clearError('fullname')" id="fullname" name="fullname" type="text" placeholder="VD: ABC" class="form-control">
          <span class="form-message" v-if="fullnameError">{{ fullnameError }}</span>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" @focus="clearError('email')" id="email" name="email" type="text" placeholder="VD: ABC@gmail.com" class="form-control">
          <span class="form-message" v-if="emailError">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Mật khẩu</label>
          <input v-model="password" @focus="clearError('password')" id="password" name="password" type="password" placeholder="Nhập mật khẩu" class="form-control">
          <span class="form-message" v-if="passwordError">{{ passwordError }}</span>
        </div>
        <div class="form-group">
          <label for="password_confirmation" class="form-label">Nhập lại mật khẩu</label>
          <input v-model="passwordConfirmation" @focus="clearError('passwordConfirmation')" id="password_confirmation" name="password_confirmation" placeholder="Nhập lại mật khẩu" type="password" class="form-control">
          <span class="form-message" v-if="passwordConfirmationError">{{ passwordConfirmationError }}</span>
        </div>
        <button type="submit" class="form-submit">Đăng ký</button>
      </form>
    </div>
  </div>
  <div class="modal_login" v-if="showLoginModal" @click="closeModalOnClickOutside">
    <div class="modal_main_login">
      <form @submit.prevent="login" class="form_login" id="login-form">
        <div class="modal_close_login" @click="showLoginModal = false"><i class="fa-solid fa-x" ></i></div>
        <h3 class="heading">Đăng Nhập</h3>
        <div class="spacer"></div>
        <div class="form-group">
          <label for="username" class="form-label">Tên Đăng Nhập</label>
          <input v-model="loginUsername" @focus="clearError('loginUsername')" id="username" type="text" placeholder="VD: ABC@gmail.com" class="form-control">
          <span class="form-message" v-if="loginUsernameError">{{ loginUsernameError }}</span>
        </div>
        <div class="form-group">
          <label for="password_login" class="form-label">Mật khẩu</label>
          <input v-model="loginPassword" @focus="clearError('loginPassword')" id="password_login" type="password" placeholder="Nhập mật khẩu" class="form-control">
          <span class="form-message" v-if="loginPasswordError">{{ loginPasswordError }}</span>
        </div>
        <button type="submit" class="form-submit">Đăng Nhập</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch,onMounted  } from 'vue'; 
import { useRouter, useRoute } from 'vue-router'; 
const router = useRouter();
const route = useRoute(); 

const drawer = ref(false);
const searchText = ref('');
const showSearch = ref(false);
const showDropdown = ref(false);
const suggestions = [
  { label: 'Top 6 Cây Cầu Đẹp Nhất ở Thành phố Hồ Chí Minh', url: '/item/item1' },
  { label: 'VÒNG QUANH THÀNH PHỐ HỒ CHÍ MINH TRÊN XE BUÝT HOP ON - HOP OFF - HÀNH TRÌNH KHÁM PHÁ NƠI QUEN MÀ LẠ', url: '/item/item2' },
  { label: 'Top 5 Quán Cafe Rooftop View đẹp Ở TPHCM', url: '/item/item3' },
  { label: 'Top 5 nhà hàng Pháp chuẩn vị Châu Âu tại TP.HCM', url: '/item/item4' }, //tam thoi
  { label: 'Top 5 công viên lớn nhất ở TPHCM', url: '/item/item4' },
  { label: 'Từ Sài Gòn xưa đến Thành phố Hồ Chí Minh nay', url: '/item/item5' },
];
const items = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Kế Hoạch Chuyến Đi', url: '/Plan' },
  { label: 'Khách Sạn', url: '/Hotels' },
  { label: 'Trải nghiệm', url: '/item/item2' },
  // { label: 'Đồ Ăn', url: '/Food' }
];

const filteredSuggestions = computed(() => {
  return suggestions.filter(suggestion =>
    suggestion.label.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const handleInput = () => {
  showDropdown.value = true;
};

const handleSuggestionClick = (suggestion) => {
  router.push(suggestion.url);
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};
const toggleMenu = () => {
  drawer.value = !drawer.value;
};

const teacherInfo = ref('GVHD:ThS.Phạm Đằng Phương');

watch(route, () => {

  if (route.path === '/Hotels') {
    teacherInfo.value = 'Login | Register';

  } else {
    teacherInfo.value = 'GVHD:ThS.Phạm Đằng Phương';
  }
 showDropdown.value = false;
  showSearch.value = false;
});

document.addEventListener('click', (event) => {
  const dropdown = document.querySelector('.suggestions');
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false;
    showSearch.value = false;
  }
});
//thoitiet
const apiKey = "062d92a2646152d39eb7845a608226cb";
const city = ref('');
const temp = ref('');
const iconUrl = ref('');
const description = ref('');
const humidity = ref('');
const windSpeed = ref('');
const visible = ref(false);
const bgColor = ref('linear-gradient(145deg, #2193b0, #6dd5ed)');
const textColor = ref('#ffffff');
const fetchWeather = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=vi&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Không có địa điểm");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error(error);
  }
};

const displayWeather = (data) => {
  const { name, sys: { country } } = data;
  const { icon, description: desc } = data.weather[0];
  const { temp: temperature, humidity: hum } = data.main;
  const { speed: wind } = data.wind;

  city.value = `${name}, ${country}`;
  iconUrl.value = `https://openweathermap.org/img/wn/${icon}.png`;
  description.value = desc;
  temp.value = `${temperature}°C`;
  humidity.value = hum;
  windSpeed.value = wind;
};

onMounted(() => {
  fetchWeather("Ho Chi Minh");
});
const showWeather = () => {
  visible.value = true;
  textColor.value = '#5ca7c7'; 
  setTimeout(() => {
    visible.value = false;
    textColor.value = '#ffffff'; 
  }, 5000);
};
// register
const showModal = ref(false);
const showLoginModal = ref(false);
const showRegisterModal = ref(false);
const fullname = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loginUsername = ref('');
const loginPassword = ref('');
 const isLoggedIn = ref(false);
const fullnameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const passwordConfirmationError = ref('');
const loginUsernameError = ref('');
const loginPasswordError = ref('');

const closeModalOnClickOutside = (event) => {
  if (!event.target.closest('.form') && !event.target.closest('.form_register') && !event.target.closest('.form_login')) {
    showModal.value = false;
    showLoginModal.value = false;
    showRegisterModal.value = false;
  }
};

const login = () => {
  validateLoginForm();

  // Lấy thông tin đăng nhập từ localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Lấy thông tin đăng nhập từ form
  const username = loginUsername.value;
  const password = loginPassword.value;

  // Kiểm tra thông tin đăng nhập
  if (!username.trim() || !password.trim()) {
    alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
    return;
  }
  if (username === storedUsername && password === storedPassword) {
    showToastMessage('Đăng nhập thành công!');
    showLoginModal.value = false;
    isLoggedIn.value = true;
  } else {
    showToastMessage('Sai tên đăng nhập hoặc mật khẩu. Vui lòng nhập lại.');
  }
};

const validateRegisterForm = () => {
  fullnameError.value = '';
  emailError.value = '';
  passwordError.value = '';
  passwordConfirmationError.value = '';

  if (!fullname.value.trim()) {
    fullnameError.value = 'Vui lòng nhập tên đầy đủ';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.value = 'Vui lòng nhập email';
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Email không hợp lệ';
  }
  if (!password.value.trim()) {
    passwordError.value = 'Vui lòng nhập mật khẩu';
  } else if (password.value.length < 6) {
    passwordError.value = 'Mật khẩu phải chứa ít nhất 6 kí tự';
  }
  if (passwordConfirmation.value !== password.value) {
    passwordConfirmationError.value = 'Mật khẩu nhập lại không khớp';
  }
};

const register = () => {
  validateRegisterForm();
  if (!fullnameError.value && !emailError.value && !passwordError.value && !passwordConfirmationError.value) {
    showToastMessage('Đăng ký thành công!');
    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem('username', email.value);
    localStorage.setItem('password', password.value);
    // Cập nhật thông tin đăng nhập cho form đăng nhập
    loginUsername.value = email.value;
    loginPassword.value = password.value;

    fullname.value = '';
    email.value = '';
    password.value = '';
    passwordConfirmation.value = '';
    showModal.value = false;
    isLoggedIn.value = true;
    showRegisterModal.value = false; 
  }
};

const validateLoginForm = () => {
  loginUsernameError.value = '';
  loginPasswordError.value = '';
  if (!loginUsername.value.trim()) {
    loginUsernameError.value = 'Vui lòng nhập tên đăng nhập';
  }
  if (!loginPassword.value.trim()) {
    loginPasswordError.value = 'Vui lòng nhập mật khẩu';
  }
  if (!loginPassword.value.trim() && !loginUsername.value.trim()) {
    alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu")
  }
};

const clearError = (field) => {
  if (field === 'fullname') fullnameError.value = '';
  if (field === 'email') emailError.value = '';
  if (field === 'password') passwordError.value = '';
  if (field === 'passwordConfirmation') passwordConfirmationError.value = '';
  if (field === 'loginUsername') loginUsernameError.value = '';
  if (field === 'loginPassword') loginPasswordError.value = '';
};

const showToastMessage = (message) => {
  alert(message);
};

const logout = () => {
  isLoggedIn.value = false;
  showRegisterModal.value = false;
  showLoginModal.value = false;
  loginUsername.value = '';
  loginPassword.value = '';
};
</script>
<style>
.hideon_desktop{
  display: none
}
/* thoi tiet */
.thoitiet {
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  font-family: arial;
  font-size: 18px;
  width: 25%;
  position: fixed;
  z-index: 9;
  top: 12%;
  right: 9%;
}
.thoitiet_mobile{
  display: none;
}
.thoitiet_open {
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  font-weight: bolder;
}
/* router link */
.v-main{
  padding-top: 0 !important;
}

.grid {
  margin: 0 120px;
}
.app-bar {
  z-index: 1; 
  position: absolute !important;
  width: 100%;
}
.container{
  cursor: pointer;
  font-size: 14px;

}
.header{
  height: 105px;
  padding: 24px 0;
  cursor: pointer;
}
.logo_web_destop{
  max-height: 120px;
}
.header_input-search {
  width: 80%;
  position: absolute;
  right: 10px;
  top: 38px;
  z-index: 1000;
}
.header_search_i{
  width: 100%;
}
.header_search-input-pc{
  padding: 8px;
  position: relative;
  right: -8px;
}
.header_input-search.active {
  display: block;
}

.logo_info_school{
  display: flex;
  align-items: center;
}
.logo_info_school img {
  padding-right: 6px;
}
.info_school ,.header_search-input{
  font-size: 12px;
  padding-bottom: 2px;
  border-bottom:1px solid #ffffff ;
}
.header_search-input{
  width: 48%;
  padding-bottom: 4px;

}
/* login */
.teacher-info-container {
  align-items: center;
  margin-bottom: 12px;
}
.login-info, .register-info {
  color:#ffb8b8; 
  font-weight: bold;
}
.login-info:hover , .register-info:hover{
  color:rgb(183, 159, 159); 

}
.separator {
  margin: 0 5px; 
}
/* .register-info {
} */

.teacher-info {
  color: #ffffff; 
}
/* .info_iconbars{
  
} */
.info_khoa{
  margin-top: 10px;
}
.header_logo {
  justify-content: center;
}
.header_search {
  text-align: right;
  position: relative;
  z-index: 100000000000000000000000000000;
}
.header_background-container{
  margin-left: 10.42vw;
}
.app-bar-container {  
  justify-content: space-between;
  padding: 0;
}
/* navbar */
.slide-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -200%;
  transition: left 0.3s ease-in-out;
  background-color: #ffffff;
  color: #000000;
  font-weight: 700;
  z-index: 10000000;
  margin-top: 14px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  border-radius: 8px;
  width: 300px;
}

.slide-in {
  left: 1%;
}
.app-bar-row {
  padding: 0;
}
.logo-col {
  display: flex;
  align-items: center;
  z-index: 1000;
}
.logo {
  max-height: 100px;
}
.logo_hce{
  max-height: 40px;
  
}
.search-field {
  width: 200px; 
}
.thoitiet_open{
  padding-right: 12px;
}
.router-link {
  color: #ffffff; 
  text-decoration: none;
  font-size: 12px;
}
.header_navcontainer{
    position: absolute;
    z-index: 1;
    width: 101%;
    top: 130px;
}
.header_nav{
  text-align: center;
  margin: 24px 0;
  color:#ffffff;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
}
.header_nav-item{
  transition: opacity 0.3s ease;
  opacity: 1;
}
.router-link:hover{
  border-bottom: 1px solid #ffffff;
  opacity: 1;
}
/* Bars PC */
.v-toolbar__content ,.v-navigation-drawer{
  display: none !important;
}
/* mobile */
@media screen and (max-width: 767px){
  .info_school,.info_khoa, .info_teacher,.header_nav, .hideon_mobile{
    display: none;
  }
  .v-navigation-drawer {

   display: block !important;
  }
  .v-toolbar__content{
    display:flex !important;
    padding:0 40px;
    justify-content: space-between;
  }
  .header_search-input{
    font-size: 12px;
    padding-bottom: 2px;
    border-bottom:1px solid transparent ;
  }
  .logo_info_school {
    display: none;
  }
  .search_mobile.hideon_desktop{
    z-index: 99999999;
    top: 4%;
    position: fixed;
    right: 3%;
    width: 100%;
    display: block;
  }
  .suggestions{
    position: absolute;
    top: calc(100% + 26px);
    right: 8px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 5px;
    z-index: 100000000000000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 80% !important ;
    margin-top: 68px !important;
  }
  .header_search{
    text-align: right;
    position: relative;
    z-index: 100000000000000000000000000000;
    right: 6px;
  }
  .thoitiet_mobile{
    top: 12%;
    position: fixed;
    background: linear-gradient(145deg, rgb(33, 147, 176), rgb(109, 213, 237));
    width: 60%;
    display: block;
  }
  .thoitiet_open_mobile{
    position: absolute;
    font-size: 12px;
    right: -6px;
    position: absolute;
    font-size: 12px;
    top: 20px;
    width: 48px;
  }.logo_hce{
  max-height: 120px;
}


}
.suggestions {
  position: absolute;
  top: calc(100% + 26px);
  right: 8px;
  width: 100%; 
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 5px;
  z-index: 100000000000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.suggestions li {
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #f8f2f2;
}
.suggestions li a{
  display: block;
  width: 100%;
  text-decoration: none;
  color: #000000;
  padding: 10px;
  font-weight: bold;
}
.suggestions li:hover  a{
  color:#1d1717;
}
.suggestions li:hover  {
  background-color: #ddd;
}
/* register */
.modal ,.modal_login{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 3;
  display: block;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
.modal.open, .modal_login.open{
    display: flex;
}
  .modal_main,.modal_main_login {
    display: flex;
    justify-content: center;
    font-family: "Open Sans", sans-serif;
    z-index: 10;
  }
  .modal_login .modal_close_login{
    top: 0%;
  }
  .modal_close_login i {
    color:#000000;
  }
  .modal_close,.modal_close_login{
    font-size: 18px;
    cursor: pointer;
    right: 36%;
    padding: 6px;
    position: absolute;
    top: 0%;
    right: 1%;
  }
  .modal_close i {
    color: #000000;
  }
  .modal_close:hover{
    opacity: 0.7;
  }
  .form_login,.form_register {
    animation: modalFadeIn ease .5s;
    border-radius: 6px;
    width: 56vh;;
    min-height: 100px;
    padding: 32px 24px;
    text-align: center;
    background: #fff;
    margin: 24px;
    align-self: center;
    box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
    z-index: 100000000000000000;
    position: relative;
    overflow: hidden;
  }
  .form_login{
    margin-top: 14%;
  }
  .form_register{
    margin-top: 10%;
  }
  .heading {
    font-size: 2rem;
    color: #000000;
  }
  .form-group {
    display: flex;
    margin-bottom: 4px;
    flex-direction: column;
  }
  .form input ,.form-label {
    color: #000000;
  }
  .form-label,
  .form-message {
    text-align: left;
  }
  .form-message {
    color:#d63031;
  }
  .form-label {
    font-weight: 700;
    padding-bottom: 6px;
    line-height: 1.8rem;
    font-size: 1.4rem;
  }
  
  .form-control {
    height: 40px;
    padding: 8px 12px;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    outline: none;
    font-size: 1.4rem;
    color:#000000;
  }
  
  .form-control:hover {
    border-color: #1dbfaf;
  }
  
  .form-group.invalid .form-control {
    border-color: #f33a58;
  }
  
  .form-group.invalid .form-message {
    color: #f33a58;
  }
  
  .form-message {
    font-size: 1.2rem;
    line-height: 1.6rem;
    padding: 4px 0 0;
  }
  
  .form-submit {
    outline: none;
    background-color: #1dbfaf;
    margin-top: 12px;
    padding: 12px 16px;
    font-weight: 600;
    color: #fff;
    border: none;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .form-submit:hover {
    background-color: #1ac7b6;
  }
  .spacer {
    margin-top: 12px;
  }

  .v-toolbar__content{
    z-index: 10000;
  }
  @keyframes modalFadeIn {
    from{
        opacity: 0;
        transform: translateY(-80px);
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
  }
</style>
