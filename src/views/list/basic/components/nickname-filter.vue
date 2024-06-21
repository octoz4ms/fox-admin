<!-- 自定义表格筛选 -->
<template>
  <div
    style="position: absolute; right: 8px; margin-top: -10px; top: 50%"
    @click.stop=""
  >
    <el-popover
      :width="200"
      trigger="click"
      v-model="visible"
      placement="bottom"
      transition="el-zoom-in-top"
    >
      <template v-slot:reference>
        <i class="el-icon-_filter ele-text-secondary" style="font-weight: bold">
        </i>
      </template>
      <div>
        <div>
          <el-input size="mini" v-model="nickname" placeholder="请输入关键字" />
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" size="mini" @click="search">
            搜索
          </el-button>
          <el-button size="mini" @click="reset">重置</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // popover 是否显示
        visible: false,
        // 搜索关键字
        nickname: ''
      };
    },
    methods: {
      /* 搜索 */
      search() {
        this.visible = false;
        this.$emit('search', this.nickname);
      },
      /* 重置 */
      reset() {
        if (this.nickname) {
          this.nickname = '';
          this.search();
        } else {
          this.visible = false;
        }
      }
    }
  };
</script>
