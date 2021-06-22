<template>
  <section class="input-section">
    <label class="label-input-text">
      {{ labelInput }}
    </label>
    <input
        @input="$emit('update:modelValue', $event.target.value)"
        v-maska="maskInput"
        type="text"
        :placeholder="placeholder" />
  </section>
</template>

<script lang="ts">

import {defineComponent, PropType, toRefs} from "vue";

export default defineComponent({
  name: "InputText",

  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },
    mask: {
      type: String as PropType<string> | [] as PropType<Array<string>>,
      default: ''
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    value: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup(props) {

    // const { value } = toRefs(props)

    return {
      labelInput: props.label,
      maskInput: props.mask,
      valueInput: props.value,
      placeholderInput: props.placeholder
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

  input {
    border: none;
    border-bottom: 2px solid #f4f3f6;
    outline: none;
    color: #666173;
    padding: 5px 0;
    font-size: 1em;

    &::placeholder {
      color: #e1dee8;
    }

    &:focus {
      border-bottom-color: #e0dfe2;
    }
  }
}

</style>