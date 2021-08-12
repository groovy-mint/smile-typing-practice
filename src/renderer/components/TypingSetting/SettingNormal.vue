<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>환경설정</p><p class="subMenuTitle">일반</p>
    <h3>언어</h3>
    <a>한국어</a>
    <a>영어</a>
    <a>일어</a>
    <h3>자판 배열</h3>
    <a>두벌식</a>
    <a>세벌식 390</a>
    <a>세벌식 완성</a>
    <h3>색각 이상자 옵션</h3>
    <a>켜기</a>
    <a>끄기</a>
    <h3>단어 연습 글자 정렬</h3>
    <a>가운데</a>
    <a>왼쪽</a>
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