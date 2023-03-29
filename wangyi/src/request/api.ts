import service from ".";



export function getBannerList(){
    return service({
        url:"/banner",
        method:"get"
    })
}