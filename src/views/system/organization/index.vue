<template>
  <div class="ele-body">
    <el-card shadow="never" v-loading="loading">
      <ele-split-layout
        width="266px"
        allow-collapse
        :right-style="{ overflow: 'hidden' }"
      >
        <div>
          <!-- 操作按钮 -->
          <ele-toolbar class="ele-toolbar-actions">
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
          </ele-toolbar>
          <div class="ele-border-lighter sys-organization-list">
            <el-tree
              ref="tree"
              :data="data"
              highlight-current
              node-key="organizationId"
              :props="{ label: 'organizationName' }"
              :expand-on-click-node="false"
              :default-expand-all="true"
              @node-click="onNodeClick"
            />
          </div>
        </div>
        <template v-slot:content>
          <org-user-list
            v-if="current"
            :organization-list="data"
            :organization-id="current.organizationId"
          />
        </template>
      </ele-split-layout>
    </el-card>
    <!-- 编辑弹窗 -->
    <org-edit
      :visible.sync="showEdit"
      :data="editData"
      :parent-id="parentId"
      :organization-list="data"
      @done="query"
    />
  </div>
</template>

<script>
  import OrgUserList from './components/org-user-list.vue';
  import OrgEdit from './components/org-edit.vue';
  import {
    listOrganizations,
    removeOrganization
  } from '@/api/system/organization';

  export default {
    name: 'SystemOrganization',
    components: { OrgUserList, OrgEdit },
    data() {
      return {
        // 加载状态
        loading: true,
        // 列表数据
        data: [],
        // 选中数据
        current: null,
        // 是否显示表单弹窗
        showEdit: false,
        // 编辑回显数据
        editData: null,
        // 上级id
        parentId: null
      };
    },
    created() {
      this.query();
    },
    methods: {
      /* 查询 */
      query() {
        this.loading = true;
        listOrganizations()
          .then((list) => {
            this.loading = false;
            this.data = this.$util.toTreeData({
              data: list,
              idField: 'organizationId',
              parentIdField: 'parentId'
            });
            this.$nextTick(() => {
              this.onNodeClick(this.data[0]);
            });
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      },
      /* 选择数据 */
      onNodeClick(row) {
        if (row) {
          this.current = row;
          this.parentId = row.organizationId;
          this.$refs.tree.setCurrentKey(row.organizationId);
        } else {
          this.current = null;
          this.parentId = null;
        }
      },
      /* 显示编辑 */
      openEdit(item) {
        this.editData = item;
        this.showEdit = true;
      },
      /* 删除 */
      remove() {
        this.$confirm('确定要删除选中的机构吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            removeOrganization(this.current.organizationId)
              .then((msg) => {
                loading.close();
                this.$message.success(msg);
                this.query();
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
  .sys-organization-list {
    height: calc(100vh - 264px);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    overflow: auto;
  }

  .sys-organization-list :deep(.el-tree-node__content) {
    height: 40px;

    & > .el-tree-node__expand-icon {
      margin-left: 10px;
    }
  }
</style>
