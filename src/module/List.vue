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
      <div class="dt-button" v-if="item.finishStatus===100&&!item.online" @click="publish(item)">
          <a href="#">publish</a>
      </div>
      <div class="dt-button" v-if="item.finishStatus!==100&&!item.online" @click="continuee(item)">
          <a href="#">continue make</a>
      </div>
      <div class="dt-button" @click="remove(item)">
          <a href="#">remove</a>
      </div>
      <div v-if="item.online">online!</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Video } from './video.js'
import { itemStore } from './store.js'
export default {
  data () {
    return {
        // list: []
        list: itemStore.fetch()
    }
  },
  methods: {
    addNew: function (props, my) {
      let newVideo = new Video(props)
      newVideo.calInnerQual()
      newVideo.updateFinishStatus()
      this.list.push(newVideo)
      return newVideo
    },

    continuee: function (video) {
      this.updateFinishStatus(video)
      this.$emit('oncontinuee', video)
    },

    publish: function (video) {
      video.publish()
      this.$emit('onpublish', video)
      // this.$emit('publish', index, item)
    },

    remove: function (video) {
      this.list.$remove(video)
    },

    dayBoost: function () {
      _.forEach(this.list, function(video) {
        video.dayBoost()
      })
    },

    updateFinishStatus: function (item) {
      item.finishStatus = item.finishStatus + 100 * item.quality.finishStatus
    },


  },
  watch: {
      list: {
        handler: function (newList) {
          itemStore.save(newList)
        },
        deep: true
      }
  },
  // events: {
  //   'refresh-list': function () {
  //       this.list = itemStore.fetch()
  //   }
  // }
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
