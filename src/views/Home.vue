<template>
  <div class="home">
    <PlanCardsSection
        @input="setSelectPlan"
        :offers="userOffers"
        :user-email="userEmail"/>

    <FormCreditCard
        @finalizeCheckout="finalizeCheckout"
        :offerSelectedId="offerSelected"
        :user-email="userEmail"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormCreditCard from "@/components/FormCreditCard.vue";
import PlanCardsSection from "@/components/PlanCardsSection.vue";
import { UserCreditData } from "@/types/UserCreditData";

export default defineComponent({
  name: "Home",
  components: {
    FormCreditCard,
    PlanCardsSection
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    let offers = ref({})
    const offerSelected = ref(0)
    const userEmail = 'fulano@siclano.com.br'

    offers = computed(() => store.getters.userOffers)

    onBeforeMount(() => { store.dispatch("findUserOffers") })

    const setSelectPlan = (planId: number) => offerSelected.value = planId

    const finalizeCheckout = (userCreditData: UserCreditData) => {
      userCreditData.offerId = offerSelected.value
      store.dispatch('setUserEmail', userEmail)
      store.dispatch('finalizeCheckout', userCreditData).then(res => {
        router.push('finalize-checkout')
      })
    }

    return {
      offerSelected: offerSelected,
      userOffers: offers,
      userEmail: userEmail,
      setSelectPlan: setSelectPlan,
      finalizeCheckout: finalizeCheckout
    }
  }
});
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>