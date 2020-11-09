<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form
        class="login-form"
        ref="form"
        :model="user"
        :rules="rules"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
            :loading="loginLoading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '账号不能为空!', trigger: 'change' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '账号格式不正确!', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空!', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '验证码为6位数!', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              // 自定义校验
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议!'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin (form) {
      // const user = this.user
      this.loginLoading = true

      this.$refs.form.validate((valid, err) => {
        if (valid) {
          // alert('submit!')
          this.login()
        } else {
          console.log(err)
          return false
        }
      })
    },
    login () {
      login(this.user).then(res => {
        // console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录错误', err)
        this.$message.error('登录失败,账号或密码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: rgba(200, 200, 200, .5);
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
