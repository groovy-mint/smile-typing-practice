<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link to="*"><LeftIcon/></router-link>단어 연습</p><p class="subMenuTitle">{{ title }}</p>
    <div class="typeReqBox">
      <div><span id="prev2">{{ prev2 }}</span></div>
      <div><span id="prev1">{{ prev1 }}</span></div>
      <div class="nowCursor"><span id="now">{{ now }}</span></div>
      <div><span id="next1">{{ next1 }}</span></div>
      <div><span id="next2">{{ next2 }}</span></div>
    </div>
    <div class="typeAnswerBox">
      <div><span v-html="prev2a" id="prev2"></span></div>
      <div><span v-html="prev1a" id="prev1"></span></div>
      <div class="nowCursor"><input @keypress.enter ="nextRound" @keyup.space ="nextRound" type="text" ref="answer" id="nowAnswer"></div>
      <div><span id="next1"></span></div>
      <div><span id="next2"></span></div>
    </div>
    <div class="typeDictBox">
      <span id="dict">{{ dict }}</span>
    </div>
    <div class="typeInfoBox">
      <div><div><span>진행도</span><span id="passed">{{ passed }}</span><span>/</span><span id="maxwords">{{ maxwords }}</span></div><progress class="progress" max="100" v-bind:value="passPerMax"></progress></div>
      <div><div><span>오타수</span><span id="failed">{{ failed }}</span><span>/</span><span id="maxwords">{{ maxwords }}</span></div><progress class="progress" max="100" v-bind:value="failPerMax"></progress></div>
      <div><div><span>정확도</span><span id="failed">{{ accuracy }}</span><span>%</span></div><progress class="progress" max="100" v-bind:value="accuracy"></progress></div>
    </div>
    <!-- <div class="typeKeyboardBox">
      <KeyboardLayout/>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import LeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import wordsData from '@/assets/wordPracticeData.json'
import Hangul from 'hangul-js'
import KeyboardLayout from './keyboardDubeol.vue'
export default {
  components: { LeftIcon, KeyboardLayout },
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
      prev1: '',
      prev2: '',
      now: '',
      next1: '',
      next2: '',
      prev1a: '',
      prev2a: '',
      dict: '',
      dictNext1: '',
      dictNext2: '',
      passed: 0,
      maxwords: 100,
      passPerMax: 0,
      failed: 0,
      failPerMax: 0,
      accuracy: 100
    }
  },
  methods: {
    initialSetting: function () { // 초기화 메소드
      var allWords = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData.length
      })
      var wordsCount = allWords
      var x = Math.floor(Math.random() * (wordsCount))
      var word1 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordName
      })
      var dict1 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordDict
      })
      x = Math.floor(Math.random() * (wordsCount))
      var word2 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordName
      })
      var dict2 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordDict
      })
      x = Math.floor(Math.random() * (wordsCount))
      var word3 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordName
      })
      var dict3 = wordsData.words.map((item) => {
        return item.wordLevel[this.level].wordData[x].wordDict
      }) // 이 뭉탱이는 좀 비효율적인 것 같은데 나중에 손보는걸로
      this.now = word1[0]
      this.next1 = word2[0]
      this.next2 = word3[0]
      this.dict = dict1[0]
      this.dictNext1 = dict2[0]
      this.dictNext2 = dict3[0] // vue data 변수에 각 요소를 집어넣음.
      console.log(Hangul.d(this.now, true))
      console.log(Hangul.d(this.now, true)[0][1])
    },
    focusOnForm: function () {
      Vue.nextTick(() => // input이 생성될 때까지 기다리게 함
        this.$refs.answer.focus() // answer라는 ref속성을 갖고있는 것에 입력 포커스를 생성
      )
    },
    nextRound: function () {
      var answer = this.$refs.answer.value
      answer = answer.trim()
      if (answer === '' || answer === ' ') { // 입력란 공백 체크
        this.$refs.answer.value = '' // 입력란 공란화
      } else {
        var allWords = wordsData.words.map((item) => {
          return item.wordLevel[this.level].wordData.length
        })
        var wordsCount = allWords
        var x = Math.floor(Math.random() * (wordsCount))
        var nextWord = wordsData.words.map((item) => {
          return item.wordLevel[this.level].wordData[x].wordName
        })
        var dictNext = wordsData.words.map((item) => {
          return item.wordLevel[this.level].wordData[x].wordDict
        })
        this.prev2a = this.prev1a
        if (this.now === answer) {
          this.prev1a = answer
        } else { // 오타처리
          this.prev1a = '<span style="color:lightcoral">' + answer + '</span>'
          this.failed = this.failed + 1
          this.accuracy = (100 - this.failed * 100 / this.maxwords).toFixed(0)
          this.failPerMax = this.failed * 100 / this.maxwords
        }
        this.passed = this.passed + 1 // 진행도 1 올림
        if (this.passed === this.maxwords) {
          this.$router.push('/word-practice/end?acr=' + this.accuracy + '&title=' + this.title + '&lvl=' + this.level)
        }
        this.prev2 = this.prev1
        this.prev1 = this.now
        this.now = this.next1
        this.next1 = this.next2
        this.next2 = nextWord[0] // 여기까지 윗부분 단어 처리
        this.$refs.answer.value = '' // 입력란 공란화

        this.dict = this.dictNext1
        this.dictNext1 = this.dictNext2
        this.dictNext2 = dictNext[0] // 단어 뜻 처리

        console.log(Hangul.d(this.now, true))
        console.log(Hangul.d(this.now, true)[0][1])

        this.passPerMax = this.passed * 100 / this.maxwords
      }
    }
  },
  beforeMount () {
    this.initialSetting()
  },
  created: function () {
    this.focusOnForm()
  }
}
</script>
<style scoped>
input:focus {outline:none;}
#typeWrapper{
  margin:0 30px;
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
.typeReqBox{
  margin-top:20px;
  font-family: "NotoSansLight";
  display: flex;
  justify-content: center;
}
.typeReqBox>div{
  width:300px;
  font-size: 3.7vw;
  padding: 0 1.5vw;
  text-align: center;
  overflow: hidden;
}
.typeReqBox>div:nth-child(2){
  border-left: 0.3vw solid lightgray;
}
.typeReqBox>div:nth-child(4){
  border-right: 0.3vw solid lightgray;
}
.typeDictBox{
  text-align: center;
  font-size: 1.8vw;
  margin-top:10px
}
.typeAnswerBox{
  font-family: "NotoSansLight";
  display: flex;
  height: 55px;
}
.typeAnswerBox>div{
  width:300px;
  font-size: 3.7vw;
  padding: 0 1.5vw;
  padding-top: 0px;
  text-align: center;
  overflow: hidden;
}
.typeAnswerBox>div:nth-child(2){
  border-left: 0.3vw solid lightgray;
}
.typeAnswerBox>div:nth-child(4){
  border-right: 0.3vw solid lightgray;
}
#dict{
  color: gray;
}
#prev1,#prev2{
  color: lightgray;
}
.nowCursor{
  font-family: "NotoSansRegular";
  border-left: 0.3vw solid black;
  border-right: 0.3vw solid black;
  text-align: left;
}
#nowAnswer{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-family: "NotoSansRegular";
  background: none;
  border: none;
  text-align: center;
  width: 15vw;
  font-size: 3.7vw;
  padding: 0;
}
#next1,#next2{
  color: gray;
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