<template>
    <div id="keyboardWrapper">
      <div class="keyboardRow">
        <div class="key"><div>半角</div><div>全角</div></div>
        <div class="key" ref="Digit1"><div>ぬ</div></div>
        <div class="key" ref="Digit2"><div>ふ</div></div>
        <div class="key" ref="Digit3"><div>ぁ</div><div>あ</div></div>
        <div class="key" ref="Digit4"><div>ぅ</div><div>う</div></div>
        <div class="key" ref="Digit5"><div>ぇ</div><div>え</div></div>
        <div class="key" ref="Digit6"><div>ぉ</div><div>お</div></div>
        <div class="key" ref="Digit7"><div>ゃ</div><div>や</div></div>
        <div class="key" ref="Digit8"><div>ゅ</div><div>ゆ</div></div>
        <div class="key" ref="Digit9"><div>ょ</div><div>よ</div></div>
        <div class="key" ref="Digit0"><div>を</div><div>わ</div></div>
        <div class="key" ref="Minus"><div>ほ</div></div>
        <div class="key" ref="Equal"><div>「</div><div>゜</div></div>
        <div class="key keyBs keyRight" v-if="isNotDarwin">Bksp</div>
        <div class="key keyBs keyRight" v-if="isDarwin">⌫</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyBs keyLeft" v-if="isNotDarwin">Tab</div>
        <div class="key keyBs keyLeft" v-if="isDarwin">⇥</div>
        <div class="key" ref="KeyQ"><div>た</div></div>
        <div class="key" ref="KeyW"><div>て</div></div>
        <div class="key" ref="KeyE"><div>い</div></div>
        <div class="key" ref="KeyR"><div>す</div></div>
        <div class="key" ref="KeyT"><div>か</div></div>
        <div class="key" ref="KeyY"><div>ん</div></div>
        <div class="key" ref="KeyU"><div>な</div></div>
        <div class="key" ref="KeyI"><div>に</div></div>
        <div class="key" ref="KeyO"><div>ら</div></div>
        <div class="key" ref="KeyP"><div>せ</div></div>
        <div class="key"><div>」</div><div>゛</div></div>
        <div class="key"><div>ー</div><div>む</div></div>
        <div class="key"><div>へ</div></div>
      </div>
      <div class="keyboardRow">
        <div class="key keyEnt keyLeft" v-if="isNotDarwin">英数</div>
        <div class="key keyEnt keyLeft" v-if="isDarwin">⌃</div>
        <div class="key keyFinger" ref="KeyA"><div>ち</div></div>
        <div class="key keyFinger" ref="KeyS"><div>と</div></div>
        <div class="key keyFinger" ref="KeyD"><div>し</div></div>
        <div class="key keyFinger" ref="KeyF"><div>は</div></div>
        <div class="key" ref="KeyG"><div>き</div></div>
        <div class="key" ref="KeyH"><div>く</div></div>
        <div class="key keyFinger" ref="KeyJ"><div>ま</div></div>
        <div class="key keyFinger" ref="KeyK"><div>の</div></div>
        <div class="key keyFinger" ref="KeyL"><div>り</div></div>
        <div class="key keyFinger" ref="Semicolon"><div>れ</div></div>
        <div class="key" ref="Quote"><div>け</div></div>
        <div class="key keyEnt keyRight" v-if="isNotDarwin">Enter</div>
        <div class="key keyEnt keyRight" v-if="isDarwin">↩</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyShift keyLeft" ref="shiftLeft" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyLeft" ref="shiftLeft" v-if="isDarwin">⇧</div>
        <div class="key" ref="KeyZ"><div>っ</div><div>つ</div></div>
        <div class="key" ref="KeyX"><div>さ</div></div>
        <div class="key" ref="KeyC"><div>そ</div></div>
        <div class="key" ref="KeyV"><div>ひ</div></div>
        <div class="key" ref="KeyB"><div>こ</div></div>
        <div class="key" ref="KeyN"><div>み</div></div>
        <div class="key" ref="KeyM"><div>も</div></div>
        <div class="key" ref="Comma"><div>ね</div></div>
        <div class="key" ref="Period"><div>る</div></div>
        <div class="key" ref="Slash"><div>め</div></div>
        <div class="key keyShift keyRight" ref="shiftRight" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyRight" ref="shiftRight" v-if="isDarwin">⇧</div>
      </div>
      <div class="keyboardRow" v-if="isNotDarwin">
        <div class="key">ctrl</div>
        <div class="key">◆</div>
        <div class="key">alt</div>
        <div class="key">無変換</div>
        <div class="key keySpace keyFinger" ref="Space">Space</div>
        <div class="key">変換</div>
        <div class="key">かな</div>
        <div class="key">alt</div>
        <div class="key">☰</div>
        <div class="key">ctrl</div>
      </div>
      <div class="keyboardRow" v-if="isDarwin">
        <div class="key">⇪</div>
        <div class="key">⌥</div>
        <div class="key">⌘</div>
        <div class="key">変換</div>
        <div class="key keySpace keyFinger" ref="Space">␣</div>
        <div class="key">かな</div>
        <div class="key">⌘</div>
        <div class="key">fn</div>
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
      // console.log(this.shoulderLeft)
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
          case 'KeyR': case 'KeyV': case 'KeyT': case 'KeyG': case 'KeyB': case 'Digit5':
            // console.log('F key section')
            this.$refs.KeyF.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = true
            break
          case 'KeyU': case 'KeyM': case 'KeyY': case 'KeyH': case 'KeyN': case 'Digit6': case 'Digit7': case 'Digit8':
            // console.log('J key section')
            this.$refs.KeyJ.style.background = 'none'
            this.$refs[k].style.background = pressFeedback
            this.shiftLocation = false
            break
          case 'KeyI': case 'Comma': case 'Digit9':
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
      // console.log(this.shoulderLeft + 'asdfasdf')
      // console.log('next order: ' + this.keyToPress + ', ' + key.code + ' pressed')

      setTimeout(() => this.keyboardFingerChange(this.keyToPress), 1)
      if (this.shoulderLeft === 'KeyA' || this.shoulderLeft === 'KeyS' || this.shoulderLeft === 'KeyD' || this.shoulderLeft === 'KeyF' || this.shoulderLeft === 'KeyJ' || this.shoulderLeft === 'KeyK' || this.shoulderLeft === 'KeyL' || this.shoulderLeft === 'Semicolon') {
      } else {
        var b = this.shoulderLeft
        this.$refs[b].style.background = 'none'
        this.shoulderLeft = this.keyToPress
      }
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
.key {min-width:25px;min-height:45px;max-height:35px;padding:0 10px;display:inline-block; border:1px solid gray;margin-bottom:5px;border-radius: 5px;display: flex;flex-direction: column;justify-content: center;line-height: 20px;}
.keyBs {width:55px} .keyEnt {width:65px} .keyShift {width:90px} .keyLeft {text-align: left;} .keyRight {text-align: right;} .keySpace {width: 256px;}
.keyEnable{background: #ff555590;} .keyFinger{background: rgba(102, 205, 171, 0.603);}
@media (prefers-color-scheme: dark) {
  .key{color:#eee; border:1px solid #777}
}
</style>