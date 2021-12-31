<template>
  <div class="_container">
    <input v-on:keyup.13="submit">
    <input v-on:keyup.enter="submit">
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    Vue.config.keyCode= { f1: 112 }
  }
}
</script>

<style scoped lang="scss">

</style>