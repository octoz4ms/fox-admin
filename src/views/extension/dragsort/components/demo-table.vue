<template>
  <el-card shadow="never" header="表格拖拽排序">
    <el-row :gutter="15">
      <el-col
        v-for="(item, index) in taskList"
        :key="index"
        v-bind="styleResponsive ? { md: 8 } : { span: 8 }"
      >
        <table class="ele-table ele-table-border ele-table-medium">
          <colgroup>
            <col width="40" />
            <col />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>任务名称</th>
              <th style="text-align: center">状态</th>
            </tr>
          </thead>
          <vue-draggable
            tag="tbody"
            :value="item"
            :animation="300"
            group="demoDragTable"
            handle=".demo-table-drag-handle"
            :set-data="() => void 0"
            @input="(value) => updateModelValue(value, index)"
          >
            <tr v-for="d in item" :key="d.id">
              <td style="text-align: center">
                <i
                  class="demo-table-drag-handle el-icon-rank ele-text-secondary"
                  style="cursor: move"
                ></i>
              </td>
              <td>{{ d.taskName }}</td>
              <td style="text-align: center">
                <span
                  :class="
                    ['ele-text-warning', 'ele-text-success', 'ele-text-info'][
                      d.status
                    ]
                  "
                >
                  {{ ['未开始', '进行中', '已完成'][d.status] }}
                </span>
              </td>
            </tr>
            <template v-slot:footer>
              <tr v-if="!item.length" style="background: none">
                <td colspan="3" style="text-align: center">暂无数据</td>
              </tr>
            </template>
          </vue-draggable>
        </table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import VueDraggable from 'vuedraggable';

  export default {
    components: { VueDraggable },
    data() {
      return {
        taskList: [],
        result: '',
        visible: false
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 更新数据 */
      updateModelValue(value, index) {
        //this.taskList[index] = value;
        this.$set(this.taskList, index, value);
      },
      /* 查看数据 */
      viewData() {
        this.result = JSON.stringify(this.taskList, null, 4);
        this.visible = true;
      }
    },
    created() {
      // 处理数据
      const temp = [];
      for (let i = 0; i < 18; i++) {
        const index = parseInt(String(i / 6));
        if (temp[index] == null) {
          temp[index] = [];
        }
        temp[index].push({
          id: i,
          taskName: '测试任务' + (i + 1),
          status: 0
        });
      }
      this.taskList = temp;
    }
  };
</script>

<style lang="scss" scoped>
  /* 表格行拖拽按下去样式 */
  .ele-table tr.sortable-chosen {
    background: hsla(0, 0%, 60%, 0.1);
  }
</style>
