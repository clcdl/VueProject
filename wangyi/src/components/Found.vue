<template>
    <div class="found">
        <ul class="navigation">
            <li v-for="item, index in navList" :key="item.path" @click="navClick(index)" @mouseenter="navEnter(index)"
                @mouseleave="navLeave" :class="[{ active: isActive(index) }, { isHover: isHover(index) }]">
                <span>{{ item.meta.text }}</span>
            </li>
        </ul>
        <div class="banner" @mouseenter="EnterBanner" @mouseleave="LeaveBanner">
            <img v-for="item, index in bannerData.bannerList" :src="item.imageUrl" :class="[BannerStyle.styleList[index]]"
                alt="">
            <div class="button">
                <p v-for="item, index in bannerData.bannerList" :key="item.imageUrl"
                    :class="{ buttonActive: isButtonHover(index) }" @mouseenter="EnterButton(index), ButtonTrigger(index)"
                    @mouseleave="LeaveButton(index)"></p>
            </div>
            <span v-show="arrowActive" @click="ClickLeftArrow" class="left-arrow"><i style="color: aliceblue;"
                    class="iconfont-header icon-arrow-left-found"></i></span>
            <span v-show="arrowActive" @click="ClicRightArrow" class="right-arrow"><i style="color: aliceblue;"
                    class="iconfont-header icon-arrow-right-found"></i></span>
        </div>
        <div class="recommendation">
            <div class="recommendation-title">
                <span>推荐歌单</span>
                <div class="rec-arrow"></div>
            </div>
            <div class="song-list">
                <div class="song-list-item" v-for="item, index in recommendationData.list" :key="item.id">
                    <i class="play-icon"></i>
                    <img :src="item.picUrl" alt="">
                    <p>{{ item.name }}</p>
                    <span>
                        {{ playCountFormat(item.playCount) }}
                    </span>
                </div>
            </div>
        </div>
        <div class="podcast">
            <div class="podcast-title">
                <span>热门播客</span>
                <div class="pdc-arrow"></div>
            </div>
            <div class="podcast-list">
                <div class="podcast-list-item"
                 v-for="item,index in HotPodcastDataForSix.list" :key="item.id"
                 @mouseenter="EnterPodcast(index)"
                 @mouseleave="LeavePodcast(index)"
                 :class="{isHover:isPodcastHover(index)}"
                 >
                    <img :src="item.picUrl" alt="">
                    <div class="pdc-detail">
                        <div class="pdc-detail-title">{{ item.copywriter }}</div>
                        <span class="pdc-detail-category">{{ item.category }}</span>
                        <div class="author">
                            <div class="author-name">{{ item.name }}</div>
                            <div class="pdc-play">{{ playCountFormat(item.playCount) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getBannerList, getRecommendationList, getHotPodcastList } from '../request/api';
import { BannerList, resBannerStyle } from '../type/banner'
import { RecommendationList, } from '../type/recommendation'
import { HotPodcastList } from '../type/podcast'
const router = useRouter();
const navList = router.getRoutes().filter((item) => item.meta.belong == "foundNavigation")
//navigation
let activeIndex = ref(0)
let hoverIndex = ref(-1)
const navClick = (index: number) => {
    activeIndex.value = index
}
const navEnter = (index: number) => {
    hoverIndex.value = index
}
const navLeave = () => {
    hoverIndex.value = -1
}
const isActive = (index: number) => {
    return index === activeIndex.value
}
const isHover = (index: number) => {
    return index === hoverIndex.value
}

//banner   //data
const bannerData = reactive(new BannerList)

getBannerList().then(res => {
    bannerData.bannerList = res.data.banners
})

//banner event

//banne arrow
const ClickLeftArrow = () => {
    prev()
}

const ClicRightArrow = () => {
    next()
}
//轮播

const arrowActive = ref(false)
const EnterBanner = () => {
    arrowActive.value = true
    clearInterval(timer)
    timer = -1
}
const LeaveBanner = () => {
    arrowActive.value = false
    timer = setInterval(next, 5000)
}

function prev() {
    BannerStyle.styleList.push(BannerStyle.styleList.shift() as string)
}
function next() {
    BannerStyle.styleList.unshift(BannerStyle.styleList.pop() as string)
}
let timer = setInterval(next, 5000)
//banner button
const buttonHoverIndex = ref(-1)
const BannerStyle = reactive(new resBannerStyle())

const EnterButton = (index: number) => {
    buttonHoverIndex.value = index
}

const LeaveButton = (index: number) => {
    buttonHoverIndex.value = -1
}
const isButtonHover = (index: number) => {
    return BannerStyle.styleList[index] == 'firstBanner'
}

const ButtonTrigger = (index: number) => {
    //当前按钮索引index 当前first图片索引x
    let x = BannerStyle.styleList.indexOf('firstBanner')
    if (x > index) {
        let distance = x - index
        while (distance--) {
            prev()
        }
    }
    else if (index > x) {
        let distance = index - x
        while (distance--) {
            next()
        }
    }
}

//推荐歌单
const recommendationData = reactive(new RecommendationList())
getRecommendationList().then(res => {
    recommendationData.list = res.data.result
})

//推荐播客
//data
const HotPodcastData = reactive(new HotPodcastList)
const HotPodcastDataForSix = reactive(new HotPodcastList)
getHotPodcastList().then(res => {
    HotPodcastData.list = res.data.djRadios
    HotPodcastDataForSix.list = HotPodcastData.list.filter((item, index) => index < 6)
})
//hover
let podcatsHoverIndex = ref(-1)
const EnterPodcast = (index: number) => {
    podcatsHoverIndex.value = index
}

const LeavePodcast = (index: number) => {
    podcatsHoverIndex.value = -1
}
const isPodcastHover = (index: number) => {
    return podcatsHoverIndex.value === index
}

//播放量数据格式化
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

/* 导航栏 */
.navigation {
    display: flex;
    align-items: center;
    height: 70px;
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
    height: 2.2px;
    position: absolute;
    background-color: #e20000;
    border-radius: 5px;
    top: 30px;
    left: 5px;
}

.isHover {
    color: black !important;
}

/* 轮播图 */
.banner {
    position: relative;
    height: 220px;
}

.banner img {
    width: 400px;
    height: 150px;
    position: absolute;
    left: 205px;
    top: 20px;
    transition: 0.5s;
    border-radius: 10px;
}

.firstBanner {
    scale: 1.35;
    z-index: 100;
    opacity: 1;
}

.lastBanner {
    transform: translateX(-145px);
    scale: 1.1;
    z-index: 9;
    opacity: 1;
}

.secondBanner {
    transform: translateX(145px);
    scale: 1.1;
    z-index: 99;
    opacity: 1;
}

.rightBanner {
    transform: translateX(145px);
    scale: 1.1;
    z-index: 9;
    opacity: 1;
}

.left-arrow {
    cursor: pointer;
    position: absolute;
    left: 33px;
    top: 75px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 2px 7px;
    color: aliceblue !important;
}

.right-arrow {
    cursor: pointer;
    position: absolute;
    right: 34px;
    top: 75px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 2px 7px;
}

.arrowHover {
    color: aliceblue !important;
}

.button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: end;
    top: 200px;
    width: 100%;
    height: 15px;
}

