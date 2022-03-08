<template>
    <div class="registerForm">
        <h1 class="title">{{register?'注册':'修改用户信息'}}</h1>
        <a-form-model
            ref="registerForm"
            :model="registerForm"
            :rules="rules"
            v-bind="layout"
        >
            <a-form-model-item has-feedback label="邮箱" prop="email">
                <a-input
                    v-model="registerForm.email"
                    type="email"
                    autocomplete="off"
                    :disabled="!register"
                />
            </a-form-model-item>
            <a-form-model-item has-feedback label="用户名" prop="username">
                <a-input
                    v-model="registerForm.username"
                    type="text"
                    autocomplete="off"
                    :disabled="!register"
                />
            </a-form-model-item>
            <a-form-model-item has-feedback label="密码" prop="password">
                <a-input
                    v-model="registerForm.password"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新密码" required v-if="!register">
                <a-input-password autocomplete="off" v-model="newPassword"/>
            </a-form-model-item>
            <a-form-model-item label="验证码" prop="code">
                <a-row :gutter="8">
                    <a-col :span="12">
                        <a-input v-model.number="registerForm.code"/>
                    </a-col>
                    <a-col :span="8">
                        <a-button @click="obTain" :disabled="desss">
                            <span v-if="!desss"> 获取验证码 </span>
                            <span v-else>{{countdown}}秒后重新获取</span>
                        </a-button>
                    </a-col>
                </a-row>
            </a-form-model-item>
            <a-form-model-item
                has-feedback
                label="用户权限"
                prop="role"
                help="customer：代表普通用户，admin：代表管理员用户"
            >
                <a-select
                    placeholder="选择"
                    v-model="registerForm.role"
                >
                    <a-select-option v-for="n in selRole" :key="n">
                        {{ n }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
                <template v-if="register">
                    <router-link :to="{name: 'Login'}">
                    <a-button type="primary" class="primary">
                        <a-icon type="left" />已有账号登录
                    </a-button>
                    </router-link>
                    <a-button type="primary" style="margin: 0 50px;"
                            @click="submitForm('registerForm')">
                        注册
                    </a-button>
                </template>
                <template v-else>
                    <a-button @click="$router.go(-1)">返回</a-button>
                    <a-button  type="primary" style="margin: 0 50px;"
                        @click="submitForm('registerForm')">
                        修改
                    </a-button>
                </template>
                <a-button
                    @click="resetForm('registerForm')"
                >
                    重置
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import api from '@/api/user';
import verify from '@/utils/verify';

export default {
  props: ['register'],
  data() {
    const checkEmail = verify.email();
    return {
      selRole: ['customer', 'admin'],
      desss: false,
      timer: '',
      countdown: 60,
      registerForm: {
        email: '',
        username: '',
        password: '',
        code: '',
        role: '',
      },
      // 新密码
      newPassword: '',
      rules: {
        email: [{ required: true, validator: checkEmail, trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
        role: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
    };
  },
  created() {
    // 修改用户信息，获取邮箱 用户名
    if (!this.register) {
      this.registerForm.email = this.$store.state.user.email;
      this.registerForm.username = this.$store.state.user.username;
    }
  },
  methods: {
    // 获取验证码
    obTain() {
      const emailVerify = /^[\S]+@[\S]+.com$/;
      if (emailVerify.test(this.registerForm.email)) {
        api.verify(this.registerForm.email).then(() => {
          this.countdown = 60;
          this.desss = true;
          this.timer = setInterval(() => {
            if (this.countdown <= 0) {
              clearInterval(this.timer);
              this.desss = false;
            }
            this.countdown -= 1;
          }, 1000);
        });
      } else {
        this.$message.error('邮箱格式不正确');
      }
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 注册
          if (this.register) {
            this.$emit('submit');
            api.register(this.registerForm).then(() => {
              this.$message.success('注册成功');
              this.$router.push({ name: 'Login' });
            }).catch((er) => {
              this.$message.error(er);
            });
          } else {
            api.changeUser({ ...this.registerForm, newPassword: this.newPassword }).then(() => {
              this.$message.success('修改成功');
              this.$router.go(-1);
            }).catch((er) => {
              this.$message.error(er);
            });
          }
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
.registerForm {
    width: 750px;
    height: 550px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #dadce0;
    border-radius: 10px;
    padding: 10px 0;
    .title{
        color: #202124;
        margin-left: 100px;
        margin-bottom: 30px;
    }
}
</style>
