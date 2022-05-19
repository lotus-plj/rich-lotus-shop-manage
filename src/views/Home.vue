<template>
  <el-container class="home-container">
    <el-header><!-- 头部区 -->
      <div>
        <img src="../assets/logo-hl.png" alt="" height="50px"/>
        <span>富有莲莲</span>
      </div>
      <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container :router="true">
      <!-- 侧边栏 -->
      <!-- 侧边栏 -->
      <el-aside width='220px'>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu  v-for="item in menuList" :key="item.id" :index="item.id+''">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 菜单名称 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 二级菜单 -->
            <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.id" :index="'/'+subItem.path" @click="saveNavState('/'+subItem.path)" >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      menuList:[],
      iconsObj: {
        '125':'el-icon-user-solid',//用户管理
        '103':'el-icon-s-check',//权限管理
        '101':'el-icon-s-goods',//商品管理
        '102':'el-icon-s-order',//订单管理
        '145':'el-icon-s-data',//数据管理
      },
      isCollapse: false,
      activePath: ''
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');

  },
  methods: {
    logout() {
      //清空token
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push('/login');
    },
    //保存菜单的index值（保持菜单的激活状态）
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.$router.push(activePath);
      this.activePath = activePath;
    },
    getMenuList(){
      this.menuList =  [
        {"id":1,"authName":"商品","path":"",
          "children":[
            {
              "id":11,"authName":"商品列表","path":""
            },
            {
              "id":12,"authName":"商品详情","path":""
            }
          ]
        },{"id":2,"authName":"订单","path":"",
          "children":[
            {
              "id":21,"authName":"订单列表","path":"goods"
            },
            {
              "id":22,"authName":"订单详情","path":""
            }
          ]
        },{"id":3,"authName":"用户","path":"",
          "children":[
            {
              "id":31,"authName":"用户列表","path":"users"
            },
            {
              "id":32,"authName":"用户详情","path":""
            }
          ]
        }
      ]

    },


  }
}
</script>

<style scoped lange="less">
.toggle-button{
  background-color: #4A5064;/* /*背景色(浅灰)*/
  font-size: 10px;/*/*字体大小10像素*/
  line-height: 24px;/*/*行高24像素*/
  color: #fff;/*//字体颜色白色*/
  text-align: center;/*//字体居中*/
  letter-spacing: 0.2em;/*//字体之间的距离*/
  cursor: pointer;/*//鼠标的形状（手形）*/
}
.el-header{
  background-color: #b0d4b0;/**/
  display: flex;/* //设置显示为flex布局*/
  justify-content: space-between;/*//设置为flex左右布局*/
  padding-left: 0;/*//左内边距为0（Logo贴左边）*/
  align-items: center;/*//元素上下居中（防止右边按钮贴上下边）*/
  color: #fff;
  font-size: 20px;
}
.el-header div{
  display: flex;
  align-items: center;/*//Logo和文字上下居中*/
}
.el-header div span {
  margin-left: 15px;/*//文字左侧设置间距，防止与Logo紧贴*/
}
.el-aside{
  background-color: #b0d4b0;
}
.el-main{
  background-color: #eaedf1;
  padding: 0px 0px 0px 0px
}
.home-container{
  height: 100%;
}
.el-menu{
  background-color:#b0d4b0;
}
.el-submenu{
  background-color:#b0d4b0;
}
</style>
