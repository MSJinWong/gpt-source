<template>
    <div class="text">
        <div style="margin-top: 20px;">
            <img src="../assets/logo2.png" alt="墨客">
        </div>
        <div style="font-size: 15px;color: #3D3D3D;margin-top: 20px;text-align: left;width: 1400px;height: 60px;font-weight: bold;" >
            请选中角色开始畅快的人工智能之旅吧~
        </div>
        <div style="  height: 550px;overflow-y: auto;overflow-x: hidden;">
            <el-row :gutter="65">
                <el-col :span="8" v-for="(item,index) in userArr" :key="index+'m'" style="padding: 0;margin: 0;">
                    <div class="tagBg" @click.stop="$emit('tag-type',item)" :title="item.description">
                        <p style="color: #3D3D3D;font-weight: 600;font-size: 18px;">{{item.name}}</p>
                        <p style="text-align: left; padding: 0 10px;font-size: 14px;color:#717273;">{{item.description}}</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getUserType } from '@/api/getNetwork'
    const userArr = ref([]);
    getUserType().then(res =>{
        if(res.code === 200){
            userArr.value = res.data
        }
    })

    defineEmits(['tag-type'])
</script>

<style scoped>
    .text{
        text-align: center;
        width: 1200px;
        box-sizing: border-box;
        overflow: hidden;
        margin: 50px auto auto auto;
    }
    .tagBg{
        background: #ffffff;
        width: 364px;
        height: 208px;
        line-height: 36px;
        margin-bottom: 50px;
        cursor: pointer;
        overflow: hidden;
        padding-top: 40px;
        text-overflow: ellipsis;
        box-sizing: border-box;
        border-radius: 10px 10px 10px 10px;


    }
    .tagBg P{
        text-align: center !important;
        border-radius: 10px 10px 10px 10px;
    }
</style>
