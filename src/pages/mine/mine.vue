<template>
  <div>
    <!-- header index -->
    <header-index title="我"></header-index>
  
    <!-- mine cell list -->
    <div class="mine-cell-list">
      <group>
        <cell :title="userName" is-link>
          <img slot="icon" width="50" class="user-avatar" src="">
        </cell>
        <cell :title="'人气值'" @click.native="onClick" :is-loading="!popularityValue" :value="popularityValue"></cell>
        <cell :title="'信用等级'" @click.native="onClick" :is-loading="!creditValue" :value="creditValue"></cell>
      </group>

      <group>
        <cell is-link :link="{ path: '/myrelease' }">
          <span slot="title" style="color:green;">
            <span style="vertical-align:middle;">{{ ('我发布的') }}</span>
            <badge text="1"></badge>
          </span>
        </cell>

        <cell :title="'我看过的'" is-link :link="{ path: '/myview' }">

        </cell>
        <cell :title="'我揭榜的'" is-link :link="{ path: '/myuncover' }">

        </cell>
        <cell :title="'帮助'" is-link :link="{ path: '/help' }">

        </cell>
        <cell :title="'关于众寻'" is-link :link="{ path: '/aboutus' }">

        </cell>
      </group>
    </div>

    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>



<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from "vux";
import { mapState, mapActions } from "vuex";

import HeaderIndex from "@/components/common/HeaderIndex";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge,
    "header-index": HeaderIndex,
    "bottom-tab-bar": BottomTabBar
  },
  data() {
    return {
      list: [
        {
          label: "Apple",
          value: "3.29"
        },
        {
          label: "Banana",
          value: "1.04"
        },
        {
          label: "Fish",
          value: "8.00"
        }
      ],
    };
  },
  mounted() {
    this.getUserInfo().then(this.getUserInfoSuccess, this.getUserInfoFail)
  },
  computed: {
    ...mapState(['userName', 'popularityValue', 'creditValue']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
    onImgError(item, $event) {
      $event;
    },
    getUserInfoSuccess: function (response) {

      console.log(response)
    },
    getUserInfoFail: function (error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
.mine-cell-list {
  padding-top: 46px;
  padding-bottom: 55px;
}
.user-avatar {
  display: block;
  margin-right: 10px;
}

.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
