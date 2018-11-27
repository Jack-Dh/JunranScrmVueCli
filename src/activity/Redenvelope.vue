<template>
    <div class="Redenvelope">
        <div style="display: flex;flex-direction: row;margin-left: 1%;padding: 1%">
            <el-button @click="redopen">批量启用</el-button>
            <el-button @click="redShut">批量停用</el-button>
            <el-button @click="dialogVisible=true">创建红包</el-button>
            <el-input v-model="redName" style="width: 25%" placeholder="根据红包名搜索"
                      @keyup.enter.native="searchRed"></el-input>
            <el-select v-model="value" placeholder="请选择" @keyup.enter.native="searchRed">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="searchRed">搜索</el-button>

        </div>

        <el-dialog
                title="新建红包"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-input v-model="name" placeholder="红包名称"></el-input>
            <el-input v-model="totalAmount" placeholder="红包金额（元" type="number"></el-input>
            <el-input v-model="actName" placeholder="活动名称"></el-input>
            <el-input v-model="sendName" placeholder="商户名称"></el-input>
            <el-input v-model="wishing" placeholder="红包祝福"></el-input>
            <el-input v-model="remark" placeholder="备注"></el-input>


            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRed">确 定</el-button>

        </el-dialog>


        <template>
            <el-table
                    ref="multipleTable"
                    :data="red"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="selectChange"
                    v-loading="loading"

            >

                <el-table-column type="expand" fixed>
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="红包名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="商铺名称">
                                <span>{{ props.row.sendName }}</span>
                            </el-form-item>
                            <el-form-item label="金额(元)">
                                <span>{{ props.row.totalAmount/100 }}</span>
                            </el-form-item>
                            <el-form-item label="状态">
                                <span>{{ props.row.state=='01'?'启用':'停用'}}</span>
                            </el-form-item>
                            <el-form-item label="活动名称">
                                <span>{{ props.row.actName }}</span>
                            </el-form-item>
                            <el-form-item label="红包祝福语">
                                <span>{{ props.row.wishing }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.remark }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>


                <el-table-column
                        fixed
                        type="selection"
                        align="center">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="actName"
                        label="活动名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="红包名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="sendName"
                        label="商户名称"
                        align="center"
                >
                </el-table-column>

                <el-table-column
                        label="状态"
                        align="center"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span><i :class="scope.row.state=='01'?'el-icon-check':'el-icon-close'"></i></span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalAmount"
                        label="红包金额(元)"
                        align="center"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.totalAmount/100}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button type="text" @click="redTagg(scope.row.id,scope.row.state)">停用启用</el-button>
                        <el-button type="text" @click="openUpred(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </template>
        <div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="count"
                    :page-size="size"
                    @current-change="taggPage"
            >
            </el-pagination>
        </div>

        <el-dialog
                title="修改红包"
                :visible.sync="Upred"
                width="30%"
                :before-close="handleClose">
            <el-input v-model="Upname" placeholder="红包名称"></el-input>
            <el-input v-model="UptotalAmount" placeholder="红包金额（元" type="number"></el-input>
            <el-input v-model="UpactName" placeholder="活动名称"></el-input>
            <el-input v-model="UpsendName" placeholder="商户名称"></el-input>
            <el-input v-model="Upwishing" placeholder="红包祝福"></el-input>
            <el-input v-model="Upredremark" placeholder="备注"></el-input>
            <el-button @click="Upred = false">取 消</el-button>
            <el-button type="primary" @click="Yesup">确 定</el-button>

        </el-dialog>

    </div>


</template>

