<template>
  <div id="vux_view_box_body">
    <x-header></x-header>
    <form-step></form-step>
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import XHeader from '@/components/common/HeaderIndex'
import FormStep from '@/components/formStep/FormStep'
import TabBar from '@/components/common/BottomTabBar'

export default {
  components: {
    'x-header': XHeader,
    'form-step': FormStep,
    'bottom-tab-bar': TabBar
  }
}
</script>

<style scoped>

</style>
