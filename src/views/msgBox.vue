<template>
    <el-container>
        <el-aside  width="300px" class="asideBa">
            <el-button style="width: 98%;height: 42px;border-color:  #1B7EF7;color:#1B7EF7; "  @click="newMsg">
                <el-icon><Plus /></el-icon>新建会话
            </el-button>
            <div class="historyBox" style="height: 74%;overflow-x:auto ">
                <ul style="list-style: none;">
                    <li v-for="(item,index) in historyList" :key="index+'history'" @click="openHistoricalConversation(item)">
                        <el-icon style="margin-right: 10px;color: #6B6E72;"><ChatRound /></el-icon>
                        历史会话：{{item.name}}
                        <el-icon @click.stop="deleteHistoryList(item)" style="margin-left: 10px;color: #1B7EF7;"><Delete /></el-icon>
                    </li>
                </ul>
            </div>
            <div class="elBottom" v-if="isLogin">
                <div style="width: 100%;height: 40px;text-align: left;color:#1B7EF7; cursor: pointer;" @click="deleteAll" >
                    <el-icon style="position: relative;top: 2px;"><DeleteFilled /></el-icon> 清除所有会话
                </div>
                <div style="width: 100%;height: 40px;text-align: left;color:#1B7EF7; cursor: pointer;" @click="openTagMsg">
                    <el-icon style="position: relative;top: 2px;"><User/></el-icon> 个人仪表盘
                </div>
                <div style="width: 100%;height: 40px;text-align: left;color:#1B7EF7; cursor: pointer;" @click="logOut">
                    <el-icon style="position: relative;top: 2px;"><SwitchButton /></el-icon> 退出
                </div>
            </div>
        </el-aside>
        <el-main class="asideBa2">
            <UserType v-if="!userType" @tag-type="tagUser"></UserType>
            <SendMsg :initialTips="initialTips" v-else></SendMsg>
        </el-main>
        <el-dialog
                v-model="dialogVisible"
                v-if="dialogVisible"
                width="700px"
        >
            <LoginView @type-login="loginGo"></LoginView>
        </el-dialog>
        <el-drawer
                v-model="dialogVisible2"
                size="84%"
        >
            <PersonalDashboard></PersonalDashboard>
        </el-drawer>

        <el-dialog
                v-model="dialogVisible3"
                v-if="dialogVisible3"
                title="历史会话"
                custom-class="historyBox"
                width="50%"
        >
            <hr>
           <div style="height: 60%;overflow-x: auto;height: 600px;">
               <HistoryConten :historyContent="historyChildList"></HistoryConten>
           </div>
        </el-dialog>
    </el-container>
</template>

<script setup>
    import UserType from './userType.vue'
    import SendMsg from './sendMsg.vue'
    import LoginView from '@/components/login.vue'
    import PersonalDashboard from './personalDashboard.vue'
    import HistoryConten from './historyConten.vue'
    import { Login,historicalConversation,historicalDeleList,deleListAll } from '@/api/getNetwork'
    import { ref,watch  } from 'vue'
    import { ElMessage,ElMessageBox  } from 'element-plus'
    const myIsType = defineProps(["myIsType"]);
    const userType = ref(null);
    const dialogVisible = ref(false);
    const dialogVisible2 = ref(false);
    const dialogVisible3 = ref(false);
    const isLogin = ref(null);
    const initialTips = ref(null);
    const historyList = ref([]);
    const historyChildList = ref([]);
    watch(myIsType,async (n,o) =>{
       if(n){
           isLogin.value = n;
           getHistoricalConversation()
       }
    })
    if(sessionStorage.getItem('tokenId')){
        getHistoricalConversation()
    }
    isLogin.value = sessionStorage.getItem('tokenId');
    function tagUser(val) { //选择用户角色
        const token = sessionStorage.getItem('tokenId');
        if(!token){
            dialogVisible.value = true;
            return
        }
        initialTips.value = val.tip;
        userType.value = val;
    }
    function newMsg() { //新建沟通
        const token = sessionStorage.getItem('tokenId');
        if(!token){
            dialogVisible.value = true;
            return
        }
        getHistoricalConversation();
        userType.value = null
    }
    function loginGo(val) { //登录
        Login(val).then(res =>{
           if(res.code === 200){
               ElMessage({
                   message: '登录成功',
                   type: 'success',
               });
               isLogin.value = res.data.token;
               sessionStorage.setItem('tokenId',res.data.token);
               sessionStorage.setItem('userName',res.data.userName);
               dialogVisible.value = false;
               getHistoricalConversation()
           }
        })
    }

    function logOut() { //退出
        ElMessageBox.confirm(
            '确认退出吗?',
            '提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                ElMessage({
                    message: '退出成功',
                    type: 'success',
                })
                userType.value = null;
                isLogin.value = null;
                historyList.value = [];
                sessionStorage.removeItem("tokenId")
                sessionStorage.removeItem('userName')
            })
            .catch(() => {
                console.log('取消退出')
            })
    }

    function openTagMsg() { //个人仪表盘
        dialogVisible2.value = true;
    }


    function getHistoricalConversation() {
        historicalConversation().then( res =>{
            if(res.code === 200){
                historyList.value = res.data
            }
        })
    }

    function openHistoricalConversation(arr) {
        historyChildList.value = arr;
        dialogVisible3.value = true;
    }

    function deleteHistoryList(val) { //删除会话
        ElMessageBox.confirm(
            '删除后不可恢复，确认删除吗?',
            '提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                historicalDeleList({ logId:val.logId}).then(res =>{
                    if(res.code === 200){
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                        getHistoricalConversation();
                    }
                })
            })
            .catch(() => {
               console.log('取消删除')
            })
    }

    function deleteAll() {
        ElMessageBox.confirm(
            '删除后不可恢复，确认删除吗?',
            '提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                deleListAll().then(res =>{
                    if(res.code === 200){
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                        getHistoricalConversation();
                    }
                })
            })
            .catch(() => {
                console.log('取消删除')
            })
    }
</script>

<style scoped>
    .asideBa{
        background: #ffffff;
        height: 100%;
        text-align: center;
        position: relative;
    }
    .asideBa2{
        height: 100%;
        margin-left: 25px;
        padding: 0 !important;
        overflow: hidden;
        text-align: center;
    }
    .elBottom{
        position: absolute;
        bottom: 70px;
        width: 300px;
        border-top: 1px solid #D8D8D8;
        text-align: left;
        padding-top: 30px;
        padding-left: 30px;
        box-sizing: border-box;
        color: #3D3D3D;
        font-size: 14px;
    }
    .historyBox{
        text-align: left;
        margin-top: 8px;
        color: #3D3D3D;
        cursor: pointer;
        font-size: 14px;
    }
    .historyBox ul li{
        background: #F0F7FF;
        height: 42px;
        line-height: 42px;
        border-radius: 2px 2px 2px 2px;
        margin: 10px 0;
        text-indent: 20px;
    }
    .historyBox ul{
        margin: 0;
        padding: 0 10px;
    }
    /deep/  .historyBox .el-dialog__body{
        padding-top: 0 !important;
    }
</style>
