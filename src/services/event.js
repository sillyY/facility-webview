import { msgHandler } from "./msgHandler";

const testMode = false; // 为true时可以在浏览器打开不报错
// vscode webview 网页和普通网页的唯一区别：多了一个acquireVsCodeApi方法

// eslint-disable-next-line
const vscode = testMode ? {} : acquireVsCodeApi();
const cbs = new Map();

class Event {
  constructor() {
    // this.
  }
  fire(data, cb) {
    const cbid = Date.now() + "" + Math.round(Math.random() * 100000);
    cbs.set(cbid, cb);
    data.cbid = cbid;

    vscode.postMessage(data);
  }
  listen() {
    window.addEventListener("message", event => {
      const msg = event.data;
      (cbs.get(msg.cbid) || msgHandler[msg.cmd])(msg.data);
      cbs.delete(msg.cbid);
    });
  }
}
export const event = new Event();
