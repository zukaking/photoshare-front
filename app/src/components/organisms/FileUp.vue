<template>
  <div class="container">
    <header-view subtitle=" &gt; file upload"></header-view>
    <input ref="upfile" type="file" id="fileElem"  multiple v-on:change="imageToBase64" style="display: none"/><!---->
    <button type="button" class="btn btn-outline-secondary button mt-3" id="fileSelect" v-on:click="btnclick">画像を選択</button>
    <label class="text-secondary fs-5" for="fileSelect">画像を選択(※フォーマット:jpg)</label>
    <div>
      <ul v-show='showList' v-for="(f, i) in files" :key="i">
        <li>{{ f.name }}</li>
      </ul>
    </div>
    <div class="imgwrapper">
      <img  class="preview" v-if="showPrev" v-bind:src="previewBase64" alt="preview.jpg"/>
    </div>
    <button type="button" class="btn btn-outline-secondary mt-1" v-if="showUpload" v-on:click="upload">upload</button>
    <div class="mt-2" :class="msgObj" v-show="showMsg">{{ msg }}</div>
    <footer-view></footer-view>  
  </div>
</template>

<script>
//import axios from 'axios'
import HeaderView from "@/components/organisms/HeaderView.vue";
import FooterView from '@/components/organisms/FooterView.vue';
import auth from '@/api/auth';

function asyncProcess(file){
  return new Promise((resolve,reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let file_info = {
        img: null,
        filename: file.name
      }
      file_info.img = reader.result
      auth.upload(file_info).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
        throw err
      })
    }
  })
}

export default {
  name: 'FileUp',
  data(){
    return {
      showPrev: false,
      showUpload: false,
      showOutput: false,
      previewBase64: '',
      files: [],
      msg: 'アップロード完了しました',
      showMsg: false,
      msgObj: {
        'text-primary': true,
        'text-danger': false
      },
      showList: false,
      count: ''
    }
  },
  components: {
    HeaderView,
    FooterView,
  },
  methods: {
    btnclick() {
      console.log("btnclick")
      this.$refs.upfile.click();
    },
    imageToBase64(event){
      console.log("imageToBase64")
      this.init()
      this.files = event.target.files

      // ファイルが選択されていればBase64に変換する
      if(this.files){
        for(let f of this.files){
          let s = f.name.split('.')
          console.log(s[s.length-1])
          if(s.length === 0 || (s[s.length-1] !== 'jpg' && s[s.length-1] !== 'jpeg')){
            this.msg = 'フォーマット不正です'
            this.showMsg = true
            this.msgObj["text-primary"] = false
            this.msgObj["text-danger"] = true
            this.$refs.upfile.value = ''
            return 
          }
        }

        if(this.files.length === 1){
          const file = this.files[0]
          const reader = new FileReader()
          reader.readAsDataURL(file)

          // 変換が終わったら実行される
          reader.onload = () => {
            this.showPrev = true
            this.showUpload = true
            this.previewBase64 = reader.result
          }
        }
        else{
          this.showList = true
          this.showUpload = true
        }
      }
    },
    init(){
      console.log('init')
      this.previewBase64 = ''
      this.showPrev = false
      this.showUpload = false
      this.showMsg = false
      this.showList = false

    },
    async upload() {

      let files = this.files
      //let fileReaders = []
      for(let i = 0; i < files.length;i++){
        console.log(i)
        let f = this.files[i]
        let self = this
        await asyncProcess(f).then(res => {
          console.log("##res##",res)
        }).catch(err => {
          if(err.response.status === 401){
            alert('ユーザー認証に失敗しました')
            this.$router.push("/login");
          }else{
            console.log(err)
            self.showMsg = true
            self.msg = 'upload失敗しました'
            self.msgObj["text-danger"] = true
            self.msgObj["text-primary"] = false
          }
          throw err
        })
      }
      
      console.log('upload完了')
      this.previewBase64 = ''
      this.showPrev = false
      this.showUpload = false
      this.$refs.upfile.value = ''
      this.showMsg = true
      this.showList = false     
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
  margin: 2em;
}

.preview{
  width: 100%;
  height: 100%;
}

.imgwrapper{
  margin: 4px;
}

.button{
  margin-right: 10px;
  margin-left: 4px;
  border-radius: 3px;
  padding-right: 10px;
  padding-left: 10px;
  border-color: gray;
}

</style>
