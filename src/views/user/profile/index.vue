<template>
  <div class="ele-body">
    <el-row :gutter="15">
      <el-col v-bind="styleResponsive ? { md: 6, sm: 8 } : { span: 6 }">
        <el-card shadow="never" body-style="padding: 25px;">
          <div class="user-info-card">
            <div class="user-info-avatar-group" @click="openCropper">
              <img class="user-info-avatar" :src="form.avatar" alt="" />
              <i class="el-icon-upload2"></i>
            </div>
            <h2 class="user-info-name">{{ loginUser.nickname }}</h2>
            <div class="user-info-desc">{{ loginUser.introduction }}</div>
          </div>
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>资深前端工程师</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-office-building"></i>
              <span>某某公司 - 某某事业群 - 某某技术部</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-location-information"></i>
              <span>中国 • 浙江省 • 杭州市</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-_school"></i>
              <span>JavaScript、HTML、CSS</span>
            </div>
          </div>
          <div style="margin: 30px 0 20px 0">
            <el-divider class="ele-divider-dashed ele-divider-base" />
          </div>
          <h6 class="ele-text" style="margin-bottom: 8px">标签</h6>
          <div class="user-info-tags">
            <el-tag size="mini" type="info">很有想法的</el-tag>
            <el-tag size="mini" type="info">专注设计</el-tag>
            <el-tag size="mini" type="info">辣~</el-tag>
            <el-tag size="mini" type="info">大长腿</el-tag>
            <el-tag size="mini" type="info">川妹子</el-tag>
            <el-tag size="mini" type="info">海纳百川</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col v-bind="styleResponsive ? { md: 18, sm: 16 } : { span: 18 }">
        <el-card shadow="never" body-style="padding: 0;">
          <el-tabs v-model="active" class="user-info-tabs">
            <el-tab-pane label="基本信息" name="info">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="90px"
                style="max-width: 450px; padding: 34px 20px 0 20px"
                @keyup.enter.native="save"
                @submit.native.prevent
              >
                <el-form-item label="昵称:" prop="nickname">
                  <el-input
                    v-model="form.nickname"
                    placeholder="请输入昵称"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                  <el-select
                    v-model="form.sex"
                    placeholder="请选择性别"
                    class="ele-fluid"
                    clearable
                  >
                    <el-option label="男" value="1" />
                    <el-option label="女" value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input
                    v-model="form.email"
                    placeholder="请输入邮箱"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="个人简介:">
                  <el-input
                    v-model="form.introduction"
                    placeholder="请输入个人简介"
                    :rows="4"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item label="街道地址:">
                  <el-input
                    v-model="form.address"
                    placeholder="请输入街道地址"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <div class="ele-cell">
                    <el-input v-model="form.tellPre" style="width: 65px" />
                    <div class="ele-cell-content">
                      <el-input
                        v-model="form.tell"
                        placeholder="请输入联系电话"
                        clearable
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="loading" @click="save">
                    保存更改
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="账号绑定" name="account">
              <div class="user-account-list">
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保手机</div>
                    <div class="ele-text-secondary">
                      已绑定手机: 138****8293
                    </div>
                  </div>
                  <el-link type="primary" :underline="false">去修改</el-link>
                </div>
                <el-divider />
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保邮箱</div>
                    <div class="ele-text-secondary">
                      已绑定邮箱: eleadmin@eclouds.com
                    </div>
                  </div>
                  <el-link type="primary" :underline="false">去修改</el-link>
                </div>
                <el-divider />
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保问题</div>
                    <div class="ele-text-secondary">未设置密保问题</div>
                  </div>
                  <el-link type="primary" :underline="false">去设置</el-link>
                </div>
                <el-divider />
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_qq"></i>
                  <div class="ele-cell-content">
                    <div>绑定QQ</div>
                    <div class="ele-text-secondary">当前未绑定QQ账号</div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
                <el-divider />
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_wechat"></i>
                  <div class="ele-cell-content">
                    <div>绑定微信</div>
                    <div class="ele-text-secondary">当前未绑定绑定微信账号</div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
                <el-divider />
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_alipay"></i>
                  <div class="ele-cell-content">
                    <div>绑定支付宝</div>
                    <div class="ele-text-secondary">
                      当前未绑定绑定支付宝账号
                    </div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-dialog
      :src="form.avatar"
      :show.sync="visible"
      :lock-scroll="false"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :options="{ autoCropArea: 1, viewMode: 1, dragMode: 'move' }"
      @crop="onCrop"
    />
  </div>
