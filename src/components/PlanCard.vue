<template>
  <section class="plan-card">
    <div class="title">{{ offerData.title }} | {{ offerData.description }}</div>

    <div class="values-details">
      <div class="values">
        De {{ offerData.fullPrice.toLocaleString('pt-br', configCurrency) }}  |  Por {{ offerData.finalValue.toLocaleString('pt-br', configCurrency) }}
      </div>

      <span class="discount-detail">
        {{ -offerData.discountPercent }}%
      </span>

      <input
          @input.prevent.stop="$emit('input', offerData.id)"
          name="plan"
          type="radio" />
    </div>
    <div class="installments-datail">
      {{ offerData.installments }}x de {{ offerData.installmentsPrice.toLocaleString('pt-br', configCurrency) }}/mês
    </div>
  </section>
</template>

<script lang="ts">

import { Offer } from "@/types/Offer"
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PlanCard",

  props: {
    offer: {
      type: Object as PropType<Offer>,
      require: true
    }
  },

  setup (props) {
    const configCurrency = {style: 'currency', currency: 'BRL'}

    return {
      configCurrency: configCurrency,
      offerData: props.offer
    }
  }
})
</script>

<style lang="scss" scoped>
.plan-card {
  font-family: DMSans-Regular;
  border: 2px solid #191847;
  border-radius: 28px;
  color: #191847;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  padding: 20px 20px;


  .title {
    font-weight: bold;
    padding-bottom: 5px;
  }

  .values-details {
    display: flex;
    align-items: center;
    padding-bottom: 5px;

    .values {
      margin-right: 15px;
    }

    .discount-detail {
      color: #ffffff;
      padding: 2px 15px;
      background-color: #f5850b;
      border-radius: 15px;
    }

    input {
      margin-left: auto;
      width: 18px;
      height: 18px;
      appearance: none;
      border: 3px solid #f4f3f6;
      border-radius: 50%;
      cursor: pointer;

      &:before {
        display: block;
        margin: 1px;
        content: '';
        width: 9px;
        height: 9px;
        background: #191847;
        border-radius: 50%;
        opacity: 0;
      }

      &:checked {
        &:before {
          opacity: 1;
        }
      }
    }
  }

  .installments-datail {
    color: #f5850b;
  }
}
</style>