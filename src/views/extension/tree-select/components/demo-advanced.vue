<template>
  <el-card shadow="never" header="可搜索">
    <div style="max-width: 260px">
      <ele-tree-select
        :data="data"
        v-model="value"
        :multiple="true"
        :clearable="true"
        :filterable="true"
        placeholder="请选择"
        :default-expand-all="true"
      />
    </div>
  </el-card>
</template>

<script>
  import treeData from './tree-data';

  export default {
    data() {
      return {
        // 可搜索
        value: [],
        // 数据
        data: treeData
      };
    }
  };
</script>
