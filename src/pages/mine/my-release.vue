<template>
  <div>
    <header-back :title="'我的发布'"></header-back>
    <div class="cell-list">
      <panel :list="postList" :type="'5'" @on-img-error="onImgError"></panel>
    </div>
  </div>
</template>

<script scoped>
import { Panel } from "vux";
import { mapState, mapActions } from "vuex";

import HeaderBack from "@/components/common/HeaderBack";

export default {
  components: {
    "header-back": HeaderBack,
    panel: Panel
  },
  data() {
    return {
      postList: []
    };
  },
  computed: {
    ...mapState(["myReleases"])
  },
  created() {
    console.log('sdfdsf')
    this.getUserInfo().then(this.getUserInfoSuccess)
    
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
      for (let i = 0; i < this.myReleases.length; i++) {
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
        post.title = this.myReleases[i].title;
        post.desc = this.myReleases[i].description;
        post.src += this.myReleases[i].postImgUrls.split(",")[0];
        // post.meta.source = this.myReleases[i].releaseUserId;
        post.meta.date = this.myReleases[i].releaseTime;
        post.meta.other = "奖金" + this.myReleases[i].reward;
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


