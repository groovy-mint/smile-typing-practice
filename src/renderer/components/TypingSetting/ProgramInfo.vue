<template>
  <div id="typeWrapper">
    <p class="mainMenuTitle"><router-link ondragstart="return false" to="/typing-setting"><img src="~@/assets/back.svg" alt="Back"></router-link>환경설정</p><p class="subMenuTitle">정보</p>
    <h3>스마일 타자연습 프로그램 버전</h3>
    <span>1.0.2</span>
    <h3>서포트</h3>
    <span>Smile Creative Lab.・2021<br>support@ntws.kr<br>http://sclab.ntws.kr</span>
    <h3>단어 자료 출처 및 라이센스</h3>
      <br><span>한국어 단어</span>
      <li>표준어: 표준국어대사전 (CC BY-SA 2.0 https://creativecommons.org/licenses/by-sa/2.0/kr/)<br>https://stdict.korean.go.kr/ 누리집 일부 발췌 - 2021.7.27</li>
      <li>경상도 사투리: 위키낱말사전 (CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/deed.ko)<br>분류:한국어 경상도 사투리 문서 및 하위문서 일부 발췌 - 2021.7.28</li>
      <li>끄투 한방단어: 끄코위키 (CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/)<br>한방단어/한국어 하위문서 일부 발췌 - 2021.7.30</li>
      <br><span>한국어 문장</span>
      <li>속담: 리브레위키 (CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/) 속담/목록 하위문서 일부 발췌 - 2021.8.7</li>
      <li>끄투 긴 단어: 끄코위키 (CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/)<br>긴 단어/한국어/ㄱ 문서 일부 발췌 - 2021.7.30</li>
      <li>필적확인란: 티스토리 규장각 (CC BY 4.0 https://creativecommons.org/licenses/by/4.0/deed.ko) https://john0075.tistory.com/26 글 일부 발췌 - 2021.8.27</li>
      <br><span>영어 문장</span>
      <li>속담: 티스토리 샬롱한 영어와 일상 (CC BY 4.0 https://creativecommons.org/licenses/by/4.0/deed.ko) https://simplelife77.tistory.com/436 글 일부 발췌 - 2021.8.27</li>
      <br><span>오픈소스 명시</span>
      <li>NPM 모듈 라이센스: https://sclab.ntws.kr/smile_typing/licenses.html 참조</li>
    <h3>소프트웨어 라이센스</h3>
<span>
    The MIT License<br><br>
    Copyright (c) 2021 Heejin An<br><br>
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:<br><br>
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.<br><br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.<br><br>
</span>
  </div>
</template>
<script>

export default {

}
</script>
<style>
#typeWrapper{
  margin:0 30px
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
@media (prefers-color-scheme: dark) {
  b, span, p, input, h3, li{color:#eee}
  .mainMenuTitle img{filter: invert(100%);}
  .mainMenuTitle a:hover img{background:#bbb}
}
</style>