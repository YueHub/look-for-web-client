<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar>
      <tabbar-item selected link="/index">
        <img slot="icon" src="../../assets/logo.png">
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/publish">
        <img slot="icon" src="../../assets/vux_logo.png">
        <span slot="label">发布</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/mine">
        <img slot="icon" src="../../assets/vux_logo.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script scoped>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
