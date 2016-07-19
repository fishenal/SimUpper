import Gau from 'gaussian'
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
* 计算视频得分
* @param video
* @param state
* @return score (.00)
*/
function getScoreFromVideo (video, state) {
  let baseRatio = state.abilities[video.type.id].abi
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


/*TODO*/
/*
* 计算评论
* @depend item.like
* @depend item.playtime
* @param item
* @output item.commits
*/
function getCommitDependVideo (video) {
  let commitsLength = rtnCommitsLen(video.playtime, video)
  
  // 如果超过1000 取前三位
  // if (commitsLength >= 1000) {
  //   commitsLength = + commitsLength.toString.substring(0, 3)
  // }
  let commits = rtnCommitsByQual(video, commitsLength)
  commits = commits.sort(function () {
    return Math.random() > .5 ? -1 : 1;   
  });

  return commits
}

function rtnCommitsLen (ptime, video) {
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
}

function rtnCommitsByQual (video, length) {
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
  //video.addGoodCommitsNum = goodLength
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
/*TODO*/
function getUpdateCommitsDaily (video) {
  let deltptime = getDeltPlayTimeDaily(video)
  let deltcommit = parseInt(Math.pow(rtnCommitsLen(deltptime, video) / 2, video.day))
  let newCommits = rtnCommitsByQual(video, deltcommit)
  newCommits = newCommits.sort(function () {
    return Math.random() > .5 ? -1 : 1;   
  })
  return newCommits
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
  getPlaytimeDependVideo,
  getLikeDependVideo,
  getCommitDependVideo,
  enhanceAbilityByVideo,
  getDeltPlayTimeDaily,
  getDeltLikeDaily,
  getUpdateCommitsDaily,
  addedFollowerByVideo
}