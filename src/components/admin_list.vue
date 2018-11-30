<template>
    <div class="admin_list">
        <template>
            <div style="text-align: left;padding:0.5%" ref="topHeight">
                <el-input style="width: 20%" v-model="adminName" placeholder="根据用户名搜索" v-if="showAdd" @keyup.enter.native="search"></el-input>
                <el-button @click="search" v-if="showAdd">搜索</el-button>
                <el-button @click="addAdmin=true" v-if="showAdd">添加</el-button>
            </div>
            <el-dialog
                    title="添加管理员"
                    :visible.sync="addAdmin"
                    width="30%"
                    :before-close="handleClose">
                <el-upload
                        class="avatar-uploader"
                        action="http://jiajiachuang.cn/junran/manage/keUpload"
                        name="imgFile"
                        :headers="myheaders"
                        :on-success="handleAvatarSuccess"
                        title="添加头像"
                       >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
 <el-input v-model="addname" style="margin: 1%" placeholder="用户账号（登录账号）"></el-input>
                <el-input v-model="addusername" style="margin: 1%" placeholder="用户昵称"></el-input>
                <el-input v-model="addpassword" style="margin: 1%" placeholder="用户密码"></el-input>
                <el-input v-model="addpasswords" style="margin: 1%" placeholder="确认密码"></el-input>
                <el-button style="margin: 1%" @click="addAdmin = false">取 消</el-button>
                <el-button style="margin: 1%" type="primary" @click="addadmin">确 定</el-button>

            </el-dialog>
            <el-table
                    :data="intel"
                    style="width: 100%;"
                    v-loading="loading"
                    ref="table"
                    class="tableSty"

            >
                <el-table-column
                        prop="createTime"
                        label="添加时间"
                        align="center"
                >
                </el-table-column>

                <el-table-column
                label="用户头像"
                align="center"
                >
                    <template slot-scope="scope">
                        <img style="width: 65px;height: 65px" :src="'http://'+scope.row.icon"/>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="昵称"

                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="账号"
                        align="center"

                >
                </el-table-column>

                <el-table-column
                        label="操作"
                        align="center"

                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="handleClick(scope.row),dialogVisible = true,update">
                            修改
                        </el-button>
                    </template>

                </el-table-column>
            </el-table>
        </template>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="280"
                :before-close="handleClose"
        >

            <el-upload
                    class="avatar-uploader"
                    action="http://jiajiachuang.cn/junran/manage/keUpload"
                    name="imgFile"
                    :headers="myheaders"
                    :on-success="UpSuccess"
                    title="修改用户头像"
            >
                <img v-if="upimageUrl" :src="upimageUrl" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input :value="name" v-model="name" placeholder="请输入昵称"></el-input>
            <el-input :value="username" v-model="username" placeholder="请输入账号"></el-input>
            <el-input :value="password" v-model="password" placeholder="请输入密码" type="password"></el-input>
            <el-input v-model="Confirmpassword" placeholder="确认密码" type="password"></el-input>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="yes">确 定</el-button>
  </span>
        </el-dialog>
        <div class="block" ref="pageheight">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next"
                    :total="this.count"
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
                count:0,
                id: 0,
                name: '',
                username: '',
                password: '',
                Confirmpassword:'',//确认密码
                dialogVisible: false,
                adminName: '',
                addAdmin: false,
                addname: '',
                addusername: '',
                addpassword: '',
                addpasswords: '',
                showAdd: true,//判断登录员身份，是否显示添加管理员按钮
                loading: true,
                tableHeight: 0,//表格高度
                topHeight: 0,//搜索栏高度
                pageheight: 0,//分页高度
                adminImg:'',//新增传给接口的图片
                myheaders:'',//请求头
                imageUrl:'',//新增上传管理员头像地址
                upimageUrl:'',//修改管理员头像地址
                upDataImg:'',//修改传给接口的图片
            }
        },
        methods: {

            //添加管理员头像
            handleAvatarSuccess:function(res,file){
                this.imageUrl = URL.createObjectURL(file.raw);
                // this.upimageUrl=URL.createObjectURL(file.raw);
                this.adminImg=res.url

            },
            //修改管理员头像
            UpSuccess:function(res,file){
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.upimageUrl=URL.createObjectURL(file.raw);
                this.upDataImg=res.url

            },

            //确定添加管理员
            addadmin: function () {
                this.addAdmin = false
                if (this.addpassword != this.addpasswords) {
                    alert('两次密码输入不一致')
                } else {
                    let data={
                        name: this.addname,
                        password: this.addpassword,
                        username: this.addusername,
                        icon:this.adminImg}

                    this.$axios.post('http://jiajiachuang.cn/junran/manage/operator/upsert',data,{
                        headers: {token:this.$cookies.get('token')}
                    }).then(res => {
                        if (res.data.code == 0) {
                            alert('添加成功！')
                            window.location.reload()
                        }
                    })
                }


            },
            //搜索按钮
            search: function () {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {token: this.$cookies.get('token')},
                    params: {
                        size: 8,
                        username: this.adminName
                    }
                }).then(res => {
                    this.intel = res.data.data
                    this.count=res.data.count
                })


            },
            handleCurrentChange: function (val) {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: 8,
                        page: val - 1,
                        username: this.adminName
                    }
                }).then(res => {
                    this.intel = res.data.data
                    this.pageCount = res.data.pageCount
                    this.size = res.data.size

                })

            },

            //修改管理员信息
            update: function (id, name, username) {
                this.id = id
                this.name = name
                this.username = username
            },
            yes: function () {
                let name = this.name
                let username = this.username
                let id = this.id
                let pass = this.password
                let ConPass=this.Confirmpassword
                let icon=this.upDataImg
                let data = {name: name, username: username, id: id, password: pass,icon:icon};
                if (name == '' || username == '' || pass == ''||ConPass=='') {
                    alert('信息填写不完全')
                }else if (pass!==ConPass){
                    alert('两次输入不一致')
                }else {
                    this.$axios.post('http://jiajiachuang.cn/junran/manage/operator/upsert', data, {
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

                this.id = a.id;
                this.name = a.name;
                this.username = a.username;
                this.upimageUrl='http://'+a.icon

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
            this.myheaders={token:this.$cookies.get('token')}
            if (name != 'admin') {
                this.showAdd = false
                var adminData = [{
                    createTime: this.$cookies.get('createTime'),
                    name: this.$cookies.get('nickName'),
                    // password: this.$cookies.get('password'),
                    // password:this.$store.state.password,
                    id: this.$cookies.get('id'),
                    icon:this.$cookies.get('icon'),
                    username: name,
                }]
                this.intel = adminData
                this.loading = false
            } else {
                this.$axios.get('http://jiajiachuang.cn/junran/manage/operator/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: 8
                    }
                }).then(res => {
                    this.intel = res.data.data
                    this.pageCount = res.data.pageCount
                    this.size = res.data.size
                    this.count=res.data.count
                    this.loading = false




                })
            }

        },

    }
</script>


<style scoped>
    .admin_list {
        width: 100%;
    }

.tableSty{
    /*height: calc(100vh - 260px);*/
    /*overflow: auto;*/
    height: 100%;
}
    /*.avatar-uploader{border: 1px dashed #d9d9d9;width: 45%}*/
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>