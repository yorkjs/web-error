/**
 * web-error.js v1.0.1
 * (c) 2021-2022 shushu2013
 * Released under the MIT License.
 */

const WINDOW_ONERROR = 1;
const WINDOW_ERROR = 2;

function captureError(config) {
    const onerror = window.onerror;
    /*
     * message — 错误信息（字符串）
     * source — 发生异常的脚本URL（字符串）
     * lineno — 发生异常的行号（数字）
     * colno — 发生异常的列号（数字)
     * error — Error 对象
     */
    window.onerror = function (message, source, lineno, colno, error) {
        if (onerror) {
            onerror(message, source, lineno, colno, error);
        }
        try {
            const msgObj = {
                url: location.href,
                type: WINDOW_ONERROR,
                error: message.toString(),
                file: source,
                line: lineno,
                column: colno,
            };
            config.reportError(msgObj);
        }
        catch (err) {
        }
        // 返回 true 可以阻止异常信息出现在控制台
        return false;
    };
    window.addEventListener('error', function (event) {
        try {
            const msgObj = {
                url: location.href,
                type: WINDOW_ERROR,
                error: event.message,
                file: event.filename,
                line: event.lineno,
                column: event.colno,
            };
            // 只上报资源类型的错误
            const target = event.target || event.srcElement;
            const isHTMLElement = target && target instanceof HTMLElement;
            if (isHTMLElement) {
                config.reportError(msgObj);
            }
        }
        catch (err) {
        }
        // 用 preventDefault() 方法可以阻止异常信息出现在控制台
        // 但如果是加载资源异常无法阻止
        // event.preventDefault()
    }, 
    // 当一项资源（如<img>或<script>）加载失败，该 error 不会冒泡到 window，可在捕获阶段捕获
    // true 代表在捕获阶段调用，false 代表在冒泡阶段
    true);
    // 当 Promise 被 reject 且没有 reject 处理器的时候
    // 会触发 unhandledrejection 事件
    // window.addEventListener('unhandledrejection', function (event: PromiseRejectionEvent) {
    //   try {
    //     const msgObj: ErrorMsg = {
    //       url: location.href,
    //       type: 'unhandledrejection',
    //       error: event.reason,
    //     }
    //     config.reportError(msgObj)
    //   } catch (err) {
    //   }
    //   // 防止默认处理（例如将错误输出到控制台）
    //   // event.preventDefault()
    // })
}

function sendImage(url, message) {
    let img = new Image();
    img.onload =
        img.onerror = function () {
            img =
                img.onload =
                    img.onerror = null;
        };
    img.src = `${url}?${message}`;
}
function sendBeacon(url, data) {
    navigator.sendBeacon(url, data);
}
function init(config) {
    captureError(config);
}
/**
 * 版本
 */
const version = "1.0.1";

export { init, sendBeacon, sendImage, version };
//# sourceMappingURL=web-error.esm.js.map
