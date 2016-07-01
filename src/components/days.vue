<template>
<div class="dt-box">
    <div class="dt-item-8">
        <h3 class="dt-light">day {{day}}</h3>
    </div>
    <div class="dt-item-2">
        <div class="dt-button" v-on:click="nextDay">
            <a href="#">next</a>
        </div>
    </div>  
</div>
  
</template>

<script>
export default {
    props: ['day'],
    methods: {
        nextDay: function () {
            this.$emit('nextday')
        }
    }
}
</script>

<style scoped>
    .dt-box {
        width: 100%;
    }
</style>
