# learning_english · JSON 数据库

本站的词库、词根图谱、词缀、扩展数据已规范化为 JSON，放在 `data/` 目录下。
这是当前项目的**数据主库**：网页视图（`js/*.js`）是这些数据的一种呈现方式，
后续可直接以 JSON 为唯一数据源重建或扩展页面，也可以导出到 Anki / 其他背词工具。

> 本文件说明：数据从哪来、字段是什么、怎么校验、怎么用。

---

## 一、文件清单

| 文件 | 内容 | 规模 |
|---|---|---|
| `data/vocabulary.json`   | 四六级单词库（含音标、中文释义、真题例句、词频、级别） | 7599 词 |
| `data/roots.json`        | 词根图谱（读音 + 字义 + 记忆联想 + 例词 + 关联四六级词） | 1641 词根 |
| `data/affixes.json`      | 前缀 / 后缀库（按同化组 / 词性组织） | 105 前缀 + 101 后缀 |
| `data/extras.json`       | 主题词场、易混词、记忆法、一词多义、复习档位 | 6 / 18 / 6 / 74 / 8 |
| `data/cet4.json`         | 四级词汇视图（从 vocabulary.json 派生） | 5425 词 |
| `data/cet6.json`         | 六级词汇视图（从 vocabulary.json 派生） | 4413 词 |
| `data/schema/*.schema.json` | 上述 JSON 的 JSON Schema 定义 | 3 份 |
| `data/tools/*.py`        | 生成视图 / 校验数据库的脚本 | 2 个 |
| `data/README.md`         | 本文件 | — |

---

## 二、数据来源（全部联网核对）

**词汇库**

