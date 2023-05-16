export interface LyricType {
	version: number;
	lyric: string;
}
export interface ResultType {
    time:number,
    word:string
}
export class Lyric{
    data:LyricType = {
        version:1,
        lyric:''
    }
}
export class Result{
    list:ResultType[] = []
}