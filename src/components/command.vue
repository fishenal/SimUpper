<template>
<div class="dt-box">
    <div class="dt-item-4">
        <div class="dt-button" v-on:click="publish">
            <a href="#">publish</a>
        </div>
    </div>
    <div class="dt-item-4">
        <div class="dt-button" v-on:click="practice">
            <a href="#">practice</a>
        </div>
    </div>
    <div class="dt-item-4">
    </div>  
</div>
<publish></publish>
  
</template>

<script>
import Publish from '../dialogs/publish.vue'
export default {
  data () {
    return {
    }
  },
  components: {Publish},
  methods: {
    publish: function () {
        this.$broadcast('show-publish')
    },
    practice: function () {

    }
  }
}
</script>

<style scoped>
    .dt-box {
        width: 100%;
    }
</style>
