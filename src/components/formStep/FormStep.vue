<template>
  <div class="form-step">

    <!-- step tab -->
    <tab :line-widths="2" bar-active-color="#668599" v-model="activeStepIndex">
      <tab-item :disabled="stepDisabled[index]" :active-class="'active-' + (index + 1)" class="vux-center" :selected="activeStepIndex === index" v-for="(item, index) in stepTabs" @click="activeStepIndex = index" :key="index">
        {{ item }}
      </tab-item>
    </tab>

    <!-- step swiper -->
    
    <!-- 基本信息 -->
    <swiper class="step-swiper" v-model="activeStepIndex" height="350px" :min-moving-distance="999" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper">
            <div class="tab-swiper">
          <group gutter="0.1em" label-width="4.5em" label-margin-right="2em" label-align="left">
            <x-input title="标题" placeholder="请填写标题（不超过30字）" :max="30" v-model="postRelease.title"></x-input>

            <x-textarea title="招聘内容" placeholder="请填写招聘内容" :show-counter="false" :rows="4" v-model="postRelease.content"></x-textarea>
            <div class="tool-tip">
              请填写招聘内容，如公司、职位、薪酬等...
            </div>

            <x-textarea title="招聘要求" placeholder="请填写招聘要求" :show-counter="false" :rows="4" v-model="postRelease.description"></x-textarea>
            <div class="tool-tip">
              请填写学历要求，技能要求等...
            </div>

            <x-input title="感谢金" placeholder="请输入感谢金" v-model="postRelease.reward"></x-input>
            <div class="tool-tip">
              建议输入 200 以上金额
            </div>
            
            <x-input title="手机号" mask="999 9999 9999":max="13" is-type="china-mobile" placeholder="请输入手机号" v-model="postRelease.phone"></x-input>
            <!-- <x-input title="手机号码格式化"  v-model="maskValue"  ></x-input> -->
            <div class="tool-tip">
              请输入招聘联系电话，便于揭榜者和中标者联系
            </div>

            <x-input title="电子邮箱"is-type="email" placeholder="请输入电子邮箱" v-model="postRelease.email"></x-input>
            
            <div class="tool-tip">
              请输入电子邮箱，便于揭榜者和中标者联系
            </div>
            
          </group>

          <div class="instruction">
            注意事项: 以上为均为必填信息，请认真填写.
          </div>
        </div>
        </div>
      </swiper-item>

      <!-- 额外信息 -->
      <swiper-item>
        <div class="tab-swiper">
          <div class="tab-swiper">
            <group>
              <x-textarea v-model="postRelease.extraInfo" title="补充信息" placeholder="（可选）请填写自我介绍" :show-counter="false" :rows="4"></x-textarea>
            </group>
            <div class="tool-tip">
                填写一些补充信息，例如填写自我介绍，为有意应聘的人提供更多的信息
            </div>

            <group title="上传封面图像">
              <el-upload
                ref="fileUpload"
                :http-request="onSubmit"
                :action="'http://localhost:8080/postrelease'"
                :auto-upload="autoUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </group>
            <div class="tool-tip">
                上传封面图像
            </div>
          </div>
        </div>
      </swiper-item>

      <!-- 预览 / 发布 -->
      <swiper-item>
        <div class="tab-swiper">
          <div>
            <div>
              <div class="instruction-title">注意事项</div>
              <div class="instruction">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                用户协议用户协议用户协议用户协议用户协议用户协议用户协议
              </div>
            </div>

            <div class="protocol">
              <check-icon class="protocol-check-icon" :value.sync="protocolChecked" type="plain"></check-icon>
              <a href="#" target="_blank">《用户服务协议》</a>
            </div>

            <div class="release-btn">
              <el-button type="info" @click="previewInfoBoard">预览</el-button>
              <el-button type="success" @click="release">发布</el-button>
            </div>
            
          </div>
        </div>
      </swiper-item>
    </swiper>

    <!-- prevStep and nextStep button -->
    <div class="prev-step-btn">
      <x-button :disabled="prevStepDisabled" @click.native="prevStep" type="primary">上一步</x-button>
    </div>
    <div class="next-step-btn">
      <x-button :disabled="nextStepDisabled" @click.native="nextStep" type="primary">下一步</x-button>
    </div>
    
    <!-- 操作信息提示 -->
    <toast v-model="showWarnMsg" type="warn">{{ warnMsg }}</toast>

    <!-- 加载动画 -->
    <div v-transfer-dom>
      <loading :show="loadingShow" :text="loadingText"></loading>
    </div>

  </div>
