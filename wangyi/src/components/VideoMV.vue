<template>
    <div class="index">
        <div class="latest-mv">
            <div class="latest-mv-navigation">
                <div class="latest-mv-navigation-title">
                    <span>最新MV
                        <div class="arrow"></div>
                    </span>
                </div>
                <div class="latest-mv-navigation-list">
                    <ul>
                        <li v-for="item, index in tagList" :key="item.tagSign" @mouseenter="enterTagList(index)"
                            @mouseleave="leaveTagList()" @click="clickTagList(index)"
                            :class="[{ tagHover: isTagListHover(index) }, { tagActive: isTagListActive(index) }]">{{ item.tagSign
                            }}</li>
                    </ul>
                </div>
            </div>
            <ul class="latest-mv-item-list">
                <li class="latest-mv-item" v-for="item in latestMVData.list" :key="item.id">
                    <img :src="item.cover" alt="">
                    <p class="name">{{ item.name }}</p>
                    <p class="artist-name">{{ item.artistName }}</p>
                    <div class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.playCount) }}</span>
                        <div class="play"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="hot-mv">
            <div class="hot-mv-navigation">
                <div class="hot-mv-navigation-title">
                    <span>热播MV
                        <div class="arrow"></div>
                    </span>
                </div>
            </div>
            <ul class="hot-mv-item-list">
                <li class="hot-mv-item" v-for="item in hotMVData.list" :key="item.id">
                    <img :src="item.cover" alt="">
                    <p class="name">{{ item.name }}</p>
                    <p class="artist-name">{{ item.artistName }}</p>
                    <div class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.score) }}</span>
                        <div class="play"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="wangyi-mv">
            <div class="wangyi-mv-navigation">
                <div class="wangyi-mv-navigation-title">
                    <span>网易出品
                        <div class="arrow"></div>
                    </span>
                </div>
            </div>
            <ul class="wangyi-mv-item-list">
                <li class="wangyi-mv-item" v-for="item in wangYiMVData.list" :key="item.id">
                    <img :src="item.cover" alt="">
                    <p class="name">{{ item.name }}</p>

                    <div class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.playCount) }}</span>
                        <div class="play"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mv-rank">
            <div class="mv-rank-navigation">
                <div class="mv-rank-navigation-title">
                    <span>MV排行榜
                        <div class="arrow"></div>
                    </span>
                </div>
                <div class="mv-rank-navigation-list">
                    <ul>
                        <li v-for="item, index in tagList" :key="item.tagSign" @mouseenter="enterTagList(index)"
                            @mouseleave="leaveTagList()" @click="clickTagList(index), clickRankTagList(index)"
                            :class="[{ tagHover: isTagListHover(index) }, { tagActive: isTagListActive(index) }]">{{ item.tagSign
                            }}</li>
                    </ul>
                </div>
            </div>
            <ul class="mv-rank-item-list">
                <li class="mv-rank-item" v-for="item, index in MVRankData.list" :key="item.id">
                    <div class="rank">
                        {{ RankFormat(index + 1) }}
                    </div>
                    <img :src="item.cover" alt="">
                    <div class="mv-rank-detail">
                        <p>{{ item.name }}</p>
                        <span>{{ item.artistName }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getLatestMVList, getWangyiMVList, getTopMVList } from '../request/api'
import { LatestMVList, wangyiMVList, tagType } from '../type/MV'
import { TopMVList } from '../type/TopMV'
onMounted(() => {
    getLatestMVData()
    getWangyiMVData()
    getHotMVData()
    getMVRankData()
})
//latest-mv-data
const latestMVData = reactive(new LatestMVList())
const getLatestMVData = () => {
    getLatestMVList(undefined, 6).then(res => {
        latestMVData.list = res.data.data
    })
}
//tagList
const tagList: tagType[] = [
    { tagSign: '内地' },
    { tagSign: '港台' },
    { tagSign: '欧美' },
    { tagSign: '日本' },
    { tagSign: '韩国' },
]
let tagListHoverIndex = ref(-1)
let tagListActiveIndex = ref(0)
const enterTagList = (index: number) => {
    tagListHoverIndex.value = index
}
const leaveTagList = () => {
    tagListHoverIndex.value = -1
}
const updataLatestMVData = (area: string) => {
    getLatestMVList(area, 6).then(res => {
        latestMVData.list = res.data.data
    })
}
const clickTagList = (index: number) => {
    tagListActiveIndex.value = index
    updataLatestMVData(tagList[index].tagSign)
}
const isTagListHover = (index: number) => {
    return tagListHoverIndex.value === index
}
const isTagListActive = (index: number) => {
    return tagListActiveIndex.value === index
}
//hot-mv-data
const hotMVData = reactive(new TopMVList())
const getHotMVData = () => {
    getTopMVList(undefined, 6).then(res => {
        hotMVData.list = res.data.data
    })
}

//wangyi-mv-data
const wangYiMVData = reactive(new wangyiMVList())
const getWangyiMVData = () => {
    getWangyiMVList().then(res => {
        wangYiMVData.list = res.data.data
    })
}
//mv-rank-data
const MVRankData = reactive(new TopMVList())
const getMVRankData = () => {
    getTopMVList(undefined, 10).then(res => {
        MVRankData.list = res.data.data
    })
}
const updataMVRankData = (area: string) => {
    getTopMVList(area, 10).then(res => {
        MVRankData.list = res.data.data
    })
}
const clickRankTagList = (index: number) => {
    updataMVRankData(tagList[index].tagSign)
}
//rank format
const RankFormat = (number: number) => {
    if (number < 10) {
        return '0' + number
    }
    else return number + ''
}
//play count format
const playCountFormat = (number: number) => {
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

//index

//latest-mv
.latest-mv {
    width: calc(100% - 50px);
    height: 450px;
    margin-left: 25px;
    margin-right: 25px;
}

//latest-mv-navigation
.latest-mv-navigation {
    height: 50px;
    display: flex;
}

//title
.latest-mv-navigation-title {
    display: flex;
    align-items: center;
    width: 50%;
}

.latest-mv-navigation-title span {
    position: relative;
    font-weight: 700;
}

.arrow {
    position: absolute;
    top: 7px;
    left: calc(100%);
    width: 10px;
    height: 10px;
    border: #474747 solid;
    border-width: 1.5px 1.5px 0 0;
    transform: rotate(45deg);
}

//list

.latest-mv-navigation-list {
    width: 50%;
}

.latest-mv-navigation-list ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 10px;
}

