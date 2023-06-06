<template>
    <div class="search-description">
        {{ "搜索 " + keywords }}
    </div>
<!--     <div class="place-holder"></div> -->
    <div class="operation">
        <div class="play-all">
            <div class="play-ico"></div>
            <span>播放全部</span>
        </div>
        <div class="add">+</div>
        <div class="download">
            <img src="../assets/下载.png" alt="">
            <span>下载全部</span>
        </div>
    </div>
    <div class="list-header">
        <div class="blank"><span></span></div>
        <div class="title"><span>音乐标题</span></div>
        <div class="singer"><span>歌手</span></div>
        <div class="album"><span>专辑</span></div>
        <div class="time"><span>时长</span></div>
        <div class="hot"><span>热度</span></div>
    </div>
    <ul class="search-list">
        <li class="search-list-item" v-for="item,index in searchData.data.songs" :key="item.id"
        @mouseenter="enterListItem(index)"
        @mouseleave="leaveListItem()" 
        @click="clickListItem(index)"
        @dblclick="changeCurrentSong(item),changeSongUrlData(item)"
        :class="[{ isActive: isActive(index) }, { isHover: isHover(index) }]">
            <div class="blank">
                <p></p>
            </div>
            <div class="title">
                <p>{{ item.name }}</p>
            </div>
            <div class="singer">
                <p>{{ artistFormat(item.artists) }}</p>
            </div>
            <div class="album">
                <p>{{ item.album.name }}</p>
            </div>
            <div class="time">
                <p>{{ timeFormat(item.duration) }}</p>
            </div>
            <div class="hot"></div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted ,inject,Ref} from 'vue';
import { useRouter, useRoute, } from 'vue-router';
import { getSearch,getSongUrl,getSongDetail } from '../request/api';
import { Search,Artist,Song } from '../type/search'
import { SongInit } from '../type/song'
const route = useRoute()
const keywords: string = route.query.keywords as string
onMounted(() => {
    getSearchResult()
})
const searchData = reactive(new Search())
const getSearchResult = () => {
    getSearch(keywords, 30).then(res => {
        searchData.data = res.data.result
        console.log(searchData.data)
    })
}
//

let activeIndex = ref(0)
let hoverIndex = ref(-1)
const enterListItem = (index: number) => {
    hoverIndex.value = index
}
const leaveListItem = () => {
    hoverIndex.value = -1
}
const isHover = (index: number) => {
    return index === hoverIndex.value
}
const clickListItem = (index: number) => {
    activeIndex.value = index
}
const isActive = (index: number) => {
    return activeIndex.value === index
}
//inject
const currentSong = inject('currentSong') as SongInit
const songUrl = inject('songUrl') as Ref<string>
const changeCurrentSong = (item: Song) => {
    getSongDetail(item.id).then(res=>{
        currentSong.data = res.data.songs[0]
    })
    console.log(currentSong.data)
    //console.log(songUrl.value)
}
const changeSongUrlData = (item:Song) => {
    getSongUrl(item.id).then(res => {
        songUrl.value = res.data.data[0].url
        console.log(songUrl.value)
    })
}
const indexFormat = (number: number) => {
    if (number < 10) {
        return '0' + number
    }
    else return number + ''
}
//时间格式化
const timeFormat = (time: number) => {
    let minutes = Math.ceil((time % 3600000) / 60000);
    let seconds = Math.ceil((time % 60000) / 1000);
    return indexFormat(minutes) + ':' + indexFormat(seconds)
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
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

.search-description {
    height: 60px;
    line-height: 60px;
    font-weight: 700;
    font-size: 20px;
    text-align: start;
    margin-top: 5px;
    margin-left: 30px;
}

.place-holder {
    height: 155px;
}

.operation {
    height: 60px;
    display: flex;
    align-items: center;
    margin-left: 30px;
}

.operation img {
    height: 20px;
    width: 20px;
}

.play-all span {
    margin-left: 25px;
}

.play-all {
    position: relative;
    width: 100px;
    height: 30px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: #ec4141;
    color: aliceblue;
    line-height: 30px;
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
    background-color: #ec4141;
    color: aliceblue;
    font-size: x-large;
    line-height: 28px;
    text-align: center;
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



.list-header {
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: start;
    color: #474747;
}

.blank {
    width: 15%;
}

.title {
    width: 33%;
}

.singer {
    width: 15%;
}

.album {
    width: 18%;
}

.time {
    width: 10%;
}

.search-list {
    display: flex;
    flex-direction: column;
}

.search-list-item {
    display: flex;
    text-align: start;
    margin-left: 30px;
    margin-right: 30px;
    height: 35px;
    line-height: 35px;
}

.search-list-item p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: #474747;
}

.search-list-item:nth-child(odd) {
    background-color: #f6f6f7;
}
.isActive {
    background-color: rgba(221, 221, 221, 0.9) !important;
}

.isHover {
    background-color: rgba(220, 220, 220, 0.6) !important;
}

</style>