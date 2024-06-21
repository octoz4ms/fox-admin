<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    class="ele-form-detail"
  >
    <div style="margin-bottom: 20px; padding: 0 20px">
      <el-alert
        title="确认转账后, 资金将直接打入对方账户, 无法退回。"
        type="info"
        show-icon
        class="ele-alert-border"
      />
    </div>
    <el-form-item label="付款账户:">
      <span>{{ data.account }}</span>
    </el-form-item>
    <el-form-item label="收款账户:" prop="receiver">
      <span>{{ data.receiver }}</span>
    </el-form-item>
    <el-form-item label="收款人姓名:" prop="name">
      <span>{{ data.name }}</span>
    </el-form-item>
    <el-form-item label="转账金额:" prop="amount">
      <span style="font-size: 24px">{{ data.amount }}</span>
      <span> 元</span>
    </el-form-item>
    <div style="margin: 20px 0 30px 0">
      <el-divider />
    </div>
    <el-form-item label="支付密码:" prop="password" style="margin-bottom: 22px">
      <div style="max-width: 280px; padding-right: 15px">
        <el-input
          v-model="form.password"
          placeholder="请输入支付密码"
          show-password
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit">
        下一步
      </el-button>
      <el-button class="hidden-xs-only" @click="back">上一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // 表单数据
        form: {
          password: '123456'
        },
        // 表单验证规则
        rules: {
          password: [
            {
              required: true,
              message: '请输入支付密码',
              trigger: 'blur'
            }
          ]
        },
        // 表单提交状态
        loading: false
      };
    },
    methods: {
      // 表单提交
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$emit('done');
            }, 300);
          } else {
            return false;
          }
        });
      },
      back() {
        this.$emit('back');
      }
    }
  };
</script>
