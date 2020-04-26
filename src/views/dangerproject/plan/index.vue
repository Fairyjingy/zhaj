<template>
<!-- 危险工程监控计划 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" --> 
      <el-row>
    <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">导出word</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="编号">
        <el-input v-model="searchData.courseId" clearable  placeholder="请输入编号" ></el-input>
      </el-form-item>
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
      <el-table-column width="140" align="center" header-align="center"  prop="data1" label="编号"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="data2" label="期间"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="data3" label="备注"></el-table-column>
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
  <el-form :model="addData"  ref="addData" label-width="100px" class="demo-ruleForm">

            <el-form-item  label="编号:" prop="data1">
                <el-input v-model="addData.data1" :disabled="disabled" placeholder="请输入编号" ></el-input>
            </el-form-item>
            <el-form-item  label="期间:" prop="data2">
                <el-input v-model="addData.data2" :disabled="disabled" placeholder="请输入期间" ></el-input>
            </el-form-item>
            <el-form-item  label="备注:" prop="data3">
                <el-input v-model="addData.data3" :disabled="disabled" placeholder="请输入备注" ></el-input>
            </el-form-item>
            <el-form-item v-show="!disabled">
                <div style="text-align:center;margin-right:80px">
                <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitData('addData')">确定</el-button>
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
      direction: 'ttb',
      addData:{
         data1: "",
          data2: "",
          data3: "",
      },
      disabled:false,
      btnLoading:false,
      searchData:{
        data1:""
      },
        multipleSelection: [],
        drawerTitle:"",


      adminDis: false, 
      //表格数据
      tableLoading:false,
      yearBudgetData: [],
      budgetTypeNameArr:[],
      choiseYear:'',
      clientHeight:'',
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
      this.disabled=false;
       this.addData={
         data1: "",
          data2: "",
          data3: "",
      }
      this.drawerTitle="新增";
    },
    handleClose(done) {
          this.drawer = false
          this.drawerDept = false
          this.btnLoading = false
      },

      editData(item,title){
        console.log(item);
        this.disabled = title == "编辑" ? false : true ;
        this.drawerTitle=title ;
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

        resetForm(addDeptData) {
            this.drawer = false
            this.btnLoading = false
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
  //下载excel
     download() {
      const params = qs.stringify(this.searchData)
       
       },
    //搜索
    getRoleList(yearBudgetData) {
      this.getList();
    },

    //获取列表
    getList() {
        console.log(this.searchData);
        this. tableLoading=true
        var dataArr=[{
          data1: "BH54398-001",
          data2: "2019年9月第一周",
          data3: "本工程K2地段为整体两层地下室",
        },{
          data1: "BH54398-001",
          data2: "2019年9月第一周",
          data3: "本工程K2地段为整体两层地下室",
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

