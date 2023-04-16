<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
html{
  width: 100%;
  height: 100%;
}
body{
  margin: 0;
  padding: 0;
  background: #EFEFEF;
  width: 100%;
  height: 100%;
}
  .el-container,.common-layout{
    height: 100%;
  }
/*定义滚动条高宽及背景
高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0,0,0,.2);
}

/*定义滚动条轨道
内阴影+圆角*/
::-webkit-scrollbar-track
{
  -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
  border-radius:10px;
  background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius:10px;
  -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
  background-color: #b3b3b3;
}
  .el-drawer__header{
    margin-bottom: 0 !important;
  }
</style>
