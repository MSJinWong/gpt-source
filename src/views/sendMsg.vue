<template>
   <div style="text-align: left;height: 100%">
       <div class="textMsg" ref='getDivDom'>
           <ul style="list-style:none">
               <li v-for="(item,index) in arrList" :key="index+'m'" style="position: relative;margin: 30px;">
                   <div>
                       <img style="width: 35px;height: 35px;vertical-align:top;" :src="item.type ? require('../assets/ai.png') : require('../assets/user.png')" alt="">
                       <span class="span">
                        {{item.text}}
                    </span>
                   </div>
               </li>
           </ul>
       </div>
       <div style="margin-top: 50px;">
           <el-row :gutter="20">
               <el-col :span="18">
                   <el-input
                           v-model="textarea"
                           :rows="4"
                           ref="textareaBox"
                           @keyup.enter="sendText"
                           resize="none"
                           type="textarea"
                           placeholder="请输入消息"
                   />
               </el-col>
               <el-col :span="6" style="padding-top: 20px;">
                   <el-button v-if="isSend === uuid || isSend === 'this is the heartbeat message'"  @click="sendText" style="width: 96px;height: 52px;font-size: 14px; background: #1B7EF7;color: #ffffff;">
                       发送 <el-icon><Promotion /></el-icon>
                   </el-button>
               </el-col>
           </el-row>
       </div>
   </div>
</template>

<script setup>
    import { ref,onBeforeUnmount,getCurrentInstance,onUpdated,nextTick  } from "vue";
    const textarea = ref("");
    const isPush = ref(false);
    const arrList = ref([]);
    const arrListIndex = ref(0);
    const isSend = ref("");
    import { ElMessage } from 'element-plus'
    const {  proxy } = getCurrentInstance();
    const initialTips = defineProps(["initialTips"]);
    // WS连接地址
    const uuid = getUuid();
    isSend.value = uuid;
    const heartbeatMsg = "this is the heartbeat message";
    const wsServer= ('http://47.103.169.242:8081/api/ws/'+ uuid)
        .replace("http", "ws")
        .replace("https", "wss");

    //socket初始化
    let socket;
    // 重连次数
    let reconnectCount;
    onBeforeUnmount( () =>{
        socket.close()
    })
    onUpdated(() =>{
        nextTick( () =>{
            let scrollEl =  proxy.$refs['getDivDom'];
            scrollEl.scrollTo({top:(scrollEl.scrollHeight+100),behavior:'smooth'});
        })
    })
    webSocketInit();
    function webSocketInit() {

        // 实例化WebSocket
        socket = new WebSocket(wsServer);

        //打开事件
        socket.onopen = function () {
            reconnectCount = 1;
            console.log("WebSockets连接已建立，正在等待数据...");
            createArticle(initialTips.initialTips)
        };

        //关闭事件
        socket.onclose = function () {
            if (reconnectCount <= 15) {
                console.log("WebSockets连接关闭了，正在尝试第"+ reconnectCount++ +"次重新连接...");
               // reconnect();
            } else {
                console.log("WebSockets连接关闭了，重连次数超过15次，停止重连，如需继续使用，请刷新页面");
            }
        };

        //获得消息事件
        function includeCode(text) {
            const regexp = /^(?:\s{4}|\t).+/gm;
            return !!(text?.includes(' = ') || text?.match(regexp))
        }
        socket.onmessage = function (msg) {
            // 过滤心跳信息
            if (msg.data !== heartbeatMsg && msg.data !== uuid) {
                if(isPush.value){
                    arrList.value.push(
                        {
                            name:"",
                            text:"",
                            type:'ai'
                        });
                    isPush.value = false;
                }
                arrList.value[arrListIndex.value].text+=msg.data
                //console.log(includeCode(arrList.value[arrListIndex.value].text))
            }
            isSend.value = msg.data;
        };
    }

    // 重连
    function reconnect() {
        setTimeout(function () {
            webSocketInit();
        }, 2000);
    }
    function getUuid() {
        return 'xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    // 请求AI回复方法
    function createArticle(title) {
        const data = JSON.stringify({
            text: title, id: "1", keep: "2", keepText: "1",userName:sessionStorage.getItem('userName')
        });
        if(!arrList.value.length){
            arrList.value.push({
                name:"",
                text:"",
                type:"ai"
            });
        }

        socket.send(data)
    }

    //发送数据
    function sendText(){
        if(!textarea.value.trim()){
            ElMessage({
                message: '消息不能为空',
                type: 'warning',
            })
            return
        }
        if(isSend.value !== uuid && isSend.value !== 'this is the heartbeat message'){
            ElMessage({
                message: '正在响应信息，请稍候发送！',
                type: 'warning',
            })
            return;
        }
        arrList.value.push({name:"", text:textarea.value});
        arrListIndex.value+=2;
        isPush.value = true;
        textarea.value = "";
        createArticle(arrList.value[arrList.value.length - 1].text)
    }
</script>

<style scoped>
    .textMsg{
        border:1px solid #CBCBCB;
        background: #ffffff;
        height: 70%;
        width: 1200px;
        overflow-x: auto;
        margin: 1px auto 5px 5px;
    }
    .span{
        color: #3D3D3D;
        font-size: 14px;
        display: inline-block;
        padding-left: 20px;
        box-sizing: border-box;
        width: 85%;
    }
</style>
