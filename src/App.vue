<template>
  <div id="app">
    <div id="left">
      <my></my>
      <div class="dt-button" @click="showMakePop">
          <a href="#">make</a>
      </div>
    </div>
    <div id="right">
      <list>
    </div>
  </div>
  <div v-if="isShowMakePop">
    <make-pop
    @onclose="hideMakeVideoPop"></make-pop>
  </div>
  <alert v-ref:alert></alert>
  <change-log v-ref:changelog></change-log>
</template>

<script>
import List from './components/list.vue'
import My from './components/My.vue'
import MakePop from './components/MakePop.vue'
import Alert from './components/Alert.vue'
import ChangeLog from './components/ChangeLog.vue'
import store from './vuex/store'
export default {
  components: {
    My,
    List,
    MakePop,
    Alert,
    ChangeLog
  },
  store,
  vuex: {
    getters: {
      day: state => state.day,
      power: state => state.power
    }
  },
  data () {
    return {
        isShowMakePop: false
    }
  },
  methods: {
    showMakePop: function () {
        if (this.power <= 0) {
            this.$refs.alert.show('没有体力了')
            return
        }
        this.isShowMakePop = true
    },
    hideMakeVideoPop: function () {
      this.isShowMakePop = false
    },
  },
  events: {
    alert: function (content) {
        this.$refs.alert.show(content)
    },
    changeLog: function (content) {
        this.$refs.changelog.add(content)
    }
  }
}
</script>

