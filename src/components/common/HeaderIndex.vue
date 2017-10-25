<template>
  <div>
    <x-header>
      <x-icon class="header-index-icon" slot="overwrite-left" type="home" size="30" @click="jumpTo('Index')"></x-icon>
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
    jumpTo: function (url) {
      this.$router.push({ name: url })
    }
  }
};
</script>

<style scoped>
.header-index-icon {
  position: relative;
  top: -5px;
  left: -3px;
  fill: #fff;
}
</style>
