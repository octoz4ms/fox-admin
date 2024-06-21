<template>
  <el-card shadow="never" body-style="padding: 22px 22px 7px 22px;">
    <!-- 搜索表单 -->
    <el-form
      label-width="80px"
      class="ele-form-search"
      @keyup.enter.native="search"
      @submit.native.prevent
    >
      <el-row :gutter="15">
        <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
          <el-form-item label="用户账号:">
            <el-input v-model="where.username" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
          <el-form-item label="性别:">
            <el-select
              v-model="where.sex"
              placeholder="请选择"
              clearable
              class="ele-fluid"
            >
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          v-if="searchExpand"
          v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }"
        >
          <el-form-item label="用户名:">
            <el-input v-model="where.nickname" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col
          v-if="searchExpand"
          v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }"
        >
          <el-form-item label="手机号:">
            <el-input v-model="where.phone" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col
          v-if="searchExpand"
          v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }"
        >
          <el-form-item label="状态:">
            <el-select
              v-model="where.status"
              placeholder="请选择"
              clearable
              class="ele-fluid"
            >
              <el-option label="正常" :value="0" />
              <el-option label="冻结" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
          <div class="ele-form-actions ele-text-right">
            <el-button
              type="primary"
              icon="el-icon-search"
              class="ele-btn-icon"
              @click="search"
            >
              查询
            </el-button>
            <el-button @click="reset">重置</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand">
              <template v-if="searchExpand">
                收起<i class="el-icon-arrow-up"></i>
              </template>
              <template v-else>
                展开<i class="el-icon-arrow-down"></i>
              </template>
            </el-link>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    data() {
      // 默认表单数据
      const defaultWhere = {
        username: '',
        nickname: '',
        sex: undefined,
        phone: '',
        status: undefined
      };
      return {
        defaultWhere,
        // 表单数据
        where: { ...defaultWhere },
        // 搜索表单是否展开
        searchExpand: false
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 搜索 */
      search() {
        this.$emit('search', this.where);
      },
      /* 重置搜索 */
      reset() {
        this.where = { ...this.defaultWhere };
        this.search();
      },
      /* 搜索展开/收起 */
      toggleExpand() {
        this.searchExpand = !this.searchExpand;
        this.$emit('expand-change', this.searchExpand);
      }
    }
  };
</script>
