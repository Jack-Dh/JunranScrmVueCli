<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--<div class="login"></div>-->

        <div class="login_back">
            <p>骏然SCRM系统</p>

            <el-input  placeholder="请输入用户名" v-model="username"></el-input>
            <el-input  placeholder="请输入密码" v-model="password" type="password"></el-input>
            <div class="login_but">
                <el-button @click="login">登录</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import index from './index'
    // @ is an alias to /src
    export default {
        name: 'home',
        data(){
          return{
              username:'',
              password:''
          }
        },
        methods: {
            login: function () {
                var username = this.username
                var password = this.password
                var resule=JSON.stringify({'username':username,'password':password})

                //请求接口，拿token
                this.$http.post('http://jiajiachuang.cn/junran/manage/login',resule).then(res=>{
                    console.log(res.data)
                    if (res.data.code==0){

                        this.$cookies.set('token',res.data.rs.token);//将token保存到cookie
                        this.$cookies.set('id',res.data.rs.operator.id)//用户id
                        this.$cookies.set('name',res.data.rs.operator.username);//将用户名保存到cookie
                        this.$cookies.set('password',res.data.rs.operator.password)//将登陆密码存到cookie
                        this.$cookies.set('createTime',res.data.rs.operator.createTime)//将添加时间
                        this.$cookies.set('nickName',res.data.rs.operator.name)//用户昵称



                        this.$router.push({path: '/Contioiner'});
                    }else {
                        alert(res.data.message)
                    }
                })
            }
        },
        components:{ //需要引用的组件
            index
        }

    }
</script>
<style>
    .home {
        background-image: url("../assets/timg.jpg");
        background-attachment: fixed;
        background-repeat: no-repeat;
        /*background-size: cover;*/
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content:center;

        align-items: center;
    }

    .login_back {
        padding: 2%;
        width: 50%;
        background: #000;
        color: #ffffff;
        filter: alpha(Opacity=60);
        -moz-opacity: 0.6;
        opacity: 0.6;
        margin-bottom: 15%;

    }

    .login_back p {
        line-height: 1rem;
        font-size: 1.5rem;
    }

    .login_back input {
        width: 75%;
        background-color: white;
        margin-bottom: 0.3rem;
    }

    .login_but button {
        width: 15%;
        background-color: bisque;
        margin-left: 60%;
        font-size: 0.12rem;
    }
</style>
