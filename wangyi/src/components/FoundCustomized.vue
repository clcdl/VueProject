<template>
    <div class="customized">
        <div class="radar-box">
            <div class="radar-title">你的雷达歌单</div>
            <div class="radar-description">根据你的红心收藏为你推荐更多宝藏歌曲</div>
        </div>
        <div class="radar-list-box">
            <ul class="radar-list">
                <li class="radar-list-item" v-for="item in RadarPlayListForFive.list" :key="item.id">
                    <img :src="item.picUrl" alt="">
                    <p>{{ item.name }}</p>
                    <div class="play-time-box">
                        <span class="play-time">{{ playCountFormat(item.playcount) }}</span>
                        <div class="play"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="rec">
            <div class="rec-title">黄昏也挡不住好音乐</div>
            <div class="rec-list-box">
                <ul class="rec-list">
                    <li class="rec-list-item" v-for="item in recData.list" :key="item.id">
                        <img :src="item.picUrl" alt="">
                        <p>{{ item.name }}</p>
                        <div class="play-time-box">
                            <span class="play-time">{{ playCountFormat(item.playCount) }}</span>
                            <div class="play"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getRadarPlayList, getRecommendationList } from '../request/api'
import { RadarPlayList } from '../type/radarplaylist'
import { RecommendationList } from '../type/recommendation'
onMounted(() => {
    getRadarPlayListData()
})

const RadarPlayListData = reactive(new RadarPlayList())

const RadarPlayListForFive = reactive(new RadarPlayList())
const getRadarPlayListData = () => {
    getRadarPlayList().then(res => {
        RadarPlayListData.list = res.data.recommend
        RadarPlayListForFive.list = RadarPlayListData.list.filter((item, index) => { return index < 5 })
    })
}

//rec
const recData = reactive(new RecommendationList())
getRecommendationList(50).then(res => {
    recData.list = res.data.result
})
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

.radar-box {
    height: 70px;
}

.radar-title {
    height: 40px;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    font-weight: bold;
    margin-left: 25px;
}

.radar-description {
    height: 30px;
    line-height: 30px;
    text-align: left;
    margin-left: 25px;
    color: darkgray;
}

.radar-list-box {
    margin-top: 10px;
    height: 190px;
}

.radar-list {
    margin-left: 25px;
    height: 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.radar-list-item {
    cursor: pointer;
    position: relative;
    width: 140px;
    height: 190px;
    display: flex;
    flex-direction: column;
}

.radar-list-item img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
}

.radar-list-item p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
    text-align: left;
    margin-top: 2px;
    font-size: 14px;
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
//rec
.rec-title {
    height: 40px;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    font-weight: bold;
    margin-left: 25px;

}
.rec-list-box {
    margin-top: 10px;
}

.rec-list {
    margin-left: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.rec-list-item {
    cursor: pointer;
    position: relative;
    width: 140px;
    height: 190px;
    display: flex;
    flex-direction: column;
}

.rec-list-item img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
}

.rec-list-item p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
    text-align: left;
    margin-top: 2px;
    font-size: 14px;
}
</style>