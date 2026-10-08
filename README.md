# 暖程陪诊 CareAlong

**就医路上，暖心相伴。**

暖程陪诊（CareAlong）是面向普通用户、服务人员和管理员的陪诊预约项目。用户浏览人员后提交预约，由管理员审核，再由服务人员确认接单。

当前为 uni-app + Vue 3 + TypeScript 演示原型，已实现人员列表与搜索、人员详情、预约表单和本地待审核结果。所有人员、院区、价格均为虚构数据，尚未接入真实登录、后台、支付或通知。

## 项目结构

- `app/`：应用源码和运行说明，支持编译 H5、微信小程序和 App 资源。
- `docs/CareAlong调研与开发计划.html`：业务调研和开发规划。
- `docs/首页预览.jpg`：当前品牌的页面预览。
- `docs/预约流程预览.jpg`：预约提交演示结果。
- `CareAlong.code-workspace`：VS Code 工作区，包含代码和文档。
- `references/`：本地下载的官方模板参考，由 Git 忽略。

## 本地运行

需要 Node.js 和 npm。当前验证环境为 Node.js 24.12.0、npm 11.6.2；依赖由 `app/package-lock.json` 锁定。

```powershell
cd app
npm ci
npm run dev:h5
```

微信小程序：

```powershell
npm run dev:mp-weixin
```

在微信开发者工具导入 `app/dist/dev/mp-weixin`，并按 `app/README.md` 配置自己的 AppID。HBuilderX 导入整个 `app` 文件夹。修改源码请编辑 `app/src`，生成目录不应手工维护。

## 检查和构建

在 `app` 目录运行：

```powershell
npm run type-check
npm run build:h5
npm run build:mp-weixin
npm run build:app
```

`build:app` 生成 App 资源，不生成 APK 或 IPA。小程序和 App 的平台登录、真机运行及发布仍需单独验证。

## Git

仓库管理整个项目，包含代码、工作区配置和规划文档。依赖、编译产物、环境配置、签名文件和下载的模板参考不提交。

详细使用步骤见 [应用工程说明](app/README.md)。
