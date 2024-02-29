export interface CaptchaRes {
  code: 'string',
  data: {
    img: string,
    uuid: string
  }
}

export type ExportFileParams = "前端" | "后台" | "安卓" | "AI" | "UI"