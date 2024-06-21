<template>
  <el-card shadow="never" header="热门搜索">
    <v-chart
      ref="hotSearchChart"
      style="height: 303px"
      :option="hotSearchChartOption"
    />
  </el-card>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import 'echarts-wordcloud';
  import { wordCloudColor } from 'ele-admin';
  import { getWordCloudList } from '@/api/dashboard/analysis';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([CanvasRenderer, TooltipComponent]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['hotSearchChart'])],
    data() {
      return {
        // 词云图表配置
        hotSearchChartOption: {}
      };
    },
    created() {
      this.getWordCloudData();
    },
    methods: {
      /* 获取词云数据 */
      getWordCloudData() {
        getWordCloudList()
          .then((data) => {
            this.hotSearchChartOption = {
              tooltip: {
                show: true,
                confine: true,
                borderWidth: 1
              },
              series: [
                {
                  type: 'wordCloud',
                  width: '100%',
                  height: '100%',
                  sizeRange: [12, 24],
                  gridSize: 6,
                  textStyle: {
                    color: wordCloudColor
                  },
                  emphasis: {
                    textStyle: {
                      shadowBlur: 8,
                      shadowColor: 'rgba(0, 0, 0, .15)'
                    }
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
