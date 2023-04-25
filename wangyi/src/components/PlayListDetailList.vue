<template>
    <div class="list-header">
        <div class="operation" style="margin-left: 25px;"><span>操作</span></div>
        <div class="title"><span>标题</span></div>
        <div class="singer"><span>歌手</span></div>
        <div class="album"><span>专辑</span></div>
        <div class="time"><span>时间</span></div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import {getPlayListDetail,getAllSongs} from '../request/api'
onMounted(()=>{
    getPlayListDetailData()
})
const getPlayListDetailData = ()=>{
    getAllSongs(24381616).then(res=>{
        console.log(res.data)
    })
} 
</script>

<style lang="less" scoped>
li {
    list-style-type: none;
}
.list-header {
    display: flex;
    text-align: start;
}
.list-header span {
    margin-left: 3px;
}
.operation {
    width: 10%;
    background-color: antiquewhite;
}

.title {
    width: 35%;
    background-color: aqua;
}

.singer {
    width: 18%;
    background-color: royalblue;
}

.album {
    width: 23%;
    background-color: brown;
}

.time {
    flex: 1;
    background-color: aqua;
}</style>