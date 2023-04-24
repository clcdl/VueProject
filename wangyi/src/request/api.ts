import service from ".";

export function noLogging(){
    return service({
        url:"/register/anonimous",
        method:"get"
    })
}
export function getBannerList(){
    return service({
        url:"/banner",
        method:"get"
    })
}
export function getRecommendationList(limit?:number){
    return service({
        url:"/personalized",
        method:"get",
        params:{
            limit
        }
    })
}
export function getHotPodcastList(){
    return service({
        url:"/dj/hot",
        method:"get"
    })
}
export function getPodcastRecommendList(){
    return service({
        url:"/program/recommend",
        method:"get"
    })
}

export function getVideoTagList(){
    return service({
        url:"/video/group/list",
        method:"get"
    })
}

export function getAllVideoList(){
    return service({
        url:"/video/timeline/all",
        method:"get"
    })
}

export function getSelectVideoList(id:number){
    return service({
        url:"/video/group",
        method:"get",
        params:{id}
    })
}

export function getLatestMVList(area?:string,limit?:number){
    return service({
        url:"/mv/first",
        method:"get",
        params:{
            area,
            limit
        }
    })
}

export function getWangyiMVList(){
    return service({
        url:"/mv/exclusive/rcmd?limit=6",
        method:"get"
    })
}
export function getTopMVList(area?:string,limit?:number){
    return service({
        url:"/top/mv",
        method:"get",
        params:{
            area,
            limit
        }
    })
}

export function getHotTopic(limit?:number){
    return service({
        url:"/hot/topic",
        method:"get",
        params:{
            limit
        }
    })
}

export function getRadarPlayList(){
    return service({
        url:"/recommend/resource",
        method:"get",
    })
}
export function getCategoryList(){
    return service({
        url:"/playlist/catlist",
        method:"get",
    })
}

export function getHotPlayList(){
    return service({
        url:"/playlist/hot",
        method:"get",
    })
}

export function getPlayList(cat?:string,limit?:number,offset?:number){
    return service({
        url:"/top/playlist",
        method:"get",
        params:{
            cat,
            limit,
            offset
        }
    })
}

export function getHighqualityTags(){
    return service({
        url:"/playlist/highquality/tags",
        method:"get",
    })
}

export function getHighqualityPlayList(cat?:string,limit?:number,offset?:number){
    return service({
        url:"/top/playlist/highquality",
        method:"get",
        params:{
            cat,
            limit,
            offset
        }
    })
}