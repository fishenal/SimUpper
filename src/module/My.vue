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
        <h2>技能</h2>
        <ul class="dt-list-3 dt-light">
          <li v-for="item in myinfo.abilities">
            {{ item.label }} : {{ item.abi }}
          </li>
        </ul>   
    </div>  
  </div>
  <div class="dt-box">
      <div class="dt-item-8">
          <h3 class="dt-light">day {{day}}</h3>
      </div>
      <div class="dt-item-2">
          <div class="dt-button" @click="nextDay">
              <a href="#">next</a>
          </div>
      </div>  
  </div>
</template>

<script>
import _ from 'lodash'
import Gau from 'gaussian'
import { vTypeList } from './data.js'
import { dayStore, myStore, itemStore } from './store.js'
export default {
  data () {
    let myinfo = {}
    if (myStore.isEmpty()) {
      myinfo.username = 'test222'
      myinfo.power = 100
      myinfo.follower = 100
      myinfo.publish = itemStore.fetch().length
      let abilities = [];
      // 能力高斯随机
      let abilityDis = Gau(50, 0.05)
      _.forEach(vTypeList, function(item, key) {
        abilities.push({
          label: item.label,
          abi: abilityDis.ppf(Math.random())
        })
      })
      myinfo.abilities = abilities
      myStore.save(myinfo)
    }
    else {
      myinfo = myStore.fetch()
    }
    
    return {
      day: dayStore.fetch(),
      myinfo: myinfo
    }
  },
  methods: {
    nextDay: function () {
      this.day ++
      this.myinfo.power = 100
      this.$emit('onnextday')
      // this.loopListPerDay()
    },
    save: function () {

    },
    fetch: function () {

    },
    /*
    * 技能强化
    * @depend this.myinfo.abilities
    * @depend item.type.label
    * @param item
    * @output this.myinfo.abilities
    */
    enhanceAbi: function (item) {
      _.forEach(this.myinfo.abilities, function(abi) {
        if (abi.label === item.type.label) {
        switch (item.score) {
          case 'a++':
            abi.abi += abi.abi * 0.03
            break;
          case 'a+':
            abi.abi += abi.abi * 0.02
            break;
          case 'a':
            abi.abi += abi.abi * 0.01
            break;
          case 'b':
            break;
          case 'c':
            abi.abi -= abi.abi * 0.01
            break;
          case 'c-':
            abi.abi -= abi.abi * 0.02
            break;
          case 'c--':
            abi.abi -= abi.abi * 0.03
            break;
        }
          
        }
      })
    },

    /*
    * 能量消耗
    * @depend item.quality.costPower
    * @param item
    * @output myinfo.power
    */
    costPower: function (item) {
      this.myinfo.power -= 100 * item.quality.costPower
    }
  },
  watch: {
    day: {
      handler: function (day) {
        dayStore.save(day)
      }
    },
    myinfo: {
      handler: function (my) {
        myStore.save(my)
      },
      deep: true
    }
  },
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
