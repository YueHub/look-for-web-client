<template>
  <div>
    <div>
      <div>注意事项</div>
      <div style="background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;color: #333;">
        注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项
        注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项
        注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项注意事项
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="info" @click="previewInfoBoard">预览</el-button>
      <el-button type="success">发布</el-button>
    </div>
    
  </div>
</template>

<script scoped>
export default {
  methods: {
    previewInfoBoard: function () {
      this.$router.push({ name: 'InfoBoard' })
    }
  }
}
</script>

<style scoped>

</style>


