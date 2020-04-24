<template>
  <div class="loginBox">
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <div class="bg">
      <div class="login_body">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="login"
        >
          <!-- <img src="./login_logo.png" class="login_logo" /> -->
          <h1>智能安监平台</h1>

          <el-form-item prop="account">
            <!-- <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" clearable  @change="getList()"  @focus = "bool=true" @input = "bool=false" ></el-input>
         <div class="history" v-if="HistoryListLength>0&&bool">
          <p v-for="(item,index) in HistoryList" :key="index" @click="getItem(item)"> 
            <span style="padding-left:10px;">{{item.mobile}}</span>
          </p>
            </div>-->

            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="ruleForm2.account"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              style="    width:100%;"
              clearable
              class="nameInput"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.mobile }}</div>
              </template>
              <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              class="passwordInput"
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              clearable
              style="width:100%;"
            >

              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <p style="color:red;margin-left:40px;font-weight: 800;font-size: 16px;">{{message}}</p>
          <!-- <el-form-item>
            <div style="display: inline; float: left;margin-left:110px">
              <input
                v-model="checked"
                type="checkbox"
                name
                style="width: 15px; height: 15px;    vertical-align: middle;"
              />
              <span style="color:#B6B6B6; font-size: 12px;">记住密码</span>
            </div>
          </el-form-item> -->

          <el-form-item style="width:100%" class="loginBtn">
            <el-button
              type="primary"
              @click.native.prevent="handleSubmit2"
              :loading="logining"
              v-on:keyup.13.native="submit"
            >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { requestLogin } from "../api/api";

//import NProgress from 'nprogress'

