<template>
    <div class="song-sheet">
        <div class="boutique" v-for="item in highQualityPlayListData.list">
            <img :src="item.coverImgUrl" alt="">
            <div class="boutique-detail">
                <p>精品歌单</p>
                <span>{{item.name}}</span>
            </div>
        </div>
        <div class="navigation">
            <div class="tag-list-left-box">
                <div class="tag-list-left" @mouseenter="enterTagListLeft()" @mouseleave="leaveTagListLeft()"
                    :class="{ bgcHover: isHoverTagListLeft }" @click="showTagExpand()">
                    <p>{{ tagShow }}</p>
                </div>
            </div>
            <div class="tag-expand" v-show="isTagExpandShow">
                <div class="tag-expand-all">
                    <span :class="{ tagExpandactive: isSelect }" style="padding: 2px 4px; border-radius: 20px;"
                        @click="selecetAll()">全部歌单</span>
                    <div class="category-box">
                        <ul class="tag-expand-category" v-for="item, index in categoryPlayListData.data.categories">
                            <div class="category">
                                <div class="category-img" :class="styleForImg[index]"></div>
                                <span>{{ item }}</span>
                            </div>
                            <div class="tag-expand-item-box">
                                <li class="tag-expand-item"
                                    v-for="element, position in categoryPlayListData.data.sub.filter((item) => item.category == index)"
                                    @mouseenter="enterTagExpandItem(position, element)" @mouseleave="leaveTagExpandItem()"
                                    @click="clickTagExpandItem(position, element)">
                                    <span
                                        :class="[{ tagExpandactive: isActiveTagExpandItem(position, element) }, { tagExpandHover: isHoverTagExpandItem(position, element) }]">
                                        {{ element.name }}
                                        <p class="hot" v-show="element.hot">HOT</p>
                                    </span>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tag-list-right-box">
                <ul class="tag-list-right">
                    <li class="tag-list-right-item" v-for="item, index in hotPlayListData.list" :key="item.id"
                        @mouseenter="enterTagListRight(index)" @mouseleave="leaveTagListRight()"
                        @click="clickTagListRight(index)">
                        <p :class="[{ isHover: isHover(index) }, { active: isActive(index) }]">{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-detail-box">
            <ul class="list-detail">
                <li class="list-detail-item" v-for="item, index in playListData.list" :key="item.id">
                    <img :src="item.coverImgUrl" alt="">
                    <p>{{ item.name }}</p>
                    <div class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.playCount) }}</span>
                        <div class="play"></div>
                    </div>
                    <div class="crown" v-show="item.highQuality">
                        <img src="../assets/crown.png" alt="">
                    </div>
                    <span class="author">{{ item.creator.nickname }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getCategoryList, getHotPlayList, getPlayList ,getHighqualityTags,getHighqualityPlayList} from '../request/api'
import { CategoryPlayList, CategoryTagExpand, Sub } from '../type/categoryplaylist'
import { HotPlayList } from '../type/hotplaylist'
import { PlayList } from '../type/palylist'
import {HighqualityTags,HighQualityPlayList} from '../type/boutique'
onMounted(() => {
    getHighQualityTagsData()
    getCategoryListData()
    getHotPlayListData()
    getPlayListData()
    updateBoutique()
})

//boutique
const highQualityTagsData = reactive(new HighqualityTags())
const highQualityPlayListData = reactive(new HighQualityPlayList())
const getHighQualityTagsData = ()=>{
    getHighqualityTags().then(res=>{
    highQualityTagsData.list = res.data.tags
})
}
const updateBoutique = (cat?:string)=>{
    getHighqualityPlayList(cat,1,undefined).then(res=>{
        highQualityPlayListData.list = res.data.playlists
        console.log(highQualityPlayListData.list)
    })
}
//tag-list-left
const categoryPlayListData = reactive(new CategoryPlayList())
const tagShow = ref('全部歌单')
const isHoverTagListLeft = ref(false)
const getCategoryListData = () => {
    getCategoryList().then(res => {
        categoryPlayListData.data = res.data
    })
}
const enterTagListLeft = () => {
    isHoverTagListLeft.value = true
}
const leaveTagListLeft = () => {
    isHoverTagListLeft.value = false
}
const isTagExpandShow = ref(false)
const showTagExpand = () => {
    isTagExpandShow.value = !isTagExpandShow.value
}
//tag-expand
const isSelect = ref(true)
const selecetAll = () => {
    isSelect.value = true
    updatePlayListData()
    tagShow.value = '全部歌单'
}
const styleForImg: string[] = [
    'language',
    'style',
    'scene',
    'emotion',
    'theme'
]
let categoryHoverIndex = ref(-1)
let categoryActiveIndex = ref(-1)
let tagExpandHoverIndex = ref(-1)
let tagExpandActiveIndex = ref(-1)

