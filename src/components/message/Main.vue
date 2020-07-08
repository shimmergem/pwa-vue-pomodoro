<template>
<transition name="Message2-fade">
  <div class="wrapper">
    <div class="container">
      {{message}}
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Message2',
  data() {
    return {
      display: true,
      message: '村长喊你去搬砖',
    }
  },
  methods: {
    close() {
      this.display = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper {
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    .container {
      display: flex;
      margin-top: 20px;
      font-size: 34px;
    }
  }
</style>