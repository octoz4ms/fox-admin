<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    style="padding-right: 15px"
  >
    <el-form-item label="付款账户:" prop="account">
      <el-select
        v-model="form.account"
        placeholder="请选择付款账户"
        class="ele-fluid"
        clearable
      >
        <el-option label="eleadmin@eclouds.com" value="eleadmin@eclouds.com" />
      </el-select>
    </el-form-item>
    <el-form-item label="收款账户:" prop="receiver">
      <el-input
        v-model="form.receiver"
        placeholder="请输入收款账户"
        clearable
        class="input-with-select"
      >
        <template v-slot:prepend>
          <el-select v-model="form.pay">
            <el-option label="支付宝" value="alipay" />
            <el-option label="微信" value="wxpay" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="收款人姓名:" prop="name">
      <el-input v-model="form.name" placeholder="请输入收款人姓名" clearable />
    </el-form-item>
    <el-form-item label="转账金额:" prop="amount">
      <el-input
        v-model="form.amount"
        placeholder="请输入转账金额"
        prefix-icon="el-icon-_rmb"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit">
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        // 表单数据
        form: {
          account: 'eleadmin@eclouds.com',
          receiver: 'test@example.com',
          pay: 'alipay',
          name: 'Alex',
          amount: 500
        },
        // 表单验证规则
        rules: {
          account: [
            {
              required: true,
              message: '请选择付款账户',
              trigger: 'blur'
            }
          ],
          receiver: [
            {
              required: true,
              message: '请输入收款账户',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入收款人姓名',
              trigger: 'blur'
            }
          ],
          amount: [
            {
              required: true,
              message: '请输入转账金额',
              trigger: 'blur'
            }
          ]
        },
        // 提交状态
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
              this.$emit('done', this.form);
            }, 300);
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .input-with-select :deep(.el-select .el-input) {
    width: 100px;
  }
</style>
