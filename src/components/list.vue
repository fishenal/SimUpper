<template>
  <div class="up-list">
    <div class="up-item" v-for="item in list">
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
      <div class="dt-button" v-on:click="publish">
          <a href="#">publish</a>
      </div>
      <div class="dt-button" v-on:click="continuee">
          <a href="#">continue make</a>
      </div>
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
    continuee: function () {},
    publish: function () {}
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
