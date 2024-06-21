<!-- 机构类型选择下拉框 -->
<template>
  <el-select
    clearable
    :value="value"
    class="ele-fluid"
    :placeholder="placeholder"
    @input="updateValue"
  >
    <el-option
      v-for="item in data"
      :key="item.dictDataId"
      :value="item.dictDataCode"
      :label="item.dictDataName"
    />
  </el-select>
</template>

<script>
  import { listDictionaryData } from '@/api/system/dictionary-data';

  export default {
    props: {
      // 选中的数据(v-modal)
      value: String,
      // 提示信息
      placeholder: {
        type: String,
        default: '请选择机构类型'
      }
    },
    data() {
      return {
        // 机构类型数据
        data: []
      };
    },
    created() {
      /* 获取机构类型数据 */
      listDictionaryData({
        dictCode: 'organization_type'
      })
        .then((list) => {
          this.data = list;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    methods: {
      /* 更新选中数据 */
      updateValue(value) {
        this.$emit('input', value);
      }
    }
  };
</script>
