<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户列表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>

		<el-col :span="24">
			<el-input placeholder="姓名" v-model="name" @keyup.enter.native="handleSearch"></el-input>
			<el-button type="primary" @click="handleSearch">查询</el-button>
		</el-col>

		<el-col :span="24" v-loading="showLoading" element-loading-text="加载中">
			<el-table :data="tableData">
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
				<el-table-column prop="nickname" label="昵称" width="120" sortable></el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
				<el-table-column prop="email" label="邮箱" min-width="100" sortable></el-table-column>
				<el-table-column prop="username" label="账号" width="100"></el-table-column>
				<el-table-column prop="addr" label="地址" sortable></el-table-column>
			</el-table>
		</el-col>
		<el-col :span="24">
			<el-pagination @size-change="handleSizeChange" 
			@current-change="handleCurrentChange" :current-page='currentPage' 
			:page-size="10" layout="prev,pager,next,jumper,sizes" 
			:total="total" background>
			</el-pagination>
		</el-col>
	</el-row>
</template>
<script type="text/ecmascript-6">
import API from "api/api_user.js";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      showLoading: false,
      name: "",
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      currentPage: 1
    };
  },
  components: {},
  watch: {},
  methods: {
    init() {
      this.handleSearch();
    },
    handleSearch() {
      this.total = 0;
      this.page = 1;
      this.pageSize = 10;
      this.search();
    },
    formatSex(row, column) {
      // 性别显示转换
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    search() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.name
      };
      API.search(params)
        .then(result => {
          if (result && result.users) {
            this.total = result.total;
            this.tableData = result.users;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.messageData(val);
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/css" scoped>
.el-input {
  width: 240px;
}
.el-table{
	margin-bottom: 50px;
}
</style>
