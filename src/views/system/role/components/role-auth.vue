<!-- 角色权限分配弹窗 -->
<template>
  <ele-modal
    width="460px"
    title="分配权限"
    :visible="visible"
    @update:visible="updateVisible"
  >
    <el-scrollbar
      v-loading="authLoading"
      style="height: 60vh"
      wrap-style="overflow-x: hidden;"
    >
      <el-tree
        ref="tree"
        show-checkbox
        :data="authData"
        node-key="menuId"
        :default-expand-all="true"
        :props="{ label: 'title' }"
        :default-checked-keys="checkedKeys"
      >
        <template v-slot="{ data }">
          <span>
            <i :class="data.icon"></i>
            <span> {{ data.title }}</span>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
    <template v-slot:footer>
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script>
  import { listRoleMenus, updateRoleMenus } from '@/api/system/role';

  export default {
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 当前角色数据
      data: Object
    },
    data() {
      return {
        // 权限数据
        authData: [],
        // 权限数据请求状态
        authLoading: false,
        // 提交状态
        loading: false,
        // 角色权限选中的keys
        checkedKeys: []
      };
    },
    methods: {
      /* 查询权限数据 */
      query() {
        this.authData = [];
        this.checkedKeys = [];
        if (!this.data) {
          return;
        }
        this.authLoading = true;
        listRoleMenus(this.data.roleId)
          .then((data) => {
            this.authLoading = false;
            // 转成树形结构的数据
            this.authData = this.$util.toTreeData({
              data: data,
              idKey: 'menuId',
              pidKey: 'parentId'
            });
            // 回显选中的数据
            const cks = [];
            this.$util.eachTreeData(this.authData, (d) => {
              if (d.checked && !d.children?.length) {
                cks.push(d.menuId);
              }
            });
            this.checkedKeys = cks;
          })
          .catch((e) => {
            this.authLoading = false;
            this.$message.error(e.message);
          });
      },
      /* 保存权限分配 */
      save() {
        this.loading = true;
        const ids = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys());
        updateRoleMenus(this.data.roleId, ids)
          .then((msg) => {
            this.loading = false;
            this.$message.success(msg);
            this.updateVisible(false);
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          this.query();
        }
      }
    }
  };
</script>
