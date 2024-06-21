<template>
  <el-card shadow="never">
    <template v-slot:header>
      <span>{{ title }}</span>
      <more-icon @remove="onRemove" @edit="onEdit" />
    </template>
    <div class="workplace-goal-wrap">
      <div class="workplace-goal-group">
        <el-progress
          :width="170"
          :percentage="80"
          type="dashboard"
          :format="() => ''"
        />
        <div class="workplace-goal-content">
          <el-tag size="large" class="ele-tag-round">
            <i class="el-icon-s-data"></i>
          </el-tag>
          <div class="workplace-goal-num ele-text-heading">285</div>
        </div>
        <div class="workplace-goal-text">恭喜, 本月目标已达标!</div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import MoreIcon from './more-icon.vue';

  export default {
    components: { MoreIcon },
    props: {
      title: String
    },
    methods: {
      onRemove() {
        this.$emit('remove');
      },
      onEdit() {
        this.$emit('edit');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .workplace-goal-wrap {
    height: 304px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .workplace-goal-group {
    text-align: center;
    position: relative;

    .workplace-goal-content {
      position: absolute;
      top: 48px;
      left: 0;
      width: 100%;
    }

    .workplace-goal-num {
      font-size: 40px;
      margin-top: 15px;
    }
  }
</style>
