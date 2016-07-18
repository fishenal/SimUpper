<template>
  <div class="up-list">
    <div class="up-item" v-for="(index, item) in list">
      <div>
          <h1>{{item.title}} </h1>
      </div>
      <div class="up-detail">
          <span>一个{{item.style.label}}的{{item.type.label}}视频</span>
          <span>质量： {{item.quality.label}}</span>
          <span>完成度：{{item.finishStatus }} %</span>
          <span>视频评分：{{item.score}}</span>
          <span>视频持续天数：{{item.day}}</span>
          <span>play times: {{item.playtime}}</span>
          <span>like: {{item.like}}</span>
          <span>commits: {{item.commits.length}}</span>

          <ul>
            <li v-for="cont in item.commits" track-by="$index">
              {{ cont.cont }}
            </li>
          </ul>
      </div>
      <div class="dt-button" v-if="item.finishStatus===100&&!item.online" @click="publishVideo($index)">
          <a href="#">publish</a>
      </div>
      <div class="dt-button" v-if="item.finishStatus!==100&&!item.online" @click="continueVideo($index)">
          <a href="#">continue make</a>
      </div>
      <div class="dt-button" @click="removeVideo(item)">
          <a href="#">remove</a>
      </div>
      <div v-if="item.online">online!</div>
    </div>
  </div>
</template>

<script>
import { removeVideo, publishVideo, continueVideo } from '../vuex/actions'
export default {
  vuex: {
    getters: {
      list: state => state.videoList
    },
    actions: {
      removeVideo,
      publishVideo,
      continueVideo
    }
  }
}
</script>

<style scoped>
    .up-item {
        border-bottom: 2px solid;
        margin-bottom: 50px;
    }
    .up-detail span {
        margin-right: 15px;
    }
</style>
