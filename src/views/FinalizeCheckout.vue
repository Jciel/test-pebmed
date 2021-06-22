<template>
  <section class="finalize-checkout">
    <SuccessSimbol />

    <h3>Parabéns!</h3>
    <span>Sua assinatura foi realizada com sucesso</span>

    <CreditCard
        class="card"
        :userCreditData="userCreditData"
        :offer="offerSelected"
        :email="userEmail" />

    <a href="#">Gerenciar assinatura</a>

    <Button
        title="IR PARA HOME"/>
  </section>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { useStore } from "vuex";
import SuccessSimbol from "@/components/SuccessSimbol.vue";
import CreditCard from "@/components/CreditCard.vue"
import Button from "@/components/Button.vue";
import { UserCreditData } from "@/types/UserCreditData";
import { Offer } from "@/types/Offer";

export default defineComponent({
  name: "FinalizeCheckout",

  components: {
    SuccessSimbol,
    CreditCard,
    Button
  },

  setup () {
    const store = useStore()

    const userEmail: string = store.getters.userEmail
    const userCreditData: UserCreditData = store.getters.userCreditCard
    const offerSelected: Offer = store.getters.getOfferById(userCreditData.offerId)

    return {
      userCreditData: userCreditData,
      offerSelected: offerSelected,
      userEmail: userEmail
    }

  }
})
</script>

<style lang="scss" scoped>
.finalize-checkout {
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    flex-wrap: wrap;
    color: #c9c5d4;
    margin-bottom: 20px;
  }

  .card {
    margin-bottom: 100px;
  }

  a {
    color: #191847;
    font-weight: bold;
    text-decoration: none;
    margin-bottom: 40px;
  }
}
</style>