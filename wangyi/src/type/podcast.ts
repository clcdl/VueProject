export interface Dj {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail?: any;
	backgroundImgIdStr: string;
	avatarImgIdStr: string;
	anchor: boolean;
	avatarImgId_str: string;
}

export interface PodcastType {
	id: number;
	name: string;
	picUrl: string;
	programCount: number;
	subCount: number;
	createTime: number;
	categoryId: number;
	category: string;
	rcmdtext: string;
	radioFeeType: number;
	feeScope: number;
	playCount: number;
	subed: boolean;
	dj: Dj;
	copywriter: string;
	buyed: boolean;
}

export class HotPodcastList {
    list:PodcastType[] = []
}

export interface ImgStyle {
	img:string;
	tilte:string;
}
export class StyleForNavigationRight {
	list:ImgStyle[] = [
		{img:'img-rank',tilte:'排行榜'},
		{img:'img-motion',tilte:'情感'},
		{img:'img-recommendation',tilte:'音乐推荐'},
		{img:'img-book',tilte:'有声书'},
		{img:'img-talk',tilte:'脱口秀'},
		{img:'img-cover',tilte:'创作翻唱'},
		{img:'img-electric',tilte:'电音'},
		{img:'img-knowledge',tilte:'知识'},
	]
}