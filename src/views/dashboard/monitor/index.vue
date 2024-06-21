<template>
  <div class="ele-body ele-body-card">
    <statistics-card />
    <el-row :gutter="15">
      <el-col v-bind="styleResponsive ? { lg: 18 } : { span: 18 }">
        <map-card />
      </el-col>
      <el-col v-bind="styleResponsive ? { lg: 6 } : { span: 6 }">
        <el-row :gutter="15">
          <el-col
            v-bind="styleResponsive ? { lg: 24, md: 12, sm: 24 } : { span: 24 }"
          >
            <online-num />
          </el-col>
          <el-col
            v-bind="styleResponsive ? { lg: 24, md: 12, sm: 24 } : { span: 24 }"
          >
            <browser-card />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <user-rate />
  </div>
</template>

<script>
  import StatisticsCard from './components/statistics-card.vue';
  import MapCard from './components/map-card.vue';
  import OnlineNum from './components/online-num.vue';
  import BrowserCard from './components/browser-card.vue';
  import UserRate from './components/user-rate.vue';

  export default {
    name: 'DashboardMonitor',
    components: {
      StatisticsCard,
      MapCard,
      OnlineNum,
      BrowserCard,
      UserRate
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>
