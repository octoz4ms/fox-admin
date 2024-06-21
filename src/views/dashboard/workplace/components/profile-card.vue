<!-- 用户信息 -->
<template>
  <el-card shadow="never" body-style="padding: 20px;">
    <div
      :class="[
        'ele-cell',
        'workplace-user-card',
        { 'workplace-user-responsive': styleResponsive }
      ]"
    >
      <div class="ele-cell-content ele-cell">
        <el-avatar :size="68" :src="loginUser.avatar" />
        <div class="ele-cell-content">
          <h4 class="ele-elip">
            早安, {{ loginUser.nickname }} , 开始您一天的工作吧!
          </h4>
          <div class="ele-text-secondary ele-elip" style="margin-top: 8px">
            <i class="el-icon-heavy-rain"></i>
            <em>今日阴转小雨, 22℃ - 32℃ , 出门记得带伞哦。</em>
          </div>
        </div>
      </div>
      <div class="workplace-count-group">
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <el-tag size="small" class="ele-tag-round">
              <i class="el-icon-menu"></i>
            </el-tag>
            <span class="workplace-count-name">项目数</span>
          </div>
          <div class="workplace-count-num ele-text-heading">3</div>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <el-tag type="warning" size="small" class="ele-tag-round">
              <i class="el-icon-finished"></i>
            </el-tag>
            <span class="workplace-count-name">待办项</span>
          </div>
          <div class="workplace-count-num ele-text-heading">6 / 24</div>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <el-tag type="success" size="small" class="ele-tag-round">
              <i class="el-icon-bell"></i>
            </el-tag>
            <span class="workplace-count-name">消息</span>
          </div>
          <div class="workplace-count-num ele-text-heading">1,689</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    computed: {
      // 当前登录用户信息
      loginUser() {
        return this.$store.state.user.info;
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .workplace-user-card {
    .ele-cell-content {
      overflow: hidden;
    }

    .workplace-count-group {
      white-space: nowrap;
    }

    .workplace-count-item {
      padding: 0 5px 0 25px;
      box-sizing: border-box;
      display: inline-block;
      text-align: right;
    }

    .workplace-count-name {
      padding-left: 8px;
    }

    .workplace-count-num {
      font-size: 24px;
      margin-top: 6px;
    }
  }

  @media screen and (max-width: 992px) {
    .workplace-user-responsive .workplace-count-item {
      padding: 0 5px 0 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .workplace-user-responsive.workplace-user-card {
      display: block;

      .workplace-count-group {
        display: block;
        margin-top: 15px;
        text-align: right;
      }
    }
  }
</style>
