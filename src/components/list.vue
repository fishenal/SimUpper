<template>
  <div class="up-list">
    <div class="up-item" v-for="item in list">
      <div>
          <h1>title: {{item.title}}</h1>
      </div>
      <div class="up-detail">
          <span>type: {{item.type}}</span>
          <span>play times: {{item.playtime}}</span>
          <span>like: {{item.like}}</span>
          <span>commit: {{item.commit}}</span>
      </div>  
    </div>
  </div>
</template>

<script>
import { itemStore } from '../module/store.js'

export default {
  data () {
    return {
        list: itemStore.fetch()
    }
  },
  events: {
    'on-publish': function () {
        this.list = itemStore.fetch()
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