</template>

<script scoped>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  Group,
  GroupTitle,
  XInput,
  XTextarea,
  XSwitch,
  Tab,
  TabItem,
  XButton,
  Swiper,
  SwiperItem,
  Toast,
  CheckIcon,
  Loading,
  TransferDomDirective as TransferDom
} from "vux";

const list = () => ["必填信息", "附加信息", "发布 / 预览"];

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    XButton,
    Swiper,
    SwiperItem,
    Toast,
    Group,
    GroupTitle,
    XInput,
    XTextarea,
    XSwitch,
    CheckIcon,
    Loading
  },
  data() {
    return {
      activeStepIndex: 0,
      stepDisabled: [false, true, true, true, true],
      stepTabs: list(),
      prevStepDisabled: true,
      nextStepDisabled: false,
      showWarnMsg: false,
      warnMsg: "",

      postRelease: {
        user: "",
        title: "",
        content: "",
        description: "",
        reward: 0,
        phone: "",
        email: "",
        extraInfo: ""
      },

      autoUpload: false,
      uploadFileCount: 0,
      fileList: [],
      uploadCount: 0,

      protocolChecked: false,

      dialogImageUrl: "",
      dialogVisible: false,

      loadingShow: false,
      loadingText: "发布中"
    };
  },
  watch: {
    activeStepIndex: function() {
      if (this.activeStepIndex === 0) {
        this.prevStepDisabled = true;
      } else {
        this.prevStepDisabled = false;
      }
      if (this.activeStepIndex === this.stepTabs.length - 1) {
        this.nextStepDisabled = true;
      } else {
        this.nextStepDisabled = false;
      }
    }
  },
  mounted() {
    this.postRelease.user = this.userId;
  },
  computed: {
    ...mapState(["userId", "releasePostInfo", "releaseStatus"])
  },
  methods: {
    ...mapMutations(["updateReleasePostInfo", "updateSinglePost"]),
    ...mapActions(["addPost"]),
    handleRemove: function(file, fileList) {
      this.uploadFileCount = fileList.length;
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange: function(file, fileList) {
      this.uploadFileCount = fileList.length;
    },

    /** 发布按钮 */
    release: function() {
      // 发布前数据检查
      if (!this.check()) {
        return;
      }
      // 提交表单信息
      this.$refs.fileUpload.submit();
    },
    onSubmit: function(fileUpload) {
      this.handleSubmit(
        fileUpload,
        this.releaseSuccessCallBack,
        this.releaseFailCallBack
      );
    },
    /** 在 file upload's htppRequest method 中实现表单提交 */
    handleSubmit: function(fileUpload) {
      ++this.uploadCount;
      if (this.uploadCount < this.uploadFileCount) {
        this.fileList.push(fileUpload.file);
        return;
      }
      this.fileList.push(fileUpload.file);
      let formData = new FormData();

      let postRelease = this.postRelease;

      for (let key in postRelease) {
        formData.append(key, postRelease[key]); // 帖子信息
      }

      for (var i = 0; i < this.uploadFileCount; i++) {
        formData.append("files", this.fileList[i]); // 文件
      }
      this.loadingShow = true;

      this.updateReleasePostInfo({
        type: "updateReleasePostInfo",
        releasePostInfo: formData
      });

      this.addPost().then(
        this.releaseSuccessCallBack,
        this.releaseFailCallBack
      );
      this.uploadCount = 0; // 置 0 可以继续提交
    },
    releaseSuccessCallBack: function(response) {
      this.loadingShow = false;
      console.log(response);
      if (this.releaseStatus === "success") {
        this.$router.push({
          name: "release-result",
          params: {
            title: "发布成功!",
            description: "招聘帖子已经发布",
            iconType: "success",
            postId: response.data.identifyId
          }
        });
      }
      console.log("##########################");
      console.log("######## 帖子发布成功 ########");
      console.log("##########################");
      response; // TODO remove it
    },
    releaseFailCallBack: function(error) {
      this.$router.push({
        name: "release-result",
        params: {
          title: "发布失败!",
          description: "发现错误，请尝试重新提交",
          iconType: "warn"
        }
      });
      console.log("############################");
      console.log(error);
      console.log("############################");
    },

    nextStep: function() {
      if (!this.check()) {
        return;
      }
      ++this.activeStepIndex;
      this.stepDisabled[this.activeStepIndex] = false;
    },
    prevStep: function() {
      --this.activeStepIndex;
    },
    check: function() {
      // 基本信息检查
      if (this.activeStepIndex === 0) {
        var checkResult = this.checkReleaseBasicInfo();
        if (checkResult.status === "fail") {
          this.showWarnMsg = true;
          this.warnMsg = checkResult.failMsg;

          return true;
        }
        return true;
      }

      // 附加信息检查
      if (this.activeStepIndex === 1) {
        return true;
      }

      // 提交前最后一次检查
      if (this.activeStepIndex === 2) {
        var checkReleaseBasicInfoResult = this.checkReleaseBasicInfo(); // 新本信息检查
        if (checkReleaseBasicInfoResult.status === "success") {
          if (this.protocolChecked) {
            return true;
          } else {
            this.showWarnMsg = true;
            this.warnMsg = "请确认协议";
          }
        } else {
          this.showWarnMsg = true;
          this.warnMsg = checkResult.failMsg;
        }
      }
    },

    checkReleaseBasicInfo: function() {
      var phoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[7-9]) [0-9]{4} [0-9]{4}$/; //手机正则

      if (this.postRelease.title === "") {
        return {
          status: "fail",
          failMsg: "标题不能为空"
        };
      }
      if (this.postRelease.reward === 0) {
        this.moneyFocus = true;
        return {
          status: "fail",
          failMsg: "奖金不能为 0"
        };
      }
      if (this.postRelease.detailInfo === "") {
        return {
          status: "fail",
          failMsg: "详细信息不能为空"
        };
      }
      if (this.postRelease.phone === "") {
        return {
          status: "fail",
          failMsg: "手机号不能为空"
        };
      }
      if (!phoneReg.test(this.postRelease.phone)) {
        return {
          status: "fail",
          failMsg: "请输入正确格式的手机号"
        };
      }

      return {
        status: "success",
        sucessMsg: ""
      };
    },
    previewInfoBoard: function() {
      this.updateSinglePost();
      this.$router.push({ name: "InfoBoard" });
    }
  }
};
</script>

