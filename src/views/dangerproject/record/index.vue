<template>
<!-- 危险工程监控计划 -->
  <div>

    
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="value1"
          type="date" style="width:140px;"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="value1"
          type="date" style="width:140px;"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考核类型">
         <el-select v-model="valueT" placeholder="请选择考核类型">
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
        <!-- <el-button  @click="download()">试题导入</el-button> -->
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
      <el-table-column width="240" align="center" header-align="center"  prop="line2" label="考核主题"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line3" label="考核类型"></el-table-column>
      <el-table-column width="80" align="center"  header-align="center"  prop="line4" label="题量"></el-table-column>
      <el-table-column width="100" align="center" header-align="center"  prop="line5" label="考试时长"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="line6" label="计划考核开始结束时间"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line7" label="计划考核人数">
        <template slot-scope="scope">
          <el-button type="text" @click="drawer1 = true">{{scope.row.line7}}</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line8" label="已参与考核人数"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line9" label="考核平均分"></el-table-column>
      <el-table-column width="120" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  type="text" @click="editData(scope.row,'编辑')" size="small">编辑</el-button>
                <el-button   type="text" @click="deleteData(scope.row)" size="small">禁用</el-button>

            </template>
        </el-table-column>
    </el-table>   

     <el-drawer
      style="width:70%;margin:80px auto;"
      class="safeSkillDrawer"
      :title="drawerTitle"
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
      :before-close="handleClose">

      <!-- :rules="ruleapproval" -->
      <el-form :model="addData"  ref="addData" label-width="100px" class="formD demo-ruleForm">

                <el-form-item width="50"  label="考核主题:" class="w100" prop="line1">
                    <el-input v-model="addData.line1" :disabled="disabled" placeholder="请输入考核主题" ></el-input>
                </el-form-item>
                <el-form-item width="50"  label="考核类型:" prop="line2">
                    <el-input v-model="addData.line2" :disabled="disabled" placeholder="请输入考核类型" ></el-input>
                </el-form-item>
                <el-form-item width="150" label-width="140px"   label="考核开始结束时间:" prop="line3">
                    <el-date-picker
                      v-model="addData.line3"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item width="50"  label="考核人员:" prop="data1">
                    <el-input v-model="addData.line4" :disabled="disabled" placeholder="请输入考核人员" ></el-input>
                </el-form-item>
                <el-form-item width="50"  label="培训计划:" prop="data1">
                    <el-input v-model="addData.line5" :disabled="disabled" placeholder="请输入培训计划" ></el-input>
                </el-form-item>
                <el-form-item  label="期间:" class="w100" prop="data2" style="text-align:right;">
                  <el-button text-align="right" type="primary" style="margin-bottom:20px;" @click="resetForm('approvalData')">考题导入</el-button>
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="编号"
                          width="80">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="试题内容"
                          width="480">
                          <template slot-scope="scope">
                            <p>电气化区段平交通口架与线路钢轨外侧的距离不得少于（    ）米？</p>
                            <el-radio-group v-model="scope.row.radio">
                              <el-radio :label="3">A:10</el-radio>
                              <el-radio :label="6">B:11</el-radio>
                              <el-radio :label="9">C:12</el-radio>
                              <el-radio :label="10">D:13</el-radio>
                            </el-radio-group>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="address" width="180"
                          label="分值">
                          <template slot-scope="scope">
                            <el-input placeholder="请输入" v-model="scope.row.address">
                                <template slot="append">分</template>
                              </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" header-align="center" align="center">
                          <template slot-scope="scope">
                              <el-button  type="text" v-if="scope.row.date!=='1'" @click="editData(scope.row,'编辑')" size="small">下移</el-button>
                              <el-button  type="text" v-if="scope.row.date!=='4'" @click="editData(scope.row,'编辑')" size="small">上移</el-button>
                              <el-button   type="text" @click="deleteData(scope.row)" size="small">删除</el-button>

                          </template>
                      </el-table-column>
                      </el-table>
                </el-form-item>
                <el-form-item v-show="!disabled">
                    <div style="text-align:center;margin-right:80px">
                    <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitData('addData')">确定</el-button>
                    <el-button @click="resetForm('approvalData')">取消</el-button>
                </div>
                </el-form-item>
            </el-form>
    </el-drawer> 
    <el-drawer
      title="人员考核结果" class="result"
      :visible.sync="drawer1"
      style="width:calc(100% - 270px);margin-top:80px;margin-left:250px;height:calc(100% - 100px);"
      :direction="direction"
      :before-close="handleClose">
      <el-form
        inline
        label-position="left"
        style="margin-top: 2vh"
        >
        <el-form-item label="人员信息">
          <el-input v-model="searchData.courseId" clearable  placeholder="姓名或手机号" ></el-input>
        </el-form-item>
        <el-form-item label="是否参与考核">
          <el-select v-model="valueJ" placeholder="请选择是否参与考核">
            <el-option
              v-for="item in optionsJ"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getRoleList(yearBudgetData)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table 
    :max-height="clientHeight"
    :header-cell-style="{background:'#3c8dbc',color:'#fff'}" 
    fit  
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    :data="testData">
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
      <el-table-column width="80" align="center" header-align="center"  prop="line1" label="编号"></el-table-column>
      <el-table-column width="140" align="center" header-align="center"  prop="line2" label="人员姓名"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line3" label="手机号码"></el-table-column>
      <el-table-column width="120" align="center"  header-align="center"  prop="line4" label="部门"></el-table-column>
      <el-table-column width="140" align="center" header-align="center"  prop="line5" label="是否参加考核"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="line6" label="考核起止时间"></el-table-column>
      <el-table-column width="120" align="center" header-align="center"  prop="line7" label="得分"></el-table-column>
    </el-table>  
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

        optionsC: [{
            value: '选项1',
            label: '安全教育'
          }, {
            value: '选项2',
            label: '安全生产'
          }, {
            value: '选项3',
            label: '规章制度'
          }],
        valueC: '',
        optionsJ: [{
            value: '选项1',
            label: '是'
          }, {
            value: '选项2',
            label: '否'
          }],
        valuJ: '',
        tableData: [{
          date: '1',
          name: '王小虎',
          radio:"",
          address: '1'
          }, {
          date: '2',
          name: '王小虎',
          address: '2'
          }, {
          date: '3',
          name: '王小虎',
          address: '5'
          }, {
          date: '4',
          name: '王小虎',
          address: '5'
        }],
        dates:"",

        drawer:false,
        drawer1:false,
      direction: 'ttb',
      addData:{
          index:1,
          line1: "2020年01月份安全生产全体员工培训考核试题",
          line2: "安全生产",
          line3: [new Date(),new Date()],
          line4: "矿工",
          line5: "安全生产无小事，人人有责",
          line6: "2020-01-02",
          line7: "王伟健",
          line8: "2",
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
      testData:[
        {
          line1:"1",
          line2:"李伟健",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"2",
          line2:"孙娜娜",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"3",
          line2:"赵涛",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"4",
          line2:"张丽丽",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"5",
          line2:"龚伟涛",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"6",
          line2:"刘建林",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
        {
          line1:"7",
          line2:"赵倩",
          line3:"18632107171",
          line4:"工程部一部",
          line5:"是",
          line6:"2020-02-12 12:20 ～ 2020-02-12 14:00",
          line7:"120",
        },
      ],
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
         
      }
      this.drawerTitle="新增";
    },
    handleClose(done) {
          this.drawer = false
          this.drawer1 = false
          this.drawerDept = false
          this.btnLoading = false
      },

      editData(item,title){
        console.log(item);
        this.disabled = title == "编辑" ? false : true ;
        this.drawerTitle=title ;
        this.drawer=true;
        // this.addData=item;
      },
      list(item){
        console.log(item);
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
          line2: "2020年01月份安全生产全体员工培训考核试题",
          line3: "安全生产",
          line4: "120",
          line5: "150分钟",
          line6: "2020-01-12 13:00—2020-01-12 15:30",
          line7: "128",
          line8: "120",
          line9: "123",
        },{
          line1: "1",
          line2: "2020年01月份规章制度培训公司全体员工培训考核试题",
          line3: "规章制度",
          line4: "120",
          line5: "150分钟",
          line6: "2020-01-12 13:00—2020-01-12 15:30",
          line7: "128",
          line8: "120",
          line9: "123",
        },{
          line1: "1",
          line2: "2019年12月份新入职员工培训考核试题",
          line3: "新员工入职考核",
          line4: "120",
          line5: "150分钟",
          line6: "2020-01-12 13:00—2020-01-12 15:30",
          line7: "128",
          line8: "120",
          line9: "123",
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
<style>
.textAlignLeft{
  text-align: left;
}
.demo-ruleForm.formD .el-form-item{
  float: left;
  width:50%;
}
.demo-ruleForm.formD .el-form-item:last-child{
  float: left;
  width:100%;
}
.demo-ruleForm.formD .el-form-item.w100{
  float: left;
  width:100%;
}
.result .el-drawer__open .el-drawer.ttb{
  height:100%!important;
}
</style>

