<template>
    <div class="Envelopeissue">
        <div style="text-align: left;margin: 1%">
            <el-date-picker
                    v-model="startTIME"
                    type="datetime"
                    placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
                    v-model="endTIME"
                    type="datetime"
                    placeholder="结束时间">
            </el-date-picker>


            <el-select v-model="value" placeholder="根据状态查询">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
            <el-button @click="sendRed">批量发送</el-button>
        </div>

        <el-table
                :data="EnveList"
                style="width: 100%"
                @selection-change="selChange"
                border
                v-loading="loading"
        >
            <el-table-column
                    type="selection"
                    align="center"
            ></el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
            ></el-table-column>
            <el-table-column
                    prop="activityName"
                    label="活动名称"
                    align="center"
            ></el-table-column>
            <el-table-column
                    prop="nickname"
                    label="用户昵称"
                    align="center"
            ></el-table-column>
            <el-table-column
                    prop="redPacksendTime"
                    label="发送时间"
                    align="center"
            ></el-table-column>

            <el-table-column
                    label="红包金额(元)"
                    align="center"
            >
                <template slot-scope="scope">
                    {{scope.row.money/100}}
                </template>


            </el-table-column>
            <el-table-column
                    label="状态"
                    align="center"
            >
                <template slot-scope="scope">
                    {{scope.row.sendRedpack=='01'?'已发送':'未发送'}}
                </template>

            </el-table-column>
            <el-table-column
                    prop="sendOperatorName"
                    label="操作人"
                    align="center"
            ></el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">

                    <el-button type="text" @click="Issu(scope.row.id,scope.row.state)">发送红包</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="Envcount"
                    :page-size="Envsize"
                    @current-change="fenPage"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Envelopeissue",
        data() {
            return {
                EnveList: [],//红包发放列表
                Envcount: 0,//红包发放列表总数目
                Envsize: 0,//红包发放列表当页数目
                RedId: [],//红包ID
                startTIME: '',//开始时间
                endTIME: '',//结束时间
                options: [{
                    value: '01',
                    label: '已发送'
                }, {
                    value: '02',
                    label: '未发送'
                },],
                value: '',
                loading: true,
                stater: [],//获取多选时候红包的状态
            }
        },
        methods: {

            //分页
            fenPage: function (page) {
                this.$http.get('http://jiajiachuang.cn/junran/manage/useractivity/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {size: 10, state: '02', page: page - 1}
                }).then(res => {
                    if (res.data.code == 0) {
                        this.EnveList = res.data.data
                    } else if (res.data.code == 103) {
                        alert('身份验证过期，请重新登录');
                        this.$router.push('./');
                    }

                })
            },
            //搜索按钮
            search: function () {
                this.$http.get('http://jiajiachuang.cn/junran/manage/useractivity/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {
                        size: 10,
                        state: '02',
                        sendRedPack: this.value,
                        startTime: this.startTIME,
                        endTime: this.endTIME
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.EnveList = res.data.data
                        this.Envcount = res.data.count
                        this.Envsize = res.data.size
                        this.loading = false
                    } else if (res.data.code == 103) {
                        alert('身份验证过期，请重新登录');
                        this.$router.push('./');
                    }
                })
            },
            //多选获取到的数据
            selChange: function (val) {
                this.RedId.length = 0;
                this.stater.length = 0;
                for (var i = 0; i < val.length; i++) {
                    this.RedId.push(val[i].id)
                    this.stater.push(val[i].state)
                }
                console.log(this.RedId)
            },
            //批量发送红包
            sendRed: function () {
                var num = '02'
                if (this.stater.indexOf(num) == -1) {
                    if (this.RedId.length != 0) {
                        this.$http.post('http://jiajiachuang.cn/junran/manage/useractivity/sendRedPack', {ids: this.RedId}, {
                            headers: {token: this.$cookies.get('token')}
                        }).then(res => {
                            console.log(res.data)
                        })
                    } else {
                        alert('您还未选择任何红包！')
                    }
                } else {
                    alert('选中的红包中包含已发送的，请勿重复发送！')
                }


            },
            //发送红包
            Issu: function (id, state) {

                if (state == '01') {
                    this.$http.post('http://jiajiachuang.cn/junran/manage/useractivity/sendRedPack', {ids: [id]}, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            window.location.reload()

                        } else if (res.data.code == 103) {
                            alert('身份验证过期，请重新登录');
                            this.$router.push('./');
                        }

                    })
                } else {
                    alert('您已发送，请勿重复发送')
                }


            }
        },
        created: function () {
            this.$http.get('http://jiajiachuang.cn/junran/manage/useractivity/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 10, state: '02'}
            }).then(res => {
                console.log(res.data)
                if (res.data.code == 0) {
                    this.EnveList = res.data.data
                    this.Envcount = res.data.count
                    this.Envsize = res.data.size
                    this.loading = false
                } else if (res.data.code == 103) {
                    alert('身份验证过期，请重新登录');
                    this.$router.push('./');
                }

            })
        }
    }
</script>

<style scoped>
    .Envelopeissue {
        width: 100%
    }
</style>