<template>
  <div>
    <!-- header index -->
    <header-index :title="'主页'"></header-index>
    
    <!-- acticle list panel -->
    <div class="list-scroller">
      <scroller lock-x scrollbar-y use-pullup use-pulldown :pulldown-config="pulldownConfig" @on-pulldown-loading="refresh" @on-pullup-loading="loadMore" v-model="status" ref="scroller">
        <div>
          <panel :header="'众寻大厅'" :list="postList.slice(0, showListSize)" :type="'5'" @on-img-error="onImgError"></panel>
        </div>
        <!--pullup slot-->
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up pull-up">
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
import { mapState, mapActions } from "vuex";
import { Scroller, Spinner, Panel } from "vux";
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
      pulldownConfig: {
        content: "下拉刷新",
        height: 60,
        autoRefresh: false,
        downContent: "下拉刷新",
        upContent: "放手...",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pulldown-"
      },
      postList: [], // 帖子列表
      showListSize: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: "default",
        pulldownStatus: "default"
      }
    };
  },
  mounted() {
    // 挂载后异步调用后台接口获取 list
    this.getPosts().then(this.getPostsSuccess, this.getPostsFail);
  },
  computed: {
    ...mapState(["userId", "posts"])
  },
  methods: {
    ...mapActions(["getPosts"]),
    /** 获取帖子成功 */
    getPostsSuccess: function(response) {
      this.postList = []; // 清空现有数据

      setTimeout(() => {
        this.$refs.scroller.donePulldown(); // 设置刷新操作完成
        this.pullupEnabled && this.$refs.scroller.enablePullup();
      }, 500);

      if (this.posts === null) {
        return;
      }

      for (let i = 0; i < this.posts.length; i++) {
        let post = {
          src: "http://localhost:8080/image/",
          fallbackSrc: "/static/imgs/404-img.png",
          title: "",
          desc: "",
          url:
            "/infoboard?postId=" +
            this.posts[i].identifyId + "&endUserId=" + this.userId, // TODO 这里的1 该换成 this.userId
          meta: {
            source: "",
            date: "",
            other: "其他信息"
          }
        };
        post.title = this.posts[i].title;
        post.desc = this.posts[i].description;
        post.src += this.posts[i].postImgUrls.split(",")[0];
        post.meta.source = this.posts[i].releaseUserId;
        post.meta.date = this.posts[i].releaseTime;
        post.meta.other = "<span class='post_reward'>" + "奖金 " + this.posts[i].reward + "</span>";
        this.postList.push(post);
      }
      console.log("##########################");
      console.log("######## 获取列表成功 ########");
      console.log("##########################");
      response; // TODO remove it
    },
    /** 获取帖子失败 */
    getPostsFail: function(error) {
      console.log(error);
    },
    onImgError(item, $event) {
      console.log(item, $event)
    },
    /** 刷新 */
    refresh() {
      this.$nextTick(() => {
        this.getPosts().then(this.getPostsSuccess, this.getPostsFail);
      });
    },
    /** 加载更多 */
    loadMore() {
      if (this.showListSize < this.postList.length) {
        this.showListSize += 10;
        setTimeout(() => {
          this.$refs.scroller.donePullup();
        }, 200);
      } else {
        this.changePullupStatus(false);
      }
    },
    changePullupStatus(enabled) {
      if (enabled) {
        this.$refs.scroller.enablePullup();
        this.pullupEnabled = true;
      } else {
        this.$refs.scroller.disablePullup();
        this.pullupEnabled = false;
      }
    }
  }
};
</script>

<style>
.list-scroller {
  margin-top: 55px;
  margin-bottom: 40px;
}
.pull-up {
  position: absolute;
  bottom: -40px;
  width: 100%;
  height: 40px;
  text-align: center;
}
.post_reward {
  color: #de686d;
  font-weight: 600;
}
</style>
