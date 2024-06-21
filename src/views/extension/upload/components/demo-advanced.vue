<template>
  <el-card shadow="never" header="手动上传">
    <ele-image-upload
      v-model="images"
      :auto-upload="false"
      :before-remove="onBeforeRemove"
    />
    <div>
      <el-button
        type="primary"
        size="small"
        :loading="loading"
        @click="onSubmit"
      >
        提交
      </el-button>
    </div>
  </el-card>
</template>

<script>
  import EleImageUpload from 'ele-admin/es/ele-image-upload';

  export default {
    components: { EleImageUpload },
    data() {
      return {
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
          }
        ],
        loading: false
      };
    },
    methods: {
      /* 手动上传 */
      onSubmit() {
        if (this.checkDone()) {
          this.submitForm();
          return;
        }
        this.loading = true;
        this.images.forEach((item) => {
          if (!item.status) {
            this.uploadItem(item);
          }
        });
      },
      /* 上传图片 */
      uploadItem(item) {
        // 模拟上传
        item.progress += 20;
        item.status = 'uploading';
        const timer = setInterval(() => {
          item.progress += 20;
          if (item.progress === 100) {
            item.status = 'done';
            clearInterval(timer);
            // 每个图片上传完成后都检查是否全部上传完成
            if (this.checkDone()) {
              this.submitForm();
            }
          }
        }, Math.round(Math.random() * 2500) + 500);
      },
      /* 检查是否全部上传完毕 */
      checkDone() {
        return !this.images.some((d) => d.status !== 'done');
      },
      /* 全部上传完毕后与其它表单数据一起提交 */
      submitForm() {
        this.$message.success('已全部上传完毕');
        console.log('data:', this.images);
        this.loading = false;
      },
      /* 删除增加确认弹窗 */
      onBeforeRemove() {
        return new Promise((resolve, reject) => {
          this.$confirm('确定要删除吗?', '提示', {
            type: 'warning'
          })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
      }
    }
  };
</script>
