import { Config, ErrorMsg } from './type'
import { WINDOW_ERROR, WINDOW_ONERROR } from './constant'


function catchListenerError(event: ErrorEvent, config: Config) {
  try {
    // 只上报资源类型的错误
    const target = event.target || event.srcElement
    const isHTMLElement = target && target instanceof HTMLElement
    if (isHTMLElement) {
      const targetURL = (target as any).href || (target as any).src
      const msgObj: ErrorMsg = {
        url: location.href,
        type: WINDOW_ERROR,
        error: event.message || targetURL,
        file: event.filename || targetURL,
        line: event.lineno,
        column: event.colno,
      }

      config.reportError(msgObj)
    }
  } catch (err) {

  }
  // 用 preventDefault() 方法可以阻止异常信息出现在控制台
  // 但如果是加载资源异常无法阻止
  // event.preventDefault()
}

export function captureError(config: Config) {
  const handleError = function (event: ErrorEvent) {
    catchListenerError(event, config)
  }

  const onerror = window.onerror

  /*
   * message — 错误信息（字符串）
   * source — 发生异常的脚本URL（字符串）
   * lineno — 发生异常的行号（数字）
   * colno — 发生异常的列号（数字)
   * error — Error 对象
   */
  window.onerror = function (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: any
  ) : boolean {

    if (onerror) {
      onerror(message, source, lineno, colno, error)
    }

    try {
      const msgObj: ErrorMsg = {
        url: location.href,
        type: WINDOW_ONERROR,
        error: message.toString(),
        file: source,
        line: lineno,
        column: colno,
      }

      // 忽略 Script error. 错误
      if (config.ignoreScriptError && msgObj.error === 'Script error.') {
        return false
      }

      config.reportError(msgObj)
    } catch (err) {

    }

    // 返回 true 可以阻止异常信息出现在控制台
    return false
  }

  if (window.addEventListener) {
    window.addEventListener(
      'error',
      handleError,
      // 当一项资源（如<img>或<script>）加载失败，该 error 不会冒泡到 window，可在捕获阶段捕获
      // true 代表在捕获阶段调用，false 代表在冒泡阶段
      true
    )
  }
  // 兼容 IE 8
  else if (window.attachEvent) {
    window.attachEvent('onerror', handleError)
  }
}
