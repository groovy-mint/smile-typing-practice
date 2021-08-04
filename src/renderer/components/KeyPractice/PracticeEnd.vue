<template>
  <div id="resultWrapper">
    <p class="mainMenuTitle"><router-link to="*"><LeftIcon/></router-link>자리 연습</p><p class="subMenuTitle">{{ title }} - 결과</p>
    <p class="rate">{{ accuracyRate }}</p>
    <div class="rateBox">
      <div class="accuracyBox center">
        <span>정확도</span><br><span>{{ accuracy }}</span><span>%</span>
      </div>
    </div>
    <p class="center">왼쪽 위의 갈매기표를 누르면 뒤로 갑니다.</p>
  </div>
</template>

<script>
import LeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
export default{
  components: { LeftIcon },
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
    }
  },
  data () {
    return {
      accuracyRate: ''
    }
  },
  methods: {
    showResult: function () {
      this.accuracy === '100' ? this.accuracyRate = '좋아요! 단어 연습을 해보는 게 어떨까요?'
        : this.accuracy >= '80' ? this.accuracyRate = '조금 더 노력해봐요!'
          // : this.accuracy <= '-3000' ? this.accuracyRate = '오타의 신이 되셨습니다. 축하해요.'
          // : this.accuracy <= '-2000' ? this.accuracyRate = '진짜 뭐하세요ㅋㅋ 키보드 닳겠네'
          // : this.accuracy <= '-1000' ? this.accuracyRate = '뭐가 불만이에요 도대체ㅠㅠ'
          // : this.accuracy <= '-500' ? this.accuracyRate = '진심이세요?'
          : this.accuracy <= '0' ? this.accuracyRate = '타자연습으로 장난치지 말아요..'
            : this.accuracyRate = '좀 더 열심히!'
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
</style>
