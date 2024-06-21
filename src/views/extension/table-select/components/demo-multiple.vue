<template>
  <el-card shadow="never" header="多选">
    <div style="max-width: 260px">
      <ele-table-select
        v-model="value"
        :multiple="true"
        :clearable="true"
        placeholder="请选择"
        :disabled="disabled"
        value-key="userId"
        label-key="nickname"
        :table-config="tableConfig"
        :popper-width="580"
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
      </ele-table-select>
    </div>
    <div class="ele-cell" style="margin-top: 15px">
      <div style="line-height: 22px">&nbsp;禁用：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="disabled">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div style="margin-top: 12px">
      <el-button size="small" type="primary" @click="setInitValue">
        回显数据
      </el-button>
    </div>
  </el-card>
</template>

<script>
  import { listUsers } from '@/api/system/user';

  export default {
    data() {
      return {
        value: undefined,
        // 表格配置
        tableConfig: {
          datasource: [],
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
          toolbar: false,
          pageSize: 5,
          pageSizes: [5, 10, 15, 20],
          rowClickChecked: true,
          rowClickCheckedIntelligent: false,
          size: 'small'
        },
        // 禁用
        disabled: false
      };
    },
    methods: {
      /* 回显数据 */
      setInitValue() {
        this.value = [3, 5, 6];
      }
    },
    created() {
      listUsers().then((data) => {
        this.tableConfig.datasource = data;
      });
    }
  };
</script>
