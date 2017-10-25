<template>
  <div>    
    <div>
      <!-- step tab -->
      <tab :line-width="2" bar-active-color="#668599" v-model="activeStepIndex">
        <tab-item :disabled="stepDisabled[index]" :active-class="'active-' + (index + 1)" class="vux-center" :selected="activeStepIndex === index" v-for="(item, index) in stepTabs" @click="activeStepIndex = index" :key="index">
          {{ item }}
        </tab-item>
      </tab>

      <!-- step swiper -->
      <swiper v-model="activeStepIndex" height="500px" :show-dots="false">
        <swiper-item>
          <div class="tab-swiper">
            <release-basic-info-template ref="releaseBasicInfoTemplate"></release-basic-info-template>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper">
            <release-extra-info-template ref="releaseExtraInfoTemplate"></release-extra-info-template>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper">
            <release-preview ref="releasePreview"></release-preview>
          </div>
        </swiper-item>
      </swiper>
    </div>

    <!-- prevStep and nextStep button -->
    <div class="box">
      <flexbox>
         <flexbox-item>
          <x-button :disabled="prevStepDisabled" @click.native="prevStep" type="primary">上一步</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button :disabled="nextStepDisabled" @click.native="nextStep" type="primary">下一步</x-button>
        </flexbox-item>
      </flexbox>
    </div>

    <toast v-model="showWarnMsg" type="warn">{{ warnMsg }}</toast>

  </div>
</template>

<script scoped>
import {
  Tab,
  TabItem,
  XButton,
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem,
  Toast
} from "vux";

import ReleaseBasicInfoTemplate from "@/components/formStep/ReleaseBasicInfoTemplate";
import ReleaseExtraInfoTemplate from "@/components/formStep/ReleaseExtraInfoTemplate";
import ReleasePreview from "@/components/formStep/ReleasePreview";

const list = () => ["必填信息", "附加信息", "发布 / 预览"];

export default {
  components: {
    Tab,
    TabItem,
    XButton,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Toast,
    "release-basic-info-template": ReleaseBasicInfoTemplate,
    "release-extra-info-template": ReleaseExtraInfoTemplate,
    "release-preview": ReleasePreview
  },
  data() {
    return {
      activeStepIndex: 0,
      stepDisabled: [false, true, true, true, true],
      stepTabs: list(),
      prevStepDisabled: true,
      nextStepDisabled: false,
      showWarnMsg: false,
      warnMsg: ""
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
  methods: {
    nextStep: function() {
      if (!this.check()) {
        return;
      }
      ++this.activeStepIndex;
      this.stepDisabled[this.activeStepIndex] = false;
    },
    prevStep: function() {
      if (!this.check()) {
        return;
      }
      this.check();
      --this.activeStepIndex;
    },
    check: function() {
      // 基本信息检查
      if (this.activeStepIndex === 0) {
        var checkResult = this.$refs.releaseBasicInfoTemplate.check();
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
        return true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";

.box {
  padding: 15px;
}
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
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>
