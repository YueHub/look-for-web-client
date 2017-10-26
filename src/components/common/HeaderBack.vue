<template>
  <div>
    <x-header :title="title"></x-header>
  </div>
</template>

<script scoped>
import { XHeader } from "vux";

export default {
  props: ['title'],
  components: {
    XHeader
  }
};
</script>

<style scoped>
.vux-header {
  position: fixed;
  top: 0;
  padding: 3px 0;
  width: 100%;
  z-index: 500;
}
</style>