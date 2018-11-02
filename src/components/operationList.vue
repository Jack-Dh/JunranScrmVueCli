<template>
    <div style="height: 100vh">

        <template>
            <el-table
                    :data="oper"
                    style="width: 100%"
                    >

                <el-table-column
                        prop="module"
                        label="操作模块"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作描述"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="操作时间"
                width="300"
                >
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作内容"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operatorName"
                        label="操作人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="IP">
                </el-table-column>
            </el-table>
        </template>


        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next,jumper"
                    :total="total"
                    :page-size="this.size"
                    :current-page='currentPage'
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>

    export default {
        name: "operationList",
        val: 0,
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页:` + val);
                this.val = val

                this.$http.get('http://jiajiachuang.cn/junran/manage/operatorlog/search', {
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    params: {
                        size: 10,
                        page: this.val - 1
                    }
                }).then(res => {
                    console.log(res.data)
                    this.oper = res.data.data
                    this.size = res.data.size
                    this.total = res.data.count
                    this.page = res.data.page
                    console.log(this.oper)
                })


            }
        },
        data: function () {
            return {
                oper: [],
                total: 0,
                size: 0,
                page: 0,
                currentPage: 1

            }
        },
        created: function () {
            this.$http.get('http://jiajiachuang.cn/junran/manage/operatorlog/search', {
                headers: {
                    token: this.$cookies.get('token')
                },
                params: {
                    size: 10,
                    page: this.val
                }
            }).then(res => {
                console.log(res.data)
                this.oper = res.data.data
                this.size = res.data.size
                this.total = res.data.count
                this.page = res.data.page
                console.log(this.oper)
            })

        },


    }

</script>

<style scoped>

</style>