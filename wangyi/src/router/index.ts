import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/home',
    component: () => import('../App.vue'),
    redirect:"found",
    children:[
      {
        path:"found",
        name:"found",
        meta:{
          text:"发现音乐"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"podcast",
        name:"podcast",
        meta:{
          text:"播客"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"video",
        name:"video",
        meta:{
          text:"视频"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"follow",
        name:"follow",
        meta:{
          text:"关注"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"live",
        name:"live",
        meta:{
          text:"直播"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"FM",
        name:"FM",
        meta:{
          text:"私人FM"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"myMusic",
        name:"myMusic",
        meta:{
          text:"我的音乐"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"favorite",
        name:"favorite",
        meta:{
          text:"我喜欢的音乐"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"local",
        name:"local",
        meta:{
          text:"本地与下载"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"recently",
        name:"recently",
        meta:{
          text:"最近播放"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"clouddisk",
        name:"clouddisk",
        meta:{
          text:"我的音乐云盘"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"mypodcast",
        name:"mypodcast",
        meta:{
          text:"我的播客"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"collection",
        name:"collection",
        meta:{
          text:"我的收藏"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"created",
        name:"created",
        meta:{
          text:"创建的歌单"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"collected",
        name:"collected",
        meta:{
          text:"收藏的歌单"
        },
        component:() => import('../components/Found.vue')
      },
    ]
  }
] 
 
const router = createRouter({
  history: createWebHistory(),
  routes
})
 
export default router
