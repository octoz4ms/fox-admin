<template>
  <div class="ele-body">
    <el-card shadow="never" header="基本信息">
      <el-form
        size="mini"
        v-loading="loading"
        label-width="100px"
        class="ele-form-detail"
      >
        <el-form-item label="账号:">
          <div class="ele-text-secondary">{{ user.username }}</div>
        </el-form-item>
        <el-form-item label="用户名:">
          <div class="ele-text-secondary">{{ user.nickname }}</div>
        </el-form-item>
        <el-form-item label="性别:">
          <div class="ele-text-secondary">{{ user.sexName }}</div>
        </el-form-item>
        <el-form-item label="手机号:">
          <div class="ele-text-secondary">{{ user.phone }}</div>
        </el-form-item>
        <el-form-item label="角色:">
          <el-tag
            v-for="item in user.roles"
            :key="item.roleId"
            size="mini"
            type="primary"
            :disable-transitions="true"
          >
            {{ item.roleName }}
          </el-tag>
        </el-form-item>
        <el-form-item label="创建时间:">
          <div class="ele-text-secondary">{{ user.createTime }}</div>
        </el-form-item>
        <el-form-item label="状态:">
          <div class="ele-text-secondary">
            <ele-dot v-if="user.status === 0" text="正常" />
            <ele-dot v-else type="danger" :ripple="false" text="冻结" />
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { setPageTabTitle } from '@/utils/page-tab-util';
  import { getUser } from '@/api/system/user';
  const ROUTE_PATH = '/list/basic/details';

  export default {
    name: 'ListBasicDetails',
    data() {
      return {
        user: {
          username: '',
          nickname: '',
          sexName: '',
          phone: '',
          roles: [],
          createTime: '',
          status: 0
        },
        loading: true
      };
    },
    methods: {
      query() {
        const id = this.$route.params.id;
        if (!id || this.user.userId === Number(id)) {
          return;
        }
        this.loading = true;
        getUser(Number(id))
          .then((data) => {
            this.loading = false;
            this.$util.assignObject(this.user, {
              ...data,
              createTime: this.$util.toDateString(data.createTime)
            });
            // 修改页签标题
            if (this.$route.path.startsWith(ROUTE_PATH)) {
              setPageTabTitle(data.nickname + '的信息');
            }
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      }
    },
    watch: {
      $route: {
        handler(route) {
          const { fullPath } = route;
          if (!fullPath.startsWith(ROUTE_PATH)) {
            return;
          }
          this.query();
        },
        immediate: true
      }
    }
  };
</script>
