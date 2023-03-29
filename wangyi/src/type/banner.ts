export interface BannerType {
	imageUrl: string;
	targetId: number;
	adid?: any;
	targetType: number;
	titleColor: string;
	typeTitle: string;
	url?: any;
	exclusive: boolean;
	monitorImpress?: any;
	monitorClick?: any;
	monitorType?: any;
	monitorImpressList?: any;
	monitorClickList?: any;
	monitorBlackList?: any;
	extMonitor?: any;
	extMonitorInfo?: any;
	adSource?: any;
	adLocation?: any;
	adDispatchJson?: any;
	encodeId: string;
	program?: any;
	event?: any;
	video?: any;
	song?: any;
	scm: string;
	bannerBizType: string;
}
/* export class Banner implements BannerType{
	imageUrl= '';
	targetId= 0 ;
	targetType = 0;
	titleColor = '';
	typeTitle = '';
	exclusive = false;
	encodeId = '';
	scm = '';
	bannerBizType = '';
} */

export class BannerList {
	bannerList: BannerType[] = [];
}
export class resBannerStyle {
	styleList: string[] =
		['firstBanner',
			'secondBanner',
			'rightBanner',
			'rightBanner',
			'rightBanner',
			'rightBanner',
			'rightBanner',
			'lastBanner']
}