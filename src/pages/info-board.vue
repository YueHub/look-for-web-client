<template>
  <div v-if="post !== null">
    <x-header :title="post.title"></x-header>    

    <div class="main-contain">

      <!-- 标题 -->
      <div class="post-title"> 
        {{ this.post.title }}
      </div>
      <!-- 作者 -->
      <div class="author">
        <a class="avatar" href="/u/dbfdce352c0d">
          <img :src="'http://localhost:8080/image/' + post.postImgUrls" alt="96">
        </a>
        <div class="info">
          <span class="name">
            <a href="/u/dbfdce352c0d">{{ this.post.user.identifyId }}</a>
          </span>

          <!-- 数据信息 -->
          <div class="meta">
            <span class="publish-time">{{ this.post.releaseTime }}</span>
            <span class="reward">奖金 {{ this.post.reward }}</span>
            <span class="views-count">浏览 {{ this.post.viewCount }}</span>
            <span class="uncover-count">揭榜 {{ this.post.uncoverCount }}</span>
            <span class="success-count">中标 {{ this.post.successCount }}</span>
          </div>
        </div>
      </div>

      <!-- 图片 -->
      <div class="post-img">
        <img :src="'http://localhost:8080/image/' + post.postImgUrls" alt="">
      </div>

      <!-- 招聘内容 -->
      <div class="content">
        <div class="content-title">
          招聘内容
        </div>
        <div class="content-content" v-html="this.post.content">
          {{ this.post.content }}
        </div>
      </div>

      <!-- 招聘要求 -->
      <div class="description">
        <div class="description-title">
          招聘要求
        </div>
        <div class="description-content" v-html="this.post.description">
          {{ this.post.description }}
        </div>
      </div>

      <!-- 联系人 -->
      <div class="contact">
        <div class="contact-title">
          联系人
        </div>

        <div class="contact-content">
          <span>发布人: {{ this.post.user.identifyId }}</span>
          <span>微信号: {{ this.post.user.identifyId }}</span>
          <span v-if="this.post.user.phone !== ''">手机: {{ this.post.user.phone }}</span>
          <span v-if="this.post.user.email !== ''">电子邮箱: {{ this.post.user.email }}</span>
          <span>发布人介绍: {{ this.post.user.selfIntroduction }}</span>
        </div>
      </div>

      <!-- 转发与分享 -->
      <div class="forward">
        <div class="forward-title">
          您所在的转发链
        </div>
        <div>
          {{ this.sharePath }}
        </div>
      </div>

      <!-- 转发和揭榜按钮 -->
      <div class="share-uncover-btn">
        <el-button type="primary" class="circle-button">转发</el-button>
        <!-- <el-button type="danger" class="circle-button" @click="uncover">揭榜</el-button> -->
      </div>
      
    </div>

    <group title="set type = tel">
      <x-input title='帖子ID' type="tel" v-model="postId"></x-input>
      <x-input title='源头ID' type="tel" v-model="post.user.identifyId"></x-input>
      <x-input title='本用户ID' type="tel" v-model="endUserId"></x-input>
    </group>
    <x-button type="primary" @click.native="testShare" style="width: 50%;">转发测试</x-button>
    <div class="instruction">
      分享链接: {{ shareUrl }}
    </div>

    <x-button type="primary" @click.native="testGetSharePath" style="width: 50%;">获取转发图测试</x-button>
    <div v-if="sharePath !== null" class="instruction">
      该贴转发图: 
      {{ sharePath }}
    </div>
  </div>
</template>

<script scoped>
import { XButton, XInput, Group } from "vux";
import { mapState, mapActions } from "vuex";
import XHeader from "@/components/common/HeaderIndex";

