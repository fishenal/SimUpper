import Gau from 'gaussian'
import _ from 'lodash'
import { staticData } from '../depends/staticData'

function randomUserAbilities () {
  let abilities = [];
  // 能力高斯随机
  let abilityDis = Gau(50, 0.05)
  _.forEach(vTypeList, function(item, key) {
    abilities.push({
      label: item.label,
      abi: abilityDis.ppf(Math.random())
    })
  })
  myinfo.abilities = abilities
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

export {
  getScoreFromVideo,

}