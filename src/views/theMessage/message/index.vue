<template>
  <!-- 危险因素清单 -->
  <div>
    <!-- ref="formInline"
    :model="formInline"-->
    <!-- <el-row>
    <el-button icon="el-icon-plus" @click="addInfo()">新增</el-button>
      <el-button icon="el-icon-delete" @click="deleteDatas">批量删除</el-button>
      <el-button  @click="download()">导出</el-button>
    </el-row>-->
    <el-form inline label-position="left" style="margin-top: 2vh">
      <el-form-item>
        <el-date-picker v-model="searchData.type" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名">
        <el-date-picker v-model="searchData.time1" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="消息类型">
        <el-select v-model="value" placeholder="请选择消息类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList(yearBudgetData)">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button icon="el-icon-plus" type="primary" @click="addInfo()">发送消息</el-button>
      </el-form-item>
    </el-form>

    <!-- 
    show-summary-->
    <el-table
      :max-height="clientHeight"
      :header-cell-style="{background:'#3c8dbc',color:'#fff'}"
      fit
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      :data="yearBudgetData"
    >
      <el-table-column align="center" header-align="center" prop="line1" label="编号"></el-table-column>
      <el-table-column align="center" header-align="center" prop="line2" label="消息类型"></el-table-column>
      <el-table-column align="center" header-align="center" prop="line3" label="消息发送形式"></el-table-column>
      <el-table-column align="center" header-align="center" prop="line4" label="接收人员数"></el-table-column>
      <el-table-column align="center" width="800" header-align="center" prop="line5" label="发送内容"></el-table-column>
      <el-table-column align="center" header-align="center" prop="line6" label="发送时间"></el-table-column>
      <!-- <el-table-column width="200" label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editData(scope.row,'编辑')" size="small">编辑</el-button>
          <el-button type="text" @click="deleteData(scope.row)" size="small">启用计划</el-button>
        </template>
      </el-table-column> -->
    </el-table>
                <el-pagination style="margin-top: 10px;margin-bottom: 10px;" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" :current-page="current" :page-sizes="[10, 20, 30, 40, 50]"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
    <el-drawer
      style="width:86%;margin-left:250px;margin-top:80px;margin-bottom:20px"
      class="safeSkillDrawer"
      :title="drawerTitle"
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
      :before-close="handleClose"
    >
      <!-- :rules="ruleapproval" -->
      <el-form :model="addData" ref="addData" label-width="auto" class="demo-ruleForm">
        <el-form-item label="培训主题:" prop="courseId" required>
          <el-input v-model="addData.a1" :disabled="disabled" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="培训类型:" prop="time1" class="floats" required>
          <el-select v-model="addData.a2" :disabled="disabled" style="width:100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训人群:" prop="courseName" class="floats" required>
          <el-select v-model="addData.a3" :disabled="disabled" style="width:100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训开始结束时间:" prop="courseMan" class="floats" required>
          <el-input v-model="addData.a4" :disabled="disabled" placeholder="请输入员工年龄"></el-input>
        </el-form-item>
        <el-form-item label="培训讲师:" prop="time2" class="floats" required>
          <el-select v-model="addData.a5" :disabled="disabled" style="width:100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训方式:" prop="address" required>
          <el-select v-model="addData.a6" :disabled="disabled" style="width:41%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训内容概要:" prop="count">
          <el-input
            v-model="addData.a7"
            type="textarea"
            :rows="4"
            :disabled="disabled"
            placeholder="请输入工作年限"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件信息:" prop="type" class="floats">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="height:220px"></div>
        <el-form-item v-show="!disabled">
          <div style="text-align:center;margin-right:80px;">
            <el-button
              type="primary"
              v-loading="btnLoading"
              :disabled="btnLoading"
              @click="submitData('addData')"
            >确定</el-button>
            <el-button @click="resetForm('addData')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import commonFn from "@/common/js/util.js";
