<template>
  <div>
    <x-header></x-header>
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    测试测试测试测试测试测试测试测试
    <br><br><br><br><br><br><br>

    <group title="set type = tel">
      <x-input title='帖子ID' type="tel" v-model="postId"></x-input>
      <x-input title='源头ID' type="tel" v-model="startUserId"></x-input>
      <x-input title='本用户ID' type="tel" v-model="endUserId"></x-input>
    </group>
    <x-button type="primary" @click.native="testShare" style="width: 50%;">分享测试</x-button>
    <div class="instruction">
      分享链接: {{ shareUrl }}
    </div>

    <x-button type="primary" @click.native="testGetSharePath" style="width: 50%;">获取转发图测试</x-button>
    <div class="instruction">
      该贴转发图: 
    </div>
  </div>
</template>

<script scoped>
import { XButton, XInput, Group } from "vux";
import XHeader from "@/components/common/HeaderIndex";
import { mapState, mapActions } from "vuex";

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
      startUserId: null,
      endUserId: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.postId = this.$route.query.postId;
      console.log("postId", this.postId);
    });
  },
  computed: {
    ...mapState(["shareUrl"])
  },
  methods: {
    ...mapActions(["sharePost", "getSharePath"]),
    testShare: function() {
      console.log(this.startUserId)
      console.log(this.endUserId)
      let userInfo = {}
      userInfo.postId = this.postId
      userInfo.startUserId = this.startUserId
      userInfo.endUserId = this.endUserId
      this.sharePost(userInfo).then(this.sharePostSuccess, this.sharePostFail);
    },
    testGetSharePath: function () {
      let userInfo = {}
      userInfo.postId = this.postId
      userInfo.startUserId = this.startUserId
      userInfo.endUserId = this.endUserId
      this.getSharePath(userInfo).then(this.getSharePathSuccess)
    },
   
    sharePostSuccess: function() {
      console.log("分享成功");
    },
    sharePostFail: function() {
      console.log("分享失败");
    },
    getSharePathSuccess: function (response) {
      console.log('获取成功', response)
    },
  }
};
</script>

<style scoped>

</style>
