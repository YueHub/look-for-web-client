<template>
  <div>
    <x-header>
      <x-icon class="header-index-icon" slot="overwrite-left" type="home" size="30" @click="jumpTo('index')"></x-icon>
      {{ title }}
      <a slot="right">发布</a>
    </x-header>
  </div>
</template>

<script scoped>
import { XHeader } from "vux";

export default {
  components: {
    XHeader
  },
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    jumpTo: function(url) {
      this.$router.push({ name: url });
    }
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
.header-index-icon {
  position: relative;
  top: -5px;
  left: -3px;
  fill: #fff;
}
</style>
