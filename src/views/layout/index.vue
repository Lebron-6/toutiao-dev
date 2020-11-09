<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <AppAside class="aside-menu" :is-collapse="isCollapse"/>
      <!-- :is-collapse="isCollapse" 父组件调用子组件 -->
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse}" @click="isCollapse = !isCollapse"></i>
          <span>头条后台管理系统</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">用户退出</el-dropdown-item>
            <!-- 组件默认不识别原生事件 需要内部做处理-->
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
        <!-- 子路由出口 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import { getUserProfile } from '../../api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
    // 组件初始化 请求获取用户资料
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      // 除了登录接口,其他接口都需要提供你的身份令牌才能获取数据
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出已取消'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  .aside-menu {
    height: 100%;
  }
}
.header {
  background-color: pink;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// .main {
//     background-color: purple;
// }
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
