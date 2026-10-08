# 暖程陪诊 CareAlong 应用工程

这是第一个可运行原型：人员列表 → 人员详情 → 预约表单 → 本地待审核演示。

所有人员、院区、价格均为虚构数据。没有真实登录、后台、排班、支付或通知；提交演示只改变当前页面状态，退出后重置。项目中文名为“暖程陪诊”，英文名为 CareAlong，宣传语为“就医路上，暖心相伴。”

## 1 用 VS Code 打开

打开本 README 所在的 `app` 文件夹，或打开上一级的 `CareAlong.code-workspace`。在 VS Code 中选择“终端 → 新建终端”。终端目录应能看到 `package.json`。

本次初始化已经安装依赖。换电脑或重新下载后运行：

```powershell
npm ci
```

## 2 先用浏览器看效果

```powershell
npm run dev:h5
```

打开终端输出的本地地址，通常为 http://127.0.0.1:5173 。端口被占用时以终端显示为准。按 Ctrl+C 停止服务。

浏览器效果用于快速检查布局，不代替小程序或 Android 真机验证。

## 3 在微信开发者工具中运行

```powershell
npm run dev:mp-weixin
```

保持这个终端运行。在微信开发者工具中导入项目，目录选择本工程下的 **`dist/dev/mp-weixin`**，不是源码根目录。

在 `src/manifest.json` 的 `mp-weixin.appid` 中填写你自己的小程序 AppID，然后重新编译。若只是本地界面学习，可使用微信开发者工具提供的测试能力（以当前工具支持范围为准）。不要填写参考小程序的 AppID。当前原型不调用微信登录或服务器接口。

修改 `src` 中的文件会重新编译；不要直接修改 `dist` 中的生成文件。

## 4 Android 运行

在 HBuilderX 中导入整个 `app` 文件夹。不要只导入 `src`，以免使用不同的编译器。

连接开启开发者选项和 USB 调试的 Android 测试手机；在 HBuilderX 中选择“运行 → 运行到手机或模拟器”，按界面提示安装运行基座。之后仍可在 VS Code 修改源码。

`npm run build:app` 只验证及生成 App 资源，不会生成可安装 APK。正式安装包还需要自己的 DCloud AppID、包名、签名及 HBuilderX 打包配置；当前清单中的 AppID 均留空，未替你申请或发布应用。

## 5 第一次练习

1. 修改 `src/pages/index/index.vue` 中首页标题，观察页面更新。
2. 修改 `src/data/demo.ts` 中某位演示人员的服务内容，观察列表及详情是否同步。
3. 搜索不存在的名字，检查空状态。
4. 打开预约表单，直接提交，查看必填校验。
5. 选择成员、院区、日期和时段，确认演示声明后提交，看到本地“待审核”。

不需要输入真实姓名、电话或病情资料。

## 6 目录

```text
src/data/demo.ts             演示数据和类型
src/pages/index/index.vue    人员列表及筛选
src/pages/worker/detail.vue  人员详情
src/pages/booking/create.vue 预约表单和本地提交结果
src/App.vue                 全局样式
src/pages.json              页面路由
src/manifest.json           各平台应用配置
```

## 7 验证命令

```powershell
npm run type-check
npm run build:h5
npm run build:mp-weixin
npm run build:app
```

编译通过不代表已经完成微信或 Android 真机测试。需要用自己的开发者工具、AppID 和设备进行确认。

## 8 下一阶段

先确定这三个页面的字段和预约规则，再增加“我的订单”、服务人员确认和管理员审核原型；随后接入后端的账号、数据库、权限和订单状态机。不要将当前本地演示状态作为正式审核或支付依据。

## 工程来源

基于 DCloud 官方 `uni-preset-vue` 的 `vite-ts` 模板，初始化参考提交 `6fb81ac3c5736b8b0a83e667b3ed90223d458dd8`。裁剪了不使用的平台依赖，保留微信、App 和 H5。通过 `package-lock.json` 固定实际安装依赖，后续优先使用 `npm ci` 复现环境。
