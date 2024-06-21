<template>
  <el-card shadow="never" header="基础示例">
    <ele-image-upload
      v-model="images"
      :limit="8"
      :disabled="disabled"
      :before-upload="onBeforeUpload"
      :drag="true"
      @upload="onUpload"
      @item-click="onItemClick"
    />
    <div class="ele-cell">
      <el-button type="primary" size="small" @click="getData">
        获取数据
      </el-button>
      <div style="line-height: 22px"><em></em>禁用:</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="disabled">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script>
  import EleImageUpload from 'ele-admin/es/ele-image-upload';

  export default {
    components: { EleImageUpload },
    data() {
      return {
        // 已上传数据
        images: [
          {
            uid: 1,
            url: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
            status: 'done'
          },
          {
            uid: 2,
            url: 'https://cdn.eleadmin.com/20200610/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd.jpg',
            status: 'done'
          },
          {
            uid: 3,
            url: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg',
            status: 'done'
          }
        ],
        // 禁用
        disabled: false
      };
    },
    methods: {
      /* 获取当前数据 */
      getData() {
        console.log('data:', this.images);
        this.$message.success('数据已打印在控制台');
      },
      /* 上传事件 */
      onUpload(item) {
        console.log('item:', item);
        // 模拟上传
        if (this.images.length !== 5) {
          item.status = 'uploading';
          item.progress = 20;
          const timer = setInterval(() => {
            item.progress += 20;
            if (item.progress === 100) {
              item.status = 'done';
              clearInterval(timer);
            }
          }, 1000);
        } else {
          item.status = 'uploading';
          if (item.progress < 80) {
            item.progress += 20;
          }
          setTimeout(() => {
            item.status = 'exception';
            this.$message.error('上传失败, 服务器繁忙');
          }, 2000);
        }
      },
      /* 上传前钩子 */
      onBeforeUpload(file) {
        if (!file.type.startsWith('image')) {
          this.$message.error('只能选择图片');
          return false;
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message.error('大小不能超过 2MB');
          return false;
        }
      },
      /* item 点击事件 */
      onItemClick(item) {
        console.log('item-click:', item);
      }
    }
  };
</script>
