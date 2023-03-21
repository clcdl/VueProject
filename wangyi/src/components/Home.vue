<template>
    <div class="index">
        <div class="header">
            <div class="header-logo" style="width: 200px;">
                <img @click="logoClick" src="../assets/logo.jpeg" alt=""
                    style="width: 180px;height: 60px; cursor: pointer; margin-right: 30px;">
            </div>
        </div>
        <div class="main">
            <div class="main-menu" @mouseenter="enterMainMenu" @mouseleave="leaveMainMenu">
                <ul style="margin-top: 12px;">
                    <li class="main-menu-item" v-for="item, index in menuList1" :class="[{ 'selected': selected(index) },
                    (hoverIndex == index) ? 'is-hover' : '',
                    itemStyles[index]]" key="item.path" @click="clickMainMenuItem(index)"
                        @mouseenter="enterMainMenuItem(index)" @mouseleave="leaveMainMenuItem(index)">

                        {{ item.meta.text }}
                    </li>
                </ul>
                <div class="main-menu-item my-music">我的音乐</div>
                <ul>
                    <li>
                    <li class="main-menu-item iconfont"
                    v-for="item, index in menuList2" 
                    :class="[{ 'selected': selected(index + menuList1.length) },
                    (hoverIndex == index + menuList1.length) ? 'is-hover' : '',
                    itemStyles[index + menuList1.length]]" key="item.path"
                        @click="clickMainMenuItem(index + menuList1.length)"
                        @mouseenter="enterMainMenuItem(index + menuList1.length)"
                        @mouseleave="leaveMainMenuItem(index + menuList1.length)">

                        <i class="iconfont"></i><span style="margin-left: 5px;">{{ item.meta.text }}</span>
                    </li>
                    </li>
                </ul>
            </div>
            <div class="main-detail">

            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()

const menuList1 = router.getRoutes().filter((item, index) => index < 6)
const menuList2 = router.getRoutes().filter((item, index) => index > 6 && index < 15)

//header
const logoClick = ()=>{
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
//main-menu-item
let itemStyles: string[] = [
    '', //发现音乐
    '', //播客
    '', //视频
    '', //关注
    '', //直播
    '', //私人FM
    'icon-favorite', //我喜欢的音乐
    'icon-local', //本地与下载
    'icon-currently', //最近播放
    'icon-clouddisk', //我的音乐云盘
    'icon-mypodcast', //我的播客
    'icon-collected', //我的收藏
    '', //创建的歌单
    '', //收藏的歌单
]
let selectedIndex = ref(-1)
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

.header {
    background-color: #e20001;
    opacity: 88%;
    height: 60px;
    display: flex;

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
    }
}

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


</style>