<style lang="less">
.active-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}

.tool-tip {
  position: relative;

  border: solid 1px #49c0ec;
  border-radius: 3px / 3px;
  margin-top: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4px;
  padding: 5px;
  width: 85%;

  font-size: 12px;
  line-height: 18px;

  background: #f4fbff;
  color: #0083ad;
  -moz-border-radius: 3px / 3px;
  -webkit-border-radius: 3px 3px;
}

.instruction {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;

  width: 90%;
  font-size: 12px;
  line-height: 18px;

  background-color: #f5f5f5;
  color: #333;
  -moz-border-radius: 3px / 3px;
  -webkit-border-radius: 3px 3px;
}

.vux-slider > .vux-swiper {
  overflow-y: scroll !important;
  position: relative;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
.prev-step-btn {
  position: fixed;
  left: 1em;
  bottom: 4em;
  width: 40%;
}
.next-step-btn {
  position: fixed;
  right: 1em;
  bottom: 4em;
  width: 40%;
}

.instruction-title {
  margin-top: 1em;
  margin-left: 1em;
}
.protocol-check-icon .weui-icon-circle {
  font-size: 1em !important;
}
.protocol-check-icon .weui-icon-success-circle {
  font-size: 1em !important;
}
.protocol {
  margin-top: 1em;
  text-align: center;
}
.protocol a {
  margin-left: -8px;
  font-size: 12px;
  color: #2395ff;
}
.release-btn {
  text-align: center;
  margin-top: 2em;
}
</style>
