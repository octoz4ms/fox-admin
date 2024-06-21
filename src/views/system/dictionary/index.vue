<template>
  <div class="ele-body">
    <el-card shadow="never">
      <ele-split-layout
        width="266px"
        allow-collapse
        :right-style="{ overflow: 'hidden' }"
      >
        <!-- 表格 -->
        <ele-pro-table
          ref="table"
          :columns="columns"
          :datasource="datasource"
          height="calc(100vh - 265px)"
          :need-page="false"
          :toolkit="[]"
          :current.sync="current"
          highlight-current-row
          class="dict-table"
          tool-class="ele-toolbar-actions"
          @done="done"
        >
          <!-- 表头工具栏 -->
          <template v-slot:toolbar>
            <div style="margin: 5px 0">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                class="ele-btn-icon"
                @click="openEdit()"
              >
                添加
              </el-button>
              <el-button
                size="small"
                type="warning"
                icon="el-icon-edit"
                class="ele-btn-icon"
                :disabled="!current"
                @click="openEdit(current)"
              >
                修改
              </el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                class="ele-btn-icon"
                :disabled="!current"
                @click="remove"
              >
                删除
              </el-button>
            </div>
          </template>
        </ele-pro-table>
        <template v-slot:content>
          <!-- 数据字典项列表 -->
          <dict-data v-if="current" :dict-id="current.dictId" />
        </template>
      </ele-split-layout>
    </el-card>
    <!-- 编辑弹窗 -->
    <dict-edit :visible.sync="showEdit" :data="editData" @done="reload" />
  </div>
</template>

<script>
  import DictData from './components/dict-data.vue';
  import DictEdit from './components/dict-edit.vue';
  import { listDictionaries, removeDictionary } from '@/api/system/dictionary';

  export default {
    name: 'SystemDictionary',
    components: { DictData, DictEdit },
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
            prop: 'dictName',
            label: '字典名称',
            showOverflowTooltip: true
          }
        ],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false,
        // 编辑回显数据
        editData: null
      };
    },
    methods: {
      /* 表格数据源 */
      datasource() {
        return listDictionaries();
      },
      /* 表格渲染完成回调 */
      done(res) {
        if (res.data?.length) {
          this.$refs.table.setCurrentRow(res.data[0]);
        }
      },
      /* 刷新表格 */
      reload() {
        this.$refs.table.reload();
      },
      /* 显示编辑 */
      openEdit(row) {
        this.editData = row;
        this.showEdit = true;
      },
      /* 删除 */
      remove() {
        this.$confirm('确定要删除选中的字典吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            removeDictionary(this.current.dictId)
              .then((msg) => {
                loading.close();
                this.$message.success(msg);
                this.reload();
              })
              .catch((e) => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .dict-table {
    :deep(.el-table__row) {
      cursor: pointer;
    }

    :deep(.el-table__row > td:last-child:after) {
      content: '\e6e0';
      font-family: element-icons !important;
      font-style: normal;
      font-variant: normal;
      text-transform: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -7px;
    }

    :deep(.el-table__row > td:last-child .cell) {
      padding-right: 20px;
    }
  }
</style>
