<template>
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
    <div class="dt-button" v-if="item.finishStatus===100&&!item.online" @click="publish(index, item)">
      <a href="#">publish</a>
    </div>
    <div class="dt-button" v-if="item.finishStatus!==100&&!item.online" @click="continuee(index, item)">
      <a href="#">continue make</a>
    </div>
    <div class="dt-button" @click="remove(index, item)">
      <a href="#">remove</a>
    </div>
    <div v-if="item.online">online!</div>
</template>

<script>
export default {
  data () {
    return {
        title: '',
        type: '',
        style: '',
        quality: '',
        innerQuality: '',
        score: '',
        playtime: 0,
        like: 0,
        commits: [],
        progress: 0,
        online: false,
        last: 0,
        id: null
    }
  },
  methods: {
    save: function () {

    },
    fetch: function () {

    },
    publish: function () {
    },
    remove: function () {
    },
    make: function () {
    },
    update: function () {
    }
  }
  // watch: {
  //     list: {
  //       handler: function () {
  //           this.$emit('update', this.list)
  //       },
  //       deep: true
  //     }
  // },
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
