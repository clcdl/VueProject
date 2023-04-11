export interface Artist {
	name: string;
	id: number;
	picId: number;
	img1v1Id: number;
	briefDesc: string;
	picUrl: string;
	img1v1Url: string;
	albumSize: number;
	alias: any[];
	trans: string;
	musicSize: number;
	topicPerson: number;
}

export interface Artist {
	name: string;
	id: number;
	picId: number;
	img1v1Id: number;
	briefDesc: string;
	picUrl: string;
	img1v1Url: string;
	albumSize: number;
	alias: any[];
	trans: string;
	musicSize: number;
	topicPerson: number;
}

export interface Artist {
	name: string;
	id: number;
	picId: number;
	img1v1Id: number;
	briefDesc: string;
	picUrl: string;
	img1v1Url: string;
	albumSize: number;
	alias: any[];
	trans: string;
	musicSize: number;
	topicPerson: number;
}

export interface Album {
	name: string;
	id: number;
	type?: any;
	size: number;
	picId: number;
	blurPicUrl: string;
	companyId: number;
	pic: number;
	picUrl: string;
	publishTime: number;
	description: string;
	tags: string;
	company?: any;
	briefDesc: string;
	artist: Artist;
	songs: any[];
	alias: any[];
	status: number;
	copyrightId: number;
	commentThreadId: string;
	artists: Artist[];
	subType?: any;
	transName?: any;
	mark: number;
	picId_str: string;
}

export interface BMusic {
	name?: any;
	id: number;
	size: number;
	extension: string;
	sr: number;
	dfsId: number;
	bitrate: number;
	playTime: number;
	volumeDelta: number;
}

export interface MMusic {
	name?: any;
	id: number;
	size: number;
	extension: string;
	sr: number;
	dfsId: number;
	bitrate: number;
	playTime: number;
	volumeDelta: number;
}

export interface LMusic {
	name?: any;
	id: number;
	size: number;
	extension: string;
	sr: number;
	dfsId: number;
	bitrate: number;
	playTime: number;
	volumeDelta: number;
}

export interface MainSong {
	name: string;
	id: number;
	position: number;
	alias: any[];
	status: number;
	fee: number;
	copyrightId: number;
	disc: string;
	no: number;
	artists: Artist[];
	album: Album;
	starred: boolean;
	popularity: number;
	score: number;
	starredNum: number;
	duration: number;
	playedNum: number;
	dayPlays: number;
	hearTime: number;
	ringtone: string;
	crbt?: any;
	audition?: any;
	copyFrom: string;
	commentThreadId: string;
	rtUrl?: any;
	ftype: number;
	rtUrls: any[];
	copyright: number;
	transName?: any;
	sign?: any;
	mark: number;
	noCopyrightRcmd?: any;
	rurl?: any;
	mvid: number;
	bMusic: BMusic;
	mp3Url?: any;
	rtype: number;
	hMusic?: any;
	mMusic: MMusic;
	lMusic: LMusic;
}

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
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	anchor: boolean;
	brand: string;
}

export interface Radio {
	dj?: any;
	category: string;
	secondCategory: string;
	buyed: boolean;
	price: number;
	originalPrice: number;
	discountPrice?: any;
	purchaseCount: number;
	lastProgramName?: any;
	videos?: any;
	finished: boolean;
	underShelf: boolean;
	liveInfo?: any;
	playCount: number;
	privacy: boolean;
	icon?: any;
	manualTagsDTO?: any;
	descPicList?: any;
	dynamic: boolean;
	intervenePicUrl: string;
	shortName?: any;
	categoryId: number;
	taskId: number;
	programCount: number;
	picId: number;
	subCount: number;
	radioFeeType: number;
	lastProgramCreateTime: number;
	picUrl: string;
	intervenePicId: number;
	feeScope: number;
	lastProgramId: number;
	name: string;
	id: number;
	desc: string;
	createTime: number;
	subed: boolean;
}

export interface PodcastRecommendType {
	mainSong: MainSong;
	songs?: any;
	dj: Dj;
	blurCoverUrl: string;
	radio: Radio;
	duration: number;
	authDTO?: any;
	buyed: boolean;
	programDesc?: any;
	h5Links?: any;
	canReward: boolean;
	auditStatus: number;
	videoInfo?: any;
	score: number;
	liveInfo?: any;
	alg: string;
	disPlayStatus?: any;
	auditDisPlayStatus: number;
	categoryName?: any;
	secondCategoryName?: any;
	existLyric: boolean;
	djPlayRecordVo?: any;
	recommended: boolean;
	icon?: any;
	adIconInfo?: any;
	isPublish: boolean;
	titbitImages?: any;
	channels: string[];
	trackCount: number;
	categoryId: number;
	createEventId: number;
	listenerCount: number;
	scheduledPublishTime: number;
	serialNum: number;
	coverId: number;
	smallLanguageAuditStatus: number;
	coverUrl: string;
	bdAuditStatus: number;
	secondCategoryId: number;
	pubStatus: number;
	reward: boolean;
	subscribedCount: number;
	mainTrackId: number;
	programFeeType: number;
	titbits?: any;
	privacy: boolean;
	commentThreadId: string;
	feeScope: number;
	name: string;
	id: number;
	description: string;
	createTime: number;
	reason: string;
	subscribed: boolean;
	shareCount: number;
	likedCount: number;
	commentCount: number;
}

export class PodcastRecommend {
	list:PodcastRecommendType[] = []
}