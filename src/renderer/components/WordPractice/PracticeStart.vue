<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><LeftIcon/></router-link>단어 연습</p><p class="subMenuTitle">{{ title }}</p>
    <div class="typeReqBox">
      <div><span id="prev2" v-for="item in prev2" v-bind:key="item.id" v-bind:class="item.style">{{ item.char }}</span></div>
      <div><span id="prev1" v-for="item in prev1" v-bind:key="item.id" v-bind:class="item.style">{{ item.char }}</span></div>
      <div class="nowCursor">
        <span id="now" v-for="item in now" v-bind:key="item.id" v-bind:class="item.style">{{ item.char }}</span>
      </div>
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
      prev1: '', // 이전 제시어
      prev2: '', // 이전의 이전 제시어
      now: [], // 제시어 (배열화)
      nowSource: '', // 제시어 원본
      next1: '', // 다음 제시어
      next2: '', // 다다음 제시어
      prev1a: '', // 이전 답안
      prev2a: '', // 이전의 이전 답안
      dict: '', // 낱말 뜻
      dictNext1: '', // 다음 낱말 뜻
      dictNext2: '', // 다다음 낱말 뜻
      passed: 0, // 진행한 단어
      maxwords: 100, // 최대 단어
      passPerMax: 0, // 진행도
      failed: 0, // 오타
      failPerMax: 0, // 오타와 최대단어 (프로그레스바 전용)
      accuracy: 100, // 정확도
      timerIntervalVar: '', // 타이머 함수용 변수
      sec: 0, // 경과 시간 - 초
      min: 0, // 경과 시간 - 분
      secDisplay: '00' // 표출용 변수
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
      var tempSplit = word1[0].split('')
      for (var i = 0; i < tempSplit.length; i++) {
        this.now.push({ id: i, style: 'black', char: tempSplit[i] })
      }
      this.nowSource = word1[0]
      this.next1 = word2[0]
      this.next2 = word3[0]
      this.dict = dict1[0]
      this.dictNext1 = dict2[0]
      this.dictNext2 = dict3[0] // vue data 변수에 각 요소를 집어넣음.
    },
    arraysEqual: function (a, b) { // 배열이 서로 일치하는지 확인하는 함수
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false
      for (var i = 0; i < a.length; ++i) {
        var x = String(a[i])
        var y = String(b[i])
        if (x !== y) {
          return false
        }
      }
      return true
    },
    focusOnForm: function () { // 연습 시작 시 인풋란에 커서를 놓는 함수
      Vue.nextTick(() => // input이 생성될 때까지 기다리게 함
        this.$refs.answer.focus() // answer라는 ref속성을 갖고있는 것에 입력 포커스를 생성
      )
    },
    nextRound: function () { // 다음 라운드: 엔터를 눌렀을 때의 행동
      var answer = this.$refs.answer.value
      answer = answer.trim()
      if (answer === '' || answer === ' ') { // 입력란 공백 체크
        this.$refs.answer.value = '' // 입력란 공란화
      } else {
        // 단어 리젠 섹션
        if (this.maxwords > this.passed + 3) {
          var allWords = wordsData.words.map((item) => {
            return item.wordLevel[this.level].wordData.length
          })
          var wordsCount = allWords // 전체 단어 수 가져오기
          var x = Math.floor(Math.random() * (wordsCount)) // 랜덤 단어 배열 번호
          var nextWord = wordsData.words.map((item) => {
            return item.wordLevel[this.level].wordData[x].wordName // 단어 리젠
          })
          var dictNext = wordsData.words.map((item) => {
            return item.wordLevel[this.level].wordData[x].wordDict // 낱말 뜻 리젠
          })
        } else {
          nextWord = ''
          dictNext = ''
        }
        this.prev2a = this.prev1a // 이전 답안을 왼쪽으로 넘김
        this.prev1a = answer // 답안을 왼쪽으로 넘김
        var srcLastChar = this.nowSource.length - 1 // 주어진 글자의 마지막 글자 배열 순서
        var ansLastChar = answer.length - 1 // 답안 글자의 마지막 글자 배열 순서
        if (this.arraysEqual(Hangul.d(this.nowSource, true), Hangul.d(answer, true)) !== true) { // 오타 검사
          this.failed = this.failed + 1
          this.accuracy = (100 - this.failed * 100 / this.maxwords).toFixed(0)
          this.failPerMax = this.failed * 100 / this.maxwords
        }
        if (this.arraysEqual(Hangul.d(this.nowSource, true)[srcLastChar], Hangul.d(answer, true)[ansLastChar]) === false) { // 제시어 마지막 글자 오타 확인 후 색깔 처리
          this.now.splice(srcLastChar, 1, { id: srcLastChar, style: 'red', char: this.now[srcLastChar].char })
        } else {
          this.now.splice(srcLastChar, 1, { id: srcLastChar, style: 'black', char: this.now[srcLastChar].char })
        }
        this.passed = this.passed + 1 // 진행도 1 올림
        if (this.passed === this.maxwords) {
          this.$router.push('/word-practice/end?acr=' + this.accuracy + '&title=' + this.title + '&lvl=' + this.level + '&time=' + this.min + ':' + this.secDisplay)
        }
        this.prev2 = this.prev1 // 이전 제시어를 왼쪽으로 넘김
        this.prev1 = this.now // 제시어를 왼쪽으로 넘김
        this.nowSource = this.next1 // 다음 제시어를 제시어 원본으로 넘김
        var tempSplit = this.next1.split('') // 제시어 원본 글자를 각각 배열화
        this.now = [] // 제시어 초기화
        for (var i = 0; i < tempSplit.length; i++) { // 제시어 배열 푸시
          this.now.push({ id: i, style: 'black', char: tempSplit[i] })
        }
        this.next1 = this.next2 // 다다음 제시어를 왼쪽으로 넘김
        this.next2 = nextWord[0] // 제시어 리젠
        this.$refs.answer.value = '' // 입력란 공란화

        this.dict = this.dictNext1 // 다음 낱말 뜻 왼쪽으로 넘김
        this.dictNext1 = this.dictNext2 // 다다음 낱말 뜻 왼쪽으로 넘김
        this.dictNext2 = dictNext[0] // 낱말 뜻 리젠

        this.passPerMax = this.passed * 100 / this.maxwords // 진행도 계산
      }
    },
    keyPressed: function () {
      var tempAnswer = this.$refs.answer.value.split('')
      tempAnswer.pop()
      var leng = tempAnswer.length
      if (this.now.length < tempAnswer.length) {
        leng = this.now.length
      }
      for (var i = 0; i < leng; i++) { // 오타 검사
        if (this.arraysEqual(Hangul.d(this.now[i].char, true)[0], (Hangul.d(tempAnswer[i], true)[0])) === false) {
          this.now.splice(i, 1, { id: i, style: 'red', char: this.now[i].char })
        } else {
          this.now.splice(i, 1, { id: i, style: 'black', char: this.now[i].char })
        }
      }
    }
  },
  beforeMount () {
    this.initialSetting() // 연습 초기화
  },
  mounted () {
    window.addEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너
    this.timerIntervalVar = setInterval(() => {
      this.sec = this.sec + 1
      this.min = Math.floor(this.sec / 60)
      this.msec = this.keyTime % 1000 / 10
      this.sec = this.sec % 60
      this.min = this.min % 60
      this.secDisplay = this.sec
      if (this.sec < 10) {
        this.secDisplay = '0' + this.sec
      }
    }, 1000)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너
    clearInterval(this.timerIntervalVar)
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
  border-left: 0.3vw solid gray;
}
.typeReqBox>div:nth-child(4){
  border-right: 0.3vw solid gray;
}
.typeDictBox{
  text-align: center;
  font-size: 1.8vw;
  margin-top:10px
}
.typeAnswerBox{
  font-family: "NotoSansLight";
  display: flex;
  height: 6vw;
  justify-content: center;
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
  border-left: 0.3vw solid gray;
}
.typeAnswerBox>div:nth-child(4){
  border-right: 0.3vw solid gray;
}
#dict{
  color: gray;
}
#prev1,#prev2{
  color: lightgray;
}
#prev1.red ,#prev2.red{
  color:lightcoral
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
.red{
  color:red;
}
.black{
  color:black;
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