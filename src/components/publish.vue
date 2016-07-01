<template>
<div class="up-dialog" v-show="isshow">
    <h2>Publish Video</h2>
    <form class="dt-form">
        <div class="dt-form-line">
          <div class="dt-form-label">title:</div>
          <div class="dt-form-input">
            <input type="text" class="dt-input" v-model="vtitle" placeholder="enter title"></input>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">style:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vtype">
              <option v-for="item in vTypeList" v-bind:value="item">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">type:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vstyle">
              <option v-for="item in vStyleList"  v-bind:value="item">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">quality:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="vquality">
              <option v-for="item in vQualityList" v-bind:value="item">{{item.label}}</option>
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
<div class="up-cover" v-show="isshow" @click="hide">
    
</div>
</template>

<script>
import { vTypeList, vStyleList, vQualityList } from '../module/data.js'

export default {
  props: ['isshow', 'typelist', 'stylelist', 'qualitylist'],
  data () {
    return {
        vTypeList: vTypeList,
        vStyleList: vStyleList,
        vQualityList: vQualityList,
        vtype: null,
        vstyle: null,
        vquality: null,
        vtitle: null
    }
  },
  watch: {
    // list: {
    //   handler (newList) {
    //     itemStore.save(newList)
    //     this.$dispatch('on-publish')
    //   },
    //   deep: true
    // }
  },
  methods: {
    submit: function () {
        this.$emit('addnewitem', this.vtype, this.vstyle, this.vquality, this.vtitle)
        this.$emit('hide')
        // let playtime = 0;
        // let myAttr = myStore.fetch();
        // playtime += myAttr.follower + myAttr.follower * 0.6
        // playtime += myAttr.publish + myAttr.publish * 7

        // myAttr.power -= this.vQuality.costPower
        // let finishStatus = this.vQuality.finishStatus

        // this.list.push({
        //     title: this.title,
        //     type: this.vtype,
        //     style: this.vstyle,
        //     playtime: playtime,
        //     finishStatus: finishStatus
        // })
        // this.isshow = false
    },
    hide: function () {
        this.$emit('hide')
    },
    selectStyle: function (item) {
        this.vstyle = item;
    },
    selectType: function (item) {
        this.vtype = item;
    },
    selectQuality: function (item) {
        this.vquality = item;
    }
  }
}
</script>

<style scoped>
</style>
