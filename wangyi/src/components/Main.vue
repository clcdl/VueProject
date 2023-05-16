<template>
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
</template>

<script setup lang="ts">
import { ref, reactive, computed,onMounted, provide } from 'vue';
import { useRouter, useRoute, RouteRecordNormalized } from 'vue-router';
const router = useRouter()
const route = useRoute()
//main-menu
const menuList1 = router.getRoutes().filter((item) => item.meta.belong == "mainMenuListTop")
const menuList2 = router.getRoutes().filter((item) => item.meta.belong == "mainMenuListBottom")
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