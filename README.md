# learning_english · 词根图谱

> 基于词根词缀规律的英语四六级单词记忆网站。不背字母表，而是把每个词放进「词根家族 + 词素拆解 + 间隔复习」的体系里。

![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20Vanilla%20JS-green)
![Build](https://img.shields.io/badge/build-zero%20config-lightgrey)
![Storage](https://img.shields.io/badge/storage-localStorage-orange)

仓库：<https://github.com/lietxia/learning_english>

---

## 为什么是这个思路

孤立按字母表背词效率最低。本站按「**规律拆解 + 语境内化 + 间隔复习**」三件套组织内容，重点处理两条最容易让人卡住的「变脸」规律：

- **前缀辅音同化**：`sub-` 在 `support / suffer / suggest / succeed / suspend` 里长相不同，意思相同；
- **词根变脸**：`cap / cep / cip / ceive` 都是「拿」，`fact / fect / fic` 都是「做」，`spect / spic / spec` 都是「看」。

所以每个词都不是一张孤立卡片，而是词根家族树上的一个节点，并带着「前缀 / 词根 / 后缀」三个可视化零件标签。方法论调研、资料来源与实现细节见 [report.md](report.md)。

## 功能一览

| 视图 | 内容 |
|---|---|
| **总览** | 学习进度、词库规模、今日待复习、快捷入口 |
| **词根图谱** | 39 组词根家族、353 个核心词；变体形式、派生词链、三色词素拆解、例句、朗读、加入复习；支持四级 / 六级筛选与搜索 |
| **词缀速查** | 20 组前缀按功能分组、19 组后缀按词性分组；含 227 个拆解词素的全对照表与释义来源 |
| **主题词场** | 6 大话题、72 词，按「问题 → 原因 → 对策 → 结果」的写作逻辑成串组织 |
| **易混词对比** | 18 对高频易混词（affect/effect、adapt/adopt…）+ 一句辨析口诀 |
| **间隔复习** | 艾宾浩斯 8 档调度器，强制「先回忆、再翻答案」，三档评分 |
| **快速测验** | 随机 10 题，交替考查「看词选义」与「看义选词」，即时反馈 |
| **记忆法指南** | 遗忘曲线 SVG 图、六类方法的操作步骤 / 示例 / 避坑点、原始资料链接 |
| **词源逻辑图谱** | 39 组词根的 `origin / logic / chain / trap`：本义如何演化出各派生义，以及同形异源陷阱 |
| **一词多义速查** | 74 个高频熟词僻义，每条含常见义、判断线索、真题风格例句与语义链解释 |

其他细节：暗 / 明主题切换、词性缩写中文标注（`n. 名词`）、基于 Web Speech API 的一键朗读、单词跳转到所属词根。

## 快速开始

**不需要 npm、不需要构建、不需要后端。** 但因为 `js/app.js` 是原生 ES Module，直接双击 `index.html`（`file://` 协议）会被浏览器的模块 CORS 策略拦住，必须通过一个静态 HTTP 服务打开。

```bash
# 任选其一，在项目根目录执行
python -m http.server 8765 --bind 127.0.0.1
npx serve .
php -S 127.0.0.1:8765
```

然后访问 <http://127.0.0.1:8765/>。

由于是纯静态站点，也可以直接丢到 GitHub Pages、Netlify、Vercel 或任意对象存储上托管，无需任何构建配置。页面依赖以下 CDN 资源，首次打开需要联网：

- Bootstrap 6.0.0-alpha.1 CSS / JS（ESM）
- Bootstrap Icons 1.11.3

Bootstrap 6 alpha 的 JS 为 ESM-only，`index.html` 用 `import()` 动态加载并静默降级；CDN 失败时站点核心功能不受影响。响应式类名使用该版本的前缀式写法（`.md:col-6`、`.lg:col-2`），不是 v5 的 `.col-md-6`。

## 目录结构

```
learning_english/
├── index.html            # 页面骨架、CDN 引入、10 个视图容器
├── css/
│   └── app.css           # 明暗主题变量、词根卡片、闪卡、图表等定制样式
├── js/
│   ├── data.js           # 主词库：词根家族 / 词缀 / 主题词场 / 易混词 / 记忆法
│   ├── data-detail.js    # 39 组词源逻辑 / 74 词多义库 / 六法操作步骤
│   ├── data-gloss.js     # 拆解词素释义（前缀 / 后缀 / 词根）+ 来源清单
│   └── app.js            # 全部视图渲染、SRS 调度、测验、朗读、localStorage
├── report.md             # 调研报告与实现说明（含资料来源、验证结果）
├── README.md
├── LICENSE               # MIT
└── .gitignore
```

三个数据脚本是普通脚本，按顺序加载后分别挂到 `window.LE_DATA` / `window.LE_DETAIL` / `window.LE_GLOSS`；`app.js` 是唯一的 ES Module 入口。

## 数据规模

| 数据 | 数量 |
|---|---|
| 词根家族 | 39 组（每组含标准形式、变体、核心义、记忆钩子） |
| 核心词 | 353 个（含四级 / 六级标记、词素拆解、释义、钩子、例句） |
| 词缀 | 20 组前缀 + 19 组后缀 |
| 拆解词素释义 | 66 个前缀形 + 96 个后缀形 + 65 个词根形 = 227 个，全覆盖 |
| 词源逻辑 | 39 组，含 5 步义项链与同形异源陷阱 |
| 一词多义 | 74 词，每词 1–4 个常考义项 |
| 主题词场 | 6 话题 / 72 词 |
| 易混词 | 18 对 |

`ecology`、`manufacture` 等词有意出现在两个词根家族中，便于从不同规律入口找到同一个词。

## 复习调度器

复习节点采用更细的一套间隔：

```
5 分钟 → 30 分钟 → 12 小时 → 1 天 → 2 天 → 4 天 → 7 天 → 15 天
```

- **认识** → 推进到下一档；
- **模糊** → 退回一档，间隔减半；
- **忘记** → 回到 5 分钟档重来；
- 连续复习到「4 天」档（stage ≥ 5）计入「已掌握」；队列清空时可选择提前复习最早一批。

进度保存在浏览器 `localStorage`（键 `lean_english_srs_v1`，主题偏好为 `lean_english_theme`），**无登录、无后端、无数据上传**。清除站点数据即可重置进度，也因此暂不支持跨设备同步。

## 扩展与二次开发

- 扩充词库：直接编辑 `js/data.js` 的 `ROOT_FAMILIES` 数组，这是主词库的唯一数据源；字段说明写在文件头部注释里。
- 补充词源 / 多义 / 词素释义：分别改 `data-detail.js` 的 `ROOT_ETYMOLOGY` / `POLYSEMY` 与 `data-gloss.js` 的 `PREFIXES` / `SUFFIX_ENTRIES`。
- 新增词性缩写中文对照：改 `js/app.js` 的 `POS_CN`（当前覆盖 14 种）。
- 想接 Anki、真实真题例句库或跨设备同步，需要从纯 localStorage 方案引入后端或导入导出能力。

已验证：`node --check` 四个 JS 文件通过；10 个视图逐个渲染无异常；复习三档评分与测验抽题流程正常；本地静态服务 6 个文件全部 HTTP 200。

## 已知限制

- 词库是精选核心词，不是完整四六级大纲词表。
- 进度只存在本机浏览器，换设备 / 清缓存会丢失。
- 「望词生义」有边界：拆不通的词不要硬拆（例如 `salary` 的 `sal` 是「盐」，`understand` 的 `under` 是古义「在…之中」），词源故事本身就是记忆点，但不能当万能公式。

## 许可

[MIT](LICENSE) © 2026 lietxia

词库释义、词源说明与例句为学习整理用途，方法与资料来源见 [report.md](report.md) 的引用清单。
