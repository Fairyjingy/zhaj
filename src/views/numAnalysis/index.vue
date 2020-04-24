<template>
  <div>
    <div class="echartBox">
        <div class="box" v-for="(item,index) in titles" :key="index">
        <div class="img">
          <router-link :to="item.path"  ><i class="icon el-icon-s-marketing"></i></router-link>
        <!-- <img src="img/btnStyle/wechat.png"> -->
        </div>
        <p>{{item.name}}</p>
      </div>
      <!-- <div class="box">
        <div class="img">
          <router-link :to="`/safeEducationEchart`"  ><i class="icon el-icon-s-marketing"></i></router-link>
        </div>
        <p>安全教育</p>
      </div>
      <div class="box">
        <div class="img">
          <router-link :to="`/dangerFactorEchart`"  ><i class="icon el-icon-s-platform"></i></router-link>
        </div>
        <p>危险因素</p>
      </div>
      <div class="box">
        <div class="img">
          <router-link :to="`/dangerProjectEchart`"  ><i class="icon el-icon-school"></i></router-link>
        </div>
        <p>危险工程</p>
      </div>
      <div class="box">
        <div class="img">
          <router-link :to="`/safeTestEchart`"  ><i class="icon el-icon-box"></i></router-link>
        </div>
        <p>安全考核</p>
      </div> -->
    </div> 
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
      titles:[
        {
          name:"安全教育",
          path:'safeEducationEchart'
        },
        {
          name:"危险因素",
          path:'dangerFactorEchart'
        },
        {
          name:"危险工程",
          path:'dangerProjectEchart'
        },
        {
          name:"安全考核",
          path:'safeTestEchart'
        },
      ],
    };
  },
  mounted() {
    // this.getRoleList();

  },
  created() {
         var h=document.documentElement.clientHeight;
         console.log("h",h)
        this.clientHeight = h - 260;
  },
  methods: {
    
  }
};
</script>
<style >
  
.el-button--text{
  color:rgb(51, 179, 90);
}
</style>
<style scoped>
.textAlignLeft{
  text-align: left;
}

.echartBox {
	width: 100%;
	height:calc(100vh - 160px);
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap
}

.echartBox .box {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
	width: 100px;
	height: 140px;
	margin: 20px
}

.echartBox .box .img {
	width: 100px;
	height: 100px;
	box-shadow: 18px 18px 30px rgba(0,0,0,.1),-18px -18px 30px #fff;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #efeeee;
	transition: box-shadow .2s ease-out;
	position: relative
}

.echartBox .box .img img {
	width: 60px;
	transition: width .2s ease-out
}
.echartBox .box .img .icon {
	font-size: 64px;
  color:#3c8dbc;
	transition: color .6s ease-out
}
.echartBox .box .img .icon:hover {
	font-size: 58px;
  color:rgb(51, 179, 90);
}

.echartBox .box p {
	color: #708090
}

.echartBox .box .img:hover {
	box-shadow: 0 0 0 rgba(0,0,0,.1),0 0 0 #fff,inset 18px 18px 30px rgba(0,0,0,.1),inset -18px -18px 30px #fff;
	transition: box-shadow .2s ease-out
}

.echartBox .box .img:hover img {
	width: 58px;
	transition: width .2s ease-out
}
</style>