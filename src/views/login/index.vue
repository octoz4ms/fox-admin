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
      @keyup.enter.native="submit"
    >
      <h4>{{ $t('login.title') }}</h4>
      <el-form-item prop="username">
        <el-input
          clearable
          v-model="form.username"
          prefix-icon="el-icon-user"
          :placeholder="$t('login.username')"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          v-model="form.password"
          prefix-icon="el-icon-lock"
          :placeholder="$t('login.password')"
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="login-input-group">
          <el-input
            clearable
            v-model="form.code"
            prefix-icon="el-icon-_vercode"
            :placeholder="$t('login.code')"
          />
          <img
            alt=""
            v-if="captcha"
            :src="captcha"
            class="login-captcha"
            @click="changeCaptcha"
          />
        </div>
      </el-form-item>
      <div class="el-form-item">
        <el-checkbox v-model="form.remember">
          {{ $t('login.remember') }}
        </el-checkbox>
        <el-link
          type="primary"
          :underline="false"
          class="ele-pull-right"
          @click="$router.push('/forget')"
        >
          忘记密码
        </el-link>
      </div>
      <div class="el-form-item">
        <el-button
          size="large"
          type="primary"
          class="login-btn"
          :loading="loading"
          @click="submit"
        >
          {{ loading ? $t('login.loading') : $t('login.login') }}
        </el-button>
      </div>
      <div class="ele-text-center" style="margin-bottom: 10px">
        <i class="login-oauth-icon el-icon-_qq" style="background: #3492ed"></i>
        <i
          class="login-oauth-icon el-icon-_wechat"
          style="background: #4daf29"
        ></i>
        <i
          class="login-oauth-icon el-icon-_weibo"
          style="background: #cf1900"
        ></i>
      </div>
    </el-form>
    <div class="login-copyright">
      copyright © 2022 eleadmin.com all rights reserved.
    </div>
    <!-- 多语言切换 -->
    <div style="position: absolute; right: 30px; top: 20px">
      <i18n-icon
        :icon-style="{ fontSize: '22px', color: '#fff', cursor: 'pointer' }"
      />
    </div>
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
  import I18nIcon from '@/layout/components/i18n-icon.vue';
  import { getToken } from '@/utils/token-util';
  import { login, getCaptcha } from '@/api/login';

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    components: { I18nIcon },
    data() {
      return {
        // 登录框方向, 0居中, 1居右, 2居左
        direction: 0,
        // 加载状态
        loading: false,
        // 表单数据
        form: {
          username: 'admin',
          password: 'admin',
          remember: true,
          code: ''
        },
        // 验证码base64数据
        captcha: '',
        // 验证码内容, 实际项目去掉
        text: ''
      };
    },
    computed: {
      // 表单验证规则
      rules() {
        return {
          username: [
            {
              required: true,
              message: this.$t('login.username'),
              type: 'string',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: this.$t('login.password'),
              type: 'string',
              trigger: 'blur'
            }
          ]
        };
      }
    },
    created() {
      if (getToken()) {
        this.goHome();
      } else {
        this.changeCaptcha();
      }
    },
    methods: {
      /* 提交 */
      submit() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.form.code.toLowerCase() !== this.text) {
            this.$message.error('验证码错误');
            return;
          }
          this.loading = true;
          login(this.form)
            .then((msg) => {
              this.loading = false;
              this.$message.success(msg);
              this.goHome();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        });
      },
      /* 跳转到首页 */
      goHome() {
        this.$router.push(this.$route?.query?.from ?? '/').catch(() => {});
      },
      /* 更换图形验证码 */
      changeCaptcha() {
        // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
        getCaptcha()
          .then((data) => {
            this.captcha = data.base64;
            // 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 可以根据自己后端接口修改
            this.text = data.text;
            // 自动回填验证码, 实际项目去掉这个
            this.form.code = this.text;
            this.$refs?.form?.clearValidate();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
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
    background-image: url('@/assets/bg-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    &:before {
      content: '';
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  /* 卡片 */
  .login-form {
    margin: 0 auto;
    width: 360px;
    max-width: 100%;
    padding: 25px 30px;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 2;

    h4 {
      text-align: center;
      margin: 0 0 25px 0;
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
  }

  .login-captcha {
    height: 38px;
    width: 102px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;

    &:hover {
      opacity: 0.75;
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
    padding-top: 20px;
    text-align: center;
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
      transform: translateX(-50%);
      margin-right: auto;
    }
  }
</style>
