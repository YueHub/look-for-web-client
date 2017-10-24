<template>
  <div id="vux_view_box_body">
    <x-header></x-header>
    <tab></tab>
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import XHeader from '@/components/common/XHeader'
import Tab from '@/components/common/Tab'
import TabBar from '@/components/common/TabBar'

export default {
  components: {
    'x-header': XHeader,
    'tab': Tab,
    'bottom-tab-bar': TabBar
  }
}
</script>

<style scoped>

</style>
