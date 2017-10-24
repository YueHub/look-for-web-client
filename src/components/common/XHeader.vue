<template>
  <div>
    <x-header>主页<a slot="right">Feedback</a></x-header>
  </div>
</template>

<script scoped>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  }
}
</script>

<style scoped>
.overwrite-title-demo {
  margin-top: 5px;
}
</style>
