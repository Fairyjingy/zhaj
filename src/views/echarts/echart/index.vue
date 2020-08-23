<template>
<!-- 安全技术交底 -->
  <div class="echarts">

  
    <el-header class="header">
      <el-row>
          <el-col :span="3" class="echartsBack">
            <i class="el-icon-back" @click="goBack">返回上一页</i>
          </el-col>

          <el-col :span="21" >
            <el-row type="flex" justify="end">
              <el-col :span="4" v-for="(item,index) in titles" :key="index">
                <router-link :underline="false" :class="{active:item.active}" @click.native="aLink(index)" :to="item.path"  >{{item.name}}</router-link>
                
              </el-col>
            </el-row>
          </el-col>
      
      </el-row>
    </el-header>
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import commonFn from '@/common/js/util.js';
import qs from 'qs'
import {
    mapState,
} from "vuex";
const {
  formatDate2
} = commonFn
export default {
  data() {
      var user = sessionStorage.getItem('user');
      user = JSON.parse(user);
    return {
      titles:[
        {
          name:"安全教育",
          path:'safeEducationEchart',
          active:true,

        },
        {
          name:"危险因素",
          path:'dangerFactorEchart',
          active:false,
        },
        {
          name:"危险工程",
          path:'dangerProjectEchart',
          active:false,
        },
        {
          name:"安全考核",
          path:'safeTestEchart',
          active:false,
        },
      ],
    };
  },
  mounted() {
    // this.getRoleList();
    console.log(this.$route.path);
    this.titles.forEach((item,index)=>{
      console.log(item.path);
      if(this.$route.path.indexOf(item.path) !=-1){
        item.active=true;
      }else{
        item.active=false;
      }
    })
  },
  created() {
  },
  methods: {
  goBack() {
        this.$router.push("numAnalysis"); //返回上一页面
      },
      aLink(index){
        this.titles.forEach((item,index)=>{
          item.active=false;
        })
        this.titles[index].active=true;
      },



  }
};
</script>
<style scoped>
.echarts{
  width:100%;
  height:100%;
  background: linear-gradient(to bottom,#1d4c87,#08234f);
}
.header{
  height:100%;
  padding:10px;
}
.header>div{
  height:100%;
  font-size: 16px;
  color:#fff;
  line-height: 40px;
}
.header>div a{
  height:100%;
  font-size: 18px;
  color:#fff;
  line-height: 40px;
  text-decoration: none;
}
.header>div a:hover{
  font-size: 24px;
  color:#daf9ff;
  text-shadow: 1px 1px 2px #11caff, -1px -1px 2px #11caff;
}
.header>div a.active{
  font-size: 24px;
  color:#daf9ff;
  text-shadow: 1px 1px 2px #11caff, -1px -1px 2px #11caff;
}
.el-container{
  color:#fff;
}
</style>
