<template>
  <el-card shadow="never" body-style="padding: 6px 0;">
    <template v-slot:header>
      <span>{{ title }}</span>
      <more-icon @remove="onRemove" @edit="onEdit" />
    </template>
    <el-scrollbar
      style="height: 326px"
      wrapStyle="overflow-x: hidden;"
      viewStyle="padding: 14px 10px;"
    >
      <el-timeline :reverse="false" class="ele-timeline ele-timeline-act">
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          :timestamp="item.timestamp"
          :type="item.type"
        >
          {{ item.title }}
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </el-card>
</template>

<script>
  import MoreIcon from './more-icon.vue';

  export default {
    components: { MoreIcon },
    props: {
      title: String
    },
    data() {
      return {
        activities: []
      };
    },
    created() {
      this.queryActivities();
    },
    methods: {
      queryActivities() {
        this.activities = [
          {
            title: 'SunSmile 解决了bug 登录提示操作失败',
            timestamp: '20:30'
          },
          {
            title: 'Jasmine 解决了bug 按钮颜色与设计不符',
            timestamp: '19:30'
          },
          {
            title: '项目经理 指派了任务 解决项目一的bug',
            timestamp: '18:30',
            type: 'primary'
          },
          {
            title: '项目经理 指派了任务 解决项目二的bug',
            timestamp: '17:30',
            type: 'primary'
          },
          {
            title: '项目经理 指派了任务 解决项目三的bug',
            timestamp: '16:30',
            type: 'primary'
          },
          {
            title: '项目经理 指派了任务 解决项目四的bug',
            timestamp: '15:30'
          },
          {
            title: '项目经理 指派了任务 解决项目五的bug',
            timestamp: '14:30'
          },
          {
            title: '项目经理 指派了任务 解决项目六的bug',
            timestamp: '12:30'
          },
          {
            title: '项目经理 指派了任务 解决项目七的bug',
            timestamp: '11:30',
            type: 'primary'
          },
          {
            title: '项目经理 指派了任务 解决项目八的bug',
            timestamp: '10:30'
          },
          {
            title: '项目经理 指派了任务 解决项目九的bug',
            timestamp: '09:30'
          },
          {
            title: '项目经理 指派了任务 解决项目十的bug',
            timestamp: '08:30'
          }
        ];
      },
      onRemove() {
        this.$emit('remove');
      },
      onEdit() {
        this.$emit('edit');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ele-timeline-act {
    padding-left: 50px;

    :deep(.el-timeline-item__timestamp) {
      margin: 0;
      position: absolute;
      top: 3px;
      left: -45px;
    }

    :deep(.el-timeline-item) {
      padding-bottom: 19px;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
</style>
