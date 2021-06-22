<template>
  <button
      class="btn">{{ titleButton }}</button>
</template>

<script lang="ts">

import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Button",

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props) {
    return {
      titleButton: props.title
    }
  }
})
</script>

<style lang="scss" scoped>
  .btn {
    width: max-content;
    font-size: 1em;
    background: #191847;
    color: #ffffff;
    border-style: outset;
    border-color: #191847;
    text-shadow: none;
    padding: 20px 160px;
    border-radius: 30px;
    cursor: pointer;
  }
</style>