const enterTagExpandItem = (position: number, element: Sub) => {
    categoryHoverIndex.value = element.category
    tagExpandHoverIndex.value = position
}
const leaveTagExpandItem = () => {
    categoryHoverIndex.value = -1
    tagExpandHoverIndex.value = -1
}
const isHoverTagExpandItem = (position: number, element: Sub) => {
    return tagExpandHoverIndex.value === position && categoryHoverIndex.value === element.category
}
const isActiveTagExpandItem = (position: number, element: Sub) => {
    return (tagExpandActiveIndex.value === position && categoryActiveIndex.value === element.category) || updateTagList(element.name)
}
const clickTagExpandItem = (position: number, element: Sub) => {
    categoryActiveIndex.value = element.category
    tagExpandActiveIndex.value = position
    tagExpandTarget.value = element.name
    //clear
    isSelect.value = false
    isTagExpandShow.value = false
    tagListRightActiveIndex.value = -1
    tagListTarget.value = ''
    //update
    tagShow.value = (element.name)
    updatePlayListData(element.name)
    updateBoutique(element.name)
}
const tagExpandTarget = ref('')
const updateTagList = (name: string) => {
    return name == tagListTarget.value
}

//tag-list-right
const hotPlayListData = reactive(new HotPlayList())
const tagListRightHoverIndex = ref(-1)
const tagListRightActiveIndex = ref(-1)
const getHotPlayListData = () => {
    getHotPlayList().then(res => {
        hotPlayListData.list = res.data.tags
    })
}

