<template>
    <div class="index">
        <div class="video-tag">
            <div class="video-tag-left">
                <div class="tag-select" :class="{ tagSelectHover: isTagSelectHover }" @mouseenter="EnterTagSelecet()"
                    @mouseleave="LeaveTagSelect()">
                    <p @click="showAllVideo(),showAllTagList()">{{ tagShow }}&nbsp;&nbsp;</p>
                </div>
            </div>
            <div class="video-tag-left-totle" v-show="isShowAllTagList">
                <div class="select-video-all">
                    <span @click="SelectAll()" @mouseenter="EnterSelectAll()" @mouseleave="LeaveSelectAll()"
                    :class="[{AllTagListItemHover:isSelectAllHover},{AllTagListItemActive:isSelectAll}]"
                    >全部视频</span>
                </div>
                <ul class="all-tag-list">
                    <li v-for="item, index in videoTagData.list" :key="item.id" @mouseenter="HoverAllTagListItem(index)"
                        @mouseleave="LeaveAllTagListItem()" @click="ClickAllTagListItem(index)"
                        :class="[{ AllTagListItemHover: isAllTagListItemHover(index) }, { AllTagListItemActive: isAllTagListItemActive(index) }]">
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
            <div class="video-tag-right">
                <ul>
                    <li v-for="item, index in videoTagRightList.list" :key="item.id" @mouseenter="EnterVideoTagRight(index)"
                        @mouseleave="LeaveVideoTagRight()" @click="ClickVideoTagRight(index)"
                        :class="[{ active: VideoTagRightActive(index) }, { isHover: VideoTagRightHover(index) }]">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="video-view">
            <ul>
                <li class="video-view-item" v-for="item in videoData.list" :key="item.data.vid">
                    <img :src="item.data.coverUrl" alt="">
                    <p>{{ item.data.title }}</p>
                    <div class="creator"><span>by&nbsp;</span><span>{{ item.data.creator.nickname }}</span></div>
                    <span class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.data.playTime) }}</span>
                        <div class="play"></div>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getVideoTagList, getAllVideoList, getSelectVideoList } from '../request/api';
import { VideoTagList, } from '../type/videotag'
import { VideoList, VideoType } from '../type/videodetail'


onMounted(() => {
    getVideoTagAndVideoData()
})
//video-tag
const videoTagData = reactive(new VideoTagList)
const videoTagRightList = reactive(new VideoTagList)
const getVideoTagAndVideoData = () => {
    getVideoTagList().then(res => {
        videoTagData.list = res.data.data
        videoTagRightList.list = videoTagData.list.filter((item, index) => index < 9)
        getVideoData()
    })
}
const getVideoData = () => {
    videoTagRightList.list.forEach(item => {
        getSelectVideoList(item.id).then(res => {
            res.data.datas.forEach((item: VideoType) => {
                videoData.list.push(item)
            })
        })
    })
}

const UpdataVideoData = (id: number) => {
    getSelectVideoList(videoTagData.list[id].id).then(res => {
        videoData.list = res.data.datas
    })
}
//video-tag-left
let tagShow = ref("全部视频")
let isShowAllTagList = ref(false)
let isTagSelectHover = ref(false)

const showAllVideo = () => {
    getVideoData()
}
const showAllTagList = ()=>{
    isShowAllTagList.value = !isShowAllTagList.value
}
const EnterTagSelecet = () => {
    isTagSelectHover.value = true
}
const LeaveTagSelect = () => {
    isTagSelectHover.value = false
}
//all-tag-list
let AllTagListItemHoverIndex = ref(-1)
let AllTagListItemActiveIndex = ref(-1)
let isSelectAll = ref(true)
let isSelectAllHover = ref(false)
const SelectAll = () => {
    getVideoData()
    isSelectAll.value = true
    AllTagListItemActiveIndex.value = -1
    activeIndex.value = -1
    tagShow.value = '全部视频'
}
const EnterSelectAll = () => {
    isSelectAllHover.value = true
}
const LeaveSelectAll = () => {
    isSelectAllHover.value = false
}
const HoverAllTagListItem = (index: number) => {
    AllTagListItemHoverIndex.value = index
}
const LeaveAllTagListItem = () => {
    AllTagListItemHoverIndex.value = -1
}
const isAllTagListItemHover = (index: number) => {
    return index === AllTagListItemHoverIndex.value
}
const isAllTagListItemActive = (index: number) => {
    return index === AllTagListItemActiveIndex.value
}
const ClickAllTagListItem = (index: number) => {
    AllTagListItemActiveIndex.value = index
    activeIndex.value = index
    isSelectAll.value = false
    tagShow.value = videoTagData.list[index].name
    isShowAllTagList.value = false
    UpdataVideoData(index)
}
//video-tag-right
let activeIndex = ref(-1)
let hoverRightTagIndex = ref(-1)

