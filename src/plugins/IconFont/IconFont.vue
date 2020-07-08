<template>
  <svg
    class="icon"
    aria-hidden="true">
    <use :xlink:href="iconTag"/>
  </svg>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    type: {
      type: String,
      required: true,
      defualt: ''
    }
  },
  computed: {
    iconTag () {
      return `#${this.type}`
    }
  }
}
</script>

<style lang="sass" scoped>
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
</style>
