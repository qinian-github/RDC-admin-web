//删除和修改合并的数据类型
export type listAllTournamentRes = Array<TournamentItem | null>
// 获取全部比赛信息 ,返回数据类型定义
export interface listAllTournament {
  code: number,
  msg: string,
  data:listAllTournamentRes
  }
//单个比赛数据定义
 export interface TournamentItem{
    id ?: number,
    eventName: string,
    athleteNumber: number,
    eventTime: number,
    preliminaryNumber: number,
    preliminaryAccess: number,
    quarterFinalsNumber:number,
    quarterFinalsAccess: number,
    semiFinalNumber: number,
    semiFinalAccess: number,
    finalNumber: number,
    finalAccess: number
}
//删除比赛信息
  export interface DeleteTournament {
   ids: Array<number>
  }
  //表单数据定义
  export interface TournamentFormItem {
    "id": number,
    "name": string,
    "stuNumber": string,
    "academy": string,
    "majorClass": string,
    "phoneNumber": string
    
  }

  
  
  
  