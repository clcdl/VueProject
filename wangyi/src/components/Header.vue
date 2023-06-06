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
            <i class="iconfont-header icon-search" @click="search(keywords)"></i>
            <input @focus.prevent="inputFocus()" @blur.prevent="inputBlur()" v-model="keywords" type="text"
                :placeholder="placeHolder">
        </div>
        <ul ref="defaultSearch" class="default-search" v-show="isShowSelecet">
            <div style="height: 50px; width: 100%; margin-left: 25px; line-height: 50px; text-align: start;">热搜榜</div>
            <li class="hot-search-list-item" v-for="item, index in hotSearchDetail.list"
                @mouseenter="enterHotSearchListItem(index)" @mouseleave="leaveHotSearchListItem()"
                @click="clickHotSearchListItem(item)" :class="{ isHover: isHoverHotSearchListItem(index) }">
                <div class="hot-rank">{{ index + 1 }}</div>
                <div class="search-detail">
                    <div class="searchword-and-score">
                        <p class="search-word">{{ item.searchWord }}</p>
                        <p class="score" style="color: #ec4141;font-weight: bold;" v-show="index == 0 ? true : false">HOT
                        </p>
                        <p class="score">{{ item.score }}</p>
                    </div>
                    <p class="description">{{ item.content }}</p>
                </div>
            </li>
        </ul>
        <div class="association"></div>
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
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import { useRouter, useRoute, } from 'vue-router';
import { logStatus, getSearch, getAssociate, getDefaultKeyWord, getHotSearch } from '../request/api';
import { HotSearch, HotSearchDetail, HotSearchDetailType } from '../type/search'
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
const search = (keywords: string) => {

    if (keywords != '') {
        router.push({
            name: "/search",
            query: { keywords: keywords }
        })
    }
    else {
        router.push({
            name: "/search",
            query: { keywords: placeHolder.value }
        })
    }
}
//搜索框获取焦点时小窗
const isInputFocus = ref(false)
const isShowSelecet = ref(false)
const hotSearchListHoverIndex = ref(-1)
const hotSearchDetail = reactive(new HotSearchDetail())
const defaultSearch = ref<HTMLUListElement>()
const getHotSearchData = () => {
    getHotSearch().then(res => {
        hotSearchDetail.list = res.data.data
    })
}
const inputFocus = () => {
    console.log("获得焦点")
    isInputFocus.value = true
    isShowSelecet.value = true
}
const inputBlur = () => {
    isInputFocus.value = false
    console.log('失去焦点')
}
const hideSelect = () => {
    document.addEventListener('click', (e) => {
        e.stopPropagation()
        if (defaultSearch.value != undefined) {
            if (isShowSelecet.value) {

                if (!defaultSearch.value.contains(e.target as HTMLElement)) {

                    if (!isInputFocus.value) {
                        document.removeEventListener("click", hideSelect)
                        isShowSelecet.value = false
                    }
                }
            }
        }
    })
}
watch(isShowSelecet, (newVal, oldVal) => {
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
    isShowSelecet.value = false
    search(item.searchWord)
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
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    padding: 5px 5px;
}

//search
.search {
    height: 20px;
    background-color: rgba(0, 0, 0, 0.08);
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

.default-search {
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

.association {}

.default-search::-webkit-scrollbar {
    width: 8px;
}

.default-search::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.default-search::-webkit-scrollbar-track {
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
}
</style>