import qs from "qs";
import { mapState } from "vuex";
const { formatDate2 } = commonFn;
export default {
  data() {
    var user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    return {
      imageUrl: "",
      options: [
        {
          value: "选项1",
          label: "日常培训",
        },
        {
          value: "选项2",
          label: "规章制度",
        },
        {
          value: "选项3",
          label: "安全生产",
        },
        {
          value: "选项4",
          label: "其他培训",
        },
      ],
       current:1,
      size:10,
      total:0,
      options1: [
        {
          value: "1",
          label: "入职培训",
        },
        {
          value: "2",
          label: "中层管理",
        },
        {
          value: "3",
          label: "高层管理",
        },
        {
          value: "4",
          label: "安全管理",
        },
        {
          value: "5",
          label: "基层工人",
        },
      ],
      value: "",
      value1: "",

      drawer: false,
      direction: "ttb",
      drawerTitle: "",
      addData: {
        courseId: "",
        time1: "",
        courseName: "",
        courseMan: "", //风险级别
        time2: "", //控制措施
        address: "", //涉及相关方
        count: "", //所属施工阶段
        type: "", //检查项归类
      },
      disabled: false,
      btnLoading: false,
      multipleSelection: [],

      adminDis: false,
      //表格数据
      tableLoading: false,
      yearBudgetData: [],
      budgetTypeNameArr: [],
      choiseYear: "",
      clientHeight: "",
      searchData: {
        type: "", //检查项归类
        time1: "", //危险因素
        a:""
      },
      pickerOptions: {
        disabledDate: (time) => {
          var a = formatDate2(new Date(time.getTime()), "yyyy");
          return a < 2018;
        },
      },
    };
  },
  mounted() {
    // this.getRoleList();
  },
  created() {
    console.log(this.two);
    this.getList();
    var h = document.documentElement.clientHeight;
    console.log("h", h);
    this.clientHeight = h - 260;
  },
  methods: {
      // 分页current
        handleCurrentChange(page) {
            this.current = page
            this.getList()
        },
        //size
        handleSizeChange(val) {
            console.log(val);
            this.size = val
            this.getList()
        },

    addInfo() {
      this.drawer = true;
      this.disabled - false;
      (this.addData = {
        courseId: "",
        time1: "",
        courseName: "",
        courseMan: "", //风险级别
        time2: "", //控制措施
        address: "", //涉及相关方
        count: "", //所属施工阶段
        type: "", //检查项归类
      }),
        (this.drawerTitle = "新增清单");
    },
    handleClose(done) {
      this.drawer = false;
      this.drawerDept = false;
      this.btnLoading = false;
    },
    editData(item, title) {
      console.log(item);
      this.disabled = title == "编辑" ? false : true;
      this.drawerTitle =
        title == "编辑" ? title + "培训计划" : "用户信息" + title;
      this.drawer = true;
      this.addData = item;
      if (title == "编辑") {
        this.addData = {
          a1: "员工日常沟通礼仪，仪容仪表规范",
          a2: "安全生产",
          a3: "全体员工",
          a4: "2020-03-24 14:30 ～ 2020-03-24 16:30",
          a5: "李健涛",
          a6: "线上培训",
          a7:
            "员工日常沟通礼仪，仪容仪表规范培训流程安排：1）14:00 — 14:30 签到2）14:30 — 14:40 领导讲话 3）14:40 —16:00 培训 4） 16:00— 16:20 培训答疑5） 16:20 — 16:30 培训总结",
        };
      }
    },
    deleteData(item) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    deleteDatas() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length < 1) {
        this.$alert("您还未选中任何数据", "删除数据", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        this.$confirm("确定删除当前选中的数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    submitData(str) {
      this.drawer = false;
      this.btnLoading = false;
      this.$message({
        type: "success",
        message: "提交成功!",
      });
    },
    resetForm(addDeptData) {
      this.drawer = false;
      this.btnLoading = false;
    },
    //下载excel
    download() {
      this.dateFun();
      const params = qs.stringify(this.searchData);
    },
    //搜索
    getRoleList(yearBudgetData) {
      this.dateFun();
      this.getList();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取列表
    getList() {
      console.log(this.searchData);
      this.tableLoading = true;
      var dataArr = [
        {
          line1: "1",
          line2: "培训计划",
          line3: "站内信、短信",
          line4: "120人",
          line5: "亲爱的小伙伴，您工作辛苦了。根据公司规划要求，为您制定了安全生产培训计划，详情信息请登录APP客户端查阅。",
          line6: "2020-02-12 13:39",
        },
        {
          line1: "2",
          line2: "考核计划",
          line3: "短信、邮件",
          line4: "98人",
          line5: "亲爱的小伙伴，下午好。根据您的学习进度计划，为您制定了考核计划，详情信息请登录APP客户端查阅。",
          line6: "2020-02-12 13:39",
        },
      ];
      // yearBudgetData(this.searchData).then(data => {
      this.tableLoading = false;

      console.log(dataArr);
      this.yearBudgetData = dataArr;
      // });
    },
  },
};
</script>
<style >
.textAlignLeft {
  text-align: left;
}
.floats {
  width: 48%;
  float: left;
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
  border-color: #409eff;
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