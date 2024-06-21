<template>
  <el-card shadow="never" header="可搜索">
    <div style="max-width: 260px">
      <ele-table-select
        ref="select"
        v-model="value"
        :multiple="true"
        :clearable="true"
        placeholder="请选择"
        value-key="userId"
        label-key="nickname"
        :table-config="tableConfig"
        :popper-width="580"
        :init-value="initValue"
      >
        <!-- 角色列 -->
        <template v-slot:roles="{ row }">
          <el-tag
            v-for="item in row.roles"
            :key="item.roleId"
            size="mini"
            type="primary"
            :disable-transitions="true"
          >
            {{ item.roleName }}
          </el-tag>
        </template>
        <!-- 表头工具栏 -->
        <template v-slot:toolbar>
          <demo-advanced-search @search="search" />
        </template>
      </ele-table-select>
    </div>
    <div style="margin-top: 12px">
      <el-button size="small" type="primary" @click="setInitValue">
        回显数据
      </el-button>
    </div>
  </el-card>
</template>

<script>
  import { pageUsers } from '@/api/system/user';
  import DemoAdvancedSearch from './demo-advanced-search.vue';

  export default {
    components: { DemoAdvancedSearch },
    data() {
      return {
        value: [],
        // 可搜索表格配置
        tableConfig: {
          datasource({ page, limit, where, order }) {
            return pageUsers({ ...where, ...order, page, limit });
          },
          columns: [
            {
              columnKey: 'selection',
              type: 'selection',
              width: 45,
              align: 'center',
              reserveSelection: true
            },
            {
              columnKey: 'index',
              type: 'index',
              width: 45,
              align: 'center',
              showOverflowTooltip: true
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
              prop: 'sexName',
              label: '性别',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 80
            },
            {
              columnKey: 'roles',
              label: '角色',
              showOverflowTooltip: true,
              minWidth: 110,
              slot: 'roles'
            }
          ],
          pageSize: 5,
          pageSizes: [5, 10, 15, 20],
          rowClickChecked: true,
          rowClickCheckedIntelligent: false,
          toolkit: ['reload', 'columns'],
          size: 'small',
          toolStyle: { padding: '0 10px' }
        },
        // 回显值
        initValue: undefined
      };
    },
    methods: {
      /* 回显数据 */
      setInitValue() {
        //this.value = [3, 5, 6];
        this.initValue = [
          {
            userId: 3,
            nickname: '管理员'
          },
          {
            userId: 5,
            nickname: '用户四'
          },
          {
            userId: 6,
            nickname: '用户五'
          }
        ];
      },
      // 搜索
      search(where) {
        this.$refs.select.reload({
          where: where,
          page: 1
        });
      }
    }
  };
</script>
