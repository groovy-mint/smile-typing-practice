<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>긴 글 연습</p><p class="subMenuTitle">{{ title }} 컨셉트</p>
    <div class="typeInnerWrapper">
        <div class="typeBox">
          <div><span class="gray">애국가</span></div>
          <div><span class="gray">애국가</span></div>
        </div>
        <div class="typeBox">
          <div><span class="gray red">동해 물과 백두산이 마르고 닳도록</span></div>
          <div><span class="gray">돔뤠 뭘괌 뷈둭솲위 뭬릐궈 닮둬롹</span></div>
        </div>
        <div class="typeBox">
          <div><span class="gray">하느님이 보우하사 우리나라 만세</span></div>
          <div><span class="gray">하느님이 보우하사 우리나라 만세</span></div>
        </div>
        <div class="typeBox">
          <div><span class="now">무궁화 삼천리 화려강산</span></div>
          <div><input type="text" ref="answer" id="nowAnswer"></div>
        </div>
    </div>
    <div class="typeInfoBox">
      <div><div><span>진행도</span><span id="passed">12</span><span>%</span></div><progress class="progress" max="100" v-bind:value="passPerMax"></progress></div>
      <div><div><span>타수</span><span id="passed">837</span><span>타/분</span></div><progress class="progress" max="1500" v-bind:value="typePerMin"></progress></div>
      <div><div><span>정확도</span><span id="failed">{{ accuracy }}</span><span>%</span></div><progress class="progress" max="100" v-bind:value="accuracy"></progress></div>
    </div>
    <!-- <div class="typeKeyboardBox">
      <KeyboardLayout/>
    </div> -->
  </div>
</template>
<script>
import LeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import Hangul from 'hangul-js'
export default {
  components: { LeftIcon },
  props: {
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
      intervalVar: '' // 타이머 및 타수 체크 함수를 위한 변수
    }
  },
  methods: {
    initialSetting: function () {
    },
    keyPressed: function (ev) {
      clearInterval(this.intervalVar)
      if (ev.key === 'Enter') {
        return
      }
      var tempAnswer = this.$refs.answer.value.split('')
      var tempAnswer2 = Hangul.d(this.$refs.answer.value).length
      tempAnswer.pop()
      var leng = this.now.length - 1
      if (this.now.length < (tempAnswer.length + 1)) { // 스페이스 혹은 마지막에서 사고가 났으면 다음으로 넘김
        this.nextRound()
      } else {
        this.intervalVar = setInterval(() => {
          this.keyTime = this.keyTime + 10
          this.typePerMin = (tempAnswer2 / this.keyTime * 60000).toFixed(0)
        }, 10)
        for (var i = 0; i < leng; i++) { // 오타 검사
          if (tempAnswer[i] !== undefined) { // 오타를 치우면 빨간걸 없애는 if
            if (this.arraysEqual(Hangul.d(this.now[i].char, true)[0], Hangul.d(tempAnswer[i], true)[0]) === false) {
              this.now.splice(i, 1, { id: i, style: 'red', char: this.now[i].char })
            } else {
              this.now.splice(i, 1, { id: i, style: 'black', char: this.now[i].char })
            }
          } else {
            this.now.splice((i + 1), 1, { id: (i + 1), style: 'black', char: this.now[(i + 1)].char })
          }
        }
      }
    }
  }
}
</script>
<style scoped>
input:focus {outline:none;}
#typeWrapper{
  margin:0 30px;
}
.typeInnerWrapper{
  font-size:2.5vw;
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
.typeInnerWrapper>div{
  font-size: 2.5vw;
  padding: 1vw 1.5vw;
  overflow: hidden;
}
.typeBox{
  min-height: 7.5vw;
}
.typeNextBox{
  font-family: "NotoSansLight";
  color: gray;
  min-height: 22vw;
}
.gray{
  font-family: "NotoSansLight";
  color: gray;
}
.gray.red ,.gray.red{
  color:lightcoral
}
.nowCursor{
  display: flex;
  flex-direction: column;
  font-family: "NotoSansRegular";
  border-top: 0.3vw solid black;
  border-bottom: 0.3vw solid black;
  text-align: left;
  min-height: 7.5vw;
}
#nowAnswer{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-family: "NotoSansRegular";
  background: none;
  border: none;
  width: 100%;
  font-size: 2.5vw;
  padding: 0;
}
.red{
  color:red;
}
.black{
  color:black;
}
.typeInfoBox{
  margin-top:10px;
  display: flex;
  justify-content: space-evenly;
}
.typeInfoBox>div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.typeInfoBox div span:nth-child(1){
  font-family: "NotoSansLight";
  font-size: 1.5em;
  margin-right: 10px;
}
.typeInfoBox div span:nth-child(2){
  font-family: "NotoSansLight";
  font-size: 1.5em;
  margin-right: 2px;
}
progress {
  display: block; /* default: inline-block */
  border: 1px solid black;
  background: none;
  height:5px;
  width: 140px;
}
progress::-moz-progress-bar {
  background: none;
}
/* webkit */
progress::-webkit-progress-bar {
    background: transparent;
}
progress::-webkit-progress-value {  
  background: black;
}
.progress{
  margin-top:5px
}
.typeKeyboardBox{
  margin-top: 10px;
}
</style>