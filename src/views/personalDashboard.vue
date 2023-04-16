<template>
    <div style="height: 100%;">
        <el-row :gutter="20" style="height: 100%;">
            <el-col :span="8" style="height: 100%;">
                <div style="border-right: 1px solid #D8D8D8;height: 100%;">
                    <p>
                        <img style="vertical-align:middle;" src="../assets/user.png" alt="">
                        <span class="spanBox">我的账号信息(測試版本，待更新)</span>
                    </p>
                    <p class="pBox">
                        手机号：15666666666
                    </p>
                    <p class="pBox">
                        版本：GPT3.5
                    </p>
                    <p class="pBox">
                        有效期：至2023年6月7日
                    </p>
                </div>
            </el-col>
            <el-col :span="16">
                <div>
                    <p>
                        <span class="spanBox">消息列表</span>
                    </p>
                    <ul class="msgList">
                        <li>
                            <img style="vertical-align:top;width: 30px;height: 30px;" src="../assets/ai.png" alt="">
                            <span class="span2Box">您当前版本将于明天到期</span>
                        </li>
                        <li>
                            <img style="vertical-align:top;width: 30px;height: 30px;" src="../assets/ai.png" alt="">
                            <span class="span2Box">近期收到一些用户反馈，希望增加xxx板块内容，此块内容已在我们的开发进程中，预计2023年5月分上线，敬请期待！</span>
                        </li>
                        <li>
                            <img style="vertical-align:top;width: 30px;height: 30px;" src="../assets/ai.png" alt="">
                            <span class="span2Box">近期收到一些用户反馈，希望增加xxx板块内容，此块内容已在我们的开发进程中，预计2023年5月分上线，敬请期待！近期收到一些用
户反馈，希望增加xxx板块内容，此块内容已在我们的开发进程中，预计2023年5月分上线，敬请期待！</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
    .spanBox{
        color: #3D3D3D;
        font-weight: 600;
        font-size: 16px;
        margin-left: 10px;
        display: inline-block;
    }
    .pBox{
        color: #3D3D3D;
        font-size: 14px;
    }
    .span2Box{
        color: #717273;
        font-size: 16px;
        margin-left: 10px;
        display: inline-block;
        width: 80%;
    }
    .msgList{
        list-style: none;
    }
    .msgList li{
        margin-bottom: 20px;
        border-bottom: 1px solid #D8D8D8;
        padding-bottom: 20px;
    }
</style>
