<template>
  <div id="subMenuWrapper">
    <ol>
      <li v-for="item in lvlList" v-bind:lvl="item" v-bind:key="item.id">
        <span><router-link ondragstart="return false" class="menuItem" v-bind:to="item.route">{{ item.title }}</router-link></span>
      </li>
    </ol>
  </div>
</template>

<script>
export default{
  name: 'key-practice-menu',
  data () {
    return {
      lvlList: [
        { id: 0, title: '애국가', route: '/article-practice/start?lvl=0&title=애국가' },
        { id: 1, title: '별 헤는 밤', route: '/article-practice/start?lvl=1&title=별 헤는 밤' },
        { id: 2, title: '서시', route: '/article-practice/start?lvl=2&title=서시' },
        // { id: 3, title: '쉽게 쓰여진 시', route: '/article-practice/start?lvl=3&title=쉽게 쓰여진 시' },
        // { id: 4, title: '동백꽃', route: '/article-practice/start?lvl=4&title=동백꽃' },
        { id: 5, title: '님의 침묵', route: '/article-practice/start?lvl=5&title=님의 침묵' },
        // { id: 6, title: '대한민국 헌법', route: '/article-practice/start?lvl=6&title=대한민국 헌법' },
        { id: 7, title: '뒤로', route: '*' }
      ]
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "NotoSansLight";
  src: local("NotoSansLight"),
   url("~@/assets/NotoSansCJKkr-Light.otf") format("opentype");
}
#subMenuWrapper{
    height: 58vw;
    overflow-x: auto;
    padding-right: 15px;
}
#subMenuWrapper ol{
  font-family: "NotoSansLight";
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  list-style: none;
  margin-left: 25px;
  margin-top: 6px;
  padding-left: 0;
  }
#subMenuWrapper li{
  display: inline-block;
  position: relative;
  font-size:2em;
  margin:12px 0;
  }

.menuItem:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  transform-origin: bottom left;
  transition: transform 0.25s ease-out;
}
.menuItem:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.menuItem{
  cursor: pointer;
  text-decoration: none;
  color:#000;
}
</style>
