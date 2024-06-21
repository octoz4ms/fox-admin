<template>
  <el-card shadow="never" body-style="padding: 0;">
    <div class="ele-cell demo-monitor-tool">
      <div class="ele-cell-content">
        <el-tabs
          v-model="saleSearch.type"
          class="demo-monitor-tabs"
          @tab-click="onSaleTypeChange"
        >
          <el-tab-pane label="销售额" name="saleroom" />
          <el-tab-pane label="访问量" name="visits" />
        </el-tabs>
      </div>
      <div :class="['ele-inline-block', { 'hidden-xs-only': styleResponsive }]">
        <el-radio-group v-model="saleSearch.dateType" size="small">
          <el-radio-button :label="0">今天</el-radio-button>
          <el-radio-button :label="1">本周</el-radio-button>
          <el-radio-button :label="2">本月</el-radio-button>
          <el-radio-button :label="3">本年</el-radio-button>
        </el-radio-group>
      </div>
      <div
        :class="['ele-inline-block', { 'hidden-sm-and-down': styleResponsive }]"
        style="width: 260px; margin-left: 10px"
      >
        <el-date-picker
          unlink-panels
          type="daterange"
          class="ele-fluid"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
          v-model="saleSearch.datetime"
          range-separator="至"
          size="small"
        />
      </div>
    </div>
    <el-divider />
    <el-row>
      <el-col v-bind="styleResponsive ? { lg: 18, md: 16 } : { span: 18 }">
        <div class="demo-monitor-title">
          <span v-if="saleSearch.type === 'saleroom'">销售额趋势</span>
          <span v-else>访问量趋势</span>
        </div>
        <v-chart
          ref="saleChart"
          style="height: 285px"
          :option="saleChartOption"
        />
      </el-col>
      <el-col v-bind="styleResponsive ? { lg: 6, md: 8 } : { span: 6 }">
        <div class="demo-monitor-title" style="display: flex">
          <div>门店</div>
          <div>
            <span v-if="saleSearch.type === 'saleroom'">销售额</span>
            <span v-else>访问量</span>
          </div>
          <div>排名</div>
        </div>
        <div
          v-for="(item, index) in saleroomRankData"
          :key="index"
          class="demo-monitor-rank-item ele-cell"
          style="margin-bottom: 15px"
        >
          <el-tag
            size="mini"
            type="info"
            :effect="index < 3 ? 'dark' : 'light'"
            :color="index < 3 ? '#314659' : 'hsla(0, 0%, 60%, .2)'"
            style="border-color: transparent"
            class="ele-tag-round"
          >
            {{ index + 1 }}
          </el-tag>
          <div class="ele-cell-content">{{ item.name }}</div>
          <div class="ele-text-secondary">{{ item.value }}</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { getSaleroomList } from '@/api/dashboard/analysis';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['saleChart'])],
    data() {
      return {
        // 销售量搜索参数
        saleSearch: {
          type: 'saleroom',
          dateType: 0,
          datetime: ''
        },
        // 销售量趋势数据
        saleroomData1: [],
        // 访问量趋势数据
        saleroomData2: [],
        // 门店排名数据
        saleroomRankData: [
          { name: '工专路 1 号店', value: '323,234' },
          { name: '工专路 2 号店', value: '323,234' },
          { name: '工专路 3 号店', value: '323,234' },
          { name: '工专路 4 号店', value: '323,234' },
          { name: '工专路 5 号店', value: '323,234' },
          { name: '工专路 6 号店', value: '323,234' },
          { name: '工专路 7 号店', value: '323,234' }
        ],
        // 销售额柱状图配置
        saleChartOption: {}
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      this.getSaleroomData();
    },
    methods: {
      /* 获取销售量数据 */
      getSaleroomData() {
        getSaleroomList()
          .then((data) => {
            this.saleroomData1 = data.list1;
            this.saleroomData2 = data.list2;
            this.onSaleTypeChange();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },

      /* 销售量tab选择改变事件 */
      onSaleTypeChange() {
        const isSale = this.saleSearch.type === 'saleroom';
        const data = isSale ? this.saleroomData1 : this.saleroomData2;
        this.saleChartOption = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              type: 'category',
              data: data.map((d) => d.month)
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              data: data.map((d) => d.value)
            }
          ]
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* 销售额、访问量工具栏 */
  .demo-monitor-tool {
    padding: 0 20px;

    .demo-monitor-tabs {
      height: 51px;
    }

    :deep(.el-tabs__item) {
      height: 51px;
      line-height: 51px;
      font-size: 15px;
    }

    :deep(.el-tabs__nav-wrap:after) {
      display: none;
    }
  }

  /* 小标题 */
  .demo-monitor-title {
    padding: 0 20px;
    margin: 15px 0 5px 0;
  }

  /* 排名 item */
  .demo-monitor-rank-item {
    padding: 0 20px;
    line-height: 20px;
    margin-top: 18px;
  }
</style>
