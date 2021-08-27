<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><img src="~@/assets/back.svg" alt="Back"></router-link>긴 글 연습</p><p class="subMenuTitle">{{ title }}</p>
    <div class="typeInnerWrapper">
        <div class="typeBox">
          <div :class="style0"><span v-for="item in line0" :key="item.id" :class="item.style">{{ item.char }}</span></div>
          <input :class="answerInput0" @keypress.enter ="nextRound" type="text" ref="answer0" id="nowAnswer" onpaste="javascript:return false;">
          <div class="gray">{{ answer0 }}</div>
        </div>
        <div class="typeBox">
          <div :class="style1"><span v-for="item in line1" :key="item.id" :class="item.style">{{ item.char }}</span></div>
          <input :class="answerInput1" @keypress.enter ="nextRound" type="text" ref="answer1" id="nowAnswer" onpaste="javascript:return false;">
          <div class="gray">{{ answer1 }}</div>
        </div>
        <div class="typeBox">
          <div :class="style2"><span v-for="item in line2" :key="item.id" :class="item.style">{{ item.char }}</span></div>
          <input :class="answerInput2" @keypress.enter ="nextRound" type="text" ref="answer2" id="nowAnswer" onpaste="javascript:return false;">
          <div class="gray">{{ answer2 }}</div>
        </div>
        <div class="typeBox">
          <div :class="style3"><span v-for="item in line3" :key="item.id" :class="item.style">{{ item.char }}</span></div>
          <input :class="answerInput3" @keypress.enter ="nextRound" type="text" ref="answer3" id="nowAnswer" onpaste="javascript:return false;">
          <div class="gray">{{ answer3 }}</div>
        </div>
    </div>
    <div class="typeInfoBox">
      <div><div><span>진행도</span><span id="passed">{{ passed }}</span>/<span>{{ maxSentence }}</span></div><progress class="progress" :max="maxSentence" :value="passed"></progress></div>
      <div><div><span>타수</span><span id="passed">{{ typePerMin }}</span><span>타/분</span></div><progress class="progress" max="1500" :value="typePerMin"></progress></div>
      <div><div><span>정확도</span><span id="failed">{{ accuracy }}</span><span>%</span></div><progress class="progress" :max="accuracyChars" :value="accuracyChars - failed"></progress></div>
      <div><div><span>{{ minDisplay }}:{{ secDisplay }}</span></div></div>
    </div>
    <!-- <div class="typeKeyboardBox">
      <KeyboardLayout/>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import { ipcRenderer } from 'electron'

