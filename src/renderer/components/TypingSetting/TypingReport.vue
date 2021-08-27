<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="/typing-setting"><img src="~@/assets/back.svg" alt="Back"></router-link>환경설정</p><p class="subMenuTitle">기록</p>
    <div class="category">
      <a @click="category = 0;importReport()">자리 연습</a>
      <a @click="category = 1;importReport()">단어 연습</a>
      <a @click="category = 2;importReport()">문장 연습</a>
      <a @click="category = 3;importReport()">긴 글 연습</a>
    </div>
    <div>
      <table style="width:100%">
        <tr>
          <th>번호</th>
          <th>종류</th>
          <th>정확도</th>		
          <th>타수</th>
          <th>경과시간</th>
        </tr>
        <tr v-for="item in report" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.accuracy }}%</td>
          <td>{{ item.typnum }}</td>
          <td>{{ item.time }}</td>
        </tr>
        </table>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      report: [],
      category: 2
    }
  },
  methods: {
    importReport: function () {
      var knd = this.category === 0 ? 'keyReports' : this.category === 1 ? 'wordReports' : this.category === 2 ? 'sentenceReports' : 'articleReports'
      ipcRenderer.invoke('getStoreValue', knd).then((result) => {
        this.report = result
      })
    }
  },
  beforeMount () {
    this.importReport()
  }
}
</script>
<style>
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
.category{
  margin:15px 0;
  display: flex;
  justify-content: space-around;
  font-size: 1.2em;
}
.category>a{
  color: gray;
  transition: all 0.15s;
}
.category>a:hover{
  color: #000;
}
table {
  table-layout: fixed;
  width: 100%;
}
td{
  text-align: center;
}
thead th:nth-child(1) {
  min-width: 20%;
  max-width: 20%;
}

thead th:nth-child(2) {
  min-width: 20%;
  max-width: 20%;
}

thead th:nth-child(3) {
  min-width: 20%;
  max-width: 20%;
}

thead th:nth-child(4) {
  min-width: 20%;
  max-width: 20%;
}
thead th:nth-child(5) {
  min-width: 20%;
  max-width: 20%;
}
@media (prefers-color-scheme: dark) {
  b, span, p, input, h3, li{color:#eee}
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
}
</style>