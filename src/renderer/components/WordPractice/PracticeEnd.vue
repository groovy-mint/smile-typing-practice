<template>
  <div id="resultWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><img src="~@/assets/back.svg" alt="Back"></router-link>단어 연습</p><p class="subMenuTitle">{{ title }} - 결과</p>
    <p class="rate">{{ accuracyRate }}</p>
    <div class="rateBox">
      <div class="accuracyBox center">
        <span>정확도</span><br><span>{{ accuracy }}</span><span>%</span>
      </div>
      <div class="accuracyBox center">
        <span>경과시간</span><br><span>{{ time }}</span>
      </div>
    </div>
    <p class="center">왼쪽 위의 갈매기표를 누르면 뒤로 갑니다.</p>
  </div>
</template>

<script>

export default{

  props: {
    accuracy: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      accuracyRate: ''
    }
  },
  methods: {
    showResult: function () {
      if (this.level === '1') {
        this.accuracy === '100' ? this.accuracyRate = '참말로 잘했심더!'
          : this.accuracy >= '80' ? this.accuracyRate = '쫌 몬해도 괘안타!'
            : this.accuracyRate = '니 머꼬? 사람이 아이가?'
      } else {
        this.accuracy === '100' ? this.accuracyRate = '참 잘했어요!'
          : this.accuracy >= '80' ? this.accuracyRate = '조금만 더 정확히!'
            : this.accuracyRate = '자리 연습부터 다시 하는 게 어떨까요?'
      }
    }
  },
  beforeMount () {
    this.showResult()
    console.log(this.level)
  }
}
</script>
<style scoped>
#resultWrapper{
  margin:0 30px;
}
.rateBox{
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 100px;
}
.center{
    text-align: center;
}
.accuracyBox>span:nth-child(1){
  font-family: "NotoSansDemiLight";
  font-size: 1.5em;
}
.accuracyBox>span:nth-child(3){
  font-size: 5em;
  margin-right: 5px;
  line-height: 1;
}

.accuracyBox>span:nth-child(4){
  font-size: 2em;
}
.rate{
    font-family: "NotoSansLight";
    font-size: 3em;
    text-align: center;
}
@media (prefers-color-scheme: dark) {
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
  p, span{color:#eee}
}
</style>
