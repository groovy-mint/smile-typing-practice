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
        <div class="key">田</div>
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
  data () {
    return {
      isDarwin: process.platform === 'darwin',
      isNotDarwin: process.platform !== 'darwin'
    }
  }
}
</script>
<style>
.keyboardRow { text-align:center;font-size: 1em;}
.key {width:25px;height:25px; padding:10px 10px; display:inline-block; border:1px solid gray;margin-bottom:5px;border-radius: 5px; }
.keyBs {width:55px} .keyEnt {width:65px} .keyShift {width:90px} .keyLeft {text-align: left;} .keyRight {text-align: right;} .keySpace {width: 256px;}
.keyEnable{background: lightpink;} .keyFinger{background: rgba(102, 205, 171, 0.603);}
</style>