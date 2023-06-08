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
        redirect:"/found/recommendation",
        children:[
          {
            path:"/found/recommendation",
            name:"/found/recommendation",
            meta:{
              belong:"foundNavigation",
              text:"个性推荐"
            },
            component:() => import('../components/FoundRecommendation.vue')
          },
          {
            path:"/found/customized",
            name:"/found/customized",
            meta:{
              belong:"foundNavigation",
              text:"专属定制"
            },
            component:() => import('../components/FoundCustomized.vue')
          },
          {
            path:"/found/songsheet",
            name:"/found/songsheet",
            meta:{
              belong:"foundNavigation",
              text:"歌单"
            },
            component:() => import('../components/FoundSongSheet.vue')
          },
          {
            path:"/found/ranklist",
            name:"/found/ranklist",
            meta:{
              belong:"foundNavigation",
              text:"排行榜"
            },
            component:() => import('../components/FoundRankList.vue')
          },
          {
            path:"/found/singer",
            name:"/found/singer",
            meta:{
              belong:"foundNavigation",
              text:"歌手"
            },
            component:() => import('../components/FoundSinger.vue')
          },          {
            path:"/found/latest",
            name:"/found/latest",
            meta:{
              belong:"foundNavigation",
              text:"最新音乐"
            },
            component:() => import('../components/FoundLatest.vue')
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
        component:() => import('../components/Follow.vue')
      },
      {
        path:"FM",
        name:"FM",
        meta:{
          belong:"mainMenuListTop",
          text:"私人FM"
        },
        component:() => import('../components/FM.vue')
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
        path:"created",
        name:"created",
        meta:{
          belong:"mainMenuListBottom",
          text:"创建的歌单"
        },
        component:() => import('../components/Found.vue')
      },
      {
        path:"playlistdetail",
        name:"playlistdetail",
        component:() => import('../components/PlayListDetail.vue'),
        redirect:'/playlistdetail/list',
        children:[
          {
            path:"/playlistdetail/list",
            name:"/platlistdetail/list",
            meta:{
              belong:"playlistdetail",
              text:"歌曲列表"
            },
            component:() => import('../components/PlayListDetailList.vue')
          },
          {
            path:"/playlistdetail/comment",
            name:"/platlistdetail/comment",
            meta:{
              belong:"playlistdetail",
              text:"评论"
            },
            component:() => import('../components/PlayListComment.vue')
          },
          {
            path:"/playlistdetail/collection",
            name:"/platlistdetail/collection",
            meta:{
              belong:"playlistdetail",
              text:"收藏"
            },
            component:() => import('../components/PlayListCollection.vue')
          },
        ]
      },
      {
        path:"/search",
        name:"/search",
        meta:{
          belong:"search",
          text:"搜索"
        },
        component:() => import('../components/SearchResult.vue')
      },
      {
        path:"/refresh",
        name:"/refresh",
        meta:{
          belong:"refresh",
          text:"刷新空白页"
        },
        component:() => import('../components/Refresh.vue')
      }
    ]
  },

] 
 
const router = createRouter({
  history: createWebHistory(),
  routes
})
 
export default router
