<template>
<!-- 人员管理 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" -->
      <el-row>
      <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">下载</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="班组">
        <el-input v-model="searchData.type"  placeholder="请输入班组" ></el-input>
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
      <el-table-column width="120" align="center" header-align="center"  prop="name" label="人员名称"></el-table-column>
      <el-table-column width="80" align="center" header-align="center"  prop="sex" label="性别"></el-table-column>
      <el-table-column width="80" align="center" header-align="center"  prop="old" label="年龄"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="address" label="籍贯"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="company" label="分包商"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="type" label="班组"></el-table-column>
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

            <el-form-item  label="人员名称:" prop="name">
                <el-input v-model="addData.name" :disabled="disabled" placeholder="请输入人员名称" ></el-input>
            </el-form-item>
            <el-form-item  label="性别:" prop="sex">
                <el-input v-model="addData.sex" :disabled="disabled" placeholder="请输入性别" ></el-input>
            </el-form-item>
            <el-form-item  label="年龄:" prop="old">
                <el-input v-model="addData.old" :disabled="disabled" placeholder="请输入年龄" ></el-input>
            </el-form-item>
            <el-form-item  label="籍贯:" prop="address">
                <el-input v-model="addData.address" :disabled="disabled" placeholder="请输入籍贯" ></el-input>
            </el-form-item>
            <el-form-item  label="分包商:" prop="company">
                <el-input v-model="addData.company" :disabled="disabled" placeholder="分包商" ></el-input>
            </el-form-item>
            <el-form-item  label="班组:" prop="type">
                <el-input v-model="addData.type" :disabled="disabled" placeholder="请输入班组" ></el-input>
            </el-form-item>
            <el-form-item v-show="!disabled">
                <div style="text-align:center;margin-right:80px">
                <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitFormChild('addData')">确定</el-button>
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
      addData:{
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
        multipleSelection: [],
        // 表格数据
      yearBudgetData: [],
        drawerTitle:"",


      //表格数据
      tableLoading:false,
      budgetTypeNameArr:[],
      clientHeight:'',
      searchData: {
          type:"",
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
        this.clientHeight = h - 280;
  },
  methods: {
      addInfo(){
      this.drawer=true;
      this.disabled=false;
      this.addData={
         weekly: "",
          company: "",
          project: "",
          worker: "",
          date: "",
          courseName: "",
          status: "",
          confirm: "",
          dataWay: "",
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
      this.years();
        console.log(this.searchData);
        this. tableLoading=true
        var dataArr=[{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        },{
          name: "孙立荣",
          sex: "男",
          old: "34",
          type: "木工",
          address: "北京市",
          company: "湖北翰章劳务有限公司",
        }]
      // yearBudgetData(this.searchData).then(data => {
        this. tableLoading=false;

        console.log(dataArr);
        this.yearBudgetData = dataArr;
      // });
    },
 //  表头的年份显示
       years(){
          this.one=this.searchData.budgetYear+"年(元)";
          this.two=(Number(this.searchData.budgetYear)+1).toString()+"年(元)";
          this.three=(Number(this.searchData.budgetYear)+2).toString()+"年(元)";
          this.four=(Number(this.searchData.budgetYear)+3).toString()+"年(元)";
          this.five=(Number(this.searchData.budgetYear)+4).toString()+"年(元)";
          this.six=(Number(this.searchData.budgetYear)+5).toString()+"年(元)";
          // console.log(this.one);
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
  }
};
</script>
<style scoped>
.textAlignLeft{
  text-align: left;
}
</style>