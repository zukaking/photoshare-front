<template>
  <div class="container-wrapper">
    <header-view/>
    <div><p class="user">ログインユーザー：{{ user }}さん</p></div>
    <main  class="grid" :style="gridRows">
      <photo-item  v-for="(photo, i) in photos" :key="i" :file-name="photo"/>
    </main>
    <footer-view/>
  </div>
</template>

<script>
import PhotoItem from "@/components/organisms/PhotoItem.vue";
import HeaderView from "@/components/organisms/HeaderView.vue";
import FooterView from '@/components/organisms/FooterView.vue';
import auth from '@/api/auth'

export default {
  name: "TopView",
  data() {
    return {
      user: '',
      photos: [],
      vals: {
        color: 'red'
      },
      gridRows: {
        gridTemplateRows: 'repeat(auto-fit, 46vw)'   
      },
      msg: 'hello'  
    }
  },
  components: {
    PhotoItem,
    HeaderView,
    FooterView,
  },
  methods: {
    logout() {
      return this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          throw error;
        });
    }
  },
  mounted(){
   
  },
  created(){

    const mql = window.matchMedia("(min-width: 600px)");
    const matchMediaChecker = (e) => {
      if (e.matches) {
        // ウィンドウサイズ600px以下のときの処理
        console.log("pc size")
        let size = Math.ceil((this.photos.length / 3))
        this.gridRows.gridTemplateRows = 'repeat(' + size + ', 26vw)'
      } else {
        // それ以外の処理
        console.log("smart phone")
        let size = Math.ceil((this.photos.length / 2))
        this.gridRows.gridTemplateRows = 'repeat(' + size + ', 46vw)'
      }
    }

    //matchMediaCheckerイベント登録
    mql.addEventListener('change', matchMediaChecker)

    this.$store.dispatch('getuser')
    .catch(() => {
      alert('ユーザー認証に失敗しました')
      this.$router.push("/login");
    })

    auth.getFile()
    .then((res) => {
      console.log(res)
      let self = this;
      for (let f of res.data.file_infos){
        //console.log(f)
        self.photos.push(f.url)
      }

      //matchMediaChecker初回実行
      matchMediaChecker(mql)
    })

    

    
  },
  computed: {
    // 1. computed で、Storeから Stateを取得する
    getUserData() {
      return this.$store.getters.getUser;
    },
    classObject() {
      return {
        girda: "girda"
      }
    }
  },
  watch: {
    // 3. Store.State が変更されたら、watchが検知する
    getUserData(newValue, oldValue) {
      this.user = newValue.username;
      console.log("new",newValue,"old",oldValue)
    },
  }
};
</script>

<style scoped>
.grid {
    width: 94vw;
    margin: 0 auto 3vw;
    display: grid;
    gap: 2vw;
    grid-template-columns: repeat(2, 46vw); /* (94 - 2) / 2 */
    /*grid-template-rows: repeat(auto-fit, 46vw);*/
}

.user{
  margin-top: .5em;
  margin-left: 1em;
}

@media (min-width: 600px) {
/* Grid */
.grid {
        width: 80vw;
        gap: 1vw;
        grid-template-columns: repeat(3, 26vw); /* (80 - 2) / 3 */
        /*grid-template-rows: repeat(auto-fit, 26vw);*/
    }
}

</style>

