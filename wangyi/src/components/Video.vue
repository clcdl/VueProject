<template>
    <div class="video-navigation">
        <ul>
            <li v-for="item,index in videoNavigationList" :key="item.path"
            @mouseenter="navEnter(index)"
            @mouseleave="navLeave()"
            @click="navClick(index)"
            :class="[{ active: isActive(index) }, { isHover: isHover(index) }]"
            >
            {{ item.meta.text }}
            </li>
        </ul>
    </div>
    <div class="video-detail">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
//navigation
const videoNavigationList = useRouter().getRoutes().filter((item)=>item.meta.belong == 'videoNavigation')
let activeIndex = ref(0)
let hoverIndex = ref(-1)
const navClick = (index: number) => {
    activeIndex.value = index
}
const navEnter = (index: number) => {
    hoverIndex.value = index
}
const navLeave = () => {
    hoverIndex.value = -1
}
const isActive = (index: number) => {
    return index === activeIndex.value
}
const isHover = (index: number) => {
    return index === hoverIndex.value
}
</script>

<style lang="less" scoped>
//video navigation
.video-navigation {
    display: flex;
    align-items: center;
    height: 60px;
}
.video-navigation ul {
    display: flex;
}
.video-navigation li {
    cursor: pointer;
    list-style-type: none;
    position: relative;
    color: #474747;
    margin-left: 25px;
}

.active {
    font-weight: 700;
    font-size: 20px;
}

.active::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 4px;
    border-radius: 5px;
    background-color: #e20000;
    top: 30px;
    left: 5px;
}

.isHover {
    color: black !important;
}

//video-detail

.video-detail::-webkit-scrollbar {
    width: 8px;
}

.video-detail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(224, 224, 224);
}

.video-detail::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255);
}
</style>