<template>
  <div class="index">
    <el-container>
      <transition name="move" >
        <el-aside class="aside1">
            <div  class="logo"   style="text-align: center;height:60px;position: fixed;z-index: 1;">
              <div :class="!collapsed?'maxwidth1':'minwidth2'">
                <img  src="../assets/img/logo64.png" v-show="!collapsed" style="width:128px;height:40px;margin-top: 15px;"/>
                <img  src="../assets/img/minlogo.png" v-show="collapsed" style="width:35px;height:19px;margin-top: 25px;"/>
              </div>

            </div>

          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            style="height:calc(100vh - 60px);margin-top:60px;"
            text-color="#fff"
            active-text-color="#409EFF"
            :router="true"
            @open="handleOpen"
            background-color="#282828"
            :collapse="collapsed"
            :collapse-transition="true">
            <div v-for="(item,index) in meunList" :key="index">
              <!-- <div  > -->
                <template v-if="item.children!=''" >
                  <el-submenu :index="item.path" >
                  <template slot="title" > 
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                  <!-- </di> -->
                  </template>
                  <el-menu-item :index="item2.path" v-for="(item2,index2) in item.children" :key="index2" style="margin-left:50px;">
                  <template slot="title" >{{item2.name}}</template>
                  </el-menu-item>

                </el-submenu>
              </template>
              <template v-else >

                <el-menu-item :index="item.path">
                <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </template>
              <!-- </div> -->
                
            </div>


          </el-menu>
        </el-aside>
      </transition>
      <el-container >
        <el-header class="header">

          <el-col :span="24" class="header">
        
            <el-col :span="6">
                      <div class="tools" @click.prevent="collapse">
                <i class="fa fa-align-justify"></i>
              
              </div>
              <span style="font-weight:500;color:rgba(255,255,255,1);font-size:18px;letter-spacing: 3px;">矿区智能综合培训系统</span>
            </el-col>
            <el-col :span="4" class="userinfo">
              <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="messageList()">
                  <el-badge :is-dot="bool" class="item" >我的消息</el-badge>
                  </el-dropdown-item>
              
                  <el-dropdown-item @click.native="editPsd()">修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-col>
        </el-header>
        <el-main>
          <section class="content-container">
            <div class="grid-content bg-purple-light">
              <el-col :span="24" class="breadcrumb-container">
              
                <el-breadcrumb v-if="$route.name!='全局视图' && $route.name !=='我的工作台' && $route.name !=='PM工作台'&& $route.name !=='周报详情信息'&& $route.name !=='业务工作台'" separator="/" class="breadcrumb-inner" >
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" >
                    {{  item.name }}
                  </el-breadcrumb-item>
              
                </el-breadcrumb>
                <el-breadcrumb v-else-if="$route.name=='周报详情信息'" separator="/" class="breadcrumb-inner" >
                  <el-breadcrumb-item >周报信息管理</el-breadcrumb-item>
                  <el-breadcrumb-item >部门周报管理</el-breadcrumb-item>
                  <el-breadcrumb-item >周报详情信息</el-breadcrumb-item>					
                </el-breadcrumb>
                <el-breadcrumb v-else-if="$route.name=='我的工作台'"  class="breadcrumb-inner" >
                  <el-breadcrumb-item >
                    我的工作台
                  </el-breadcrumb-item>
              
                </el-breadcrumb>
                <el-breadcrumb v-else-if="$route.name=='业务工作台'"  class="breadcrumb-inner" >
                  <el-breadcrumb-item >
                    业务工作台
                  </el-breadcrumb-item>
              
                </el-breadcrumb>


                <el-breadcrumb v-else-if="$route.name=='PM工作台'"  class="breadcrumb-inner" >
                  <el-breadcrumb-item >
                    PM工作台
                  </el-breadcrumb-item>
              
                </el-breadcrumb>

                <el-breadcrumb v-else  class="breadcrumb-inner" >
                  <el-breadcrumb-item  >
                    全局视图
                  </el-breadcrumb-item>
              
                </el-breadcrumb>
                  
              </el-col>
              <el-col :span="24" class="content-wrapper">
                <transition name="fade" mode="out-in">
                  <router-view></router-view>
                </transition>
              </el-col>
            </div>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuLists from "../common/data/menu"
