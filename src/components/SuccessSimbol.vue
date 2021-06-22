<template>
  <div class="success-simbol">
    <img src="@/assets/success.png">
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "SuccessSimbol"
})
</script>

<style lang="scss" scoped>
.success-simbol {
  border: 2px solid #f4f3f6;
  border-radius: 50%;
  width: max-content;
  padding: 30px;
}
</style>