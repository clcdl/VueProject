<template>
    <div class="header">
        <div class="header-logo" style="width: 180px;height: 60px; cursor: pointer; margin-right: 30px;">
        </div>
        <div class="arrow-box">
            <div class="arrow-border">
                <span><i class="iconfont-header icon-arrow-left"></i></span>
                <span style="margin-left: 10px;"><i class="iconfont-header icon-arrow-right"></i></span>
            </div>
        </div>
        <div class="search">
            <i class="iconfont-header icon-search" @click="search()"></i>
            <input @focus.prevent="inputFocus()" @blur.prevent="inputBlur()" v-model="keywords" type="text"
                :placeholder="placeHolder">
        </div>
        <ul ref="searchSelect" class="search-select" v-show="isShowSelect" :class="{ association: isAssociation }">
            <div class="default-search" v-show="!isAssociation">
                <div style="height: 50px; width: 100%; margin-left: 25px; line-height: 50px; text-align: start;">热搜榜</div>
                <li class="hot-search-list-item" v-for="item, index in hotSearchDetail.list"
                    @mouseenter="enterHotSearchListItem(index)" @mouseleave="leaveHotSearchListItem()"
                    @click="clickHotSearchListItem(item)" :class="{ isHover: isHoverHotSearchListItem(index) }">
                    <div class="hot-rank">{{ index + 1 }}</div>
                    <div class="search-detail">
                        <div class="searchword-and-score">
                            <p class="search-word">{{ item.searchWord }}</p>
                            <p class="score" style="color: #ec4141;font-weight: bold;" v-show="index == 0 ? true : false">
                                HOT
                            </p>
                            <p class="score">{{ item.score }}</p>
                        </div>
                        <p class="description">{{ item.content }}</p>
                    </div>
                </li>
            </div>
            <div class="association-box">
                <div style="height: 50px; width: 100%; margin-left: 25px; line-height: 50px; text-align: start;">单曲</div>
                <li @click="clickAssociationListItem(item.name)"  class="association-list-item" v-for="item,index in association.data.songs">
                    <p>{{ item.name + "-" + artistFormat(item.artists) }}</p>
                </li>
                <div style="height: 50px; width: 100%; margin-left: 25px; line-height: 50px; text-align: start;">专辑</div>
                <li @click="clickAssociationListItem(item.name)" class="association-list-item" v-for="item,index in association.data.albums">
                <p>{{ item.name + "-" + item.artist.name }}</p>
                </li>
            </div>
        </ul>
        <!--         <div class="association"></div> -->
        <div class="mic"><i class="iconfont-header icon-mic-on"></i></div>
        <div class="user-bar">
            <div class="userInfo">
                <img src="" alt="#">
                <span>未登录</span>
                <ul>
                    <li><i class="iconfont-header icon-theme"></i></li>
                    <li><i class="iconfont-header icon-setting"></i></li>
                    <li><i class="iconfont-header icon-letter"></i></li>
                    <li class="vertical_bar"></li>
                    <li><i class="iconfont-header icon-MINIMIZE"></i></li>
                    <li><i class="iconfont-header icon-minimize"></i></li>
                    <li><i class="iconfont-header icon-maximize"></i></li>
                    <li><i class="iconfont-header icon-close"></i></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, onUnmounted, watchEffect } from 'vue';
