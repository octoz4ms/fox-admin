<template>
  <el-card
    shadow="never"
    header="最近1小时访问情况"
    body-style="padding: 14px 5px 0 0;"
  >
    <v-chart
      ref="visitHourChart"
      style="height: 323px"
      :option="visitHourChartOption"
    />
  </el-card>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import {
    GridComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { getVisitHourList } from '@/api/dashboard/analysis';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
  ]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['visitHourChart'])],
    data() {
      return {
        // 最近1小时访问情况折线图配置
        visitHourChartOption: {}
      };
    },
    created() {
      this.getVisitHourData();
    },
    methods: {
      /* 获取最近1小时访问情况数据 */
      getVisitHourData() {
        getVisitHourList()
          .then((data) => {
            this.visitHourChartOption = {
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['浏览量', '访问量'],
                right: 20
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: data.map((d) => d.time)
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '浏览量',
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.views)
                },
                {
                  name: '访问量',
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.visits)
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
