<template>
  <el-card shadow="never" header="基础用法">
    <div style="max-width: 260px">
      <ele-tree-select
        :data="data"
        v-model="value"
        :clearable="true"
        placeholder="请选择"
        :disabled="disabled"
        :default-expand-all="true"
        :expand-on-click-node="expandOnClickNode"
      />
    </div>
    <div class="ele-cell" style="margin-top: 15px">
      <div style="line-height: 22px">
        &nbsp;<em></em><em></em><em></em>禁用：
      </div>
      <div class="ele-cell-content">
        <el-radio-group v-model="disabled">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="ele-cell" style="margin-top: 15px">
      <div style="line-height: 22px">&nbsp;只能选子级：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="expandOnClickNode">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script>
  import treeData from './tree-data';

  export default {
    data() {
      return {
        // 单选
        value: undefined,
        // 数据
        data: treeData,
        // 禁用
        disabled: false,
        // 只能选子级
        expandOnClickNode: false
      };
    },
    watch: {
      expandOnClickNode() {
        this.value = '';
      }
    }
  };
</script>
