<template>
  <div class="ele-body">
    <el-card shadow="never" header="二维码" style="overflow: visible">
      <div ref="printRef" class="demo-qrcode-images ele-bg-white">
        <div class="demo-qrcode-image-item">
          <div class="demo-qr-code-title">canvas 渲染</div>
          <ele-qr-code
            :value="text"
            :size="size"
            :level="level"
            :margin="margin"
            :image-settings="image"
          />
        </div>
        <div class="demo-qrcode-image-item">
          <div class="demo-qr-code-title">svg 渲染</div>
          <ele-qr-code-svg
            :value="text"
            :size="size"
            :level="level"
            :margin="margin"
            :image-settings="image"
          />
        </div>
      </div>
      <el-form label-width="88px" style="max-width: 340px">
        <el-form-item label="二维码内容">
          <el-input v-model="text" :maxlength="150" />
        </el-form-item>
        <el-form-item label="容错等级">
          <el-select v-model="level" class="ele-fluid">
            <el-option value="L" label="L" />
            <el-option value="M" label="M" />
            <el-option value="Q" label="Q" />
            <el-option value="H" label="H" />
          </el-select>
        </el-form-item>
        <el-form-item label="尺寸">
          <el-slider v-model="size" :min="80" :max="280" :step="40" />
        </el-form-item>
        <el-form-item label="间距">
          <el-slider v-model="margin" :min="0" :max="20" />
        </el-form-item>
        <el-form-item label="自定义图片">
          <el-switch v-model="showImage" @change="onShowImageChange" />
        </el-form-item>
        <template v-if="showImage">
          <el-form-item label="图片地址">
            <el-input v-model="image.src" :maxlength="400" />
          </el-form-item>
          <el-form-item label="图片宽高">
            <div class="ele-cell">
              <div style="width: 80px; margin-right: 20px">
                <el-input-number
                  v-model="image.width"
                  size="mini"
                  :min="0"
                  :max="size"
                  controls-position="right"
                  class="ele-fluid"
                />
              </div>
              <div style="width: 80px">
                <el-input-number
                  v-model="image.height"
                  size="mini"
                  :min="0"
                  :max="size"
                  controls-position="right"
                  class="ele-fluid"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="位置居中">
            <div class="ele-cell" style="min-height: 36px">
              <el-switch v-model="center" @change="onCenterChange" />
              <template v-if="!center">
                <div style="padding: 0 10px">x</div>
                <div style="width: 80px">
                  <el-input-number
                    v-model="image.x"
                    size="mini"
                    :min="0"
                    :max="size"
                    controls-position="right"
                    class="ele-fluid"
                  />
                </div>
                <div style="padding: 0 10px">y</div>
                <div style="width: 80px">
                  <el-input-number
                    v-model="image.y"
                    size="mini"
                    :min="0"
                    :max="size"
                    controls-position="right"
                    class="ele-fluid"
                  />
                </div>
              </template>
            </div>
          </el-form-item>
          <el-form-item label="背景擦除">
            <el-switch v-model="image.excavate" />
          </el-form-item>
          <el-form-item>
            <div>
              <el-button type="primary" @click="print">打印</el-button>
            </div>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import EleQrCode from 'ele-admin/es/ele-qr-code';
  import EleQrCodeSvg from 'ele-admin/es/ele-qr-code-svg';
  import { printElement } from 'ele-admin';
  const IMAGE_SRC = 'https://cdn.eleadmin.com/20200610/logo-radius.png';

  export default {
    name: 'ExtensionQrCode',
    components: { EleQrCode, EleQrCodeSvg },
    data() {
      return {
        text: 'https://eleadmin.com',
        level: 'L',
        size: 120,
        margin: 0,
        showImage: true,
        image: {
          src: IMAGE_SRC,
          width: 28,
          height: 28,
          x: undefined,
          y: undefined,
          excavate: false
        },
        center: true
      };
    },
    methods: {
      onShowImageChange(checked) {
        if (checked) {
          this.image.src = IMAGE_SRC;
        } else {
          this.image.src = undefined;
        }
      },
      onCenterChange(checked) {
        if (checked) {
          this.image.x = undefined;
          this.image.y = undefined;
        } else {
          this.image.x = 0;
          this.image.y = 0;
        }
      },
      print() {
        printElement(this.$refs.printRef);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .demo-qrcode-images {
    display: flex;
    padding-bottom: 16px;
    margin-bottom: 4px;
    position: sticky;
    top: 0;
    overflow: auto;
    z-index: 1002;

    .demo-qrcode-image-item {
      padding: 0 20px;

      .demo-qr-code-title {
        margin-bottom: 6px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .demo-qrcode-images .demo-qrcode-image-item {
      padding: 0 10px;
    }
  }
</style>
