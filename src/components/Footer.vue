<template>
    <v-footer class="footer-component">
        <div class="footer_container grid">
            <v-row style="width: 100%;">
                <v-col cols="3" >
                    <div class="footer_item">
                        <div class="footer_item-name">
                            <h4>CONTACT INFO</h4>
                        </div>
                        <div class="footer_item-content">
                            <div class="footer_info-item">
                            <img src="/img/footer/fi1.svg" alt="" class="footer_info-img"> 
                            <a href="https://maps.app.goo.gl/Au2umQ8cxwgw642v9?g_st=iz" class="footer-info-item__content">Cao Đẳng Kinh Tế TPHCM</a>
                            </div>
                        </div>
                        <div class="footer_item-content">
                            <div class="footer_info-item">
                            <img src="/img/footer/fi2.svg" alt="" class="footer_info-img"> 
                            <a href="tel:84931434112" class="footer-info-item__content">+84931434112 | 0767270902  | 0967093770  </a>
                            </div>
                        </div>
                        <div class="footer_item-content">
                            <div class="footer_info-item">
                            <img src="/img/footer/fi3.svg" alt="" class="footer_info-img"> 
                            <a href="mailto:dinhphatdat1811@gmail.com" class="footer-info-item__content">22662006@kthcm.edu.vn</a>
                            </div>
                        </div>
                        <div class="footer_item-content">
                            <div class="footer_info-item">
                            <img src="/img/footer/fi4.svg" alt="" class="footer_info-img">
                            <a href="https://www.kthcm.edu.vn/" class="footer-info-item__content">https://www.kthcm.edu.vn/</a>
                            </div>
                        </div>
                </div>
            </v-col>
                <v-col cols="6">
                        <div class="footer_email">
                            <p class="footer_email-register">ĐĂNG KÝ NHẬN TIN</p>
                            <p class="footer_email-content">Nhận những câu chuyện du lịch mới từ thành phố Hồ Chí Minh đến hộp thư của bạn.</p>
                        </div>
                        <div class="footer_email-input">
                            <v-text-field
                                v-model="email"
                                label="Nhập địa chỉ Email của bạn"
                                outlined
                                color="primary"
                                class="custom-text-field"
                            ></v-text-field>
                            <p v-if="!emailErrors.length && emailSuccess" class="footer_email-success">Cảm ơn bạn đã đăng ký</p>
                            <p v-if="emailErrors.length > 0" class="footer_email-error">Email không hợp lệ.</p>
                            <button class="footer_email-btn" @click="registerEmail">Đăng ký</button>
                        </div>
                </v-col>
                <v-col cols="3">
                    <div class="footer_social">
                        <router-link class="router-link" to="/Webserver"  style="color:#69a2e3"><i class="fa-brands fa-facebook"></i></router-link>
                        <router-link class="router-link" to="/Webserver" style="color: #000000;"><i class="fa-brands fa-tiktok"></i></router-link>
                        <router-link class="router-link" to="/Webserver" style="color:#ebabc0;"><i class="fa-brands fa-instagram"></i></router-link>
                        <router-link class="router-link" to="/Webserver" style="color: #eb4d46;"><i class="fa-brands fa-youtube"></i></router-link>
                    </div>
                    <div class="footer_app">
                        <router-link class="router-link" to="/Webserver"><img src="/img/ft-appstore.png" alt=""></router-link>
                        <router-link class="router-link" to="/Webserver"><img src="/img/ft-googleplay.png" alt=""></router-link>
                    </div>
                </v-col>
            </v-row>
    <v-row>
      <v-col>
        <div class="copyright">Copyright © 2024 By P_ĐẠT_QUAN_HAO</div>
      </v-col>
    </v-row>
        </div>
    </v-footer>
    <div style="display: none;">
    <audio ref="audioPlayer" :src="audioSrc"></audio>
    <button class="playPauseButton" 
            @click="togglePlayPause" 
            @mouseenter="showAudioText" 
            @mouseleave="hideAudioText"
            :class="{'rotating': isPlaying}">
      <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
    </button>
    <span class="audio_text" :class="{ 'show': isHovering }">
    HELLO VIETNAM
    </span>
    </div>
