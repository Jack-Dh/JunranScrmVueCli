<template>

    <div class="home">

        <div class="login layui-anim layui-anim-up">
            <div class="message">骏然CRM系统</div>
            <div id="darkbannerwrap"></div>


            <div>
                <el-input prefix-icon="fontFamily hhtx-zhanghao" placeholder="请输入用户名" @keyup.enter.native="login"
                          v-model="username"></el-input>
                <el-input style="margin-top: 5%" prefix-icon="fontFamily hhtx-mima" placeholder="请输入密码" @keyup.enter.native="login"
                          v-model="password" type="password"></el-input>
                <div>
                    <el-button style="background: #189F92;width: 100%;color: #ffffff;margin-top: 5%;font-size: 1rem" @click="login">登录</el-button>
                </div>
            </div>

        </div>












    </div>
</template>
<script>
    import index from './index'
    // @ is an alias to /src
    export default {
        name: 'home',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                let username = this.username
                let password = this.password
                let resule={'username': username, 'password': password}

                //请求接口，拿token
                this.$axios.post(this.$store.state.login, resule).then(res => {
                    if (res.data.code == 0) {
                        this.$cookies.set('token', res.data.rs.token);//将token保存到cookie
                        this.$cookies.set('id', res.data.rs.operator.id)//用户id
                        this.$cookies.set('name', res.data.rs.operator.username);//将用户名保存到cookie
                        this.$cookies.set('password',this.$md5(res.data.rs.operator.password))//将登陆密码存到cookie(加密)
                        this.$cookies.set('createTime', res.data.rs.operator.createTime)//将添加时间
                        this.$cookies.set('nickName', res.data.rs.operator.name)//用户昵称
                        this.$cookies.set('icon', res.data.rs.operator.icon)
                        // this.$store.state.token=res.data.rs.token //将数据写在vuex
                        this.$store.state.password=res.data.rs.operator.password
                        this.$router.push({path: '/Contioiner'});

                    } else {
                        alert(res.data.message)
                    }
                })
            }
        },
        components: { //需要引用的组件
            index
        }

    }
</script>
<style>
    /*.home {*/
        /*background-image: url("../assets/bg.png");*/
        /*background-attachment: fixed;*/
        /*background-repeat: no-repeat;*/
        /*!*background-size: cover;*!*/
        /*width: 100%;*/
        /*height: 100vh;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/

        /*align-items: center;*/
    /*}*/

    html,body{
        width: 100%;
        height: 100%;
        overflow-x:hidden;
        overflow-y:auto;
        margin: 0;
        padding:0;
    }
    /*body{*/
        /*width: 100%;*/
       /*height: 100%;*/
    /*}*/

    .home{
        background:url(../assets/bg.png) no-repeat center;
        background-size: cover;
        overflow: hidden;
        width: 100%;
        height: 100%;


    }
    .login{
        margin: 120px auto 0 auto;
        min-height: 420px;
        max-width: 420px;
        padding: 40px;
        background-color: #ffffff;
        margin-left: auto;
        margin-right: auto;
        border-radius: 4px;
        /* overflow-x: hidden; */
        box-sizing: border-box;
    }
    .login a.logo{
        display: block;
        height: 58px;
        width: 167px;
        margin: 0 auto 30px auto;
        background-size: 167px 42px;
    }
     .message {
        margin: 10px 0 0 -58px;
        padding: 18px 200px 18px 20px;
        background: #189F92;
        position: relative;
        color: #fff;
        font-size: 16px;
    }
     #darkbannerwrap {
        background: url(../assets/aiwrap.png);
        width: 18px;
        height: 10px;
        margin: 0 0 20px -58px;
        position: relative;
    }




    /*.login_back {*/
        /*padding: 2%;*/
        /*width: 20%;*/
        /*background: #000;*/
        /*color: #ffffff;*/
        /*filter: alpha(Opacity=60);*/
        /*-moz-opacity: 0.6;*/
        /*opacity: 0.6;*/
        /*margin-bottom: 15%;*/

    /*}*/

    /*.login_back p {*/
        /*line-height: 1rem;*/
        /*font-size: 1.5em;*/
    /*}*/

    /*.login_back input {*/

        /*background-color: white;*/
        /*margin-bottom: 0.3rem;*/
    /*}*/

    /*.login_but button {*/
    /*width: 15%;*/
    /*background-color: bisque;*/
    /*margin-left: 60%;*/
    /*font-size: 0.12rem;*/
    /*}*/
</style>
