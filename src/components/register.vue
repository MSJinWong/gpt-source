<template>
    <div style="height: 600px;">
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
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
                <el-input size="large" v-model="ruleForm.name" prefix-icon="Avatar" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="password" style="margin-right: 120px;">
                <el-input size="large" v-model="ruleForm.password" show-password prefix-icon="Lock" placeholder="请输入密码" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="password2" style="margin-right: 120px;">
                <el-input size="large" v-model="ruleForm.password2" show-password prefix-icon="Lock" placeholder="请确认密码" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="mail" style="margin-right: 120px;">
                <el-input size="large" v-model="ruleForm.mail" prefix-icon="Message" placeholder="请输入邮箱"  autocomplete="off" />
            </el-form-item>
            <el-form-item prop="phone" style="margin-right: 120px;">
                <el-input size="large" v-model="ruleForm.phone" prefix-icon="Iphone" placeholder="请输入电话"  autocomplete="off" />
            </el-form-item>
            <el-form-item style="margin-right: 120px;">
                <el-button @click.stop="$emit('type-zhuce',ruleForm)" type="primary" style="width: 100%;height: 52px;">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    defineEmits(['type-zhuce'])
    const ruleForm = ref({
        name:"",
        password:"",
        password2:"",
        mail:"",
        phone:""
    })

</script>

<style scoped>

</style>