<script>
    export default {
        name: "Redenvelope",
        data() {
            return {
                red: [],//红包数据
                count: 0,//数据条目
                size: 0,//每页显示的数量
                redID: [],//所有红包id
                redState: [],//所有红包状态
                redName: '',//搜索时红包名称
                options: [{
                    value: '01',
                    label: '启用'
                }, {
                    value: '02',
                    label: '停用'
                }],
                value: '',//select选择器选项ID
                dialogVisible: false,
                actName: '',//活动名称
                name: '',//创建时红包名称
                remark: '',//红包备注
                sendName: '',//商户名称
                totalAmount: '',//红包金额
                wishing: '',//红包祝福语
                Upred: false,//修改红包面板

                Upname: '',//修改创建时红包名称
                UptotalAmount: '',//修改红包金额
                UpactName: '',//修改活动名称
                UpsendName: '',//修改商户名称
                Upwishing: '',//修改红包祝福语
                Upredremark: '',//修改红包备注
                UpredID: '',//红包ID
                loading: true
            }
        },
        methods: {
            //添加红包
            addRed: function () {
                this.dialogVisible = false
                if (this.actName != '' && this.name != '' && this.remark != '' && this.sendName != '' && this.totalAmount != '' && this.wishing != '') {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/redpack/upsert', {
                        actName: this.actName,
                        name: this.name,
                        remark: this.remark,
                        sendName: this.sendName,
                        totalAmount: this.totalAmount * 100,
                        wishing: this.wishing
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            alert('添加成功！')
                            window.location.reload()
                        }
                    })
                } else {
                    alert('信息填写不完全！')
                }

            },
            //修改红包
            Yesup: function () {
                this.Upred = false
                if (this.UpactName != '' && this.Upname != '' && this.Upremark != '' && this.UpsendName != '' && this.UptotalAmount != '' && this.Upwishing != '') {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/redpack/upsert', {
                        actName: this.UpactName,
                        name: this.Upname,
                        remark: this.Upremark,
                        sendName: this.UpsendName,
                        totalAmount: this.UptotalAmount * 100,
                        wishing: this.Upwishing,
                        id: this.UpredID,
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            alert('修改成功！')
                            window.location.reload()
                        }
                    })
                } else {
                    alert('信息填写不完全！')
                }


                this.Upred = true
            },
            //打开修改红包面板
            openUpred: function (val) {
                this.Upred = true
                console.log(val)
                this.Upname = val.name
                this.UptotalAmount = val.totalAmount / 100
                this.UpactName = val.actName
                this.UpsendName = val.sendName
                this.Upwishing = val.wishing
                this.Upredremark = val.remark
                this.UpredID = val.id


            },
            //红包搜索
            searchRed: function () {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/redpack/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {name: this.redName, state: this.value}
                }).then(res => {
                    if (res.data.code == 0) {
                        this.red = res.data.data
                        this.loading = false
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            //批量启用红包
            redopen: function () {
                if (this.redState.indexOf('01') != -1) {
                    alert('您当前选中的红包已有存在开启的，请勿重复开启！')
                } else if (this.redID.length != 0) {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/redpack/able', {
                        ids: this.redID,
                        state: '01'
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        if (res.data.code == 0) {
                            window.location.reload()
                        }
                    })
                } else {

                }

            },

            //批量关闭红包
            redShut: function () {
                if (this.redState.indexOf('02') != -1) {
                    alert('您当前选中的红包已有存在关闭的，请勿重复关闭！')
                } else if (this.redID.length != 0) {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/redpack/able', {
                        ids: this.redID,
                        state: '02'
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        if (res.data.code == 0) {
                            window.location.reload()
                        }
                    })
                } else {
                    alert('您当前还未选择需要关闭的红包！')
                }


            },


            //获取选中的项的id
            selectChange: function (val) {
                this.redID.length = 0;
                this.redState.length = 0;
                for (var i = 0; i < val.length; i++) {
                    this.redID.push(val[i].id)
                    this.redState.push(val[i].state)
                }

            },
            //红包切换，停用启用
            redTagg: function (id, state) {
                var s = state == '01' ? '02' : '01'

                this.$axios.post('http://jiajiachuang.cn/junran/manage/redpack/able', JSON.stringify({
                    ids: [id],
                    state: s
                }), {
                    headers: {token: this.$cookies.get('token')}
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        window.location.reload()
                    }
                })

            },
            //分页
            taggPage: function (val) {

                this.$axios.get('http://jiajiachuang.cn/junran/manage/redpack/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {page: val - 1, size: 10}
                }).then(res => {
                    console.log(res.data)
                    this.red = res.data.data
                })

            }
        },
        created: function () {
            this.$axios.get('http://jiajiachuang.cn/junran/manage/redpack/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 10}
            }).then(res => {
                console.log(res.data)
                this.red = res.data.data
                this.count = res.data.count
                this.size = res.data.size
                this.loading = false
            })


        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .Redenvelope {

    }
</style>