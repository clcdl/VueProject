<template>
    <div class="found">
        <ul class="navigation">
            <li v-for="item, index in navList" :key="item.path" @click="navClick(index)" @mouseenter="navEnter(index)"
                @mouseleave="navleave" :class="[{ active: isActive(index) }, { isHover: isHover(index) }]">
                <span>{{ item.meta.text }}</span>
            </li>
        </ul>
        <div class="found-detail">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const navList = router.getRoutes().filter((item) => item.meta.belong == "foundNavigation")
const route = useRoute()
onMounted(()=>{

})
//navigation
let activeIndex = ref(0)
let hoverIndex = ref(-1)
const navClick = (index: number) => {
    router.push({
        path: navList[index].path
    })
    activeIndex.value = index
}
const navEnter = (index: number) => {
    hoverIndex.value = index
}
const navleave = () => {
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
li {
    list-style-type: none;
}

/* 导航栏 */
.navigation {
    display: flex;
    align-items: center;
    height: 70px;
}

.navigation li {
    cursor: pointer;
    margin-left: 25px;
    position: relative;
    color: #474747;
}

.active {
    font-weight: 700;
    font-size: 20px;
}

.active::before {
    content: '';
    width: 80%;
    height: 2.5px;
    position: absolute;
    background-color: #ec4141;
    border-radius: 5px;
    top: 30px;
    left: 5px;
}

.isHover {
    color: black !important;
}
</style>