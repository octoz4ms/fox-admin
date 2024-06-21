<template>
  <div class="ele-body">
    <el-card shadow="never" header="基本用法">
      <ele-watermark content="Ele Admin" :gap="[60, 40]">
        <div style="height: 200px"></div>
      </ele-watermark>
    </el-card>
    <el-card shadow="never" header="多行水印">
      <ele-watermark :content="['Ele Admin', 'Happy Working']" :gap="[60, 40]">
        <div style="height: 200px"></div>
      </ele-watermark>
    </el-card>
    <el-card shadow="never" header="图片水印">
      <ele-watermark
        :height="30"
        :width="130"
        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
        :gap="[60, 40]"
      >
        <div style="height: 200px"></div>
      </ele-watermark>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionWatermark'
  };
</script>
