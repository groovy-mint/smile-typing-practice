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
        { id: 0, title: '1단계', route: '/key-practice/start?lvl=0&title=1단계' },
        { id: 1, title: '2단계', route: '/key-practice/start?lvl=1&title=2단계' },
        { id: 2, title: '3단계', route: '/key-practice/start?lvl=2&title=3단계' },
        { id: 3, title: '4단계', route: '/key-practice/start?lvl=3&title=4단계' },
        { id: 4, title: '5단계', route: '/key-practice/start?lvl=4&title=5단계' },
        { id: 5, title: '6단계', route: '/key-practice/start?lvl=5&title=6단계' },
        { id: 6, title: '뒤로', route: '*' }
      ]
    }
  }
}
</script>

<style>
@font-face {
  font-family: "NotoSansLight";
  src: local("NotoSansLight"),
   url("~@/assets/NotoSansCJKkr-Light.otf") format("opentype");
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
@media (prefers-color-scheme: dark) {
  .menuItem:after {background-color: #eee;}
  li a{color:#eee}
  .menuItem{color:#eee;}
}
</style>
