<template>
  <el-row class="container">
    <!--head-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/">
          <img src="@/assets/logo.png">
        </a>
      </div>
      <div class="topbar-title">
        <span>后台管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>{{nickname}}
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="jumpTo('/user/profile')">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="jumpTo('/user/changepwd')">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <el-col :span="24" class="main">
      <!--左边导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--菜单栏-->
        <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <!--有二级目录-->
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i>
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <!--没有二级目录-->
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
import UserModel from "../login/model/UserModel.js";
export default {
  created() {},
  data() {
    return {
      nickname: UserModel.nickName,
      collapsed: false,
      defaultActiveIndex: "0"
    };
  },
  components: {},
  watch: {},
  methods: {
    jumpTo(url) {
      console.log("jumpTo-----url=", url);
      this.defaultActiveIndex = url;
      this.$router.push(url);
    },
    logout() {},
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/css/home.scss";
</style>
