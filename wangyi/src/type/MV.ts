export interface Artist {
	id: number;
	name: string;
}

export interface MVType {
	id: number;
	cover: string;
	name: string;
	playCount: number;
	briefDesc?: any;
	desc?: any;
	artistName: string;
	artistId: number;
	duration: number;
	mark: number;
	subed: boolean;
	artists: Artist[];
}
export class LatestMVList{
    list:MVType[] = []
}

export class wangyiMVList{
    list:MVType[] = []
}

export interface tagType {
	tagSign:string
}