import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/home',
    component: () => import('../components/Home.vue'),
    redirect:"found",
    children:[
      {
        path:"found",
        name:"found",
        meta:{
          belong:"mainMenuListTop",
          text:"发现音乐"
        },
        component:() => import('../components/Found.vue'),
        children:[
          {
            path:"recommendation",
            name:"recommendation",
            meta:{
              belong:"foundNavigation",
              text:"个性推荐"
            },
            component:() => import('../components/Recommendation.vue')
          },
          {
            path:"customized",
            name:"customized",
            meta:{
              belong:"foundNavigation",
              text:"专属定制"
            },
            component:() => import('../components/Recommendation.vue')
          },
          {
            path:"songsheet",
            name:"songsheet",
            meta:{
              belong:"foundNavigation",
              text:"歌单"
            },
            component:() => import('../components/Recommendation.vue')
          },
          {
            path:"rankinglist",
            name:"rankinglist",
            meta:{
              belong:"foundNavigation",
              text:"排行榜"
            },
            component:() => import('../components/Recommendation.vue')
          },
          {
            path:"singer",
            name:"singer",
            meta:{
              belong:"foundNavigation",
              text:"歌手"
            },
            component:() => import('../components/Recommendation.vue')
          },          {
            path:"latestmusic",
            name:"latestmusic",
            meta:{
              belong:"foundNavigation",
              text:"最新音乐"
            },
            component:() => import('../components/Recommendation.vue')
          },
        ]
      },
      {
        path:"podcast",
        name:"podcast",
        meta:{
          belong:"mainMenuListTop",
          text:"播客"
        },
        component:() => import('../components/Podcast.vue')
      },
      {
        path:"video",
        name:"video",
        meta:{
          belong:"mainMenuListTop",
          text:"视频"
        },
        component:() => import('../components/Video.vue'),
        redirect:"/video/video",
        children:[
          {
            path:"/video/video",
            name:"/video/video",
            meta:{
              belong:"videoNavigation",
              text:"视频"
            },
            component:() => import('../components/VideoVideo.vue')
          },
          {
            path:"/video/mv",
            name:"/video/mv",
            meta:{
              belong:"videoNavigation",
              text:"MV"
            },
            component:() => import('../components/VideoMV.vue')
          },
        ]
      },
      {
        path:"follow",
        name:"follow",
        meta:{
          belong:"mainMenuListTop",
          text:"关注"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"live",
        name:"live",
        meta:{
          belong:"mainMenuListTop",
          text:"直播"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"FM",
        name:"FM",
        meta:{
          belong:"mainMenuListTop",
          text:"私人FM"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"favorite",
        name:"favorite",
        meta:{
          belong:"mainMenuListBottom",
          text:"我喜欢的音乐"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"local",
        name:"local",
        meta:{
          belong:"mainMenuListBottom",
          text:"本地与下载"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"recently",
        name:"recently",
        meta:{
          belong:"mainMenuListBottom",
          text:"最近播放"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"clouddisk",
        name:"clouddisk",
        meta:{
          belong:"mainMenuListBottom",
          text:"我的音乐云盘"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"mypodcast",
        name:"mypodcast",
        meta:{
          belong:"mainMenuListBottom",
          text:"我的播客"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"collection",
        name:"collection",
        meta:{
          belong:"mainMenuListBottom",
          text:"我的收藏"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"created",
        name:"created",
        meta:{
          belong:"mainMenuListBottom",
          text:"创建的歌单"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"collected",
        name:"collected",
        meta:{
          belong:"mainMenuListBottom",
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
