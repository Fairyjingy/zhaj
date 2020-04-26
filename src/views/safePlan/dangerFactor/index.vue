<template>
<!-- 危险因素清单 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" -->
      <el-row>
    <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">导出</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="检查项归类">
        <el-input v-model="searchData.type"  placeholder="请输入检查项归类" ></el-input>
      </el-form-item>
      <el-form-item label="危险因素">
        <el-input v-model="searchData.time1"  placeholder="请输入危险因素" ></el-input>
      </el-form-item>
      <!-- <el-form-item label="年份">
        <el-date-picker
      v-model="searchData.budgetYear"
      type="year"
      placeholder="选择年"
      :picker-options="pickerOptions">
    </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="success" @click="getRoleList(yearBudgetData)">查询</el-button>
      </el-form-item>
    </el-form>
    								

    <!-- 
    show-summary   -->
    <el-table 
    :max-height="clientHeight"
    :header-cell-style="{background:'#33b35a',color:'#fff'}" 
    fit  
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    :data="yearBudgetData"> 
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column width="240" align="center" header-align="center"  prop="courseId" label="作业活动"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="time1" label="危险因素"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="courseName" label="可能导致的事故"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="courseMan" label="风险级别"></el-table-column>
      <el-table-column width="400" align="center" header-align="center"  prop="time2" label="控制措施"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="address" label="涉及相关方"></el-table-column>
      <el-table-column width="160" align="center" header-align="center"  prop="count" label="所属施工阶段"></el-table-column>
      <el-table-column width="160" align="center" header-align="center"  prop="type" label="检查项归类"></el-table-column>
      <el-table-column width="200" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  type="text" @click="editData(scope.row,'编辑')" size="small">编辑</el-button>
                <el-button  type="text" @click="editData(scope.row,'详情')" size="small">详情</el-button>
                <el-button   type="text" @click="deleteData(scope.row)" size="small">删除</el-button>

            </template>
        </el-table-column>
    </el-table>   
    <el-drawer
    style="width:50%;margin:80px auto;"
    class="safeSkillDrawer"
  :title="drawerTitle"
  :visible.sync="drawer"
  :direction="direction"
  size="100%"
  :before-close="handleClose">

  <!-- :rules="ruleapproval" -->
  <el-form :model="addData"  ref="addData" label-width="120px" class="demo-ruleForm">

            <el-form-item  label="作业活动:" prop="courseId">
                <el-input v-model="addData.courseId" :disabled="disabled" placeholder="请输入作业活动" ></el-input>
            </el-form-item>
            <el-form-item  label="危险因素:" prop="time1">
                <el-input v-model="addData.time1" :disabled="disabled" placeholder="请输入危险因素" ></el-input>
            </el-form-item>
            <el-form-item  label="可能导致的事故:" prop="courseName">
                <el-input v-model="addData.courseName" :disabled="disabled" placeholder="请输入可能导致的事故" ></el-input>
            </el-form-item>
            <el-form-item  label="风险级别:" prop="courseMan">
                <el-input v-model="addData.courseMan" :disabled="disabled" placeholder="请输入风险级别" ></el-input>
            </el-form-item>
            <el-form-item  label="控制措施:" prop="time2">
                <el-input v-model="addData.time2" :disabled="disabled" placeholder="控制措施" ></el-input>
            </el-form-item>
            <el-form-item  label="涉及相关方:" prop="address">
                <el-input v-model="addData.address" :disabled="disabled" placeholder="请输入涉及相关方" ></el-input>
            </el-form-item>
            <el-form-item  label="所属施工阶段:" prop="count">
                <el-input v-model="addData.count" :disabled="disabled" placeholder="请输入所属施工阶段" ></el-input>
            </el-form-item>
            <el-form-item  label="检查项归类:" prop="type">
                <el-input v-model="addData.type" :disabled="disabled" placeholder="请输入检查项归类" ></el-input>
            </el-form-item>
            <el-form-item v-show="!disabled">
                <div style="text-align:center;margin-right:80px">
                <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitData('addData')">确定</el-button>
                <el-button @click="resetForm('addData')">取消</el-button>
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
      direction: 'ttb',
      drawerTitle:"",
      addData:{
         courseId: "",
          time1: "",
          courseName: "",
          courseMan: "",//风险级别
          time2: "",//控制措施
          address: "",//涉及相关方
          count: "",//所属施工阶段
          type: "",//检查项归类
      },
      disabled:false,
      btnLoading:false,
        multipleSelection: [],

      adminDis: false, 
      //表格数据
      tableLoading:false,
      yearBudgetData: [],
      budgetTypeNameArr:[],
      choiseYear:'',
      clientHeight:'',
      searchData: {
          type:"",//检查项归类
          time1:"",//危险因素
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
      this.disabled-false;
        this.addData={
         courseId: "",
          time1: "",
          courseName: "",
          courseMan: "",//风险级别
          time2: "",//控制措施
          address: "",//涉及相关方
          count: "",//所属施工阶段
          type: "",//检查项归类
      },
        this.drawerTitle="新增清单";
    }, 
    handleClose(done) {
          this.drawer = false
          this.drawerDept = false
          this.btnLoading = false
      },
      editData(item,title){
        console.log(item);
        this.disabled = title == "编辑" ? false : true ;
        this.drawerTitle=title == "编辑"?title+"清单":"清单"+title ;
        this.drawer=true;
        this.addData=item;
      },
      deleteData(item){
        this.$confirm('确定删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
       handleSelectionChange(val) {
         console.log(val)
        this.multipleSelection = val;
      },
      deleteDatas(){
        console.log(this.multipleSelection)
        if(this.multipleSelection.length<1){
           this.$alert('您还未选中任何数据', '删除数据', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
        }else{
           this.$confirm('确定删除当前选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
         
      },
      submitData(str){
            this.drawer = false
            this.btnLoading = false
        this.$message({
            type: 'success',
            message: '提交成功!'
          });
      },
        resetForm(addDeptData) {
            this.drawer = false
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
          courseId: "基坑支护",
          time1: "天气变化未采取预防措施",
          courseName: "坍塌",
          courseMan: "3",
          time2: "制定运行控制计划",
          address: "现场人员、劳务人员",
          count: "基础阶段",
          type: "基坑工程",
        },{
          courseId: "基坑支护",
          time1: "天气变化未采取预防措施",
          courseName: "坍塌",
          courseMan: "3",
          time2: "制定运行控制计划",
          address: "现场人员、劳务人员",
          count: "基础阶段",
          type: "基坑工程",
        }]
      // yearBudgetData(this.searchData).then(data => {
        this. tableLoading=false;

        console.log(dataArr);
        this.yearBudgetData = dataArr;
      // });
    },
  }
};
</script>
<style scoped>
.textAlignLeft{
  text-align: left;
}
</style>