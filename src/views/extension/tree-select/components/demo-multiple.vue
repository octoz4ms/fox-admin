<template>
  <el-card shadow="never" header="多选">
    <div style="max-width: 260px">
      <ele-tree-select
        :data="data"
        v-model="value"
        :multiple="true"
        :clearable="true"
        placeholder="请选择"
        :disabled="disabled"
        :default-expand-all="true"
        :check-strictly="checkStrictly"
        expandOnClickNode
      />
    </div>
    <div class="ele-cell" style="margin-top: 15px">
      <div style="line-height: 22px">&nbsp;<em></em><em></em>禁用：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="disabled">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="ele-cell" style="margin-top: 15px">
      <div style="line-height: 22px">&nbsp;父子联动：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="checkStrictly">
          <el-radio :label="false">是</el-radio>
          <el-radio :label="true">否</el-radio>
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
        // 多选
        value: [],
        // 数据
        data: treeData,
        // 禁用
        disabled: false,
        // 关闭父子联动
        checkStrictly: false
      };
    }
  };
</script>
