export interface TopicType {
	actId: number;
	title: string;
	text: string[];
	participateCount: number;
	iconUrl?: any;
	readCnt?: any;
	topicDisplayType?: any;
	bizId?: any;
	bizType?: any;
	memberCount?: any;
	onlineNum?: any;
	sharePicUrl: string;
	reason: string;
	isDefaultImg: boolean;
	alg: string;
}

export class HotTopicList{
    list:TopicType[] = []
}