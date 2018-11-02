<template>
    <div class="admin_list">
        <template>
            <div style="text-align: left;padding:0.5%">
                <el-input style="width: 20%" v-model="adminName" placeholder="根据用户名搜索"></el-input>
                <el-button @click="search">搜索</el-button>
                <el-button @click="addAdmin=true" v-if="showAdd">添加</el-button>
            </div>


            <el-dialog
                    title="添加管理员"
                    :visible.sync="addAdmin"
                    width="30%"
                    :before-close="handleClose">
                <el-input v-model="addname" style="margin: 1%" placeholder="用户账号（登录账号）"></el-input>
                <el-input v-model="addusername" style="margin: 1%" placeholder="用户昵称"></el-input>
                <el-input v-model="addpassword" style="margin: 1%" placeholder="用户密码"></el-input>
                <el-input v-model="addpasswords" style="margin: 1%" placeholder="确认密码"></el-input>

                <el-button style="margin: 1%" @click="addAdmin = false">取 消</el-button>
                <el-button style="margin: 1%" type="primary" @click="addadmin">确 定</el-button>

            </el-dialog>


            <el-table
                    :data="intel"
                    height="800"
                    v-loading="loading"

                    style="width: 100%"

            >
                <el-table-column
                        prop="createTime"
                        label="添加时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="昵称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="账号">
                </el-table-column>
                <el-table-column
                        prop="password"
                        label="密码">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row),dialogVisible = true,update">
                            修改
                        </el-button>
                    </template>

                </el-table-column>
            </el-table>
        </template>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <!--<span>这是一段信息</span>-->
            <el-input :value="name" v-model="name" placeholder="请输入昵称"></el-input>
            <el-input :value="username" v-model="username" placeholder="请输入账号"></el-input>
            <el-input :value="password" v-model="password" placeholder="请输入密码" type="password"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="yes">确 定</el-button>
  </span>
        </el-dialog>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-count="this.pageCount"
                    :page-size="this.size">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {
        name: "admin_list",
        data() {
            return {
                intel: [],
                pageCount: 0,
                size: 0,
                id: 0,
                name: '',
                username: '',
                password: '',
                dialogVisible: false,
                adminName: '',
                addAdmin: false,
                addname: '',
                addusername: '',
                addpassword: '',
                addpasswords: '',
                showAdd: true,//判断登录员身份，是否显示添加管理员按钮
                loading:true

            }
        },
        methods: {
            //确定添加管理员
            addadmin: function () {
                this.addAdmin = false
                if (this.addpassword != this.addpasswords) {
                    alert('两次密码输入不一致')
                } else {
                    this.$http.post('http://jiajiachuang.cn/junran/manage/operator/upsert', JSON.stringify({
                        name: this.addname,
                        password: this.addpassword,
                        username: this.addusername
                    }), {
                        headers: {token: this.$cookies.get('token')}
                    }).then(res => {
                        if (res.data.code == 0) {
                            alert('添加成功！')
                            window.location.reload()
                        } else if (res.data.code == 103) {
                            alert('身份验证过期，请重新登录！')
                            this.$router.push('./')
                        }
                    })
                }


            },
            //搜索按钮
            search: function () {
                this.$http.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {
                        size: 15,
                        username: this.adminName
                    }
                }).then(res => {
                    console.log(res.data)
                    this.intel = res.data.data
                })


            },
            handleCurrentChange: function (val) {
                console.log(val)

                this.$http.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: '15',
                        page: val - 1
                    }
                }).then(res => {
                    console.info(res.data)

                    this.intel = res.data.data
                    this.pageCount = res.data.pageCount
                    this.size = res.data.size
                    console.log(this.intel)
                })

            },

            //修改管理员信息
            update: function (id, name, username) {
                console.log(id)
                this.id = id
                this.name = name
                this.username = username
                console.log(name)
                console.log(username)

            },
            yes: function () {
                var name = this.name
                var username = this.username
                var id = this.id
                var pass = this.password
                var data = JSON.stringify({name: name, username: username, id: id, password: pass})


                if (name == '' || username == '' || pass == '') {
                    alert('信息填写不完全')
                } else {
                    this.$http.post('http://jiajiachuang.cn/junran/manage/operator/upsert', data, {
                        headers: {
                            token: this.$cookies.get('token')
                        },
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            alert('修改成功')
                            this.dialogVisible = false
                        }
                    })
                }


            },
            handleClick: function (a) {
                console.log(a)
                this.id = a.id;
                this.name = a.name;
                this.username = a.username;

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }


        },

        created: function () {
            var name = this.$cookies.get('name')
            if (name != 'admin') {
                this.showAdd = false

                var adminData = [{
                    createTime: this.$cookies.get('createTime'),
                    name: this.$cookies.get('nickName'),
                    password: this.$cookies.get('password'),
                    id:this.$cookies.get('id'),
                    username: name,
                }]
                this.intel = adminData
                this.loading=false
            } else {
                this.$http.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: '15'
                    }
                }).then(res => {
                    this.intel = res.data.data
                    this.pageCount = res.data.pageCount
                    this.size = res.data.size
                    this.loading=false
                    console.log(res.data.data)

                })
            }


        },
    }
</script>


<style scoped>
    .admin_list {
        width: 100%
    }
</style>