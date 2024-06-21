<template>
  <el-card shadow="never" header="打印任意内容">
    <el-form label-width="64px">
      <el-form-item label="loading">
        <el-radio-group v-model="option.loading">
          <el-radio :label="false">不显示</el-radio>
          <el-radio :label="true">显示</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button size="small" @click="printAnyHtml">打印任意内容</el-button>
    <el-button size="small" @click="printAddHeader">设置页眉页脚</el-button>
    <el-button size="small" @click="printImage">打印图片</el-button>
  </el-card>
</template>

<script>
  import { printHtml } from 'ele-admin';

  export default {
    data() {
      return {
        // 打印任意内容参数
        option: {
          loading: false
        }
      };
    },
    methods: {
      /* 打印任意内容 */
      printAnyHtml() {
        printHtml({
          ...this.option,
          html: [
            '<h1 style="color: #1890ff;">EleAdmin 后台管理模板</h1>',
            '<div style="color: #F51D2C;">通用型后台管理模板, 界面美观、开箱即用</div>'
          ].join('')
        });
      },
      /* 打印设置页眉页脚 */
      printAddHeader() {
        printHtml({
          ...this.option,
          margin: 0,
          html: [
            '<div style="padding: 0 60px;">',
            Array(38).join('<h3>EleAdmin 后台管理模板</h3>'),
            '</div>'
          ].join(''),
          header: `
          <div style="display: flex;font-size: 12px;padding: 15px 30px 25px;">
            <div>我是页眉左侧</div>
            <div style="flex: 1;text-align: center;">我是页眉</div>
            <div>我是页眉右侧</div>
          </div>`,
          footer: `
          <div style="display: flex;font-size: 12px;padding: 15px 30px 25px;">
            <div>我是页脚左侧</div>
            <div style="flex: 1;text-align: center;">我是页脚</div>
            <div>我是页脚右侧</div>
          </div>`,
          style: '<style> h3 {color: red;} </style>'
        });
      },
      /* 打印图片 */
      printImage() {
        printHtml({
          ...this.option,
          margin: 0,
          html: '<img src="https://cdn.eleadmin.com/20200610/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ.jpg" style="width: 100%;"/>'
        });
      }
    }
  };
</script>
