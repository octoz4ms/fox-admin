<template>
  <ele-pro-table
    ref="table"
    :columns="columns"
    :datasource="datasource"
    :selection.sync="selection"
    tool-class="ele-toolbar-actions"
  >
    <template v-slot:toolbar>
      <el-button size="small" type="primary" @click="read">
        批量完成
      </el-button>
      <el-button size="small" type="danger" @click="removeBatch">
        删除待办
      </el-button>
    </template>
    <template v-slot:status="{ row }">
      <span :class="['ele-text-danger', 'ele-text-info'][row.status]">
        {{ ['未完成', '已完成'][row.status] }}
      </span>
    </template>
    <template v-slot:action="{ row }">
      <el-link
        type="primary"
        :underline="false"
        icon="el-icon-finished"
        @click="view(row)"
      >
        完成
      </el-link>
      <el-popconfirm
        class="ele-action"
        title="确定要取消此待办吗?"
        @confirm="remove(row)"
      >
        <template v-slot:reference>
          <el-link type="danger" :underline="false" icon="el-icon-circle-close">
            取消
          </el-link>
        </template>
      </el-popconfirm>
    </template>
  </ele-pro-table>
</template>

<script>
  import { pageTodos } from '@/api/user/message';

  export default {
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
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'title',
            label: '待办内容',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'time',
            label: '结束时间',
            align: 'center',
            showOverflowTooltip: true,
            width: 140
          },
          {
            prop: 'status',
            label: '状态',
            align: 'center',
            showOverflowTooltip: true,
            width: 80,
            slot: 'status'
          },
          {
            columnKey: 'action',
            label: '操作',
            align: 'center',
            showOverflowTooltip: true,
            width: 140,
            resizable: false,
            slot: 'action'
          }
        ],
        // 列表选中数据
        selection: []
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order }) {
        return pageTodos({ ...where, ...order, page, limit });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 查看 */
      view(row) {
        this.$message.info(row.title);
      },
      /* 删除单个 */
      remove(row) {
        console.log(row);
        this.$message.info('点击了删除');
        this.updateUnReadNum();
      },
      /* 批量删除 */
      removeBatch() {
        if (!this.selection.length) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        this.$message.info('点击了删除');
        this.updateUnReadNum();
      },
      /* 标记已读 */
      read() {
        if (!this.selection.length) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        this.selection.forEach((d) => {
          d.status = 1;
        });
        this.updateUnReadNum();
      },
      /* 触发更新未读数量事件 */
      updateUnReadNum() {
        this.$emit('update-data');
      }
    }
  };
</script>
