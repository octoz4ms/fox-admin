<template>
  <div>
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      :columns="columns"
      :datasource="datasource"
      height="calc(100vh - 265px)"
      full-height="calc(100vh - 116px)"
      tool-class="ele-toolbar-form"
      cache-key="systemOrgUserTable"
    >
      <!-- 表头工具栏 -->
      <template v-slot:toolbar>
        <org-user-search @search="reload">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            @click="openEdit()"
          >
            添加
          </el-button>
        </org-user-search>
      </template>
      <!-- 角色列 -->
      <template v-slot:roles="{ row }">
        <el-tag
          v-for="item in row.roles"
          :key="item.roleId"
          type="primary"
          size="mini"
          :disable-transitions="true"
        >
          {{ item.roleName }}
        </el-tag>
      </template>
      <!-- 状态列 -->
      <template v-slot:status="{ row }">
        <el-switch
          :active-value="0"
          :inactive-value="1"
          v-model="row.status"
          @change="editStatus(row)"
        />
      </template>
      <!-- 操作列 -->
      <template v-slot:action="{ row }">
        <el-link
          type="primary"
          :underline="false"
          icon="el-icon-edit"
          @click="openEdit(row)"
        >
          修改
        </el-link>
        <el-popconfirm
          class="ele-action"
          title="确定要删除此用户吗？"
          @confirm="remove(row)"
        >
          <template v-slot:reference>
            <el-link type="danger" :underline="false" icon="el-icon-delete">
              删除
            </el-link>
          </template>
        </el-popconfirm>
      </template>
    </ele-pro-table>
    <!-- 编辑弹窗 -->
    <org-user-edit
      :data="current"
      :visible.sync="showEdit"
      :organization-list="organizationList"
      :organization-id="organizationId"
      @done="reload"
    />
  </div>
</template>

<script>
  import OrgUserSearch from './org-user-search.vue';
  import OrgUserEdit from './org-user-edit.vue';
  import { pageUsers, removeUser, updateUserStatus } from '@/api/system/user';

  export default {
    components: { OrgUserSearch, OrgUserEdit },
    props: {
      // 机构id
      organizationId: Number,
      // 全部机构
      organizationList: Array
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
            prop: 'phone',
            label: '手机号',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            columnKey: 'roles',
            label: '角色',
            showOverflowTooltip: true,
            minWidth: 110,
            slot: 'roles'
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
          },
          {
            prop: 'status',
            label: '状态',
            align: 'center',
            sortable: 'custom',
            width: 80,
            resizable: false,
            slot: 'status'
          },
          {
            columnKey: 'action',
            label: '操作',
            width: 130,
            align: 'center',
            resizable: false,
            slot: 'action',
            showOverflowTooltip: true
          }
        ],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order }) {
        return pageUsers({
          ...where,
          ...order,
          page,
          limit,
          organizationId: this.organizationId
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 显示编辑 */
      openEdit(row) {
        this.current = row;
        this.showEdit = true;
      },
      /* 删除 */
      remove(row) {
        const loading = this.$loading({ lock: true });
        removeUser(row.userId)
          .then((msg) => {
            loading.close();
            this.$message.success(msg);
            this.reload();
          })
          .catch((e) => {
            loading.close();
            this.$message.error(e.message);
          });
      },
      /* 更改状态 */
      editStatus(row) {
        const loading = this.$loading({ lock: true });
        updateUserStatus(row.userId, row.status)
          .then((msg) => {
            loading.close();
            this.$message.success(msg);
          })
          .catch((e) => {
            loading.close();
            row.status = !row.status ? 1 : 0;
            this.$message.error(e.message);
          });
      }
    },
    watch: {
      // 监听机构id变化
      organizationId() {
        this.reload();
      }
    }
  };
</script>
