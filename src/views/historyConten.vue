<template>
    <div style="background: #FDEFEF;padding: 20px;">
        <ul class="ulList">
            <li v-for="(childItem,n) in Proxy.historyContent.logs" :key="n+'childList'">
                <p>
                    <img style="width: 35px;height: 35px;vertical-align:middle;" :src="childItem.userName === '机器人' ? require('../assets/ai.png') : require('../assets/user.png')" alt="">
                    {{childItem.userName}}
                </p>
                <p style="padding-left: 30px;">{{childItem.context}}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
    const Proxy = defineProps(["historyContent"]);
</script>

<style scoped>
    .ulList{
        list-style: none;
    }
    .ulList li{
        margin: 40px 0;
    }
</style>
