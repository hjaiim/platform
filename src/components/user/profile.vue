<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" :loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <b>首页</b>
        </el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.useranme" disabled></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="24">
      <p>表单上传图片</p>
      <el-upload class="avatar-uploader" action="api/v1/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-col>

    <el-col>
      <p>base64上传图片</p>
      <img :src="baseUrl" class="avatar" alt="图片">
      <input type="file" ref="fileBtn" @change="changeFile">
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
import API from "api/api_user.js";
export default {
  created() {},
  data() {
    return {
      loading: false,
      form: {
        useranme: "",
        nickname: "",
        name: "",
        email: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
      },
      imageUrl: "",
      baseUrl: ""
    };
  },
  components: {},
  watch: {},
  methods: {
    handleSaveProfile() {},
    handleAvatarSuccess(res, file) {
      // 读取本地上传图片
      // this.imageUrl = URL.createObjectURL(file.raw);

      // 读取后端返回上传成功之后的图片服务器地址
      this.imageUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 / 2;

      debugger;
      if (!isJPG && !isPNG) {
        this.$message.error("请选择png/jpg格式图片");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },
    changeFile() {
      let fileObj = this.$refs.fileBtn.files[0];
      let fileType = fileObj.type;
      let fileSize = fileObj.size;

      let reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = e => {
        let base64Str = e.target.result;
        this.uploadImg(base64Str);
      };
    },
    uploadImg(imgStr) {
      // 上传base64

      // post 上传
      API.upload({ imgStr: imgStr })
        .then(result => {
          console.log(result);
          this.baseUrl = result.imgUrl;
        })
        .catch(err => {
          console.log(err);
        }); 
    }
  }
};
</script>

<style>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
</style>

<style type="text/css" lang="scss" rel="stylesheet/css" scoped>
.el-form {
  width: 460px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
