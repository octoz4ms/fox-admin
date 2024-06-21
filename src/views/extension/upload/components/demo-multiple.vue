<template>
  <el-card shadow="never" header="支持多选">
    <ele-image-upload
      v-model="images"
      :limit="8"
      :drag="true"
      :multiple="true"
      :upload-handler="uploadHandler"
      @upload="onUpload"
    />
    <el-button type="primary" size="small" @click="getData">
      获取数据
    </el-button>
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
        ]
      };
    },
    methods: {
      /* 获取当前数据 */
      getData() {
        console.log('data:', this.images);
        this.$message.success('数据已打印在控制台');
      },
      /* 上传事件 */
      uploadHandler(file) {
        const item = {
          file,
          uid: file.uid,
          name: file.name,
          progress: 0,
          status: null
        };
        if (!file.type.startsWith('image')) {
          this.$message.error('只能选择图片');
          return;
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message.error('大小不能超过 2MB');
          return;
        }
        item.url = window.URL.createObjectURL(file);
        this.images.push(item);
        this.onUpload(item);
      },
      /* 上传 item */
      onUpload(item) {
        console.log('item:', item);
        // 模拟上传
        item.status = 'uploading';
        item.progress = 20;
        const timer = setInterval(() => {
          item.progress += 20;
          if (item.progress === 100) {
            item.status = 'done';
            clearInterval(timer);
          }
        }, 1000);
      }
    }
  };
</script>
