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
  score: 0,
  playtime: 0,
  like: 0,
  commits: [],
  commitsLength: 0,
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
  abilities: {},
  styleAbilities: {},
  videoList: [],
  abiChangeLog: [],// type, origin, addtion
  styleAbiChangeLog: [],// type, origin, addtion
  staticData
}

const mutations = {
  DAYINCREASE (state) {
    state.day ++
    state.power = 100
    state.gold -= 100
  },
  RANDOMABILITIES (state) {
    state.abilities = VideoFunc.getRandomUserAbilities()
    state.styleAbilities = VideoFunc.getRandomUserStyleAbilities()
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
    state.gold += parseInt(newVideo.score)

    // 能力增强
    let abiAdd1 = VideoFunc.enhanceAbilityByVideo(newVideo)
    let abiAdd2 = VideoFunc.enhanceAbilityByVideo(newVideo)
    state.abiChangeLog = [newVideo.type.label, state.abilities[newVideo.type.label], abiAdd1]
    state.abilities[newVideo.type.label] += abiAdd1

    
    state.styleAbiChangeLog = [newVideo.style.label, state.styleAbilities[newVideo.style.label], abiAdd2]
    state.styleAbilities[newVideo.style.label] += abiAdd2

  },
  REMOVEVIDEO (state, video) {
    state.videoList.$remove(video)
  },
  PUBLISHVIDEO (state, index) {
    let thisVideo = state.videoList[index]
    thisVideo.online = true
    thisVideo.day = 1
    thisVideo.playtime = thisVideo.replaytime = VideoFunc.getPlaytimeDependVideo(state, thisVideo)
    thisVideo.like = VideoFunc.getLikeDependVideo(thisVideo)
    thisVideo.commitsLength = VideoFunc.getCommitLengthFromVideo(thisVideo)
    thisVideo.commits = VideoFunc.getSelectCommits(thisVideo)

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
    let addedFollowerNum = 0
    state.videoList.forEach(function (video) {
      if (video.online) {
        video.day ++
        let deltaptime = VideoFunc.getDeltPlayTimeDaily(video)
        let deltaCommitsLength = VideoFunc.getCommitLengthFromVideo(video, deltaptime)
        video.playtime += deltaptime
        video.like += VideoFunc.getDeltLikeDaily(video)
        video.commitsLength += deltaCommitsLength
        if (deltaCommitsLength !== 0) {
          video.commits = VideoFunc.getSelectCommits(video)  
        }
        addedFollowerNum += VideoFunc.addedFollowerByVideo(video, state)
      }
    })
    state.follower += addedFollowerNum
  }
}

export default new Vuex.Store({
  state,
  mutations
})