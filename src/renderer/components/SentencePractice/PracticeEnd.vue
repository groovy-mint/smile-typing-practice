<template>
  <div id="resultWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><img src="~@/assets/back.svg" alt="Back"></router-link>문장 연습</p><p class="subMenuTitle">{{ title }} - 결과</p>
    <p class="rate">{{ accuracyRate }}</p>
    <div class="rateBox">
      <div class="accuracyBox center">
        <span>정확도</span><br><span>{{ accuracy }}</span><span>%</span>
      </div>
      <div class="accuracyBox center">
        <span>타수</span><br><span>{{ typnum }}</span><span>타</span>
      </div>
      <div class="accuracyBox center">
        <span>경과 시간</span><br><span>{{ time }}</span>
      </div>
    </div>
    <p class="center">왼쪽 위의 갈매기표 버튼이나 Esc 키를 누르면 뒤로 갑니다. F5 혹은 Ctrl+R 키를 누르면 처음부터 다시 합니다.</p>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default{

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
      this.accuracy === '100' ? this.accuracyRate = '참 잘했어요!'
        : this.accuracy >= '90' ? this.accuracyRate = '아깝다! 조금만 더 정확히!'
          : this.accuracy <= '0' ? this.accuracyRate = '타자연습으로 장난치지 말아요..'
            : this.accuracyRate = '늦어도 좋으니 천천히..'
    },
    writeReport: function () {
      ipcRenderer.invoke('getStoreValue', 'sentenceReports').then((result) => {
        var leng = result.length
        result.push({ id: leng, title: this.title, accuracy: this.accuracy, typnum: this.typnum, time: this.time })
        ipcRenderer.invoke('setStoreValue', 'sentenceReports', result)
      })
    },
    keyPressed: function (ev) {
      if (ev.key === 'Escape') { // 메뉴로 돌아가는 키
        this.$router.push('*')
      }
      if (ev.key === 'F5' || (ev.key === 'r' && ev.metaKey === true) || (ev.key === 'r' && ev.ctrlKey === true)) {
        this.$router.push('/sentence-practice/start?lvl=' + this.level + '&title=' + this.title)
      }
    }
  },
  beforeMount () {
    this.showResult()
  },
  mounted () {
    this.writeReport()
    window.addEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너 생성
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너 제거
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
