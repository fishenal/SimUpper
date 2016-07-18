import Gau from 'gaussian'
import _ from 'lodash'
import { staticData } from './staticData'

function getRandomUserAbilities () {
  let abilities = [];
  // 能力高斯随机
  let abilityDis = Gau(50, 0.05)
  _.forEach(staticData.typeList, function(item, key) {
    abilities.push({
      label: item.label,
      abi: abilityDis.ppf(Math.random())
    })
  })
  return abilities
}

function getScoreFromVideo (video, state) {
  // 计算视频评分
  let videoInnerQuality = 100
  let score
  // 相应种类视频技巧系数
  let techRatio = state.abilities[video.type.id].abi / 100
  videoInnerQuality *= techRatio
  // 计算视频质量系数
  let vQualityRatio
  // 质量高斯随机
  let highQualityDis = Gau(120, 0.4)
  let midQualityDis = Gau(100, 0.3)
  let lowQualityDis = Gau(50, 0.02)
  let randomQualityDis = Gau(100, 0.1)
  if (video.quality.id === 0) { //优良
    vQualityRatio = highQualityDis.ppf(0.5)
  }
  else if (video.quality.id === 1) { //中等
    vQualityRatio = midQualityDis.ppf(0.5)
  }
  else if (video.quality.id === 2) { // 粗糙
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
  return score
}

function getAddGoldDependVideo (video) {
  let gold = 0
  if (video.score === 'a++') {
    gold = 20
  }
  else if (video.score === 'a+') {
    gold = 10
  }
  else if (video.score === 'a') {
    gold = 5
  }
  return gold
}
/*
* 计算播放量
* @depend item.videoInnerQuality
* @param item
* @output playtime
* @output rePlaytime
*/
function getPlaytimeDependVideo (state, video) {
  // 计算播放量
  let follower = state.follower
  let publishNum = state.videoList.length
  // 播放量高斯随机
  let follDis = Gau(50, 0.02)
  let ptimeRanDis = Gau(100, 0.1)
  let playtime =
  follower + (follower * follDis.ppf(Math.random()) / 100)
  * video.videoInnerQuality / 100
  * ptimeRanDis.ppf(Math.random()) / 100
  playtime = parseInt(playtime)
  console.log('播放量：' + playtime)
  return playtime
}


/*
* 计算like
* @depend item.videoInnerQuality
* @depend item.playtime
* @param item
* @output like
* @output reLike
*/
function getLikeDependVideo (video) {
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
  return like
}



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


function enhanceAbilityByVideo (video) {
  let abiIncreaseRio = 0
  switch (video.score) {
    case 'a++':
      abiIncreaseRio = 0.03
      break;
    case 'a+':
      abiIncreaseRio = 0.02
      break;
    case 'a':
      abiIncreaseRio = 0.01
      break;
    case 'b':
      break;
    case 'c':
      abiIncreaseRio = -0.01
      break;
    case 'c-':
      abiIncreaseRio = -0.02
      break;
    case 'c--':
      abiIncreaseRio = -0.03
      break;
  }
  return abiIncreaseRio
}

function getDeltPlayTimeDaily (video) {
  return parseInt(Math.pow(video.rePlaytime / 3, video.day)) 
}

function getDeltLikeDaily (video) {
  return parseInt(Math.pow(video.reLike / 4, video.day)) 
}

function getUpdateCommitsDaily (video) {
  let deltptime = getDeltPlayTimeDaily(video)
  let deltcommit = parseInt(Math.pow(rtnCommitsLen(deltptime, video) / 2, video.day))
  let newCommits = rtnCommitsByQual(video, deltcommit)
  newCommits = newCommits.sort(function () {
    return Math.random() > .5 ? -1 : 1;   
  })
  return newCommits
}

function getFollowerChangeDaily (video) {
  let userFollDis = Gau(20, 0.05)
  let deltptime = getDeltPlayTimeDaily(video)
  let deltlike = getDeltLikeDaily(video)
  return deltptime * userFollDis.ppf(Math.random()) / 100 + deltlike / 2
}

export {
  getScoreFromVideo,
  getRandomUserAbilities,
  getAddGoldDependVideo,
  getPlaytimeDependVideo,
  getLikeDependVideo,
  getCommitDependVideo,
  enhanceAbilityByVideo,
  getDeltPlayTimeDaily,
  getDeltLikeDaily,
  getUpdateCommitsDaily,
  getFollowerChangeDaily
}