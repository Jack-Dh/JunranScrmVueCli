<template>
    <div class="fanslist">
        <div style="text-align: left;padding: 0.5%">
            <el-input v-model="username" class="username" @keyup.enter.native="search" placeholder="根据用户名搜索"></el-input>
            <el-select @change="stateFans(state)" v-model="state" @keyup.enter.native="search" placeholder="根据粉丝状态搜索">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-select @change="tagFans(value)" v-model="value" @keyup.enter.native="search" placeholder="根据粉丝标签搜索">
                <el-option
                        v-for="item in fanTag"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>

            <el-button @click="search">搜索</el-button>
            <el-button @click="optag">新建标签</el-button>
        </div>


        <el-dialog
                title="添加标签"
                :visible.sync="dialogVisibox"
                width="30%"
                :before-close="handleClosebox"
        >
            <!--<el-tag-->
            <!--v-for="tag in dynamicTags"-->
            <!--closable-->
            <!--:disable-transitions="false"-->
            <!--@close="handleClose(tag,tag.id)"-->
            <!--@click="inputUpdata"-->
            <!--&gt;-->
            <!--&lt;!&ndash;<input @click="inputUpdata" :value="tag.name" style="background: none;border: none;width: 30%">&ndash;&gt;-->
            <!--{{tag.name}}-->

            <!--</el-tag>-->
            <!--修改标签-->
            <el-input
                    v-for="tag in dynamicTags"
                    :value="tag.name"
                    style="width: 30%;background-color: #ebf5ff"
                    @blur="inputUpdata(tag.id,$event)"

            ></el-input>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>

            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>

        <template>
            <el-table
                    :data="fans"
                    style="width: 100%"
                    v-loading="loading"

            >
                <el-table-column
                        fixed
                        label="序号"
                        type="index"></el-table-column>
                <el-table-column

                        prop="headimgurl"
                        label="头像"
                        align="center">
                    <template scope="scope">
                        <img :src="scope.row.headimgurl" width="100" height="100"/>
                    </template>

                </el-table-column>
                <el-table-column
                        prop="nickname"
                        label="昵称"

                        align="center">
                </el-table-column>
                <el-table-column
                        label="地区"
                        align="center">
                    <template slot-scope="scope">
                        {{scope.row.province}}{{scope.row.city}}
                    </template>

                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="subscribe"
                        label="状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="subscribeScene"
                        label="关注来源"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="subscribeTime"
                        label="关注时间"
                        align="center">
                </el-table-column>

                <el-table-column
                        label="标签"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.tag">{{item.name}}</el-tag>

                    </template>
                </el-table-column>


                <el-table-column
                        label="操作"
                        align="center">
                    <template scope="scope">
                        <el-button @click="a(scope.row)">添加标签</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>


        <el-dialog
                title="添加标签"
                :visible.sync="dialogTag"
                :before-close="handleTag">
            <!--<span slot="footer" class="dialog-footer">-->

            <template scope="scope">
                <el-checkbox-group v-model="TagId" @change="selected()">
                    <el-checkbox v-for="item in Tag" :label="item.id" :key="item.id" border>{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </template>
            <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="addTagNmae">确 定</el-button>
  </span>
        </el-dialog>


        <!--分页-->
        <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="this.size"
                :page-count="this.page"
        >
        </el-pagination>


    </div>
</template>

<script>
    export default {
        name: "fanslist",
        data() {
            return {
                fans: [],
                total: 0,
                size: 0,
                page: 0,
                dialogVisibox: false,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                dialogTag: false,
                Tag: [],
                checked3: true,
                userId: '',
                checkList: [],
                TagId: [],//用户已有标签
                options: [{
                    value: '',
                    label: '全部粉丝'
                }, {
                    value: '1',
                    label: '已关注'
                }, {
                    value: '0',
                    label: '已取关'
                }],
                value: '',
                state: '',
                fanTag: [],//粉丝标签
                username: '',//搜索用户名
                searchState: '',//搜索状态
                searchTagId: '',//搜索标签ID
                loading: true

            }
        },
        methods: {
            //根据状态搜索
            stateFans: function (value) {
                console.log(value)
                this.searchState = value;
            },
            //根据标签搜索
            tagFans: function (value) {
                console.log(value)
                this.searchTagId = value
            },

            //搜索按钮
            search: function () {
                this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {
                        size: 5,
                        nickname: this.username,
                        subscribe: this.searchState,
                        tag: this.searchTagId

                    }
                }).then(res => {
                    // this.fans.length==0;
                    this.fans = res.data.data
                    this.loading = false
                })

            },
            //关闭添加标签页
            handleTag(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //打开添加标签页
            a: function (val) {
                this.dialogTag = true;
                this.userId = val.id

                console.log(val)
                //保存用户已有的标签
                for (var i = 0; i < val.tag.length; i++) {
                    this.TagId.push(val.tag[i].id)
                }
                console.log(this.TagId)
                this.$http.get('http://jiajiachuang.cn/junran/manage/user/usertag/list', {
                    headers: {
                        token: this.$cookies.get('token')
                    }
                }).then(res => {
                    console.log(res.data)
                    this.Tag = res.data.rs
                })


            },
            //给用户添加标签
            addTagNmae: function () {

                this.$http.post('http://jiajiachuang.cn/junran/manage/user/updateTag', JSON.stringify({
                    ids: this.TagId,
                    state: this.userId
                }), {
                    headers: {
                        token: this.$cookies.get('token')
                    }
                }).then(res => {
                    alert('修改成功')
                    window.location.reload()

                })


            },

            selected: function () {
                if (this.TagId.length > 5) {
                    alert('最多只能添加五个标签')
                }
            },
            //分页
            handleCurrentChange: function (val) {
                this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: 5,
                        page: val - 1
                    }

                }).then(res => {
                    console.log(res.data)
                    this.fans = res.data.data
                    this.size = res.data.size
                    this.page = res.data.pageCount
                    console.log(this.fans)
                })

            },
            //关闭添加标签面板
            handleClosebox(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //删除标签
            handleClose(tag, id) {

                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                // this.$http.post('http://jiajiachuang.cn/junran/manage/user/usertag/upsert',JSON.stringify({id:id}),{
                //     headers: {
                //         token: this.$cookies.get('token')
                //     },
                //
                // }).then(res => {
                //     console.log(res.data)
                //
                //
                // })
            },
            //添加标签
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();

                });
            },
            //焦点离开文本框事件
            handleInputConfirm() {
                let inputValue = this.inputValue;
                console.log(this.dynamicTags)
                var val = JSON.stringify({name: inputValue})
                this.$http.post('http://jiajiachuang.cn/junran/manage/user/usertag/upsert', val,
                    {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.dynamicTags.push({name: inputValue});
                    } else {
                        alert(res.data.message)
                    }

                })

                this.inputVisible = false;
                this.inputValue = '';
            },
            optag: function () {

                this.$http.get('http://jiajiachuang.cn/junran/manage/user/usertag/list', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                }).then(res => {
                    console.log(res.data)

                    this.dynamicTags = res.data.rs
                    console.log(this.dynamicTags)

                })
                this.dialogVisibox = true
            },
            //修改标签
            inputUpdata: function (id, e) {
                var tagName = e.target.value

                this.$http.post('http://jiajiachuang.cn/junran/manage/user/usertag/upsert', JSON.stringify({
                        "id": id,
                        "name": tagName
                    }),
                    {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                    console.log(res.data)
                })
            }
        },
        created: function () {
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {
                    token: this.$cookies.get('token')
                },
                params: {
                    size: 5
                }

            }).then(res => {
                console.log(res.data.data)
                this.fans = res.data.data
                this.size = res.data.size
                this.page = res.data.pageCount
                var data = res.data.data
                this.loading = false
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].tag.length; j++) {
                        this.fanTag.push({id: data[i].tag[j].id, name: data[i].tag[j].name})
                    }
                }
                console.log(this.fanTag)


            })
        }
    }
</script>

<style scoped>
    img {
        width: 45%;
        height: auto
    }

    .username {
        width: 20%
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>