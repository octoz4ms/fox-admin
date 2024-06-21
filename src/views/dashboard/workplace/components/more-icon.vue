<template>
  <el-dropdown class="card-more-icon" @command="onCommand">
    <i class="el-icon-more ele-text-secondary"></i>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-edit" command="edit">
          编辑
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" command="remove">
          删除
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  export default {
    methods: {
      onCommand(command) {
        this.$emit(command);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .card-more-icon {
    padding: 0 8px 0 0;
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer;

    .el-icon-more {
      transform: rotate(90deg);
      display: block;
    }
  }
</style>