import articlesData from '@/assets/articlePracticeData.json'
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
      intervalVar: '', // 타이머 및 타수 체크 함수를 위한 변수
      keyTime: 0, // 글을 모두 끝내기까지 걸린 시간
      passed: 0, // 진행도 (진행한 문장 개수)
      maxSentence: 0, // 최대 문장 개수
      typePerMin: 0, // 타수
      accuracy: 0, // 정확도
      failed: 0, // 오타
      msec: 0, // 경과 시간 - 밀리초
      sec: 0, // 경과 시간 - 초
      min: 0, // 경과 시간 - 분
      secDisplay: '00', // 표출용 변수
      minDisplay: '00', // 표출용 변수
      allChars: '', // 모든 문장 답변 총합
      accuracyChars: 0, // 정확도 확인용 문자 개수
      nowSource: '', // 현재 진행중인 줄의 원본 문장
      style0: '', // 문장 스타일 변경용
      style1: '',
      style2: '',
      style3: '',
      line0: [], // 문장 표출용 배열
      line1: [], // 문장 표출용 배열
      line2: [], // 문장 표출용 배열
      line3: [], // 문장 표출용 배열
      answerInput0: '', // 답변 스타일 변수
      answerInput1: '',
      answerInput2: '',
      answerInput3: '',
      answer0: '', // 답변 변수
      answer1: '',
      answer2: '',
      answer3: '',
      redOption: 'red', // CUD 대응 오타 표시 변수
      language: -1
    }
  },
  methods: {
    pageRegen: function () { // 초기화 메소드 역할 및 쪽 리젠
      ipcRenderer.invoke('getStoreValue', 'cud').then((result) => { // CUD 대응
        if (result) {
          this.redOption = 'underline'
        }
      })
      ipcRenderer.invoke('getStoreValue', 'language').then((result) => { // 언어 설정 가져오기
        this.language = (result === 'KO') ? 0 : (result === 'EN') ? 1 : 2 // 언어 종류 정수로 변환
        this.line0 = []
        this.line1 = []
        this.line2 = []
        this.line3 = []
        this.answer0 = ''
        this.answer1 = ''
        this.answer2 = ''
        this.answer3 = ''
        var j = this.passed
        var sentencesCount = articlesData.articles.map((item) => {
          return item.articleLang[this.language].articleLevel[this.level].sentenceData
        })
        this.maxSentence = sentencesCount[0].length // 최대 문장 개수
        var line
        for (var x = j; x < (j + 4); x++) { // 라인 별 문장 리젠 반복문
          var tempSentence = articlesData.articles.map((item) => {
            return item.articleLang[this.language].articleLevel[this.level].sentenceData[x].sentence
          })
          var tempSplit = tempSentence[0].split('')
          switch (x % 4) { // 집어넣을 위치 결정
            case 0:
              line = this.line0
              this.style0 = 'black'
              break
            case 1:
              line = this.line1
              this.style1 = 'gray'
              break
            case 2:
              line = this.line2
              this.style2 = 'gray'
              break
            case 3:
              line = this.line3
              this.style3 = 'gray'
              break
          }
          for (var i = 0; i < tempSplit.length; i++) { // 라인에 글자 하나씩 집어넣음
            line.push({ id: i, style: 'black', char: tempSplit[i] })
          }
        }
        var sourceSentence = articlesData.articles.map((item) => { // 현재 문장 원본 가져옴
          return item.articleLang[this.language].articleLevel[this.level].sentenceData[j].sentence
        })
        this.nowSource = sourceSentence[0]
        console.log(this.nowSource)
        this.answerInput0 = 'block'
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
    focusOnForm: function (answer) { // 연습 시작 시 인풋란에 커서를 놓는 함수
      Vue.nextTick(() => // input이 생성될 때까지 기다리게 함
        this.$refs[answer].focus() // answer라는 ref속성을 갖고있는 것에 입력 포커스를 생성
      )
    },
    nextRound: function () { // 다음 라운드: 엔터를 눌렀을 때의 행동
      clearInterval(this.intervalVar)
      var nowLine = this.passed % 4
      switch (nowLine) { // 답변 라인 찾기
        case 0:
          var line = this.line0
          var answerLine = 'answer0'
          break
        case 1:
          line = this.line1
          answerLine = 'answer1'
          break
        case 2:
          line = this.line2
          answerLine = 'answer2'
          break
        case 3:
          line = this.line3
          answerLine = 'answer3'
          break
      }
      var answer = this.$refs[answerLine].value
      answer = answer.trimEnd()
      if (answer === '' || answer === ' ') { // 입력란 공백 체크
        this.$refs[answerLine].value = '' // 입력란 공란화
      } else {
        this.allChars = this.allChars + answer
        for (var i = 0; i < (this.nowSource.length); i++) { // 오타 검사
          this.accuracyChars = this.accuracyChars + 1
          if (answer.split('')[i] !== undefined) { // 공백시 오타처리
            if (this.arraysEqual(Hangul.d(line[i].char, true)[0], Hangul.d(answer.split('')[i], true)[0]) === false) {
              line.splice(i, 1, { id: i, style: this.redOption, char: line[i].char })
              this.failed = this.failed + 1
            } else {
              line.splice(i, 1, { id: i, style: 'black', char: line[i].char })
            }
          } else {
            line.splice((i), 1, { id: (i), style: this.redOption, char: line[i].char })
            this.failed = this.failed + 1
          }
        }
        this.accuracy = Math.floor(100 - (this.failed * 100 / this.accuracyChars))
        if ((this.passed + 1) === this.maxSentence) { // 문헌의 끝이면 실행
          this.$router.push('/article-practice/end?acr=' + this.accuracy + '&typnum=' + this.typePerMin + '&title=' + this.title + '&lvl=' + this.level + '&time=' + this.minDisplay + ':' + this.secDisplay)
        } else {
          var nextSource = articlesData.articles.map((item) => { // 다음 문장 원본 가져옴
            return item.articleLang[this.language].articleLevel[this.level].sentenceData[(this.passed + 1)].sentence
          })
          this.nowSource = nextSource[0]
          this.passed = this.passed + 1
          switch (nowLine) { // 라인 위치 결정
            case 0:
              this.style0 = 'gray'
              this.style1 = 'black'
              this.answerInput0 = ''
              this.answerInput1 = 'block'
              this.answer0 = answer
              this.focusOnForm('answer1')
              break
            case 1:
              this.style1 = 'gray'
              this.style2 = 'black'
              this.answerInput1 = ''
              this.answerInput2 = 'block'
              this.answer1 = answer
              this.focusOnForm('answer2')
              break
            case 2:
              this.style2 = 'gray'
              this.style3 = 'black'
              this.answerInput2 = ''
              this.answerInput3 = 'block'
              this.answer2 = answer
              this.focusOnForm('answer3')
              break
            case 3:
              this.style3 = 'gray'
              this.style0 = 'black'
              this.answerInput3 = ''
              this.answerInput0 = 'block'
              this.focusOnForm('answer0')
              this.pageRegen()
          }
        }
      }
      this.$refs[answerLine].value = ''
    },
    keyPressed: function (ev) {
      clearInterval(this.intervalVar)
      if (ev.key === 'Enter') {
        return
      }
      switch (this.passed % 4) { // 라인 위치 결정
        case 0:
          var line = this.line0
          var answer = 'answer0'
          break
        case 1:
          line = this.line1
          answer = 'answer1'
          break
        case 2:
          line = this.line2
          answer = 'answer2'
          break
        case 3:
          line = this.line3
          answer = 'answer3'
          break
      }
      var tempAnswer = this.$refs[answer].value.split('')
      var tempAnswer2 = Hangul.d(this.$refs[answer].value).length + Hangul.d(this.allChars).length
      tempAnswer.pop()
      var leng = this.nowSource.length - 1
      if (this.nowSource.length < (tempAnswer.length + 1)) { // 스페이스 혹은 마지막에서 사고가 났으면 다음으로 넘김
        this.nextRound()
      } else {
        this.intervalVar = setInterval(() => { // 타수 계산 및 타이머 시간 재는 용도
          this.keyTime = this.keyTime + 10
          this.sec = Math.floor(this.keyTime / 1000)
          this.min = Math.floor(this.sec / 60)
          this.msec = this.keyTime % 1000 / 10
          this.sec = this.sec % 60
          this.min = this.min % 60
          this.secDisplay = this.sec
          this.minDisplay = this.min
          if (this.sec < 10) {
            this.secDisplay = '0' + this.sec
          }
          if (this.min < 10) {
            this.minDisplay = '0' + this.min
          }

          this.typePerMin = (tempAnswer2 / this.keyTime * 60000).toFixed(0)
        }, 10)
        for (var i = 0; i < leng; i++) { // 오타 검사
          if (tempAnswer[i] !== undefined) { // 오타를 치우면 빨간걸 없애는 if
            if (this.arraysEqual(Hangul.d(line[i].char, true)[0], Hangul.d(tempAnswer[i], true)[0]) === false) {
              line.splice(i, 1, { id: i, style: this.redOption, char: line[i].char })
            } else {
              line.splice(i, 1, { id: i, style: 'black', char: line[i].char })
            }
          } else {
            line.splice((i + 1), 1, { id: (i + 1), style: 'black', char: line[(i + 1)].char })
          }
        }
      }
    }
  },
  mounted () {
    this.pageRegen()
    window.addEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyPressed, true) // 키보드 이벤트 리스너
    clearInterval(this.intervalVar)
  },
  created: function () {
    this.focusOnForm('answer0')
  }
}
</script>
<style scoped>
input:focus {outline:none;}
#typeWrapper{
  margin:0 30px;
}
.typeInnerWrapper{
  margin-top:20px;
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
.typeBox{
  min-height: 7.5vw;
  max-height: 7.5vw;
  overflow: hidden;
}
.typeNextBox{
  font-family: "NotoSansLight";
  color: gray;
  min-height: 22vw;
}
.gray{
  font-family: "NotoSansLight";
  color: gray !important;
}
.gray .red ,.gray .red{
  color:lightcoral
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
  display: none;
}
.block{
  display: block !important;
}
.red{
  color:red;
}
.underline{
  background: black;
  color:white;
}
.typeInfoBox{
  margin-top:4vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
  .typeNextBox{color:#777 !important}
  p, span, input{color:#eee}
  .gray{color:#777 !important}
  .gray .black{color:#777}
  .gray .red ,.gray .red{color:darkred}
  progress{border: 1px solid #eee;}
  progress::-webkit-progress-value {background: #eee;}
}
</style>