<template>
  <section class="checkout-section">
    <h3>Estamos quase lá!</h3>
    <span class="info">Insira seus dados de pagamento abaixo:</span>

    <div class="cards-flag-container">
      <img src="@/assets/mastercard-flag.png">
      <img src="@/assets/dinnersclub-flag.png">
      <img src="@/assets/americanexpress-flag.png">
      <img src="@/assets/visa-flag.png">
      <img src="@/assets/elo-flag.png">
    </div>

    <span class="payment-gateway">
      Pagamentos por
      <img src="@/assets/iugu-mark.png" />
    </span>

    <div class="form-credit-card">
      <InputText
          v-model="userCreditData.creditCardNumber"
          class="input"
          label="Número do cartão"
          placeholder="0000 0000 0000 0000"
          mask="#### #### #### ####" />
      <div>
        <InputText
            v-model="userCreditData.creditCardExpirationDate"
            class="input"
            label="Validade"
            placeholder="MM/AA"
            mask="##/##" />

        <InputText
            v-model="userCreditData.creditCardCVV"
            class="input"
            label="CVV"
            placeholder="000"
            mask="###" />
      </div>

      <InputText
          v-model="userCreditData.creditCardHolder"
          class="input"
          label="Nome impresso no cartão"
          placeholder="Seu nome" />

      <InputText
          v-model="userCreditData.creditCardCPF"
          class="input"
          label="CPF"
          placeholder="000.000.000-00"
          mask="###.###.###-##" />

      <InputText
          v-model="userCreditData.couponCode"
          class="input"
          label="Cupom"
          placeholder="Insira aqui" />

      <InputSelect
          v-model.number="userCreditData.installments"
          class="input"
          label="Número de parcelas"
          :options="installments" />
    </div>

    <Button
        @click="finalizeCheckout"
        title="Finalizar pagamento" />
  </section>
</template>

<script lang="ts">

import InputText from "@/components/InputText.vue"
import InputSelect from "@/components/InputSelect.vue"
import Button from "@/components/Button.vue";
import { UserCreditData } from "@/types/UserCreditData";
import { useStore } from "vuex";
import {computed, defineComponent, PropType, ref, toRefs, watch} from "vue";

export default defineComponent({
  name: "FormCreditCard",

  components: {
    InputText,
    InputSelect,
    Button
  },

  props: {
    offerSelectedId: {
      type: Number as PropType<number>
    }
  },

  setup (props, context) {
    const store = useStore()
    const userCreditData = ref<UserCreditData>({
      couponCode: null,
      creditCardCPF: "",
      creditCardCVV: "",
      creditCardExpirationDate: "",
      creditCardHolder: "",
      creditCardNumber: "",
      gateway: "iugu",
      installments: 1,
      offerId: 0,
      userId: 1
    })

    const finalizeCheckout = () => {
      context.emit('finalizeCheckout', userCreditData.value)
    }

    const installments = computed(() => {
      const offerSelected = store.getters.getOfferById(props.offerSelectedId)
      return [...Array(offerSelected?.installments).keys()].map(i => {
        const value = i + 1
        return { id: value, value: value }
      })
    } )

    return {
      installments: installments,
      userCreditData: userCreditData,
      finalizeCheckout: finalizeCheckout
    }
  }
})
</script>

<style lang="scss" scoped>
.checkout-section {
  display: flex;
  flex-direction: column;
  color: #151516;

  h3 {
    margin: 0 0 38px;
  }

  .info {
      margin-bottom: 70px;
  }

  .cards-flag-container {
    margin-bottom: 10px;
    align-self: center;

    img {
      width: 45px;
      margin-right: 25px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .form-credit-card {
    .input {
      margin-bottom: 45px;
    }

    div {
      display: flex;

      :first-child {
        margin-right: 100px;
      }
    }
  }

  .payment-gateway {
    display: flex;
    align-items: center;
    color: #e1dee8;
    margin-bottom: 15px;
    align-self: center;

    img {
      margin-left: 15px;
    }
  }
}
</style>