.latest-mv-navigation-list ul li {
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #474747;
    padding: 1px 6px;
    border-radius: 20px;
}

.latest-mv-navigation-list ul li::after {
    content: '';
    position: absolute;
    top: 5px;
    left: -6px;
    width: 1.2px;
    height: 10px;
    background-color: #ccc;
}

.tagHover {
    color: black !important;
}

.tagActive {
    color: #ec4141 !important;
    background-color: rgba(255, 228, 225, 70%);
}

//item
.latest-mv-item-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.latest-mv-item {
    position: relative;
    width: 32%;
    height: 49%;
    border-radius: 5px;
    text-align: left;
}

.latest-mv-item img {
    width: 245px;
    height: 140px;
    border-radius: 5px;
}

.artist-name {
    font-size: 10px;
    color: #ccc;
    margin-bottom: 2%;
}

.play-time-box {
    position: absolute;
    top: 0;
    right: 5px;
}

.play-time {
    position: relative;
    font-size: 10px;
    color: aliceblue;
}

.play {
    position: absolute;
    top: 29%;
    right: 70%;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 10px 6px 10px;
    border-color: transparent transparent transparent #fff;
    z-index: 99;
    scale: 0.8;
}

//hot-mv
.hot-mv {
    width: calc(100% - 50px);
    height: 450px;
    margin-left: 25px;
    margin-right: 25px;
}

//hot-mv-navigation
.hot-mv-navigation {
    height: 50px;
    display: flex;
}

//title
.hot-mv-navigation-title {
    display: flex;
    align-items: center;
    width: 50%;
}

.hot-mv-navigation-title span {
    position: relative;
    font-weight: 700;
}

//list
.hot-mv-navigation-list {
    width: 50%;
    background-color: aqua;
}

//item
.hot-mv-item-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.hot-mv-item {
    position: relative;
    width: 32%;
    height: 49%;
    border-radius: 5px;
    text-align: left;
}

.hot-mv-item img {
    width: 245px;
    height: 140px;
    border-radius: 5px;
}


//wangyi
.wangyi-mv {
    width: calc(100% - 50px);
    height: 450px;
    margin-left: 25px;
    margin-right: 25px;
}

//hot-mv-navigation
.wangyi-mv-navigation {
    height: 50px;
    display: flex;
}

//title
.wangyi-mv-navigation-title {
    display: flex;
    align-items: center;
    width: 50%;
}

.wangyi-mv-navigation-title span {
    position: relative;
    font-weight: 700;
}

//list
.wangyi-mv-navigation-list {
    width: 50%;
    background-color: aqua;
}

//item
.wangyi-mv-item-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.wangyi-mv-item {
    position: relative;
    width: 32%;
    height: 49%;
    border-radius: 5px;
    text-align: left;
}

.wangyi-mv-item p {
    font-size: 14px;
}

.wangyi-mv-item img {
    width: 245px;
    height: 140px;
    border-radius: 5px;
}

//mv-rank
.mv-rank {
    width: calc(100% - 50px);
    height: 800px;
    margin-left: 25px;
    margin-right: 25px;
}

//mv-rank-navigation
.mv-rank-navigation {
    height: 50px;
    display: flex;
}

//mv-rank-title
.mv-rank-navigation-title {
    display: flex;
    align-items: center;
    width: 50%;
}

.mv-rank-navigation-title span {
    position: relative;
    font-weight: 700;
}


//mv-rank-list

.mv-rank-navigation-list {
    width: 50%;
}

.mv-rank-navigation-list ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 10px;
}

.mv-rank-navigation-list ul li {
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #474747;
    padding: 1px 6px;
    border-radius: 20px;
}

.mv-rank-navigation-list ul li::after {
    content: '';
    position: absolute;
    top: 5px;
    left: -6px;
    width: 1.2px;
    height: 10px;
    background-color: #ccc;
}

//list-item
.mv-rank-item-list {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.mv-rank-item {
    display: flex;
    align-items: center;
    width: 50%;
    height: 20%;
    text-align: left;
    margin-bottom: -1.5;
    border-bottom: 1.5px solid #ececec;
}

.mv-rank-item:nth-child(odd) {
    border-right: 1.5px solid #ececec;
    margin-right: -1.5px;
}

.mv-rank-item:last-child {
    border-bottom: 0px;
}

.mv-rank-item:nth-last-child(2) {
    border-bottom: 0px;
}

.mv-rank-item img {
    width: 175px;
    height: 95px;
    border-radius: 5px;
}

.rank {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 95px;
    font-weight: bolder;
    font-size: 20px;
    color: darkgray;
}

.mv-rank-detail {
    margin-right: 10px;
    font-size: 10px;
    height: 95px;
    width: 140px;
    margin-left: 10px;
}

.mv-rank-detail p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 30px;
    line-height: 30px;
}

.mv-rank-detail span {
    display: block;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    color: darkgray;
}</style>