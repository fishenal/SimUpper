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
          <span>play times: {{item.playtime}}</span>
          <span>like: {{item.like}}</span>
          <span>commit: {{item.commit}}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
        // list: itemStore.fetch()
    }
  },
  methods: {
    continuee: function (index, item) {
      this.$emit('continuemake', index, item)
    },
    publish: function (index, item) {
      this.$emit('publish', index, item)
    },
    remove: function (index, item) {
      this.$emit('remove', index, item)
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
