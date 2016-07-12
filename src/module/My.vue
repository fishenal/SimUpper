<template>
  <div class="dt-box">
    <div class="dt-item-4">
        <img src="../img/avatar.jpg">
    </div>
    <div class="dt-item-8">
        <ul class="dt-list-3 dt-light">
          <li>username: {{username}}</li>
          <li>follower: {{follower}}</li>
          <li>publish: {{publish}}</li>
          <li>power: {{power}}</li>
        </ul>
        <h2>技能</h2>
        <ul class="dt-list-3 dt-light">
          <li v-for="item in abilities">
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
          <div class="dt-button" @:click="nextDay">
              <a href="#">next</a>
          </div>
      </div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
        username: '',
        follower: 0,
        publish: 0,
        power: 0,
        abilities: {},
        day: 1
    }
  },
  methods: {
    // continuee: function (index, item) {
    //   this.$emit('continuemake', index, item)
    // },
    // publish: function (index, item) {
    //   this.$emit('publish', index, item)
    // },
    // remove: function (index, item) {
    //   this.$emit('remove', index, item)
    // }
    nextDay: function () {

    },
    save: function () {

    },
    fetch: function () {

    }
  }
  // watch: {
  //     list: {
  //       handler: function () {
  //           this.$emit('update', this.list)
  //       },
  //       deep: true
  //     }
  // },
  // events: {
  //   'refresh-list': function () {
  //       this.list = itemStore.fetch()
  //   }
  // }
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
