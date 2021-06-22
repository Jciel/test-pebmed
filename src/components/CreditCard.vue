<template>
  <section class="credit-card-info">
    <div class="card-header">
      <div class="star-icon">
        <img src="@/assets/star.png">
      </div>

      <div class="price-info">
        <span>{{ offerData.period }} | {{ offerData.description }}</span>
        <span>
          {{ offerData.finalValue.toLocaleString('pt-br', configCurrency) }} | {{ userCreditData.installments }}x {{ installmentsPrice.toLocaleString('pt-br', configCurrency) }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <div>
        <span>E-mail</span>
        {{ userEmail }}
      </div>
      <div>
        <span>CPF</span>
        {{ userCreditData.creditCardCPF }}
      </div>
    </div>

  </section>
</template>

<script lang="ts">

import {defineComponent, onBeforeMount, PropType, ref, toRef} from "vue";
import {Offer} from "@/types/Offer";
import {UserCreditData} from "@/types/UserCreditData";
import {useStore} from "vuex";

export default defineComponent({
  name: "CreditCard",

  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true
    },

    email: {
      type: String as PropType<string>
    }
  },

  setup(props) {
    const store = useStore()
    const configCurrency = { style: 'currency', currency: 'BRL' }

    let installmentsPrice = ref(0)
    const userCreditData: UserCreditData = store.getters.userCreditCard

    onBeforeMount(() => {
      installmentsPrice.value = (props.offer.fullPrice - props.offer.discountAmmount) / userCreditData.installments

      console.log("installmentsPrice: ", installmentsPrice)
    })

    return {
      configCurrency: configCurrency,
      installmentsPrice: installmentsPrice,
      userCreditData: userCreditData,
      offerData: props.offer,
      userEmail: props.email
    }
  }
})

</script>

<style lang="scss" scoped>
.credit-card-info {
  box-shadow: rgb(98, 98, 98, 0.1) 0 0 24px 2px;
  padding: 20px;

  .card-header{
    display: flex;
    justify-content: space-between;
    background-color: #f4f3f6;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;

    .star-icon {
      width: max-content;
      border-radius: 50%;
      background-color: #e1dee8;
      padding: 10px;
      margin-right: 50px;
    }

    .price-info {
      display: flex;
      flex-direction: column;
    }
  }

  .card-body {
    font-size: 0.9em;
    color: #151516;

    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        color: #c9c5d4;
      }
    }
  }
}
</style>