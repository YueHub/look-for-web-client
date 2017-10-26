<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  store,
  name: "app"
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>
