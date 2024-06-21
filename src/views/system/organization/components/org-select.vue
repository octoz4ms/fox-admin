<!-- 机构选择下拉框 -->
<template>
  <ele-tree-select
    clearable
    :value="value || ''"
    :data="data"
    label-key="organizationName"
    value-key="organizationId"
    default-expand-all
    :placeholder="placeholder"
    @input="updateValue"
  />
</template>

<script>
  export default {
    props: {
      // 选中的数据(v-model)
      value: Number,
      // 提示信息
      placeholder: {
        type: String,
        default: '请选择机构'
      },
      // 机构数据
      data: Array
    },
    methods: {
      /* 更新选中数据 */
      updateValue(value) {
        this.$emit('input', value);
      }
    }
  };
</script>