export default {
  data() {
    var isName = (rule, value, callback) => {
      var pattern = /.{2,15}/;
      if (!value) {
        this.message = "请输入用户名";
        callback(new Error(" "));
      } else if (!pattern.test(value)) {
        this.message = "用户名2-15位！";
        callback(new Error(" "));
      } else {
        this.message = " ";
        callback();
      }
    };
    var isPassword = (rule, value, callback) => {
      var patterns = /.{6,12}/;
      if (this.ruleForm2.account == "") {
        this.message = "请输入用户名";
        callback();
      } else if (
        this.ruleForm2.account.length < 2 ||
        this.ruleForm2.account.length > 15
      ) {
        this.message = "用户名2-15位！";
        callback();
      } else if (!value) {
        this.message = "请输入密码";
        callback(new Error(" "));
      } else if (!patterns.test(value)) {
        this.message = "密码6-12位！";
        callback(new Error(" "));
      } else {
        this.message = " ";
        callback();
      }
    };
    return {
      message: "",
      bool: false,
      checked: false,

      logining: false,

      ruleForm2: {
        account: "",

        checkPass: ""
      },
      HistoryList: [],
      HistoryListLength: 0,

      rules2: {
        account: [
          {
            required: true,
            validator: isName,
            // message: "请输入账号",

            trigger: "blur"
          }

          // {
          //   min: 2,
          //   max: 15,
          //   message: "用户名2-15位",
          //   trigger: "blur"
          // }

          //{ validator: validaePass }
        ],

        checkPass: [
          {
            required: true,
            validator: isPassword,
            // message: "请输入密码",

            trigger: "blur"
          }
          // {
          //   min: 6,
          //   max: 12,
          //   message: "密码6-12位",
          //   trigger: "blur"
          // }

          //{ validator: validaePass2 }
        ]
      }
    };
  },
  methods: {
    handleSelect(item) {
      this.$refs["ruleForm2"].resetFields();
      this.ruleForm2.account = item.mobile;
      if(this.ruleForm2.account != ""){
        this.message = "";
      }
      this.ruleForm2.checkPass = item.smsCode;
    },
    querySearch(queryString, cb) {
      var restaurants = this.HistoryList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        // return (restaurant.mobile.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        return restaurant;
      };
    },

    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    submit() {
      this.handleSubmit2();
    },

    handleSubmit2(ev) {
      // alert("!23")
      var _this = this;

      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;

          var loginParams = {
            mobile: this.ruleForm2.account,

            smsCode: this.ruleForm2.checkPass
          };

          // requestLogin(loginParams).then(data => {
          //   this.logining = false;
          //   if (data.code == 0) {
          //     // console.log(data)
          //     sessionStorage.setItem("user", JSON.stringify(data.data));

          //     sessionStorage.setItem("userId", data.data.userId);

          //     sessionStorage.setItem("avatar", data.data.avatar);
  console.log(this.$router)
              this.$router.push({
                path: "/numAnalysis"
                // path: data.data.path
              });

          //     if (this.checked == true) {
          //       //传入账号名，密码，和保存天数3个参数

          //       this.setCookie(loginParams.mobile, loginParams.smsCode, 7);

          //       this.HistoryList.push(loginParams);
          //       if (this.HistoryList) {
          //         let hash = {};
          //         let config = this.HistoryList;
          //         const newArr = config.reduceRight((item, next) => {
          //           hash[next.mobile]
          //             ? ""
          //             : (hash[next.mobile] = true && item.push(next));
          //           return item;
          //         }, []);

          //         this.HistoryList = newArr;
          //         this.HistoryListLength = newArr.length;
          //       }

          //       localStorage.setItem(
          //         "HistoryList",
          //         JSON.stringify(this.HistoryList)
          //       );
          //     }
          //     if (this.checked == false) {
          //       //传入账号名，密码，和保存天数3个参数

          //       this.clearCookie();
          //     }
          //   } else {
          //     this.$message({
          //       message: data.msg,

          //       type: "error"
          //     });
          //   }
          // });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },

    //设置cookie

    setCookie(c_name, c_pwd, exdays) {
      // console.log(Base64.encode(c_pwd))

      var exdate = new Date(); //获取时间

      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数

      //字符串拼接cookie

      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();

      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();

      // console.log("进来了")
    },

    //读取cookie

    getCookie: function() {
      if (document.cookie.length > 0) {
        this.checked = true;
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下

        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割

          //判断查找相对应的值

          if (arr2[0] == "userName") {
            this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
            if (this.ruleForm2.account == "") {
              this.checked = false;
            }
          } else if (arr2[0] == "userPwd") {
            this.ruleForm2.checkPass = arr2[1];
            if (this.ruleForm2.checkPass == "") {
              this.checked = false;
            }
          }
        }
      } else {
        this.checked = false;
      }
    },
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getItem(item) {
      this.$nextTick(() => {
        alert("qw");
      });

      // console.log(item)
      this.bool = false;

      this.$refs["ruleForm2"].resetFields();
      this.ruleForm2.account = item.mobile;
      this.ruleForm2.checkPass = item.smsCode;
      // this.$refs.ruleForm2
    },
    getList() {
      if (this.ruleForm2.account == "") {
        this.bool = true;
      }
    }
  },

  //登录页面动画

  mounted: function() {
    if (!this.ruleForm2.account && !this.ruleForm2.checkPass) {
      this.checked = false;
    }
  },

  created() {
    this.getCookie();
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        _this.submit();
      }
    };

    var HistoryList = localStorage.getItem("HistoryList");

    if (HistoryList) {
      let hash = {};
      let config = JSON.parse(HistoryList);
      const newArr = config.reduceRight((item, next) => {
        hash[next.mobile] ? "" : (hash[next.mobile] = true && item.push(next));
        return item;
      }, []);

      this.HistoryList = newArr;
      this.HistoryListLength = newArr.length;
    }
  },
  watch: {
    ruleForm2: {
      handler() {
        console.log(this.ruleForm2);
      }
    }
  }
};
</script>
<style>
.nameInput input.el-input__inner,
.passwordInput input.el-input__inner{
      width: 190px;
    margin-top: -5px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    /* padding: 13px 65px; */
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    font-size: 16px;
    color:#fff;
}
.nameInput .el-input-group__prepend,
.passwordInput .el-input-group__prepend{
  background: rgba(57, 61, 82, 0);
    border: none;
    font-size: 18px;
}
.loginBtn .el-button{
  border-radius: 50px;
    background: transparent;
    padding: 10px 50px;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    text-transform: uppercase;
    font-size: 14px;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
</style>
<style lang="scss" scoped>
.loginBox{
  width:100%;
  height:100%;
  background: url("data:image/png;base64,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AhmdylpybfGEvU+xh+EEAjU6no85qkoTFE9DOi2nboc0cd9TbC5oAQHP8tgwPgVprKgRT9z3DJuMnIA8PSHPQ377h85YX2zhAibtd02QDYl6QePE/c+wc0ST9v+MnSPyApBfuBwIAHNBpQkQzmjSgZ+xjqgUABibGjvpwHPs6NgLAJ6IZCcfeI49IFEEpIrKaKHU4skHn2MdURKAmiOafPAXrCNyAqC5IBCoz/F8zFFZuIAph36NZ9PJrl9X2Jy24+evmIyLWekrJ/+rePKhX7DJyBOoc1UsVWoHsrlyO8a5CcKyWUasFAcC+Yum1WvqqgIACxZT2n8Fd8J29xgWTVD3hobm3z+l/QXWEcEFTG1/kXd0qH/tujE2EAAmo6kdL7HL91M7XmAtmSOgOieUKrdjLshNUCQLzdFyIIC7LF5A5yts/cDUzpfYOaJpna+wjkgE1LYgES3ZP/7+IADoiKoCAI5o2uHX2KegFACpqPQCai2bbT4pvRrbTACz5dJOP/wa64hCE+AuO/3Ib1hHNP3I67BgEa/ad9U07+JxBKCOyDcBcngeCOAu3wlxowJj7PSjb7CT1VkAZqrUfnb0DbaCAt4EgQDQEeEFdL3FFjR+1vUWm4ycAKgjahEBwFwQCOAuO+PY79glmywAVFHpBSANSUs0Aa4LGuM7IdQRzTj+DuuIsgCQI5p5/F1xNp2sakV/kFa5aow9AeTwvEIA4YzwArrfp6dAVjalqEUlntn9HpuMnIC8YhPPqExvpvpj6wXEOiIV5MXR8P5+s1wTFMlAec+rCQSAl5114g9sJxQB+dxy5RIOL0DegBrvfj99X+SWlhAANSQVAohkNOvkB6wjgguYffJDcSJkdkS+XxRPRW1xyxBQrx8SDyxNgBNw6k9sLpjdCgKgRSyOQHZg4TFUjUsBCF9iKYAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAE/vcE/gKBUnEaHzyidAAAAABJRU5ErkJggg==");
}
//背景图
.bg {
  width:100%;
  height:100%;
}
.login_body{

  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  top: 20px;
  -webkit-transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
  -webkit-transition-property: -webkit-transform,opacity,box-shadow,top,left;
          transition-property: transform,opacity,box-shadow,top,left;
  -webkit-transition-duration: .5s;
          transition-duration: .5s;
  -webkit-transform-origin: 161px 100%;
      -ms-transform-origin: 161px 100%;
          transform-origin: 161px 100%;
  -webkit-transform: rotateX(0deg);
          transform: rotateX(0deg);
  position: relative;
  width: 290px;
  /*border-top: 2px solid #D8312A;*/
  height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  padding: 80px 40px 40px 40px;
  background: #35394a;
  /* Old browsers */
  /* FF3.6+ */
  background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #35394a), color-stop(100%, rgb(0, 0, 0)));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
  /* Chrome10+,Safari5.1+ */
  /* Opera 11.10+ */
  /* IE10+ */
  background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
  /* IE6-9 fallback on horizontal gradient */
}
h1{
  color:#eee;
}

// .bgImg {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   margin: auto;
// }
//登录框样式
.login {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  margin: auto;
  // margin-right: 8%;
  // max-height: 420px;
  // max-width: 500px;
  text-align: center;
}

// @media (max-width: 1406px) {
//   .login {
//     margin-right: 1%;
//   }
// }
// @media (max-width: 1320px) {
//   .login {
//     margin-right: -5%;
//   }
// }
// @media (max-width: 1371px) {
//   .login {
//     margin-right: -5%;
//   }
// }
// @media (max-width: 1463px) {
//   .login {
//     margin-right: -5%;
//   }
// }
// @media (max-width: 1392px) {
//   .login {
//     margin-right: -12%;
//   }
// }
// @media (max-width: 1319px) {
//   .login {
//     margin-right: -14%;
//   }
// }
// @media (max-width: 1212px) {
//   .login {
//     margin-right: -20%;
//   }
// }
// @media (max-width: 1158px) {
//   .login {
//     margin-right: -50%;
//   }
// }
// @media (max-width: 1050px) {
//   .login {
//     margin-right: -70%;
//   }
// }
a.logo {
  display: block;
  height: 58px;
  width: 167px;
  margin: 0 auto 30px auto;
  background-size: 167px 42px;
}
// 标题logo
.login_logo {
  width: 249px;
  margin: 0 auto;
  margin-top: -40px;
}
// 标题名称login_title
.login_title {
  width: 431px;
  margin: 57px 0 0 0;
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/

  -webkit-border-radius: 5px;

  border-radius: 5px;

  -moz-border-radius: 5px;

  background-clip: padding-box;

  margin: 180px auto;

  width: 350px;

  padding: 35px 35px 15px 35px;

  background: #fff;

  border: 1px solid #eaeaea;

  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;

    text-align: center;

    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }

  position: absolute;

  margin-left: 50%;

  transform: translateX(-50%);

  overflow-y: hidden;

  overflow-x: hidden;
}
.history {
  min-height: 100px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 30px #ccc;
  position: absolute;
  z-index: 100;
  // box-shadow: 3px 5px 16px 3px #000000 inset;
}
</style>

