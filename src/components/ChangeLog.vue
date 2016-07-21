<template>
<div class="change-log">
    <ul>
      <li v-for="(index, item) in logs">
        {{ $index }}  {{ item.content }}
      </li>  
    </ul>
    
</div>
</template>

<script>
export default {
  data () {
    return {
      logs: []
    }
  },
  methods: {
    add: function (log) {
      this.logs.push(log)
    }
  }
}
</script>

<style scoped>
.change-log {
  position: fixed;
  height: 150px;
  overflow: auto;
  background: orange;
  bottom: 0;
  width: 100%;
}
.expand-transition {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
</style>
