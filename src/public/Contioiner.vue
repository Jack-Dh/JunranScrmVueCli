<template>
    <el-container>
        <el-header style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 3rem;color: #FFFFFF">
          <span style="font-size: 1rem;font-weight: bold">骏然SCRM</span>
            <span style="" @click="logout">{{name}} 退出</span>
        </el-header>
    <el-container style="height: 500px">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
                <el-submenu index="1" style="border: 1px solid #f8f8f8">
                    <template slot="title"><span style="font-size: 1rem">系统管理</span></template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="$router.push('admin_list')">管理员管理</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('operationList')">操作日志</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2" style="border: 1px solid #f8f8f8">
                    <template slot="title"><span style="font-size: 1rem">微信管理</span></template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="$router.push('fanslist')">粉丝列表</el-menu-item>
                        <el-menu-item index="2-2" @click="$router.push('wxSet')">微信设置</el-menu-item>

                    </el-menu-item-group>

                </el-submenu>
                <el-submenu index="3" style="border: 1px solid #f8f8f8">
                    <template slot="title"><span style="font-size: 1rem">活动管理</span></template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1" @click="$router.push('CtiList')">活动列表</el-menu-item>
                        <el-menu-item index="3-2" @click="$router.push('Redenvelope')">红包列表</el-menu-item>
                        <el-menu-item index="3-3" @click="$router.push('audit')">活动审核</el-menu-item>
                        <el-menu-item index="3-4" @click="$router.push('Envelopeissue')">红包发放</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>
            </el-menu>
        </el-aside>



            <!--<el-main>-->

                <!---->
            <!--</el-main>-->
            <router-view></router-view>
        </el-container>
    </el-container>

</template>



<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 2rem;
    }

    .el-aside {
        color: #333;
        height: 99.8vh;
    }
    .el-main{
        border: none;
    }

</style>

<script>
   import adminList from '../components/admin_list'
   import fanslist from '../views/fanslist'
   import Admin_list from "../../333";
   import wxSet from '../views/wxSet'
   import CtiList from '../activity/CtiList'
   import Redenvelope from '../activity/Redenvelope'
   import audit from '../activity/audit'
   import Envelopeissue from '../activity/Envelopeissue'
    export default {
        components: {Admin_list,adminList,fanslist,wxSet,CtiList,Redenvelope,audit,Envelopeissue},
        // methods(){
        //     var admin_lisr=sessionStorage.getItem('admin_list')
        //     if (admin_lisr){
        //         this.userName=admin_lisr;
        //
        //     }
        // },
        data() {
            const item = {
                name: '',

            };
            return {
                tableData: Array(20).fill(item)
            }
        },
        methods: {
            logout:function() {
                this.$http.get('http://jiajiachuang.cn/junran/manage/logout',{
                    headers:{token:this.$cookies.get('token')}
                })
                this.$router.push('./')
            }

        },
        created:function () {
            this.name=this.$cookies.get('name')
        }
    };
</script>