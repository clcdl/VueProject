export interface VideoTagType {
	id: number;
	name: string;
	url?: any;
	relatedVideoType?: any;
	selectTab: boolean;
	abExtInfo?: any;
}
export class VideoTagList {
    list:VideoTagType[] = []
}