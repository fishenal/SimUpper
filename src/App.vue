<template>
  <div id="app">
    <div id="left">
      <my
      v-ref:my
      @onnextday="onNextDay"
      ></my>
      <div class="dt-button" @click="showMakePop">
          <a href="#">make</a>
      </div>
    </div>
    <div id="right">
      <list
      v-ref:list
      @oncontinuee="continueMake"
      @onpublish="onPublish"
      @onmyupdate="triggerMyUpdate"
      >
    </div>
  </div>
  <div v-if="isShowMakePop">
    <make-pop
    @onclose="hideMakeVideoPop"
    @onmake="makeNewVideo"></make-pop>
  </div>
  
</template>

<script>
import _ from 'lodash'
import Gau from 'gaussian'
// import { vTypeList } from './module/data.js'
// import { dayStore, itemStore, myStore } from './module/store.js'

//import Days from './components/days.vue'
import List from './module/list.vue'
// import MyInfo from './components/myInfo.vue'
// import Publish from './components/publish.vue'
import My from './module/My.vue'
import MakePop from './module/MakePop.vue'

export default {
  components: {
    My,
    //Days,
    List,
    // MyInfo,
    MakePop
  },
  data () {   
    return {
      isShowMakePop: false
    }
  },
  watch: {
  },
  ready: function () {

  },
  methods: {


    /*
    * 事件绑定：下一天
    * @model Day
    */
    // nextDay: function () {
    //   this.day ++
    //   this.myinfo.power = 100
    //   this.loopListPerDay()
    // },


    /*
    * 事件绑定：显示制作弹窗
    * @model this
    */
    showMakePop: function () {
      this.isShowMakePop = true
      // if (this.myinfo.power === 0) {
      //   alert('no power, pls next day')
      //   return
      // }
      // this.isShowPublish = true
    },


    /*
    * 事件绑定：隐藏制作弹窗
    * @model Publish
    */
    hideMakeVideoPop: function () {
      this.isShowMakePop = false
    },

    makeNewVideo: function (props) {
      let myinfo = this.$refs.my.myinfo
      if (this.$refs.my.myinfo.power < 100 * props.quality.costPower) {
        alert('not enough power')
        return
      }
      let newVideo = this.$refs.list.addNew(props, myinfo)
      this.$refs.my.costPower(newVideo)
      this.$refs.my.enhanceAbi(newVideo)
    },

    onPublish: function (video) {
      let myinfo = this.$refs.my.myinfo
      myinfo.follower += video.like / 2
      let userFollDis = Gau(20, 0.004)
      myinfo.follower += video.playtime * userFollDis.ppf(Math.random()) / 100
    },

    onNextDay: function () {
        this.$refs.list.dayBoost()
    },

    triggerMyUpdate: function (myStore) {
      this.$refs.my.updateMy(myStore)
    },
    /*
    * 事件绑定：制作新item提交至list
    * @model Publish
    */
    // make: function (newItem) {
    //   if (this.myinfo.power < 100 * newItem.quality.costPower) {
    //     alert('not enough power')
    //     return
    //   }
    //   this.calInnerQual(newItem)
    //   this.costPower(newItem)
    //   this.updateFinishStatus(newItem)
    //   this.enhanceAbi(newItem)
    //   this.list.push(newItem)
    // },


    /*
    * 事件绑定：在list里继续制作item
    * @model List
    */
    continueMake: function (video) {
      this.$refs.my.costPower(video)
      this.$refs.my.enhanceAbi(video)
    },


    /*
    * 事件绑定：发布某项item
    * @model List
    */
    // publish: function (index, item) {
    //   item.online = true
    //   item.day = 1

    //   this.calPlaytime(item)
      
    //   this.calLike(item)

    //   this.calCommit(item)

    //   this.calFollower(item)

    //   this.list.$set(index, item)
    // },


    /*
    * 事件绑定：删除某项item
    * @model List
    */
    // remove: function (index, item) {
    //   this.list.$remove(item)
    // },


    


    /*
    * 能量消耗
    * @depend item.quality.costPower
    * @param item
    * @output myinfo.power
    */
    // costPower: function (item) {
    //   this.myinfo.power -= 100 * item.quality.costPower
    // },

    /*
    * 更新完成状态
    * @depend item.finishStatus
    * @depend item.quality.finishStatus
    * @param item
    * @output finishStatus
    */
    // updateFinishStatus: function (item) {
    //   item.finishStatus = item.finishStatus + 100 * item.quality.finishStatus
    // },


    /*
    * 计算内部质量
    * @depend item.type.id
    * @depend item.quality.id
    * @param item
    * @output videoInnerQuality
    */
    calInnerQual: function (item) {
        // // 计算视频评分
        // let videoInnerQuality = 100
        // let score
        // // 相应种类视频技巧系数
        // let techRatio = this.myinfo.abilities[item.type.id].abi / 100
        // videoInnerQuality *= techRatio
        // // 计算视频质量系数
        // let vQualityRatio
        // // 质量高斯随机
        // let highQualityDis = Gau(120, 0.4)
        // let midQualityDis = Gau(100, 0.3)
        // let lowQualityDis = Gau(50, 0.02)
        // let randomQualityDis = Gau(100, 0.1)
        // if (item.quality.id === 0) { //优良
        //   vQualityRatio = highQualityDis.ppf(0.5)
        // }
        // else if (item.quality.id === 1) { //中等
        //   vQualityRatio = midQualityDis.ppf(0.5)
        // }
        // else if (item.quality.id === 2) { // 粗糙
        //   vQualityRatio = lowQualityDis.ppf(0.5)
        // }
        // videoInnerQuality *= vQualityRatio / 100

        // // 质量随机系数
        
        // let randomRatio = randomQualityDis.ppf(Math.random()) / 100
        // videoInnerQuality *= randomRatio
        // if (videoInnerQuality < 30) {
        //   score = 'c--'
        // }
        // else if (videoInnerQuality < 60) {
        //   score = 'c-'
        // }
        // else if (videoInnerQuality < 100) {
        //   score = 'c'
        // }
        // else if (videoInnerQuality > 200) {
        //   score = 'a++'
        // }
        // else if (videoInnerQuality > 160) {
        //   score = 'a+'
        // }
        // else if (videoInnerQuality > 130) {
        //   score = 'a'
        // }
        // else {
        //   score = 'b'
        // }
        // console.log('视频质量', videoInnerQuality)
        // item.score = score
    },


    /*
    * 计算播放量
    * @depend item.videoInnerQuality
    * @param item
    * @output playtime
    * @output rePlaytime
    */
    // calPlaytime: function (item) {
    //   // 计算播放量
    //   let follower = this.myinfo.follower
    //   let publishNum = this.list.length
    //   // 播放量高斯随机
    //   let follDis = Gau(50, 0.02)
    //   let ptimeRanDis = Gau(100, 0.1)
    //   let playtime =
    //   follower + (follower * follDis.ppf(Math.random()) / 100)
    //   * item.videoInnerQuality / 100
    //   * ptimeRanDis.ppf(Math.random()) / 100
    //   playtime = parseInt(playtime)
    //   item.playtime = playtime
    //   item.rePlaytime = playtime
    // },


    /*
    * 计算like
    * @depend item.videoInnerQuality
    * @depend item.playtime
    * @param item
    * @output like
    * @output reLike
    */
    // calLike: function (item) {
    //   // 计算like
    //   let likeQuality
    //   // like高斯随机
    //   let likeDis = Gau(20, 0.005)
    //   if (item.videoInnerQuality > 100) {
    //     likeQuality = 1
    //   }
    //   else {
    //     likeQuality = item.videoInnerQuality / 100
    //   }
    //   let like = parseInt(item.playtime * likeQuality * likeDis.ppf(Math.random()) / 100)
    //   item.like = like
    //   item.reLike = like
    // },


    /*
    * 计算评论
    * @depend item.like
    * @depend item.playtime
    * @param item
    * @output item.commits
    */
    // calCommit: function (item) {
    //   let commits = []
    //   let commitsLength
    //   let badLength
    //   let goodLength
    //   let commonLength
    //   if (item.playtime < 1000) {
    //     commitsLength  = item.playtime * _.random(0.01, 0.02) / 50
    //   }
    //   else if (item.playtime > 10000){
    //     commitsLength  = item.playtime * _.random(0.05, 0.1) / 50
    //   }
    //   else {
    //     commitsLength  = item.playtime * _.random(0.02, 0.03) / 50
    //   }
    //   // 如果超过1000 取前三位
    //   // if (commitsLength >= 1000) {
    //   //   commitsLength = + commitsLength.toString.substring(0, 3)
    //   // }

    //   let badNum = 0
    //   switch (item.score) {
    //     case 'a++':
    //       badLength = commitsLength * 0.05
    //       goodLength = commitsLength * 0.8
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'a+':
    //       badLength = commitsLength * 0.1
    //       goodLength = commitsLength * 0.7
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'a':
    //       badLength = commitsLength * 0.2
    //       goodLength = commitsLength * 0.6
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'b':
    //       badLength = commitsLength * 0.3
    //       goodLength = commitsLength * 0.3
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'c':
    //       badLength = commitsLength * 0.3
    //       goodLength = commitsLength * 0.2
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'c-':
    //       badLength = commitsLength * 0.5
    //       goodLength = commitsLength * 0.1
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //     case 'c--':
    //       badLength = commitsLength * 0.8
    //       goodLength = commitsLength * 0.1
    //       commonLength = commitsLength - goodLength - badLength
    //       break;
    //   }
    //   for (let i = 0; i < badLength; i ++) {
    //       commits.push({
    //         type: 'bad',
    //         cont: 'rabish'
    //       })
    //   }
    //   for (let i = 0; i < goodLength; i ++) {
    //       commits.push({
    //         type: 'good',
    //         cont: 'very good!'
    //       })
    //   }
    //   for (let i = 0; i < commonLength; i ++) {
    //       commits.push({
    //         type: 'common',
    //         cont: 'just soso'
    //       })
    //   }
    //   commits = commits.sort(function () {
    //     return Math.random() > .5 ? -1 : 1;   
    //   });

    //   item.commits = commits
    // },


    /*
    * 根据item变化计算粉丝增长
    * @depend item.like
    * @depend item.playtime
    * @param item
    * @output this.myinfo.follower
    */
    // calFollower: function (item) {
    //   this.myinfo.follower += item.like / 2
    //   let userFollDis = Gau(20, 0.004)
    //   this.myinfo.follower += item.playtime * userFollDis.ppf(Math.random()) / 100
    // },


    /*
    * 每日遍历状态改变
    * @param null
    * @return null
    */
    // loopListPerDay: function () {
    //   _.forEach(this.list, function(item) {
    //     if (item.online) {
    //       item.day ++
    //       let deltptime = parseInt(item.rePlaytime / item.day) // + 随机
    //       let dellike = parseInt(item.reLike / item.day)
    //       item.playtime +=  deltptime
    //       item.like += dellike

    //       // 粉丝增长
    //       let userFollDis = Gau(20, 0.05)
    //       this.myinfo.follower += deltptime * userFollDis.ppf(Math.random()) / 100
    //       this.myinfo.follower += dellike / 2

    //       // 评论
    //       console.log(deltptime, dellike)
    //     }
    //   }.bind(this))
    // }
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
