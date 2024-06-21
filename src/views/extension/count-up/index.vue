<template>
  <div class="ele-body">
    <el-card shadow="never" header="滚动数字">
      <h1 style="padding-left: 10px">
        <vue-count-up
          :delay="0"
          :end-val="demoNum"
          :options="option"
          @ready="onReady"
        />
      </h1>
      <div style="margin-top: 15px">
        <el-button size="mini" @click="restart">重新开始</el-button>
        <el-button size="mini" @click="update">更新数字</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VueCountUp from 'vue-countup-v2';

  export default {
    name: 'ExtensionCountUp',
    components: { VueCountUp },
    data() {
      return {
        // 值
        demoNum: 2345,
        // 配置
        option: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
        // 实例
        instance: null
      };
    },
    methods: {
      /* 渲染完成 */
      onReady(ins) {
        this.instance = ins;
      },
      /* 重新开始 */
      restart() {
        if (!this.instance) {
          return;
        }
        this.instance.reset();
        this.instance.start();
      },
      /* 更新 */
      update() {
        this.demoNum += 100 + Math.round(Math.random() * 300);
      }
    }
  };
</script>
