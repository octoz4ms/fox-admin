<template>
  <el-row :gutter="15">
    <el-col v-bind="styleResponsive ? { lg: 8 } : { span: 8 }">
      <el-card shadow="never" header="用户评价">
        <div class="ele-cell ele-cell-align-bottom">
          <div class="ele-text-heading" style="font-size: 48px">4.5</div>
          <div class="ele-cell-content" style="padding-bottom: 8px">
            <el-rate
              v-model="userRate"
              disabled
              show-score
              text-color="#F7BA2A"
              score-template="很棒"
            />
          </div>
        </div>
        <div class="ele-cell" style="margin: 15px 0">
          <div style="font-size: 29px" class="ele-text-placeholder">-0%</div>
          <div class="ele-cell-content ele-text-small ele-text-secondary">
            当前没有评价波动
          </div>
        </div>
        <div class="ele-cell">
          <div class="ele-cell-content">
            <el-progress :percentage="60" :show-text="false" status="success" />
          </div>
          <div
            style="width: 80px; white-space: nowrap"
            class="ele-text-secondary"
          >
            <span><s></s><i class="el-icon-star-on"></i></span>
            <span> 5 : 368人</span>
          </div>
        </div>
        <div class="ele-cell">
          <div class="ele-cell-content">
            <el-progress :percentage="40" :show-text="false" />
          </div>
          <div
            style="width: 80px; white-space: nowrap"
            class="ele-text-secondary"
          >
            <span><s></s><i class="el-icon-star-on"></i></span>
            <span> 4 : 256人</span>
          </div>
        </div>
        <div class="ele-cell">
          <div class="ele-cell-content">
            <el-progress :percentage="20" :show-text="false" status="warning" />
          </div>
          <div
            style="width: 80px; white-space: nowrap"
            class="ele-text-secondary"
          >
            <span><s></s><i class="el-icon-star-on"></i></span>
            <span> 3 : 49人</span>
          </div>
        </div>
        <div class="ele-cell">
          <div class="ele-cell-content">
            <el-progress
              :percentage="10"
              :show-text="false"
              status="exception"
            />
          </div>
          <div
            style="width: 80px; white-space: nowrap"
            class="ele-text-secondary"
          >
            <span><s></s><i class="el-icon-star-on"></i></span>
            <span> 2 : 14人</span>
          </div>
        </div>
        <div class="ele-cell">
          <div class="ele-cell-content">
            <el-progress :percentage="0" :show-text="false" />
          </div>
          <div
            style="width: 80px; white-space: nowrap"
            class="ele-text-secondary"
          >
            <span><s></s><i class="el-icon-star-on"></i></span>
            <span> 1 : 0人</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
      <el-card shadow="never" header="用户满意度">
        <div class="ele-cell" style="margin: 15px 0">
          <div
            class="ele-cell-content ele-text-center ele-text-heading"
            style="font-size: 24px"
          >
            856
          </div>
          <div class="ele-cell-content ele-text-center">
            <div class="monitor-face-smile">
              <span></span>
            </div>
            <div class="ele-text-secondary" style="margin-top: 5px">
              正面评论
            </div>
          </div>
          <h2 class="ele-cell-content ele-text-success ele-text-center">
            82%
          </h2>
        </div>
        <el-divider />
        <div class="ele-cell" style="margin: 15px 0 12px 0">
          <div
            class="ele-cell-content ele-text-center ele-text-heading"
            style="font-size: 24px"
          >
            60
          </div>
          <div class="ele-cell-content ele-text-center">
            <div class="monitor-face-cry">
              <span></span>
            </div>
            <div class="ele-text-secondary" style="margin-top: 5px">
              负面评论
            </div>
          </div>
          <h2 class="ele-cell-content ele-text-danger ele-text-center">9%</h2>
        </div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
      <el-card shadow="never" header="用户活跃度">
        <div class="ele-cell" style="padding: 35px 0; justify-content: center">
          <div class="monitor-progress-group">
            <el-progress
              type="circle"
              :percentage="70"
              status="success"
              :show-text="false"
              :width="140"
            />
            <el-progress
              type="circle"
              :percentage="60"
              :show-text="false"
              :width="115"
              :stroke-width="5"
            />
            <el-progress
              type="circle"
              :percentage="35"
              status="exception"
              :show-text="false"
              :width="90"
              :stroke-width="4"
            />
          </div>
          <div class="monitor-progress-legends" style="padding-left: 12px">
            <div class="ele-text-small">
              <ele-dot :ripple="false" text="活跃率: 70%" />
            </div>
            <div class="ele-text-small">
              <ele-dot type="success" :ripple="false" text="留存率: 60%" />
            </div>
            <div class="ele-text-small">
              <ele-dot type="danger" :ripple="false" text="跳出率: 35%" />
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        // 用户评分
        userRate: 4.5
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
  /* 笑脸、哭脸 */
  .monitor-face-smile,
  .monitor-face-cry {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: #fbd971;
    border-radius: 50%;
    position: relative;
  }

  .monitor-face-smile > span,
  .monitor-face-smile:before,
  .monitor-face-smile:after,
  .monitor-face-cry > span,
  .monitor-face-cry:before,
  .monitor-face-cry:after {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transform: rotate(225deg);
    border: 3px solid #f0c419;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    position: absolute;
    bottom: 8px;
    left: 11px;
  }

  .monitor-face-smile:before,
  .monitor-face-smile:after,
  .monitor-face-cry:before,
  .monitor-face-cry:after {
    content: '';
    width: 6px;
    height: 6px;
    left: 8px;
    top: 14px;
    border-color: #f29c1f;
    transform: rotate(45deg);
  }

  .monitor-face-smile:after,
  .monitor-face-cry:after {
    left: auto;
    right: 8px;
  }

  .monitor-face-cry > span {
    transform: rotate(45deg);
    bottom: -6px;
  }

  /* 圆形进度条组合 */
  .monitor-progress-group {
    position: relative;
    display: inline-block;

    .el-progress:not(:first-child) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: -1px;
    }

    :deep(.el-progress-circle__track) {
      stroke: hsla(0deg, 0%, 60%, 0.15);
    }
  }

  .monitor-progress-legends > div + div {
    margin-top: 8px;
  }
</style>
