<template>
  <el-card shadow="never">
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      row-key="menuId"
      title="树形表格懒加载"
      :columns="columns"
      :datasource="datasource"
      :need-page="false"
      :lazy="true"
      size="mini"
    >
      <!-- 标题列 -->
      <template v-slot:title="{ row }">
        <i :class="row.icon"></i> {{ row.title }}
      </template>
    </ele-pro-table>
  </el-card>
</template>

<script>
  import { listMenus } from '@/api/system/menu';

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
            showOverflowTooltip: true
          },
          {
            prop: 'title',
            label: '菜单名称',
            showOverflowTooltip: true,
            minWidth: 110,
            slot: 'title'
          },
          {
            prop: 'path',
            label: '路由地址',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'component',
            label: '组件路径',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'sortNumber',
            label: '排序',
            align: 'center',
            showOverflowTooltip: true,
            width: 60
          },
          {
            prop: 'createTime',
            label: '创建时间',
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
      datasource({ where, parent }) {
        return listMenus({
          ...where,
          parentId: parent?.menuId ?? 0
        });
      }
    }
  };
</script>