</template>
<script setup>
import { ref,  onMounted } from 'vue';
//audio
const isPlaying = ref(false);
const audioPlayer = ref(null);
const audioSrc = '/img/music/HelloVietNam.mp3';
const togglePlayPause = () => {
  if (!isPlaying.value) {
    audioPlayer.value.play();
    isPlaying.value = true;
  } else {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
};

onMounted(() => {
  audioPlayer.value.addEventListener('ended', () => {
    isPlaying.value = false;
  });
});
//email
//email
const email = ref('');
const emailErrors = ref([]);
const emailSuccess = ref(false);

const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};
const registerEmail = () => {
    const isValidEmail = validateEmail(email.value);
    if (isValidEmail) {
        emailErrors.value = [];
        email.value = "";
        emailSuccess.value = true; 
    } else {
        emailErrors.value = [''];
    }
};

//hello viet nam
const isHovering = ref(false);

const showAudioText = () => {
  isHovering.value = true;
};

const hideAudioText = () => {
  isHovering.value = false;
};
</script>
<style>
/* audio */
.playPauseButton {
  position: fixed;
  bottom: 10%;
  width: 40px;
  border-radius: 50%;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 24px;
  background-color: #c0392b;
  z-index: 1000;
  
}
.audio_text{
    background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
    position: fixed;
    bottom: 15%;
    color: #ffffff;
    left: 4%;
    padding: 12px;
    box-shadow: 0 0 20px rgba(112, 161, 255, 1.0);
    border-radius: 26px;
    font-weight: 900;
    z-index:9;
    font-size:12px;
}
.audio_text {
    opacity: 0;
    transition: .4s ease-in-out;
}

.audio_text.show {
    opacity: 1;
}
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: rotate360 2s linear infinite;
}
/* footẻ */
.footer-component{
    background-color: #ffff !important;
    width: 100%;
    padding:  60px 0 !important;
    text-align: center;
    border-top: solid 1px #D3D3D3 !important;
    margin-top: 0;
}
.footer_container{
    color: #000000;
    width: 100%;
}
/* contact info  */ 

.footer_item-name{
    margin-bottom: 10px;
}
.footer_item-content{
    text-align: left;
}
.footer_info-item{
    line-height: 1.8;
    font-size: 18px;
}
.footer_item-content a{
    text-decoration: none;
    color: #000;
    font-size: 12px;
    line-height: 1.2;
}
.footer_item-content img {
    width: 16px;
    margin-right: 6px;
    position: relative;
    top: 2px;
}
.footer_email-register,.footer_item-name{
    font-weight: bold;
    font-size: 14px;
    line-height: 1.4;
}
.footer_email-content{
    font-size: 12px;
    padding-top: 12px;
}
.footer_email {
  display: flex;
  flex-direction: column;
}
.footer_email-input{
    margin-top: 18px;
}
.custom-text-field {
  border: 1px solid #000;
  border-radius: 40px; 
  border: none !important; 
}
.footer_email-success{
  font-size: 12px;
  color: #27ae60;
  margin-bottom: 6px;
  margin-top: 4px;

}
.footer_email-error{
    font-size: 12px;
    color: #c0392b;
    margin-top: 4px;
}
.footer_email-btn{
    background-color: #c0392b;
    font-size: 12px;
    border-radius: 24px;
    padding: 10px 25px;
    color: white;
    margin-top: 12px;
}
/* xoa message mac dinh */
.v-text-field .v-input__details{
    display: none !important;
}
.footer_social{
    margin-top: 12px;
    display: flex;
    align-items: flex-start;
    text-align: center;
}
.footer_social a{
    font-size: 24px;
    margin: 0 6px;
}
.footer_app{
    display: flex;
    margin-top: 24px;
}
.footer_app a {
    margin-left: 6px;
}
.footer_app a img {
    max-width: 100%;
    height: auto;
}
/* mobile */
@media screen and (max-width: 767px){
    .grid{
        margin: 0 20px !important;
    }
    .scroll{
        text-align: center;
        position: absolute;
        top: -2% !important;
        margin: auto;
        z-index: 1;
        left: 49% !important;
    }
    .v-col-3, .v-col-6 {
        flex: 0 0 100% !important;
        max-width: 100% !important;
    }
    .footer_social{
        display: block;
    }
}
.copyright{
    font-size: 14px;
    font-weight: 700;
}
</style>