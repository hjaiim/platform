<template>
  <el-row class="container">
    <!--head-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <router-link to="/">
          <img src="@/assets/logo.png">
        </router-link>
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
import API from "api/api_login";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      nickname: "",
      collapsed: false,
      defaultActiveIndex: "0"
    };
  },
  components: {},
  watch: {},
  methods: {
    init() {
      let userinfo = this.getUserInfo();
      this.nickname = userinfo.nickname;
    },
    jumpTo(url) {
      console.log("jumpTo-----url=", url);
      this.defaultActiveIndex = url;
      this.$router.push(url);
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          API.logout()
            .then(result => {
              // 登出成功
              // 清除登录信息
              this.$utils.data.delData("isLogin");
              // 清除用户信息
              this.$utils.data.delData("user");
              //去登录页
              this.$router.push("/login");
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                showClose: true,
                message: "登出失败",
                duration: 2000
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    },
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    getUserInfo() {
      return this.$utils.data.getData("user");
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/css/home.scss";
</style>
