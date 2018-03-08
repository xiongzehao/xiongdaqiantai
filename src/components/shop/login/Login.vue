<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <!-- form表单 -->
                    <el-form  id="loginform" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="密码" prop="user_name">
                            <el-input type="password" v-model="ruleForm2.user_name" style="width:300px;" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password">
                            <el-input type="password" v-model="ruleForm2.password" style="width:300px;" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- form表单 -->
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        user_name: "",
        password: ""
      },
      rules2: {
        user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{  required: true, message: '请输入密码', trigger: 'blur' }]
        
      }
    };
  },
  methods:{
       submitForm(){
           this.$axios.post(this.$api.login,this.ruleForm2).then(res=>{
               if(res.data.status==0){
                    this.$alert("登录成功",'温馨提示',{
                        callback:()=>{
                            let nextPage = this.$route.query.next||'/'
                            // console.log(nextPage);
                            this.$router.push({path:nextPage})
                        }
                    })
               }
           })
       }
  }
};
</script>

<style scoped>
   #loginform{
       transform: translateX(30%);
   }
</style>