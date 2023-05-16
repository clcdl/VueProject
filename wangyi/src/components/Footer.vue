<template>
    <div class="song-detail">
        <SongDetail ref="songDetail" v-bind:currentSong = "currentSong" :currentTime = "currentTimeForLyric"></SongDetail>
    </div>
    <div class="footer">
        <div class="foot-left">
            <img @click="upSongDetail()" class="img" :src="data.al.picUrl" alt="">
            <div class="songNameAndSinger">
                <span class="song-name">{{ data.name }}<i class="iconfont icon-aixin"></i></span>
                <span class="singer">{{ arFormat(data.ar) }}</span>
            </div>
        </div>

        <div class="foot-main" ref="playbar">
            <!-- 播放栏工具 -->
            <ul class="tool-list">
                <li><i class="iconfont icon-lajitong"></i></li>
                <li><i class="iconfont icon-shangyishoushangyige"></i></li>
                <li @click="clickPlay()"><i class="iconfont" :class="playStyle"></i>
                    <audio ref="audio" @canplay="getDuration()" @timeupdate="updateTime(),timeForPass()" loop autoplay id="audio"
                        :src="songUrl"></audio>
                </li>
                <li><i class="iconfont icon-xiayigexiayishou"></i></li>
                <li><i class="iconfont icon-geciweidianji"></i></li>
            </ul>
            <!-- 进度条 -->
            <div class="progress" ref="progress">
                <div class="slide" ref="slide"></div>
                <div class="fill" ref="fill"> </div>
                <!--歌曲当前时间与总时间  -->
                <span ref="currentTime" class="currentTime time">00:00</span>
                <span ref="duraTime" class="duraTime time">00:00</span>
            </div>
        </div>

        <ul class="ft_right">
            <li class="jigao">极高</li>
            <li class="iconfont icon-yinxiao"></li>
            <li class="iconfont icon-yinliangkai _voice"></li>
            <li class="iconfont icon-yiqipindan"></li>
            <li class="iconfont icon-24gl-playlistMusic"></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject, toRef, toRefs, onUpdated, onBeforeUpdate } from 'vue';
import { useRoute } from 'vue-router';
import { Ar, SongInit, } from '../type/song'
import SongDetail from './SongDetail.vue';

//dom
const playbar = ref()
const play = ref()
const progress = ref()
const slide = ref()
const duraTime = ref()
const currentTime = ref()
const fill = ref()
const audio = ref()
//router
const route = useRoute()

//data
const playStyle = ref('icon-bofang')
const songUrl = inject('songUrl') as string
const currentSong = inject('currentSong') as SongInit
const { data } = toRefs(currentSong)
//console.log(currentSong)
onMounted(() => {
    playStyle.value = 'icon-bofang'
})

//upSongDetail
const songDetail = ref()
const upSongDetail = ()=>{
    songDetail.value.upSongDetail()
}
//播放工具栏
const clickPlay = () => {
    if (audio.value.paused) {
        audio.value.play()
        playStyle.value = 'icon-zanting'
    }
    else {
        audio.value.pause()
        playStyle.value = 'icon-bofang'
    }
}

//audio
const currentTimeForLyric = ref(-1)
//传递当前时间用于获得歌词高亮
const timeForPass = ()=>{
    currentTimeForLyric.value = audio.value.currentTime
}
//音频播放时触发
const getDuration = () => {
    //获取音频时长
    duraTime.value.innerHTML = timeFormat(audio.value.duration)
}
//进度条变化时触发
const updateTime = () => {
    let x = (audio.value.currentTime / audio.value.duration) * 100
    slide.value.style.left = x + '%'
    fill.value.style.width = x + '%'
    if (audio.value.currentTime == 0) {
        slide.value.style.left = "0%";
    }
    currentTime.value.innerHTML = timeFormat(audio.value.currentTime)
    duraTime.value.innerHTML = timeFormat(audio.value.duration)
}
//播放结束

//格式化时间
const timeFormat = (time: number) => {
    let minute: string | number = Math.floor(time / 60)
    let second: string | number = Math.floor(time % 60)
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;
    return minute + ":" + second;
}
const arFormat = (ar: Ar[]) => {
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
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

//song-detail
.song-detail {
    position: absolute;
}

//footer
.footer {
    display: flex;
    height: 72px;
    border-top: #ececec solid 1.5px;
    font-size: 14px;
    color: #474747;
    z-index: 999;
}

.footer .foot-left {
    width: 230px;
    display: flex;
    align-items: center;
}

.foot-left img {
    cursor: pointer;
    width: 55px;
    margin-left: 15px;
    border-radius: 5px;
}

.foot-left .songNameAndSinger {
    font-size: 14px;
    margin-left: 10px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: start;
    font-size: 14px;
}

.songNameAndSinger i {
    margin-left: 10px;
}

.song-name {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.singer {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.footer .foot-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
}

.tool-list {
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
}

.tool-list li {
    cursor: pointer;
}

.tool-list li i {
    font-size: 20px;
}

.tool-list li:nth-child(3) i {
    font-size: 30px;
}

.foot-main .progress {
    position: relative;
    width: 65%;
    height: 3px;
    border-radius: 5px;
    background-color: rgba(221, 221, 221, 0.9);
}

.progress .slide {
    position: absolute;
    top: -1.6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ec4141;
    z-index: 9;
}

.progress .fill {
    position: absolute;
    top: 0;
    height: 3px;
    background-color: #ec4141;
}

.time {
    font-size: 10px;
    position: absolute;
    cursor: default;
}

.foot-main .currentTime {
    top: -8px;
    left: -37px;
}

.foot-main .duraTime {
    top: -8px;
    right: -40px;
}

.footer .ft_right {
    width: 220px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.ft_right .jigao {
    font-size: 14px;
    color: red;
    border: red 2px solid;
    line-height: 100%;
    padding: 2px;
    border-radius: 4px;
    user-select: none;
}

.ft_right .iconfont {
    font-size: 20px;
}</style>