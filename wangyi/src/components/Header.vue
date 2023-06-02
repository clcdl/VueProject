<template>
        <div class="header">
            <div class="header-logo" style="width: 200px;">
                <img @click="logoClick()" src="../assets/logo.jpeg" alt=""
                    style="width: 180px;height: 60px; cursor: pointer; margin-right: 30px;">
            </div>
            <div class="arrow-box">
                <div class="arrow-border">
                    <span><i class="iconfont-header icon-arrow-left"></i></span>
                    <span style="margin-left: 10px;"><i class="iconfont-header icon-arrow-right"></i></span>
                </div>
            </div>
            <div class="search">
                <i class="iconfont-header icon-search" @click="search(keywords)"></i>
                <input v-model="keywords" type="text" :placeholder="placeHolder">
            </div>
            <div class="mic"><i class="iconfont-header icon-mic-on"></i></div>
            <div class="user-bar">
                <div class="userInfo">
                    <img src="" alt="#">
                    <span>未登录</span>
                    <ul>
                        <li><i class="iconfont-header icon-theme"></i></li>
                        <li><i class="iconfont-header icon-setting"></i></li>
                        <li><i class="iconfont-header icon-letter"></i></li>
                        <li class="vertical_bar"></li>
                        <li><i class="iconfont-header icon-MINIMIZE"></i></li>
                        <li><i class="iconfont-header icon-minimize"></i></li>
                        <li><i class="iconfont-header icon-maximize"></i></li>
                        <li><i class="iconfont-header icon-close"></i></li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import { useRouter, useRoute,  } from 'vue-router';
import { logStatus,getSearch,getAssociate,getDefaultKeyWord } from '../request/api';
import { HotSearch} from '../type/search'
onMounted(()=>{
    getDefaultKeyWordData()
    console.log(keywords.value)
})
const router = useRouter()
const route = useRoute()
const logoClick = () => {
    router.push({
        path:'/found'
    })
    //selectedIndex.value = 0

    logStatus().then(res=>{
        console.log(res.data)
    })
}
//搜索框
const keywords = ref('')
const placeHolder = ref('default')
const hotSearchData = reactive(new HotSearch())
const getDefaultKeyWordData = ()=>{
    getDefaultKeyWord().then(res=>{
        hotSearchData.list = res.data.result.hots
        placeHolder.value = hotSearchData.list[0].first
    })
}
const search = (keywords:string)=>{
    router.push({
        name: "/search",
        query:{keywords:keywords}
    })
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}
/* 头部 */
.header {
    background-color: #e20000;
    opacity: 88%;
    height: 60px;
    display: flex;

}

.arrow-box {
    display: flex;
    justify-content: space-around;
    width: 100px;
    text-align: center;
    line-height: 60px;
}

.arrow-box span {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 5px 5px;
}

.search {
    height: 20px;
    background-color: rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    border-radius: 30px;
    padding: 7px;
    margin-right: 10px;
    margin-top: 13px;
}

.search input {
    background-color: transparent;
    border: 0;
    height: 30px;
    line-height: 15px;
    width: 130px;
    outline: none !important;
    color: #fff;
    margin-left: 5px;
}

.mic {
    line-height: 60px;
}

.user-bar {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 100%;
    width: 500px;
    margin-left: 80px;
}

.user-bar .userInfo {
    display: flex;
    align-items: center;
}

.user-bar .userInfo img {
    margin-right: 10px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
}

.user-bar .userInfo span {
    margin-right: 60px;
    color: aliceblue;
    font-size: 10px;
}

.user-bar ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.user-bar ul .vertical_bar {
    width: 1px;
    height: 20px;
    background-color: #464648;
}

.user-bar ul li {
    margin-right: 20px;
}
</style>