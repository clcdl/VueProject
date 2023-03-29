<template>
    <div class="found">
        <ul class="navigation">
            <li v-for="item, index in navList" key="item.path" @click="navClick(index)" @mouseenter="navEnter(index)"
                @mouseleave="navLeave" :class="[{ active: isActive(index) }, { isHover: isHover(index) }]">
                <span>{{ item.meta.text }}</span>
            </li>
        </ul>
        <div class="banner" @mouseenter="EnterBanner" @mouseleave="LeaveBanner">
            <img v-for="item, index in bannerData.bannerList" :src="item.imageUrl" :class="[BannerStyle.styleList[index]]"
                alt="">
            <div class="button">
                <p v-for="item, index in bannerData.bannerList" key="item.imageUrl"
                    :class="{ buttonActive: isButtonHover(index) }" @mouseenter="EnterButton(index), ButtonTrigger(index)"
                    @mouseleave="LeaveButton(index)"></p>
            </div>
            <span v-show="arrowActive" @click="ClickLeftArrow" class="left-arrow"><i style="color: aliceblue;" class="iconfont-header icon-arrow-left-found"></i></span>
            <span v-show="arrowActive" @click="ClicRightArrow" class="right-arrow"><i style="color: aliceblue;" class="iconfont-header icon-arrow-right-found"></i></span>
        </div>
        <div class="recommendation">
            <div class="recommendation-title">
                <span>推荐歌单</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getBannerList } from '../request/api';
import { BannerList, resBannerStyle } from '../type/banner'
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
const ClickLeftArrow = ()=>{
    prev()
}

const ClicRightArrow = ()=>{
    next()
}
//轮播

const arrowActive = ref(false)
const EnterBanner = ()=>{
    arrowActive.value = true
    clearInterval(timer)
    timer = -1
}
const LeaveBanner = ()=>{
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
    if(x>index){
        let distance = x-index
        while(distance--){
            prev()
        }
    }
    else if(index>x){
        let distance = index-x
        while(distance--){
            next()
        }
    }
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

.left-arrow{
    cursor: pointer;
    position: absolute;
    left: 33px;
    top: 75px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 2px 7px;
    color: aliceblue  !important;
}
.right-arrow{
    cursor: pointer;
    position: absolute;
    right: 34px;
    top: 75px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 2px 7px;
}
.arrowHover{
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
    height: 400px;
}
.recommendation-title {
    position: absolute;
    height: 30px;
    text-align: left;
    font-weight: 700;
    font-size: 20px;
}
</style>