.button p {
    background-color: #ececec;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: 10px;
}

.buttonActive {
    background-color: #e20000 !important;
}

/* 推荐歌单 */
.recommendation {
    margin-top: 20px;
    margin-left: 25px;
    height: 450px;
}

.recommendation-title {
    position: relative;
    height: 30px;
    text-align: left;
    font-weight: 700;
    font-size: 20px;
}

.rec-arrow {
    position: absolute;
    top: 9px;
    left: 82px;
    width: 10px;
    height: 10px;
    border: #474747 solid;
    border-width: 1.5px 1.5px 0 0;
    transform: rotate(45deg);
}

.song-list {
    height: 420px;
    margin-right: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.song-list-item {
    position: relative;
    width: 140px;
    height: 190px;
    display: flex;
    flex-direction: column;
}

.song-list-item img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
}

.song-list-item p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 50px;
    text-align: left;
    margin-top: 2px;
}

.song-list-item span {
    position: absolute;
    font-size: 10px;
    color: aliceblue;
    right: 5px;
}

.song-list-item::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 38px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 10px 6px 10px;
    border-color: transparent transparent transparent aliceblue;
    z-index: 99;
    scale: 0.8;
}

/* 热门播客 */
.podcast {
    margin-top: 20px;
    margin-left: 25px;
    height: 370px;
}

.podcast-title {
    position: relative;
    height: 30px;
    text-align: left;
    font-weight: 700;
    font-size: 20px;
}

.pdc-arrow {
    position: absolute;
    top: 9px;
    left: 82px;
    width: 10px;
    height: 10px;
    border: #474747 solid;
    border-width: 1.5px 1.5px 0 0;
    transform: rotate(45deg);
}

.podcast-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 300px;
    margin-top: 10px;
    border-radius: 5px;
}

.podcast-list-item {
    display: flex;
    justify-content: left;
    height: 85px;
    width: 49%;
    border-radius: 5px;
}

.podcast-list-item img {
    cursor: pointer;
    height: 85px;
    width: 85px;
    border-radius: 5px;
}

.pdc-detail {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
}

.pdc-detail-title {
    text-align: left;
}

.pdc-detail-category {
    color: darkgrey;
    font-size: 10px;
    width: 50px;
    border: 1px solid darkgrey;
    ;
    margin-top: 2px;
    margin-bottom: 2px;
}

.author {
    color: darkgrey;
    font-size: 10px;
    display: flex;
}
.author-name{
    cursor: pointer;
}
.pdc-play {
    position: relative;
    margin-left: 30px;
}

.pdc-play::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 3.5px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 10px 6px 10px;
    border-color: transparent transparent transparent darkgray;
    z-index: 99;
    scale: 0.8;
}

</style>