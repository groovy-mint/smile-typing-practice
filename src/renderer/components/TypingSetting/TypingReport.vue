<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="/typing-setting"><img src="~@/assets/back.svg" alt="Back"></router-link>환경설정</p><p class="subMenuTitle">기록</p>
    <p>이 기능은 준비중이에요.</p>
  </div>
</template>
<script>

export default {

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
.mainMenuTitle img{
    border-radius: 100%;
    width: 30px;
    height: 30px;
    margin: 0 2.5px;
    margin-right: 10px;
    border-radius: 100%;
    background:rgba(0, 0, 0, 0);
    transition: all 0.15s;
}
.mainMenuTitle a:hover img{
    background:lightgray
}
@media (prefers-color-scheme: dark) {
  b, span, p, input, h3, li{color:#eee}
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
}
</style>