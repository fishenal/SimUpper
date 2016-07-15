<template>
  <div class="up-list">
    <button @click="test">test</button>
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
import { Video, videoWorkshop } from './video.js'
import { itemStore, myStore } from './store.js'
export default {
  data () {
    return {
        // list: []
        list: itemStore.fetch()
    }
  },
  ready: function () {
    // videoWorkshop.eventBus.saveMy = function (myStore) {
    //   this.$emit('onmyupdate', myStore)
    // }.bind(this)
    videoWorkshop.eventBus.onPublish = function (video) {
      // calculate gold boost
      let _myStore = myStore.fetch()
      
      if ( (video.like / video.playtime) > 0.8 ) {
        _myStore.gold += 50
      }
      else if ( (video.like / video.playtime) > 0.5 ) {
        _myStore.gold += 30
      }
      else if ( (video.like / video.playtime) > 0.3 ) {
        _myStore.gold += 10
      }
      _myStore.gold += Number(video.addGoodCommitsNum)

      this.$emit('onmyupdate', _myStore)
    }.bind(this)
  },
  events: {
    'gett': function () {
      console.log(1)
    }
  },
  methods: {
    test: function () {
      this.$dispatch('gett', 'my')
    },
    getMy: function () {
      this.$emit('getmy')
    },
    updateMy: function (newMy) {
      this.$emit('updatemy', newMy)
    },
    addNew: function (props, my) {
      let newVideo = new Video(props)
      let score = newVideo.calInnerQual()
      let _myStore = myStore.fetch()
      if (score === 'a++') {
        _myStore.gold += 20
      }
      else if (score === 'a+') {
        _myStore.gold += 10
      }
      else if (score === 'a') {
        _myStore.gold += 5
      }

      this.$emit('onmyupdate', _myStore)
      newVideo.updateFinishStatus()
      this.list.push(newVideo)
      return newVideo
    },

    continuee: function (video) {
      let myInfo = myStore.fetch()
      if (myInfo.power < 100 * video.quality.costPower) {
        alert('not enough power')
        return
      }
      this.updateFinishStatus(video)
      this.$emit('oncontinuee', video)
    },

    publish: function (video) {
      videoWorkshop.publish(video)
      this.$emit('onpublish', video)
    },

    remove: function (video) {
      let _myStore = myStore.fetch()
      _myStore.follower -= _myStore.follower * _.random(.05, .1)
      this.list.$remove(video)
      this.$emit('onmyupdate', _myStore)
    },

    dayBoost: function () {
      let _myStore = myStore.fetch()
      _myStore.gold -= 100
      _myStore.power = 100
      _.forEach(this.list, function(video) {
        videoWorkshop.dayBoost(video)
        // if (video.day > 50) {
        //   _myStore.gold += 1
        // }
        _myStore.gold += Number(video.addGoodCommitsNum)
        _myStore.follower += Number(video.effectFollower)
      })
      this.$emit('onmyupdate', _myStore)
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
