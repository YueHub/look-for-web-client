<template>
  <div>
    <!-- header index -->
    <header-back :title="'发布结果'"></header-back>

    <!-- release result msg -->
    <div class="release-result-contain">
      <msg :title="title" :description="description" :buttons="buttons" :icon="iconType"></msg>
    </div>

    <!-- bottom-tab-bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import { Msg, Divider, XButton } from "vux";
import HeaderBack from "@/components/common/HeaderBack";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    Msg,
    Divider,
    XButton,
    "header-back": HeaderBack,
    "bottom-tab-bar": BottomTabBar
  },
  data() {
    return {
      postId: "",
      title: "",
      description: "",
      iconType: "", // success warn info waiting
      buttons: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.postId = this.$route.params.postId
      this.title = this.$route.params.title
      this.description = this.$route.params.description
      this.iconType = this.$route.params.iconType

      if (this.iconType === "success") {
        var shareButton = {
          type: "primary",
          text: "立即分享",
          onClick: this.sharePost.bind(this)
        };
        var viewButton = { type: "default", text: "查看", link: "/infoboard?postId=" + this.postId };
        this.buttons.push(shareButton);
        this.buttons.push(viewButton);
      } else if (this.iconType === "warn") {
        var backButton = {
          type: "warn",
          text: "返回",
          onClick: this.goBack.bind(this)
        };
        this.buttons.push(backButton)
      }
    });
  },
  methods: {
    sharePost: function() {
      return
    },
    goBack: function() {
      this.$router.push("release")
    }
  }
};
</script>

<style scoped>
.release-result-contain {
  margin-top: 3em;
}
</style>
