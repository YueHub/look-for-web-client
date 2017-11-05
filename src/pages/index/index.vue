<template>
  <div>
    <!-- header index -->
    <header-index :title="'主页'"></header-index>
    
    <!-- acticle list panel -->
    <div class="list-scroller">
      <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div>
          <panel :header="'众寻列表'" :list="postList" :type="'5'" @on-img-error="onImgError"></panel>
        </div>
        <!--pullup slot-->
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller>
    </div>


    <!-- bottom tab bar -->
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script scoped>
import { Scroller, Spinner, Panel } from "vux";
import { mapState, mapActions } from 'vuex';
import HeaderIndex from "@/components/common/HeaderIndex";
import BottomTabBar from "@/components/common/BottomTabBar";

export default {
  components: {
    Scroller,
    Spinner,
    panel: Panel,
    "header-index": HeaderIndex,
    "bottom-tab-bar": BottomTabBar
  },
  data() {
    return {
      postList: [], // 帖子列表
      n: 10,
      n1: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: "default",
        pulldownStatus: "default"
      }
    };
  },
  mounted() {
    // 挂载后异步调用后台接口获取 list
    this.getPosts().then(this.getPostSuccess, this.getPostFail)
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapActions(['getPosts']),
    getPostSuccess: function(response) {
      if (this.posts === null) {
        return;
      }

      for (let i = 0; i < this.posts.length; i++) {
        let post = {
          src: "http://localhost:8080/image/",
          fallbackSrc: "/static/imgs/404-img.png",
          title: "",
          desc: "",
          url: "/infoboard?postId=" + this.posts[i].identifyId,
          meta: {
            source: "",
            date: "",
            other: "其他信息",
          }
        };
        post.title = this.posts[i].title;
        post.desc = this.posts[i].description;
        post.src += this.posts[i].postImgUrls.split(",")[0]
        post.meta.source = this.posts[i].releaseUserId
        post.meta.date = this.posts[i].releaseTime;
        post.meta.other = "奖金" + this.posts[i].reward
        this.postList.push(post);
      }
      console.log(response);
    },
    getPostFail: function(error) {
      console.log(error);
    },
    onImgError(item, $event) {
      $event;
      // console.log(item, $event)
    },
    loadMore() {
      setTimeout(() => {
        this.n += 10;
        setTimeout(() => {
          this.$refs.scroller.donePullup();
        }, 10);
      }, 2000);
    },
    refresh() {
      setTimeout(() => {
        this.n = 10;
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown();
            this.pullupEnabled && this.$refs.scroller.enablePullup();
          }, 10);
        });
      }, 2000);
    },
    changePullupStatus(enabled) {
      if (enabled) {
        this.$refs.scroller.enablePullup();
        this.pullupEnabled = true;
      } else {
        this.$refs.scroller.disablePullup();
        this.pullupEnabled = false;
      }
    },
    loadMore1() {
      setTimeout(() => {
        this.n1 += 10;
        this.$nextTick(() => {
          this.$refs.scroller1.donePullup();
          if (this.n1 >= 30) {
            this.$refs.scroller1.disablePullup();
            console.log("No more data, Pullup disabled!");
          }
        });
      }, 2000);
    }
  }
};
</script>

<style scoped>
.list-scroller {
  margin-top: 55px;
  margin-bottom: 40px;
}
</style>
