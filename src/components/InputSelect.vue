<template>
  <section class="input-section">
    <label class="label-input-text" for="input-select">
      {{ labelInput }}
    </label>
    <select
      @input="$emit('update:modelValue', $event.target.value)"
      id="input-select">
      <option
        v-for="option in optionsInput"
        :key="option.id"
        :value="option.value">
        {{ option.value }}
      </option>
    </select>
  </section>
</template>

<script lang="ts">

import {defineComponent, PropType, toRefs} from "vue";

type Option = {id: any, value: any}

export default defineComponent({
  name: "InputSelect",

  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },

    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    }
  },

  setup(props) {

    const { options } = toRefs(props)

    return {
      labelInput: props.label,
      optionsInput: options,
    }
  }
})
</script>

<style lang="scss" scoped>
.input-section {
  display: flex;
  flex-direction: column;

  .label-input-text {
    font-weight: bold;
    font-size: 0.7em;
    color: #666173;
  }

  select {
    box-shadow: none;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-bottom: 2px solid #f4f3f6;
    outline: none;
    color: #666173;
    padding: 5px 0;
    font-size: 1em;
    //
    //&::placeholder {
    //  color: #e1dee8;
    //}
    //
    //&:focus {
    //  border-bottom-color: #e0dfe2;
    //}
  }
}
</style>