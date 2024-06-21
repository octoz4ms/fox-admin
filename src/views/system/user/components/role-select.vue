<!-- 角色选择下拉框 -->
<template>
  <el-select
    multiple
    clearable
    :value="value"
    class="ele-block"
    :placeholder="placeholder"
    @input="updateValue"
  >
    <el-option
      v-for="item in data"
      :key="item.roleId"
      :value="item.roleId"
      :label="item.roleName"
    />
  </el-select>
</template>

<script>
  import { listRoles } from '@/api/system/role';

  export default {
    props: {
      // 选中的数据(v-modal)
      value: Array,
      // 提示信息
      placeholder: {
        type: String,
        default: '请选择角色'
      }
    },
    data() {
      return {
        data: []
      };
    },
    created() {
      /* 获取角色数据 */
      listRoles()
        .then((list) => {
          this.data = list;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value);
      }
    }
  };
</script>
