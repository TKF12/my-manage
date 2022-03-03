<template>
    <div class="Login">
      <h1 class="title">登录</h1>
        <a-form-model
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            v-bind="layout"
        >
            <a-form-model-item
                has-feedback
                label="邮箱"
                prop="email"
                autocomplete="off"
            >
                <a-input v-model="loginForm.email" type="email" />
            </a-form-model-item>
            <a-form-model-item
                has-feedback
                label="密码"
                prop="password"
                autocomplete="off"
            >
                <a-input v-model="loginForm.password" type="password" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
                <a-button type="primary" @click="submitForm('loginForm')">
                    登录
                </a-button>
                <a-button
                    style="margin-left: 10px"
                    @click="resetForm('loginForm')"
                >
                    重置
                </a-button>
                <router-link :to="{name: 'Register'}">
                  <a-button type="primary" class="btnRight">
                    注册<a-icon type="right" />
                  </a-button>
                </router-link>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
import api from '@/api/user';
import verify from '@/utils/verify';

export default {
  data() {
    const checkEmail = verify.email();
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 登录成功
        if (valid) {
          api.login(this.loginForm)
            .then((res) => {
              this.$store.dispatch('setUser', res);
              // 页面跳转
              this.$router.push({
                name: 'Home',
              });
            })
            .catch((err) => {
              console.log(err);
              // 错误信息弹窗
              this.$message.error(err);
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
.Login{
  padding: 30px 0 0 20px;
  min-width: 500px;
  max-width: 500px;
  min-height: 300px;
  margin: 100px auto 0;
  border: 1px solid #dadce0;
  .title{
    color: #202124;
    margin-left: 100px;
    margin-bottom: 30px;
  }
  .btnRight{
  margin-left: 55px;
}
}

</style>
