<template>
  <div class="ele-body">
    <el-card shadow="never" header="条形码" style="overflow: visible">
      <div ref="printRef" class="demo-barcode-images ele-bg-white">
        <ele-bar-code :value="text" :tag="tag" :options="options" />
      </div>
      <el-form label-width="88px" style="max-width: 340px">
        <el-form-item label="条码类型: ">
          <el-radio-group :value="options.format" @input="updateFormat">
            <el-radio label="CODE128">CODE128</el-radio>
            <el-radio label="EAN13">EAN13</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="渲染方式: ">
          <el-radio-group v-model="tag">
            <el-radio label="svg">svg</el-radio>
            <el-radio label="img">img</el-radio>
            <el-radio label="canvas">canvas</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="条码文本: ">
          <el-select
            v-if="options.format === 'EAN13'"
            v-model="text"
            class="ele-fluid"
          >
            <el-option value="1234567890128" label="1234567890128" />
            <el-option value="6971872201359" label="6971872201359" />
            <el-option value="6954531770199" label="6954531770199" />
            <el-option value="6923644240318" label="6923644240318" />
          </el-select>
          <el-input v-else v-model="text" :maxlength="20" />
        </el-form-item>
        <el-form-item label="高度: ">
          <el-slider v-model="options.height" :min="40" :max="160" :step="10" />
        </el-form-item>
        <el-form-item label="宽度: ">
          <el-slider v-model="options.width" :min="1" :max="6" />
        </el-form-item>
        <el-form-item label="间距: ">
          <el-slider v-model="options.margin" :min="0" :max="40" />
        </el-form-item>
        <el-form-item label="显示文本: ">
          <el-switch v-model="options.displayValue" />
        </el-form-item>
        <el-form-item v-if="options.displayValue" label="文本大小: ">
          <el-slider v-model="options.fontSize" :min="12" :max="36" :step="2" />
        </el-form-item>
        <el-form-item
          v-if="options.displayValue && options.format === 'CODE128'"
          label="文本位置: "
        >
          <el-radio-group v-model="options.textPosition">
            <el-radio label="bottom">bottom</el-radio>
            <el-radio label="top">top</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="print">打印</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import EleBarCode from 'ele-admin/es/ele-bar-code';
  import { printElement } from 'ele-admin';

  export default {
    name: 'ExtensionBarCode',
    components: { EleBarCode },
    data() {
      return {
        text: '1234567890',
        tag: 'svg',
        options: {
          height: 60,
          width: 2,
          margin: 2,
          displayValue: true,
          textPosition: 'bottom',
          fontSize: 14,
          format: 'CODE128'
        }
      };
    },
    methods: {
      updateFormat(value) {
        if (value === 'EAN13') {
          this.text = '1234567890128';
        }
        this.options.format = value;
      },
      print() {
        printElement(this.$refs.printRef);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .demo-barcode-images {
    padding-bottom: 16px;
    margin-bottom: 4px;
    position: sticky;
    top: 0;
    overflow: auto;
    z-index: 1002;
  }
</style>
