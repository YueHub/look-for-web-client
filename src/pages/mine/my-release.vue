<template>
  <div>
    <header-back :title="'我的发布'"></header-back>
    <div class="cell-list">
      <panel :list="list" :type="'5'" @on-img-error="onImgError"></panel>
    </div>
  </div>
</template>

<script scoped>
import HeaderBack from "@/components/common/HeaderBack";
import { Panel } from "vux";

export default {
  components: {
    "header-back": HeaderBack,
    'panel': Panel
  },
  data() {
    return {
      list: [
        {
          src: "http://somedomain.somdomain/x.jpg",
          fallbackSrc: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "标题一",
          desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/infoboard",
          meta: {
            source: "来源信息",
            date: "时间",
            other: "其他信息"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.cell-list {
  padding-top: 46px;
  padding-bottom: 55px;
}
</style>


