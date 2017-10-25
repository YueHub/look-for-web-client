<template>
  <div class="tab-swiper">
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="标题" type="password" placeholder="请填写标题" v-model="title"></x-input>
      <x-input title="感谢金" placeholder="请输入感谢金" v-model="money">
      </x-input>
      <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="4" v-model="detailInfo"></x-textarea>
      <x-input title="微信号" type="password" placeholder="请填写微信号" v-model="wechat"></x-input>
      <x-input title="手机号" type="password" placeholder="请输入手机号" v-model="phone"></x-input>
      <x-switch title="同意协议"></x-switch>
    </group>
  </div>
</template>

<script scoped>
import { Group, GroupTitle, XInput, XTextarea, XSwitch } from "vux";

export default {
  components: {
    Group,
    GroupTitle,
    XInput,
    XTextarea,
    XSwitch
  },
  data() {
    return {
      title: "",
      money: 0,
      detailInfo: "",
      wechat: "",
      phone: ""
    };
  },
  methods: {
    check() {
      if (this.title === "") {
        return {
          status: "fail",
          failMsg: "标题不能为空"
        };
      }
      if (this.money === 0) {
        this.moneyFocus = true
        return {
          status: "fail",
          failMsg: "奖金不能为 0"
        };
      }
      if (this.detailInfo === "") {
        return {
          status: "fail",
          failMsg: "详细信息不能为空"
        };
      }
      if (this.wechat === "") {
        return {
          status: "fail",
          failMsg: "微信号不能为空"
        };
      }
      if (this.phone === "") {
        return {
          status: "fail",
          failMsg: "手机号不能为空"
        };
      }

      return {
        status: "success",
        sucessMsg: ""
      };
    }
  }
};
</script>
