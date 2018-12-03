<template>
    <el-container>
        <!--头部-->

        <div class="header">
            <el-header
                    style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 50px;color: #FFFFFF;background-color: #232838">

                <span style="font-size: 1rem;font-weight: bold">骏然CRM</span>
                <div style="display: flex;align-items: center;justify-content: space-around;width: 10%">
                    <img style="width: 30px;height: 30px;border-radius: 50%" :src="'http://'+iconImg"/>
                    <span style="" @click="logout">{{name}} 退出</span>
                </div>

            </el-header>
        </div>


        <!--中间-->
        <div id="index">
            <!--style="background-color: #282b33"-->
            <!--左侧菜单-->
            <div style="width: 18%;background-color: #393d49; ">
                <el-aside style="width: 100%;background-color: #393d49;height: 100%">
                    <el-menu
                            style="height: 100%;overflow: hidden;"
                            background-color="#393d49"
                            text-color="#fff"
                    >
                        <el-menu-item index="0" @click="$router.push('inedxPage');addTab('首页',$route.path)">
                            <i class="fontFamily hhtx-yemian"></i>&nbsp;&nbsp;
                            <span slot="title">首&nbsp;&nbsp;页</span>
                        </el-menu-item>

                        <el-submenu index="1">
                            <template slot="title">
                                <i class="fontFamily hhtx-guanli"></i>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1"
                                              @click="$router.push('admin_list');addTab('管理员管理',$route.path)"><span
                                        class="fontstyle">管理员管理</span></el-menu-item>
                                <el-menu-item index="1-2"
                                              @click="$router.push('operationList');addTab('操作日志',$route.path)"><span
                                        class="fontstyle">操作日志</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="fontFamily hhtx-weixinguanli"></i>
                                <span>微信管理</span></template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1"
                                              @click="$router.push('fansList');addTab('粉丝列表',$route.path)"><span
                                        class="fontstyle">粉丝列表</span></el-menu-item>
                                <el-menu-item index="2-2"
                                              @click="$router.push('wxSet');addTab('微信设置',$route.path)"><span
                                        class="fontstyle">微信设置</span>
                                </el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="fontFamily hhtx-huodongguanli"></i>
                                <span>活动管理</span></template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1"
                                              @click="$router.push('CtiList');addTab('活动列表',$route.path)"><span
                                        class="fontstyle">活动列表</span></el-menu-item>
                                <el-menu-item index="3-2"
                                              @click="$router.push('Redenvelope');addTab('红包列表',$route.path)"><span
                                        class="fontstyle">红包列表</span></el-menu-item>
                                <el-menu-item index="3-3"
                                              @click="$router.push('audit');addTab('活动审核',$route.path)"><span
                                        class="fontstyle">活动审核</span>
                                </el-menu-item>
                                <el-menu-item index="3-4"
                                              @click="$router.push('Envelopeissue');addTab('红包发放',$route.path)"><span
                                        class="fontstyle">红包发放</span>
                                </el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div>

            <!--右侧内容-->
            <div style="width: 100%;height: 100%;overflow: auto;">
                <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab"
                         @tab-click="handleClick" style="width: 100%"
                >
                    <el-tab-pane
                            v-for="item in editableTabs2"
                            :label="item.title"
                            :name="item.name"
                            :urlTag="item">
                    </el-tab-pane>
                </el-tabs>
                <router-view></router-view>


            </div>

        </div>


        <!--底部-->
        <!--<div class="footer">-->
        <!--<el-footer class="el-footer" height="30">-->
        <!--Copyright 2018 yueweidianshan.AllRightsReserved.-->
        <!--</el-footer>-->
        <!--</div>-->


    </el-container>

</template>


