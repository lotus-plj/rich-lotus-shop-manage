<template  slot-scope="scope">
  <div id="login" class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo-hl.png" alt=""/>
      </div>
      <el-form ref="loginFormRef" :model="form"  label-width="0px"  class="login_form" :rules="fromRule">
        <el-form-item prop="userName"><!-- 用户名 -->
          <el-input   v-model="form.userName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="pwd"><!-- 密码 -->
          <el-input  v-model="form.pwd" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns"><!-- 按钮区域 -->
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLogin()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {$base} from '../utils/vab'
export default {
  data(){
    return {
      form: {
        userName: "aaa",
        pwd: "123456"
      },
      fromRule: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pwd:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 9, message: '长度在 6 到 9 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginFormRef.validate(async (valid)=>{
        if(!valid){
          console.log("不合法不给登录")
        }else{
          const {data:res}=await this.$http.post("/auth/login",this.form)
          // if(res.meta.status !== 200)
          //   return this.$message.error("登录失败！"+res.meta.msg);
          this.$message.success("登录成功！");
          //保存登录后的token状态
          window.sessionStorage.setItem("token",res.data);
          window.localStorage.setItem("token",res.data)
          this.$router.push("/home");//登录跳转
          // console.log(result.toString());
          // console.log(result.data);
          // alert(result.data)
        }
      })
    },
    resetLogin(){
      this.$refs.loginFormRef.resetFields();
    }
  }

}

</script>

<style lange="less" >
@import "../assets/css/style/publicVariable.scss";
.login_container{
  height: 100%;
  background-color: #b0d4b0;
  /*background-color: $mainTone;*/
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;/**圆角效果**/
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.avatar_box{
  height: 130px;
  width: 130px;
  background-color: #fff;
  border: 1px solid #eee;/*加个灰色边框*/
  border-radius: 50%;/*div组件变成圆形*/
  padding: 5px;/*图片和边框之间有10px间隙*/
  box-shadow: 0 0 10px #ddd;/*添加一个阴影，向外扩散10像素*/
  /*头像居中，向左移动box的50%，再向右移动自身的-50%，向上移动该组件高度的-50%，*/
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box img{
  height: 100%;
  width: 100%;
  border-radius: 50%;/*图片变成圆形*/
  background-color: #eee;
}


.login_container .login_form {
  position: absolute;
  bottom: 20px;/*靠下*/
  width: 100%;
  padding: 0 30px;/*上下内边距0，左右内边距20px*/
  /*border-box为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
  //实际宽度会是width减去border + padding的计算值
  //此处是为了不让input超出我们的登录父div*/
  box-sizing: border-box;
}

.login_container .btns {
  display: flex;/*flex布局*/
  /*justify-content控制项目在横轴的对齐方式
  flex-start即左对齐，center 为居中，对应的flex-end为右对齐。*/
  justify-content: center;
}
</style>
