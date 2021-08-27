<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="*"><img src="~@/assets/back.svg" alt="Back"></router-link>자리 연습</p><p class="subMenuTitle">{{ title }}</p>
    <div class="typeAnswerBox">
      <div><span id="prev2">{{ prev2 }}</span></div>
      <div><span id="prev1">{{ prev1 }}</span></div>
      <div class="nowCursor"><span v-bind:class="nowErr" v-html="now"></span></div>
      <div><span id="next1">{{ next1 }}</span></div>
      <div><span id="next2">{{ next2 }}</span></div>
    </div>
    <div class="typeInfoBox">
      <div><div><span>진행도</span><span id="passed">{{ passed }}</span><span>/</span><span id="maxkeys">{{ maxkeys }}</span></div><progress class="progress" max="100" v-bind:value="passPerMax"></progress></div>
      <div><div><span>오타수</span><span id="failed">{{ failed }}</span></div></div>
      <div><div><span>정확도</span><span id="failed">{{ accuracy }}</span><span>%</span></div><progress class="progress" max="100" v-bind:value="accuracy"></progress></div>
    </div>
    <div class="typeKeyboardBox">
      <KeyboardLayout0 v-if="kbdLayout===0 && language === 0" :keyToPress="nowCode" :isShift="nowShift"/>
      <KeyboardLayout1 v-if="kbdLayout===1 && language === 0" :keyToPress="nowCode" :isShift="nowShift"/>
      <KeyboardLayout2 v-if="kbdLayout===2 && language === 0" :keyToPress="nowCode" :isShift="nowShift"/>
      <KeyboardLayout3 v-if="kbdLayout===0 && language === 1" :keyToPress="nowCode" :isShift="nowShift"/>
      <KeyboardLayout4 v-if="kbdLayout===1 && language === 1" :keyToPress="nowCode" :isShift="nowShift"/>
      <!-- <KeyboardLayout5 v-if="kbdLayout===0 && language === 2" :keyToPress="nowCode" :isShift="nowShift"/> -->
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import keysData from '@/assets/keyPracticeData.json'
import KeyboardLayout0 from './keyboardDubeol.vue'
import KeyboardLayout1 from './keyboardSebeol.vue'
import KeyboardLayout2 from './keyboardSebeolLast.vue'
import KeyboardLayout3 from './keyboardQwerty.vue'
import KeyboardLayout4 from './keyboardDvorak.vue'
import KeyboardLayout5 from './keyboardKana.vue'
export default {
  components: { KeyboardLayout0, KeyboardLayout1, KeyboardLayout2, KeyboardLayout3, KeyboardLayout4, KeyboardLayout5 },
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
      language: -1,
      kbdLayout: -1,
      prev1: '',
      prev2: '',
      now: '',
      nowErr: '',
      next1: '',
      next2: '',
      nowCode: '',
      nextCode1: '',
      nextCode2: '',
      nowShift: '',
      nextShift1: '',
      nextShift2: '',
      passed: 0,
      maxkeys: 100,
      passPerMax: 0,
      failed: 0,
      accuracy: 100, // 정확도
      timerIntervalVar: '', // 타이머 함수용 변수
      sec: 0, // 경과 시간 - 초
      min: 0, // 경과 시간 - 분
      secDisplay: '00' // 표출용 변수
    }
  },
  methods: {
    initialSetting: function () { // 초기화 메소드
      ipcRenderer.invoke('getStoreValue', 'keyMax').then((result) => { // 최대 키 설정 가져오기
        this.maxkeys = result
      })
      ipcRenderer.invoke('getStoreValue', 'language').then((result0) => { // 언어 설정 가져오기
        this.language = (result0 === 'KO') ? 0 : (result0 === 'EN') ? 1 : 2 // 언어 종류 정수로 변환
        ipcRenderer.invoke('getStoreValue', 'keyboard').then((result) => { // 키보드 레이아웃 설정 가져오기
          this.kbdLayout = result
          var allkeys = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData.length
          })
          var keysCount = allkeys
          var x = Math.floor(Math.random() * (keysCount))
          var key1 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyName
          })
          var code1 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyCode
          })
          var shift1 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyShift
          })
          x = Math.floor(Math.random() * (keysCount))
          var key2 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyName
          })
          var code2 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyCode
          })
          var shift2 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyShift
          })
          x = Math.floor(Math.random() * (keysCount))
          var key3 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyName
          })
          var code3 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyCode
          })
          var shift3 = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyShift
          }) // 이 뭉탱이는 좀 비효율적인 것 같은데 나중에 손보는걸로
          this.now = key1[0]
          this.next1 = key2[0]
          this.next2 = key3[0]
          this.nowCode = code1[0]
          this.nextCode1 = code2[0]
          this.nextCode2 = code3[0]
          this.nowShift = shift1[0]
          this.nextShift1 = shift2[0]
          this.nextShift2 = shift3[0]
        })
      })
    },
    keyPressed: function (ev) {
      if (ev.key === 'Shift' || ev.key === 'Enter' || ev.key === 'CapsLock' || ev.key === 'Alt' || ev.key === 'Control' || ev.key === 'Meta' || ev.code === 'Space' || ev.code === 'Tab') {
        // 실수할 수 있는 시스템키 거름망
      } else { // 키 누름 판정
        if (this.nowCode === ev.code && this.nowShift === ev.shiftKey) {
          this.passed = this.passed + 1 // 진행도 1 올림
          this.nowErr = ''
          if (this.passed === this.maxkeys) {
            this.$router.push('/key-practice/end?acr=' + this.accuracy + '&title=' + this.title + '&lvl=' + this.level + '&time=' + this.min + ':' + this.secDisplay)
          }
          var allkeys = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData.length
          })
          var keysCount = allkeys
          var x = Math.floor(Math.random() * (keysCount))
          var nextKey = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyName
          })
          var nextCode = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyCode
          })
          var nextShift = keysData.keys.map((item) => {
            return item.keyLang[this.language].keyType[this.kbdLayout].keyLevel[this.level].keyData[x].keyShift
          })

          this.prev2 = this.prev1
          this.prev1 = this.now
          this.now = this.next1
          this.next1 = this.next2
          this.next2 = nextKey[0]

          this.nowCode = this.nextCode1
          this.nextCode1 = this.nextCode2
          this.nextCode2 = nextCode[0]

          this.nowShift = this.nextShift1
          this.nextShift1 = this.nextShift2
          this.nextShift2 = nextShift[0]

          this.passPerMax = this.passed * 100 / this.maxkeys
        } else {
          ipcRenderer.invoke('getStoreValue', 'cud').then((result) => { // CUD
            result ? this.nowErr = 'red underline' : this.nowErr = 'red'
          })
          this.failed = this.failed + 1
          this.accuracy = (100 - this.failed * 100 / this.maxkeys).toFixed(0)
        }
      }
    }
  },
  beforeMount () {
    this.initialSetting()
  },
  mounted () {
    window.addEventListener('keyup', this.keyPressed, true)
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
    window.removeEventListener('keyup', this.keyPressed, true)
    clearInterval(this.timerIntervalVar)
  }
}
</script>
<style scoped>
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
.typeAnswerBox{
  margin-top:20px;
  font-family: "NotoSansLight";
  display: flex;
  justify-content: center;
}
.typeAnswerBox>div{
  text-align: center;
  width:300px;
  font-size: 5.5vw;
}
#prev1,#prev2{
  color: lightgray;
}
.nowCursor{
  border-left: 2px solid black;
  border-right: 2px solid black;
  font-family: "NotoSansRegular";
}
.red{
  color:red;
}
.underline{
  color:white;
  background: black;
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
  margin-top: 40px;
}
@media (prefers-color-scheme: dark) {
  span, p{color:#eee}
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
  #prev1,#prev2{color: #444;}
  .nowCursor{color:#eee;border-left: 2px solid #eee;border-right: 2px solid #eee;}
  #next1,#next2{color: #777;}
  progress{border: 1px solid #eee;}
  progress::-webkit-progress-value {background: #eee;}
}
</style>