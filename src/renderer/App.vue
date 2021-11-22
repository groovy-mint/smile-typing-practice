<template>
  <div id="app">
    <div id="windowControl">
      <div id="windowControlOverlay">
      </div>
      <div v-if="seen">
      <button @click="hideWindow"><img src="~@/assets/minimize.svg" alt="Back"></button>
      <button @click="setFullScreen"><img src="~@/assets/maximize.svg" alt="Back"></button>
      <button @click="closeApp"><img src="~@/assets/close.svg" alt="Back"></button>
      </div>
    </div>
    <div id="contentsViewWrapper">
      <transition name="slide-up-fade" mode="out-in">
        <router-view name="contentsView"></router-view>
      </transition>
    </div>
    <div id="footerWrapper">
      <p>SmileTyping :)<br>S. C. Lab. 2021</p>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron'
  /* eslint-disable no-new */
  export default {
    name: 'smile-typing-practice',
    methods: { // Windows 운영체제 창 제어 모음
      closeApp: function () {
        remote.getCurrentWindow().close()
      },
      setFullScreen: function () {
        if (remote.getCurrentWindow().isMaximized()) {
          remote.getCurrentWindow().unmaximize()
        } else {
          remote.getCurrentWindow().maximize()
        }
      },
      hideWindow: function () {
        remote.getCurrentWindow().minimize()
      }
    },
    data () {
      return {
        seen: process.platform !== 'darwin', // 맥에서 Windows 창 제어 숨김
        maximize: remote.getCurrentWindow().isMaximized()
      }
    }
  }
</script>

<style>
  /* CSS */
  @font-face {
    font-family: "NotoSansLight";
    src: local("NotoSansLight"),
    url("~@/assets/NotoSansCJKkr-Light.otf") format("opentype");
  }
  @font-face {
    font-family: "NotoSansRegular";
    src: local("NotoSansRegular"),
    url("~@/assets/NotoSansCJKkr-Regular.otf") format("opentype");
  }
  @font-face {
    font-family: "NotoSansDemiLight";
    src: local("NotoSansRegular"),
    url("~@/assets/NotoSansCJKkr-DemiLight.otf") format("opentype");
  }
  html{height:100%;}
  body{
    font-family: 'NotoSansRegular';
    user-select: none;
    margin:0;
    background: linear-gradient( to right, #e8ebf2, #f2f3f7 );
    cursor:default
    }
  #windowControlOverlay{-webkit-app-region: drag;height:40px;}
  #windowControl{display:flex;z-index: 7;padding:5px;text-align: right;position: fixed;width:100%;top:0;height: 30px;}
  #windowControl div:nth-child(1){width:100%}
  #windowControl div:nth-child(2){margin-right:10px;min-width: 100px;}
  #windowControl button{width:30px;height:30px;background-color: rgba(0, 0, 0, 0);border:none;border-radius: 100%;padding: 1px;transition:background-color 0.15s;}
  button img{padding:3px;width:20px;height:20px;}
  button:focus{ 	
    border: none;
    outline:none;
    }
  #windowControl button:hover{
    background: lightgray;
    }
  #contentsViewWrapper{
    margin-top: 40px;
  }
  #footerWrapper{
    display: none;
    text-align: right;
    position:fixed;
    right:15px;
    bottom:0px;
  }
  a{
    color:black
  }
  .slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-fade-enter-active{
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-up-fade-enter {
  transform: translateX(0px);
  opacity: 0;
}

.slide-up-fade-enter-active{
  transition: all 0.2s ease;
}
.slide-up-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-up-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
@media (prefers-color-scheme: dark) {
  /* body{background: linear-gradient( to right, #011016, #000);} */
  body{background: linear-gradient( to right, #131414, #191b1f);}
  #windowControl button{filter: invert(100%);}
  #windowControl button:hover{background: darkgray;}
  a{color:white}
}
</style>
