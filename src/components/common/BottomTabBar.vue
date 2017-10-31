<template>
  <tabbar v-show="true">
    
    <!-- <tabbar-item selected show-dot badge="2" link="/index"> -->
    <tabbar-item :show-dot="showDot(bottomTabBarItem.name)" :badge="showBadge(bottomTabBarItem.name)" v-for="(bottomTabBarItem, index) in bottomTabBarItems" :key="bottomTabBarItem.id" :link="{path: bottomTabBarItem.link}" :selected="$route.path === bottomTabBarItem.link">
      <svg slot="icon" class="bottom-icon" aria-hidden="true">
        <use :xlink:href="'#' + bottomTabBarItem.icon"></use>
      </svg>
      <span slot="label">{{ bottomTabBarItem.content }}</span>
    </tabbar-item>
  </tabbar>
</template>

<script scoped>
import { Cell, Group, Tabbar, TabbarItem, Badge } from "vux";
import { mapState } from "vuex";

export default {
  components: {
    Cell,
    Group,
    Tabbar,
    TabbarItem,
    Badge
  },
  computed: {
    ...mapState(['bottomTabBarItems', 'bottomTabBarStatus'])
  },
  methods: {
    showDot: function (name) {
      if (name === 'mine') {
        return false
      } else if (this.bottomTabBarStatus[name] === '0') {
        return false
      } else {
        return true
      }
    },
    showBadge: function (name) {
      if (name === 'mine') {
        return this.bottomTabBarStatus[name]
      } else {
        return ''
      }
    }
  }
};
</script>

<style scoped>
.weui-tabbar {
  position: fixed !important;
}
.bottom-icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.weui-tabbar__item weui-bar__item_on {
  background-color: black !important;
}
</style>
