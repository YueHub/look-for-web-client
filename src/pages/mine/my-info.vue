<template>
<div>
  <header-back :title="'个人信息'"></header-back>

  <div class="my-info">
    <group>
      <x-input title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email" v-model="email">

      </x-input>
    </group>
    <group>
      <x-textarea v-model="selfIntroduce" title="自我介绍" placeholder="（可选）请填写自我介绍" :show-counter="false" :rows="4">

      </x-textarea>
    </group>

    <div class="save-btn">
      <el-button type="primary" @click="saveUserProfile">保存</el-button>
    </div>
    
    <!-- 操作提示 -->
    <x-switch :title="saveResultTitle" v-model="showSaveResult"></x-switch>
  </div>
  

</div>
</template>

<script scoped>
import { Group, GroupTitle, XInput, XTextarea, Toast } from "vux";
import { mapState, mapActions } from 'vuex';
import HeaderBack from "@/components/common/HeaderBack";

export default {
  components: {
    Group,
    GroupTitle,
    XInput,
    XTextarea,
    Toast,
    "header-back": HeaderBack
  },
  data() {
    return {
      email: "",
      selfIntroduce: "",
      saveResultTitle: "",
      showSaveResult: false
    };
  },
  mounted() {
    
  },
  computed: {
    ...mapState([''])
  },
  methods: {
    ...mapActions(['updatUserProfile']),
    saveUserProfile: function () {
      let userProfile = {
        identifyId: "1",
        mail: this.email,
        selfIntroduce: this.selfIntroduce
      }
      this.updateUserProfile(userProfile).then(this.updateUserProfileSuccess, this.updateUserProfileFail)
    },
    updateUserProfileSuccess: function (response) {
      this.saveResultTitle = "保存成功"
      this.showSaveResult = true
      console.log(response)
    },
    updateUserProfileFail: function (error) {
      this.saveResultTitle = "保存失败"
      this.showSaveResult = false
      console.log(error)
    }
  }
};
</script>

<style scoped>
.my-info {
  padding-top: 46px;
  padding-bottom: 55px;
}
.save-btn {
  position: fixed;
  bottom: 10em;
  width: 100%;
  text-align: center;
}
</style>


