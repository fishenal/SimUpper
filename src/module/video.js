import Gau from 'gaussian'
import _ from 'lodash'
import { myStore, itemStore } from './store.js'
class Video {
    constructor (props) {
        for (let key in props) {
            this[key] = props[key]
        }
    }

    

    getMy () {
      return myStore.fetch()
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

    
    
}

let videoWorkshop = {
  publish (video) {
      video.online = true
      video.day = 1

      this.calPlaytime(video)

      this.calLike(video)

      this.calCommit(video)

  },
  /*
  * 计算播放量
  * @depend item.videoInnerQuality
  * @param item
  * @output playtime
  * @output rePlaytime
  */
  calPlaytime (video) {
      // 计算播放量
      let follower = myStore.fetch().follower
      let publishNum = itemStore.fetch().length
      // 播放量高斯随机
      let follDis = Gau(50, 0.02)
      let ptimeRanDis = Gau(100, 0.1)
      let playtime =
      follower + (follower * follDis.ppf(Math.random()) / 100)
      * video.videoInnerQuality / 100
      * ptimeRanDis.ppf(Math.random()) / 100
      playtime = parseInt(playtime)
      console.log('播放量：' + playtime)
      video.playtime = playtime
      video.rePlaytime = playtime
  },


  /*
  * 计算like
  * @depend item.videoInnerQuality
  * @depend item.playtime
  * @param item
  * @output like
  * @output reLike
  */
  calLike (video) {
    // 计算like
    let likeQuality
    // like高斯随机
    let likeDis = Gau(20, 0.005)
    if (video.videoInnerQuality > 100) {
      likeQuality = 1
    }
    else {
      likeQuality = video.videoInnerQuality / 100
    }
    let like = parseInt(video.playtime * likeQuality * likeDis.ppf(Math.random()) / 100)
    video.like = like
    video.reLike = like
  },


  /*
  * 计算评论
  * @depend item.like
  * @depend item.playtime
  * @param item
  * @output item.commits
  */
  calCommit (video) {
    let commitsLength = this.rtnCommitsLen(video.playtime, video)
    
    // 如果超过1000 取前三位
    // if (commitsLength >= 1000) {
    //   commitsLength = + commitsLength.toString.substring(0, 3)
    // }
    let commits = this.rtnCommitsByQual(video, commitsLength)
    commits = commits.sort(function () {
      return Math.random() > .5 ? -1 : 1;   
    });

    video.commits = commits
    video.reCommits = commits
  },
  rtnCommitsLen (ptime, video) {
    let clen
    if (ptime < 1000) {
      clen  = ptime * _.random(0.01, 0.02) / 50
    }
    else if (ptime > 10000){
      clen  = ptime * _.random(0.05, 0.1) / 50
    }
    else {
      clen  = ptime * _.random(0.02, 0.03) / 50
    }
    return clen
  },
  rtnCommitsByQual (video, length) {
    let commits = []
    let badLength
    let goodLength
    let commonLength
    switch (video.score) {
      case 'a++':
        badLength = length * 0.05
        goodLength = length * 0.8
        commonLength = length - goodLength - badLength
        break;
      case 'a+':
        badLength = length * 0.1
        goodLength = length * 0.7
        commonLength = length - goodLength - badLength
        break;
      case 'a':
        badLength = length * 0.2
        goodLength = length * 0.6
        commonLength = length - goodLength - badLength
        break;
      case 'b':
        badLength = length * 0.3
        goodLength = length * 0.3
        commonLength = length - goodLength - badLength
        break;
      case 'c':
        badLength = length * 0.3
        goodLength = length * 0.2
        commonLength = length - goodLength - badLength
        break;
      case 'c-':
        badLength = length * 0.5
        goodLength = length * 0.1
        commonLength = length - goodLength - badLength
        break;
      case 'c--':
        badLength = length * 0.8
        goodLength = length * 0.1
        commonLength = length - goodLength - badLength
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
    return commits
  },
  dayBoost (video) {
    if (video.online) {
      let _myStore = myStore.fetch()
      video.day ++
      let deltptime = parseInt(video.rePlaytime / video.day / 2) // + 随机
      let dellike = parseInt(video.reLike / video.day)

      let delcommit = parseInt(this.rtnCommitsLen(deltptime, video) / video.day)
      console.log(delcommit)
      let newCommits = this.rtnCommitsByQual(video, delcommit)
      newCommits = newCommits.sort(function () {
        return Math.random() > .5 ? -1 : 1;   
      })
      let commits = video.commits.concat(newCommits)
      
      video.commits = commits
      video.playtime +=  deltptime
      video.like += dellike

      // 粉丝增长
      let userFollDis = Gau(20, 0.05)
      _myStore.follower += deltptime * userFollDis.ppf(Math.random()) / 100
      _myStore.follower += dellike / 2
      // debugger
      this.eventBus.saveMy(_myStore)
      // myStore.save()
      // 评论
      console.log(deltptime, dellike)
    }
  },

  eventBus: {
  }
}
export { Video, videoWorkshop }
