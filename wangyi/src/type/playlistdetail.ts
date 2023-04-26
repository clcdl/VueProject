export interface Subscriber {
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
	anchor: boolean;
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	avatarImgId_str: string;
}

export interface Expert {
	2: string;
}

export interface AvatarDetail {
	userType: number;
	identityLevel: number;
	identityIconUrl: string;
}

export interface Creator {
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
	expertTags: string[];
	experts: Expert;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail: AvatarDetail;
	anchor: boolean;
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	avatarImgId_str: string;
}

export interface Ar {
	id: number;
	name: string;
	tns: any[];
	alias: any[];
}

export interface Al {
	id: number;
	name: string;
	picUrl: string;
	tns: any[];
	pic_str: string;
	pic: number;
}

export interface H {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface M {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface L {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Sq {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Hr {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Track {
	name: string;
	id: number;
	pst: number;
	t: number;
	ar: Ar[];
	alia?: any[];
	pop: number;
	st: number;
	rt?: any;
	fee: number;
	v: number;
	crbt?: any;
	cf: string;
	al: Al;
	dt: number;
	h: H;
	m: M;
	l: L;
	sq: Sq;
	hr: Hr;
	a?: any;
	cd: string;
	no: number;
	rtUrl?: any;
	ftype: number;
	rtUrls: any[];
	djId: number;
	copyright: number;
	s_id: number;
	mark: number;
	originCoverType: number;
	originSongSimpleData?: any;
	tagPicList?: any;
	resourceState: boolean;
	version: number;
	songJumpInfo?: any;
	entertainmentTags?: any;
	awardTags?: any;
	single: number;
	noCopyrightRcmd?: any;
	rtype: number;
	rurl?: any;
	mst: number;
	cp: number;
	mv: number;
	publishTime: number;
}

export interface TrackId {
	id: number;
	v: number;
	t: number;
	at: number;
	alg?: any;
	uid: number;
	rcmdReason: string;
	sc?: any;
	f?: any;
	sr?: any;
}

export interface Playlist {
	id: number;
	name: string;
	coverImgId: number;
	coverImgUrl: string;
	coverImgId_str: string;
	adType: number;
	userId: number;
	createTime: number;
	status: number;
	opRecommend: boolean;
	highQuality: boolean;
	newImported: boolean;
	updateTime: number;
	trackCount: number;
	specialType: number;
	privacy: number;
	trackUpdateTime: number;
	commentThreadId: string;
	playCount: number;
	trackNumberUpdateTime: number;
	subscribedCount: number;
	cloudTrackCount: number;
	ordered: boolean;
	description: string;
	tags: string[];
	updateFrequency?: any;
	backgroundCoverId: number;
	backgroundCoverUrl?: any;
	titleImage: number;
	titleImageUrl?: any;
	englishTitle?: any;
	officialPlaylistType?: any;
	copied: boolean;
	relateResType?: any;
	subscribers: Subscriber[];
	subscribed: boolean;
	creator: Creator;
	tracks: Track[];
	videoIds?: any;
	videos?: any;
	trackIds: TrackId[];
	bannedTrackIds?: any;
	mvResourceInfos?: any;
	shareCount: number;
	commentCount: number;
	remixVideo?: any;
	sharedUsers?: any;
	historySharedUsers?: any;
	gradeStatus: string;
	score?: any;
	algTags: string[];
}

export interface FreeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
	listenType?: any;
}

export interface ChargeInfoList {
	rate: number;
	chargeUrl?: any;
	chargeMessage?: any;
	chargeType: number;
}

export interface Privilege {
	id: number;
	fee: number;
	payed: number;
	realPayed: number;
	st: number;
	pl: number;
	dl: number;
	sp: number;
	cp: number;
	subp: number;
	cs: boolean;
	maxbr: number;
	fl: number;
	pc?: any;
	toast: boolean;
	flag: number;
	paidBigBang: boolean;
	preSell: boolean;
	playMaxbr: number;
	downloadMaxbr: number;
	maxBrLevel: string;
	playMaxBrLevel: string;
	downloadMaxBrLevel: string;
	plLevel: string;
	dlLevel: string;
	flLevel: string;
	rscl?: any;
	freeTrialPrivilege: FreeTrialPrivilege;
	chargeInfoList: ChargeInfoList[];
}

export interface PlayListDetailType {
	code: number;
	relatedVideos?: any;
	playlist: Playlist;
	urls?: any;
	privileges: Privilege[];
	sharedPrivilege?: any;
	resEntrance?: any;
	fromUsers?: any;
	fromUserCount: number;
	songFromUsers?: any;
}
export class PlayListDetail {
	data: PlayListDetailType = {
		code: 200,
		playlist: {
			id: 0,
			name: '',
			coverImgId: 0,
			coverImgUrl: '',
			coverImgId_str: ',',
			adType: 1,
			userId: 1,
			createTime: 1,
			status: 1,
			opRecommend: false,
			highQuality: false,
			newImported: false,
			updateTime: 1,
			trackCount: 1,
			specialType: 1,
			privacy: 1,
			trackUpdateTime: 1,
			commentThreadId: '',
			playCount: 1,
			trackNumberUpdateTime: 1,
			subscribedCount: 1,
			cloudTrackCount: 1,
			ordered: false,
			description: '',
			tags: [],
			backgroundCoverId: 1,
			titleImage: 1,
			copied: false,
			subscribers: [],
			subscribed: false,
			creator: {
				defaultAvatar: false,
				province: 1,
				authStatus: 1,
				followed: false,
				avatarUrl: '',
				accountStatus: 1,
				gender: 1,
				city: 1,
				birthday: 1,
				userId: 1,
				userType: 1,
				nickname: '',
				signature: '',
				description: '',
				detailDescription: '',
				avatarImgId: 1,
				backgroundImgId: 1,
				backgroundUrl: '',
				authority: 1,
				mutual: false,
				expertTags: [],
				experts: {
					2: '',
				},
				djStatus: 1,
				vipType: 1,
				authenticationTypes: 1,
				avatarDetail: {
					userType: 1,
					identityLevel: 1,
					identityIconUrl: '',
				},
				anchor: false,
				avatarImgIdStr: '',
				backgroundImgIdStr: '',
				avatarImgId_str: '',
			},
			tracks: [],
			trackIds: [],
			shareCount: 1,
			commentCount: 1,
			gradeStatus: '',
			algTags: [],
		},
		privileges: [],
		fromUserCount: 1,
	}
}