<template>
  <div>
    <x-header>
      <svg class="header-index-icon" aria-hidden="true" slot="overwrite-left" @click="jumpTo('index')" >
        <use :xlink:href="'#icon-zhuye2'"></use>
      </svg>
      {{ title }}
      
      <svg class="header-release-icon" aria-hidden="true" slot="right" @click="jumpTo('release')" >
        <use :xlink:href="'#icon-fabu5'"></use>
      </svg>
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
      this.$router.push({ name: url })
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
  left: 3px;
  width: 2em;
  height: 2em;
  fill: #fff;
  cursor: pointer;
}
.header-release-icon {
  position: relative;
  top: -5px;
  right: 3px;
  width: 2em;
  height: 2em;
  cursor: pointer;
}
</style>
