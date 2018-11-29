<template>
    <div class="CtiList">
        <div class="butbox">
            <el-button @click="openCti">批量启用</el-button>
            <el-button @click="shutCti">批量停用</el-button>
            <el-button @click="addCtipage">添加活动</el-button>
            <el-input style="width: 20%" v-model="ctiName" placeholder="根据活动名称搜索"
                      prefix-icon="el-icon-search" @keyup.enter.native="searchCti"></el-input>

            <el-select v-model="value" placeholder="根据活动状态搜索" @keyup.enter.native="searchCti">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"

                >
                </el-option>
            </el-select>
            <el-button @click="searchCti">搜索</el-button>


            <el-dialog
                    title="添加活动"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
            >
                <div>
                    <el-input v-model="activityName" class="addCtiInput" placeholder="活动名称"></el-input>
                    <el-input v-model="shop" class="addCtiInput" placeholder="活动店铺"></el-input>
                    <el-input v-model="max" class="addCtiInput" placeholder="最大参与人数" type="number"></el-input>
                    <el-input v-model="remark" type="textarea" class="addCtiInput" placeholder="活动说明"></el-input>
                    <el-input v-model="participationCondition" type="textarea" class="addCtiInput"
                              placeholder="参与条件"></el-input>
                    <el-input v-model="award" type="textarea" class="addCtiInput" placeholder="活动奖励"></el-input>
                    <el-date-picker
                            v-model="startTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="活动开始时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            class="addCtiInput">
                    </el-date-picker>

                    <el-date-picker
                            v-model="endTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="活动结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            class="addCtiInput"
                    >
                    </el-date-picker>


                    <el-select v-model="envelope" placeholder="要绑定的红包" class="addCtiInput">
                        <el-option
                                v-for="item in redBackList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-upload
                            class="upload-demo"
                            action="http://jiajiachuang.cn/junran/manage/keUpload"
                            name="imgFile"
                            multiple
                            :limit="3"
                            :headers="myHeaders"
                            :on-success="upchange"
                            :file-list="fileList"
                            style="margin: 1%">
                        <el-button size="small" type="primary">点击上传店铺图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCti">确 定</el-button>
            </el-dialog>


        </div>
        <el-table
                :data="ctilist"
                border
                style="width: 100%"
                v-loading="loading"
                @selection-change="handleSelectionChange">
            >

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <img class="shopImg" :src="'http://'+props.row.shopIcon">
                        </el-form-item>
                        <br/>
                        <el-form-item label="活动名称">
                            <span>{{ props.row.activityName }}</span>
                        </el-form-item>
                        <el-form-item label="活动店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="最大参与人数">
                            <span>{{ props.row.maxNumber }}</span>
                        </el-form-item>
                        <el-form-item label="已经参与人数">
                            <span>{{ props.row.count }}</span>
                        </el-form-item>
                        <el-form-item label="审核通过人数">
                            <span>{{ props.row.passNumber }}</span>
                        </el-form-item>
                        <el-form-item label="活动奖励">
                            <span>{{ props.row.award }}</span>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <span>{{ props.row.endTime }}</span>
                        </el-form-item>
                        <el-form-item label="活动状态">
                            <span>{{props.row.state=='01'?'启用':'停用'}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="selection"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
            >
            </el-table-column>

            <!--<el-table-column-->
            <!--fixed-->
            <!--prop=""-->
            <!--label="序号"-->
            <!--width="55"-->

            <!--&gt;</el-table-column>-->


            <el-table-column
                    prop="activityName"
                    label="活动名称"
                    align="center"
            ></el-table-column>
            <el-table-column
                    prop="award"
                    label="活动奖励"
                    align="center"
            ></el-table-column>

            <el-table-column
                    label="参与人数"
                    align="center"
            >
                <template slot-scope="scope">
                    {{scope.row.count}}/{{scope.row.maxNumber}}
                </template>

            </el-table-column>

            <el-table-column
                    label="状态"
                    align="center"
            >
                <template slot-scope="scope">
                    <span><i :class="scope.row.state=='01'?'el-icon-check':'el-icon-close'"></i></span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="开始时间"
                    align="center"
            ></el-table-column>

            <el-table-column
                    prop="endTime"
                    label="结束时间"
                    align="center"
            ></el-table-column>

            <el-table-column
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="togg(scope.row.id,scope.row.state)">停用启用</el-button>
                    <el-button type="text" size="small" @click="upCti(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">

            <el-pagination
                    layout="total,prev, pager, next"
                    @current-change="changePage"
                    :page-size="pageSize"
                    :total="count"
            >
            </el-pagination>

        </div>

        <el-dialog
                title="修改活动"
                :visible.sync="upcti"
                :before-close="handleClose">


            <el-input v-model="UpactivityName" class="addCtiInput" placeholder="活动名称"></el-input>
            <el-input v-model="Upshop" class="addCtiInput" placeholder="活动店铺"></el-input>
            <el-input v-model="Upmax" class="addCtiInput" placeholder="最大参与人数" type="number"></el-input>
            <el-input v-model="Upremark" type="textarea" class="addCtiInput" placeholder="活动说明"></el-input>
            <el-input v-model="UpparticipationCondition" type="textarea" class="addCtiInput"
                      placeholder="参与条件"></el-input>
            <el-input v-model="Upaward" type="textarea" class="addCtiInput" placeholder="活动奖励"></el-input>


            <el-date-picker
                    v-model="UpstartTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="活动开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    class="addCtiInput">
            </el-date-picker>

            <el-date-picker
                    v-model="UpendTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="活动结束时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    class="addCtiInput"
            >
            </el-date-picker>
            <!--活动红包-->
            <el-select v-model="envelope" placeholder="要绑定的红包" class="addCtiInput">
                <el-option
                        v-for="item in redBackList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                >
                </el-option>
            </el-select>

            <!--店铺图片-->
            <el-upload
                    class="upload-demo"
                    action="http://jiajiachuang.cn/junran/manage/keUpload"
                    name="imgFile"
                    multiple
                    :limit="3"
                    :headers="myHeaders"
                    :on-success="upctichange"
                    :file-list="fileList"
                    style="margin: 1%">
                <el-button size="small" type="primary">点击上传店铺图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
    <el-button @click="upcti = false">取 消</el-button>
    <el-button type="primary" @click="YseupCti">确 定</el-button>
  </span>
        </el-dialog>


    </div>

</template>

<script>
    export default {
        name: "CtiList",
        data() {
            return {
                upcti: false,
                ctilist: [],
                pageCount: 0,
                ids: [],//每个活动id
                multipleSelection: [],//批量选中活动的ID
                ctistate: [],//批量选中活动的状态
                options: [{
                    value: '01',
                    label: '启用'
                }, {
                    value: '02',
                    label: '停用'
                }],
                value: '',
                ctiName: '',
                dialogVisible: false,
                fileList: [],
                myHeaders: {},
                startTime: '',//活动开始时间
                endTime: '',//活动结束时间
                shopIcon: '',//店铺图片
                activityName: '',//活动名称
                award: '',//活动奖励
                participationCondition: '',//活动参与条件
                shop: '',//活动店铺
                remark: '',//活动说明
                max: '',//活动最大参与人数
                redBackList: [],//红包列表信息
                envelope: '',//红包
                UpshopIcon: '',//修改活动店铺图片
                Upid: '',//活动id
                UpstartTime: '',//修改活动开始时间
                UpendTime: '',//修改活动结束时间
                UpactivityName: '',//修改活动名称
                Upaward: '',//修改活动奖励
                UpparticipationCondition: '',//修改活动参与条件
                Upshop: '',//修改活动店铺
                Upremark: '',//修改活动说明
                Upmax: '',//修改活动最大参与人数
                pageSize:0,//每页显示数量
                count:0,//总条目数
                loading: true
            }
        },
        methods: {  //创建活动按钮
            addCti: function () {
                this.dialogVisible = false;
                console.log(this.envelope)

                if (this.remark != '' && this.shop != '' && this.participationCondition != '' && this.award != '' && this.activityName != '' && this.envelope != '' && this.max != '' && this.shopIcon != '' && this.endTime != '' && this.startTime != '') {
                    let data = {
                        remark: this.remark,
                        shop: this.shop,
                        participationCondition: this.participationCondition,
                        award: this.award,
                        activityName: this.activityName,
                        redPackId: this.envelope,
                        max: this.max,
                        shopIcon: this.shopIcon,
                        endTime: this.endTime,
                        startTime: this.startTime
                    }

                    this.$axios.post('http://jiajiachuang.cn/junran/manage/activity/upsert', data, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        this.redBackList = res.data.rs
                        if (res.data.code == 0) {
                            alert('添加成功')
                            window.location.reload()
                        }
                    })
                } else {
                    alert('信息填写不完全')
                }


            },
            //打开添加活动页
            addCtipage: function () {
                this.dialogVisible = true
                this.$axios.get('http://jiajiachuang.cn/junran/manage/redpack/list', {
                    headers: {token: this.$cookies.get('token')},
                    params: {state: '01'}
                }).then(res => {
                    console.log(res.data)
                    this.redBackList = res.data.rs
                })
            },
            //创建活动店铺图片
            upchange: function (file, fileList) {
                this.shopIcon = file.url
            },


            //确定修改按钮
            YseupCti: function () {
                this.upcti = false
                if (this.Upremark != '' && this.Upshop != '' && this.UpparticipationCondition != '' && this.Upaward != '' && this.UpactivityName != '' && this.envelope != '' && this.Upmax != '' && this.UpshopIcon != '' && this.UpendTime != '' && this.UpstartTime != '') {
                    let data = {
                        remark: this.Upremark,
                        shop: this.Upshop,
                        participationCondition: this.UpparticipationCondition,
                        award: this.Upaward,
                        activityName: this.UpactivityName,
                        redPackId: this.envelope,
                        max: this.Upmax,
                        shopIcon: this.UpshopIcon,
                        endTime: this.UpendTime,
                        startTime: this.UpstartTime,
                        id: this.Upid,
                    }
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/activity/upsert', data, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        this.redBackList = res.data.rs
                        if (res.data.code == 0) {
                            alert('修改成功')
                            window.location.reload()
                        }
                    })
                } else {
                    alert('信息填写不完全')
                }

            },
            //打开修改活动面板
            upCti: function (val) {
                this.Upid = val.id
                this.UpstartTime = val.startTime
                this.UpendTime = val.endTime
                this.UpactivityName = val.activityName
                this.Upaward = val.award
                this.UpparticipationCondition = val.participationCondition
                this.Upshop = val.shop
                this.Upremark = val.remark
                this.Upmax = val.max
                this.upcti = true
                this.$axios.get('http://jiajiachuang.cn/junran/manage/redpack/list', {
                    headers: {token: this.$cookies.get('token')},
                    params: {state: '01'}
                }).then(res => {
                    console.log(res.data)
                    this.redBackList = res.data.rs
                })
            },
            //修改活动店铺图片
            upctichange: function (file, fileList) {
                this.UpshopIcon = file.url
                console.log(this.UpshopIcon)
            },
            // //新建活动
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            //搜索活动
            searchCti: function () {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/activity/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {size: 9, state: this.value, activityName: this.ctiName}
                }).then(res => {
                    console.log(res.data)
                    this.ctilist = res.data.data
                    this.count=res.data.count
                    this.pageSize=res.data.size
                    this.loading = false
                })
            },

            //批量开启
            openCti: function () {
                if (this.ctistate.indexOf('01') != -1) {
                    alert('选择的活动中已有开启的活动了，请勿重复开启！')
                } else if (this.multipleSelection.length != 0) {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/activity/able', {
                        ids: this.multipleSelection,
                        state: '01'
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {

                        window.location.reload()
                    })
                } else {
                    alert('您还没有选中活动')
                }
            },
            //批量关闭
            shutCti: function () {
                if (this.ctistate.indexOf('02') != -1) {
                    alert('选择的活动中已有关闭的活动了，请勿重复关闭！')
                } else if (this.multipleSelection.length != 0) {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/activity/able', {
                        ids: this.multipleSelection,
                        state: '02'
                    }, {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        console.log(res.data)
                        window.location.reload()
                    })
                } else {
                    alert('您还没有选中活动')
                }


            },
            //停用启用
            togg: function (id, state) {
                var a = state == '01' ? '02' : '01'

                var data = {ids: [id], state: a}
                this.$axios.post('http://jiajiachuang.cn/junran/manage/activity/able', data, {
                    headers: {token: this.$cookies.get('token')}
                }).then(res => {
                    window.location.reload()
                })

            },
            //分页
            changePage: function (val) {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/activity/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {size: 9, state: this.value, activityName: this.ctiName,page: val - 1}
                }).then(res => {
                    this.ctilist = res.data.data
                    this.count=res.data.count
                    this.pageSize=res.data.size
                    console.log(res.data)
                })
            },
            //选中后获取所有选中的id存到数组
            handleSelectionChange(val) {
                // this.multipleSelection = val;
                for (var i = 0; i < val.length; i++) {
                    this.multipleSelection.push(val[i].id)
                    this.ctistate.push(val[i].state)
                }
                console.log(this.multipleSelection)
            }
        },
        created: function () { //这是活动列表
            this.myHeaders = {token: this.$cookies.get('token')}
            this.$axios.get('http://jiajiachuang.cn/junran/manage/activity/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 9}
            }).then(res => {
                console.log(res.data)
                this.ctilist = res.data.data
                this.count=res.data.count
                this.pageSize=res.data.size
                this.pageCount = res.data.pageCount
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

    .shopImg {
        width: 20%
    }

    .butbox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0.05%;
        padding: 1%
    }

    .addCtiInput {
        width: 55%;
        margin: 1%
    }

</style>