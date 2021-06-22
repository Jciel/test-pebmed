<template>
  <section class="plan-cards-section">
    <h3>Confira seu plano:</h3>

    <div class="user-email">{{ email }}</div>

    <div class="cards-container">
      <plan-card
          @input="selectPlan"
          class="card"
          v-for="offer in offersData"
          :key="offer.id"
          :offer="offer" />
    </div>


    <span class="help">
      Sobre a combrança
      
      <img src="@/assets/question-icon.svg" />
    </span>
  </section>
</template>

<script lang="ts">

import PlanCard from "@/components/PlanCard.vue"
import { Offer } from "@/types/Offer"
import {defineComponent, defineEmit, PropType, toRefs} from "vue";

export default defineComponent({
  name: "PlanCardsSection",

  components: {
    PlanCard
  },

  props: {
    offers: {
      type: Array as PropType<Array<Offer>>
    },

    userEmail: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup(props, context) {
    const { offers } = toRefs(props)

    const selectPlan = (planId: number) => {
      context.emit('input', planId)
    }

    return {
      offersData: offers,
      email: props.userEmail,
      selectPlan: selectPlan
    }
  }
})

</script>

<style lang="scss" scoped>
.plan-cards-section {
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 15px;
  }

  .user-email {
    width: max-content;
    border: 2px solid #f4f3f6;
    border-radius: 50px;
    padding: 10px;
    margin-bottom: 60px;
  }

  .cards-container {
    margin-bottom: 67px;

    .card {
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .help {
    display: flex;
    color: #151516;
    font-weight: bold;
    font-size: 0.8em;
    align-self: center;

    img {
      margin-left: 15px;
      width: 20px;
    }
  }
}
</style>