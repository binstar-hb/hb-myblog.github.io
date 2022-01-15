<template>
  <div>
    <h1>Hello Vue 3.0 + Vite</h1>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        color: "red",
        backg: "blue"
      }
    }
  }
</script>

<style vars="{ color, backg}">
  h1{
    color: var(--color);
    background-color: var(--backg);
    text-align: center;
  }
</style>