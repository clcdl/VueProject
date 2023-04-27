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
	pic: number;
}

export interface H {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface M {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface L {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface Sq {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface Song {
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
	hr?: any;
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
	tns: string[];
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
	st: number;
	pl: number;
	dl: number;
	sp: number;
	cp: number;
	subp: number;
	cs: boolean;
	maxbr: number;
	fl: number;
	toast: boolean;
	flag: number;
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

export interface SongType {
	songs: Song[];
	privileges: Privilege[];
	code: number;
}
export class SongList {
    songList:Song[] = []
    privilegesList:Privilege[]=[]
}

export class SongInit {
	data:Song = {
		name: '长生诀',
		id: 462391069,
		pst: 0,
		t: 0,
		ar: [
			{
				id: 1115075,
				name: '西瓜JUN',
				tns: [],
				alias: []
			}
		],
		alia: [],
		pop: 100,
		st: 0,
		rt: null,
		fee: 8,
		v: 23,
		crbt: null,
		cf: '',
		al: {
			id: 35221766,
			name: '长生诀',
			picUrl: 'https://p2.music.126.net/ZUev7OhmNBD1gmuW1km7ew==/109951162867290084.jpg',
			tns: [],
			pic: 109951162867290080
		},
		dt: 191738,
		h: {
			br: 320000,
			fid: 0,
			size: 7671685,
			vd: -74516,
			sr: 44100
		},
		m: {
			br: 192000,
			fid: 0,
			size: 4603028,
			vd: -74516,
			sr: 44100
		},
		l: {
			br: 128000,
			fid: 0,
			size: 3068700,
			vd: -74516,
			sr: 44100
		},
		sq: {
			br: 942377,
			fid: 0,
			size: 22586280,
			vd: -74516,
			sr: 44100
		},
		hr: null,
		a: null,
		cd: '01',
		no: 1,
		rtUrl: null,
		ftype: 0,
		rtUrls: [],
		djId: 0,
		copyright: 0,
		s_id: 0,
		mark: 0,
		originCoverType: 1,
		originSongSimpleData: null,
		tagPicList: null,
		resourceState: true,
		version: 23,
		songJumpInfo: null,
		entertainmentTags: null,
		awardTags: null,
		single: 0,
		noCopyrightRcmd: null,
		mst: 9,
		cp: 0,
		mv: 0,
		rtype: 0,
		rurl: null,
		publishTime: 1471449600000,
		tns:[]
	}
}

export interface FreeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
	listenType?: any;
	cannotListenReason?: any;
}

export interface FreeTimeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
	type: number;
	remainTime: number;
}

export interface SongUrlType {
	id: number;
	url: string;
	br: number;
	size: number;
	md5: string;
	code: number;
	expi: number;
	type: string;
	gain: number;
	peak: number;
	fee: number;
	uf?: any;
	payed: number;
	flag: number;
	canExtend: boolean;
	freeTrialInfo?: any;
	level: string;
	encodeType: string;
	freeTrialPrivilege: FreeTrialPrivilege;
	freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
	urlSource: number;
	rightSource: number;
	podcastCtrp?: any;
	effectTypes?: any;
	time: number;
}
export class SongUrlData{
	list:SongUrlType[]=[]
}

