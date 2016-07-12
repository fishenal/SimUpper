<template>
<div class="up-dialog">
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
<div class="up-cover" @click="hide">
    
</div>
</template>

<script>
import _ from 'lodash'
import { vTypeList, vStyleList, vQualityList } from '../module/data.js'
let itemModel = {
  title: null,
  type: null,
  style: null,
  quality: null,
  videoInnerQuality: 0,
  playtime: 0,
  like: 0,
  commits: [],
  finishStatus: 0,
  online: false,
  day: 0
}
class ItemModel {
  constructor (item) {
    this.model = item
  }
}

export default {
  // props: ['isshow', 'typelist', 'stylelist', 'qualitylist'],
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
  created: function () {
    this.$on('show-make-pop', this.show)
  },
  watch: {
  },
  events: {
    'show-make-pop': function () {
      console.log('here')
    }
  },
  methods: {
    show: function () {
      console.log('here')
    },
    submit: function () {
        let newItem = _.assign(itemModel, {
          type: this.vtype,
          style: this.vstyle,
          quality: this.vquality,
          title: this.vtitle
        })
        this.$emit('make', newItem)
        this.$emit('onclose')
    },
    hide: function () {
        this.$emit('onclose')
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
