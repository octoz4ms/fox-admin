<template>
  <div class="ele-body">
    <el-card shadow="never">
      <ele-pro-table
        ref="table"
        :columns="columns"
        :datasource="datasource"
        :selection.sync="selection"
        :show-summary="true"
        :summary-method="getSummaries"
        :height="fixedHeight ? 'calc(100vh - 344px)' : void 0"
      >
        <template v-slot:toolbar>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-sort"
            class="ele-btn-icon"
            @click="openFileSortDialog"
          >
            卷内文件调整
          </el-button>
          <span>&emsp;固定高度&nbsp;</span>
          <el-switch v-model="fixedHeight" @change="destroyTable" />
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 卷内文件调整弹窗 -->
    <file-sort :visible.sync="showFileSort" :documents="fileSortChoose" />
  </div>
</template>

<script>
  import FileSort from './components/file-sort.vue';
  import { getPieceList } from '@/api/example/document';

  export default {
    name: 'ExampleDocument',
    components: { FileSort },
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center',
            fixed: 'left'
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            fixed: 'left'
          },
          {
            prop: 'piece_no',
            label: '案卷档号',
            width: 215,
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'title',
            label: '案卷题名',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'year',
            label: '年度',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'retention',
            label: '保管期限',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'secret',
            label: '密级',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'type',
            label: '档案类别',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'carrier',
            label: '载体规格',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'amount',
            label: '件数',
            minWidth: 110,
            showOverflowTooltip: true
          }
        ],
        // 是否显示卷内文件调整弹窗
        showFileSort: false,
        // 列表选中数据
        selection: [],
        // 选中的案卷
        fileSortChoose: [],
        // 表格固定高度
        fixedHeight: false
      };
    },
    methods: {
      /* 列表数据源 */
      datasource({ page, limit, where, order }) {
        return getPieceList({ ...where, ...order, page, limit });
      },
      /* 打开卷内文件调整弹窗 */
      openFileSortDialog() {
        if (this.selection.length < 2) {
          this.$message.error('请至少选择两条数据');
          return;
        }
        // 实际项目用这一行
        /*this.fileSortChoose = this.selection.map(d => {
          return { ...d };
        });*/
        // 演示强制选前三个演示
        this.fileSortChoose = this.$refs.table.tableData.slice(0, 3);
        this.showFileSort = true;
      },
      /* 表格合计行 */
      getSummaries({ columns, data }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 2) {
            sums[index] = '合计';
          } else if (column.property === 'amount') {
            sums[index] = data
              .map((item) => Number(item[column.property]))
              .reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
          }
        });
        return sums;
      },
      /* 销毁表格 */
      destroyTable() {
        this.$refs.table.reRenderTable();
      }
    }
  };
</script>
