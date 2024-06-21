<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <operation-record-search @search="reload" />
      <!-- 数据表格 -->
      <ele-pro-table
        ref="table"
        :datasource="datasource"
        :columns="columns"
        cache-key="systemOperationRecordTable"
      >
        <!-- 表头工具栏 -->
        <template v-slot:toolbar>
          <el-button
            size="small"
            type="primary"
            class="ele-btn-icon"
            icon="el-icon-download"
            @click="exportData"
          >
            导出
          </el-button>
        </template>
        <!-- 状态列 -->
        <template v-slot:status="{ row }">
          <el-tag
            size="mini"
            :disable-transitions="true"
            :type="['success', 'danger'][row.status]"
          >
            {{ ['正常', '异常'][row.status] }}
          </el-tag>
        </template>
        <!-- 操作列 -->
        <template v-slot:action="{ row }">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-view"
            @click="openDetail(row)"
          >
            详情
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 详情弹窗 -->
    <operation-record-detail :visible.sync="showInfo" :data="current" />
  </div>
</template>

<script>
  import { utils, writeFile } from 'xlsx';
  import OperationRecordSearch from './components/operation-record-search.vue';
  import OperationRecordDetail from './components/operation-record-detail.vue';
  import {
    pageOperationRecords,
    listOperationRecords
  } from '@/api/system/operation-record';

  export default {
    name: 'SystemOperationRecord',
    components: {
      OperationRecordSearch,
      OperationRecordDetail
    },
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
            label: '账号',
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
            prop: 'module',
            label: '操作模块',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'description',
            label: '操作功能',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'url',
            label: '请求地址',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'requestMethod',
            label: '方式',
            sortable: 'custom',
            showOverflowTooltip: true
          },
          {
            columnKey: 'status',
            prop: 'status',
            label: '状态 ',
            showOverflowTooltip: true,
            slot: 'status',
            filterMultiple: false,
            filters: [
              {
                text: '正常',
                value: 0
              },
              {
                text: '异常',
                value: 1
              }
            ]
          },
          {
            prop: 'spendTime',
            label: '耗时',
            sortable: 'custom',
            showOverflowTooltip: true,
            formatter: (_row, _column, cellValue) => {
              return cellValue / 1000 + 's';
            }
          },
          {
            prop: 'createTime',
            label: '操作时间',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            formatter: (_row, _column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          },
          {
            columnKey: 'action',
            label: '操作',
            width: 90,
            align: 'center',
            resizable: false,
            slot: 'action',
            fixed: 'right',
            showOverflowTooltip: true
          }
        ],
        // 当前选中数据
        current: {
          nickname: '',
          username: '',
          module: '',
          createTime: null,
          requestMethod: '',
          ip: '',
          description: '',
          spendTime: null,
          status: null,
          url: '',
          method: '',
          params: '',
          result: '',
          comments: ''
        },
        // 是否显示查看弹窗
        showInfo: false
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order, filterValue }) {
        return pageOperationRecords({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 详情 */
      openDetail(row) {
        this.current = {
          ...row,
          createTime: this.$util.toDateString(row.createTime)
        };
        this.showInfo = true;
      },
      /* 导出数据 */
      exportData() {
        const array = [
          [
            '账号',
            '用户名',
            '操作模块',
            '操作功能',
            '请求地址',
            '请求方式',
            '状态',
            '耗时',
            '操作时间'
          ]
        ];
        const loading = this.$loading({ lock: true });
        this.$refs.table.doRequest(({ where, order }) => {
          listOperationRecords({ ...where, ...order })
            .then((data) => {
              loading.close();
              data.forEach((d) => {
                array.push([
                  d.username,
                  d.nickname,
                  d.module,
                  d.description,
                  d.url,
                  d.requestMethod,
                  ['正常', '异常'][d.status],
                  d.spendTime / 1000 + 's',
                  this.$util.toDateString(d.createTime)
                ]);
              });
              writeFile(
                {
                  SheetNames: ['Sheet1'],
                  Sheets: {
                    Sheet1: utils.aoa_to_sheet(array)
                  }
                },
                '操作日志.xlsx'
              );
            })
            .catch((e) => {
              loading.close();
              this.$message.error(e.message);
            });
        });
      }
    }
  };
</script>
