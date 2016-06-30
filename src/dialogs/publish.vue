<template>
<div class="up-dialog" v-show="isShow">
    <h2>Publish Video</h2>
    <form class="dt-form">
        <div class="dt-form-line">
          <div class="dt-form-label">title:</div>
          <div class="dt-form-input">
            <input type="text" class="dt-input" v-model="title" placeholder="enter title"></input>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">type:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vtype">
              <option v-for="item in vTypeList" v-bind:value="item.label">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">style:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vstyle">
              <option v-for="item in vStyleList" v-bind:value="item.label">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">quality:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vquality">
              <option v-for="item in vQualityList" v-bind:value="item.label">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label"></div>
          <div class="dt-form-input">
            <div class="dt-button">
              <a href="#" @click="submit">submit</a>
            </div>
          </div>
        </div>
      </form> 
</div>
<div class="up-cover" v-show="isShow" @click="hide">
    
</div>
</template>

<script>
import { itemStore, myStore } from '../module/store.js'
import { vTypeList, vStyleList, vQualityList } from '../module/data.js'
// let itemStore = new Store('simupper-item-store')
console.log(myStore)
export default {
  data () {
    return {
        list: itemStore.fetch(),
        vTypeList: vTypeList,
        vStyleList: vStyleList,
        vQualityList: vQualityList,
        vtype: null,
        vstyle: null,
        title: null,
        isShow: false
    }
  },
  watch: {
    list: {
      handler (newList) {
        itemStore.save(newList)
        this.$dispatch('on-publish')
      },
      deep: true
    }
  },
  methods: {
    submit: function () {

        let playtime = 0;
        let myAttr = myStore.fetch();
        playtime += myAttr.follower + myAttr.follower * 0.6
        playtime += myAttr.publish + myAttr.publish * 7
        console.log(playtime)
        this.list.push({
            title: this.title,
            type: this.vtype,
            style: this.vstyle,
            playtime: playtime
        })
        this.isShow = false
    },
    hide: function () {
        this.isShow = false
    }
  },
  events: {
    'show-publish': function () {
        this.isShow = true
    }
  }
}
</script>

<style scoped>
</style>
