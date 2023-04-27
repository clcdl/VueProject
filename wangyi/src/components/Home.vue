<template>
    <div class="index">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, provide,toRefs } from 'vue';
import { useRouter, useRoute, } from 'vue-router';
import {  noLogging,getSongUrl } from '../request/api';
import { SongInit } from '../type/song'
import Footer from '../components/Footer.vue'
import Main from '../components/Main.vue'
import Header from '../components/Header.vue'
const router = useRouter()
const route = useRoute()

//get InitData
const songInit = reactive(new SongInit())
const { data } = toRefs(songInit)
const songUrl = ref('')
//provide InitData
provide('songInit', songInit)
provide('songUrl',songUrl)

onMounted(() => {
    getSongUrlData()
    noLogging().then(res => {
        console.log(res.data)
    })
})
const getSongUrlData = () => {
    getSongUrl(data.value.id).then(res => {
        songUrl.value = res.data.data[0].url
    })
}
</script>

<style lang="less" scoped>

.index {
    width: 1022px;
    height: 670px;
    background-color: #fff;
    border: #ececec solid 1px;
    box-shadow: 2px 2px 10px #ccc;
}


</style>