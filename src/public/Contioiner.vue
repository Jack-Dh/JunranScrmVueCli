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
                            <el-menu-item index="1-1" @click="addTab(editableTabsValue2)"><span
                                    class="fontstyle">管理员管理</span></el-menu-item>
                            <el-menu-item index="1-2" @click="operationList(editableTabsValue2)"><span class="fontstyle">操作日志</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="fontFamily hhtx-weixinguanli"></i>
                            <span style="font-size: 1rem;color: #ffffff">微信管理</span></template>
                        <el-menu-item-group style="background-color: #282b33">
                            <el-menu-item index="2-1" @click="fansList(editableTabsValue2)"><span
                                    class="fontstyle">粉丝列表</span></el-menu-item>
                            <el-menu-item index="2-2" @click="wxset"><span class="fontstyle">微信设置</span>
                            </el-menu-item>

                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="fontFamily hhtx-huodongguanli"></i>
                            <span style="font-size: 1rem;color: #ffffff">活动管理</span></template>
                        <el-menu-item-group style="background-color: #282b33">
                            <el-menu-item index="3-1" @click="CtiList(editableTabsValue2)"><span
                                    class="fontstyle">活动列表</span></el-menu-item>
                            <el-menu-item index="3-2" @click="Redenvelope(editableTabsValue2)"><span
                                    class="fontstyle">红包列表</span></el-menu-item>
                            <el-menu-item index="3-3" @click="audit(editableTabsValue2)"><span class="fontstyle">活动审核</span>
                            </el-menu-item>
                            <el-menu-item index="3-4" @click="Envelopeissue(editableTabsValue2)"><span class="fontstyle">红包发放</span>
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
                editableTabs2: [{
                    title: '管理员管理',
                    name: '1',
                    content: this.$router.push('admin_List')
                }],
                tabIndex: 3
            }
        },
        methods: {
            //选项卡被选中时触发
            handleClick:function(tab,event){
            console.log(tab)
                console.log(event)
            },
            
            //管理员列表
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '管理员管理',
                    name: newTabName,
                    content: this.$router.push('admin_List')
                });
                this.editableTabsValue2 = newTabName;
                this.$router.push('admin_list')

            },
            //操作日志
            operationList(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '操作日志',
                    name: newTabName,
                    content: this.$router.push('operationList')
                });
                this.editableTabsValue2 = newTabName;
            },
            //粉丝列表
            fansList(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '粉丝列表',
                    name: newTabName,
                    content: this.$router.push('fanslist')
                });
                this.editableTabsValue2 = newTabName;
            },

            //微信设置
            wxset(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '微信设置',
                    name: newTabName,
                    content: this.$router.push('wxSet')
                });
                this.editableTabsValue2 = newTabName;
            },
            //活动列表
            CtiList(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '活动列表',
                    name: newTabName,
                    content: this.$router.push('CtiList')
                });
                this.editableTabsValue2 = newTabName;
            },
            //红包列表
            Redenvelope(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '红包列表',
                    name: newTabName,
                    content: this.$router.push('CtiList')
                });
                this.editableTabsValue2 = newTabName;
            },
            //活动审核
            audit(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '活动审核',
                    name: newTabName,
                    content: this.$router.push('audit')
                });
                this.editableTabsValue2 = newTabName;
            },
            //红包发放
            Envelopeissue(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: '红包发放',
                    name: newTabName,
                    content: this.$router.push('Envelopeissue')
                });
                this.editableTabsValue2 = newTabName;
            },



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