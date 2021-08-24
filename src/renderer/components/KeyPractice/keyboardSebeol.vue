<template>
    <div id="keyboardWrapper">
      <div class="keyboardRow">
        <div class="key"><div>~</div><div>`</div></div>
        <div class="key" ref="Digit1"><div>ᆽ</div><div>ㅎ</div></div>
        <div class="key" ref="Digit2"><div>@</div><div>ㅆ</div></div>
        <div class="key" ref="Digit3"><div>#</div><div>ㅂ</div></div>
        <div class="key" ref="Digit4"><div>$</div><div>ㅛ</div></div>
        <div class="key" ref="Digit5"><div>%</div><div>ㅠ</div></div>
        <div class="key" ref="Digit6"><div>^</div><div>ㅑ</div></div>
        <div class="key" ref="Digit7"><div>&</div><div>ㅖ</div></div>
        <div class="key" ref="Digit8"><div>*</div><div>ㅢ</div></div>
        <div class="key" ref="Digit9"><div>(</div><div>ㅜ</div></div>
        <div class="key" ref="Digit0"><div>)</div><div>ㅋ</div></div>
        <div class="key" ref="Minus"><div>_</div><div>-</div></div>
        <div class="key" ref="Equal"><div>+</div><div>=</div></div>
        <div class="key keyBs keyRight" v-if="isNotDarwin">Bksp</div>
        <div class="key keyBs keyRight" v-if="isDarwin">⌫</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyBs keyLeft" v-if="isNotDarwin">Tab</div>
        <div class="key keyBs keyLeft" v-if="isDarwin">⇥</div>
        <div class="key" ref="KeyQ"><div>ᇁ</div><div>ᆺ</div></div>
        <div class="key" ref="KeyW"><div>ᇀ</div><div>ᆯ</div></div>
        <div class="key" ref="KeyE"><div>ᆿ</div><div>ㅕ</div></div>
        <div class="key" ref="KeyR"><div>ㅒ</div><div>ㅐ</div></div>
        <div class="key" ref="KeyT"><div>;</div><div>ㅓ</div></div>
        <div class="key" ref="KeyY"><div>&lt;</div><div>ㄹ</div></div>
        <div class="key" ref="KeyU"><div>7</div><div>ㄷ</div></div>
        <div class="key" ref="KeyI"><div>8</div><div>ㅁ</div></div>
        <div class="key" ref="KeyO"><div>9</div><div>ㅊ</div></div>
        <div class="key" ref="KeyP"><div>></div><div>ㅍ</div></div>
        <div class="key"><div>{</div><div>[</div></div>
        <div class="key"><div>}</div><div>]</div></div>
        <div class="key"><div>|</div><div>\</div></div>
      </div>
      <div class="keyboardRow">
        <div class="key keyEnt keyLeft" v-if="isNotDarwin">Caps</div>
        <div class="key keyEnt keyLeft" v-if="isDarwin">한/A</div>
        <div class="key keyFinger" ref="KeyA"><div>ᆮ</div><div>ᆼ</div></div>
        <div class="key keyFinger" ref="KeyS"><div>ᆭ</div><div>ᆫ</div></div>
        <div class="key keyFinger" ref="KeyD"><div>ᆰ</div><div>ㅣ</div></div>
        <div class="key keyFinger" ref="KeyF"><div>ᆩ</div><div>ㅏ</div></div>
        <div class="key" ref="KeyG"><div>/</div><div>ㅡ</div></div>
        <div class="key" ref="KeyH"><div>'</div><div>ㄴ</div></div>
        <div class="key keyFinger" ref="KeyJ"><div>4</div><div>ㅇ</div></div>
        <div class="key keyFinger" ref="KeyK"><div>5</div><div>ㄱ</div></div>
        <div class="key keyFinger" ref="KeyL"><div>6</div><div>ㅈ</div></div>
        <div class="key keyFinger" ref="Semicolon"><div>:</div><div>ㅂ</div></div>
        <div class="key" ref="Quote"><div>"</div><div>ㅌ</div></div>
        <div class="key keyEnt keyRight" v-if="isNotDarwin">Enter</div>
        <div class="key keyEnt keyRight" v-if="isDarwin">↩</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyShift keyLeft" ref="shiftLeft" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyLeft" ref="shiftLeft" v-if="isDarwin">⇧</div>
        <div class="key" ref="KeyZ"><div>ᆾ</div><div>ᆷ</div></div>
        <div class="key" ref="KeyX"><div>ᆹ</div><div>ᆨ</div></div>
        <div class="key" ref="KeyC"><div>ᆱ</div><div>ㅔ</div></div>
        <div class="key" ref="KeyV"><div>ᆶ</div><div>ㅗ</div></div>
        <div class="key" ref="KeyB"><div>!</div><div>ㅜ</div></div>
        <div class="key" ref="KeyN"><div>0</div><div>ㅅ</div></div>
        <div class="key" ref="KeyM"><div>1</div><div>ㅎ</div></div>
        <div class="key" ref="Comma"><div>2</div><div>,</div></div>
        <div class="key" ref="Period"><div>3</div><div>.</div></div>
        <div class="key" ref="Slash"><div>?</div><div>ㅗ</div></div>
        <div class="key keyShift keyRight" ref="shiftRight" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyRight" ref="shiftRight" v-if="isDarwin">⇧</div>
      </div>
      <div class="keyboardRow" v-if="isNotDarwin">
        <div class="key">ctrl</div>
        <div class="key">◆</div>
        <div class="key">alt</div>
        <div class="key">漢</div>
        <div class="key keySpace keyFinger" ref="Space">Space</div>
        <div class="key">한</div>
        <div class="key">alt</div>
        <div class="key">☰</div>
        <div class="key">ctrl</div>
        <div class="key">ㅤ</div>
      </div>
      <div class="keyboardRow" v-if="isDarwin">
        <div class="key">fn</div>
        <div class="key">⌃</div>
        <div class="key">⌥</div>
        <div class="key">⌘</div>
        <div class="key keySpace keyFinger" ref="Space">␣</div>
        <div class="key">⌘</div>
        <div class="key">⌥</div>
        <div class="key">ㅤ</div>
        <div class="key">ㅤ</div>
        <div class="key">ㅤ</div>
      </div>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  props: {
    keyToPress: {
      type: String,
      default: ''
    },
    isShift: {
      type: Boolean,
      default: ''
    }
  },
  data () {
    return {
      isDarwin: process.platform === 'darwin',
      isNotDarwin: process.platform !== 'darwin',
      shiftLocation: false, // 쉬프트의 위치 왼쪽이면 false
      shoulderLeft: this.keyToPress,
      shoulderRight: ''
    }
  },
  methods: {
    keyboardFingerChange: function (k) {
      // console.log(k + 'finger change')
      console.log(this.shoulderLeft)
      var pressFeedback = '#ff555590'
      var idleFeedback = 'rgba(102, 205, 171, 0.603)'
      ipcRenderer.invoke('getStoreValue', 'cud').then((result) => { // CUD
        if (result) {
          pressFeedback = 'gray'
          idleFeedback = 'darkgray'
        }
        this.$refs.shiftRight.style.background = 'none'
        this.$refs.shiftLeft.style.background = 'none'
        this.$refs.KeyA.style.background = idleFeedback
        this.$refs.KeyS.style.background = idleFeedback
        this.$refs.KeyD.style.background = idleFeedback
        this.$refs.KeyF.style.background = idleFeedback
        this.$refs.KeyJ.style.background = idleFeedback
        this.$refs.KeyK.style.background = idleFeedback
        this.$refs.KeyL.style.background = idleFeedback
        this.$refs.Semicolon.style.background = idleFeedback
        this.$refs.Space.style.background = idleFeedback
        switch (k) {
          case 'KeyA': case 'KeyS': case 'KeyD': case 'KeyF':
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyJ': case 'KeyK': case 'KeyL': case 'Semicolon':
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          case 'KeyQ': case 'KeyZ': case 'Digit1':
            // console.log('A key section')
            this.$refs.KeyA.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyW': case 'KeyX': case 'Digit2':
            // console.log('S key section')
            this.$refs.KeyS.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyE': case 'KeyC': case 'Digit3': case 'Digit4':
            // console.log('D key section')
            this.$refs.KeyD.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyR': case 'KeyV': case 'KeyT': case 'KeyG': case 'KeyB': case 'Digit5': case 'Digit6':
            // console.log('F key section')
            this.$refs.KeyF.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyU': case 'KeyM': case 'KeyY': case 'KeyH': case 'KeyN': case 'Digit7':
            // console.log('J key section')
            this.$refs.KeyJ.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          case 'KeyI': case 'Comma': case 'Digit9': case 'Digit8':
            // console.log('K key section')
            this.$refs.KeyK.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          case 'Period': case 'KeyO': case 'Digit0':
            // console.log('L key section')
            this.$refs.KeyL.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          case 'KeyP': case 'Slash': case 'Quote':
            // console.log('; key section')
            this.$refs.Semicolon.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          default:
            // console.log('none of any section')
            this.$refs.KeyA.style.background = 'none'
            this.$refs.KeyS.style.background = 'none'
            this.$refs.KeyD.style.background = 'none'
            this.$refs.KeyF.style.background = 'none'
            this.$refs.KeyJ.style.background = 'none'
            this.$refs.KeyK.style.background = 'none'
            this.$refs.KeyL.style.background = 'none'
            this.$refs.Semicolon.style.background = 'none'
            this.$refs.Space.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
        }
        if (this.isShift) {
          if (this.shiftLocation) {
            this.$refs.shiftRight.style.background = pressFeedback
            this.$refs.Semicolon.style.background = 'none'
          } else {
            this.$refs.shiftLeft.style.background = pressFeedback
            this.$refs.KeyA.style.background = 'none'
          }
        }
      })
    },
    keyboardInitSet: function (key) {
      this.keyboardFingerChange(key)
    },
    keyboardPressed: function (key) {
      console.log(this.shoulderLeft + 'asdfasdf')
      console.log('next order: ' + this.keyToPress + ', ' + key.code + ' pressed')

      setTimeout(() => this.keyboardFingerChange(this.keyToPress), 1)
      if (this.shoulderLeft === 'KeyA' || this.shoulderLeft === 'KeyS' || this.shoulderLeft === 'KeyD' || this.shoulderLeft === 'KeyF' || this.shoulderLeft === 'KeyJ' || this.shoulderLeft === 'KeyK' || this.shoulderLeft === 'KeyL' || this.shoulderLeft === 'Semicolon') {
      } else {
        var b = this.shoulderLeft
        this.$refs[b].style.background = 'none'
      }
      this.shoulderLeft = this.keyToPress
    }
  },
  mounted () {
    window.addEventListener('keyup', this.keyboardPressed, true)
    this.keyboardInitSet(this.keyToPress)
  },
  updated () {
    this.keyboardFingerChange(this.keyToPress)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyboardPressed, true)
  }
}
</script>
<style scoped>
#keyboardWrapper{display: flex;flex-direction: column;align-items: center;}
.keyboardRow {text-align: center;font-size: 1em;display: flex;width: 750px;justify-content: space-around;}
.key {min-width:25px;min-height:45px;max-height:35px;padding:0 10px;display:inline-block; border:1px solid gray;margin-bottom:5px;border-radius: 5px;display: flex;flex-direction: column;justify-content: center;}
.keyBs {width:55px} .keyEnt {width:65px} .keyShift {width:90px} .keyLeft {text-align: left;} .keyRight {text-align: right;} .keySpace {width: 256px;}
.keyEnable{background: #ff555590;} .keyFinger{background: rgba(102, 205, 171, 0.603);}
@media (prefers-color-scheme: dark) {
  .key{color:#eee; border:1px solid #777}
}
</style>