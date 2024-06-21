<!-- 统计卡片 -->
<template>
  <el-row :gutter="15">
    <el-col v-bind="styleResponsive ? { md: 6, sm: 12 } : { span: 6 }">
      <el-card shadow="never" class="monitor-count-card">
        <el-tag size="large" class="ele-tag-round">
          <i class="el-icon-s-custom"></i>
        </el-tag>
        <div class="monitor-count-card-num ele-text-heading">21.2 k</div>
        <div class="monitor-count-card-text ele-text-secondary">
          总访问人数
        </div>
        <ele-avatar-list :data="visitUsers" :size="22" :max="4" />
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { md: 6, sm: 12 } : { span: 6 }">
      <el-card shadow="never" class="monitor-count-card">
        <el-tag size="large" type="warning" class="ele-tag-round">
          <i class="el-icon-_sent"></i>
        </el-tag>
        <div class="monitor-count-card-num ele-text-heading">1.6 k</div>
        <div class="monitor-count-card-text ele-text-secondary">
          点击量 (近30天)
        </div>
        <div class="monitor-count-card-trend ele-text-success">
          <i class="el-icon-arrow-up"></i>
          <span>110.5%</span>
        </div>
        <el-tooltip content="指标说明" placement="top">
          <i
            class="el-icon-_question ele-text-placeholder monitor-count-card-tips"
          >
          </i>
        </el-tooltip>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { md: 6, sm: 12 } : { span: 6 }">
      <el-card shadow="never" class="monitor-count-card">
        <el-tag size="large" type="danger" class="ele-tag-round">
          <i class="el-icon-s-flag"></i>
        </el-tag>
        <div class="monitor-count-card-num ele-text-heading">826.0</div>
        <div class="monitor-count-card-text ele-text-secondary">
          到达量 (近30天)
        </div>
        <div class="monitor-count-card-trend ele-text-danger">
          <i class="el-icon-arrow-down"></i>
          <span>15.5%</span>
        </div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { md: 6, sm: 12 } : { span: 6 }">
      <el-card shadow="never" class="monitor-count-card">
        <el-tag size="large" type="success" class="ele-tag-round">
          <i class="el-icon-_flash-solid"></i>
        </el-tag>
        <div class="monitor-count-card-num ele-text-heading">28.8 %</div>
        <div class="monitor-count-card-text">转化率 (近30天)</div>
        <div class="monitor-count-card-trend ele-text-success">
          <i class="el-icon-arrow-up"></i>
          <span>65.8%</span>
        </div>
        <el-tooltip content="指标说明" placement="top">
          <i
            class="el-icon-_question ele-text-placeholder monitor-count-card-tips"
          >
          </i>
        </el-tooltip>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        // 访问人数
        visitUsers: [
          {
            name: 'SunSmile',
            avatar:
              'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
          },
          {
            name: '你的名字很好听',
            avatar:
              'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
          },
          {
            name: '全村人的希望',
            avatar:
              'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
          },
          {
            name: 'Jasmine',
            avatar:
              'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
          },
          {
            name: '酷酷的大叔',
            avatar:
              'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
          },
          {
            name: '管理员',
            avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg'
          }
        ]
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .monitor-count-card {
    :deep(.el-card__body) {
      padding-top: 18px;
      text-align: center;
      position: relative;
    }

    :deep(.el-tag) {
      border-color: transparent;
      font-size: 15px;
    }

    .monitor-count-card-num {
      font-weight: 500;
      font-size: 32px;
      margin-top: 12px;
    }

    .monitor-count-card-text {
      font-size: 12px;
      margin: 10px 0;
    }

    .monitor-count-card-trend {
      font-weight: 600;
      padding: 6px 0;

      & > i {
        font-size: 12px;
        font-weight: 600;
        margin-right: 5px;
      }
    }

    .monitor-count-card-tips {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }
  }
</style>
