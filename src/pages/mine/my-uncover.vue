<template>
  <div>
    <header-back :title="'我的揭榜'"></header-back>
    <div class="cell-list">
      <panel :list="postList" :type="'5'" @on-img-error="onImgError"></panel>
    </div>
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import { Panel } from "vux";
import { mapState, mapActions } from "vuex";

import HeaderBack from "@/components/common/HeaderBack";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    "header-back": HeaderBack,
    "bottom-tab-bar": BottomTabBar,
    panel: Panel
  },
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    this.getUserInfo().then(this.getUserInfoSuccess, this.getUserInfoFail);
  },
  computed: {
    ...mapState(["myUncovers"])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    onImgError(item, $event) {
      $event;
      // console.log(item, $event)
    },
    getUserInfoSuccess: function () {
      if (this.myReleases === null) {
        return
      }
      var postList = []
      for (let i = 0; i < this.myUncovers.length; i++) {
        let post = {
          src: "http://localhost:8080/image/",
          fallbackSrc: "/static/imgs/404-img.png",
          title: "",
          desc: "",
          url: "/infoboard",
          meta: {
            source: "",
            date: "",
            other: "其他信息"
          }
        };
        post.title = this.myUncovers[i].title;
        post.desc = this.myUncovers[i].description;
        post.src += this.myUncovers[i].postImgUrls.split(",")[0];
        // post.meta.source = this.myUncovers[i].releaseUserId;
        post.meta.date = this.myUncovers[i].releaseTime;
        post.meta.other = "奖金" + this.myUncovers[i].reward;
        postList.push(post);
      }
      this.postList = postList;
    },
    getUserInfoFail: function (response) {
      console.log('ohno',response)
    }
  }
};
</script>

<style scoped>
.cell-list {
  padding-top: 46px;
  padding-bottom: 55px;
}
</style>


