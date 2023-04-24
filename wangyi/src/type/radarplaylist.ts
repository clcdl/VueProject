export interface Creator {
	mutual: boolean;
	remarkName?: any;
	backgroundImgIdStr: string;
	detailDescription: string;
	defaultAvatar: boolean;
	expertTags?: any;
	djStatus: number;
	avatarImgId: number;
	backgroundImgId: number;
	followed: boolean;
	backgroundUrl: string;
	avatarImgIdStr: string;
	accountStatus: number;
	vipType: number;
	province: number;
	avatarUrl: string;
	authStatus: number;
	userType: number;
	nickname: string;
	gender: number;
	birthday: number;
	city: number;
	userId: number;
	description: string;
	signature: string;
	authority: number;
}

export interface RadarPlayListType {
	id: number;
	type: number;
	name: string;
	copywriter: string;
	picUrl: string;
	playcount: number;
	createTime: number;
	creator: Creator;
	trackCount: number;
	userId: number;
	alg: string;
}
export class RadarPlayList {
    list:RadarPlayListType[] = []
}