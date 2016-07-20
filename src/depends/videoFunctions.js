import _ from 'lodash'
import { staticData } from './staticData'

/*
* 随机用户能力值
* @param null
* @return Array: abilities
*/
function getRandomUserAbilities () {
  let abilities = [];
  _.forEach(staticData.typeList, function(item, key) {
    abilities.push({
      label: item.label,
      abi: parseInt(50 * _.random(0.5, 1.3))
    })
  })
  return abilities
}

/*
* 随机用户风格能力值
* @param null
* @return Array: abilities
*/
function getRandomUserStyleAbilities () {
  let abilities = [];
  _.forEach(staticData.styleList, function(item, key) {
    abilities.push({
      label: item.label,
      abi: parseInt(50 * _.random(0.5, 1.3))
    })
  })
  return abilities
}

/*
* 计算视频得分
* @param video
* @param state
* @return score (.00)
*/
function getScoreFromVideo (video, state) {
  let baseRatio =
  (state.abilities[video.type.id].abi + state.styleAbilities[video.style.id].abi) / 2
  let qualityRatio
  switch (video.quality.id) {
    case 0:
      qualityRatio = _.random(1.1, 2.5)
      break
    case 1:
      qualityRatio = _.random(0.8, 1.5)
      break
    case 2:
      qualityRatio = _.random(0.3, 1)
      break
  }
  let randomRatio = _.random(0.8, 1.2)
  let score = baseRatio * qualityRatio * randomRatio
  return score.toFixed(2)
}


/*
* 计算播放量
* @param state
* @param video
* @return playtime (int)
*/
function getPlaytimeDependVideo (state, video) {
  let follower = state.follower
  let playtime = follower * _.random(0.5, 2) * video.score / 100 * _.random(0.8, 1.2)
  return parseInt(playtime)
}


/*
* 计算like
* @param video
* @return like
*/
function getLikeDependVideo (video) {
  // 计算like
  let likeRio
  if (video.videoInnerQuality > 100) {
    likeRio = 0.4
  }
  else {
    likeRio = _.random(0.1, 0.4)
  }
  let like = parseInt(video.playtime * likeRio)
  return like
}


/*
* 获取评论数量
* @param video
* @param playtime (optional)
* @return commitsLength
*/
function getCommitLengthFromVideo (video, playtime) {
  let _playtime
  if (typeof playtime !== 'undefined') {
    _playtime = playtime
  }
  else {
    _playtime = video.playtime
  }
  let commitsLength = parseInt(_.random(0.1, 0.8) * video.score / 100 * _playtime)
  if (commitsLength > _playtime) {
    console.log('commits more than playtime')
    commitsLength = _playtime - 1
  }

  return commitsLength
}

/*
* 获取精选评论
* @param video
* @return commits (Array)
*/
function getSelectCommits (video) {
  // video必须存在commitsLength
  let selectLength
  if (video.commitsLength <= 5) {
    selectLength = video.commitsLength
  }
  else {
    selectLength = parseInt(0.2 * video.commitsLength)
    if (selectLength > 10) {
      console.log('评论太多')
      selectLength = 10
    }
  }
  let score = (video.score > 100) ? 100 : video.score
  let goodCom = parseInt(video.score / 100 * selectLength * _.random(0.8, 1))
  if (goodCom > selectLength) {
    goodCom = selectLength
  }
  let badCom = parseInt(100 / video.score)
  if (badCom > (selectLength - goodCom)) {
    badCom = selectLength - goodCom
  }
  let comCom = selectLength - goodCom - badCom
  let commits = []
  console.log('s,g,b,c rio:', selectLength, goodCom, badCom, comCom)
  for (let i = 0; i < badCom; i ++) {
      commits.push({
        type: 'bad',
        cont: 'rabish'
      })
  }
  for (let i = 0; i < goodCom; i ++) {
      commits.push({
        type: 'good',
        cont: 'very good!'
      })
  }
  for (let i = 0; i < comCom; i ++) {
      commits.push({
        type: 'common',
        cont: 'just soso'
      })
  }
  commits = commits.sort(function () {
    return Math.random() > .5 ? -1 : 1;   
  });
  return commits
}


/*
* 根据视频质量增加能力值
* @param video
* @return addAbi
*/
function enhanceAbilityByVideo (video) {
  let addAbi = video.score * _.random(0.8, 1.5) / 100
  return parseInt(addAbi)
}

/*
* 计算playtime增量
* @param video
* @return deltplaytime
*/
function getDeltPlayTimeDaily (video) {
  let increaseRio = Math.pow(0.8, video.day)
  return parseInt(video.replaytime * increaseRio) 
}

/*
* 计算like增量
* @param video
* @return deltlike
*/
function getDeltLikeDaily (video) {
  let deltptime = getDeltPlayTimeDaily(video)
  let increaseRio = Math.pow(0.3, video.day)
  console.log(deltptime, increaseRio)
  return parseInt(deltptime * increaseRio) 
}

/*
* 根据视频计算粉丝增量
* @param video
* @param state
* @return addedFollowerNum
*/
function addedFollowerByVideo (video, state) {
  let deltptime = getDeltPlayTimeDaily(video)
  let deltlike = getDeltLikeDaily(video)
  let deltAddtion = parseInt(deltptime * _.random(0.2, 0.5) + deltlike * _.random(0.5, 1))
  let lostFollower = 0
  if (Math.random() < (2 / video.score)) {
    console.log('in lost')
    lostFollower = parseInt(state.follower / video.score)
    console.log(lostFollower)
  }
  return deltAddtion - lostFollower
}

export {
  getScoreFromVideo,
  getRandomUserAbilities,
  getRandomUserStyleAbilities,
  getPlaytimeDependVideo,
  getLikeDependVideo,
  getCommitLengthFromVideo,
  getSelectCommits,
  enhanceAbilityByVideo,
  getDeltPlayTimeDaily,
  getDeltLikeDaily,
  addedFollowerByVideo
}