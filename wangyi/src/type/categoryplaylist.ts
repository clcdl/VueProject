export interface All {
    name: string;
    resourceCount: number;
    imgId: number;
    imgUrl?: any;
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
}

export interface Sub {
    name: string;
    resourceCount: number;
    imgId: number;
    imgUrl?: any;
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
}

export interface Category {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
}

export interface CategoryPlayListType {
    code: number
    all: All;
    sub: Sub[];
    categories: Category;
}

export class CategoryPlayList {
    data: CategoryPlayListType = {
        code: 1,
        all: { "name": "全部歌单", "resourceCount": 1000, "imgId": 0, "imgUrl": null, "type": 0, "category": 4, "resourceType": 0, "hot": false, "activity": false },
        sub: [],
        categories: { "0": "语种", "1": "风格", "2": "场景", "3": "情感", "4": "主题" }
    }
}
export class CategoryTagExpand {
    list: Sub[] = []
}