import { useRouter, useRoute, } from 'vue-router';
import { logStatus, getAssociate, getDefaultKeyWord, getHotSearch } from '../request/api';
import { HotSearch, HotSearchDetail, HotSearchDetailType,Association,Artist } from '../type/search'
onMounted(() => {
    getHotSearchData()
    getDefaultKeyWordData()
})
const router = useRouter()
const route = useRoute()
const logoClick = () => {
    router.push({
        path: '/found'
    })
    //selectedIndex.value = 0

    logStatus().then(res => {
        console.log(res.data)
    })
}
//搜索框
const placeHolder = ref('default')
const keywords = ref('')
const hotSearchData = reactive(new HotSearch())
const getDefaultKeyWordData = () => {
    getDefaultKeyWord().then(res => {
        hotSearchData.list = res.data.result.hots
        placeHolder.value = hotSearchData.list[0].first
    })
}
const search = () => {
    let flag = router.currentRoute.value.name == "/search"
    if (flag) {
        if (keywords.value != '') {
            router.push({
                name: "/refresh",
                query: { keywords: keywords.value }
            })
        }
        else {
            router.push({
                name: "/refresh",
                query: { keywords: placeHolder.value }
            })
        }
    }
    else {
        if (keywords.value != '') {
            router.push({
                name: "/search",
                query: { keywords: keywords.value }
            })
        }
        else {
            router.push({
                name: "/search",
                query: { keywords: placeHolder.value }
            })
        }
    }
}
//搜索框获取焦点时小窗
const isInputFocus = ref(false)
const isShowSelect = ref(false)
const hotSearchListHoverIndex = ref(-1)
const hotSearchDetail = reactive(new HotSearchDetail())
const searchSelect = ref<HTMLUListElement>()
const isAssociation = ref(false)
const getHotSearchData = () => {
    getHotSearch().then(res => {
        hotSearchDetail.list = res.data.data
    })
}
//association
const association = reactive(new Association())
const associationListHoverIndex = ref(-1)
const getAssociationData = ()=>{
    if(keywords.value!=""){
        getAssociate(keywords.value).then(res=>{
        association.data = res.data.result
    })
    }
}
const clickAssociationListItem = (keyword:string)=>{
    isShowSelect.value = false
    keywords.value = keyword
    search()
}
//获取歌手
const artistFormat = (artist: Artist[]) => {
    let singer = ''
    artist.forEach((item, index) => {
        if (index == 0) {
            singer = singer + item.name
        }
        else {
            singer = singer + '/' + item.name
        }
    })
    return singer
}
//input
const inputFocus = () => {
    getAssociationData()
    isInputFocus.value = true
    isShowSelect.value = true
}
const inputBlur = () => {
    isInputFocus.value = false
}
watchEffect(() => {
    isAssociation.value = !(keywords.value == "")
    getAssociationData()
})
const hideSelect = () => {
    document.addEventListener('click', (e) => {
        e.stopPropagation()
        if (searchSelect.value != undefined) {
            if (isShowSelect.value) {

                if (!searchSelect.value.contains(e.target as HTMLElement)) {

                    if (!isInputFocus.value) {
                        document.removeEventListener("click", hideSelect)
                        isShowSelect.value = false
                    }
                }
            }
        }
    })
}
watch(isShowSelect, (newVal, oldVal) => {
    if (newVal) {
        hideSelect()
    }
})
onUnmounted(() => {
    document.removeEventListener("click", hideSelect)
})
const enterHotSearchListItem = (index: number) => {
    hotSearchListHoverIndex.value = index
}
const leaveHotSearchListItem = () => {
    hotSearchListHoverIndex.value = -1
}
const isHoverHotSearchListItem = (index: number) => {
    return index === hotSearchListHoverIndex.value
}
const clickHotSearchListItem = (item: HotSearchDetailType) => {
    isShowSelect.value = false
    keywords.value = item.searchWord
    search()
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

/* 头部 */
.header {
    position: relative;
    background-color: #ec4141;
    height: 60px;
    display: flex;
}

.arrow-box {
    display: flex;
    justify-content: space-around;
    width: 100px;
    text-align: center;
    line-height: 60px;
}

.arrow-box span {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    padding: 5px 5px;
}

//search
.search {
    height: 20px;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    border-radius: 30px;
    padding: 7px;
    margin-right: 10px;
    margin-top: 13px;
}

.search input {
    background-color: transparent;
    border: 0;
    height: 30px;
    line-height: 15px;
    width: 130px;
    outline: none !important;
    color: #fff;
    margin-left: 5px;
}

input::placeholder {
    color: rgba(200, 200, 200, 0.6);
}

.search-select {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 220px;
    top: 65px;
    width: 350px;
    height: 510px;
    border-radius: 10px;
    border: #ececec solid 1px;
    box-shadow: 2px 2px 10px #ccc;
    background-color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    color: rgb(100, 100, 100);
    transition: all 0.5s;
}

.hot-search-list-item {
    display: flex;
    width: 100%;
    height: 50px;
    cursor: pointer;
}

.hot-rank {
    height: 50px;
    width: 50px;
    line-height: 50px;
    color: darkgray;
}

.hot-search-list-item:nth-child(-n+4) .hot-rank {
    color: #ec4141;
}

.hot-search-list-item:nth-child(-n+4) .search-word {
    font-weight: bolder;
}

.search-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10px;
}

.search-detail p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.searchword-and-score {
    display: flex;
}

.search-word {
    height: 25px;
    line-height: 25px;
    text-align: start;
}

.score {
    margin-left: 6px;
    margin-top: 5px;
    color: darkgray;
}

.description {
    line-height: 25px;
    color: darkgrey;
    text-align: start;
}

.association {
    width: 400px;
    transition: all 0.5s;
}
.association-list-item {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
}
.association-list-item p{
    margin-left: 40px;
}
.association-list-item:hover {
    background-color: rgb(240, 240, 240);
}
.search-select::-webkit-scrollbar {
    width: 8px;
}

.search-select::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.search-select::-webkit-scrollbar-track {
    border-radius: 0;
    background: linear-gradient(to bottom, rgba(240, 240, 240, 1), white);
}

.mic {
    line-height: 60px;
}

.user-bar {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 100%;
    width: 500px;
    margin-left: 80px;
}

.user-bar .userInfo {
    display: flex;
    align-items: center;
}

.user-bar .userInfo img {
    margin-right: 10px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
}

.user-bar .userInfo span {
    margin-right: 60px;
    color: aliceblue;
    font-size: 10px;
}

.user-bar ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.user-bar ul .vertical_bar {
    width: 1px;
    height: 20px;
    background-color: #464648;
}

.user-bar ul li {
    margin-right: 20px;
}

.isHover {
    background-color: rgb(240, 240, 240);
}</style>