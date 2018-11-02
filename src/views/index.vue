<template>

    <div class="index">
        <div class="index_title">
            <span>骏然scrm</span>
            <span>{{name}} <span>退出</span></span>
        </div>
        <div class="box">
            <div class="menu_list">


                <p @click="one=!one,two=false,three=false">系统管理</p>
                <div v-show="one" class="menu_list_son">
                    <router-link to="/index">管理员管理</router-link>
                    <br>
                    <router-link to="/operation">操作日志</router-link>

                </div>


                <p @click="two=!two,one=false,three=false">微信管理</p>
                <div v-show="two" class="menu_list_son">
                    <p>系统管理</p>
                    <p>微信管理</p>
                    <p>活动管理</p>
                </div>

                <p @click="three=!three,two=false,one=false">活动管理</p>
                <div v-show="three" class="menu_list_son">
                    <p>系统管理</p>
                    <p>微信管理</p>
                    <p>活动管理</p>
                </div>

            </div>
            <admin_list class="admin_list"></admin_list>
        </div>


    </div>

</template>

<script>
    import admin_list from '../components/admin_list'

    export default {
        name: "index",
        data() {
            return {
                name: this.$cookies.get('name'),
                one: false,
                two: false,
                three: false
            }
        },
        components: {
            admin_list
        }

    }
</script>

<style scoped>
    ul {
        list-style: none
    }

    body, div, p, ul, li {
        padding: 0;
        margin: 0
    }

    .index_title {
        width: 99%;
        background-color: cadetblue;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5%;
    }

    .index_title span {
        margin: 0.03%
    }

    .menu_list {
        height: 95vh;
        background-color: #333645;
        color: #97a3ad;
        width: 10%;

    }

    .menu_list p {
        margin-top: 5%;
        border-bottom: 1px solid #fff;
        border-top: 1px solid #fff;
        margin: 0;
        height: 3rem;
        line-height: 3rem
    }

    .menu_list p:hover {
        background-color: greenyellow
    }

    .menu_list_son {
        width: 100%;
        background-color: #fff;
    }

   .box{display: flex;flex-direction: row}


</style>