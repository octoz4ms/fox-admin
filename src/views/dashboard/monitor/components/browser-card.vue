<template>
  <el-card shadow="never" header="浏览器分布" body-style="padding: 0 10px;">
    <v-chart
      ref="browserChart"
      style="height: 240px"
      :option="browserChartOption"
    />
  </el-card>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { getBrowserCountList } from '@/api/dashboard/monitor';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['browserChart'])],
    data() {
      return {
        // 浏览器分布饼图配置
        browserChartOption: {}
      };
    },
    created() {
      this.getBrowserCountData();
    },
    methods: {
      /* 获取用户浏览器分布数据 */
      getBrowserCountData() {
        getBrowserCountList()
          .then((data) => {
            this.browserChartOption = {
              tooltip: {
                trigger: 'item',
                confine: true,
                borderWidth: 1
              },
              legend: {
                bottom: 5,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'circle',
                data: data.map((d) => d.name)
              },
              series: [
                {
                  type: 'pie',
                  radius: ['45%', '70%'],
                  center: ['50%', '43%'],
                  label: {
                    show: false
                  },
                  data: data
                }
              ]
            };
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      }
    }
  };
</script>