export default {
  name: 'Index',
  props: {
    msg: String
  },
  data(){
    return {
      collapsed:false,
      meunList:menuLists,
      sysUserAvatar:require('./userHeader.jpg') ,
      sysUserName:"admin",
			bool:false,
				
    }
  },
  created(){
   
  },
  methods:{
    init:function(){},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					// tokenLogout().then(data=>{
					// sessionStorage.removeItem('user');
					// sessionStorage.removeItem('userId');
					// sessionStorage.removeItem('avatar')

					_this.$router.push('/login');
					// })
				}).catch(() => {

				});


			},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .aside1.el-aside {
			overflow: hidden ;
			box-sizing: border-box;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			width:230px!important;
			background-color: #282828;
		}
  
</style>
<style scoped lang="scss">
	// @import '~scss_vars';
			.el-aside {
			overflow: hidden ;
			box-sizing: border-box;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			width:230px;
			background-color: #282828;
		}
		 .food .move-enter-active, .food .move-leave-active {
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
  }
  .food .move-enter, .food .move-leave {
	    transition: all 0.5s linear;
    transform: translate3d(100%, 0, 0);
  }

			// .el-menu {
			// 	width:230px;
			// }
		.el-menu-vertical-demo:not(.el-menu--collapse) {
			width: 230px;
			// min-height: 400px;
		}
		.maxwidth1 {
			width:230px !important;
			background-color:#3c8dbc;

		}
		.minwidth2 {
			width:60px !important;
			background-color:#282828;


		}
		.maxwidth {
			width:230px !important;
		}
				.minwidth {
			width:60px !important;
		}

			.slideleft-enter-active,
			.slideleft-leave-active {
				transition: all .8s;
			}
			
			.slideleft-enter,
			.slideleft-leave-to {
				/* transform: translateY(0); */
				opacity: 0;
			}
    
    		.header {
			height: 60px;
			line-height: 60px;
			background:linear-gradient(-81deg,#3c8dbc,#3c8dbc);
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
          display: inline-block;
          width:100px;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 10px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				display: inline;
			}
		}
	// .container {
	// 	position: absolute;
	// 	top: 0px;
	// 	bottom: 0px;
	// 	width: 100%;

	// 	.main {
	// 		display: flex;
	// 		// background: #324057;
	// 		position: absolute;
	// 		top: 60px;
	// 		bottom: 0px;
	// 		overflow: hidden;
	// 		aside {
	// 			flex:0 0 230px;
	// 			width: 230px;

	// 			.el-menu{
	// 				height: 100%;
	// 			}
	// 			.collapsed{
	// 				width:60px;
	// 				.item{
	// 					position: relative;
	// 				}
	// 				.submenu{
	// 					position:absolute;
	// 					top:0px;
	// 					left:60px;
	// 					z-index:99999;
	// 					height:auto;
	// 					display:none;
	// 				}

	// 			}
	// 		}
	// 		.menu-collapsed{
	// 			flex:0 0 60px;
	// 			width: 60px;
	// 		}
	// 		.menu-expanded{
	// 			flex:0 0 230px;
	// 			width: 230px !important;
	// 			.el-menu {
	// 				width: 230px !important;
	// 			}
	// 		}
	// 		.content-container {

	// 			flex:1;

	// 			overflow-y: scroll;
	// 			padding: 20px;
	// 			.breadcrumb-container {
	// 				//margin-bottom: 15px;
	// 				.title {
	// 					width: 200px;
	// 					float: left;
	// 					color: #475669;
	// 				}
	// 				.breadcrumb-inner {
	// 					float: right !important;
	// 				}
	// 				.el-breadcrumb {
	// 					float: right !important;
	// 				}
	// 			}
					.el-breadcrumb {
					font-size: 14px;
					float: left;
					line-height: 1;
					
				}

				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					margin-top:30px;
					box-shadow:0px 0px 24px 5px rgba(178,9,8,0.04);
					border-radius:6px;
					padding:10px;
				}
				.iconfont {
					margin-top: -4px;
    display: inline-block;
    margin-right: 10px;
	color:#fff;
				}
	// 		}
	// 	}

	// }

	@media screen and (min-width:10px) {

		.el-aside::-webkit-scrollbar {
    width: 5px !important;
    height: 5px !important;

  }
			.el-aside::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 30px #474545 !important;
		opacity:0.3;
		background-color: transparent !important;
	} 
}
</style>
