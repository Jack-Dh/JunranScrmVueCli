<template>

    <div class="indexPage">
        <h3>骏然CRM网络平台粉丝管理系统</h3>
        <h4>欢迎您！</h4>
        <h1>{{Time | filtTime}}</h1>

        <!--<div style="display: flex;justify-content:center;">-->
        <!--<div style="margin: 2%">-->
        <!--<div class="prompt">-->
        <!--<p style="background-color: red;width: 50px;height: 15px"></p>-->
        <!--<p>已取关({{attNum}})</p>-->
        <!--</div>-->
        <!--<div class="prompt">-->
        <!--<p style="background-color:#20a0ff;width: 50px;height: 15px"></p>-->
        <!--<p>已关注({{proNum}})</p>-->
        <!--</div>-->
        <!--<div class="prompt">-->
        <!--<p style="background-color:green;width: 50px;height: 15px"></p>-->
        <!--<p>总人数({{peopleNum}})</p>-->
        <!--</div>-->

        <!--</div>-->


        <!--<div style="display: flex;justify-content: space-around;width: 50%;align-items: center">-->
        <!--<el-progress type="circle" :percentage="attention" color="red"></el-progress>-->
        <!--<el-progress type="circle" :percentage="Focus" color="#20a0ff"></el-progress>-->
        <!--<el-progress type="circle" :percentage="100" color="green"></el-progress>-->

        <!--</div>-->
        <!--</div>-->

        <!--图表数据-->
        <div id="myChart" :style="{width: '50%',height:'300px'}"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                Focus: 0,//已关注%
                attention: 0,//取关人数%
                peopleNum: 0,//全部人数%
                Time: new Date(),
                attNum: 0,//取关
                proNum: 0,//关注
            }
        },
        filters: {
            //时间格式过滤器

            filtTime: function (input) {
                var d = new Date();
                var year = d.getFullYear() < 10 ? '0' + d.getFullYear() : d.getFullYear();//年
                var month = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1;//月
                var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();//日
                var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();//时
                var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();//分
                var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();//秒
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: ["已关注", "未关注", "全部",]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '数量',
                            type: 'bar',
                            data: [this.Focus,this.attention,this.peopleNum]
                        }
                    ]

                });

            }
        },
        created() {
            let that = this
            setInterval(function () {
                that.Time = new Date()
            }, 1000);


            this.lastTime = new Date().getTime();   //网页第一次打开时，记录当前时间
            //全部人数


            //关注人数
            this.$axios.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999, subscribe: 1}
            }).then(res => {
                this.Focus=res.data.count
            })

            //全部人数
            this.$axios.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999}
            }).then(res => {
                this.peopleNum=res.data.count

            })

            //取注人数
            this.$axios.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999, subscribe: 0}
            }).then(res => {
                this.attention = res.data.count

            })

            console.log(this.series)
            // Focus:0,//已关注
            //     attention:0,//取关人数
            //     Num:0,//全部人数


        }
    }
</script>

<style scoped>

</style>



