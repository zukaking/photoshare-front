<template>
  <header >
    
    <!-- ヘッダーロゴ -->
    <div class="nav_container" v-show="menue">
      <log-out/>
      <!-- ハンバーガーメニュー部分 -->
      <div class="nav">
      
      <!-- ハンバーガーメニューの表示・非表示を切り替えるチェックボックス -->
      <input id="drawer_input" class="drawer_hidden" type="checkbox">

      <!-- ハンバーガーアイコン -->
      <label for="drawer_input" class="drawer_open"><span></span></label>

      <!-- メニュー -->
      <nav class="nav_content">
        <ul class="nav_list">
          <li class="nav_item"><router-link class="nav_item_link" to="/">トップページ</router-link></li>
          <li class="nav_item"><router-link class="nav_item_link" to="/upload">file upload</router-link></li>
        </ul>
      </nav>
      </div>
    </div>
    <h1 class="title">Familiy Photo<span class="span">{{ subtitle }}</span></h1>    
  </header>
</template>

<script>

import LogOut from '@/components/organisms/LogOut.vue';
export default {
  name: 'HeaderView',
  data() {
    return{
      //menue: false
    }
  },
  props: {
    subtitle: {
      type: String,
    },
    menue: {
      type: Boolean,
      default: true
    }
},
  components: {
    LogOut
  },
}
</script>

<style scoped>

.nav_container {
  display: flex;
  justify-content: flex-end;;
  align-items: center;
  padding: 0 20px;
  background: #fff;
}

header h1 {
    font-family: cursive;
    text-align: center;
    padding: 8px; margin: 4px;
    border-top: 2px solid #909090;
    border-bottom: 2px solid #909090;
    font-size: 4em;
}

.title{
  font-size: 2em;
}

.span {
 text-align: right; 
 font-family: sans-serif;
 font-size: .5em;
}

.nav{
  display:flex;
}

.logo {
  font-size: 24px;
}

/* ここから下がハンバーガーメニューに関するCSS */
  
/* チェックボックスを非表示にする */
.drawer_hidden {
  display: none;
}

/* ハンバーガーアイコンの設置スペース */
.drawer_open {
  display: flex;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;/* 重なり順を一番上にする */
  cursor: pointer;
}

/* ハンバーガーメニューのアイコン */
.drawer_open span,
.drawer_open span:before,
.drawer_open span:after {
  content: '';
  display: block;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  background: #333;
  transition: 0.5s;
  position: absolute;
}

/* 三本線の一番上の棒の位置調整 */
.drawer_open span:before {
  bottom: 8px;
}

/* 三本線の一番下の棒の位置調整 */
.drawer_open span:after {
  top: 8px;
}

/* アイコンがクリックされたら真ん中の線を透明にする */
#drawer_input:checked ~ .drawer_open span {
  background: rgba(255, 255, 255, 0);
}

/* アイコンがクリックされたらアイコンが×印になように上下の線を回転 */
#drawer_input:checked ~ .drawer_open span::before {
  bottom: 0;
  transform: rotate(45deg);
}

#drawer_input:checked ~ .drawer_open span::after {
  top: 0;
  transform: rotate(-45deg);
}
  
/* メニューのデザイン*/
.nav_content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%; /* メニューを画面の外に飛ばす */
  z-index: 99;
  background: #fffffffa;
  transition: .5s;
  border:1px solid gray;/* 枠線 */
}

/* メニュー黒ポチを消す */
.nav_list {
  list-style: none;
  margin-top: 3em;
}

.nav_item{
  
  text-decoration: none;
  margin-top: .5em;
  
}

.nav_item_link{
  color: gray;
  border-bottom: gray;
  font-size: 1.5em;
}

/* アイコンがクリックされたらメニューを表示 */
#drawer_input:checked ~ .nav_content {
  left: 20%;/* メニューを画面に入れる */
}

@media (min-width: 600px) {
.title{
  font-size: 4em;
}
.span{
  font-size: .5em;
}
}
</style>

