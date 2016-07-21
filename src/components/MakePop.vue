<template>
<div class="up-dialog">
    <h2>Publish Video</h2>
    <form class="dt-form">
        <div class="dt-form-line">
          <div class="dt-form-label">title:</div>
          <div class="dt-form-input">
            <input type="text" class="dt-input" v-model="props.title" placeholder="enter title"></input>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">style:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="props.style">
              <option v-for="item in styleList" v-bind:value="item">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">type:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="props.type">
              <option v-for="item in typeList"  v-bind:value="item">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label">quality:</div>
          <div class="dt-form-input">
            <select class="dt-select" v-model="props.quality">
              <option v-for="item in qualityList" v-bind:value="item">{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="dt-form-line">
          <div class="dt-form-label"></div>
          <div class="dt-form-input">
            <div class="dt-button">
              <a href="#" @click="clickAddNew(props)">addNew</a>
            </div>
          </div>
        </div>
      </form> 
</div>
<div class="up-cover" @click="hide">
    
</div>
</template>

<script>
import { addNew } from '../vuex/actions'
export default {
  vuex: {
    getters: {
      styleList: state => state.staticData.styleList,
      typeList: state => state.staticData.typeList,
      qualityList: state => state.staticData.qualityList,
      power: state => state.power
    },
    actions: {
      addNew
    }
  },
  data () {
    return {
        props: {
            type: null,
            style: null,
            quality: null,
            title: null
        }
    }
  },
  methods: {
    clickAddNew: function (props) {
        if (this.power < props.quality.costPower) {
            this.$dispatch('alert', '体力不足以制作该类视频')
            return
        }
        this.addNew(props)
        this.hide()
    },
    hide: function () {
        this.$emit('onclose')
    }
  }
}
</script>

<style scoped>
</style>
