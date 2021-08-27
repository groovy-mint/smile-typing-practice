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
import { ipcRenderer } from 'electron'
import articlesData from '@/assets/articlePracticeData.json'
export default{
  name: 'key-practice-menu',
  data () {
    return {
      lvlList: [
        // { id: 4, title: '동백꽃', route: '/article-practice/start?lvl=4&title=동백꽃' },
        // { id: 7, title: '사용자 정의', route: '*' },
        { id: 99, title: '뒤로', route: '*' }
      ]
    }
  },
  methods: {
    initialSetting: function () {
      ipcRenderer.invoke('getStoreValue', 'language').then((result) => { // 언어 설정 가져오기
        console.log(result)
        var language = (result === 'KO') ? 0 : (result === 'EN') ? 1 : 2 // 언어 종류 정수로 변환
        var menuLeng = articlesData.articles.map((item) => {
          return item.articleLang[language].articleLevel.length
        })
        for (var i = 0; i < menuLeng; ++i) {
          var menuName = articlesData.articles.map((item) => {
            return item.articleLang[language].articleLevel[i].articleLevelName
          })
          this.lvlList.splice(i, 0, { id: i, title: menuName[0], route: '/article-practice/start?lvl=' + i + '&title=' + menuName[0] })
        }
      })
    }
  },
  beforeMount () {
    this.initialSetting()
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
@media (prefers-color-scheme: dark) {
  .menuItem:after {background-color: #eee;}
  li a{color:#eee}
  .menuItem{color:#eee;}
}
</style>
