<template>
  <div id="mainMenuWrapper">
    <ol>
      <li v-for="item in menuList" v-bind:menu="item" v-bind:key="item.id">
        <span><router-link class="menuItem" v-bind:to="item.route">{{ item.text }}</router-link></span>
      </li>
    </ol>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default{
  name: 'main-menu',
  data () {
    return {
      menuList: [
        { id: 0, text: '자리 연습', route: '/key-practice' },
        { id: 1, text: '단어 연습', route: '/word-practice' },
        { id: 2, text: '문장 연습', route: '/stc-practice' },
        { id: 3, text: '긴 글 연습', route: '/artc-practice' },
        { id: 4, text: '환경설정', route: '/typing-setting' }
      ]
    }
  },
  mounted: function () {
    window.removeEventListener('keyup', function (ev) {
    }, false)
  }
}
</script>

<style scoped>
@font-face {
  font-family: "NotoSansLight";
  src: local("NotoSansLight"),
   url("~@/assets/NotoSansCJKkr-Light.otf") format("opentype");
}
#mainMenuWrapper{
    display: flex;
  }
#mainMenuWrapper ol{
  font-family: "NotoSansLight";
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  list-style: none;
  margin-top: 0;
  margin-left: 50px;
  padding:0;
  }
#mainMenuWrapper ol:hover a{
  color:black
}
#mainMenuWrapper li{
  display: inline-block;
  position: relative;
  font-size:2.5em;
  margin:12px 0;
  }
.menuItem:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  transform-origin: bottom left;
  transition: transform 0.25s ease-out;
}
.menuItem:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
#mainMenuWrapper>ol>li a{
  cursor: pointer;
  text-decoration: none;
  color:lightgray;
  transition: color 0.25s ease-out;
}
#mainMenuWrapper li a.router-link-active{
  color:#000;
}
.router-link-active:after{
  transform: scaleX(1);
  transform-origin: bottom left;
}



.list-concentrate-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-concentrate-enter, .list-concentrate-leave-to
/* .list-concentrate-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-concentrate-leave-active {
  position: absolute;
}
</style>
