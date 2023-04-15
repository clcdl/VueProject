<template>
    <div class="navigation">
        <div class="navigation-left"><img src="../assets/podcastTop.png" alt=""></div>
        <div class="navigation-right">
            <div class="navigation-right-item" v-for="item,index in styleForNavigationRight.list" :key="item.img"
            @mouseenter="enterRightItem(index)"
            @mouseleave="leaveRihgtItem()"
            :class="{isHover:isRightHover(index)}"
            >
            <span :class="item.img"></span>
            <p>{{ item.tilte }}</p>  
            </div>
        </div>
    </div>
    <div class="guess-like">
        <div class="guess-like-title">猜你喜欢</div>
        <div class="guess-like-list">
            <div class="guess-like-list-item" v-for="item in podcastRecommendData.list" :key="item.id">
                <img :src="item.blurCoverUrl" alt="">
                <div class="guess-like-list-item-detail">
                    <div>{{ item.radio.category }}</div>
                    <p>{{ item.mainSong.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import {getPodcastRecommendList} from '../request/api'
import {StyleForNavigationRight} from '../type/podcast'
import {PodcastRecommend} from '../type/podcastrecommend'
//navigation
const styleForNavigationRight = new StyleForNavigationRight()
let rightHoverIndex = ref(-1)
const enterRightItem = (index:number)=>{
    rightHoverIndex.value = index
}
const leaveRihgtItem = ()=>{
    rightHoverIndex.value = -1
}
const isRightHover = (index:number)=>{
    return rightHoverIndex.value === index
}
//recommend
const podcastRecommendData = reactive(new PodcastRecommend)
getPodcastRecommendList().then(res=>{
    podcastRecommendData.list = res.data.programs
})
</script>

<style scoped>
.navigation {
    display: flex;
    height: 200px;
    margin-top: 25px;
    margin-left: 25px;

    
}
.navigation-left {
    height: 170px;
    width: 450px;
    border-radius: 5px;
}
.navigation-left img {
    height: 170px;
    width: 450px;
    border-radius: 5px;
}
.navigation-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    height: 140px;
    width: 290px;
    border-radius: 5px;
    background-color: rgba(255, 228, 225, 70%); 
    padding-top: 20px;
    padding-bottom: 10px;
}
.navigation-right-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    height: 55px;
    width: 70px;
}
.navigation-right-item span {
    width: 20px;
    height: 20px;
    color: #474747;
}

.navigation-right-item p {
    font-size: 10px;
    margin-top: 7px;
}


/*猜你喜欢*/
.guess-like {
    margin-top: 20px;
    margin-left: 25px;
    height: 230px;
}
.guess-like-title {
    height: 30px;
    text-align: left;
    font-weight: 700;
    font-size: 20px;
}
.guess-like-list{
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.guess-like-list-item {
    width: 140px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 5px;

}
.guess-like-list-item img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
}

.guess-like-list-item-detail{
    display: flex;
    justify-content: center;
}
.guess-like-list-item-detail div{
    color: darkgrey;
    border: 1px solid darkgrey;
    margin-top: 8px;
    margin-bottom: 2px;
    font-size: 10px;
    width: 50px;
    height: 20px;
}
.guess-like-list-item-detail p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 38px;
    width: 85px;
    text-align: left;
    margin-top: 6px;
    margin-left: 5px;
    font-size: 12px;
}
.isHover {
    color: black !important;
}
.img-rank {
    background-image: url(../assets/排行榜.png);
    background-size: 20px 20px;
}
.img-motion {
    background-image: url(../assets/情感.png);
    background-size: 20px 20px;
}
.img-recommendation {
    background-image: url(../assets/音乐推荐.png);
    background-size: 20px 20px;
}
.img-book {
    background-image: url(../assets/有声书.png);
    background-size: 20px 20px;
}
.img-talk {
    background-image: url(../assets/脱口秀.png);
    background-size: 20px 20px;
}
.img-cover {
    background-image: url(../assets/创作翻唱.png);
    background-size: 20px 20px;
}
.img-electric {
    background-image: url(../assets/电音.png);
    background-size: 20px 20px;
}
.img-knowledge {
    background-image: url(../assets/知识.png);
    background-size: 20px 20px;
}
</style>