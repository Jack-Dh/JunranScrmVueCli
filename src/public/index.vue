<template>

    <div class="indexPage">
        <div style="width: 50%">
            <h3>骏然CRM网络平台粉丝管理系统</h3>
            <h4>欢迎您！</h4>
            <h1>{{Time | filtTime}}</h1>
        </div>


        <!--图表数据-->
        <div id="myChart"></div>
    </div>
</template>

<script>
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/pie');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');


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
        methods: {

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    // xAxis: {
                    //     data: ["已关注", "已取关", "全部",]
                    // },
                    // yAxis: {},

                    series: [
                        {
                            name: '粉丝数量',
                            type: 'pie',
                            data: [
                                {'name': '已关注', value: this.Focus}, {name: '已取关', value: this.attention}, {
                                    name: '全部粉丝',
                                    value: this.peopleNum
                                }
                            ]
                        }
                    ]

                });

            }
        },
        beforeUpdate() {
            this.drawLine();
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
                this.Focus = res.data.count
            })

            //全部人数
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
                headers: {token: this.$cookies.get('token')},
                params: {size: 999999}
            }).then(res => {
                this.peopleNum = res.data.count

            })

            //取注人数
            this.$http.get('http://jiajiachuang.cn/junran/manage/user/search', {
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
    .indexPage {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    #myChart {
        height: 300px;
        width: 50%;
        display: flex;
        justify-content: center;
    }
</style>



