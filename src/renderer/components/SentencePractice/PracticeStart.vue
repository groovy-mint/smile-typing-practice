<template>
  <div id="typeWrapper" @click="focusOnForm()">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><img src="~@/assets/back.svg" alt="Back"></router-link>문장 연습</p><p class="subMenuTitle">{{ title }}</p>
    <div class="typeInnerWrapper">
        <div class="typePrevBox">
          <div><span id="prev1" v-for="item in prev1" v-bind:key="item.id" v-bind:class="item.style">{{ item.char }}</span></div>
          <div><span v-html="prev1a" id="prev1"></span></div>
        </div>
        <div class="nowCursor">
          <div><span id="now" v-for="item in now" v-bind:key="item.id" v-bind:class="item.style">{{ item.char }}</span></div>
          <div><input @keypress.enter ="nextRound" type="text" ref="answer" id="nowAnswer" onpaste="javascript:return false;"></div>
        </div>
        <div class="typeNextBox">
          <div><span id="next1">{{ next1 }}</span></div>
          <div><span id="next2">{{ next2 }}</span></div>
          <div><span id="next3">{{ next3 }}</span></div>
          <div><span id="next3">{{ next4 }}</span></div>
          <div><span id="next3">{{ next5 }}</span></div>
          <div><span id="next3">{{ next6 }}</span></div>
        </div>
    </div>
    <div class="typeInfoBox">
      <div><div><span>진행도</span><span id="passed">{{ passed }}</span><span>/</span><span id="maxsentences">{{ maxsentences }}</span></div><progress class="progress" max="100" v-bind:value="passPerMax"></progress></div>
      <div><div><span>타수</span><span id="passed"><!--FIXME 타수 표시 자리-->{{typePerMin}}</span><span>타/분</span></div><progress class="progress" max="1500" v-bind:value="typePerMin"></progress></div>
      <div><div><span>틀린 문장</span><span id="failed">{{ failed }}</span><span>/</span><span id="maxsentences">{{ maxsentences }}</span></div><progress class="progress" max="100" v-bind:value="failPerMax"></progress></div>
      <div><div><span>정확도</span><span id="failed">{{ accuracy }}</span><span>%</span></div><progress class="progress" max="100" v-bind:value="accuracy"></progress></div>
    </div>
    <!-- <div class="typeKeyboardBox">
      <KeyboardLayout/>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import { ipcRenderer } from 'electron'

