<template>
<div class="up-dialog" v-if="isShow">
    <h2>提醒：</h2>
    <p>{{ content }}</p>
</div>
<div class="up-cover" v-if="isShow" @click="hide">
</div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      content: ''
    }
  },
  methods: {
    show: function (content) {
      this.content = content
      this.isShow = true
    },
    hide: function () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
</style>