1. [exam-data/CETVocabulary](https://github.com/exam-data/CETVocabulary) — 5278 词，含英式音标、中文释义、真题例句与译文、真题词频、六级标记、CEFR、语义分类。字段说明见其 `docs/data-dictionary.md`。
2. [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) — 四级 7508 词 / 六级 5651 词，含中文释义、词性、英式/美式音标、常用短语。
3. [milanyangqi/word-atlas](https://github.com/milanyangqi/word-atlas) — 用于补齐个别词的英式/美式音标。

**词根 / 词缀**

4. Wikipedia：[List of Greek and Latin roots in English](https://en.wikipedia.org/wiki/List_of_Greek_and_Latin_roots_in_English)（A–Z 全部分页，共 1686 条），提供词根形、英文义、来源语言、源词、例词。
5. 项目原有 `js/data.js` / `js/data-detail.js` / `js/data-gloss.js` — 39 组词根家族、39 组词源逻辑、66 前缀形 + 96 后缀形 + 词素释义。
6. 核心词根另以 [Online Etymology Dictionary](https://www.etymonline.com/)、[Wiktionary](https://en.wiktionary.org/) 核对源词与词源。

**读音**：词根在英语单词中的读法（如 `spect` /spekt/）。核心词根为人工标注；其余由规则化 G2P 生成，
例词音标可与 `data/vocabulary.json` 交叉核对。**不是拉丁文/希腊文原文读音。**

---

## 三、字段规范

### 3.1 vocabulary.json

顶层 `{ "meta": {...}, "words": [...] }`，每个词条字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | `w_` + 单词小写（非字母数字转下划线），唯一 |
| `word` | string | 单词原拼写（小写） |
| `level` | string[] | 所属级别，取值 `CET4` / `CET6`，可同时属于两者 |
| `pos` | string\|null | 词性（`v.` / `n.` / `adj.` …，多项用 `/` 连接） |
| `ipa_uk` | string\|null | 英式音标（带 `/…/`） |
| `ipa_us` | string\|null | 美式音标 |
| `definition_zh` | string\|null | 主中文释义 |
| `definition_zh_all` | string[] | 其他中文释义 |
| `frequency` | int\|null | 真题语料词频（来自 exam-data） |
| `cefr` | string\|null | CEFR 等级 A1–C2 |
| `category` | string\|null | 语义分类（exam-data） |
| `academic` / `advanced` | bool\|null | 是否学术词汇 / C1–C2 高级词 |
| `variant` | string\|null | 其他拼写 |
| `example` | object\|null | `{en, zh, source}` 真题风格例句 + 译文 + 出处 |
| `phrases` | object[] | `[{phrase, zh}]` 常用短语 |
| `sources` | string[] | 数据来源标识 |

**级别判定规则**：Kyle 四级词表命中 → `CET4`；Kyle 六级词表命中或 exam-data 六级★ → `CET6`；
exam-data 中未标★的词视为四级池 → `CET4`。因此同一词可能同时带 `CET4` 与 `CET6`（六级词表常包含四级词）。

### 3.2 roots.json

顶层 `{ "meta": {...}, "roots": [...], "affixes_raw": [...] }`，每个词根字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 词根唯一标识（取标准形小写） |
| `root` | string | 标准形（如 `spect`） |
| `variants` | string[] | 变体拼写（如 `spic` / `spec` / `spy`） |
| `meaning_en` | string | 英文义（Wikipedia 原文） |
| `meaning_zh` | string | 中文义 |
| `language` | string | 来源语言（Latin / Greek / Latin←Greek …） |
| `origins` | object[] | 源词 `[{lang, word}]`（`la` / `grc`） |
| `etymology` | string | 词源说明（Wikipedia 原文） |
| `examples` | string[] | 英文例词 |
| `cet_words` | object[] | 关联的四六级单词 `[{word, zh, level}]` |
| `pronunciation` | object | `{ipa, zh_approx, method}` — 英语读法 + 中文近似谐音 + 标注方式 |
| `mnemonic` | object | 记忆联想：`core`（一句话点破）/ `image`（画面联想）/ `sound_link`（谐音钩子）/ `chain`（本义→引申链）/ `origin_story`（源词故事）/ `trap`（易错点） |
| `quality` | string | `curated` 人工标注 / `generated` 规则生成 / `project` 项目原有 |
| `project_family` | string\|null | 对应项目原有 39 组家族 id |
| `family` | object\|null | 项目原有家族的词、hook、词源逻辑 |
| `etymology_detail` | object\|null | 项目原有的 5 步义项链与同形异源陷阱 |
| `is_affix` | bool | 是否兼为词缀 |
| `letter` | string | 在 Wikipedia 词根表中的首字母分页 |

### 3.3 affixes.json

顶层 `{ "meta": {...}, "prefixes": [...], "suffixes": [...] }`。
前缀按**同化组**组织（`group` 字段，如 `ad- / ac- / af- / ap- / as- / at-` 同义），
后缀给出 `pos`（词性）。每条含 `form / meaning_zh / note / ipa / zh_approx / mnemonic / quality`。

### 3.4 extras.json

`themes`（主题词场）、`confusables`（易混词对比）、`methods` + `method_steps`（记忆法指南）、
`review_steps`（艾宾浩斯复习档位）、`polysemy`（一词多义速查），结构沿用项目原有 JS 数据。

---

## 四、统计与校验

- 词汇：7599 词（CET4 5425 条次 / CET6 4413 条次，含交叉）。
- 词根：1641 条；其中人工标注 `curated` 360 条，规则生成 `generated` 1281 条。
- 词缀：105 前缀 + 101 后缀。
- 所有 JSON 均可被标准解析器解析；`data/schema/` 提供 JSON Schema。
- 交叉引用校验：每个词根的 `cet_words[].word` 都存在于 `vocabulary.json`。
- 每个词根都包含 `pronunciation` 与 `mnemonic` 全部必填子字段。

校验命令（在装了 `jsonschema` 的环境）：

```bash
python -c "import json; [json.load(open(f'data/{n}.json', encoding='utf-8')) for n in ['vocabulary','roots','affixes','extras']]; print('all json ok')"
```

---

## 五、使用与二次开发

- **接网页**：`js/data.js` 等可直接改为 `fetch('data/vocabulary.json')` 等加载，字段一一对应。
- **导出 Anki**：`vocabulary.json` 每条含 `word / pos / ipa_uk / definition_zh / example`，可直接生成卡片。
- **扩词**：往 `vocabulary.json` 的 `words` 数组加词条即可；扩词根往 `roots.json` 的 `roots` 加。
- **升级长尾**：`quality: "generated"` 的词根联想为模板生成，需要时可人工改写其 `mnemonic`。

---

## 六、已知限制

1. 词根 `pronunciation.ipa` 除 360 条人工标注外，由规则生成，可能与个别例词的实际读音有出入；
   建议以 `cet_words` 中例词的音标为准。
2. `generated` 词根的记忆联想为模板化文案（含源词故事、例词链、谐音钩子），不是逐条人工打磨。
3. 词根与单词的关联 `cet_words` 采用「例词命中 + 词首/词尾匹配」，可能有个别误联；
   人工标注的词根已核对。
4. 部分非常用派生词缺美式音标（`ipa_us` 为 null），属源数据缺失。
5. 词根本身在现代英语中不是独立单词，`ipa` 是「在例词中的读法」，非词典条目读音。

---

## 七、生成方式（可复现）

数据由脚本从上述公开来源抓取后合并生成，关键步骤：

1. 抓取 Wikipedia 26 个字母分页的词根表，解析出词根形 / 英文义 / 来源语言 / 源词 / 例词。
2. 下载 exam-data 与 KyleBing 的词汇 JSON，按词形合并、去重、判定级别。
3. 用 word-atlas / Kyle 完整 TSV 补齐音标。
4. 对词根英文义做中文转译（短语模板 + 词典对照），核心 360 条人工复核纠正。
5. 生成读音（G2P 规则 + 人工标注覆盖）与记忆联想。
6. 输出 JSON 并做结构 / 交叉引用校验。
