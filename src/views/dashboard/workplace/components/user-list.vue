<template>
  <el-card shadow="never" body-style="padding: 2px 0;">
    <template v-slot:header>
      <span>{{ title }}</span>
      <more-icon @remove="onRemove" @edit="onEdit" />
    </template>
    <div
      v-for="(item, index) in userList"
      :key="index"
      class="ele-cell user-list-item"
    >
      <el-avatar :size="40" :src="item.avatar" />
      <div class="ele-cell-content" style="overflow: hidden">
        <div class="ele-cell-title ele-elip">{{ item.name }}</div>
        <div class="ele-cell-desc ele-elip">{{ item.introduction }}</div>
      </div>
      <el-tag size="mini" :type="['success', 'danger'][item.status]">
        {{ ['在线', '离线'][item.status] }}
      </el-tag>
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
    data() {
      return {
        userList: []
      };
    },
    created() {
      this.queryUserList();
    },
    methods: {
      queryUserList() {
        this.userList = [
          {
            name: 'SunSmile',
            introduction: 'UI设计师、交互专家',
            status: 0,
            avatar:
              'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
          },
          {
            name: '你的名字很好听',
            introduction: '前端工程师',
            status: 0,
            avatar:
              'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
          },
          {
            name: '全村人的希望',
            introduction: '前端工程师',
            status: 0,
            avatar:
              'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
          },
          {
            name: 'Jasmine',
            introduction: '产品经理、项目经理',
            status: 1,
            avatar:
              'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
          },
          {
            name: '酷酷的大叔',
            introduction: '组长、后端工程师',
            status: 1,
            avatar:
              'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
          }
        ];
      },
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
  .user-list-item {
    padding: 13px 18px;

    & + .user-list-item {
      border-top: 1px solid hsla(0, 0%, 60%, 0.15);
    }

    .ele-cell-desc {
      margin-top: 2px;
    }
  }
</style>