</template>

<script>
  import EleCropperDialog from 'ele-admin/es/ele-cropper-dialog';

  export default {
    name: 'UserProfile',
    components: { EleCropperDialog },
    data() {
      return {
        // tab页选中
        active: 'info',
        // 表单数据
        form: {
          nickname: '',
          sex: '1',
          email: '',
          tellPre: '',
          tell: '',
          avatar: ''
        },
        // 表单验证规则
        rules: {
          nickname: [
            {
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            }
          ]
        },
        // 保存按钮loading
        loading: false,
        // 是否显示裁剪弹窗
        visible: false
      };
    },
    computed: {
      // 登录用户信息
      loginUser() {
        return this.$store.state.user.info;
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      Object.assign(this.form, this.loginUser, {
        tellPre: '0752',
        tell: ''
      });
    },
    methods: {
      /* 保存更改 */
      save() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message.success('保存成功');
            this.updateLoginUser(this.form);
          }, 800);
        });
      },
      /* 修改登录用户 */
      updateLoginUser(data) {
        this.$store.dispatch('user/setInfo', { ...this.loginUser, ...data });
      },
      /* 头像裁剪完成回调 */
      onCrop(result) {
        this.form.avatar = result;
        this.visible = false;
        this.updateLoginUser(this.form);
      },
      /* 打开图片裁剪 */
      openCropper() {
        this.visible = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ele-body {
    padding-bottom: 0;
  }

  .el-card {
    margin-bottom: 15px;
  }

  /* 用户资料卡片 */
  .user-info-card {
    padding: 8px 0;
    text-align: center;

    .user-info-avatar-group {
      position: relative;
      cursor: pointer;
      margin: 0 auto;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;

      & > i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 30px;
        display: none;
        z-index: 2;
      }

      &:hover {
        & > i {
          display: block;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }

    .user-info-avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info-name {
      font-size: 24px;
      margin-top: 20px;
    }

    .user-info-desc {
      margin-top: 8px;
    }
  }

  /* 用户信息列表 */
  .user-info-list {
    margin-top: 30px;

    .user-info-item {
      margin-bottom: 16px;
      display: flex;
      align-items: baseline;

      & > i {
        margin-right: 10px;
        font-size: 16px;
      }

      & > span {
        flex: 1;
        display: block;
      }
    }
  }

  /* 用户标签 */
  .user-info-tags .el-tag {
    margin: 10px 10px 0 0;
  }

  /* 用户账号绑定列表 */
  .user-account-list {
    padding: 16px 20px;

    .user-account-item {
      padding: 15px;

      .ele-text-secondary {
        margin-top: 6px;
      }

      .user-account-icon {
        width: 42px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        border-radius: 50%;
        background-color: #3492ed;
        box-sizing: border-box;

        &.el-icon-_wechat {
          background-color: #4daf29;
          font-size: 28px;
        }

        &.el-icon-_alipay {
          background-color: #1476fe;
          padding-left: 5px;
          font-size: 32px;
        }
      }
    }
  }

  /* tab 页签 */
  .user-info-tabs {
    :deep(.el-tabs__nav-wrap) {
      padding-left: 24px;
    }

    :deep(.el-tabs__item) {
      height: 50px;
      line-height: 50px;
      font-size: 15px;
    }
  }
</style>
