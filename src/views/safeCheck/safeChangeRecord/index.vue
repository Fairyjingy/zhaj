<template>
<!-- 安全整改记录 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" --> 
      <el-row>
    <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">导出word</el-button>
      <el-button  @click="download()">导出excel</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="是否发整改">
        <el-input v-model="searchData.data1" clearable  placeholder="请输入编号" ></el-input>
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
      <el-table-column width="180" align="center" header-align="center"  prop="data1" label="危害因素"></el-table-column>
      <el-table-column width="100" align="center" header-align="center"  prop="data2" label="检查项归类"></el-table-column>
      <el-table-column width="180" align="center" header-align="center"  prop="data3" label="问题描述"></el-table-column>
      <el-table-column width="100" align="center" header-align="center"  prop="data4" label="是否发整改"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="data5" label="要求完成时间"></el-table-column>
      <el-table-column width="180" align="center" header-align="center"  prop="data6" label="处置措施"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="data7" label="整改责任人"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="data8" label="整改是否完成"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="data9" label="未完成整改原因"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="data10" label="复查完成情况"></el-table-column>
      <el-table-column width="100" align="center" header-align="center"  prop="data11" label="数据来源"></el-table-column>
      <el-table-column  width="200" label="操作" header-align="center" align="center">
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

            <el-form-item  label="危害因素:" prop="data1">
                <el-input v-model="addData.data1" :disabled="disabled" placeholder="请输入危害因素" ></el-input>
            </el-form-item>
            <el-form-item  label="检查项归类:" prop="data2">
                <el-input v-model="addData.data2" :disabled="disabled" placeholder="请输入检查项归类" ></el-input>
            </el-form-item>
            <el-form-item  label="问题描述:" prop="data3">
                <el-input v-model="addData.data3" :disabled="disabled" placeholder="请输入问题描述" ></el-input>
            </el-form-item>
            <el-form-item  label="是否发整改:" prop="data4">
                <el-input v-model="addData.data4" :disabled="disabled" placeholder="请输入是否发整改" ></el-input>
            </el-form-item>
            <el-form-item  label="要求完成时间:" prop="data5">
                <el-input v-model="addData.data5" :disabled="disabled" placeholder="要求完成时间" ></el-input>
            </el-form-item>
            <el-form-item  label="处置措施:" prop="data6">
                <el-input v-model="addData.data6" :disabled="disabled" placeholder="请输入处置措施" ></el-input>
            </el-form-item>
            <el-form-item  label="整改责任人:" prop="data7">
                <el-input v-model="addData.data7" :disabled="disabled" placeholder="请输入整改责任人" ></el-input>
            </el-form-item>
            <el-form-item  label="整改是否完成:" prop="data8">
                <el-input v-model="addData.data8" :disabled="disabled" placeholder="请输入整改是否完成" ></el-input>
            </el-form-item>
            <el-form-item  label="未完成整改原因:" prop="data9">
                <el-input v-model="addData.data9" :disabled="disabled" placeholder="未完成整改原因" ></el-input>
            </el-form-item>
            <el-form-item  label="复查完成情况:" prop="data10">
                <el-input v-model="addData.data10" :disabled="disabled" placeholder="请输入复查完成情况" ></el-input>
            </el-form-item>
            <el-form-item  label="数据来源:" prop="data11">
                <el-input v-model="addData.data11" :disabled="disabled" placeholder="请输入数据来源" ></el-input>
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
          data4: "",
          data5: "",
          data6: "",
          data7: "",
          data8: "",
          data9: "",
          data10: "",
          data11: "",
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
          data4: "",
          data5: "",
          data6: "",
          data7: "",
          data8: "",
          data9: "",
          data10: "",
          data11: "",
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
          data1: "临边防护设施",
          data2: "高处作业",
          data3: "4#楼东南角后...",
          data4: "是",
          data5: "2019-9-7",
          data6: "责任工长组织",
          data7: "冯嘉韵",
          data8: "否",
          data9: "",
          data10: "是",
          data11: "移动端",
        },{
          data1: "临边防护设施",
          data2: "高处作业",
          data3: "4#楼东南角后...",
          data4: "是",
          data5: "2019-9-7",
          data6: "责任工长组织",
          data7: "冯嘉韵",
          data8: "否",
          data9: "",
          data10: "是",
          data11: "移动端",
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
