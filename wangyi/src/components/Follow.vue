<template>
    <div class="follow">
        <div class="main">
            <div class="main-header">
                <p>动态</p>
                <div class="post">
                    <span></span>
                    <p>发动态</p>
                </div>
            </div>
            <div class="post-list">暂无动态
            </div>
        </div>
        <div class="broadside">
            <div class="login">
                <p>立即登录</p>
            </div>
            <div class="topic">
                <div class="topic-header">
                    <span>热门话题</span>
                    <p>更多</p>
                </div>
                <div class="topic-list">
                    <ul>
                        <li class="topic-list-item" 
                        v-for="item,index in hotTopicData.list" 
                        :key="item.actId"
                        :class="{isHover:isHoverHotTopicItem(index)}"
                        @mouseenter="enterHotTopicItem(index)"
                        @mouseleave="leaveHotTopicItem()"
                        >
                        <img :src="item.sharePicUrl" alt="">
                        <div class="topic-detail">
                            <p class="topic-text">{{ topicTextFormat(item.title) }}</p>
                            <span class="topic-count">{{ topicCountFormat(item.participateCount) }}</span>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import {getHotTopic,ceateQrKey,ceateQr,qrCheck} from '../request/api'
import {HotTopicList} from '../type/topic'
onMounted(()=>{
    getHotTopicData()
})
/* const log = ()=>{
    ceateQrKey().then(res=>{
        console.log(res.data.data.unikey)
        ceateQr(res.data.data.unikey).then(res=>{
            console.log(res.data)
        })
    })
} */
//热门话题
const hotTopicData = reactive(new HotTopicList())
const getHotTopicData = ()=>{
    getHotTopic(5).then((res)=>{
       hotTopicData.list = res.data.hot
    })
}
let hotTopicHoverIndex = ref(-1)
const enterHotTopicItem = (index:number)=>{
    hotTopicHoverIndex.value = index
}
const leaveHotTopicItem = ()=>{
    hotTopicHoverIndex.value = -1
}
const isHoverHotTopicItem = (index:number)=>{
    return hotTopicHoverIndex.value === index
}
const topicTextFormat = (text:string)=>{
    return '#'+text+'#'
}
const topicCountFormat = (count:number)=>{
    return count+'人参与'
}
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}

.follow {
    height: 100%;
    width: 100%;
    display: flex;
}

//中部
.main {
    flex: 1;
}

.main-header {
    display: flex;
    align-items: center;
    width: calc(100%-25px);
    height: 40px;
    margin-top: 25px;
    margin-left: 25px;
}

.main-header p {
    width: 70px;
    height: 30px;
    font-size: larger;
    font-weight: bold;
}

.post {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 90px;
    height: 30px;
    border-radius: 20px;
    color: aliceblue;
    background-color: rgba(255, 0, 0, 85%);
}

.post p {
    width: 50px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
}

.post-list {
    height: calc(100% - 40px - 25px - 25px);
    margin: 25px 25px;
}

//侧部
.broadside {
    display: flex;
    flex-direction: column;
    width: 225px;
    height: 100%;
    border-left: 1.5px solid #eee;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.login p {
    width: 160px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    line-height: 40px;
    color: aliceblue;
    background-color: rgba(255, 0, 0, 85%);
}

.topic {
    height: 50%;
}

.topic-header {
    display: flex;
    justify-content: space-between;
    height: 30px;
    font-size: 10px;
}

.topic-header span {
    margin-left: 20px;
    font-weight: 700;
}

.topic-header p {
    color: darkgray;
}

.topic-list {
    height: calc(100% - 20px);
}

.topic-list ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
}

.topic-list-item {
    display: flex;
    height: 20%;
    cursor: pointer;
}
.topic-list-item img {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin-left: 20px;
}
.topic-detail {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    font-size: 10px;
    text-align: left;
}
.topic-count {
    color: darkgray;
}
.isHover {
    background-color: #f6f6f7;
}
</style>