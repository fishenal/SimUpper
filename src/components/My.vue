<template>
  <div class="dt-box">
    <div class="dt-item-4">
        <img src="../img/avatar.jpg">
    </div>
    <div class="dt-item-8">
        <ul class="dt-list-3 dt-light">
          <li>name: {{name}}</li>
          <li>follower: {{follower}}</li>
          <li>publish: {{publishNum}}</li>
          <li>power: {{power}}</li>
          <li>gold: {{gold}}</li>
        </ul>
        <h2>技能</h2>
        <ul class="dt-list-3 dt-light">
          <li v-for="(key, val) in abilities">
            {{ key }} : {{ val }}
          </li>
        </ul>
        <h2>风格</h2>
        <ul class="dt-list-3 dt-light">
          <li v-for="(key, val) in styleAbilities">
            {{ key }} : {{ val }}
          </li>
        </ul>  
    </div>  
  </div>
  <div class="dt-box">
      <div class="dt-item-8">
          <h3 class="dt-light">day {{day}}</h3>
      </div>
      <div class="dt-item-2">
          <div class="dt-button" @click="clickNextDay">
              <a href="#">next</a>
          </div>
      </div>  
  </div>
</template>

<script>
import { nextDay, randomAbilities, dailyChange } from '../vuex/actions'
export default {
  vuex: {
    getters: {
      day: state => state.day,
      name: state => state.name,
      follower: state => state.follower,
      power: state => state.power,
      gold: state => state.gold,
      publishNum: state => state.videoList.length,
      abilities: state => state.abilities,
      styleAbilities: state => state.styleAbilities,
      abiChangeLog: state => state.abiChangeLog,
      styleAbiChangeLog: state => state.styleAbiChangeLog
    },
    actions: {
      nextDay,
      randomAbilities,
      dailyChange
    }
  },
  watch: {
    gold: function (val, oldval) {
      if (val < 0) {
        this.$dispatch('alert', '金币花完了')
        return
      }
      this.$dispatch('changeLog', {
        content: '金币:' + oldval + '->' + val
      })
    },
    power: function (val, oldval) {
      this.$dispatch('changeLog', {
        content: '体力:' + oldval + '->' + val
      })
    },
    day: function (val, oldval) {
      this.$dispatch('changeLog', {
        content: '第' + val + '天'
      })
    },
    publishNum: function (val, oldval) {
      this.$dispatch('changeLog', {
        content: '发布数:' + oldval + '->' + val
      })
    },
    abiChangeLog: function (val, oldval) {
      // 0 - type 1 - origin val 2 - addtion
      if (val[1] !== val[2]) {
        let newVal = val[1] + val[2]
        this.$dispatch('changeLog', {
          content: val[0] + ':' + val[1] + '->' +newVal
        })  
      }
    },
    styleAbiChangeLog: function (val, oldval) {
      // 0 - type 1 - origin val 2 - addtion
      if (val[1] !== val[2]) {
        let newVal = val[1] + val[2]
        this.$dispatch('changeLog', {
          content: val[0] + ':' + val[1] + '->' +newVal
        })  
      }
    }
  },
  ready: function () {
    this.$dispatch('changeLog', {
      content: '第' + this.day + '天'
    })
    this.randomAbilities()
  },
  methods: {
    clickNextDay: function () {
      this.abilities['游戏'] = 150
      this.nextDay();
      this.dailyChange();
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