<template>
  <div class="ele-body ele-body-card">
    <el-row :gutter="15">
      <el-col v-bind="styleResponsive ? { md: 12 } : { span: 12 }">
        <demo-basic />
      </el-col>
      <el-col v-bind="styleResponsive ? { md: 12 } : { span: 12 }">
        <demo-danmu />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoDanmu from './components/demo-danmu.vue';

  export default {
    name: 'ExtensionPlayer',
    components: { DemoBasic, DemoDanmu },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>

<style>
  .xgplayer-skin-default .xgplayer-pip {
    margin: -1px 0 0 10px;
  }
</style>