export default {
  components: {
    XButton,
    XInput,
    Group,
    "x-header": XHeader
  },
  data() {
    return {
      postId: null, // 该帖 ID
      endUserId: null,
      post: null,
      sharePath: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.postId = this.$route.query.postId;
      this.endUserId = this.$route.query.endUserId;
      if (this.postId === null || "" === this.postId) {
        return;
      }
      this.getPostById(this.postId).then(
        this.getPostByIdSuccess,
        this.getPostByIdFail
      );

      console.log("postId", this.postId);
    });
  },
  computed: {
    ...mapState(["userId", "singlePost", "shareUrl"])
  },
  methods: {
    ...mapActions(["getPostById", "sharePost", "getSharePath", "addUncover"]),
    getPostByIdSuccess: function(post) {
      this.post = post;
      console.log(post);
      // 获取分享路径
      let userInfo = {};
      userInfo.postId = this.postId;
      userInfo.startUserId = this.post.user.identifyId;
      userInfo.endUserId = this.endUserId;
      this.getSharePath(userInfo).then(
        this.getSharePathSuccess,
        this.getSharePathFail
      );
    },
    getPostByIdFail: function(error) {
      console.log(error);
    },

    uncover: function() {
      let uncoverInfo = {
        postId: this.postId,
        userId: this.userId,
        reason: "测试"
      };
      let formData = new FormData();

      for (let key in uncoverInfo) {
        formData.append(key, uncoverInfo[key]); // 帖子信息
      }
      console.log(formData)
      this.addUncover(formData).then(this.uncoverSuccess, this.uncoverFail);
    },
    uncoverSuccess: function(response) {
      console.log(response);
    },
    uncoverFail: function(error) {
      console.log(error);
    },
    testShare: function() {
      console.log(this.endUserId);
      let userInfo = {};
      userInfo.postId = this.postId;
      userInfo.startUserId = this.post.user.identifyId;
      userInfo.endUserId = this.endUserId;
      this.sharePost(userInfo).then(this.sharePostSuccess, this.sharePostFail);
    },
    testGetSharePath: function() {
      let userInfo = {};
      userInfo.postId = this.postId;
      userInfo.startUserId = this.post.user.identifyId;
      userInfo.endUserId = this.endUserId;
      this.getSharePath(userInfo).then(
        this.getSharePathSuccess,
        this.getSharePathFail
      );
    },

    sharePostSuccess: function() {
      console.log("分享成功");
    },
    sharePostFail: function() {
      console.log("分享失败");
    },
    getSharePathSuccess: function(response) {
      let array = [];
      for (let i = 0; i < response.length; i++) {
        array.push(response[i].identifyId);
      }
      this.sharePath = array.join("——>");
      console.log("获取成功", response);
    },
    getSharePathFail: function(error) {
      console.log("获取失败", error);
    }
  }
};
</script>

<style scoped>
.main-contain {
  padding-top: 46px;
  padding-bottom: 55px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

.post-title {
  word-break: break-word !important;
  margin-top: 20px;
  font-family: -apple-system, SF UI Display, Arial, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  text-align: center;
  font-size: 1.8em;
  font-weight: 700;
  line-height: 1.3;
}

.author {
  margin: 30px 0 40px;
}

.author .avatar {
  width: 48px;
  height: 48px;
  vertical-align: middle;
  display: inline-block;
}

.avatar img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.author .info {
  vertical-align: middle;
  display: inline-block;
  margin-left: 8px;
  width: 80%;
}

.author .name {
  margin-right: 3px;
  font-size: 16px;
  vertical-align: middle;
}

.name a {
  color: #333;
}
.author .meta {
  margin-top: 5px;
  font-size: 12px;
  color: #969696;
}
.author .meta span {
  padding-right: 5px;
}
.author .meta span {
  padding-right: 5px;
}

.post-img {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.post-img img {
  width: 100%;
}

.content-title,
.description-title,
.contact-title,
.forward-title {
  margin-top: 2em;
  font-size: 1.5em;
  font-weight: 700;
}

.contact-content span {
  display: block;
}

.share-uncover-btn {
  margin-top: 20%;
  text-align: center;
}

.circle-button {
  width: 7em;
  height: 7em;
  border-radius: 3.5em;
}
</style>
