<template>
  <el-card shadow="never" header="用户分布">
    <el-row>
      <el-col v-bind="styleResponsive ? { sm: 18 } : { span: 18 }">
        <v-chart
          ref="userCountMapChart"
          style="height: 444px"
          :option="userCountMapOption"
        />
      </el-col>
      <el-col v-bind="styleResponsive ? { sm: 6 } : { span: 6 }">
        <div style="padding: 10px 5px 0 0">
          <div
            v-for="(item, index) in userCountDataRank"
            :key="index"
            class="monitor-user-count-item ele-cell"
          >
            <div>{{ item.name }}</div>
            <div class="ele-cell-content">
              <el-progress
                :stroke-width="10"
                :show-text="false"
                :percentage="item.percent"
              />
            </div>
            <div>{{ item.value }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { use, registerMap } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { MapChart } from 'echarts/charts';
  import {
    VisualMapComponent,
    GeoComponent,
    TooltipComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { getChinaMapData, getUserCountList } from '@/api/dashboard/monitor';
  import { echartsMixin } from '@/utils/echarts-mixin';

  use([
    CanvasRenderer,
    MapChart,
    VisualMapComponent,
    GeoComponent,
    TooltipComponent
  ]);

  export default {
    components: { VChart },
    mixins: [echartsMixin(['userCountMapChart'])],
    data() {
      return {
        // 用户分布地图配置
        userCountMapOption: {},
        // 用户分布前10名
        userCountDataRank: []
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      this.registerChinaMap();
    },
    methods: {
      /* 获取中国地图数据并注册地图 */
      registerChinaMap() {
        getChinaMapData()
          .then((data) => {
            registerMap('china', data);
            this.getUserCountData();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取用户分布数据 */
      getUserCountData() {
        getUserCountList()
          .then((data) => {
            const temp = data.sort((a, b) => b.value - a.value);
            const min = temp[temp.length - 1].value || 0;
            const max = temp[0].value || 1;
            //
            const list = temp.length > 10 ? temp.slice(0, 15) : temp;
            this.userCountDataRank = list.map((d) => {
              return {
                name: d.name,
                value: d.value,
                percent: (d.value / max) * 100
              };
            });
            //
            this.userCountMapOption = {
              tooltip: {
                trigger: 'item',
                borderWidth: 1
              },
              visualMap: {
                min: min,
                max: max,
                text: ['高', '低'],
                calculable: true
              },
              series: [
                {
                  name: '用户数',
                  label: {
                    show: true
                  },
                  type: 'map',
                  map: 'china',
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

<style lang="scss" scoped>
  /* 人数分布排名 */
  .monitor-user-count-item {
    margin-bottom: 8px;

    :deep(.el-progress-bar__outer) {
      background: none;
    }

    .ele-cell-content {
      padding-right: 10px;
    }
  }
</style>
