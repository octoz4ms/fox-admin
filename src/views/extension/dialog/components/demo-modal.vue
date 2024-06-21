<template>
  <el-card shadow="never" header="可拖拽、拉伸、全屏弹窗">
    <el-form label-width="140px" style="max-width: 360px">
      <el-form-item label="是否可拖出边界:">
        <el-select class="ele-block" v-model="moveOut">
          <el-option label="不可拖出边界" :value="0" />
          <el-option label="可以拖出边界" :value="1" />
          <el-option label="只可右下方向拖出边界" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可拉伸大小:">
        <el-select class="ele-block" v-model="resizable">
          <el-option label="不可拉伸大小" value="false" />
          <el-option label="可以拉伸大小" value="true" />
          <el-option label="只可横向拉伸" value="horizontal" />
          <el-option label="只可纵向拉伸" value="vertical" />
        </el-select>
      </el-form-item>
      <el-form-item label="最大化切换按钮:">
        <el-switch v-model="maxable" />
      </el-form-item>
      <!-- <el-form-item label="是否垂直居中:">
        <el-switch v-model="centered" />
      </el-form-item> -->
      <el-form-item label="关闭后重置位置:">
        <el-switch v-model="resetOnClose" />
      </el-form-item>
      <el-form-item label="限制在主体区域:">
        <el-switch v-model="inner" />
      </el-form-item>
      <el-form-item label="默认位置:">
        <el-select clearable class="ele-block" v-model="position">
          <el-option label="顶部" value="top" />
          <el-option label="底部" value="bottom" />
          <el-option label="左边" value="left" />
          <el-option label="右边" value="right" />
          <el-option label="左上角" value="leftTop" />
          <el-option label="左下角" value="leftBottom" />
          <el-option label="右上角" value="rightTop" />
          <el-option label="右下角" value="rightBottom" />
          <el-option label="正中间" value="center" />
        </el-select>
      </el-form-item>
      <el-form-item label="destroy-on-close:">
        <el-switch v-model="destroyOnClose" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openDialog">打开可拖拽弹窗</el-button>
      </el-form-item>
    </el-form>
    <ele-modal
      width="400px"
      title="拖拽弹窗"
      :visible.sync="visible"
      :move-out="moveOut > 0"
      :move-out-positive="moveOut === 2"
      :resizable="modalResizable"
      :maxable="maxable"
      :inner="inner"
      :centered="centered"
      :reset-on-close="resetOnClose"
      :append-to-body="true"
      :destroy-on-close="destroyOnClose"
      :mask-keep-alive="inner || !destroyOnClose"
      :position="position"
      @closed="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="82px">
        <el-form-item label="用户名:" prop="nickname">
          <el-input
            clearable
            v-model="form.nickname"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select
            clearable
            class="ele-fluid"
            v-model="form.sex"
            placeholder="请选择性别"
            :popper-append-to-body="false"
          >
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input clearable v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input clearable v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="个人简介:">
          <el-input
            :rows="4"
            clearable
            type="textarea"
            v-model="form.introduction"
            placeholder="请输入个人简介"
          />
        </el-form-item>
      </el-form>
      <component-test />
      <template v-slot:footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </ele-modal>
  </el-card>
</template>

<script>
  import ComponentTest from './component-test.vue';

  export default {
    components: { ComponentTest },
    data() {
      return {
        // 弹窗是否打开
        visible: false,
        // 是否允许拖出边界
        moveOut: 0,
        // 是否可拉伸
        resizable: 'false',
        // 是否显示最大化切换按钮
        maxable: true,
        // 关闭后重置位置
        resetOnClose: true,
        // 限制在主体区域
        inner: false,
        // 垂直居中
        centered: false,
        // 表单数据
        form: {
          nickname: '',
          sex: undefined,
          phone: '',
          email: '',
          introduction: ''
        },
        // 表单验证规则
        rules: {
          nickname: [
            {
              required: true,
              message: '请输入用户名',
              type: 'string'
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              type: 'string'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号',
              type: 'string'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱',
              type: 'string'
            }
          ]
        },
        // 弹窗关闭后是否销毁
        destroyOnClose: false,
        // 默认位置
        position: undefined
      };
    },
    computed: {
      modalResizable() {
        return this.resizable === 'true'
          ? true
          : this.resizable === 'false'
          ? false
          : this.resizable;
      }
    },
    methods: {
      /* 打开弹窗 */
      openDialog() {
        if (!this.visible) {
          this.visible = true;
        }
      },
      /* 弹窗关闭回调 */
      cancel() {
        this.form = {
          nickname: '',
          sex: undefined,
          phone: '',
          email: '',
          introduction: ''
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
        this.visible = false;
      },
      /* 保存编辑 */
      save() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.$message.success('保存成功');
        });
      }
    }
  };
</script>
