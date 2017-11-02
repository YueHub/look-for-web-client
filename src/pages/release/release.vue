<template>
  <div>
    <!-- header index -->
    <header-index :title="'发布'"></header-index>

    <!-- release info step -->
    <div class="form-step">
      <form-step></form-step>
    </div>
    
    <!-- bottom-tab-bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import HeaderIndex from "@/components/common/HeaderIndex"
import FormStep from "@/components/formStep/FormStep"
import BottomTabBar from "@/components/common/BottomTabBar"

export default {
  components: {
    "header-index": HeaderIndex,
    "form-step": FormStep,
    "bottom-tab-bar": BottomTabBar
  }
};
</script>

<style scoped>
.form-step {
  margin-top: 2.5em;
}
</style>