const enterTagListRight = (index: number) => {
    tagListRightHoverIndex.value = index
}
const leaveTagListRight = () => {
    tagListRightHoverIndex.value = -1
}
const isHover = (index: number) => {
    return tagListRightHoverIndex.value === index
}
const isActive = (index: number) => {
    return tagListRightActiveIndex.value === index || updateTagExpandActive(hotPlayListData.list[index].name)
}
const clickTagListRight = (index: number) => {
    tagListRightActiveIndex.value = index
    tagListTarget.value = hotPlayListData.list[index].name
    //clear
    isSelect.value = false
    isTagExpandShow.value = false
    tagExpandActiveIndex.value = -1
    tagExpandTarget.value = ''
    //update
    updatePlayListData(hotPlayListData.list[index].name)
    tagShow.value = hotPlayListData.list[index].name
    updateBoutique(hotPlayListData.list[index].name)
}
//
const tagListTarget = ref('')
const updateTagExpandActive = (name: string) => {
    return name == tagExpandTarget.value
}
//list-detail
const playListData = reactive(new PlayList())
const getPlayListData = () => {
    getPlayList(undefined, 100, undefined).then(res => {
        playListData.list = res.data.playlists
    })
}
const updatePlayListData = (cat?: string) => {
    getPlayList(cat, 100, undefined).then(res => {
        playListData.list = res.data.playlists
    })
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

.boutique {

    border-radius: 10px;
    margin: 0px 25px;
    display: flex;
    align-items: center;
    background-color: #ccc;
}

.boutique img {
    height: 150px;
    width: 150px;
    padding: 20px 0;
    margin-left: 15px;
    border-radius: 10px;
}

.boutique-detail {
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 150px;
    margin-left: 20px;
}

.boutique-detail p {
    width: 110px;
    height: 30px;
    margin-top: 30px;
    border-radius: 20px;
    border: 1px solid gold;
    line-height: 30px;
    color: gold;
}

.boutique-detail span {
    margin-top: 30px;
    font-weight: 500px;
    color: aliceblue;
}

//navigation
.navigation {
    position: relative;
    height: 60px;
    display: flex;
}

//tag-list-left
.tag-list-left-box {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
}

.tag-list-left {
    cursor: pointer;
    margin-left: 25px;
    height: 30px;
    width: 100px;
    border-radius: 20px;
    line-height: 30px;
    border: 1.5px solid #eee;
}

.tag-list-left p {
    position: relative;
    margin-right: 10px;
}

.tag-list-left p::after {
    content: ' ';
    position: absolute;
    top: 10px;
    width: 10px;
    height: 10px;
    border: #474747 solid;
    border-width: 1.5px 1.5px 0 0;
    transform: rotate(45deg);
}

.bgcHover {
    background-color: #f6f6f7;
}

//tag-expand
.tag-expand {
    position: absolute;
    width: 650px;
    height: 670px;
    top: 53px;
    left: 25px;
    background-color: #fff;
    border: #ececec solid 1px;
    box-shadow: 2px 2px 10px #ccc;
    z-index: 99;
}

.tag-expand-all {
    cursor: pointer;
    height: 40px;
    margin: 20px 20px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.category-box {
    margin: 25px 0;
    height: 500px;

}

.tag-expand-category {
    display: flex;
    width: 100%;
    margin-top: 30px;
}

.category {
    width: 10%;
    display: flex;
}

.category-img {
    width: 30px;
    height: 30px;
}

.category span {
    color: darkgray;
    margin-top: 5px;
    font-size: 14px;
}

.tag-expand-item-box {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
}

.tag-expand-item {
    font-size: 14px;
    width: 16%;
    margin-bottom: 10px;
    margin-top: 5px;
    text-align: center;
}

.tag-expand-item span {
    position: relative;
    padding: 2px 4px;
    border-radius: 20px;
}
.hot {
    position: absolute;
    right: -20px;
    top: 0;
    font-size: 12px;
    font-weight: bold;
    transform: scale(0.7);
    color: #e20000;

}
.tagExpandHover {
    color: #e20000 !important;
}

.tagExpandactive {
    color: #e20000 !important;
    background-color: rgba(255, 228, 225, 70%) !important;
}

.language {
    background-image: url(../assets/符号-国际化.png);
    background-size: 30px 30px;
}

.style {
    background-image: url(../assets/风格.png);
    background-size: 30px 30px;
}

.scene {
    background-image: url(../assets/场景.png);
    background-size: 30px 30px;
}

.emotion {
    background-image: url(../assets/情感2.png);
    background-size: 30px 30px;
}

.theme {
    background-image: url(../assets/主题.png);
    background-size: 30px 30px;
}

//tag-list-right
.tag-list-right-box {
    height: 100%;
    flex: 1;
    margin: 0px 25px;
}

.tag-list-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
}

.tag-list-right-item p {
    cursor: pointer;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 10px;
    font-size: 10px;
    margin-right: 5px;
    color: #474747;
}

.active {
    color: #e20000 !important;
    background-color: rgba(255, 228, 225, 70%);
}

.isHover {
    color: black !important;
}

//list-detail

.list-detail-box {
    margin-left: 25px;

}

.list-detail {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
}

.list-detail-item {
    position: relative;
    width: 170px;
    height: 220px;
    display: flex;
    flex-direction: column;
    margin-right: 26px;
}

.list-detail-item img {
    width: 170px;
    height: 170px;
    border-radius: 5px;
}

.list-detail-item p {
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
    font-size: 14px;
}

.crown {
    position: absolute;
    left: 5px;
    top: 5px;
    height: 20px;
    width: 20px;
}

.crown img {
    height: 20px;
    width: 20px;
}

.author {
    position: absolute;
    top: 145px;
    left: 15px;
    font-size: 10px;
    color: white;
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
    right: 75%;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 10px 6px 10px;
    border-color: transparent transparent transparent #fff;
    z-index: 99;
    scale: 0.8;
}
</style>