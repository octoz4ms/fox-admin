<template>
  <div
    :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction]
    ]"
  >
    <el-form
      ref="form"
      size="large"
      :model="form"
      :rules="rules"
      class="login-form ele-bg-white"
      @keyup.enter.native="doSubmit"
    >
      <h4>忘记密码</h4>
      <el-form-item prop="phone">
        <el-input
          clearable
          v-model="form.phone"
          placeholder="请输入绑定手机号"
          prefix-icon="el-icon-mobile-phone"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          v-model="form.password"
          placeholder="请输入新的登录密码"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          show-password
          v-model="form.password2"
          placeholder="请再次输入登录密码"
          prefix-icon="el-icon-key"
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="login-input-group">
          <el-input
            clearable
            v-model="form.code"
            placeholder="请输入验证码"
            prefix-icon="el-icon-_vercode"
          />
          <el-button
            size="large"
            :disabled="!!countdownTimer"
            style="margin-left: 10px"
            @click="showImgCodeCheck"
          >
            <span v-if="!countdownTimer">发送验证码</span>
            <span v-else>已发送 {{ countdownTime }} s</span>
          </el-button>
        </div>
      </el-form-item>
      <div class="el-form-item">
        <el-link
          type="primary"
          :underline="false"
          class="ele-pull-right"
          @click="$router.push('/login')"
        >
          返回登录
        </el-link>
      </div>
      <div class="el-form-item">
        <el-button
          size="large"
          type="primary"
          class="login-btn"
          :loading="loading"
          @click="doSubmit"
        >
          修改密码
        </el-button>
      </div>
    </el-form>
    <div class="login-copyright">
      copyright © 2022 eleadmin.com all rights reserved.
    </div>
    <!-- 图形验证码弹窗 -->
    <ele-modal width="320px" title="发送验证码" :visible.sync="showImgCode">
      <div class="login-input-group" style="margin-bottom: 15px">
        <el-input
          size="large"
          v-model="imgCode"
          placeholder="输入图形验证码"
          @keyup.enter.native="sendCode"
        />
        <img
          alt=""
          :src="captcha"
          class="login-captcha"
          @click="changeImgCode"
        />
      </div>
      <el-button
        size="large"
        type="primary"
        class="login-btn"
        :loading="codeLoading"
        @click="sendCode"
      >
        立即发送
      </el-button>
    </ele-modal>
    <!-- 实际项目去掉这段 -->
    <div
      class="hidden-xs-only"
      style="position: absolute; right: 30px; bottom: 20px; z-index: 9"
    >
      <el-radio-group v-model="direction" size="mini">
        <el-radio-button label="2">居左</el-radio-button>
        <el-radio-button label="0">居中</el-radio-button>
        <el-radio-button label="1">居右</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Forget',
    data() {
      return {
        // 登录框方向, 0居中, 1居右, 2居左
        direction: 0,
        // 加载状态
        loading: false,
        // 表单数据
        form: {
          phone: '1234567890',
          password: '',
          password2: '',
          code: ''
        },
        // 表单验证规则
        rules: {
          phone: [
            {
              required: true,
              message: '请输入绑定手机号',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入新的登录密码',
              trigger: 'blur'
            }
          ],
          password2: [
            {
              validator: (_rule, value, callback) => {
                if (!value) {
                  return callback(new Error('请再次输入登录密码'));
                }
                if (value !== this.form.password) {
                  return callback(new Error('两次密码输入不一致'));
                }
                callback();
              },
              trigger: 'blur'
            }
          ],
          code: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            }
          ]
        },
        // 用于刷新验证码
        v: new Date().getTime(),
        // 是否显示图形验证码弹窗
        showImgCode: false,
        // 图形验证码
        imgCode: '',
        // 发送验证码按钮loading
        codeLoading: false,
        // 验证码倒计时时间
        countdownTime: 30,
        // 验证码倒计时定时器
        countdownTimer: null
      };
    },
    computed: {
      // 图形验证码地址
      captcha() {
        return 'https://eleadmin.com/assets/captcha?v=' + this.v;
      }
    },
    methods: {
      /* 提交 */
      doSubmit() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          setTimeout(() => {
            this.$message.success('密码修改成功');
            this.$router.push('/login');
          }, 1000);
        });
      },
      /* 更换图形验证码 */
      changeImgCode() {
        // 这里演示的验证码是后端地址直接是图片的形式, 如果后端返回base64格式请参考登录页面
        this.v = new Date().getTime();
      },
      /* 显示发送短信验证码弹窗 */
      showImgCodeCheck() {
        if (!this.form.phone) {
          this.$message.error('请输入手机号码');
          return;
        }
        this.imgCode = '';
        this.changeImgCode();
        this.showImgCode = true;
      },
      /* 发送短信验证码 */
      sendCode() {
        if (!this.imgCode) {
          this.$message.error('请输入图形验证码');
          return;
        }
        this.codeLoading = true;
        setTimeout(() => {
          this.$message.success('短信验证码发送成功, 请注意查收!');
          this.showImgCode = false;
          this.codeLoading = false;
          this.startCountdownTimer();
        }, 1000);
      },
      /* 开始对按钮进行倒计时 */
      startCountdownTimer() {
        this.countdownTime = 30;
        this.countdownTimer = setInterval(() => {
          if (this.countdownTime <= 1) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
          }
          this.countdownTime--;
        }, 1000);
      }
    },
    destroyed() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* 背景 */
  .login-wrapper {
    padding: 50px 20px;
    position: relative;
    box-sizing: border-box;
    background-image: url('~@/assets/bg-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  /* 卡片 */
  .login-form {
    width: 360px;
    margin: 0 auto;
    max-width: 100%;
    padding: 25px 30px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    position: relative;
    z-index: 2;

    h4 {
      margin: 0 0 25px 0;
      text-align: center;
    }

    & > .el-form-item {
      margin-bottom: 25px;
    }
  }

  .login-form-right .login-form {
    margin: 0 15% 0 auto;
  }

  .login-form-left .login-form {
    margin: 0 auto 0 15%;
  }

  /* 验证码 */
  .login-input-group {
    display: flex;
    align-items: center;

    :deep(.el-input) {
      flex: 1;
    }

    .login-captcha {
      width: 102px;
      height: 38px;
      margin-left: 10px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      text-align: center;
      cursor: pointer;

      &:hover {
        opacity: 0.75;
      }
    }
  }

  .login-btn {
    display: block;
    width: 100%;
  }

  /* 第三方登录图标 */
  .login-oauth-icon {
    color: #fff;
    padding: 5px;
    margin: 0 10px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
  }

  /* 底部版权 */
  .login-copyright {
    color: #eee;
    text-align: center;
    padding-top: 20px;
    position: relative;
    z-index: 1;
  }

  /* 响应式 */
  @media screen and (min-height: 550px) {
    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -220px;
    }

    .login-form-right .login-form,
    .login-form-left .login-form {
      left: auto;
      right: 15%;
      transform: translateX(0);
      margin: -220px auto auto auto;
    }

    .login-form-left .login-form {
      right: auto;
      left: 15%;
    }

    .login-copyright {
      position: absolute;
      bottom: 20px;
      right: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .login-form-right .login-form,
    .login-form-left .login-form {
      left: 50%;
      right: auto;
      margin-right: auto;
      transform: translateX(-50%);
    }
  }
</style>
