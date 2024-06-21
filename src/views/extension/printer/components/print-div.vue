<template>
  <el-card shadow="never" header="打印指定区域">
    <div ref="printRef" class="demo-print-group">
      <div class="demo-print-div">
        <div>示例示例示例示例示例</div>
        <div class="demo-hide-2" style="font-size: 12px; margin-top: 8px">
          此段内容不打印
        </div>
      </div>
      <div class="demo-print-right ele-bg-white">
        <div>
          <el-tag size="mini">示例</el-tag>
          <el-tag size="mini" type="success">示例</el-tag>
          <el-tag size="mini" type="warning">示例</el-tag>
        </div>
        <div style="margin-top: 12px">
          <el-input v-model="value" />
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-button size="small" @click="print">打印</el-button>
    </div>
  </el-card>
</template>

<script>
  import { printElement } from 'ele-admin';

  export default {
    data() {
      return {
        value: '示例示例示例'
      };
    },
    methods: {
      print() {
        printElement(this.$refs.printRef, { hide: ['.demo-hide-2'] });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .demo-print-group {
    display: flex;
    align-items: center;
  }

  .demo-print-div {
    background: #096dd9;
    color: #fff;
    font-size: 18px;
    text-align: center;
    padding: 40px 0;
    flex: 1;
    border: 2px solid #096dd9;
    height: 120px;
    box-sizing: border-box;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .demo-print-right {
    flex: 1;
    padding: 20px;
    border: 2px solid #096dd9;
    height: 120px;
    box-sizing: border-box;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
