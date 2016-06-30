<template>
  <div class="dt-box">
    <div class="dt-item-4">
        <img src="../img/avatar.jpg">
    </div>
    <div class="dt-item-8">
        <ul class="dt-list-3 dt-light">
          <li>username: {{attr.username}}</li>
          <li>follower: {{attr.follower}}</li>
          <li>publish: {{attr.publish}}</li>
          <li>abilities: {{attr.abilities}}</li>
        </ul>   
    </div>  
  </div>
</template>

<script>
import { myStore, itemStore } from '../module/store.js'
function setAttr () {
  let attr = myStore.fetch()
  attr.username = 'test'
  attr.follower = 100
  attr.publish = itemStore.fetch().length
  attr.abilities = {
    humor: 56,
    video: 67,
    techs: [50,60,70,80,50,40,50,90,68]
  }
  myStore.save(attr)
  return attr
}
export default {
  data () {
    let attr = setAttr()
    return {
      attr: attr
    }
  }
}
</script>

<style scoped>

</style>
