<template>
    <div class="list-header">
        <div class="operation" style="margin-left: 40px;"><span>操作</span></div>
        <div class="title"><span>标题</span></div>
        <div class="singer"><span>歌手</span></div>
        <div class="album"><span>专辑</span></div>
        <div class="time"><span>时间</span></div>
    </div>
    <div class="list" v-for="item, index in songListData.songList">
        <div class="operation" style="margin-left: 16px;color: darkgray;width: 13%;"><span>{{ indexFormat(index) }}</span>
        </div>
        <div class="title">
            <p>{{ item.name }}</p>
        </div>
        <div class="singer">
            <p>{{ arFormat(item.ar) }}</p>
        </div>
        <div class="album">
            <p>{{ item.al.name }}</p>
        </div>
        <div class="time">
            <p>{{ timeFormat(item.dt) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getPlayListDetail, getAllSongs } from '../request/api'
import { SongList, Ar } from '../type/song'
import { useRoute, useRouter } from 'vue-router';
onMounted(() => {
    getPlayListDetailData()
})
const router = useRouter()
const route = useRoute()
//
const songListData = reactive(new SongList())
const getPlayListDetailData = () => {
    getAllSongs(route.query.id as unknown as number, 50).then(res => {
        songListData.songList = res.data.songs
        songListData.privilegesList = res.data.privileges
        console.log(songListData)
    })
}

const indexFormat = (number: number) => {
    if (number < 10) {
        return '0' + number
    }
    else return number + ''
}
const timeFormat = (time: number) => {
    let minutes = Math.ceil((time % 3600000) / 60000);
    let seconds = Math.ceil((time % 60000) / 1000);
    return indexFormat(minutes) + ':' + indexFormat(seconds)
}
const arFormat = (ar: Ar[]) => {
    let singer = ''
    ar.forEach(item => {
        singer = singer +'/'+ item.name
    })
    return singer
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
}

.title {
    width: 35%;
}

.singer {
    width: 18%;
}

.album {
    width: 23%;
}

.time {
    flex: 1;
}

.list {
    display: flex;
    height: 35px;
    line-height: 35px;
    text-align: start;
}

.list:nth-child(odd) {
    background-color: #f6f6f7;
}

.list p {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 1px;
    margin-left: 3px;
    color: #474747;
}</style>