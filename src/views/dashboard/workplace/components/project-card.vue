<template>
  <el-card
    shadow="never"
    body-style="padding: 11px;"
    class="workplace-table-card"
  >
    <template v-slot:header>
      <span>{{ title }}</span>
      <more-icon @remove="onRemove" @edit="onEdit" />
    </template>
    <el-table :data="projectList" :height="316">
      <el-table-column type="index" width="35" min-width="35" align="right" />
      <el-table-column label="项目名称" min-width="110" show-overflow-tooltip>
        <template v-slot="{ row }">
          <el-link type="primary" :underline="false">
            {{ row.projectName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        prop="startDate"
        width="95"
        min-width="80"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="endDate"
        label="结束时间"
        width="95"
        min-width="80"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        width="70"
        min-width="60"
        align="center"
        show-overflow-tooltip
      >
        <template v-slot="{ row }">
          <span
            :class="
              [
                'ele-text-success',
                'ele-text-danger',
                'ele-text-warning',
                'ele-text-info ele-text-delete'
              ][row.status]
            "
          >
            {{ ['进行中', '已延期', '未开始', '已结束'][row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="160" min-width="100" align="center">
        <template v-slot="{ row }">
          <el-progress :percentage="row.progress" class="ele-text-small" />
        </template>
      </el-table-column>
    </el-table>
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
        projectList: []
      };
    },
    created() {
      this.queryProjectList();
    },
    methods: {
      queryProjectList() {
        this.projectList = [
          {
            id: 1,
            projectName: '项目0000001',
            status: 0,
            startDate: '2020-03-01',
            endDate: '2020-06-01',
            progress: 30
          },
          {
            id: 2,
            projectName: '项目0000002',
            status: 0,
            startDate: '2020-03-01',
            endDate: '2020-08-01',
            progress: 10
          },
          {
            id: 3,
            projectName: '项目0000003',
            status: 1,
            startDate: '2020-01-01',
            endDate: '2020-05-01',
            progress: 60
          },
          {
            id: 4,
            projectName: '项目0000004',
            status: 1,
            startDate: '2020-06-01',
            endDate: '2020-10-01',
            progress: 0
          },
          {
            id: 5,
            projectName: '项目0000005',
            status: 2,
            startDate: '2020-01-01',
            endDate: '2020-03-01',
            progress: 100
          },
          {
            id: 6,
            projectName: '项目0000006',
            status: 3,
            startDate: '2020-01-01',
            endDate: '2020-03-01',
            progress: 100
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
  .workplace-table-card {
    :deep(.el-table tbody > .el-table__row:last-child td) {
      border-bottom: none;
    }

    :deep(.el-table:before) {
      display: none;
    }
  }
</style>
