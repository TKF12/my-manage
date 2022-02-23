<template>
    <div class="login">
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
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="submitForm('loginForm')">
                    登录
                </a-button>
                <a-button
                    style="margin-left: 10px"
                    @click="resetForm('loginForm')"
                >
                    重置
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    let checkPending;
    const emailVerify = /^[\S]+@[\S]+.com$/;
    const checkEmail = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        callback(new Error('请输入邮箱'));
      }
      checkPending = setTimeout(() => {
        // 邮箱正确
        if (emailVerify.test(value)) {
          callback();
        } else {
          callback(new Error('邮箱格式不正确'));
        }
        // return undefined;
      }, 1000);
      //   return undefined;
    };
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
        labelCol: { span: 4 },
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
};
</script>
<style lang="less">
@import "~@/assets/css/login.less";
</style>
