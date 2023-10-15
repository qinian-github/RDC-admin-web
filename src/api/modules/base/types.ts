export interface CaptchaRes {
  code: 'string',
  data: {
    img: string,
    uuid: string
  }
}