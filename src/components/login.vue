<template>
    <div style="height: 400px;">
        <el-form
                ref="ruleFormRef"
                :model="loginForm"
                status-icon
                label-width="120px"
                class="demo-ruleForm"
        >
            <el-form-item style="margin-left: 80px;">
                <div>
                    <img src="../assets/logo2.png" alt="">
                </div>
            </el-form-item>
            <el-form-item style="margin-left: 168px;">
                <b style="font-size: 24px;color: #3D3D3D;">欢迎你到来</b>
            </el-form-item>
            <el-form-item prop="name" style="margin-right: 120px;">
                <el-input  size="large" placeholder="请输入账号"  v-model="loginForm.name" />
            </el-form-item>
            <el-form-item prop="password" style="margin-right: 120px;">
                <el-input size="large" show-password @keyup.enter="$emit('type-login',loginForm)" placeholder="请输入密码"  v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item style="margin-right: 120px;">
                <el-button @click="$emit('type-login',loginForm)" type="primary" style="width: 100%;height: 52px;">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    defineEmits(['type-login'])
    const loginForm = ref({
        name:"",
        password:""
    })

</script>

<style scoped>

</style>
