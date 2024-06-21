<template>
  <el-card shadow="never" header="懒加载">
    <div style="margin-bottom: 12px">单选：</div>
    <div style="max-width: 260px">
      <ele-tree-select
        v-model="value"
        :clearable="true"
        :lazy="true"
        placeholder="请选择"
        :load="loadNode"
        :init-value="initValue"
      />
    </div>
    <div style="margin: 12px 0">多选：</div>
    <div style="max-width: 260px">
      <ele-tree-select
        v-model="value2"
        :multiple="true"
        :clearable="true"
        :lazy="true"
        placeholder="请选择"
        :load="loadNode"
        :init-value="initValue2"
      />
    </div>
    <div style="margin-top: 12px">
      <el-button size="small" type="primary" @click="setInitValue">
        回显数据
      </el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        // 懒加载
        value: undefined,
        // 回显数据
        initValue: undefined,
        // 懒加载
        value2: [],
        // 回显数据
        initValue2: undefined
      };
    },
    methods: {
      // 懒加载
      loadNode(node, resolve) {
        setTimeout(() => {
          if (!node.data) {
            resolve([
              {
                label: '系统管理',
                value: '1'
              },
              {
                label: '日志管理',
                value: '8'
              }
            ]);
          } else if (node.data.value === '1') {
            resolve([
              {
                label: '用户管理',
                value: '2'
              },
              {
                label: '角色管理',
                value: '5'
              }
            ]);
          } else if (node.data.value === '2') {
            resolve([
              {
                label: '添加用户',
                value: '3'
              },
              {
                label: '修改用户',
                value: '4'
              }
            ]);
          } else if (node.data.value === '5') {
            resolve([
              {
                label: '添加角色',
                value: '6'
              },
              {
                label: '修改角色',
                value: '7'
              }
            ]);
          } else if (node.data.value === '8') {
            resolve([
              {
                label: '登录日志',
                value: '9'
              },
              {
                label: '操作日志',
                value: '10'
              }
            ]);
            return;
          } else {
            resolve([]);
          }
        }, 500);
      },
      // 回显数据
      setInitValue() {
        this.initValue = {
          value: '3',
          label: '添加用户'
        };
        this.initValue2 = [
          {
            value: '3',
            label: '添加用户'
          },
          {
            label: '修改角色',
            value: '7'
          },
          {
            label: '登录日志',
            value: '9'
          }
        ];
      }
    }
  };
</script>
