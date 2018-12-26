<template>
    <div class="wxSet">

        <!--新增首页轮播图-->
        <el-upload
                class="addImg"
                action="http://jiajiachuang.cn/junran/manage/keUpload"
                :on-change="handleChange"
                :on-success="successData"
                :file-list="fileList3"
                name="imgFile"
                :limit="5"
                :headers="myHeaders">
            <el-button size="small" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!--走马灯轮播图设置-->
        <!--<el-carousel :interval="4000" type="card" height="200px">-->
        <!--<el-carousel-item v-for="(item,index) in imgdata" :key="item">-->
        <!--&lt;!&ndash;修改首页轮播图&ndash;&gt;-->
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action="http://jiajiachuang.cn/junran/manage/keUpload"-->
        <!--multiple-->
        <!--:limit="1"-->
        <!--:file-list="fileList"-->
        <!--:headers="myHeaders"-->
        <!--name="imgFile"-->
        <!--:on-success="successUpadate"-->
        <!--&gt;-->
        <!--<div @click="indexImg(index)"  @mouseover="mouseover" @mouseout="mouseoutImg">-->
        <!--<el-button @click.stop="removeImg" v-show="taggRemoveImg" class="removeImg" title="移除图片">移除图片</el-button>-->
        <!--<img :src="item" alt="首页轮播图" title="修改图片" >-->
        <!--</div>-->

        <!--</el-upload>-->
        <!--</el-carousel-item>-->
        <!--</el-carousel>-->


        <el-row class="imgmenu">
            <el-col :span="8" v-for="(item,index) in imgdata" :key="item" :offset="index > 0 ? 50 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <!--<img :src="item" class="image">-->
                    <el-upload
                            class="upload-demo"
                            action="http://jiajiachuang.cn/junran/manage/keUpload"
                            :limit="1"
                            multiple
                            :file-list="fileList"
                            :headers="myHeaders"
                            name="imgFile"
                            :on-success="successUpadate"
                    >
                        <img @click="indexImg(index)" :src="item" class="image">
                    </el-upload>
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <time class="time">序号：{{ index+1 }}</time>
                            <el-button type="text" @click.stop="removeImg(index)" class="button">删除图片</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>


        <div>


            <!--微信菜单设置-->
            <!--<div  v-for="item in menus" class="menus">-->

            <!--<el-input :value="item.menFirTitle"></el-input>-->
            <!--<el-input :value="item.menFirUrl"></el-input>-->
            <!---->
            <!--</div>-->


            <div class="menus">
                <div>
                    <el-dropdown split-button type="primary">
                        修改菜单信息
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in menus" :key="index"
                                              @click.native="handleClick(item.menFirTitle,item.menFirUrl,index)">
                                {{index+1}}.
                                {{item.menFirTitle}}
                            </el-dropdown-item>
                            <el-dropdown-item v-if="addmenTagg" @click.native="addMenu">添加菜单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div style="margin-left: 10%">
                    <el-input v-model="menFirTitle"></el-input>
                    <el-input v-model="menFirUrl"></el-input>
                    <el-button type="danger" @click="save" class="save">保存</el-button>

                </div>

            </div>


        </div>
    </div>
</template>
<script>
    export default {
        name: "wxSet",

        data() {
            return {
                wxdata: [],
                show: false,
                imgdata: [],
                fileList3: [],
                myHeaders: {},
                imgFile: {},
                fileList: [],
                index: '',
                taggRemoveImg: false,
                menus: [],
                menFirTitle: '',
                menFirUrl: '',
                id: '',
                addmenTagg:true,//判读是否需要添加菜单按钮

            }
        },
        methods: {
            //微信设置刷新
            wxSetShuaxin(){
                this.$axios.get(this.$store.state.wxsettingRefresh)

            },
            //保存，并提交服务器
            save() {
                    var a = {menFirTitle: this.menFirTitle, menFirUrl: this.menFirUrl}
                    if ((this.menFirTitle!=''&&this.menFirUrl=='')||(this.menFirTitle==''&&this.menFirUrl!='')){
                        alert('信息填写不完全')
                    } else {
                        if (this.menFirTitle==''&&this.menFirUrl==''){  //判断菜单是否为空，如果为空则表示删除当前菜单
                            this.menus.splice(this.index, 1)
                            let b = {
                                id: this.id,
                                bannerImages: this.imgdata,
                                menus: this.menus
                            }
                            this.$axios.post(this.$store.state.wxSave, b).then(res => {
                                if(res.data.code==0){
                                    alert('保存成功')
                                    this.wxSetShuaxin()
                                    window.location.reload()
                                }
                            })
                        } else {
                            this.menus.splice(this.index, 1, a)
                            let b ={
                                id: this.id,
                                bannerImages: this.imgdata,
                                menus: this.menus
                            }
                            this.$axios.post(this.$store.state.wxSave, b).then(res => {
                                console.log(res.data)
                                if(res.data.code==0){
                                    alert('保存成功')
                                    this.wxSetShuaxin()//调用微信刷新接口
                                    window.location.reload()
                                }
                            })
                        }
                    }
            },
            mouseover() {
                this.taggRemoveImg = true
            },
            mouseoutImg() {
                this.taggRemoveImg = false
            },

            //添加菜单
            addMenu(){
                this.menus.push({menFirTitle:"",menFirUrl:"",menuSeconds:[]})
                if (this.menus.length>=3){
                    this.addmenTagg=false
                }else {
                    this.addmenTagg=true
                }
                this.menFirTitle = '';
                this.menFirUrl = '';
                this.index = this.menus.length-1
            },


            //移除轮播图
            removeImg(index) {
                this.imgdata.splice(index, 1)
            },

            //修改图片成功后的回调
            successUpadate(updataImgUrl) {
                this.imgdata.splice(this.index, 1, 'http://' + updataImgUrl.url)
            },
            //点击图片获取当前点击图片的索引
            indexImg(index) {
                // console.log(index)
                this.index = index
                console.log(this.index)
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            //上传成功后，将后端返回的数据添加到数组
            successData(succ) {
                console.log(succ.url)
                this.imgdata.push('http://' + succ.url)
            },
            //选中菜单后编辑
            handleClick(title, url, index) {
                this.menFirTitle = title;
                this.menFirUrl = url;
                this.index = index;
            }

        },
        created: function () {
            this.myHeaders = {token: this.$cookies.get('token')}
            this.$axios.get(this.$store.state.wxsetting).then(res => {
                this.wxdata = res.data.rs
                this.imgdata = res.data.rs.bannerImages
                this.menus = res.data.rs.menus
                this.id = res.data.rs.id
                this.menFirTitle = this.menus[0].menFirTitle
                this.menFirUrl = this.menus[0].menFirUrl
                if (res.data.rs.menus.length>=3){
                    this.addmenTagg=false
                }else {
                    this.addmenTagg=true
                }

            })

        }
    }
</script>

<style scoped>
    .wxSet {
        width: 100%
    }

    .removeImg {
        width: 100%
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-carousel {
        width: 100%
    }

    img {
        width: 100%;
        height: 200px
    }

    #addImgFile_one {
        position: fixed;
        height: 100vh;
        z-index: 100;
        width: 100%;
        opacity: 0
    }

    #addImgFile {
        position: fixed;
        margin-left: 10%
    }

    .menus {
        margin-top: 1%;
        margin-left: 5px;
        display: flex;
        flex-direction: row;
        /*justify-content:space-around;*/
        align-content: center;
    }
.save{
    margin-top: 1%;
    margin-left: 80%;
}
    /*.menus div{float: left}*/

    .addImg {
        text-align: left;
        margin: 5px;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }


</style>