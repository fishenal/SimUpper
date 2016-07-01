<template>
  <div class="dt-box">
    <div class="dt-item-4">
        <img src="../img/avatar.jpg">
    </div>
    <div class="dt-item-8">
        <ul class="dt-list-3 dt-light">
          <li>username: {{myinfo.username}}</li>
          <li>follower: {{myinfo.follower}}</li>
          <li>publish: {{myinfo.publish}}</li>
          <li>power: {{myinfo.power}}</li>
        </ul>   
    </div>  
  </div>
</template>

<script>
// import { myStore, itemStore } from '../module/store.js'
function setAttr () {
  let attr = myStore.fetch()
  attr.username = 'test'
  attr.follower = 100
  attr.publish = itemStore.fetch().length
  attr.power = 100
  // attr.abilities = {
  //   humor: 56,
  //   video: 67,
  //   techs: [50,60,70,80,50,40,50,90,68]
  // }
  myStore.save(attr)
  return attr
}
export default {
  props: ['myinfo'],
  watch: {
      myinfo: {
        handler: function () {
            this.$emit('update', this.myinfo)
        },
        deep: true
      }
  },
  data () {
    // let attr = setAttr()
    return {
      //
    }
  }
}
</script>

<style scoped>

</style>
