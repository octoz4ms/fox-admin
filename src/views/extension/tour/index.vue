<template>
  <div class="ele-body">
    <el-card shadow="never" header="基本用法">
      <div>
        <el-button type="primary" @click="onStart1">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef1">Upload</el-button>
        <el-button ref="saveRef1" type="primary">Save</el-button>
        <el-button ref="moreRef1">More</el-button>
      </div>
    </el-card>
    <el-card shadow="never" header="不带遮罩层">
      <div>
        <el-button type="primary" @click="onStart2">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef2">Upload</el-button>
        <el-button ref="saveRef2" type="primary">Save</el-button>
        <el-button ref="moreRef2">More</el-button>
      </div>
    </el-card>
    <el-card shadow="never" header="混合弹窗等多种形式">
      <div>
        <el-button type="primary" @click="onStart3">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef3">Upload</el-button>
        <el-button ref="saveRef3" type="primary">Save</el-button>
        <el-button ref="moreRef3">More</el-button>
      </div>
    </el-card>
    <ele-tour v-model="current1" :steps="steps1" />
    <ele-tour v-model="current2" :steps="steps2" :mask="false" />
    <ele-tour v-model="current3" :steps="steps3">
      <template #text="{ step, current }">
        <template v-if="current === 0">
          <div style="margin-bottom: 10px">
            <img
              src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
              style="height: 184px; width: 100%; object-fit: cover"
            />
          </div>
          <div>{{ step.description }}</div>
        </template>
      </template>
    </ele-tour>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionTour',
    data() {
      return {
        // 当前步骤
        current1: null,
        // 步骤
        steps1: [
          {
            target: () => this.$refs.uploadRef1?.$el,
            title: '如何进行文件上传',
            description: '点击这个按钮在弹出框中选择想要上传的文件即可.'
          },
          {
            target: () => this.$refs.saveRef1?.$el,
            title: '如何提交数据',
            description: '数据录入完成后点击这个按钮即可提交数据到后台.'
          },
          {
            target: () => this.$refs.moreRef1?.$el,
            title: '如何进行更多的操作',
            description: '鼠标移入到此按钮上即可展示出更多的操作功能.'
          }
        ],
        // 当前步骤
        current2: null,
        // 按钮
        uploadRef2: null,
        saveRef2: null,
        moreRef2: null,
        // 步骤
        steps2: [
          {
            target: () => this.$refs.uploadRef2?.$el,
            title: '如何进行文件上传',
            description: '点击这个按钮在弹出框中选择想要上传的文件即可.',
            popoverProps: { placement: 'top-start' }
          },
          {
            target: () => this.$refs.saveRef2?.$el,
            title: '如何提交数据',
            description: '数据录入完成后点击这个按钮即可提交数据到后台.',
            popoverProps: { placement: 'bottom' }
          },
          {
            target: () => this.$refs.moreRef2?.$el,
            title: '如何进行更多的操作',
            description: '鼠标移入到此按钮上即可展示出更多的操作功能.',
            popoverProps: { placement: 'top-end' }
          }
        ],
        // 当前步骤
        current3: null,
        // 按钮
        uploadRef3: null,
        saveRef3: null,
        moreRef3: null,
        // 步骤
        steps3: [
          {
            title: '欢迎使用 EleAdmin 系统',
            description:
              '下面将为您介绍一些常用功能的操作说明, 如果之前已经为您介绍过, 您可以直接点击跳过结束指引.'
          },
          {
            target: () => this.$refs.uploadRef3?.$el,
            title: '如何进行文件上传',
            description: '点击这个按钮在弹出框中选择想要上传的文件即可.'
          },
          {
            target: () => this.$refs.saveRef3?.$el,
            title: '如何提交数据',
            description: '数据录入完成后点击这个按钮即可提交数据到后台.',
            mask: false
          },
          {
            target: () => this.$refs.moreRef3?.$el,
            title: '如何进行更多的操作',
            description: '鼠标移入到此按钮上即可展示出更多的操作功能.'
          }
        ]
      };
    },
    methods: {
      /* 开始引导 */
      onStart1() {
        this.current1 = 0;
      },
      /* 开始引导 */
      onStart2() {
        this.current2 = 0;
      },
      /* 开始引导 */
      onStart3() {
        this.current3 = 0;
      }
    }
  };
</script>
