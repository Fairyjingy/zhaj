<template>
<!-- 危险因素清单 -->
  <div>

      <!-- ref="formInline"
      :model="formInline" -->
      <!-- <el-row>
    <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">导出</el-button>
    </el-row> -->
    <el-form
      inline
      label-position="left"
      style="margin-top: 2vh"
    >
      <el-form-item label="培训资料名称">
        <el-input v-model="searchData.type"  placeholder="请输入培训资料名称" ></el-input>
      </el-form-item>
      <el-form-item label="培训资料类型">
         <el-select v-model="value" placeholder="请选择培训资料类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训资料类别">
         <el-select v-model="value2" placeholder="请选择培训资料类别">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList(yearBudgetData)">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" icon="el-icon-plus" @click="addInfo()">新增资料信息</el-button>
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
      <el-table-column align="center" header-align="center"  prop="line1" label="序号"></el-table-column>
      <el-table-column align="center" header-align="center"  prop="line2" label="资料类型"></el-table-column>
      <el-table-column align="center" header-align="center"  prop="line3" label="资料类别"></el-table-column>
      <el-table-column align="center"  header-align="center" width="250"  label="资料名称">
         <template slot-scope="scope">
           <div @click="editData(scope.row,'详情')" style="cursor: pointer">
                {{scope.row.line4}}
           </div>
            </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" width="350" prop="line5" label="资料内容"></el-table-column>
      <el-table-column align="center" header-align="center"  prop="line6" label="阅读人群"></el-table-column>
      <el-table-column align="center" header-align="center"  prop="line7" label="上传时间"></el-table-column>
      <el-table-column align="center" header-align="center"  prop="line8" label="上传人员"></el-table-column>
      <el-table-column width="200" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button  type="text" @click="editData(scope.row,'编辑')" size="small">编辑</el-button>
                <el-button   type="text" @click="deleteData(scope.row)" size="small">删除</el-button>
                <el-button  type="text" @click="editData(scope.row,'详情')" size="small">禁用</el-button>

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
      <el-form :model="addData"  ref="addData"  label-width="auto" class="demo-ruleForm">
                <el-form-item  label="资料类型:" prop="courseId" class="floats" required>
                       <el-select v-model="addData.a1" :disabled="disabled" style="width:100%" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="资料类别:" prop="time1" class="floats" required>
                         <el-select v-model="addData.a2" :disabled="disabled" style="width:100%" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="资料名称:" prop="courseName" required>
                    <el-input v-model="addData.a3" :disabled="disabled" style="width:44%" placeholder="请输入性别" ></el-input>
                </el-form-item>
                <el-form-item  label="资料内容:" prop="courseMan" required>
                    <el-input v-model="addData.a4"   type="textarea" :rows="10" :disabled="disabled" placeholder="请输入员工年龄" ></el-input>
                </el-form-item>
                <el-form-item  label="阅读人群:" prop="time2" class="floats" required>
                        <el-select v-model="addData.a5" :disabled="disabled" style="width:100%" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="培训计划:" prop="address" class="floats">
                       <el-select v-model="addData.a6" :disabled="disabled" style="width:100%" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="音频视频:" prop="type" class="floats">
                  <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <div style="height:300px"></div>
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
        imageUrl: '',
        options: [{
          value: '选项1',
          label: '文档'
        }, {
          value: '选项2',
          label: '文章'
        }, {
          value: '选项3',
          label: '视频'
        }, {
          value: '选项4',
          label: '音频'
        }],
        options1:[
          {
          value: '选项1',
          label: '规章制度'
        }, {
          value: '选项2',
          label: '安全生产'
        }, {
          value: '选项3',
          label: '安全事故'
        }, {
          value: '选项4',
          label: '经典案例分享'
        }, {
          value: '选项5',
          label: '新员工培训'
        }, {
          value: '选项6',
          label: '日常资料'
        }
        ],
        value: '',
        value2: '',

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
        this.drawerTitle=title == "编辑"?"培训资料"+title:"培训资料"+title ;
        this.drawer=true;
        this.addData=item;
        if(title == "编辑"){
          this.addData = {
            a1:"文章",
            a2:"安全生产",
            a3:"井内作业时出现火灾应该措施",
            a4:"在井内作业时，市场内碰到各种各样的突发情况，常见的突发情况包括火灾、井内缺氧、滑体……",
            a5:"全体人员",
            a6:"请选择培训计划",
          }
        }
        if(title == "详情"){
          this.disabled = true;
          this.addData = {
            a1:"文章",
            a2:"安全生产",
            a3:"井内作业时出现火灾应该措施",
            a4:"在井内作业时，市场内碰到各种各样的突发情况，常见的突发情况包括火灾、井内缺氧、滑体……",
            a5:"全体人员",
            a6:"请选择培训计划",
          }
        }
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
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //获取列表
    getList() {
        console.log(this.searchData);
        this. tableLoading=true
        var dataArr=[{
          line1: "1",
          line2: "文章",
          line3: "经验案例分享",
          line4: "井内作业时出现火灾应该措施",
          line5: "在井内作业时，市场内碰到各种各样的突发情况，常见的突发情况包括火灾、井内缺氧、滑体……",
          line6: "全体人员",
          line7: "2020-01-10 12:32",
          line8: "王建伟",
        },{
          line1: "2",
          line2: "视频",
          line3: "规章制度",
          line4: "安全生产规章制度",
          line5: "矿区安全生成是一个至关重要的话题，生产过程中的规范是安全生产的一个重要因素，针对……",
          line6: "全体人员",
          line7: "2020-01-10 12:32",
          line8: "王建伟",
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
<style >
.textAlignLeft{
  text-align: left;
}
.floats{
width:48%;
float:left;
margin-left: 10px;
}  
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>