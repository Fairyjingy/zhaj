<template>
<!-- 危险工程监控计划 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" --> 
      <el-row>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
    <el-form-item label="开始日期">
      <el-date-picker
      v-model="startDate"
      type="date" style="width:140px;"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="结束日期">
      <el-date-picker
      v-model="endDate"
      type="date" style="width:140px;"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
      <el-form-item label="考核类型">
         <el-select v-model="valueT" style="width:150px;" placeholder="请选择考核类型">
          <el-option
            v-for="item in optionsT"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考核主题">
        <el-input v-model="searchData.courseId" clearable  placeholder="请输入考核主题" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getRoleList(yearBudgetData)">查询</el-button>
        <el-button icon="el-icon-plus" @click="addInfo()">新增考核</el-button>
      </el-form-item>
    </el-form>
                    

    <!-- 
    show-summary   -->
    <el-table 
    :max-height="clientHeight"
    :header-cell-style="{background:'#3c8dbc',color:'#fff'}" 
    fit  
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    :data="yearBudgetData">
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
      <el-table-column width="80" align="center" header-align="center"  prop="line1" label="序号"></el-table-column>
      <el-table-column width="80" align="center" header-align="center"  prop="line2" label="考核主题"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line3" label="考核类型"></el-table-column>
      <el-table-column width="420" align="center"  header-align="center"  prop="line4" label="题量"></el-table-column>
      <el-table-column width="100" align="center" header-align="center"  prop="line5" label="考试时长"></el-table-column>
      <el-table-column width="220" align="center" header-align="center"  prop="line6" label="计划考核开始结束时间"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line7" label="计划考核人数">
        <template slot-scope="scope">
          <el-button  type="text" @click="editData(scope.row,'编辑')" size="small">{{scope.row.line7}}</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line8" label="出现事故次数"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line8" label="出现事故次数"></el-table-column>
      <el-table-column width="200" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  type="text" @click="editData(scope.row,'编辑')" size="small">编辑</el-button>
                <el-button   type="text" @click="deleteData(scope.row)" size="small">禁用</el-button>

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

            <el-form-item width="50"  label="编号:" prop="data1">
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
      startDate:"",
      endDate:"",
        optionsT: [{
          value: '选项1',
          label: '单选题'
        }, {
          value: '选项2',
          label: '多选题'
        }, {
          value: '选项3',
          label: '简答题'
        }, {
          value: '选项4',
          label: '填空题'
        }],
        valueT: '',


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
        this.$confirm('确定禁用这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
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
          line1: "1",
          line2: "选择题",
          line3: "安全规范",
          line4: "电气化区段平交通口架与线路钢轨外侧的距离不得少于（    ）米？\nA：10    B：11    C：12     D：13",
          line5: "B",
          line6: "2020-01-02",
          line7: "王伟健",
          line8: "2",
        },{
          line1: "2",
          line2: "选择题",
          line3: "安全生产",
          line4: "电气化区段平交通口架与线路钢轨内侧的距离不得多于（    ）米？  \nA：10    B：11    C：12     D：13",
          line5: "B",
          line6: "2020-01-02",
          line7: "王伟健",
          line8: "2",
        },{
          line1: "3",
          line2: "选择题",
          line3: "安全生产",
          line4: "按照公司规章制度，新员工入职后需要在（     ）个工作日内提交全部的入职资料？  \nA：10    B：11    C：12     D：13",
          line5: "B",
          line6: "2020-01-02",
          line7: "王伟健",
          line8: "2",
        },]
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
.demo-ruleForm .el-form-item{
  float: left;
  width:50%;
}
.demo-ruleForm .el-form-item:last-child{
  float: left;
  width:100%;
}
</style>

