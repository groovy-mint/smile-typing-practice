<template>
  <div id="resultWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>긴 글 연습</p><p class="subMenuTitle">{{ title }} - 결과</p>
    <p class="rate">{{ accuracyRate }}</p>
    <div class="rateBox">
      <div class="accuracyBox center">
        <span>정확도</span><br><span>{{ accuracy }}</span><span>%</span>
      </div>
      <div class="accuracyBox center">
        <span>타수</span><br><span>{{ typnum }}</span><span>타</span>
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
    typnum: {
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
      this.accuracy === '100' ? this.accuracyRate = '아주 정확해요!'
        : this.accuracy >= '90' ? this.accuracyRate = '아깝다! 조금만 더 정확하게!'
          : this.accuracy <= '0' ? this.accuracyRate = '타자연습으로 장난치지 말아요..'
            : this.accuracyRate = '늦어도 좋으니 천천히..'
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
