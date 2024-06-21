<template>
  <el-card shadow="never" header="同时打开多个弹窗">
    <div>
      <el-button type="primary" @click="openDialog1">打开弹窗1</el-button>
      <el-button type="primary" @click="openDialog2">打开弹窗2</el-button>
      <el-button type="primary" @click="openDialog3">打开弹窗3</el-button>
    </div>
    <p style="margin-top: 20px">同时打开多个弹窗时点击会自动置顶</p>
    <ele-modal
      width="400px"
      title="弹窗1"
      :visible.sync="visible1"
      :resizable="true"
      :maxable="true"
      :multiple="true"
      :move-out="true"
      :move-out-positive="true"
      position="center"
    >
      <div style="padding: 20px 0">弹窗1</div>
      <template v-slot:footer>
        <el-button @click="visible1 = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </ele-modal>
    <ele-modal
      width="400px"
      title="弹窗2"
      :visible.sync="visible2"
      :resizable="true"
      :maxable="true"
      :multiple="true"
      :move-out="true"
      :move-out-positive="true"
      position="rightTop"
    >
      <div style="padding: 20px 0">弹窗2</div>
      <template v-slot:footer>
        <el-button @click="visible2 = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </ele-modal>
    <ele-modal
      width="400px"
      title="弹窗3"
      :visible.sync="visible3"
      :resizable="true"
      :maxable="true"
      :multiple="true"
      :move-out="true"
      :move-out-positive="true"
      position="rightBottom"
    >
      <div style="padding: 20px 0">弹窗3</div>
      <template v-slot:footer>
        <el-button @click="visible3 = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </ele-modal>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false
      };
    },
    methods: {
      openDialog1() {
        this.visible1 = true;
      },
      openDialog2() {
        this.visible2 = true;
      },
      openDialog3() {
        this.visible3 = true;
      }
    }
  };
</script>
