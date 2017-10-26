<template>
  <div>
    <!-- header index -->
    <header-index :title="'发布'"></header-index>

    <!-- release info step -->
    <form-step></form-step>

    <!-- bottom-tab-bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import HeaderIndex from "@/components/common/HeaderIndex";
import FormStep from "@/components/formStep/FormStep";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    "header-index": HeaderIndex,
    "form-step": FormStep,
    "bottom-tab-bar": BottomTabBar
  }
};
</script>