<style>
body{margin:0;font-family:"微软雅黑",Arial,sans-serif;font-size:14px;line-height:1.8;color:#003d51;background:#f5f5f5;text-rendering:optimizeLegibility}body ul{list-style:none;margin:0;padding:0}body a{text-decoration:none;color:inherit}body h1,body h2,body h3,body h4,body h5,body p{margin:0}body h1{line-height:2.6;font-size:22px}body h2{line-height:2.4;font-size:20px}body h3{line-height:2.2;font-size:18px}body h4{line-height:2;font-size:16px}body table,body thead,body tbody,body tr,body th,body td{border:none;border-collapse:collapse;border-spacing:0;border-color:inherit}.dt-box{display:flex}.dt-box .dt-item-12{width:100%}.dt-box .dt-item-11{width:91.66666667%}.dt-box .dt-item-10{width:83.33333333%}.dt-box .dt-item-9{width:75%}.dt-box .dt-item-8{width:66.66666667%}.dt-box .dt-item-7{width:58.33333333%}.dt-box .dt-item-6{width:50%}.dt-box .dt-item-5{width:41.66666667%}.dt-box .dt-item-4{width:33.33333333%}.dt-box .dt-item-3{width:25%}.dt-box .dt-item-2{width:16.66666667%}.dt-box .dt-item-1{width:8.33333333%}.dt-box h1,.dt-box h2,.dt-box h3,.dt-box h4,.dt-box h5,.dt-box p{padding:0 2%}.dt-box ul{padding:2%}.dt-center{text-align:center}.dt-colorful{color:#ffae00}.dt-dark{color:#003d51}.dt-light{color:#f5f5f5}.dt-head{display:flex;background:#003d51;color:#f5f5f5;height:50px;line-height:50px}.dt-head .dt-title{font-size:22px;line-height:50px;margin-left:2%}.dt-head .dt-nav{display:flex;margin-left:5%}.dt-head .dt-nav .dt-nav-item{font-size:16px;padding:0 20px}.dt-title{border-bottom:2px solid #003d51}.dt-title-colorful{border-bottom:2px solid #ffae00}.dt-link{display:inline;cursor:pointer;color:#003d51;border-bottom:1px solid #003d51;transition:color .5s,border .5s}.dt-link:hover{color:#003d51;border-bottom:1px solid #003d51}.dt-link-dark{display:inline;cursor:pointer;color:#f5f5f5;border-bottom:1px solid #f5f5f5;transition:color .5s,border .5s}.dt-link-dark:hover{color:#f5f5f5;border-bottom:1px solid #f5f5f5}.dt-link-colorful,.dt-link-colorful-1{display:inline;cursor:pointer;color:#003d51;border-bottom:1px solid #003d51;transition:color .5s,border .5s}.dt-link-colorful:hover,.dt-link-colorful-1:hover{color:#ffae00;border-bottom:1px solid #ffae00}.dt-link-colorful-2{display:inline;cursor:pointer;color:#ffae00;border-bottom:1px solid #ffae00;transition:color .5s,border .5s}.dt-link-colorful-2:hover{color:#003d51;border-bottom:1px solid #003d51}.dt-list li,.dt-list-1 li{border-left:1px solid #003d51;padding-left:5%;margin:1% 0}.dt-list-2 li{border-left:1px solid #ffae00;padding-left:5%;margin:1% 0}.dt-list-3 li{border-bottom:1px solid #003d51;padding-left:5%;margin:1% 0}.dt-list-4 li{border-bottom:1px solid #ffae00;padding-left:5%;margin:1% 0}.dt-button{border:1px solid #003d51;color:#003d51;background:#f5f5f5;padding:5px 15px;display:inline-block;font-size:14px;margin:2%;transition:background .2s,color .5s,border 1s}.dt-button a{display:block}.dt-button:hover{border:1px solid #f5f5f5;color:#f5f5f5;background:#003d51}.dt-button.dt-button-simple{border:1px solid #f5f5f5;border-bottom:1px solid #003d51}.dt-button.dt-button-simple:hover{border:1px solid #f5f5f5;border-bottom:1px solid #003d51;color:#003d51;background:#f5f5f5}.dt-button-dark{border:1px solid #f5f5f5;color:#f5f5f5;background:#003d51;padding:5px 15px;display:inline-block;font-size:14px;margin:2%;transition:background .2s,color .5s,border 1s}.dt-button-dark a{display:block}.dt-button-dark:hover{border:1px solid #003d51;color:#003d51;background:#f5f5f5}.dt-button-dark.dt-button-simple{border:1px solid #003d51;border-bottom:1px solid #f5f5f5}.dt-button-dark.dt-button-simple:hover{border:1px solid #003d51;border-bottom:1px solid #f5f5f5;color:#f5f5f5;background:#003d51}.dt-button-colorful,.dt-button-colorful-1{border:1px solid #ffae00;color:#ffae00;background:#f5f5f5;padding:5px 15px;display:inline-block;font-size:14px;margin:2%;transition:background .2s,color .5s,border 1s}.dt-button-colorful a,.dt-button-colorful-1 a{display:block}.dt-button-colorful:hover,.dt-button-colorful-1:hover{border:1px solid #f5f5f5;color:#f5f5f5;background:#ffae00}.dt-button-colorful.dt-button-simple,.dt-button-colorful-1.dt-button-simple{border:1px solid #f5f5f5;border-bottom:1px solid #ffae00}.dt-button-colorful.dt-button-simple:hover,.dt-button-colorful-1.dt-button-simple:hover{border:1px solid #f5f5f5;border-bottom:1px solid #ffae00;color:#ffae00;background:#f5f5f5}.dt-button-colorful-2{border:1px solid #f5f5f5;color:#f5f5f5;background:#ffae00;padding:5px 15px;display:inline-block;font-size:14px;margin:2%;transition:background .2s,color .5s,border 1s}.dt-button-colorful-2 a{display:block}.dt-button-colorful-2:hover{border:1px solid #ffae00;color:#ffae00;background:#f5f5f5}.dt-button-colorful-2.dt-button-simple{border:1px solid #ffae00;border-bottom:1px solid #f5f5f5}.dt-button-colorful-2.dt-button-simple:hover{border:1px solid #ffae00;border-bottom:1px solid #f5f5f5;color:#f5f5f5;background:#ffae00}.dt-button-colorful-3{border:1px solid #ffae00;color:#ffae00;background:#003d51;padding:5px 15px;display:inline-block;font-size:14px;margin:2%;transition:background .2s,color .5s,border 1s;color:#f5f5f5;border:1px solid #f5f5f5}.dt-button-colorful-3 a{display:block}.dt-button-colorful-3:hover{border:1px solid #003d51;color:#003d51;background:#ffae00}.dt-button-colorful-3.dt-button-simple{border:1px solid #003d51;border-bottom:1px solid #ffae00}.dt-button-colorful-3.dt-button-simple:hover{border:1px solid #003d51;border-bottom:1px solid #ffae00;color:#ffae00;background:#003d51}.dt-button-colorful-3:hover{border:1px solid #ffae00;color:#f5f5f5}.dt-button-big{padding:15px 20px;font-size:20px}.dt-button-small{padding:3px 10px;font-size:12px}.dt-boarder{display:inline-block;color:#003d51;background:#f5f5f5;border:1px solid #003d51;padding:2%;margin:2% 0;width:100%}.dt-boarder-dark{display:inline-block;color:#f5f5f5;background:#003d51;border:1px solid #f5f5f5;padding:2%;margin:2% 0;width:100%}.dt-boarder-colorful,.dt-boarder-colorful-1{display:inline-block;color:#ffae00;background:#003d51;border:1px solid #ffae00;padding:2%;margin:2% 0;width:100%}.dt-boarder-colorful-2{display:inline-block;color:#ffae00;background:#f5f5f5;border:1px solid #ffae00;padding:2%;margin:2% 0;width:100%}.dt-boarder-colorful-3{display:inline-block;color:#f5f5f5;background:#ffae00;border:1px solid #f5f5f5;padding:2%;margin:2% 0;width:100%}.dt-boarder-colorful-4{display:inline-block;color:#ffae00;background:#003d51;border:1px solid #ffae00;padding:2%;margin:2% 0;width:100%}.dt-form{font-size:14px}.dt-form .dt-form-line{display:flex;padding:5px 0;height:30px;line-height:30px}.dt-form .dt-form-line .dt-form-label{padding-right:5px;width:10%;text-align:right;height:30px;line-height:30px}.dt-form .dt-form-line .dt-form-input{width:90%}.dt-form .dt-form-line .dt-form-input .dt-button{margin:0}.dt-select{border:none;border-bottom:1px solid #003d51;background:#f5f5f5;color:#003d51;height:30px;line-height:30px;text-indent:5px;padding:0 15px;cursor:pointer}.dt-select:focus{outline:none}.dt-input{border:none;border-bottom:1px solid #003d51;background:#f5f5f5;color:#003d51;height:30px;line-height:30px;text-indent:5px}.dt-input:focus{outline:none}.dt-input-dark{border:none;border-bottom:1px solid #f5f5f5;background:#003d51;color:#f5f5f5;height:30px;line-height:30px;text-indent:5px}.dt-input-dark:focus{outline:none}.dt-input-colorful{border:none;border-bottom:1px solid #ffae00;background:#f5f5f5;color:#ffae00;height:30px;line-height:30px;text-indent:5px}.dt-input-colorful:focus{outline:none}.dt-table{width:100%;margin:5% 0;border:1px solid #003d51}.dt-table th{color:#f5f5f5;background:#003d51;font-size:16px;font-weight:bold;text-align:center}.dt-table td{color:#003d51;background:#f5f5f5;font-size:14px;font-weight:normal;border-bottom:1px solid #003d51;text-align:center}.dt-table-dark{width:100%;margin:5% 0;border:1px solid #003d51}.dt-table-dark th{color:#003d51;background:#f5f5f5;font-size:16px;font-weight:bold;text-align:center}.dt-table-dark td{color:#f5f5f5;background:#003d51;font-size:14px;font-weight:normal;border-bottom:1px solid #f5f5f5;text-align:center}.dt-table-colorful{width:100%;margin:5% 0;border:1px solid #003d51;border:1px solid #ffae00}.dt-table-colorful th{color:#f5f5f5;background:#ffae00;font-size:16px;font-weight:bold;text-align:center}.dt-table-colorful td{color:#ffae00;background:#f5f5f5;font-size:14px;font-weight:normal;border-bottom:1px solid #ffae00;text-align:center}
body, html {
  height: 100%;
}
.up-dialog {
    width: 80%;
    position: absolute;
    top: 20%;
    z-index: 2;
    background: #fff;
    padding: 2%;
    left: 50%;
    margin-left: -40%;
}
.up-cover {
    background: #000;
    opacity: .8;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#app {
  overflow: hidden;
}
#left {
  position: fixed;
  height: 100%;
  width: 18%;
  padding: 1%;
  background: #003d51;
  height: 98%;
}
#right {
  float: left;
  margin-left: 20%;
  width: 78%;
  padding: 1%;
  height: 98%;
}
</style>
