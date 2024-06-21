<template>
  <el-card shadow="never" header="在线人数">
    <div
      :class="[
        'monitor-online-num-card',
        { 'monitor-online-num-responsive': styleResponsive }
      ]"
    >
      <div class="monitor-online-num-text">{{ currentTime }}</div>
      <div class="monitor-online-num-title ele-text-heading">
        <vue-count-up :end-val="onlineNum" />
      </div>
      <div class="monitor-online-num-text">在线总人数</div>
      <ele-dot :text="updateTimeText" />
    </div>
  </el-card>
</template>

<script>
  import VueCountUp from 'vue-countup-v2';

  export default {
    components: { VueCountUp },
    data() {
      return {
        // 在线总人数倒计时
        updateTime: 10,
        // 当前时间
        currentTime: '20:58:22',
        // 在线人数
        onlineNum: 228,
        // 在线人数更新定时器
        onlineNumTimer: null
      };
    },
    computed: {
      // 在线人数倒计时文字
      updateTimeText() {
        return this.updateTime + ' 秒后更新';
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      this.startUpdateOnlineNum();
    },
    methods: {
      /* 在线人数更新倒计时 */
      startUpdateOnlineNum() {
        this.currentTime = this.$util.toDateString(new Date(), 'HH:mm:ss');
        this.onlineNumTimer = setInterval(() => {
          this.currentTime = this.$util.toDateString(new Date(), 'HH:mm:ss');
          if (this.updateTime === 1) {
            this.updateTime = 10;
            this.onlineNum = 100 + Math.round(Math.random() * 900);
          } else {
            this.updateTime--;
          }
        }, 1000);
      }
    },
    beforeDestroy() {
      // 销毁定时器
      if (this.onlineNumTimer) {
        clearInterval(this.onlineNumTimer);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .monitor-online-num-card {
    text-align: center;
    padding: 5px 0;
  }

  .monitor-online-num-text {
    margin-bottom: 5px;
  }

  .monitor-online-num-title {
    font-size: 48px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 1200px) {
    .monitor-online-num-responsive.monitor-online-num-card {
      padding: 42px 0;
    }
  }
</style>
