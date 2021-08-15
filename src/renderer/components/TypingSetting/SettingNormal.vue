<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>환경설정</p><p class="subMenuTitle">일반</p>
    <span>아직 준비중이에요.</span>
    <!-- <div class="settingCon">
      <b>언어</b> <span>언어를 선택합니다.</span><br>
      <a>한국어</a>
      <a>English</a>
      <a>日本語</a>
    </div>
    <div class="settingCon">
      <b>자판 배열</b>　<span>손에 익힐 자판 배열을 선택합니다.</span><br>
      <a>두벌식</a>
      <a>세벌식 390</a>
      <a>세벌식 완성</a>
    </div>
    <div class="settingCon">
      <b>CUD (색각 이상자용 옵션)</b> <span>오타에 밑줄을 표시하고, 자리 연습의 키보드 색상을 흑백으로 변경합니다.</span><br>
      <a>켜기</a>
      <a>끄기</a>
    </div>
    <div class="settingCon">
      <b>자리 연습 최대 개수</b> <span>자리를 얼마나 연습할지 정합니다.</span><br>
      <a>숫자</a>
    </div>
    <div class="settingCon">
      <b>단어 연습 최대 개수</b> <span>단어를 얼마나 연습할지 정합니다.</span><br>
      <a>숫자</a>
    </div>
    <div class="settingCon">
      <b>단어 연습 글자 정렬</b> <span>단어 연습의 제시어를 왼쪽으로 정렬할지 가운데로 정렬할지 결정합니다.</span><br>
      <a>가운데</a>
      <a>왼쪽</a>
    </div>
    <div class="settingCon">
      <b>문장 연습 최대 개수</b> <span>문장을 얼마나 연습할지 정합니다.</span><br>
      <a>숫자</a>
    </div> -->
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
.settingCon{
  margin: 30px 0;
}
b{
  font-size: 1.2em;
}
</style>