<template>
    <div class="index">
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
                <i class="iconfont-header icon-search"></i>
                <input type="text" placeholder="搜索">
            </div>
            <div class="mic"><i class="iconfont-header icon-mic-on"></i></div>
            <div class="user-bar">
                <div class="userInfo">
                    <img src="../assets/vue.svg" alt="#">
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
        <div class="main">
            <div class="main-menu" @mouseenter="enterMainMenu" @mouseleave="leaveMainMenu">
                <ul style="margin-top: 12px;">
                    <li class="main-menu-item" v-for="item, index in menuList1" :class="[{ 'selected': selected(index) },
                    (hoverIndex == index) ? 'is-hover' : '',
                    itemStyles[index]]" :key="item.path" @click="clickMainMenuItem(index),menuChange(item)"
                        @mouseenter="enterMainMenuItem(index)"
                        @mouseleave="leaveMainMenuItem(index)"
                        >
                        {{ item.meta.text }}
                    </li>
                </ul>
                <div class="main-menu-item my-music">我的音乐</div>
                <ul>
                    <li>
                    <li class="main-menu-item iconfont" v-for="item, index in menuList2" :class="[{ 'selected': selected(index + menuList1.length) },
                    (hoverIndex == index + menuList1.length) ? 'is-hover' : '',
                    itemStyles[index + menuList1.length]]" :key="item.path"
                        @click="clickMainMenuItem(index + menuList1.length)"
                        @mouseenter="enterMainMenuItem(index + menuList1.length)"
                        @mouseleave="leaveMainMenuItem(index + menuList1.length)">

                        <i class="iconfont"></i><span style="margin-left: 5px;">{{ item.meta.text }}</span>
                    </li>
                    </li>
                </ul>
            </div>
            <div class="main-detail">
                <router-view></router-view>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute, RouteRecordNormalized } from 'vue-router';
import { noLogging } from '../request/api';
const router = useRouter()
const route = useRoute()
noLogging()
const menuList1 = router.getRoutes().filter((item) => item.meta.belong == "mainMenuListTop")
const menuList2 = router.getRoutes().filter((item) => item.meta.belong == "mainMenuListBottom")
//header
const logoClick = () => {
    router.push({
        path:'/found'
    })
    selectedIndex.value = 0
}
//main-menu
let isScroll: boolean = false
let scrollStyle = ref('hidden')
let hoverStyle = ref('#fff')
const enterMainMenu = () => {
    isScroll = true
    scrollStyle.value = isScroll ? 'scroll' : 'hidden'
}
const leaveMainMenu = () => {
    isScroll = false
    scrollStyle.value = isScroll ? 'scroll' : 'hidden'
}
const menuChange = (item:RouteRecordNormalized)=>{
    router.push(item)
}
//main-menu-item
let itemStyles: string[] = [
    '', //发现音乐
    '', //播客
    '', //视频
    '', //关注
    '', //私人FM
    'icon-favorite', //我喜欢的音乐
    'icon-local', //本地与下载
    'icon-currently', //最近播放
    '', //创建的歌单
]
let selectedIndex = ref(0)
let hoverIndex = ref(-1)

const selected = (index: number) => {
    return selectedIndex.value === index
}

const clickMainMenuItem = (index: number) => {
    selectedIndex.value = index
}

const enterMainMenuItem = (index: number) => {
    hoverIndex.value = index
}
const leaveMainMenuItem = (index: number) => {
    hoverIndex.value = -1
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

.index {
    width: 1022px;
    height: 670px;
    background-color: #fff;
    border: #ececec solid 1px;
    box-shadow: 2px 2px 10px #ccc;
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

/* 中部 */
.main {
    width: 1022px;
    height: calc(100% - 60px - 72px);
    display: flex;

    &-menu {
        width: 200px;
        border-right: #ececec solid 1.5px;
        overflow-y: v-bind(scrollStyle)
    }

    &-detail {
        flex: 1;
        overflow-y: scroll;
    }
}

/* 侧边栏 */
.main-menu-item {
    width: calc(100% - 12px - 2px - 8px);
    height: 35px;
    margin-left: 12px;
    line-height: 35px;
    margin-top: 3px;
    padding-left: 8px;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    background-color: v-bind(hoverStyle);
}

.my-music {
    text-align: left;
    font-size: 12px;
    color: #8c8c8c;
    line-height: 40px;
    cursor: default;
}

.is-hover {
    background-color: #f6f6f7;
}

.is-selected {
    background-color: #f6f6f7;
}

.selected {
    background-color: #f6f6f7;
    font-weight: 700;
    font-size: 18px;
}

.footer {
    height: 72px;
    border-top: #ececec solid 1.5px;
}

.main-menu::-webkit-scrollbar {
    width: 8px;
}

.main-menu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.main-menu::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255);
}

.main-detail::-webkit-scrollbar {
    width: 8px;
}

.main-detail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.main-detail::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255);
}
</style>