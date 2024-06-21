<template>
  <div class="ele-body">
    <el-card shadow="never" header="基本用法">
      <div class="option-item">
        <div>显示折叠按钮:</div>
        <div class="option-item-body">
          <el-radio-group v-model="allowCollapse">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="option-item">
        <div>支持自由拉伸:</div>
        <div class="option-item-body">
          <el-radio-group v-model="resizable">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="option-item">
        <div>上下布局模式:</div>
        <div class="option-item-body">
          <el-radio-group v-model="vertical">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="option-item">
        <div>反转布局方向:</div>
        <div class="option-item-body">
          <el-radio-group v-model="reverse">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <ele-split-layout
        space="0px"
        :allow-collapse="allowCollapse"
        :resizable="resizable"
        :vertical="vertical"
        :reverse="reverse"
        :min-size="40"
        :left-style="{
          background: 'rgba(185, 182, 229, .4)',
          overflow: 'hidden'
        }"
        :right-style="{
          background: 'rgba(125, 226, 252, .4)',
          overflow: 'hidden'
        }"
        style="height: 480px; margin-top: 12px"
      >
        <div>边栏</div>
        <template #content>
          <div>内容</div>
        </template>
      </ele-split-layout>
    </el-card>
    <el-card shadow="never" header="组合使用">
      <div style="margin: 0 0 8px 0">先左右再上下</div>
      <ele-split-layout
        space="0px"
        :resizable="true"
        :min-size="40"
        :max-size="-40"
        :left-style="{
          background: 'rgba(185, 182, 229, .4)',
          overflow: 'hidden'
        }"
        :right-style="{ overflow: 'hidden' }"
        :responsive="false"
        style="height: 400px"
      >
        <div>边栏</div>
        <template #content>
          <ele-split-layout
            space="0px"
            width="240px"
            :min-size="40"
            :max-size="-40"
            :resizable="true"
            :vertical="true"
            :left-style="{
              background: 'rgba(171, 199, 255, .5)',
              overflow: 'hidden'
            }"
            :right-style="{
              background: 'rgba(125, 226, 252, .4)',
              overflow: 'hidden'
            }"
            :responsive="false"
            style="height: 400px"
          >
            <div>内容一</div>
            <template #content>
              <div>内容二</div>
            </template>
          </ele-split-layout>
        </template>
      </ele-split-layout>
      <div style="margin: 16px 0 8px 0">先上下再左右</div>
      <ele-split-layout
        space="0px"
        width="120px"
        :min-size="40"
        :max-size="-40"
        :vertical="true"
        :resizable="true"
        :left-style="{
          background: 'rgba(185, 182, 229, .4)',
          overflow: 'hidden'
        }"
        :right-style="{ overflow: 'hidden' }"
        :responsive="false"
        style="height: 400px"
      >
        <div>顶栏</div>
        <template #content>
          <ele-split-layout
            space="0px"
            :min-size="40"
            :max-size="-40"
            :resizable="true"
            :left-style="{
              background: 'rgba(171, 199, 255, .5)',
              overflow: 'hidden'
            }"
            :right-style="{
              background: 'rgba(125, 226, 252, .4)',
              overflow: 'hidden'
            }"
            :responsive="false"
            style="height: 100%"
          >
            <div>边栏</div>
            <template #content>
              <div>内容</div>
            </template>
          </ele-split-layout>
        </template>
      </ele-split-layout>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionSplit',
    data() {
      return {
        allowCollapse: true,
        resizable: false,
        vertical: false,
        reverse: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  .option-item {
    display: flex;
    align-items: center;

    .option-item-body {
      flex: 1;
      padding-left: 12px;
      display: flex;
    }

    & + .option-item {
      margin-top: 6px;
    }
  }
</style>
