<template>
    <div class="song-detail" :class="{ upSongDetail: isUpSongDetail }">
        <div class="header">
            <img class="down" @click="downSongDetail()" src="../assets/down.png" alt="">
        </div>
        <div class="main">
            <img class="needle" :class="[{needleAnimation:props.playStatus},]" src="../assets/needle.png" alt="">
            <div class="record">
                <div class="disc-box ">
                    <img class="disc discAnimaiton" :class="[{run:props.playStatus},{pause:!props.playStatus}]" src="../assets/disc.png" alt="">
                    <img class="cover discAnimaiton" :class="[{run:props.playStatus},{pause:!props.playStatus}]" :src="props.currentSong.data.al.picUrl" alt="">
                </div>
            </div>
            <div class="description-box">
                <div class="title">
                    <p>{{ props.currentSong?.data.name }}</p>
                </div>
                <div class="author-box">
                    <p class="author">{{ '歌手:' + arFormat(props.currentSong?.data.ar) }}</p>
                    <p class="album">{{ '专辑:' + props.currentSong?.data.al.name }}</p>
                    <p class="from">{{ '来源:' }}</p>
                </div>
                <div class="lyric-switch"></div>
                    <ul ref="lyric" class="lyric">
                        <li ref="blank" class="lyric-item blank"></li>
                        <li ref = "lyricItem" class="lyric-item"
                        v-for="item,index in result.list"
                        :class="{active:index===activeIndex}"
                        ><p>{{ item.word }}</p></li>
                        <li class="lyric-item blank"></li>
                    </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, Ref, toRef } from 'vue';
import { Ar, SongInit, } from '../type/song'
import { Lyric,Result } from '../type/lyric'
import { getLyric } from '../request/api'

onMounted(() => {
    getLyricData(props.currentSong?.data.id)
})
//Lyric and result.list
const activeIndex = ref(0)
const liMinHeight = ref(0)
const lyric = ref()
const lyricItem = ref()
const blank = ref()
const lyricData = reactive(new Lyric())
const result = reactive(new Result)
const getLyricData = (id: number | undefined) => {
    if (id == undefined) {
        return 'undefined'
    }
    else {
        getLyric(id).then(res => {
            lyricData.data = res.data.lrc
            result.list = resolveLyricData(lyricData.data.lyric)
        })
    }
}
//解析lyric格式拆分为时间与歌词
const resolveLyricData = (lyric: string) => {
    const arr = lyric.split('\n')
    if (arr[arr.length - 1] == "") {
        arr.pop()
    }
     const result = arr.map(item => {
        const wordArr = item.split(']')

        return {
            time: parseTime(wordArr[0].substring(1)),
            word: wordArr[1]

        }
    })
    return result
}
//根据当前播放时间找到歌词
const findIndex = (currentTime: number) => {
    for (let i = 0; i < result.list.length; i++) {
        if (result.list[i].time > currentTime) {
            return i - 1
        }
    }
    //没找到说明到达最后一句
    return result.list.length - 1
}
//设置歌词偏移
const setOffset = ()=>{
    activeIndex.value = findIndex(props.currentTime)
    let ulHeight = lyric.value.clientHeight
    let blankHeight = blank.value.clientHeight
    let liHeight = lyric.value.children[1].clientHeight
    let wholeHeight = lyric.value.children.length * liHeight
    let maxOffset  = wholeHeight - ulHeight +blankHeight
    liMinHeight.value = liHeight
    let offset = liHeight * activeIndex.value + liHeight / 2 - ulHeight / 2 + blankHeight
    //设置最小offSet为0
    if(offset < 0 ){
        offset = 0
    }
    //设置最大offset
    if(offset > maxOffset){
        offset = maxOffset
    }
    lyric.value.scrollTop = offset
}
//使00:00格式时间转化为秒
const parseTime = (timeString: string) => {
    const timeArr = timeString.split(':')
    return parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])
}
//upSongDetail
const isUpSongDetail = ref(false)

const upSongDetail = () => {
    isUpSongDetail.value = !isUpSongDetail.value
}
const downSongDetail = () => {
    isUpSongDetail.value = !isUpSongDetail.value
    console.log(props.isPause)
    console.log(props.playStatus)
/*     console.log(props.currentTime)
    console.log(lyric.value.children[0].clientHeight)
    console.log(lyric.value.children.length)
    console.log(lyric.value.clientHeight)
    console.log(lyric.value.children.length * lyric.value.children[0].clientHeight) */

}

const arFormat = (ar: Ar[] | undefined) => {
    if (ar == undefined) {
        return 'undefined'
    }
    else {
        let singer = ''
        ar.forEach((item, index) => {
            if (index == 0) {
                singer = singer + item.name
            }
            else {
                singer = singer + '/' + item.name
            }
        })
        return singer
    }
}
defineExpose({
    upSongDetail,
    getLyricData,
    setOffset
})
const props = defineProps<{
    currentSong: SongInit
    currentTime: number
    playStatus:boolean
    isPause:boolean
}>()
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}
.song-detail {
    height: 0px;
    width: 1022px;
    background: linear-gradient(to bottom, rgba(240, 240, 240, 1), white);
    transition: all 0.5s;
    z-index: 100;
}

.upSongDetail {
    height: calc(670px - 72px);
    transform: translateY(-598px);
}

//header
.header {
    height: 10%;
    display: flex;
    align-items: center;
}

.down {
    cursor: pointer;
    height: 40%;
    margin-left: 30px;
}

.main {
    position: relative;
    display: flex;
    height: 82%;
}

.record {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.needle {
    position: absolute;
    left: 25%;
    height: 30%;
    z-index: 1;
    transform-origin: left top;
    transform: rotate(-30deg);
    transition: all 1s;
}
.needleAnimation {
    transform-origin: left top;
    transform: rotate(0deg);
    transition: all 1s;
}
.disc-box {
    width: 60.2%;
    height: 69%;
    border-radius: 50%;
    background-color: rgba(224, 224, 224, 0.9);
}
.discAnimaiton{
    animation: rotate 30s linear infinite;
}
@keyframes rotate{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.pause {
    animation-play-state: paused;
}
.run {
    animation-play-state: running;
}
.disc {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.cover {
    position: absolute;
    top: 28.5%;
    left: 17.2%;
    height: 43%;
    border-radius: 50%;
}
.description-box {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.title {
    width: 75%;
    height: 7%;
    text-align: start;
}
.title p{
    height: 100%;
    font-size: x-large;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}
.author-box {
    display: flex;
    height: 5%;
    width: 75%;
    text-align: start;
    color: rgba(149, 149, 149, 0.8);
    font-size: 14px;
    font-weight: 400;
    gap: 10px;
}

.author {
    width: 24%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.album {
    width: 24%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.from {
    width: 24%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.lyric-switch {
    margin-top: 10px;
    height: 10%;
}
//lyric
.lyric {
    flex: 1;
    width: 75%;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
.lyric-item {
    font-size: 14px;
    text-align: start;
    color: rgba(149, 149, 149, 0.8);
    margin-right: 15px;
}
.lyric-item p {
    min-height: 21px;
    padding: 10px 0px;
}
.blank {
    min-height: 186.25px;
}
.active {
    font-weight: 700;
    font-size: 16px;
    color: black !important;
}
.lyric::-webkit-scrollbar {
    width: 8px;
}

.lyric::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.lyric::-webkit-scrollbar-track {
    border-radius: 0;
    background: linear-gradient(to bottom, rgba(240, 240, 240, 1), white);
}
</style>