<template>
<el-menu
class="nav-menu"
  default-active="/"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  router
  :collapse="isCollapse"
>
  <!-- default-active 当前激活菜单的 index -->
  <!-- 是否使用 vue-router 的模式,启用该模式会激活导航时以 index 作为 path 进行路由跳转 -->
  <el-menu-item index="/">
    <i class="el-icon-s-home"></i>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-menu-item index="/article">
    <i class="el-icon-document"></i>
    <span slot="title">内容管理</span>
  </el-menu-item>
  <el-menu-item index="/image">
    <i class="iconfont icon-image"></i>
    <span slot="title">素材管理</span>
  </el-menu-item>
  <el-menu-item index="/publish">
    <i class="iconfont icon-publish"></i>
    <span slot="title">发布文章</span>
  </el-menu-item>
  <el-menu-item index="/comment">
    <i class="iconfont icon-comment"></i>
    <span slot="title">评论管理</span>
  </el-menu-item>
  <el-menu-item index="/fans">
    <i class="iconfont icon-renwu"></i>
    <span slot="title">粉丝管理</span>
  </el-menu-item>
  <el-menu-item index="/settings">
    <i class="el-icon-setting"></i>
    <span slot="title">个人设置</span>
  </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  // 父组件调用子组件
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
