<template>
  <el-card shadow="never" header="选择成员">
    <el-table :data="users" :border="true" style="width: 100%">
      <el-table-column type="index" width="45" align="center" />
      <el-table-column label="用户名">
        <template v-slot="{ row }">
          <el-input
            v-if="row.isEdit"
            v-model="row.name"
            placeholder="请输入用户名"
          />
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号">
        <template v-slot="{ row }">
          <el-input
            v-if="row.isEdit"
            v-model="row.number"
            placeholder="请输入工号"
          />
          <span v-else>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门">
        <template v-slot="{ row }">
          <el-select
            v-if="row.isEdit"
            v-model="row.department"
            placeholder="请选择部门"
            class="ele-fluid"
          >
            <el-option label="研发部" value="研发部" />
            <el-option label="测试部" value="测试部" />
            <el-option label="产品部" value="产品部" />
          </el-select>
          <span v-else>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="130px"
        align="center"
        :resizable="false"
      >
        <template v-slot="{ row, $index }">
          <el-link
            v-if="row.isEdit"
            icon="el-icon-check"
            type="success"
            :underline="false"
            @click="done(row, $index)"
          >
            完成
          </el-link>
          <el-link
            v-else
            icon="el-icon-edit"
            type="primary"
            :underline="false"
            @click="edit(row, $index)"
          >
            修改
          </el-link>
          <span class="ele-action">
            <el-popconfirm
              title="确定要删除此用户吗?"
              @confirm="remove(row, $index)"
            >
              <template v-slot:reference>
                <el-link icon="el-icon-delete" type="danger" :underline="false">
                  删除
                </el-link>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      icon="el-icon-plus"
      style="width: 100%; margin-top: 15px"
      @click="add"
    >
      新增成员
    </el-button>
  </el-card>
</template>

<script>
  import { uuid } from 'ele-admin';
  import { queryList } from '@/api/form/advanced';

  export default {
    data() {
      return {
        // 已添加成员
        users: []
      };
    },
    methods: {
      /* 添加 */
      add() {
        this.users.push({
          key: uuid(8),
          isEdit: true,
          number: '00001',
          name: 'John Brown',
          department: '研发部'
        });
      },
      /* 编辑 */
      edit(_row, index) {
        this.users[index].isEdit = true;
      },
      /* 删除 */
      remove(_row, index) {
        this.users.splice(index, 1);
      },
      /* 完成编辑 */
      done(_row, index) {
        this.users[index].isEdit = false;
      }
    },
    created() {
      /* 查询已添加 */
      queryList()
        .then((data) => {
          this.users = data.map((d) => {
            return {
              ...d,
              isEdit: false
            };
          });
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    }
  };
</script>