const ClickVideoTagRight = (index: number) => {
    activeIndex.value = index
    AllTagListItemActiveIndex.value = index
    tagShow.value = videoTagRightList.list[index].name
    UpdataVideoData(index)
}

const EnterVideoTagRight = (index: number) => {
    hoverRightTagIndex.value = index
}
const LeaveVideoTagRight = () => {
    hoverRightTagIndex.value = -1
}
const VideoTagRightActive = (index: number) => {
    return index === activeIndex.value
}
const VideoTagRightHover = (index: number) => {
    return index === hoverRightTagIndex.value
}
//video-view
const videoData = reactive(new VideoList)
//播放数据格式化
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
//video-tag
li {
    list-style-type: none;
}

.video-tag {
    display: flex;
    height: 60px;
}

.video-tag-left {
    display: flex;
    align-items: center;
    color: #474747;
    height: 60px;
    width: 250px;
}

.index {
    position: relative;
}

.video-tag-left-totle {
    position: absolute;
    width: 650px;
    height: 427px;
    top: 50px;
    left: 25px;
    background-color: #fff;
    border: #ececec solid 1px;
    box-shadow: 2px 2px 10px #ccc;
    overflow-y: scroll;
    z-index: 99;
}

.select-video-all {
    cursor: pointer;
    height: 40px;
    margin: 20px 20px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.select-video-all span {
    font-size: 10px;
    padding: 5px 5px;
    border-radius: 20px;
}

.all-tag-list {
    width: 100%;
    height: 350px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    margin-left: 0px;
}

.all-tag-list li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16%;
    height: 30px;
    margin-top: 15px;
    border-radius: 20px;
}

.all-tag-list li p {
    font-size: 10px;
    line-height: 20px;
    text-align: center;
}

.all-tag-list li:last-child {
    margin-right: calc(16% + 4% / 6);
}

.AllTagListItemHover {
    color: #ec4141 !important;
}

.AllTagListItemActive {
    color: #ec4141 !important;
    background-color: rgba(255, 228, 225, 70%);
}

.video-tag-left-totle::-webkit-scrollbar {
    width: 8px;
}

.video-tag-left-totle::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.video-tag-left-totle::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255);
}

.tag-select {
    cursor: pointer;
    position: relative;
    width: 110px;
    height: 30px;
    margin-left: 25px;
    line-height: 30px;
    border: lightgray solid 1px;
    border-radius: 30px;
}

.tag-select::after {
    content: '';
    position: absolute;
    top: 9px;
    left: 82px;
    width: 10px;
    height: 10px;
    border: #474747 solid;
    border-width: 1.5px 1.5px 0 0;
    transform: rotate(45deg);
    z-index: 1;
}

.tagSelectHover {
    background-color: #f6f6f7;
}

.video-tag-right {
    display: flex;
    align-items: center;
    font-size: 12px;
    flex: 1;
}

.video-tag-right ul {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.video-tag-right ul li {
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #474747;
    padding: 1px 6px;
    border-radius: 20px;
}

.video-tag-right ul li::after {
    content: '';
    position: absolute;
    top: 5px;
    left: -6px;
    width: 1.2px;
    height: 10px;
    background-color: #ccc;
    z-index: 1;
}

.active {
    color: #ec4141 !important;
    background-color: rgba(255, 228, 225, 70%);
}

.isHover {
    color: black !important;
}

.video-view {
    margin-left: 25px;
}

.video-view ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.video-view-item {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin-top: 5px;
}

.video-view-item img {
    width: 245px;
    height: 140px;
    border-radius: 5px;
}

.video-view-item p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 20px;
    width: 245px;
    margin-top: 10px;
    font-size: 10px;
    text-align: left;
}

.creator {
    font-size: 10px;
    text-align: left;
    color: #ccc;
}

.play-time-box {
    position: absolute;
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
</style>