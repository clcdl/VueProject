export interface PlaylistTag {
	id: number;
	name: string;
	category: number;
	usedCount: number;
	type: number;
	position: number;
	createTime: number;
	highQuality: number;
	highQualityPos: number;
	officialPos: number;
}

export interface HotPlayListType {
	playlistTag: PlaylistTag;
	activity: boolean;
	createTime: number;
	usedCount: number;
	hot: boolean;
	position: number;
	category: number;
	name: string;
	id: number;
	type: number;
}
export class HotPlayList {
    list:HotPlayListType [] =[]
}