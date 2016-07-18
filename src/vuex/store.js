import Vue from 'vue'
import Vuex from 'vuex'
import { staticData } from '../depends/staticData'
import * as VideoFunc from '../depends/videoFunctions'
Vue.use(Vuex)
const VideoObjectModel = {
  title: null,
  type: null,
  style: null,
  quality: null,
  videoInnerQuality: 0,
  playtime: 0,
  like: 0,
  commits: [],
  addGoodCommitsNum: 0,
  finishStatus: 0,
  online: false,
  day: 0
}
const state = {
  day: 1,
  name: 'test2',
  follower: 100,
  power: 100,
  gold: 999,
  abilities: [],
  videoList: [],
  staticData
}

const mutations = {
  DAYINCREASE (state) {
    state.day ++
  },
  RANDOMABILITIES (state) {
    state.abilities = VideoFunc.getRandomUserAbilities()
  },
  ADDNEWVIDEO (state, props) {
    let vModel = Object.assign({}, VideoObjectModel)
    let newVideo = Object.assign(vModel, props)
    // 更新完成状态
    newVideo.finishStatus = newVideo.finishStatus + 100 * newVideo.quality.finishStatus
    
    // 计算视频得分
    newVideo.score = VideoFunc.getScoreFromVideo(newVideo, state)
    // 列表写入newVideo
    state.videoList.push(newVideo)

    // 消耗体力值
    state.power -= newVideo.quality.costPower

    // 增加金钱
    state.gold += VideoFunc.getAddGoldDependVideo(newVideo)

    // 能力增强
    let thisAbi = _.find(state.abilities, function (abi, index) {
      return abi.label === newVideo.type.label
    })
    thisAbi.abi += thisAbi.abi * VideoFunc.enhanceAbilityByVideo(newVideo)
    
  },
  REMOVEVIDEO (state, video) {
    state.videoList.$remove(video)
  },
  PUBLISHVIDEO (state, index) {
    let thisVideo = state.videoList[index]
    thisVideo.online = true
    thisVideo.day = 1
    thisVideo.playtime = thisVideo.replaytime = VideoFunc.getPlaytimeDependVideo(state, thisVideo)
    thisVideo.like = thisVideo.relike = VideoFunc.getLikeDependVideo(thisVideo)
    thisVideo.commits = thisVideo.recommits = VideoFunc.getCommitDependVideo(thisVideo)

    state.videoList[index] = thisVideo
  },
  CONTINUEVIDEO (state, index) {
    let thisVideo = state.videoList[index]
    // 更新完成状态
    thisVideo.finishStatus = thisVideo.finishStatus + 100 * thisVideo.quality.finishStatus
    state.videoList[index] = thisVideo
    // 消耗体力值
    state.power -= thisVideo.quality.costPower
  },
  DAILYCHANGE () {
    state.videoList.forEach(function (video) {
      if (video.online) {
        video.day ++
        video.playtime += VideoFunc.getDeltPlayTimeDaily(video)
        video.like += VideoFunc.getDeltLikeDaily(video)
        video.commits = video.commits.concat(VideoFunc.getUpdateCommitsDaily(video))
        state.follower += VideoFunc.getFollowerChangeDaily(video)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})