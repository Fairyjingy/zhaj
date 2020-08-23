<template>
  <div id="app">
    
          <router-view></router-view>
       
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: Arial,"微软雅黑",Avenir, Helvetica,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;   
}
.el-table td,.el-table th{
  padding:0 10px;
}  
/* .el-table td, .el-table th{
      padding:0;
      margin:0;
    } */
    .el-drawer__header{
      margin-bottom:20px;
      border-bottom:1px solid #ccc;
    }
    .el-drawer__body{
      padding:0 20px 20px;
      height:calc(100% - 47px);
      overflow: auto;
    }
    .el-button--text{
  color:#409EFF!important;
}

.el-button--success{
  background-color: #3c8dbc!important;
  border-color: #3c8dbc!important;
}
</style>
