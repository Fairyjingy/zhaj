<template>
<!-- 安全技术管理 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" -->
      <el-row>
      <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete">批量删除</el-button>
      <el-button  @click="download()">下载</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="年份">
        <el-date-picker
      v-model="searchData.budgetYear"
      type="year"
      placeholder="选择年"
      :picker-options="pickerOptions">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getRoleList(yearBudgetData)">查询</el-button>
        
      </el-form-item>
    </el-form>
    								

    <!-- 
    show-summary   -->
    <el-table 
    :max-height="clientHeight"
    :header-cell-style="{background:'#3c8dbc',color:'#fff'}" 
    fit  
    v-loading="tableLoading"
    :data="yearBudgetData"> 
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column width="140" align="center" header-align="center"  prop="weekly" label="期间"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="company" label="施工单位"></el-table-column>
      <el-table-column width="180" align="center" header-align="center"  prop="project" label="分部分项工程"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="worker" label="工种"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="date" label="日期"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="courseName" label="交底人"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="status" label="状态"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="confirm" label="确认完成情况"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="dataWay" label="数据来源"></el-table-column>
      <el-table-column width="200" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  type="text" @click="editSystem(scope.row,'编辑')" size="small">编辑</el-button>
                <el-button  type="text" @click="editSystem(scope.row,'详情')" size="small">详情</el-button>
                <el-button   type="text" @click="deleteDept(scope.row)" size="small">删除</el-button>

            </template>
        </el-table-column>
    </el-table>  

    <el-drawer
    style="width:50%;margin:80px auto;"
    class="safeSkillDrawer"
  title="审批"
  :visible.sync="drawer"
  :direction="direction"
  size="100%"
  :before-close="handleClose">

  <!-- :rules="ruleapproval" -->
  <el-form :model="addsafeSkillData"  ref="addsafeSkillData" label-width="100px" class="demo-ruleForm">

            <el-form-item  label="期间:" prop="weekly">
                <el-input v-model="addsafeSkillData.weekly" :disabled="true" placeholder="请输入期间" ></el-input>
            </el-form-item>
            <el-form-item  label="施工单位:" prop="company">
                <el-input v-model="addsafeSkillData.company" :disabled="true" placeholder="请输入施工单位" ></el-input>
            </el-form-item>
            <el-form-item  label="分部分项工程:" prop="project">
                <el-input v-model="addsafeSkillData.project" :disabled="true" placeholder="请输入分部分项工程" ></el-input>
            </el-form-item>
            <el-form-item  label="工种:" prop="worker">
                <el-input v-model="addsafeSkillData.worker" :disabled="true" placeholder="请输入工种" ></el-input>
            </el-form-item>
            <el-form-item  label="日期:" prop="date">
                <el-input v-model="addsafeSkillData.date" :disabled="disabled" placeholder="日期" ></el-input>
            </el-form-item>
            <el-form-item  label="交底人:" prop="courseName">
                <el-input v-model="addsafeSkillData.courseName" :disabled="disabled" placeholder="请输入交底人" ></el-input>
            </el-form-item>
            <el-form-item  label="状态:" prop="status">
                <el-input v-model="addsafeSkillData.status" :disabled="true" placeholder="请输入状态" ></el-input>
            </el-form-item>
            <el-form-item  label="确认完成情况:" prop="confirm">
                <el-input v-model="addsafeSkillData.confirm" :disabled="disabled" placeholder="请输入确认完成情况" ></el-input>
            </el-form-item>
            <el-form-item  label="数据来源:" prop="dataWay">
                <el-input v-model="addsafeSkillData.dataWay" :disabled="disabled" placeholder="请输入数据来源" ></el-input>
            </el-form-item>
            <el-form-item v-show="!disabled">
                <div style="text-align:center;margin-right:80px">
                <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitFormChild('approvalData')">确定</el-button>
                <el-button @click="resetForm('approvalData')">取消</el-button>
            </div>
            </el-form-item>
        </el-form>
</el-drawer>  
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
      drawer:false,
      addsafeSkillData:{
         weekly: "",
          company: "",
          project: "",
          worker: "",
          date: "",
          courseName: "",
          status: "",
          confirm: "",
          dataWay: "",
      },
      disabled:false,
      btnLoading:false,
      direction: 'ttb',


      adminDis: false, 
      //表格数据
      tableLoading:false,
      yearBudgetData: [],
      budgetTypeNameArr:[],
      choiseYear:'',
      clientHeight:'',
      searchData: {
          budgetYear:formatDate2(new Date(),'yyyy'),
      }, 
      pickerOptions: {
          disabledDate: (time) => {
          
            var a = formatDate2(new Date(time.getTime()),'yyyy')
            return a < 2018
          }
        },
    };
  },
  mounted() {
    // this.getRoleList();

  },
  created() {
    console.log(this.two);
     this.getList();
         var h=document.documentElement.clientHeight;
         console.log("h",h)
        this.clientHeight = h - 260;
  },
  methods: {
    addInfo(){
      this.drawer=true;
    },
    handleClose(done) {
          this.drawer = false
          this.drawerDept = false
          this.btnLoading = false
      },
  //下载excel
     download() {
       this.dateFun();
      const params = qs.stringify(this.searchData)
       
       },
    //搜索
    getRoleList(yearBudgetData) {
       this.dateFun()
      this.getList();
    },

    //获取列表
    getList() {
        console.log(this.searchData);
        this. tableLoading=true
        var dataArr=[{
          weekly: "2020年1月第1周",
          company: "融建",
          project: "钢筋工程",
          worker: "钢筋工",
          date: "2020-1-14",
          courseName: "吴华容",
          status: "已确认",
          confirm: "已完成",
          dataWay: "pc端",
        },{
          weekly: "2020年1月第2周",
          company: "融建",
          project: "钢筋工程",
          worker: "钢筋工",
          date: "2020-1-14",
          courseName: "吴华容",
          status: "已确认",
          confirm: "已完成",
          dataWay: "pc端",
        }]
      // yearBudgetData(this.searchData).then(data => {
        this. tableLoading=false;

        console.log(dataArr);
        this.yearBudgetData = dataArr;
      // });
    },

    dateFun(){
       if(this.searchData.budgetYear ==null){
        this.searchData.budgetYear = formatDate2(new Date(),'yyyy');
      }else if(typeof(this.searchData.budgetYear) == "string"){
          // this.searchData.budgetYear=this.searchData.budgetYear;
        }else if(this.searchData.budgetYear !== formatDate2(new Date(),'yyyy')){
        console.log("this.searchData.budgetYear");
        console.log(this.searchData.budgetYear);
       
        this.searchData.budgetYear=formatDate2(this.searchData.budgetYear,'yyyy');
      } 
    },
    editSystem(item){
      console.log(item);
    }
  }
};
</script>
<style >
  
.el-button--text{
  color:rgb(51, 179, 90);
}
</style>
<style scoped>
.textAlignLeft{
  text-align: left;
}
</style>