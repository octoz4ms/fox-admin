<template>
  <el-card shadow="never">
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      row-key="userId"
      title="可控的排序和筛选"
      :columns="columns"
      :datasource="datasource"
      size="mini"
    >
      <template #toolkit>
        <el-button size="small" type="primary" @click="setSorter">
          设置用户名排序
        </el-button>
        <el-button size="small" type="primary" @click="resetAll">
          重置排序和筛选
        </el-button>
        <div style="padding: 0 10px">
          <el-divider direction="vertical" />
        </div>
      </template>
    </ele-pro-table>
  </el-card>
</template>

<script>
  import { pageUsers } from '@/api/system/user';

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
            prop: 'username',
            label: '用户账号',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'nickname',
            label: '用户名',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            columnKey: 'sexName',
            prop: 'sexName',
            label: '性别',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 80,
            filterMultiple: false,
            filters: [
              {
                text: '男',
                value: '男'
              },
              {
                text: '女',
                value: '女'
              }
            ]
          },
          {
            prop: 'phone',
            label: '手机号',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'createTime',
            label: '创建时间',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            formatter: (_row, _column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          }
        ]
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, order, filterValue }) {
        return pageUsers({ ...order, ...filterValue, page, limit });
      },
      /* 设置排序 */
      setSorter() {
        this.$refs.table.sort('nickname', 'descending');
      },
      /* 重置排序和筛选 */
      resetAll() {
        this.$refs.table.clearSort();
        this.$refs.table.clearFilter();
        this.$refs.table.reload({ orders: {}, filters: {} });
      }
    }
  };
</script>
