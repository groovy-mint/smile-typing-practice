<template>
    <div id="keyboardWrapper">
      <div class="keyboardRow">
        <div class="key">`</div>
        <div class="key" ref="Digit1">1</div>
        <div class="key" ref="Digit2">2</div>
        <div class="key" ref="Digit3">3</div>
        <div class="key" ref="Digit4">4</div>
        <div class="key" ref="Digit5">5</div>
        <div class="key" ref="Digit6">6</div>
        <div class="key" ref="Digit7">7</div>
        <div class="key" ref="Digit8">8</div>
        <div class="key" ref="Digit9">9</div>
        <div class="key" ref="Digit0">0</div>
        <div class="key" ref="Minus">-</div>
        <div class="key" ref="Equal">+</div>
        <div class="key keyBs keyRight" v-if="isNotDarwin">Bksp</div>
        <div class="key keyBs keyRight" v-if="isDarwin">⌫</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyBs keyLeft" v-if="isNotDarwin">Tab</div>
        <div class="key keyBs keyLeft" v-if="isDarwin">⇥</div>
        <div class="key" ref="KeyQ">ㅂ</div>
        <div class="key" ref="KeyW">ㅈ</div>
        <div class="key" ref="KeyE">ㄷ</div>
        <div class="key" ref="KeyR">ㄱ</div>
        <div class="key" ref="KeyT">ㅅ</div>
        <div class="key" ref="KeyY">ㅛ</div>
        <div class="key" ref="KeyU">ㅕ</div>
        <div class="key" ref="KeyI">ㅑ</div>
        <div class="key" ref="KeyO">ㅐ</div>
        <div class="key" ref="KeyP">ㅔ</div>
        <div class="key">[</div>
        <div class="key">]</div>
        <div class="key">\</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyEnt keyLeft" v-if="isNotDarwin">Caps</div>
        <div class="key keyEnt keyLeft" v-if="isDarwin">한/A</div>
        <div class="key keyFinger" ref="KeyA">ㅁ</div>
        <div class="key keyFinger" ref="KeyS">ㄴ</div>
        <div class="key keyFinger" ref="KeyD">ㅇ</div>
        <div class="key keyFinger" ref="KeyF">ㄹ</div>
        <div class="key" ref="KeyG">ㅎ</div>
        <div class="key" ref="KeyH">ㅗ</div>
        <div class="key keyFinger" ref="KeyJ">ㅓ</div>
        <div class="key keyFinger" ref="KeyK">ㅏ</div>
        <div class="key keyFinger" ref="KeyL">ㅣ</div>
        <div class="key keyFinger" ref="Semicolon">;</div>
        <div class="key" ref="Quote">'</div>
        <div class="key keyEnt keyRight" v-if="isNotDarwin">Enter</div>
        <div class="key keyEnt keyRight" v-if="isDarwin">↩</div>
      </div>
      <div class="keyboardRow">
        <div class="key keyShift keyLeft" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyLeft" v-if="isDarwin">⇧</div>
        <div class="key" ref="KeyZ">ㅋ</div>
        <div class="key" ref="KeyX">ㅌ</div>
        <div class="key" ref="KeyC">ㅊ</div>
        <div class="key" ref="KeyV">ㅍ</div>
        <div class="key" ref="KeyB">ㅠ</div>
        <div class="key" ref="KeyN">ㅜ</div>
        <div class="key" ref="KeyM">ㅡ</div>
        <div class="key" ref="Comma">,</div>
        <div class="key" ref="Period">.</div>
        <div class="key" ref="Slash">/</div>
        <div class="key keyShift keyRight" v-if="isNotDarwin">Shift</div>
        <div class="key keyShift keyRight" v-if="isDarwin">⇧</div>
      </div>
      <div class="keyboardRow" v-if="isNotDarwin">
        <div class="key">ctrl</div>
        <div class="key">◆</div>
        <div class="key">alt</div>
        <div class="key">漢</div>
        <div class="key keySpace keyFinger">Space</div>
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
        <div class="key keySpace keyFinger">␣</div>
        <div class="key">⌘</div>
        <div class="key">⌥</div>
        <div class="key">ㅤ</div>
        <div class="key">ㅤ</div>
        <div class="key">ㅤ</div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    keyToPress: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDarwin: process.platform === 'darwin',
      isNotDarwin: process.platform !== 'darwin',
      shoulderLeft: this.keyToPress,
      shoulderRight: ''
    }
  },
  methods: {
    keyboardFingerChange: function (k) {
      console.log(k + 'finger change')
      console.log(this.shoulderLeft)
      this.$refs.KeyA.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyS.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyD.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyF.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyJ.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyK.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.KeyL.style.background = 'rgba(102, 205, 171, 0.603)'
      this.$refs.Semicolon.style.background = 'rgba(102, 205, 171, 0.603)'
      switch (k) {
        case 'KeyA': case 'KeyS': case 'KeyD': case 'KeyF': case 'KeyJ': case 'KeyK': case 'KeyL': case 'Semicolon':
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyQ': case 'KeyZ':
          console.log('A key section')
          this.$refs.KeyA.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyW': case 'KeyX':
          console.log('S key section')
          this.$refs.KeyS.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyE': case 'KeyC':
          console.log('D key section')
          this.$refs.KeyD.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyR': case 'KeyV': case 'KeyT': case 'KeyG': case 'KeyB':
          console.log('F key section')
          this.$refs.KeyF.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyU': case 'KeyM': case 'KeyY': case 'KeyH': case 'KeyN':
          console.log('J key section')
          this.$refs.KeyJ.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyI': case 'Comma':
          console.log('K key section')
          this.$refs.KeyK.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'Period': case 'KeyO':
          console.log('L key section')
          this.$refs.KeyL.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        case 'KeyP': case 'Slash':
          console.log('; key section')
          this.$refs.Semicolon.style.background = 'none'
          this.$refs[k].style.background = 'lightpink'
          break
        default:
          console.log('none of any section')
      }
    },
    keyboardInitSet: function (key) {
      this.keyboardFingerChange(key)
    },
    keyboardPressed: function (key) {
      console.log('next order: ' + this.keyToPress + ', ' + key.code + ' pressed')
      this.shoulderLeft = this.keyToPress

      setTimeout(() => this.keyboardFingerChange(this.keyToPress), 1)
      this.shoulderRight = this.shoulderLeft
      if (this.shoulderLeft === 'KeyA' || this.shoulderLeft === 'KeyS' || this.shoulderLeft === 'KeyD' || this.shoulderLeft === 'KeyF' || this.shoulderLeft === 'KeyJ' || this.shoulderLeft === 'KeyK' || this.shoulderLeft === 'KeyL' || this.shoulderLeft === 'Semicolon') {
      } else {
        var b = this.shoulderRight
        this.$refs[b].style.background = 'none'
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
    console.log('beforedestroy')
    window.removeEventListener('keyup', this.keyboardPressed, true)
  }
}
</script>
<style>
.keyboardRow { text-align:center;font-size: 1em;}
.key {width:25px;height:25px; padding:10px 10px; display:inline-block; border:1px solid gray;margin-bottom:5px;border-radius: 5px; }
.keyBs {width:55px} .keyEnt {width:65px} .keyShift {width:90px} .keyLeft {text-align: left;} .keyRight {text-align: right;} .keySpace {width: 256px;}
.keyEnable{background: lightpink;} .keyFinger{background: rgba(102, 205, 171, 0.603);}
</style>