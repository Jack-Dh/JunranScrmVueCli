<template>
    <el-container>
        <!--头部-->

        <div class="header">
            <el-header
                    style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 50px;color: #FFFFFF;background-color: #393d49">

                <span style="font-size: 1rem;font-weight: bold">骏然CRM</span>
                <div style="display: flex;align-items: center;justify-content: space-around;width: 10%">
                    <img style="width: 30px;height: 30px;border-radius: 50%" :src="'http://'+iconImg"/>
                    <span style="" @click="logout">{{name}} 退出</span>
                </div>

            </el-header>
        </div>


        <!--中间-->
        <div id="index">

            <!--左侧菜单-->
            <div style="width: 15%;background-color: #393d49; ">
                <el-aside style="width: 100%;background-color: #393d49;height: 100%">
                    <el-menu style="background-color:#393d49;height: 100%;overflow: hidden">
                        <el-menu-item index="0" style="font-size: 1rem;color: #ffffff"
                                      @click="Tabs=false;indexPage=true">
                            <i class="fontFamily hhtx-yemian"></i>&nbsp;&nbsp;
                            <span slot="title">首&nbsp;&nbsp;页</span>
                        </el-menu-item>

                        <el-submenu index="1">
                            <template slot="title">
                                <i class="fontFamily hhtx-guanli"></i>
                                <span style="font-size: 1rem;color: #ffffff">系统管理</span>
                            </template>
                            <el-menu-item-group style="background-color: #282b33">
                                <el-menu-item index="1-1" @click="$router.push('admin_list');addTab('管理员管理')"><span
                                        class="fontstyle">管理员管理</span></el-menu-item>
                                <el-menu-item index="1-2"
                                              @click="$router.push('operationList');addTab('操作日志')"><span
                                        class="fontstyle">操作日志</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="fontFamily hhtx-weixinguanli"></i>
                                <span style="font-size: 1rem;color: #ffffff">微信管理</span></template>
                            <el-menu-item-group style="background-color: #282b33">
                                <el-menu-item index="2-1" @click="$router.push('fansList');addTab('粉丝列表')"><span
                                        class="fontstyle">粉丝列表</span></el-menu-item>
                                <el-menu-item index="2-2" @click="$router.push('wxSet');addTab('微信设置')"><span
                                        class="fontstyle">微信设置</span>
                                </el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="fontFamily hhtx-huodongguanli"></i>
                                <span style="font-size: 1rem;color: #ffffff">活动管理</span></template>
                            <el-menu-item-group style="background-color: #282b33">
                                <el-menu-item index="3-1" @click="$router.push('CtiList');addTab('活动列表')"><span
                                        class="fontstyle">活动列表</span></el-menu-item>
                                <el-menu-item index="3-2" @click="$router.push('Redenvelope');addTab('红包列表')"><span
                                        class="fontstyle">红包列表</span></el-menu-item>
                                <el-menu-item index="3-3" @click="$router.push('audit');addTab('活动审核')"><span
                                        class="fontstyle">活动审核</span>
                                </el-menu-item>
                                <el-menu-item index="3-4"
                                              @click="$router.push('Envelopeissue');addTab('红包发放')"><span
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
                         @tab-click="handleClick"
                         v-if="Tabs" style="width: 85%"
                >
                    <el-tab-pane
                            v-for="(item, index) in editableTabs2"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                            :urlTag="item"
                    >
                        <router-view></router-view>
                    </el-tab-pane>
                </el-tabs>
                <div class="indexPage" v-if="indexPage">
                    <h3>骏然CRM网络平台粉丝管理系统</h3>
                    <h4>欢迎您！</h4>
                    <h1>{{Time | filtTime}}</h1>

                    <div style="display: flex;justify-content:center;">
                        <div style="margin: 2%">
                            <div class="prompt">
                                <p style="background-color: red;width: 50px;height: 15px"></p>
                                <p>已取关({{attNum}})</p>
                            </div>
                            <div class="prompt">
                                <p style="background-color:#20a0ff;width: 50px;height: 15px"></p>
                                <p>已关注({{proNum}})</p>
                            </div>
                            <div class="prompt">
                                <p style="background-color:green;width: 50px;height: 15px"></p>
                                <p>总人数({{peopleNum}})</p>
                            </div>

                        </div>


                        <div style="display: flex;justify-content: space-around;width: 50%;align-items: center">
                            <el-progress type="circle" :percentage="attention" color="red"></el-progress>
                            <el-progress type="circle" :percentage="Focus" color="#20a0ff"></el-progress>
                            <el-progress type="circle" :percentage="100" color="green"></el-progress>
                        </div>
                    </div>


                </div>
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
    .indexPage {
        width: 100%;

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

    .fontstyle {
        color: #ffffff;
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

    export default {
        components: {Admin_list, adminList, fanslist, wxSet, CtiList, Redenvelope, audit, Envelopeissue},

        data() {
            const item = {
                name: '',

            };
            return {
                tableData: Array(20).fill(item),
                activeName: 'second',
                editableTabsValue2: 1,
                editableTabs2: [
                    //     {
                    //     title: '管理员管理',
                    //     name: '1',
                    //     content: this.$router.push('admin_List')
                    // }
                ],
                tabIndex: 0,
                indexPage: true,
                Time: new Date(),
                Tabs: false,
                Focus: 0,//已关注%
                attention: 0,//取关人数%
                peopleNum: 0,//全部人数%

                attNum: 0,//取关
                proNum: 0,//关注
                menHeight: 0,//左侧菜单高度
                tagsname:[],//已有的菜单
                iconImg:'',//用户头像
            }
        },
        filters: {
            //时间格式过滤器

            filtTime: function (input) {
                var d = new Date();
                var year = d.getFullYear() < 10 ? '0' + d.getFullYear() : d.getFullYear();//年
                var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1;//月
                var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();//日
                var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();//时
                var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();//分
                var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();//秒
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
            }
        },
        methods: {

            //新增选项卡
            addTab(Tagname) {
                this.indexPage = false;
                this.Tabs = true;
                for (var i = 0; i < this.editableTabs2.length; i++){
                    this.tagsname.push(this.editableTabs2[i].title)
                }
                //判断选项卡中是否已有打开的菜单
                if (this.tagsname.indexOf(Tagname)==-1){


                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: Tagname,
                        name: newTabName,
                        content: this.$route.path
                    });
                    this.editableTabsValue2 = newTabName;
                    console.log(newTabName)
                }else {
                    //循环数组，找到存在数组中的元素，并让选项卡显示当前选中的页面
                    var num
                     this.editableTabs2.forEach((element,index)=>{
                        if (element.title==Tagname) {
                            num=index+1
                        }
                    })
                    this.editableTabsValue2=num.toString()
                }

            },

            //选项卡被选中时触发
            handleClick: function (tab, event) {
                var routerUrl = tab.$attrs.urlTag.content
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
                    this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);

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
                this.$router.push('./')
            }


        }
        ,
        created: function () {

            this.name = this.$cookies.get('name');
            this.iconImg=this.$cookies.get('icon')
            let that = this
            setInterval(function () {
                that.Time = new Date()
            }, 1000);


            //全部人数
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999}
            }).then(res => {
                console.log(res.data)
                this.peopleNum = res.data.count
            })


            //关注人数
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999, subscribe: 1}
            }).then(res => {
                this.proNum = res.data.count
                //加上三目运算，防止出现infinity
                this.Focus = this.peopleNum == 0 ? 1 : res.data.count / this.peopleNum * 100

            })


            //取注人数
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999, subscribe: 0}
            }).then(res => {
                this.attNum = res.data.count
                this.attention = this.peopleNum == 0 ? 0 : res.data.count / this.peopleNum * 100
            })

            this.menHeight = window.innerHeight - 50
            // Focus:0,//已关注
            //     attention:0,//取关人数
            //     Num:0,//全部人数


        },

    }
    ;
</script>