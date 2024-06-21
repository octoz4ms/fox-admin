<!-- 统计卡片 -->
<template>
  <el-row :gutter="15">
    <el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
      <el-card class="analysis-chart-card" shadow="never">
        <template v-slot:header>
          <div class="ele-cell">
            <div class="ele-cell-content">总销售额</div>
            <el-tooltip content="指标说明" placement="top">
              <i
                class="el-icon-_question ele-text-placeholder"
                style="cursor: pointer"
              >
              </i>
            </el-tooltip>
          </div>
        </template>
        <div class="analysis-chart-card-num ele-text-heading">¥ 126,560</div>
        <div class="analysis-chart-card-content" style="padding-top: 18px">
          <span class="ele-action">
            <span>周同比12%</span>
            <i class="el-icon-caret-top ele-text-danger"></i>
          </span>
          <span class="ele-action">
            <span>日同比11%</span>
            <i class="el-icon-caret-bottom ele-text-success"></i>
          </span>
        </div>
        <el-divider />
        <div class="analysis-chart-card-text">日销售额 ¥12,423</div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
      <el-card class="analysis-chart-card" shadow="never">
        <template v-slot:header>
          <div class="ele-cell">
            <div class="ele-cell-content">访问量</div>
            <el-tag size="mini" type="danger">日</el-tag>
          </div>
        </template>
        <div class="analysis-chart-card-num ele-text-heading">8,846</div>
        <div class="analysis-chart-card-content">
          <v-chart
            ref="visitChart"
            style="height: 40px"
            :option="visitChartOption"
          />
        </div>
        <el-divider />
        <div class="analysis-chart-card-text">日访问量 1,234</div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
      <el-card class="analysis-chart-card" shadow="never">
        <template v-slot:header>
          <div class="ele-cell">
            <div class="ele-cell-content">支付笔数</div>
            <el-tag size="mini">月</el-tag>
          </div>
        </template>
        <div class="analysis-chart-card-num ele-text-heading">6,560</div>
        <div class="analysis-chart-card-content">
          <v-chart
            ref="payNumChart"
            style="height: 40px"
            :option="payNumChartOption"
          />
        </div>
        <el-divider />
        <div class="analysis-chart-card-text">转化率 60%</div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
      <el-card class="analysis-chart-card" shadow="never">
        <template v-slot:header>
          <div class="ele-cell">
            <div class="ele-cell-content">运营活动效果</div>
            <el-tag size="mini" type="success">周</el-tag>
          </div>
        </template>
        <div class="analysis-chart-card-num ele-text-heading">78%</div>
        <div class="analysis-chart-card-content" style="padding-top: 25px">
          <el-progress
            :percentage="78"
            :show-text="false"
            :stroke-width="10"
            color="#13c2c2"
          />
        </div>
        <el-divider />
        <div class="analysis-chart-card-text">
          <span class="ele-action">
            <span>周同比12%</span>
            <i class="el-icon-caret-top ele-text-danger"></i>
          </span>
          <span class="ele-action">
            <span>日同比11%</span>
            <i class="el-icon-caret-bottom ele-text-success"></i>
          </span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart, BarChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { getPayNumList } from '@/api/dashboard/analysis';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['visitChart', 'payNumChart'])],
    data() {
      return {
        // 访问量折线图配置
        visitChartOption: {},
        // 支付笔数柱状图配置
        payNumChartOption: {}
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      this.getPayNumData();
    },
    methods: {
      /* 获取数据 */
      getPayNumData() {
        getPayNumList()
          .then((data) => {
            this.visitChartOption = {
              color: '#975fe5',
              tooltip: {
                trigger: 'axis',
                formatter:
                  '<i class="ele-chart-dot" style="background: #975fe5;"></i>{b0}: {c0}'
              },
              grid: {
                top: 10,
                bottom: 0,
                left: 0,
                right: 0
              },
              xAxis: [
                {
                  show: false,
                  type: 'category',
                  boundaryGap: false,
                  data: data.map((d) => d.date)
                }
              ],
              yAxis: [
                {
                  show: false,
                  type: 'value',
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.value)
                }
              ]
            };
            //
            this.payNumChartOption = {
              tooltip: {
                trigger: 'axis',
                formatter:
                  '<i class="ele-chart-dot" style="background: #5b8ff9;"></i>{b0}: {c0}'
              },
              grid: {
                top: 10,
                bottom: 0,
                left: 0,
                right: 0
              },
              xAxis: [
                {
                  show: false,
                  type: 'category',
                  data: data.map((d) => d.date)
                }
              ],
              yAxis: [
                {
                  show: false,
                  type: 'value',
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: 'bar',
                  data: data.map((d) => d.value)
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

<style lang="scss" scoped>
  .analysis-chart-card-num {
    font-size: 30px;
  }

  .analysis-chart-card-content {
    height: 40px;
    box-sizing: border-box;
    margin-bottom: 12px;
  }

  .analysis-chart-card-text {
    padding-top: 12px;
  }
</style>
