<template>
    <div class="header">
        <div class="img-box">
            <img :src="playListDetailData.data.playlist.coverImgUrl" alt="">
        </div>
        <div class="description-box">
            <div class="title">{{ playListDetailData.data.playlist.name }}</div>
            <div class="creator">
                <span>{{ playListDetailData.data.playlist.creator.nickname }}</span>
                <span style="margin-left: 10px;">{{ timeFormat(playListDetailData.data.playlist.createTime) + '创建' }}</span>
            </div>
            <div class="operation">
                <div class="play-all">
                    <div class="play-ico"></div>
                    <span>播放全部</span>
                </div>
                <div class="add">+</div>
                <div class="collection">
                    <img src="../assets/收藏.png" alt="">
                    <span>{{ '分享'+'('+countFormat(playListDetailData.data.playlist.subscribedCount)+')' }}</span>
                </div>
                <div class="share">
                    <img src="../assets/分享.png" alt="">
                    <span>{{ '分享'+'('+countFormat(playListDetailData.data.playlist.shareCount)+')' }}</span>
                </div>
                <div class="download">
                    <img src="../assets/下载.png" alt="">
                    <span>下载全部</span>
                </div>
            </div>
            <div class="tag">标签：
                <span>{{ playListDetailData.data.playlist.tags }}</span>
            </div>
            <div class="song-length-box">
                <span class="song-length">歌曲:
                    <span>{{ playListDetailData.data.playlist.trackCount }}</span>
                </span>
                <span class="play">播放:
                    <span>{{ countFormat(playListDetailData.data.playlist.playCount) }}</span>
                </span>
            </div>
            <div class="description">
                简介:
                <span>{{ playListDetailData.data.playlist.description }}</span>
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
import { ref, reactive, onMounted, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPlayListDetail } from '../request/api'
import { PlayListDetail } from '../type/playlistdetail'
import { computed } from '@vue/reactivity';
onMounted(() => {
    getPlayListDetailData()
})
const router = useRouter()
const route = useRoute()
//data
let playListDetailData = reactive(new PlayListDetail())
const getPlayListDetailData = () => {
    getPlayListDetail(route.query.id as unknown as number).then(res => {
        playListDetailData.data = reactive(res.data)
        console.log(timeFormat(playListDetailData.data.playlist.createTime))
    })
}
//navigation
const navList = router.getRoutes().filter((item) => item.meta.belong == "playlistdetail")
let activeIndex = ref(0)
let hoverIndex = ref(-1)
const navClick = (index: number) => {
    router.push({
        path: navList[index].path,
        query:{id:route.query.id}
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

const timeFormat = (time: number) => {
    let date = new Date(time)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let Mi = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D
}
const countFormat = (number: number) => {
    if (number > 100000000) {
        return Math.floor(number / 100000000) + '亿'
    }
    if (number > 100000) {
        return Math.floor(number / 10000) + '万'
    }
    return number
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

.header {
    display: flex;
    height: 240px;
}

.img-box {
    display: flex;
    width: 28%;
    align-items: center;
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
    text-align: start;
    font-size: 14px;
    color: #474747;
}

.title {
    height: 35px;
    line-height: 35px;
    font-size: larger;
    font-weight: bold;
}

.creator {
    font-size: 10px;
    height: 20px;
    line-height: 20px;
}

.operation {
    display: flex;
    align-items: center;
    height: 70px;
}
.operation img {
    height: 20px;
    width: 20px;
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

.play-all span {
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.collection:hover {
    background-color: rgba(220, 220, 220, 0.6);
}
.share {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.share:hover {
    background-color: rgba(220, 220, 220, 0.6);
}
.download {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid darkgrey;
    margin-left: 10px;
}
.download:hover {
    background-color: rgba(220, 220, 220, 0.6);
}
.song-length-box {
    margin-top: 2px;
}

.play {
    margin-left: 20px;
}

.description {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
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