<template>
  <div class="ele-body">
    <el-card shadow="never" header="默认效果">
      <ele-empty></ele-empty>
    </el-card>
    <el-card shadow="never" header="自定义图标">
      <ele-empty>
        <template v-slot:icon>
          <i class="el-icon-_retrieve-solid"></i>
        </template>
      </ele-empty>
    </el-card>
    <el-card shadow="never" header="自定义操作按钮">
      <ele-empty text="还没有添加过数据~">
        <div style="margin-top: 20px">
          <el-button size="mini">添加数据</el-button>
          <el-button type="primary" size="mini">重新加载</el-button>
        </div>
      </ele-empty>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionEmpty'
  };
</script>
