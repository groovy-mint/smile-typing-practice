<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="/typing-setting"><img src="~@/assets/back.svg" alt="Back"></router-link>환경설정</p><p class="subMenuTitle">일반</p>
    <div class="settingBox">
      <div class="settingCon">
        <div>
          <b>언어</b><br><span>손에 익힐 자판의 언어를 선택합니다.</span><br>
        </div>
        <div>
          <a ref="langKO" @click="langSet('KO')">한국어</a>
          <a ref="langEN" @click="langSet('EN')">English</a>
          <!-- <a ref="langJA" @click="langSet('JA')">日本語</a> -->
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>자판 배열</b><br><span>자판 배열은 자리 연습에만 적용되며, 나머지는 사용자의 입력기를 따릅니다.</span><br>
        </div>
        <div>
          <a v-if="language === 'KO'" ref="key0" @click="keyboardSet(0)">두벌식</a>
          <a v-if="language === 'KO'" ref="key1" @click="keyboardSet(1)">세벌식 3-90</a>
          <a v-if="language === 'KO'" ref="key2" @click="keyboardSet(2)">세벌식 3-91</a>
          <a v-if="language === 'EN'" ref="key0" @click="keyboardSet(0)">QWERTY</a>
          <a v-if="language === 'EN'" ref="key1" @click="keyboardSet(1)">DVORAK</a>
          <a v-if="language === 'EN'" ref="key2" @click="keyboardSet(2)"></a>
          <!-- <a v-if="language === 'JA'" ref="key0" @click="keyboardSet(0)">かな</a>
          <a v-if="language === 'JA'" ref="key1" @click="keyboardSet(1)"></a>
          <a v-if="language === 'JA'" ref="key2" @click="keyboardSet(2)"></a> -->
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>CUD (색각 이상자용 옵션)</b><br><span>오타를 검정 바탕에 하얀색으로 표시하고, 자리 연습 키보드를 회색조로 바꿉니다.</span><br>
        </div>
        <div>
          <a ref="cudtrue" @click="cudSet(true)">켜기</a>
          <a ref="cudfalse" @click="cudSet(false)">끄기</a>
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>자리 연습 최대 개수</b><br><span>자리를 얼마나 연습할지 정합니다. (1~999)</span><br>
        </div>
        <div>
          <input ref="keyMax" type="number" step="10" min="0" max="999" :value="keyMax" class="activated textinput">
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>단어 연습 최대 개수</b><br><span>단어를 얼마나 연습할지 정합니다. (1~999)</span><br>
        </div>
        <div>
          <input ref="wordMax" type="number" step="10" min="0" max="999" :value="wordMax" class="activated textinput">
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>단어 정렬</b><br><span>단어를 가운데로 정렬할지, 왼쪽으로 정렬할지 정합니다.</span><br>
        </div>
        <div>
          <a ref="wordtrue" @click="wordCenterSet(true)">가운데</a>
          <a ref="wordfalse" @click="wordCenterSet(false)">왼쪽</a>
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>문장 연습 최대 개수</b><br><span>문장을 얼마나 연습할지 정합니다. (1~999)</span><br>
        </div>
        <div>
          <input ref="sentenceMax" type="number" step="10" min="0" max="999" :value="sentenceMax" class="activated textinput">
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>기록 초기화</b><br>
        </div>
        <div>
          <a @click="settingReset(0)">초기화</a>
        </div>
      </div>
      <div class="settingCon">
        <div>
          <b>설정 초기화</b><br>
        </div>
        <div>
          <a @click="settingReset(0)">초기화</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {

  data () {
    return {
      language: '',
      keyboard: '',
      cud: false,
      keyMax: 0,
      wordMax: 0,
      wordCenter: true,
      sentenceMax: 0
    }
  },
  methods: {
    settingRender: function () { // 초기화 - 설정 값 불러와서 적용
      this.$refs.langKO.style = ''
      this.$refs.langEN.style = ''
      // this.$refs.langJA.style = ''
      if (this.language !== '') {
        this.$refs.key0.style = ''
        this.$refs.key1.style = ''
        this.$refs.key2.style = ''
      }
      this.$refs.cudtrue.style = ''
      this.$refs.cudfalse.style = ''
      this.$refs.wordtrue.style = ''
      this.$refs.wordfalse.style = '' // 각 버튼에 볼드 처리 초기화
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      var darklight
      isDark ? darklight = '#eee' : darklight = 'black' // 다크모드 여부에 따라 글자의 색깔을 변경
      ipcRenderer.invoke('getStoreValue', 'language').then((result) => { // 언어 설정 가져와서 버튼 강조처리
        this.language = result
        this.$refs['lang' + result].style.cursor = 'default'
        this.$refs['lang' + result].style.color = darklight
        this.$refs['lang' + result].style.textDecoration = 'underline'
      })
      ipcRenderer.invoke('getStoreValue', 'keyboard').then((result) => { // 키보드 배열 설정 가져와서 버튼 강조처리
        this.keyboard = result
        this.$refs['key' + result].style.cursor = 'default'
        this.$refs['key' + result].style.color = darklight
        this.$refs['key' + result].style.textDecoration = 'underline'
      })
      ipcRenderer.invoke('getStoreValue', 'cud').then((result) => { // CUD 설정 가져와서 버튼 강조처리
        this.cud = result
        this.$refs['cud' + result].style.cursor = 'default'
        this.$refs['cud' + result].style.color = darklight
        this.$refs['cud' + result].style.textDecoration = 'underline'
      })
      ipcRenderer.invoke('getStoreValue', 'keyMax').then((result) => { // 최대 키 개수 가져와서 입력칸에 삽입
        this.keyMax = result
      })
      ipcRenderer.invoke('getStoreValue', 'wordMax').then((result) => { // 최대 단어 개수 가져와서 입력칸에 삽입
        this.wordMax = result
      })
      ipcRenderer.invoke('getStoreValue', 'wordCenter').then((result) => { // 단어 가운데 정렬 설정 가져와서 버튼 강조처리
        this.wordCenter = result
        this.$refs['word' + result].style.cursor = 'default'
        this.$refs['word' + result].style.color = darklight
        this.$refs['word' + result].style.textDecoration = 'underline'
      })
      ipcRenderer.invoke('getStoreValue', 'sentenceMax').then((result) => { // 최대 문장 개수 가져와서 입력칸에 삽입
        this.sentenceMax = result
      })
    },
    langSet: function (lang) {
      ipcRenderer.invoke('setStoreValue', 'language', lang)
      ipcRenderer.invoke('setStoreValue', 'keyboard', 0)
      this.keyMaxSet()
      this.wordMaxSet()
      this.sentenceMaxSet()
      this.settingRender()
    },
    keyboardSet: function (k) {
      ipcRenderer.invoke('setStoreValue', 'keyboard', k)
      this.keyMaxSet()
      this.wordMaxSet()
      this.sentenceMaxSet()
      this.settingRender()
    },
    cudSet: function (bool) {
      ipcRenderer.invoke('setStoreValue', 'cud', bool)
      this.keyMaxSet()
      this.wordMaxSet()
      this.sentenceMaxSet()
      this.settingRender()
    },
    keyMaxSet: function () {
      var num = this.$refs.keyMax.value
      if (isNaN(num) || num <= 0 || num > 999) {
        num = this.keyMax
      }
      num = parseInt(num)
      ipcRenderer.invoke('setStoreValue', 'keyMax', num)
    },
    wordMaxSet: function () {
      var num = this.$refs.wordMax.value
      if (isNaN(num) || num <= 0 || num > 999) {
        num = this.wordMax
      }
      num = parseInt(num)
      ipcRenderer.invoke('setStoreValue', 'wordMax', num)
    },
    wordCenterSet: function (bool) {
      ipcRenderer.invoke('setStoreValue', 'wordCenter', bool)
      this.keyMaxSet()
      this.wordMaxSet()
      this.sentenceMaxSet()
      this.settingRender()
    },
    sentenceMaxSet: function () {
      var num = this.$refs.sentenceMax.value
      if (isNaN(num) || num <= 0 || num > 999) {
        num = this.sentenceMax
      }
      num = parseInt(num)
      ipcRenderer.invoke('setStoreValue', 'sentenceMax', num)
    }
  },
  mounted () {
    this.settingRender()
  },
  beforeDestroy () {
    this.keyMaxSet()
    this.wordMaxSet()
    this.sentenceMaxSet()
  }
}
</script>
<style>
input:focus {outline:none;}
a{
  cursor: pointer;
}
#typeWrapper{
  margin-left:30px
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
.settingBox{
  padding-bottom:30px;
}
.settingCon{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 10px;
  border-bottom: 1px solid black;
}
.settingCon:last-child{
  border-bottom: 0px;
}
.settingCon div:last-child a{
  color: #999;
  transition: all 0.15s;
}
.settingCon div:last-child a:hover{
  color: black
}
.activated{
  cursor: default;
  color: black !important;
  text-decoration: underline;
}
.textinput{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-family: "NotoSansRegular";
  background: none;
  border: none;
  width: 3em;
  font-size: 1em;
  text-align: right;
  padding: 0;
}
b{
  font-size: 1.2em;
}
@media (prefers-color-scheme: dark) {
  b, span, p, input{color:#eee}
  .settingCon{border-bottom: 1px solid #eee;}
  .settingCon div:last-child a:hover{color: #eee}
  .activated{color: #eee !important;}
}
</style>