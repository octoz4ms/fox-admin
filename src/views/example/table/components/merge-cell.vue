<template>
  <el-card shadow="never">
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      row-key="id"
      title="合并单元格"
      :columns="columns"
      :datasource="datasource"
      :span-method="spanMethod"
      size="mini"
    />
  </el-card>
</template>

<script>
  import { pageUserScores } from '@/api/example/table';

  export default {
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            columnKey: 'userName',
            prop: 'userName',
            label: '姓名',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'courseName',
            label: '课程',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'score',
            label: '得分',
            showOverflowTooltip: true,
            minWidth: 110
          }
        ]
      };
    },
    methods: {
      /* 表格数据源 */
      datasource() {
        return pageUserScores();
      },
      /* 合并表格单元格 */
      spanMethod({ row, column }) {
        if (column.columnKey === 'userName') {
          return [row.userNameRowSpan, 1];
        }
        return [1, 1];
      }
    }
  };
</script>
