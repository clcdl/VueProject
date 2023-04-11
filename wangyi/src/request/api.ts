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
export function getRecommendationList(){
    return service({
        url:"/personalized?limit=10",
        method:"get"
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