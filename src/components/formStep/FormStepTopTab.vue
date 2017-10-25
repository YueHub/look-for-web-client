<template>
  <div>    
    <div>
      <tab :line-width="2" bar-active-color="#668599" v-model="index">
        <tab-item :disabled="disabled[index]" :active-class="'active-6-' + (index + 1)" badge-label="1" badge-background="#38C972" badge-color="#fff" class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="500px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper">
            <group label-width="4.5em" label-margin-right="2em" label-align="right">
              <x-input title="标题" type="password" placeholder="必填" v-model="value4"></x-input>
              <x-input title="感谢金" placeholder="I'm placeholder">
                <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
              </x-input>
              <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
              <x-textarea title="自我介绍" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
              <x-input title="微信号" type="password" placeholder="必填" v-model="value4"></x-input>
              <x-input title="手机号" type="password" placeholder="必填" v-model="value4"></x-input>
              <x-switch title="同意协议"></x-switch>
            </group>
          </div>
        </swiper-item>
      </swiper>
    </div>

    <br/>
    <div class="box">
      <flexbox>
         <flexbox-item>
          <x-button @click.native="prev" type="primary">上一步</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="next" type="primary">下一步</x-button>
        </flexbox-item>
      </flexbox>
    </div>

  </div>
</template>

<script scoped>
import {
  Group,
  GroupTitle,
  XInput,
  XTextarea,
  XSwitch,
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem
} from 'vux'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']

export default {
  components: {
    Group,
    GroupTitle,
    XInput,
    XTextarea,
    XSwitch,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      list2: list(),
      demo2: "精选",
      demoDisabled: "A",
      disabled: [false, true, true, true, true],
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      value4: ''
    };
  },
  methods: {
    next() {
      if (this.index === this.list2.length - 1) {
        this.index = 0;
      } else {
        ++this.index;
      }
      this.disabled[this.index] = false;
    },
    prev() {
      if (this.index === 0) {
        this.index = this.list2.length - 1;
      } else {
        --this.index;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";

.box {
  padding: 15px;
}
.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>