<style>
    /*.el-menu-item :hover{background-color: red;display: block}*/
    .indexPage {
        width: 100%;
        text-align: center;
    }

    .header {
        position: absolute;
        height: 50px;
        width: 100%;
        z-index: 999;

        /*opacity: 0;*/
    }

    #index {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 50px;
        bottom: 0;
    }

    .footer {
        width: 100%;
        line-height: 35px;
        position: absolute;
        bottom: 0;
        z-index: 99;

    }



    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 2rem;
    }

    .el-aside {
        color: #333;
        /*height: calc( 100vh - 80px );*/
    }

    .el-main {
        border: none;
    }

    .hhtx-guanli, .hhtx-weixinguanli, .hhtx-huodongguanli {
        margin-right: 10px;
        color: #ffffff
    }

    .prompt {
        width: 100px;
        display: flex;
        justify-content: space-between
    }

    .el-footer {
        color: #f8f8f8;
        background-color: #393d49;
        width: 100%;
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
    import inedxPage from './index'

    export default {
        components: {Admin_list, adminList, fanslist, wxSet, CtiList, Redenvelope, audit, Envelopeissue, inedxPage},

        data() {
            const item = {
                name: '',

            };
            return {
                tableData: Array(20).fill(item),
                activeName: 'second',
                editableTabsValue2: 0,
                editableTabs2: [
                    //     {
                    //     title: '首页',
                    //     name: '1',
                    //     content: this.$router.push('indexPage')
                    // }
                ],
                tabIndex: 0,
                indexPage: true,
                Tabs: false,
                menHeight: 0,//左侧菜单高度
                tagsname: [],//已有的菜单
                iconImg: '',//用户头像

            }
        },
        methods: {
            //新增选项卡
            addTab(Tagname, url) {
                // this.Tabs = true;
                let num
                //循环判断如果有已打开选项卡就返回true
                let a = this.editableTabs2.some((item, index) => {
                    num = index+1
                    return item.title == Tagname
                })
                if (a) {
                    //列表中包含已有打开的选项卡
                    this.editableTabsValue2 = num.toString()//标题选中已打开的选项卡
                    // this.tabIndex = num//坐标从最后一个选项卡开始


                        console.log(num)
                    sessionStorage.setItem('tabName', this.editableTabsValue2)//记录已有选项卡中最后选中第几个菜单

                } else {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: Tagname,
                        name: newTabName,
                        content: this.$route.path
                    });
                    this.editableTabsValue2 = newTabName;

                    console.log(this.tabIndex)
                    console.log(newTabName)
                    sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))//记录选项卡中所有信息
                    sessionStorage.setItem('tabName', this.editableTabsValue2)//记录新增选项卡最后选中第几个菜单

                }

                // for (var i = 0; i < this.editableTabs2.length; i++){
                //     this.tagsname.push(this.editableTabs2[i].title)
                // }
                // //判断选项卡中是否已有打开的菜单
                // if (this.tagsname.indexOf(Tagname)==-1){
                //
                //     let newTabName = ++this.tabIndex + '';
                //     this.editableTabs2.push({
                //         title: Tagname,
                //         name: newTabName,
                //         content: this.$route.path
                //     });
                //     this.editableTabsValue2 = newTabName;
                //     console.log(newTabName)
                // }else {
                //     //循环数组，找到存在数组中的元素，并让选项卡显示当前选中的页面
                //     var num
                //      this.editableTabs2.forEach((element,index)=>{
                //         if (element.title==Tagname) {
                //             num=index+1
                //         }
                //     })
                //     this.editableTabsValue2=num.toString()
                // }

            },

            //页面刷新时，记录选卡
            shuaxin: function () {
                let a = JSON.parse(sessionStorage.getItem('menu'))
                if (a != null) {
                    //判断选项卡存在
                    JSON.parse(sessionStorage.getItem('menu')).forEach(item => {
                        this.editableTabs2.push(item)
                    })
                    this.editableTabsValue2 = sessionStorage.getItem('tabName') //获取最后选中的是哪个
                    this.tabIndex = this.editableTabs2.length//把长度设为已有选项卡的数组长度，如果有新增选项卡，则从长度开始添加
                }
            },


            //选项卡被选中时触发
            handleClick: function (tab, event) {
                let routerUrl = tab.$attrs.urlTag.content
                this.$router.push(routerUrl.substring(1))
            },

            //移除选项卡
            removeTab(targetName) {
                if (this.editableTabs2.length > 1) {
                    let tabs = this.editableTabs2;
                    let activeName = this.editableTabsValue2;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }
                    this.editableTabsValue2 = activeName;
                    console.log(activeName)
                    this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);

                    //将移除后的数组保存记录
                    sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))
                    sessionStorage.setItem('tabName', this.editableTabsValue2)
                    var rou = this.editableTabs2[this.editableTabs2.length - 1].content.substring(1);
                    //获取已经删除标签的上一个标签信息
                    this.$router.push(rou)
                } else {
                    alert('默认标签首页不允许关闭哦')
                }
            },

            //退出登录
            logout: function () {
                this.$http.get('http://jiajiachuang.cn/junran/manage/logout', {
                    headers: {token: this.$cookies.get('token')}
                })
                sessionStorage.clear()//清空所有选项卡信息
                this.$router.push('./')
            }
        }
        ,
        created: function () {

            this.shuaxin()
            // this.editableTabs2=JSON.parse(sessionStorage.getItem('menu'))

            this.name = this.$cookies.get('name');
            this.iconImg = this.$cookies.get('icon')
            this.menHeight = window.innerHeight - 50
        },
    }
    ;
</script>