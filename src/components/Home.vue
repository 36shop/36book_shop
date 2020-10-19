<template>
  <el-container class="home-container">
    <!-- 头部区域-->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>书城后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域-->
    <el-container>
      <!-- 侧边栏-->
      <el-aside width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单-->
        <!--开启路由模式-->
        <el-menu
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse-transition="false"
        >
          <!--           1              -->
          <!--一级菜单-->
          <el-submenu index="1">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-user-solid"></i>
              <!--文本-->
              <span>管理员管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>管理员信息</span>
            </el-menu-item>
          </el-submenu>
          <!--             2          -->
          <!--一级菜单-->
          <el-submenu index="2">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-user"></i>
              <!--文本-->
              <span>用户管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="users">
              <!--图标-->
              <i class="el-icon-user"></i>
              <!--文本-->
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!--             3          -->
          <!--一级菜单-->
          <el-submenu index="3">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-s-goods"></i>
              <!--文本-->
              <span>商品管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-s-goods"></i>
              <!--文本-->
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-s-goods"></i>
              <!--文本-->
              <span>商品分类</span>
            </el-menu-item>
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-s-goods"></i>
              <!--文本-->
              <span>添加商品</span>
            </el-menu-item>
          </el-submenu>
          <!--             4         -->
          <!--一级菜单-->
          <el-submenu index="4">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-s-order"></i>
              <!--文本-->
              <span>订单管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-s-order"></i>
              <!--文本-->
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!--             5          -->
          <!--一级菜单-->
          <el-submenu index="5">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>数据统计</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-4-1">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体-->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false,
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //点击按钮，切换折叠菜单
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eafdf1;
}
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>