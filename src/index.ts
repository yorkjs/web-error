import { Config } from './type'
import { captureError } from './catch'

export function sendImage(url: string, message: string) {
  let img: any = new Image()

  img.onload =
  img.onerror = function () {
    img =
    img.onload =
    img.onerror = null
  }

  img.src = `${url}?${message}`
}

export function sendBeacon(url: string, data: any) {
  navigator.sendBeacon(url, data)
}

export function init(config: Config) {
  captureError(config)
}

/**
 * 版本
 */
export const version = process.env.NODE_VERSION