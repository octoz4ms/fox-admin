<template>
  <el-card shadow="never" header="打印当前页面">
    <el-form label-width="80px" size="small" style="max-width: 320px">
      <el-form-item label="纸张方向">
        <el-select
          clearable
          class="ele-block"
          v-model="option.horizontal"
          placeholder="不设置"
        >
          <el-option label="横向" :value="true" />
          <el-option label="纵向" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面间距">
        <el-select
          clearable
          class="ele-block"
          v-model="option.margin"
          placeholder="不设置"
        >
          <el-option label="0px" value="0px" />
          <el-option label="50px" value="50px" />
          <el-option label="100px" value="100px" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面标题">
        <el-input clearable v-model="option.title" placeholder="不设置" />
      </el-form-item>
    </el-form>
    <el-button size="small" @click="print">打印</el-button>
    <el-button size="small" @click="printHide">打印隐藏指定内容</el-button>
    <div style="margin-top: 15px">
      <span class="ele-text-primary ele-printer-hide">
        此段内容在所有打印时隐藏, 打印完复原。
      </span>
      <span class="ele-text-danger demo-hide-1">
        此段内容在指定打印时才隐藏。
      </span>
    </div>
  </el-card>
</template>

<script>
  import { printThis } from 'ele-admin';

  export default {
    data() {
      return {
        // 打印当前页面参数
        option: {
          horizontal: null,
          margin: null,
          title: ''
        }
      };
    },
    methods: {
      /* 打印当前页面 */
      print() {
        printThis(this.option1);
      },
      /* 打印隐藏指定内容 */
      printHide() {
        printThis({
          ...this.option1,
          hide: ['.demo-hide-1']
        });
      }
    }
  };
</script>
