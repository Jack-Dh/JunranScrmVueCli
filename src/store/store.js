import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        login:'http://jiajiachuang.cn/junran/manage/login',//用户登录
        useractivity:'http://jiajiachuang.cn/junran/manage/useractivity/search',//活动审核列表
        ActivitiesThrough:'http://jiajiachuang.cn/junran/manage/useractivity/pass',//活动通过
        ActivityDeclinedTo:'http://jiajiachuang.cn/junran/manage/useractivity/reject',//活动拒绝
        AddActivity:'http://jiajiachuang.cn/junran/manage/activity/upsert',//添加活动
        RedpackList:'http://jiajiachuang.cn/junran/manage/redpack/list',//红包列表
        amendActivity:'http://jiajiachuang.cn/junran/manage/activity/upsert',//修改活动
        ActivityList:'http://jiajiachuang.cn/junran/manage/activity/search',//活动列表
        ActiveState:'http://jiajiachuang.cn/junran/manage/activity/able',//活动状态（开启，关闭）
        SendingRedEnvelope:'http://jiajiachuang.cn/junran/manage/useractivity/sendRedPack',//发送红包
        AddRedpack:'http://jiajiachuang.cn/junran/manage/redpack/upsert',//添加红包（修改）
        redpackList:'http://jiajiachuang.cn/junran/manage/redpack/search',//红包列表（搜索，分页）
        redpackState:'http://jiajiachuang.cn/junran/manage/redpack/able',//红包状态（开启，关闭）
        addAdmin:'http://jiajiachuang.cn/junran/manage/operator/upsert',//添加管理员（修改）
        AdminList:'http://jiajiachuang.cn/junran/manage/operator/search',//管理员列表（搜索，分页）
        operatorlog:'http://jiajiachuang.cn/junran/manage/operatorlog/search',//操作日志列表
        wxsetting:'http://jiajiachuang.cn/junran/manage/wxsetting/get',//微信设置，页面初始化拿到的数据
        wxSave:'http://jiajiachuang.cn/junran/manage/wxsetting/upsert',//微信设置成功后保存至自己服务器
        wxsettingRefresh:'http://jiajiachuang.cn/junran/manage/wxsetting/refreshMenus',//微信刷新接口
        fensiList:'http://jiajiachuang.cn/junran/manage/user/search',//粉丝列表
        usertagList:'http://jiajiachuang.cn/junran/manage/user/usertag/list',//标签列表

        addTag:'http://jiajiachuang.cn/junran/manage/user/updateTag',//给用户添加或移除标签
        upTag:'http://jiajiachuang.cn/junran/manage/user/usertag/upsert',//修改标签

    },

})