import sentencesData from '@/assets/sentencePracticeData.json'
import Hangul from 'hangul-js'
export default {

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
      now: [], // 제시어 (배열화)
      nowSource: '', // 제시어 원본
      next1: '', // 다음 제시어
      next2: '', // 다다음 제시어
      next3: '', // 다다다음 제시어
      next4: '', // 다다다음 제시어
      next5: '', // 다다다음 제시어
      next6: '', // 다다다음 제시어
      prev1a: '', // 이전 답안
      note: '', // 제시어 각주
      noteNext1: '', // 다음 각주
      noteNext2: '', // 다다음 각주
      passed: 0, // 진행한 문장
      maxsentences: 0, // 최대 문장 개수
      keyTime: 0, // 한 문장당 걸린 소요시간
      intervalVar: '', // 타수 체크 함수용 변수
      timerIntervalVar: '', // 타이머 함수용 변수
      sec: 0, // 경과 시간 - 초
      min: 0, // 경과 시간 - 분
      secDisplay: '00', // 표출용 변수
      typePerMin: 0, // 타수
      typePerMinTotal: 0, // 최종 타수
      passPerMax: 0, // 진행도
      failed: 0, // 틀린 문장
      failPerMax: 0, // 틀린 문장과 최대 문장 (프로그레스바 전용)
      accuracy: 100, // 정확도
      redOption: 'red', // CUD 대응 오타 표시 옵션
      language: -1
    }
  },
  methods: {
    initialSetting: function () { // 초기화 메소드
      ipcRenderer.invoke('getStoreValue', 'sentenceMax').then((result) => { // 최대 문장 설정 가져오기
        this.maxsentences = result
      })
      ipcRenderer.invoke('getStoreValue', 'cud').then((result) => { // 최대 문장 설정 가져오기
        if (result) {
          this.redOption = 'underline'
        }
      })
      ipcRenderer.invoke('getStoreValue', 'language').then((result) => { // 언어 설정 가져오기
        this.language = (result === 'KO') ? 0 : (result === 'EN') ? 1 : 2 // 언어 종류 정수로 변환
        var allSentences = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData.length
        })
        var sentencesCount = allSentences
        var x = Math.floor(Math.random() * (sentencesCount))
        var sentence1 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note1 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence2 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note2 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence3 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note3 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence4 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note4 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence5 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note5 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence6 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note6 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        })
        x = Math.floor(Math.random() * (sentencesCount))
        var sentence7 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence
        })
        var note7 = sentencesData.sentences.map((item) => {
          return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote
        }) // 이 뭉탱이는 좀 비효율적인 것 같은데 나중에 손보는걸로
        var tempSplit = sentence1[0].split('')
        for (var i = 0; i < tempSplit.length; i++) {
          this.now.push({ id: i, style: 'black', char: tempSplit[i] })
        }
        this.nowSource = sentence1[0]
        this.next1 = sentence2[0]
        this.next2 = sentence3[0]
        this.next3 = sentence4[0]
        this.next4 = sentence5[0]
        this.next5 = sentence6[0]
        this.next6 = sentence7[0]
        this.note = note1[0]
        this.noteNext1 = note2[0]
        this.noteNext2 = note3[0]
        this.noteNext3 = note4[0]
        this.noteNext4 = note5[0]
        this.noteNext5 = note6[0]
        this.noteNext6 = note7[0] // vue data 변수에 각 요소를 집어넣음.
      })
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
      this.typePerMinTotal = this.typePerMinTotal + parseInt(this.typePerMin)
      clearInterval(this.intervalVar)
      var answer = this.$refs.answer.value
      answer = answer.trimEnd()
      if (answer === '' || answer === ' ') { // 입력란 공백 체크
        this.$refs.answer.value = '' // 입력란 공란화
      } else {
        // 문장 리젠 섹션
        if (this.maxsentences > this.passed + 7) { // 문장 리젠이 더이상 필요 없을 경우 리젠 중단하도록 함
          var allSentences = sentencesData.sentences.map((item) => {
            return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData.length
          })
          var sentencesCount = allSentences // 전체 단어 수 가져오기
          var x = Math.floor(Math.random() * (sentencesCount)) // 랜덤 단어 배열 번호
          var nextSentence = sentencesData.sentences.map((item) => {
            return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentence // 단어 리젠
          })
          var noteNext = sentencesData.sentences.map((item) => {
            return item.sentenceLang[this.language].sentenceLevel[this.level].sentenceData[x].sentenceNote // 각주 리젠
          })
        } else {
          nextSentence = ''
          noteNext = ''
        }
        // 답안 이동 및 오타 검사 섹션
        this.prev2a = this.prev1a // 이전 답안을 왼쪽으로 넘김
        this.prev1a = answer // 답안을 왼쪽으로 넘김
        var srcLastChar = this.nowSource.length - 1 // 주어진 글자의 마지막 글자 배열 순서
        var ansLastChar = answer.length - 1 // 답안 글자의 마지막 글자 배열 순서
        var failed = false
        for (var j = 0; j < (this.nowSource.length); j++) { // 오타 검사
          if (answer.split('')[j] !== undefined) { // 공백시 오타처리
            if (this.arraysEqual(Hangul.d(this.now[j].char, true)[0], Hangul.d(answer.split('')[j], true)[0]) === false) {
              this.now.splice(j, 1, { id: j, style: this.redOption, char: this.now[j].char })
              failed = true
            } else {
              this.now.splice(j, 1, { id: j, style: 'black', char: this.now[j].char })
            }
          } else {
            this.now.splice((j), 1, { id: (j), style: this.redOption, char: this.now[j].char })
            failed = true
          }
        }
        if (failed) { // 오타 검사
          this.failed = this.failed + 1
          this.accuracy = (100 - this.failed * 100 / this.maxsentences).toFixed(0)
          this.failPerMax = this.failed * 100 / this.maxsentences
        }
        if (this.arraysEqual(Hangul.d(this.nowSource, true)[srcLastChar], Hangul.d(answer, true)[ansLastChar]) === false) { // 제시어 마지막 글자 오타 확인 후 색깔 처리
          this.now.splice(srcLastChar, 1, { id: srcLastChar, style: this.redOption, char: this.now[srcLastChar].char })
        } else {
          this.now.splice(srcLastChar, 1, { id: srcLastChar, style: 'black', char: this.now[srcLastChar].char })
        }
        this.passed = this.passed + 1 // 진행도 1 올림
        if (this.passed === this.maxsentences) {
          clearInterval(this.timerInterval)
          this.$router.push('/sentence-practice/end?acr=' + this.accuracy + '&typnum=' + (this.typePerMinTotal / this.maxsentences).toFixed(0) + '&title=' + this.title + '&lvl=' + this.level + '&time=' + this.min + ':' + this.secDisplay)
        } else {
          this.prev1 = this.now // 제시어를 위로 넘김
          this.nowSource = this.next1 // 다음 제시어를 제시어 원본으로 넘김
          var tempSplit = this.next1.split('') // 제시어 원본 글자를 각각 배열화
          this.now = [] // 제시어 초기화
          for (var i = 0; i < tempSplit.length; i++) { // 제시어 배열 푸시
            this.now.push({ id: i, style: 'black', char: tempSplit[i] })
          }
          this.next1 = this.next2 // 다다음 제시어를 위로 넘김
          this.next2 = this.next3 // 다다음 제시어를 위로 넘김
          this.next3 = this.next4 // 다다음 제시어를 위로 넘김
          this.next4 = this.next5 // 다다음 제시어를 위로 넘김
          this.next5 = this.next6 // 다다음 제시어를 위로 넘김
          this.next6 = nextSentence[0] // 제시어 리젠

          this.$refs.answer.value = '' // 입력란 공란화

          this.note = this.noteNext1 // 다음 각주 왼쪽으로 넘김
          this.noteNext1 = this.noteNext2 // 다다음 각주 왼쪽으로 넘김
          this.noteNext2 = this.noteNext3 // 다다음 각주 왼쪽으로 넘김
          this.noteNext3 = this.noteNext4 // 다다음 각주 왼쪽으로 넘김
          this.noteNext4 = this.noteNext5 // 다다음 각주 왼쪽으로 넘김
          this.noteNext5 = this.noteNext6 // 다다음 각주 왼쪽으로 넘김
          this.noteNext6 = noteNext[0] // 각주 리젠

          this.keyTime = 0
          clearInterval(this.intervalVar)

          this.passPerMax = this.passed * 100 / this.maxsentences // 진행도 계산
        }
      }
    },
    keyPressed: function (ev) {
      clearInterval(this.intervalVar)
      if (ev.key === 'Enter') {
        return
      }
      if (ev.key === 'Escape') { // 메뉴로 돌아가는 키
        this.$router.push('*')
      }
      if (ev.key === 'F5' || (ev.key === 'r' && ev.metaKey === true) || (ev.key === 'r' && ev.ctrlKey === true)) {
        this.$router.go()
      }
      var tempAnswer = this.$refs.answer.value.split('')
      var tempAnswer2 = Hangul.d(this.$refs.answer.value).length
      if (this.language === 0) {
        tempAnswer.pop()
        var leng = this.now.length - 1
        var tempAnswerLeng = tempAnswer.length + 1
        var plus1 = 1
      } else {
        leng = this.now.length
        tempAnswerLeng = tempAnswer.length
        plus1 = 0
      }
      if (this.now.length < (tempAnswerLeng)) { // 스페이스 혹은 마지막에서 사고가 났으면 다음으로 넘김
        this.nextRound()
      } else {
        this.intervalVar = setInterval(() => {
          this.keyTime = this.keyTime + 10
          this.typePerMin = (tempAnswer2 / this.keyTime * 60000).toFixed(0)
        }, 10)
        for (var i = 0; i < leng; i++) { // 오타 검사
          if (tempAnswer[i] !== undefined) { // 오타를 치우면 빨간걸 없애는 if
            if (this.arraysEqual(Hangul.d(this.now[i].char, true)[0], Hangul.d(tempAnswer[i], true)[0]) === false) {
              this.now.splice(i, 1, { id: i, style: this.redOption, char: this.now[i].char })
            } else {
              this.now.splice(i, 1, { id: i, style: 'black', char: this.now[i].char })
            }
          } else {
            this.now.splice((i + plus1), 1, { id: (i + plus1), style: 'black', char: this.now[(i + plus1)].char })
          }
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
      this.min = this.min + Math.floor(this.sec / 60)
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
    clearInterval(this.intervalVar)
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
.typeInnerWrapper>div{
  font-size: 2.5vw;
  padding: 1vw 1.5vw;
  overflow: hidden;
}
.typePrevBox{
  font-family: "NotoSansLight";
  min-height: 7.5vw;
  max-height: 7.5vw;
  overflow: hidden;
}
.typeNextBox{
  font-family: "NotoSansLight";
  color: gray;
  min-height: 22vw;
}
#prev1,#prev2{
  color: lightgray;
}
#prev1.red ,#prev2.red{
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
.underline{
  background: black;
  color:white;
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
@media (prefers-color-scheme: dark) {
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
  #prev1,#prev2{color: #444;}
  p, span, input{color:#eee}
  .typeNextBox>div>span{color: #777;}
  #prev1.red ,#prev2.red{color:darkred}
  .nowCursor{border-top: 0.3vw solid #eee;border-bottom: 0.3vw solid #eee;}
  .black{color:#eee;}
  .underline{background: #eee;color:black;}
  .gray{color:#777 !important}
  progress{border: 1px solid #eee;}
  progress::-webkit-progress-value {background: #eee;}
}
</style>