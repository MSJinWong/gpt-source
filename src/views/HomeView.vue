<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  :ellipsis="false"
                  background-color="#1B7EF7"
                  text-color="#fff"
                  @select="handleSelect"
                  active-text-color="#ffd04b"
          >
            <el-menu-item index="">
              <a href="https://moke.zhouke.tech">
              <img style="margin-top: 14px;" src="../assets/logo.png" alt="">
            </a>
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="4">联系我们</el-menu-item>
            <el-menu-item index="3">更多版本</el-menu-item>
            <el-menu-item index="2">登录</el-menu-item>
            <el-menu-item index="1">注册</el-menu-item>
          </el-menu>
      </el-header>
      <el-main>
        <MsgBox :myIsType="isType"></MsgBox>
      </el-main>
    </el-container>
    <el-dialog
            v-model="dialogVisible"
            v-if="dialogVisible"
            width="700px"
    >
      <Register v-if="activeIndex == 1" @type-zhuce="goUser"></Register>
      <LoginView @type-login="loginGo" v-else></LoginView>
    </el-dialog>
    <el-dialog
            v-model="dialogVisible2"
            v-if="dialogVisible2"
            :title="activeIndex == 4 ? '联系我们' :'更多版本'"
            width="400px"
    >
      <div v-if="activeIndex == 4">
        <p>
          墨客（Moke）是上海舟可科技有限公司基于Azure OpenAI 开发的一款人工智能辅助软件。
        </p>
        <p>
          本項目目前在测试阶段，如果您有遇到任何问题或者任何建議，请联系 moke@zhouke.tech 商务合作请联系 sales@zhouke.tech
        </p>
      </div>
      <div v-else>
          <ul style="list-style: none;">
          <p>
            支持embedding训练模式的版本预计于4月24日发布。
        </p>
        <p>
           GPT4.0接口因为较为昂贵，预计将在付费功能开发后启用。
        </p>
          </ul>
      </div>
    </el-dialog>
    <div style="position: absolute;bottom: 0;text-align: center;width: 100%;font-size: 12px;">
      <p> <span style="color: rgb(113, 114, 115)">@2023 墨客——上海舟可科技有限公司</span>&nbsp;&nbsp;<a target="_blank"  href="https://beian.miit.gov.cn/?spm=5176.27804673.J_9220772140.52.3e1473653oNDlg#/Integrated/index">沪ICP备2021020534号</a></p>
    </div>
  </div>
</template>
<style scope>
  .el-header{
    padding: 0 !important;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .el-main{
    padding: 0 !important;
  }
</style>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import MsgBox from './msgBox.vue'
import Register from '@/components/register.vue'
import LoginView from '@/components/login.vue'
import { Login } from '@/api/getNetwork'
const activeIndex = ref('0');
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const isType = ref(null);
import { ElMessage } from 'element-plus'
import { registeredUsers } from '@/api/getNetwork'
function goUser(val) {
  let text = {
    name:"用户名不能为空",
    password:"密码不能为空",
    password2:"请确认密码",
    mail:"邮箱不能为空",
    phone:"手机号为不能空"
  }
  for(let key in val){
    if(!val[key]){
      ElMessage({
        message: text[key],
        type: 'warning',
      })
      return
    }
  }
  registeredUsers(val).then(res =>{
    if(res.code === 200){
      dialogVisible.value = false;
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
    }
    else {
      ElMessage.error(res.msg)
    }
  })
}
function handleSelect(key) {
  activeIndex.value = key;
  const token = sessionStorage.getItem('tokenId');
  switch (key) {
    case "1" :
      dialogVisible.value = true;
      break;
    case "2" :
      if(token){
        ElMessage({
          message: '已登录，无需再次登录',
          type: 'warning',
        })
        return
      }
      dialogVisible.value = true;
      break;
    case "3":
      dialogVisible2.value = true;
      break;
    case "4":
      dialogVisible2.value = true;
      break;
  }
}
function loginGo(val) { //登录
  Login(val).then(res =>{
    if(res.code === 200){
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      isType.value = res.data;
      sessionStorage.setItem('tokenId',res.data);
      dialogVisible.value = false;
    }
  })
}
</script>
