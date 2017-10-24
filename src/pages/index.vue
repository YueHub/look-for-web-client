<template>
  <div>
    <!-- X-Header -->
    <x-header></x-header>
    <panel></panel>
    <!-- bottom tab bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import XHeader from '@/components/common/XHeader'
import Panel from '@/components/common/Panel'
import TabBar from '@/components/common/TabBar'

export default {
  components: {
    'x-header': XHeader,
    'panel': Panel,
    'bottom-tab-bar': TabBar
  }
}
</script>

<style scoped>

</style>

