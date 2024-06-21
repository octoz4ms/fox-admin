<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <user-search @search="reload" />
      <!-- 数据表格 -->
      <ele-pro-table
        ref="table"
        :columns="columns"
        :datasource="datasource"
        :selection.sync="selection"
        cache-key="systemUserTable"
      >
        <!-- 表头工具栏 -->
        <template v-slot:toolbar>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            @click="openEdit()"
          >
            新建
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            class="ele-btn-icon"
            @click="removeBatch"
          >
            删除
          </el-button>
          <el-button
            size="small"
            icon="el-icon-upload2"
            class="ele-btn-icon"
            @click="openImport"
          >
            导入
          </el-button>
        </template>
        <!-- 用户名列 -->
        <template v-slot:nickname="{ row }">
          <router-link :to="'/system/user/details?id=' + row.userId">
            {{ row.nickname }}
          </router-link>
        </template>
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
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-key"
            @click="resetPsw(row)"
          >
            重置密码
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
    </el-card>
    <!-- 编辑弹窗 -->
    <user-edit :visible.sync="showEdit" :data="current" @done="reload" />
    <!-- 导入弹窗 -->
    <user-import :visible.sync="showImport" @done="reload" />
  </div>
</template>

<script>
  import UserSearch from './components/user-search.vue';
  import UserEdit from './components/user-edit.vue';
  import UserImport from './components/user-import.vue';
  import {
    pageUsers,
    removeUser,
    removeUsers,
    updateUserStatus,
    updateUserPassword
  } from '@/api/system/user';

  export default {
    name: 'SystemUser',
    components: {
      UserSearch,
      UserEdit,
      UserImport
    },
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
            minWidth: 110,
            slot: 'nickname'
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
            slot: 'status',
            showOverflowTooltip: true
          },
          {
            columnKey: 'action',
            label: '操作',
            width: 220,
            align: 'center',
            resizable: false,
            slot: 'action',
            showOverflowTooltip: true
          }
        ],
        // 表格选中数据
        selection: [],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false,
        // 是否显示导入弹窗
        showImport: false
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order }) {
        return pageUsers({ ...where, ...order, page, limit });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 打开编辑弹窗 */
      openEdit(row) {
        this.current = row;
        this.showEdit = true;
      },
      /* 打开导入弹窗 */
      openImport() {
        this.showImport = true;
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
      /* 批量删除 */
      removeBatch() {
        if (!this.selection.length) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        this.$confirm('确定要删除选中的用户吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            removeUsers(this.selection.map((d) => d.userId))
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
      },
      /* 重置用户密码 */
      resetPsw(row) {
        this.$confirm('确定要重置此用户的密码为"123456"吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            updateUserPassword(row.userId)
              .then((msg) => {
                loading.close();
                this.$message.success(msg);
              })
              .catch((e) => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => {});
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
    }
  };
</script>
