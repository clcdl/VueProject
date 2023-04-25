<template>
    <div class="header">
        <div class="img-box">
            <img src="" alt="">
        </div>
        <div class="description-box">
            <div class="title">今天从</div>
            <div class="creator">22222222</div>
            <div class="operation">
                <div class="play-all">
                    <div class="play-ico"></div>
                    <span>播放全部</span>
                </div>
                <div class="add">+</div>
                <div class="collection">收藏</div>
                <div class="share">分享</div>
                <div class="download">下载</div>
            </div>
            <div class="tag">标签:</div>
            <div class="song-length-box">
                <span class="song-length">歌曲:</span>
                <span class="play">播放:</span>
            </div>
            <div class="description">
                简介:
            </div>
        </div>
    </div>
    <div class="navigation-box">
        <ul class="navigation">
            <li v-for="item, index in navList" :key="item.path" @click="navClick(index)" @mouseenter="navEnter(index)"
                @mouseleave="navleave" :class="[{ active: isActive(index) }, { isHover: isHover(index) }]">
                <span>{{ item.meta.text }}</span>
            </li>
        </ul>
    </div>
    <div class="nav-detail">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const router = useRouter();
const navList = router.getRoutes().filter((item) => item.meta.belong == "playlistdetail")
//navigation
let activeIndex = ref(0)
let hoverIndex = ref(-1)
const navClick = (index: number) => {
    router.push({
        path: navList[index].path
    })
    activeIndex.value = index
}
const navEnter = (index: number) => {
    hoverIndex.value = index
}
const navleave = () => {
    hoverIndex.value = -1
}
const isActive = (index: number) => {
    return index === activeIndex.value
}
const isHover = (index: number) => {
    return index === hoverIndex.value
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}
.header {
    display: flex;
    background-color: aqua;
    height: 240px;
}

.img-box {
    display: flex;
    width: 28%;
    align-items: center;
    background-color: aquamarine;
}

.img-box img {
    height: 180px;
    width: 180px;
    border-radius: 10px;
    margin-left: 25px;
}

.description-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 25px;
    background-color: azure;
    text-align: start;
    font-size: 14px;
}

.title {
    height: 35px;
    background-color: #474747;
    font-size: larger;
    font-weight: bold;
}
.creator {
    height: 40px;
}
.operation {
    display: flex;
    align-items: center;
    height: 70px;
    background-color: bisque;
}
.play-all {
    position: relative;
    width: 100px;
    height: 30px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: #e20000;
    color: aliceblue;
    line-height: 30px;
}
.play-all span{
    margin-left: 30px;
}
.play-ico {
    position: absolute;
    top: 8px;
    left: 15px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 10px 6px 10px;
    border-color: transparent transparent transparent #fff;
    z-index: 99;
    scale: 1.1;
}
.add {
    width: 25px;
    height: 30px;
    margin-left: 0.1mm;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: #e20000;
    color: aliceblue;
    font-size: x-large;
    line-height: 30px;
    text-align: center;
}

.collection {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.share {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.download {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.song-length-box {
    margin-top: 2px;
}
.play {
    margin-left: 50px;
}
.description {
    margin-top: 2px;
}
//navigation
.navigation-box {
    margin-bottom: 10px;
}
.navigation {
    display: flex;
    align-items: center;
    height: 40px;
}

.navigation li {
    cursor: pointer;
    margin-left: 25px;
    position: relative;
    color: #474747;
}

.active {
    font-weight: 700;
    font-size: 20px;
}

.active::before {
    content: '';
    width: 80%;
    height: 3.5px;
    position: absolute;
    background-color: #e20000;
    border-radius: 5px;
    top: 30px;
    left: 5px;
}

.isHover {
    color: black !important;
}
</style>