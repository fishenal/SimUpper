import Gau from 'gaussian'
import { myStore, itemStore } from './store.js'
class Video {
    constructor (props) {
        for (let key in props) {
            this[key] = props[key]
        }
    }

    publish () {
        this.online = true
        this.day = 1

        this.calPlaytime()

        this.calLike()

        this.calCommit()

    }

    getMy () {
      return myStore.fetch()
    }

    saveMy (my) {
      myStore.save(my)
    }

    getVideos () {
      return itemStore.fetch()
    }
    /*
    * 计算内部质量
    * @depend item.type.id
    * @depend item.quality.id
    * @param item
    * @output videoInnerQuality
    */
    calInnerQual () {
        let myStore = this.getMy()
        // 计算视频评分
        let videoInnerQuality = 100
        let score
        // 相应种类视频技巧系数
        let techRatio = myStore.abilities[this.type.id].abi / 100
        videoInnerQuality *= techRatio
        // 计算视频质量系数
        let vQualityRatio
        // 质量高斯随机
        let highQualityDis = Gau(120, 0.4)
        let midQualityDis = Gau(100, 0.3)
        let lowQualityDis = Gau(50, 0.02)
        let randomQualityDis = Gau(100, 0.1)
        if (this.quality.id === 0) { //优良
          vQualityRatio = highQualityDis.ppf(0.5)
        }
        else if (this.quality.id === 1) { //中等
          vQualityRatio = midQualityDis.ppf(0.5)
        }
        else if (this.quality.id === 2) { // 粗糙
          vQualityRatio = lowQualityDis.ppf(0.5)
        }
        videoInnerQuality *= vQualityRatio / 100

        // 质量随机系数
        
        let randomRatio = randomQualityDis.ppf(Math.random()) / 100
        videoInnerQuality *= randomRatio
        if (videoInnerQuality < 30) {
          score = 'c--'
        }
        else if (videoInnerQuality < 60) {
          score = 'c-'
        }
        else if (videoInnerQuality < 100) {
          score = 'c'
        }
        else if (videoInnerQuality > 200) {
          score = 'a++'
        }
        else if (videoInnerQuality > 160) {
          score = 'a+'
        }
        else if (videoInnerQuality > 130) {
          score = 'a'
        }
        else {
          score = 'b'
        }
        console.log('视频质量', videoInnerQuality)
        this.score = score
    }

    /*
    * 更新完成状态
    * @depend item.finishStatus
    * @depend item.quality.finishStatus
    * @param item
    * @output finishStatus
    */
    updateFinishStatus () {
      this.finishStatus = this.finishStatus + 100 * this.quality.finishStatus
    }

    /*
    * 计算播放量
    * @depend item.videoInnerQuality
    * @param item
    * @output playtime
    * @output rePlaytime
    */
    calPlaytime () {
        let myStore = this.getMy()
        // 计算播放量
        let follower = myStore.follower
        let publishNum = this.getVideos().length
        // 播放量高斯随机
        let follDis = Gau(50, 0.02)
        let ptimeRanDis = Gau(100, 0.1)
        let playtime =
        follower + (follower * follDis.ppf(Math.random()) / 100)
        * this.videoInnerQuality / 100
        * ptimeRanDis.ppf(Math.random()) / 100
        playtime = parseInt(playtime)
        console.log('播放量：' + playtime)
        this.playtime = playtime
        this.rePlaytime = playtime
    }


    /*
    * 计算like
    * @depend item.videoInnerQuality
    * @depend item.playtime
    * @param item
    * @output like
    * @output reLike
    */
    calLike () {
      // 计算like
      let likeQuality
      // like高斯随机
      let likeDis = Gau(20, 0.005)
      if (this.videoInnerQuality > 100) {
        likeQuality = 1
      }
      else {
        likeQuality = this.videoInnerQuality / 100
      }
      let like = parseInt(this.playtime * likeQuality * likeDis.ppf(Math.random()) / 100)
      this.like = like
      this.reLike = like
    }


    /*
    * 计算评论
    * @depend item.like
    * @depend item.playtime
    * @param item
    * @output item.commits
    */
    calCommit () {
      let commits = []
      let commitsLength
      let badLength
      let goodLength
      let commonLength
      if (this.playtime < 1000) {
        commitsLength  = this.playtime * _.random(0.01, 0.02) / 50
      }
      else if (this.playtime > 10000){
        commitsLength  = this.playtime * _.random(0.05, 0.1) / 50
      }
      else {
        commitsLength  = this.playtime * _.random(0.02, 0.03) / 50
      }
      // 如果超过1000 取前三位
      // if (commitsLength >= 1000) {
      //   commitsLength = + commitsLength.toString.substring(0, 3)
      // }

      let badNum = 0
      switch (this.score) {
        case 'a++':
          badLength = commitsLength * 0.05
          goodLength = commitsLength * 0.8
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'a+':
          badLength = commitsLength * 0.1
          goodLength = commitsLength * 0.7
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'a':
          badLength = commitsLength * 0.2
          goodLength = commitsLength * 0.6
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'b':
          badLength = commitsLength * 0.3
          goodLength = commitsLength * 0.3
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'c':
          badLength = commitsLength * 0.3
          goodLength = commitsLength * 0.2
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'c-':
          badLength = commitsLength * 0.5
          goodLength = commitsLength * 0.1
          commonLength = commitsLength - goodLength - badLength
          break;
        case 'c--':
          badLength = commitsLength * 0.8
          goodLength = commitsLength * 0.1
          commonLength = commitsLength - goodLength - badLength
          break;
      }
      for (let i = 0; i < badLength; i ++) {
          commits.push({
            type: 'bad',
            cont: 'rabish'
          })
      }
      for (let i = 0; i < goodLength; i ++) {
          commits.push({
            type: 'good',
            cont: 'very good!'
          })
      }
      for (let i = 0; i < commonLength; i ++) {
          commits.push({
            type: 'common',
            cont: 'just soso'
          })
      }
      commits = commits.sort(function () {
        return Math.random() > .5 ? -1 : 1;   
      });

      this.commits = commits
    }

    dayBoost () {
      if (this.online) {
        let myStore = this.getMy()
        this.day ++
        let deltptime = parseInt(this.rePlaytime / this.day) // + 随机
        let dellike = parseInt(this.reLike / this.day)
        this.playtime +=  deltptime
        this.like += dellike

        // 粉丝增长
        let userFollDis = Gau(20, 0.05)
        myStore.follower += deltptime * userFollDis.ppf(Math.random()) / 100
        myStore.follower += dellike / 2

        this.saveMy(myStore)
        // 评论
        console.log(deltptime, dellike)
      }
    }
    
}
export { Video }
