<template>
    <el-container>
        <el-header
                style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 3rem;color: #FFFFFF;background-color: #393d49">
            <span style="font-size: 1rem;font-weight: bold">骏然SCRM</span>
            <span style="" @click="logout">{{name}} 退出</span>
        </el-header>
        <el-container style="height: 500px;">
            <el-aside width="200px" style="background-color: #393d49">
                <el-menu style="background-color:#393d49">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="fontFamily hhtx-guanli"></i>
                            <span style="font-size: 1rem;color: #ffffff">系统管理</span>
                        </template>
                        <el-menu-item-group style="background-color: #282b33">
                            <el-menu-item index="1-1" @click="$router.push('admin_list');addTab('管理员管理')"><span
                                    class="fontstyle">管理员管理</span></el-menu-item>
                            <el-menu-item index="1-2" @click="$router.push('operationList');addTab('操作日志')"><span
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
                            <el-menu-item index="3-4" @click="$router.push('Envelopeissue');addTab('红包发放')"><span
                                    class="fontstyle">红包发放</span>
                            </el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                </el-menu>
            </el-aside>


            <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
                <el-tab-pane
                        v-for="(item, index) in editableTabs2"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        :urlTag="item"
                >
                    <!--{{item.content}}-->
                    <router-view></router-view>
                </el-tab-pane>
            </el-tabs>

            <!--<router-view></router-view>-->

        </el-container>
    </el-container>

</template>


<style>
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
        height: 99.8vh;
    }

    .el-main {
        border: none;
    }

    .hhtx-guanli, .hhtx-weixinguanli, .hhtx-huodongguanli {
        margin-right: 10px;
        color: #ffffff
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
                editableTabsValue2: '1',
                editableTabs2: [
                    //     {
                    //     title: '管理员管理',
                    //     name: '1',
                    //     content: this.$router.push('admin_List')
                    // }
                ],
                tabIndex: 0
            }
        },
        methods: {
            //新增选项卡
            addTab(Tagname) {

                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: Tagname,
                    name: newTabName,
                    content: this.$route.path
                });
                this.editableTabsValue2 = newTabName;
                console.log(newTabName)
            },

            //选项卡被选中时触发
            handleClick: function (tab, event) {
                var routerUrl = tab.$attrs.urlTag.content
                this.$router.push(routerUrl.substring(1))
            },

            //移除选项卡
            removeTab(targetName) {
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
                this.editableTabs2.splice(targetName - 1, 1)
                //
                var rou = this.editableTabs2[this.editableTabs2.length - 1].content.substring(1);
                //获取已经删除标签的上一个标签信息

                this.$router.push(rou)
            },


            //退出登录
            logout: function () {
                this.$http.get('http://jiajiachuang.cn/junran/manage/logout', {
                    headers: {token: this.$cookies.get('token')}
                })
                this.$router.push('./')
            }

        },
        created: function () {
            this.name = this.$cookies.get('name')
        }
    };
</script>