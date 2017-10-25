<template>
  <div>
    <!-- header index -->
    <header-index :title="'主页'"></header-index>
    <!-- acticle list panel -->
    <panel header="众寻列表" :list="list" :type="'5'" @on-img-error="onImgError"></panel>
    <!-- bottom tab bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import HeaderIndex from "@/components/common/HeaderIndex";
import { Panel } from "vux";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    "header-index": HeaderIndex,
    "panel": Panel,
    "bottom-tab-bar": BottomTabBar
  },
  data () {
    return {
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/acticle',
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }]
    }
  },
  mounted () {
    // 挂载后异步调用后台接口获取 list 
  },
  methods: {
    onImgError(item, $event) {
      $event;
      // console.log(item, $event)
    }
  }
};
</script>
