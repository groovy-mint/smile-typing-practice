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
  name: 'typing-setting-menu',
  data () {
    return {
      lvlList: [
        { id: 0, title: '일반', route: '/typing-setting/1' },
        { id: 1, title: '기록', route: '/typing-setting/2' },
        { id: 1, title: '정보', route: '/typing-setting/3' },
        { id: 2, title: '뒤로', route: '*' }
      ]
    }
  }
}
</script>

<style>
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
li a{
  cursor: pointer;
  text-decoration: none;
  color:#000;
}
</style>
