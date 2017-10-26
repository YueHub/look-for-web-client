<template>
  <div class="tab-swiper">
    <group>
      <x-textarea title="自我介绍" placeholder="请填写自我介绍" :show-counter="false" :rows="4"></x-textarea>
    </group>

    <group title="上传图像">
      <el-upload
        action=""
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </group>
    
  </div>
</template>

<script>
import { Group, GroupTitle, XTextarea } from "vux";
export default {
  components: {
    Group,
    GroupTitle,
    XTextarea
  },
  data() {
    return {
      dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
    hhandleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
