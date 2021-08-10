<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>환경설정</p><p class="subMenuTitle">일반</p>
    <p>에베베 엘렐레 홀롤로!!!</p>
  </div>
</template>
<script>
import LeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
export default {
  components: { LeftIcon }
}
</script>
<style>
#typeWrapper{
  margin-left:30px
}
.mainMenuTitle{
  font-family: "NotoSansLight";
  display: inline-block;
  position: relative;
  font-size:2.5em;
  margin:12px 0;
  margin-left: 0px;
  margin-bottom: 0;
  }
.subMenuTitle{
  font-family: "NotoSansLight";
  display: inline-block;
  position: relative;
  font-size:2em;
  margin-left: 20px;
  margin-top: 18px;
  margin-bottom:0;
  }
.mainMenuTitle svg{
    border-radius: 100%;
    width: 30px;
    height: 30px;
    margin: 0 2.5px;
    margin-right: 10px;
    border-radius: 100%;
    background:rgba(0, 0, 0, 0);
    transition: all 0.15s;
}
.mainMenuTitle a:hover svg{
    background:lightgray
}
</style>