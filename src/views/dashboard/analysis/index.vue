<template>
  <div class="ele-body ele-body-card">
    <statistics-card />
    <sale-card />
    <el-row :gutter="15">
      <el-col v-bind="styleResponsive ? { lg: 18, md: 16 } : { span: 18 }">
        <visit-hour />
      </el-col>
      <el-col v-bind="styleResponsive ? { lg: 6, md: 8 } : { span: 6 }">
        <hot-search />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import StatisticsCard from './components/statistics-card.vue';
  import SaleCard from './components/sale-card.vue';
  import VisitHour from './components/visit-hour.vue';
  import HotSearch from './components/hot-search.vue';

  export default {
    name: 'DashboardAnalysis',
    components: {
      StatisticsCard,
      SaleCard,
      VisitHour,
      HotSearch
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>
