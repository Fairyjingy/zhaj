
<template>
<!--  审批管理 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" -->
      <el-row>
      <!-- <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button> -->
      <el-button icon="el-icon-delete">批量删除</el-button>
      <el-button  @click="download()">下载</el-button>
    </el-row>
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <!-- <el-form-item label="年份">
        <el-date-picker
      v-model="searchData.budgetYear"
      type="year"
      placeholder="选择年"
      :picker-options="pickerO
      ptions">
    </el-date-picker>
      </el-form-item> -->
      <el-form-item label="编号">
        <el-input v-model="searchData.type"  placeholder="请输入编号" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getRoleList(yearBudgetData)">查询</el-button>
        <el-button plain @click="download()">下载</el-button>
      </el-form-item>
    </el-form>
    								

    <!-- 
    show-summary   -->
    <el-table 
    :max-height="clientHeight"
    :header-cell-style="{background:'#33b35a',color:'#fff'}" 
    fit  
    v-loading="tableLoading"
    :data="yearBudgetData">
      <el-table-column width="240" align="center" header-align="center"  prop="courseId" label="编号"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="time1" label="审批类型"></el-table-column>
      <el-table-column  align="center" header-align="center"  prop="courseName" label="详情"></el-table-column>
      <el-table-column width="200" align="center" header-align="center"  prop="courseMan" label="审批人员"></el-table-column>
      <el-table-column width="200" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  @click="approval(scope.row)" type="text" size="small">审批</el-button>
                
                <!-- <el-button  type="text" @click="editSystem(scope.row,'编辑')" size="small">编辑</el-button> -->
                
                <el-button   type="text" @click="deleteDept(scope.row)" size="small">删除</el-button>

            </template>
        </el-table-column>
    </el-table>  

    <el-drawer
    style="width:50%;margin:80px auto;"
    class="approvalDrawer"
  :title="drawerTitle"
  :visible.sync="drawer"
  :direction="direction"
  size="100%"
  :before-close="handleClose">

  <el-row class="approvalHead" :gutter="20">
    <el-col :span="4" >
      <el-image
        style="width: 50px; height: 50px;border-radius:50%;"
        :src="url"
        :fit="fit"></el-image>
    </el-col>
    <el-col :span="6">
      <h4 style="padding:0;margin:0;line-height:28px;">admin</h4>
      <p style="padding:0;margin:0;">审批通过</p>
    </el-col>
  </el-row>
  <!-- :rules="ruleapproval" -->
  <el-form :model="approvalData"  ref="approvalData" label-width="100px" class="demo-ruleForm">

            <el-form-item  label="审批类型:" prop="time1">
                <el-input v-model="approvalData.time1" :disabled="disabled" placeholder="请输入审批类型" ></el-input>
            </el-form-item>
            <el-form-item  label="详情:" prop="courseName">
                <el-input v-model="approvalData.courseName" :disabled="disabled" placeholder="请输入详情" ></el-input>
            </el-form-item>
            <el-form-item  label="审批人员:" prop="courseMan">
                <el-input v-model="approvalData.courseMan" :disabled="disabled" placeholder="请输入审批人员" ></el-input>
            </el-form-item>

            <!-- <el-form-item  label="负责人所属机构:" prop="deptIdList" v-if="childEditShow">
                <el-cascader :options="deptAll" v-model="approvalData.deptIdList" :disabled="disabled"
                    @change="getIterate(approvalData.deptIdList)" :props="optionProps" clearable
                    placeholder="请选择负责人所属机构" ></el-cascader>
            </el-form-item>
            <el-form-item label="负责人:" prop="leaderId" v-if="childEditShow">
                <el-select v-model="approvalData.leaderId" @change="changeselect" :disabled="disabled" clearable
                    placeholder="请选择负责人">
                    <el-option v-for="item in iterateOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
          
            <el-form-item v-show="!disabled">
                <div style="text-align:center;margin-right:80px">
                <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="submitFormChild('approvalData')">确定</el-button>
                <el-button @click="resetForm('approvalData')">取消</el-button>
            </div>
            </el-form-item>
        </el-form>
        <el-timeline :reverse="reverse" style="margin-top:20px;">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index">
            {{activity.name}}
            <p style="padding:0;margin:0">{{activity.result}}</p>
            <span class="activitytime">{{activity.timestamp}}</span>
          </el-timeline-item>
        </el-timeline>
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
        drawer: false,
        direction: 'ttb',
        // 审批图片
        fit: 'cover',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        approvalData:{
          courseId: "1",
          time1: "病假",
          courseName: "感冒",
          courseMan: "张三",
        },
      
        disabled:false,
        reverse:false,
        activities: [{
          name: '我',
          result:"发起申请",
          timestamp: '2018-04-15'
        }, {
          name: '张凯',
          result:"已同意",
          timestamp: '2018-04-13'
        }, {
          name: '李丽',
          result:"已同意",
          timestamp: '2018-04-11'
        }],
        btnLoading:false,
        drawerTitle:"",

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
      this.disabled=false;
      this.drawerTitle="新增";
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
          courseId: "1",
          time1: "病假",
          courseName: "感冒",
          courseMan: "张三",
        },{
          courseId: "1",
          time1: "病假",
          courseName: "感冒",
          courseMan: "张三",
        }]
      // yearBudgetData(this.searchData).then(data => {
        this. tableLoading=false;

        console.log(dataArr);
        this.yearBudgetData = dataArr;
      // });
    },
    approval(item){
      console.log(item);
      this.drawer=true;
    },
    handleClose(done) {
      done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      }
  }
};
</script>
<style >
  
.el-button--text{
  color:rgb(51, 179, 90);
}
.approvalDrawer .el-drawer__body{
  height:calc(100% -47px);
  overflow: auto;
}
</style>
<style scoped>
.textAlignLeft{
  text-align: left;
}
.approvalHead{
  border-bottom:1px solid #ddd;
  margin-bottom:20px;
}
.demo-ruleForm{
  border-bottom:1px solid #ddd;

}

    .activitytime{
      position: absolute;
      top:0;
      right: 10px;
      color:#909399;
    }
</style>