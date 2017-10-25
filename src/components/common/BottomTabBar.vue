<template>
  <div>
    <tabbar>
      <!-- <tabbar-item selected show-dot badge="2" link="/index"> -->
      <tabbar-item show-dot v-for="bottomTabBarItem in bottomTabBarItems" :key="bottomTabBarItem.id" :link="bottomTabBarItem.link">
        <img slot="icon" :src="'/static/imgs/' + bottomTabBarItem.imgName">
        <span slot="label">{{ bottomTabBarItem.content }}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script scoped>
import { Cell, Group, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Cell, Group, Tabbar, TabbarItem
  },
  computed: {
    ...mapState(['bottomTabBarItems'])
  }
}
</script>
