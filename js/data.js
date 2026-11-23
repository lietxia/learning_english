/* ============================================================
 * lean-english 词库数据
 * 组织原则：词根家族 → 派生词链 → 词缀拆解 → 记忆钩子
 * 字段说明：
 *   w 单词 | l 级别(4/6) | p 前缀 | r 词根(覆盖默认值时填) | s 后缀
 *   t 词性 | d 释义 | m 记忆钩子 | e 例句
 * ============================================================ */

const ROOT_FAMILIES = [
  {
    id: 'spect', root: 'spect', variants: ['spect', 'spic', 'spec', 'spy'], meaning: '看',
    hook: 'spect 是「看」的骨架。spect / spic / spec 长得不同，但都从拉丁 specere（看）来——记住「辅音骨架 + 大致意思」，别背死拼写。',
    words: [
      { w: 'inspect', l: 4, p: 'in- 向内', s: '', t: 'v.', d: '检查，视察', m: 'in(向内)+spect(看) → 往里看 = 检查', e: 'The engineer inspected the bridge for cracks.' },
      { w: 'respect', l: 4, p: 're- 回', s: '', t: 'v./n.', d: '尊重，敬意', m: 're(回)+spect(看) → 回头再看一眼 = 重视', e: 'She earned the respect of her colleagues.' },
      { w: 'prospect', l: 6, p: 'pro- 向前', s: '', t: 'n.', d: '前景，展望', m: 'pro(向前)+spect(看) → 向前看 = 前景', e: 'The prospect of promotion motivated him.' },
      { w: 'suspect', l: 4, p: 'sus- 从下', s: '', t: 'v./n.', d: '怀疑；嫌疑人', m: 'sus(下面)+spect(看) → 从下往上偷看 = 怀疑' },
      { w: 'spectator', l: 6, p: '', s: '-ator 人', t: 'n.', d: '观众', m: 'spect(看)+ator(人) → 看的人' },
      { w: 'perspective', l: 6, p: 'per- 贯穿', s: '-ive', t: 'n.', d: '视角，观点', m: 'per(贯穿)+spect(看) → 看穿事物 = 洞察视角' },
      { w: 'conspicuous', l: 6, p: 'con- 完全', r: 'spic', s: '-uous', t: 'adj.', d: '显眼的，引人注目的', m: 'con(完全)+spic(看) → 完全看得见 = 显眼' },
      { w: 'specimen', l: 6, p: '', r: 'spec', s: '-imen', t: 'n.', d: '标本，样本', m: 'spec(看) → 拿来给你看的东西 = 标本' },
      { w: 'retrospective', l: 6, p: 'retro- 向后', s: '-ive', t: 'adj.', d: '回顾的', m: 'retro(向后)+spect(看) → 向后看 = 回顾' },
      { w: 'spectacle', l: 6, p: '', s: '-acle', t: 'n.', d: '景象；眼镜(pl.)', m: 'spect(看)+acle → 值得看的东西' }
    ]
  },
  {
    id: 'port', root: 'port', variants: ['port'], meaning: '搬运，拿',
    hook: 'port = 搬运。import 运进来，export 运出去，transport 跨地运，report 把消息带回来，support 在下面托着——全部是「运」+ 方向。',
    words: [
      { w: 'import', l: 4, p: 'im- 向内', s: '', t: 'v./n.', d: '进口', m: 'im(向内)+port(运) → 运进来', e: 'The country imports most of its oil.' },
      { w: 'export', l: 4, p: 'ex- 向外', s: '', t: 'v./n.', d: '出口', m: 'ex(向外)+port(运) → 运出去' },
      { w: 'transport', l: 4, p: 'trans- 跨越', s: '', t: 'v./n.', d: '运输', m: 'trans(跨越)+port(运) → 跨地搬运' },
      { w: 'report', l: 4, p: 're- 回', s: '', t: 'v./n.', d: '报告', m: 're(回)+port(带) → 把消息带回来' },
      { w: 'support', l: 4, p: 'sup- 下面', s: '', t: 'v./n.', d: '支持', m: 'sup(下面)+port(托) → 在下面托着 = 支持' },
      { w: 'portable', l: 6, p: '', s: '-able 可…的', t: 'adj.', d: '便携的', m: 'port(搬)+able(能) → 能搬得动的' },
      { w: 'porter', l: 6, p: '', s: '-er 人', t: 'n.', d: '搬运工', m: 'port(搬)+er(人)' },
      { w: 'passport', l: 4, p: 'pass 通过', s: '', t: 'n.', d: '护照', m: 'pass(通过)+port(带) → 带你通过关卡的证件' },
      { w: 'important', l: 4, p: 'im- 向内', s: '-ant', t: 'adj.', d: '重要的', m: 'im(向内)+port(带)+ant → 带进来的有价值的东西' },
      { w: 'exportation', l: 6, p: 'ex- 向外', s: '-ation', t: 'n.', d: '出口（业）', m: 'export + ation' }
    ]
  },
  {
    id: 'dict', root: 'dict', variants: ['dict', 'dic'], meaning: '说',
    hook: 'dict = 说。predict 提前说=预测，contradict 反着说=反驳，verdict 真实地说=裁决，indicate 说出来=表明。',
    words: [
      { w: 'predict', l: 4, p: 'pre- 提前', s: '', t: 'v.', d: '预测', m: 'pre(提前)+dict(说) → 提前说 = 预言', e: 'No one could predict the outcome.' },
      { w: 'contradict', l: 6, p: 'contra- 相反', s: '', t: 'v.', d: '反驳，与…矛盾', m: 'contra(相反)+dict(说) → 说相反的话' },
      { w: 'dictate', l: 6, p: '', s: '-ate', t: 'v.', d: '口述；命令', m: 'dict(说)+ate → 说出来让人记 = 口述/命令' },
      { w: 'verdict', l: 6, p: 'ver- 真实', s: '', t: 'n.', d: '裁决，判决', m: 'ver(真实)+dict(说) → 说出真相 = 裁决' },
      { w: 'indicate', l: 4, p: 'in- 向', s: '-ate', t: 'v.', d: '表明，指示', m: 'in(向)+dict(说) → 指给人看 = 表明' },
      { w: 'dictionary', l: 4, p: '', s: '-ionary', t: 'n.', d: '词典', m: 'dict(说)+ionary → 收集「说法」的书' },
      { w: 'dictation', l: 6, p: '', s: '-ation', t: 'n.', d: '听写；口述', m: 'dict(说)+ation' },
      { w: 'prediction', l: 6, p: 'pre- 提前', s: '-ion', t: 'n.', d: '预测', m: 'predict + ion' },
      { w: 'contradiction', l: 6, p: 'contra- 相反', s: '-ion', t: 'n.', d: '矛盾', m: 'contradict + ion' }
    ]
  },
  {
    id: 'duct', root: 'duc/duct', variants: ['duc', 'duct'], meaning: '引导',
    hook: 'duc/duct = 引导。educate 把内在的引导出来=教育；produce 向前引=生产；reduce 向后引=减少；conduct 共同引导=指挥/行为。',
    words: [
      { w: 'educate', l: 4, p: 'e- 向外', r: 'duc', s: '-ate', t: 'v.', d: '教育', m: 'e(向外)+duc(引) → 把内在的引导出来', e: 'Education can change a person’s life.' },
      { w: 'produce', l: 4, p: 'pro- 向前', r: 'duc', s: '', t: 'v.', d: '生产', m: 'pro(向前)+duc(引) → 引出来 = 生产' },
      { w: 'reduce', l: 4, p: 're- 向后', r: 'duc', s: '', t: 'v.', d: '减少', m: 're(向后)+duc(引) → 往回引 = 减少' },
      { w: 'conduct', l: 4, p: 'con- 共同', s: '', t: 'v./n.', d: '指挥；行为', m: 'con(共同)+duct(引) → 带着大家一起 = 指挥' },
      { w: 'introduce', l: 4, p: 'intro- 向内', r: 'duc', s: '', t: 'v.', d: '介绍；引进', m: 'intro(向内)+duc(引) → 引进来' },
      { w: 'deduce', l: 6, p: 'de- 向下', r: 'duc', s: '', t: 'v.', d: '推断', m: 'de(向下)+duc(引) → 从一般引到个别 = 演绎推理' },
      { w: 'induce', l: 6, p: 'in- 向内', r: 'duc', s: '', t: 'v.', d: '诱导，引起', m: 'in(向内)+duc(引) → 往里引 = 诱导' },
      { w: 'productive', l: 6, p: 'pro- 向前', r: 'duc', s: '-ive', t: 'adj.', d: '多产的，有效的', m: 'produce + ive' },
      { w: 'conductor', l: 6, p: 'con- 共同', s: '-or', t: 'n.', d: '指挥；导体', m: 'conduct + or' }
    ]
  },
  {
    id: 'tract', root: 'tract', variants: ['tract', 'tra'], meaning: '拉',
    hook: 'tract = 拉。attract 拉过来=吸引；distract 拉开=分心；extract 拉出来=提取；subtract 从下拉=减去；abstract 抽走=抽象的。',
    words: [
      { w: 'attract', l: 4, p: 'at- 向', s: '', t: 'v.', d: '吸引', m: 'at(向)+tract(拉) → 拉过来', e: 'The exhibition attracted large crowds.' },
      { w: 'contract', l: 4, p: 'con- 一起', s: '', t: 'v./n.', d: '收缩；合同', m: 'con(一起)+tract(拉) → 拉到一起 = 收缩/签约' },
      { w: 'extract', l: 6, p: 'ex- 向外', s: '', t: 'v.', d: '提取，抽取', m: 'ex(向外)+tract(拉) → 拉出来' },
      { w: 'distract', l: 6, p: 'dis- 分开', s: '', t: 'v.', d: '使分心', m: 'dis(分开)+tract(拉) → 把注意力拉开' },
      { w: 'abstract', l: 6, p: 'abs- 离开', s: '', t: 'adj./n.', d: '抽象的；摘要', m: 'abs(离开)+tract(拉) → 从具体中抽走 = 抽象' },
      { w: 'subtract', l: 6, p: 'sub- 从下', s: '', t: 'v.', d: '减去', m: 'sub(从下)+tract(拉) → 从下面拉走 = 减' },
      { w: 'tractor', l: 6, p: '', s: '-or', t: 'n.', d: '拖拉机', m: 'tract(拉)+or → 拉东西的机器' },
      { w: 'attraction', l: 4, p: 'at- 向', s: '-ion', t: 'n.', d: '吸引力', m: 'attract + ion' },
      { w: 'contractual', l: 6, p: 'con- 一起', s: '-ual', t: 'adj.', d: '契约的', m: 'contract + ual' }
    ]
  },
  {
    id: 'fer', root: 'fer', variants: ['fer', 'lat'], meaning: '拿，带',
    hook: 'fer = 拿/带。transfer 转过去；refer 带回去查=参考；prefer 提前拿=偏爱；infer 往里带=推断；suffer 在下面扛=遭受。',
    words: [
      { w: 'transfer', l: 4, p: 'trans- 跨越', s: '', t: 'v./n.', d: '转移，调动', m: 'trans(跨)+fer(带) → 带过去', e: 'He transferred to the Beijing office.' },
      { w: 'refer', l: 4, p: 're- 回', s: '', t: 'v.', d: '参考，提及', m: 're(回)+fer(带) → 带回去查 = 参考' },
      { w: 'prefer', l: 4, p: 'pre- 提前', s: '', t: 'v.', d: '偏爱', m: 'pre(提前)+fer(拿) → 提前先拿 = 更喜欢' },
      { w: 'infer', l: 6, p: 'in- 向内', s: '', t: 'v.', d: '推断', m: 'in(向内)+fer(带) → 把线索带进脑子 = 推断' },
      { w: 'offer', l: 4, p: 'of- 向前', s: '', t: 'v./n.', d: '提供', m: 'of(向前)+fer(拿) → 拿到人面前 = 提供' },
      { w: 'suffer', l: 4, p: 'suf- 下面', s: '', t: 'v.', d: '遭受，受苦', m: 'suf(下面)+fer(扛) → 在下面扛着 = 遭受' },
      { w: 'confer', l: 6, p: 'con- 共同', s: '', t: 'v.', d: '协商；授予', m: 'con(共同)+fer(拿) → 拿到一起商量' },
      { w: 'differ', l: 4, p: 'dif- 分开', s: '', t: 'v.', d: '不同', m: 'dif(分开)+fer(带) → 带到不同方向' },
      { w: 'fertile', l: 6, p: '', s: '-ile', t: 'adj.', d: '肥沃的', m: 'fer(带来)+tile → 能带来收成的 = 肥沃' },
      { w: 'reference', l: 4, p: 're- 回', s: '-ence', t: 'n.', d: '参考；参考文献', m: 'refer + ence' }
    ]
  },
  {
    id: 'ject', root: 'ject', variants: ['ject'], meaning: '扔，抛',
    hook: 'ject = 扔。reject 扔回来=拒绝；inject 扔进去=注射；project 扔向前=项目/投射；object 扔到对面=反对；subject 扔到下面=臣民/主题。',
    words: [
      { w: 'reject', l: 4, p: 're- 回', s: '', t: 'v.', d: '拒绝，驳回', m: 're(回)+ject(扔) → 扔回来', e: 'The committee rejected the proposal.' },
      { w: 'inject', l: 6, p: 'in- 向内', s: '', t: 'v.', d: '注射', m: 'in(向内)+ject(扔) → 把药扔进去' },
      { w: 'project', l: 4, p: 'pro- 向前', s: '', t: 'n./v.', d: '项目；投射', m: 'pro(向前)+ject(扔) → 向前抛出 = 投射/规划' },
      { w: 'object', l: 4, p: 'ob- 对面', s: '', t: 'v./n.', d: '反对；物体', m: 'ob(对面)+ject(扔) → 扔到对面 = 反对' },
      { w: 'subject', l: 4, p: 'sub- 下面', s: '', t: 'n./adj.', d: '主题；受…支配的', m: 'sub(下面)+ject(扔) → 被扔在下面 = 臣服/主题' },
      { w: 'eject', l: 6, p: 'e- 向外', s: '', t: 'v.', d: '弹出，驱逐', m: 'e(向外)+ject(扔) → 扔出去' },
      { w: 'projection', l: 6, p: 'pro- 向前', s: '-ion', t: 'n.', d: '预测；投影', m: 'project + ion' },
      { w: 'objection', l: 6, p: 'ob- 对面', s: '-ion', t: 'n.', d: '反对', m: 'object + ion' },
      { w: 'subjective', l: 6, p: 'sub- 下面', s: '-ive', t: 'adj.', d: '主观的', m: 'subject + ive' },
      { w: 'objective', l: 6, p: 'ob- 对面', s: '-ive', t: 'adj./n.', d: '客观的；目标', m: 'object + ive → 摆在面前的 = 客观的' }
    ]
  },
  {
    id: 'mit', root: 'mit/miss', variants: ['mit', 'miss'], meaning: '送，放',
    hook: 'mit/miss = 送。submit 从下送上=提交；permit 放它过去=允许；transmit 跨地送=传输；dismiss 送走=解散；promise 事先送出的话=承诺。',
    words: [
      { w: 'submit', l: 4, p: 'sub- 从下', s: '', t: 'v.', d: '提交；屈服', m: 'sub(从下)+mit(送) → 从下往上送 = 提交', e: 'Please submit your report before Friday.' },
      { w: 'permit', l: 4, p: 'per- 通过', s: '', t: 'v./n.', d: '允许；许可证', m: 'per(通过)+mit(放) → 放它过去' },
      { w: 'transmit', l: 6, p: 'trans- 跨越', s: '', t: 'v.', d: '传输，传播', m: 'trans(跨)+mit(送) → 送到另一头' },
      { w: 'dismiss', l: 6, p: 'dis- 离开', r: 'miss', s: '', t: 'v.', d: '解散；解雇', m: 'dis(离开)+miss(送) → 送走' },
      { w: 'promise', l: 4, p: 'pro- 提前', r: 'miss', s: '', t: 'v./n.', d: '承诺', m: 'pro(提前)+miss(送) → 事先送出的话' },
      { w: 'commit', l: 4, p: 'com- 共同', s: '', t: 'v.', d: '犯(罪)；承诺', m: 'com(共同)+mit(送) → 把自己送进去 = 投入/犯罪' },
      { w: 'admit', l: 4, p: 'ad- 向', s: '', t: 'v.', d: '承认；准许进入', m: 'ad(向)+mit(放) → 放进来' },
      { w: 'emit', l: 6, p: 'e- 向外', s: '', t: 'v.', d: '发出，排放', m: 'e(向外)+mit(送) → 送出去' },
      { w: 'mission', l: 4, p: '', r: 'miss', s: '-ion', t: 'n.', d: '任务，使命', m: 'miss(送)+ion → 被派出去做的事' },
      { w: 'submission', l: 6, p: 'sub- 从下', s: '-ion', t: 'n.', d: '提交；屈服', m: 'submit + ion' }
    ]
  },
  {
    id: 'vent', root: 'ven/vent', variants: ['ven', 'vent'], meaning: '来',
    hook: 'ven/vent = 来。prevent 提前来拦=阻止；event 向外来=事件；revenue 回来的钱=收入；intervene 来到中间=干预；convene 一起来=召集。',
    words: [
      { w: 'prevent', l: 4, p: 'pre- 提前', r: 'vent', s: '', t: 'v.', d: '阻止，预防', m: 'pre(提前)+vent(来) → 提前来拦住', e: 'Regular exercise can prevent heart disease.' },
      { w: 'event', l: 4, p: 'e- 向外', r: 'vent', s: '', t: 'n.', d: '事件', m: 'e(向外)+vent(来) → 冒出来的事' },
      { w: 'convene', l: 6, p: 'con- 共同', r: 'ven', s: '', t: 'v.', d: '召集，开会', m: 'con(共同)+ven(来) → 大家一起来' },
      { w: 'revenue', l: 6, p: 're- 回', r: 'ven', s: '', t: 'n.', d: '收入，税收', m: 're(回)+ven(来) → 回来的钱' },
      { w: 'intervene', l: 6, p: 'inter- 之间', r: 'ven', s: '', t: 'v.', d: '干预', m: 'inter(中间)+ven(来) → 来到中间插手' },
      { w: 'invent', l: 4, p: 'in- 向内', r: 'vent', s: '', t: 'v.', d: '发明', m: 'in(向内)+vent(来) → 想法走进脑子' },
      { w: 'adventure', l: 6, p: 'ad- 向', r: 'vent', s: '', t: 'n.', d: '冒险', m: 'ad(向)+vent(来) → 向未知走来' },
      { w: 'convention', l: 6, p: 'con- 共同', r: 'ven', s: '-tion', t: 'n.', d: '会议；惯例', m: 'convene + tion → 大家约定俗成' },
      { w: 'eventual', l: 6, p: 'e- 向外', r: 'vent', s: '-ual', t: 'adj.', d: '最终的', m: 'event + ual → 最终发生的事' },
      { w: 'venture', l: 6, p: '', r: 'vent', s: '', t: 'n./v.', d: '冒险（事业）', m: 'vent(来) → 敢往未知走' }
    ]
  },
  {
    id: 'pose', root: 'pos/pon', variants: ['pos', 'pon', 'posit'], meaning: '放，置',
    hook: 'pos/pon = 放。compose 放一起=组成；expose 放出去=暴露；impose 放进去=强加；oppose 放到对面=反对；propose 放到前面=提议。',
    words: [
      { w: 'compose', l: 4, p: 'com- 共同', s: '', t: 'v.', d: '组成；创作', m: 'com(共同)+pose(放) → 放到一起', e: 'Water is composed of hydrogen and oxygen.' },
      { w: 'expose', l: 4, p: 'ex- 向外', s: '', t: 'v.', d: '暴露，揭露', m: 'ex(向外)+pose(放) → 放到外面' },
      { w: 'impose', l: 6, p: 'im- 向内', s: '', t: 'v.', d: '强加', m: 'im(向内)+pose(放) → 硬放进去' },
      { w: 'oppose', l: 4, p: 'ob- 对面', s: '', t: 'v.', d: '反对', m: 'ob(对面)+pose(放) → 放在对面 = 对抗' },
      { w: 'propose', l: 4, p: 'pro- 向前', s: '', t: 'v.', d: '提议；求婚', m: 'pro(向前)+pose(放) → 放到大家面前' },
      { w: 'deposit', l: 6, p: 'de- 向下', r: 'posit', s: '', t: 'v./n.', d: '存放；押金', m: 'de(向下)+posit(放) → 放下去存着' },
      { w: 'position', l: 4, p: '', s: '-ition', t: 'n.', d: '位置；职位', m: 'pos(放)+ition → 被放的地方' },
      { w: 'dispose', l: 6, p: 'dis- 分开', s: '', t: 'v.', d: '处理，处置', m: 'dis(分开)+pose(放) → 分开摆放 = 处理' },
      { w: 'composition', l: 4, p: 'com- 共同', s: '-ition', t: 'n.', d: '作文；组成', m: 'compose + ition' },
      { w: 'proposal', l: 6, p: 'pro- 向前', s: '-al', t: 'n.', d: '提议，提案', m: 'propose + al' }
    ]
  },
  {
    id: 'vis', root: 'vis/vid', variants: ['vis', 'vid'], meaning: '看',
    hook: 'vis/vid 也是「看」，和 spect 是同义不同根。visible 可见的；revise 再看一遍=修订；supervise 从上往下看=监督；evident 看得出来=明显的。',
    words: [
      { w: 'visible', l: 4, p: '', s: '-ible 可…的', t: 'adj.', d: '可见的', m: 'vis(看)+ible(能) → 能看见的', e: 'The stars were clearly visible last night.' },
      { w: 'visual', l: 4, p: '', s: '-ual', t: 'adj.', d: '视觉的', m: 'vis(看)+ual' },
      { w: 'vision', l: 4, p: '', s: '-ion', t: 'n.', d: '视力；愿景', m: 'vis(看)+ion → 看的能力/看到的未来' },
      { w: 'television', l: 4, p: 'tele- 远', s: '-ion', t: 'n.', d: '电视', m: 'tele(远)+vis(看) → 远距离看' },
      { w: 'revise', l: 4, p: 're- 再次', s: '', t: 'v.', d: '修订，复习', m: 're(再)+vis(看) → 再看一遍' },
      { w: 'supervise', l: 6, p: 'super- 上面', s: '', t: 'v.', d: '监督', m: 'super(上面)+vis(看) → 从上往下看' },
      { w: 'evident', l: 6, p: 'e- 向外', r: 'vid', s: '-ent', t: 'adj.', d: '明显的', m: 'e(向外)+vid(看) → 看得出来' },
      { w: 'provide', l: 4, p: 'pro- 提前', r: 'vid', s: '', t: 'v.', d: '提供', m: 'pro(提前)+vid(看) → 提前看到需求并备好' },
      { w: 'visibility', l: 6, p: '', s: '-ibility', t: 'n.', d: '可见度', m: 'visible + ility' },
      { w: 'video', l: 4, p: '', r: 'vid', s: '-eo', t: 'n.', d: '视频', m: 'vid(看) → 能看的东西' }
    ]
  },
  {
    id: 'cap', root: 'cap/cep/cip/ceive', variants: ['cap', 'cep', 'cip', 'ceive'], meaning: '拿，抓',
    hook: '这是「词根变脸」最典型的一组：cap → cep → cip → ceive，骨架都是 c + 元音 + p(v)，意思都是「拿」。receive 的 p 软化成 v，因为它是从法语转道进英语的。',
    words: [
      { w: 'capture', l: 4, p: '', r: 'cap', s: '-ture', t: 'v./n.', d: '捕获，俘虏', m: 'cap(抓)+ture → 抓住' },
      { w: 'accept', l: 4, p: 'ac- 向', r: 'cept', s: '', t: 'v.', d: '接受', m: 'ac(向)+cept(拿) → 拿过来 = 接受', e: 'She accepted the offer without hesitation.' },
      { w: 'receive', l: 4, p: 're- 回', r: 'ceive', s: '', t: 'v.', d: '收到', m: 're(回)+ceive(拿) → 拿回来' },
      { w: 'anticipate', l: 6, p: 'anti- 在前（ante- 旧拼）', r: 'cip', s: '-ate', t: 'v.', d: '预期，预料', m: 'ante(提前)+cip(拿) → 提前拿到消息。注意此处 anti- 是 ante- 的历史旧拼，不是「反对」' },
      { w: 'concept', l: 4, p: 'con- 共同', r: 'cept', s: '', t: 'n.', d: '概念', m: 'con(共同)+cept(拿) → 把共同特征抓出来' },
      { w: 'except', l: 4, p: 'ex- 向外', r: 'cept', s: '', t: 'prep.', d: '除…之外', m: 'ex(向外)+cept(拿) → 拿出去 = 排除' },
      { w: 'capacity', l: 6, p: '', r: 'cap', s: '-acity', t: 'n.', d: '容量；能力', m: 'cap(拿)+acity → 能拿多少 = 容量' },
      { w: 'captive', l: 6, p: '', r: 'cap', s: '-tive', t: 'adj./n.', d: '被俘的；俘虏', m: 'cap(抓)+tive → 被抓住的' },
      { w: 'reception', l: 4, p: 're- 回', r: 'cept', s: '-ion', t: 'n.', d: '接待；接收', m: 'receive + ion' },
      { w: 'acceptance', l: 6, p: 'ac- 向', r: 'cept', s: '-ance', t: 'n.', d: '接受', m: 'accept + ance' }
    ]
  },
  {
    id: 'struct', root: 'struct', variants: ['struct', 'stroy', 'stru'], meaning: '建造',
    hook: 'struct = 建造。construct 共同建=建造；instruct 在心里建=指导；obstruct 对着建=阻碍；destroy 拆掉建好的=破坏。',
    words: [
      { w: 'structure', l: 4, p: '', s: '-ure', t: 'n.', d: '结构', m: 'struct(建)+ure → 建出来的样子', e: 'The structure of the sentence is complex.' },
      { w: 'construct', l: 4, p: 'con- 共同', s: '', t: 'v.', d: '建造，构建', m: 'con(共同)+struct(建)' },
      { w: 'destroy', l: 4, p: 'de- 破坏', r: 'stroy', s: '', t: 'v.', d: '破坏，摧毁', m: 'de(向下)+stroy(建) → 把建好的拆下来' },
      { w: 'instruct', l: 4, p: 'in- 向内', s: '', t: 'v.', d: '指导，指示', m: 'in(向内)+struct(建) → 在脑子里构建 = 教' },
      { w: 'obstruct', l: 6, p: 'ob- 对面', s: '', t: 'v.', d: '阻碍，阻塞', m: 'ob(对面)+struct(建) → 在对面建墙' },
      { w: 'reconstruct', l: 6, p: 're- 再次', s: '', t: 'v.', d: '重建', m: 're(再)+construct' },
      { w: 'instruction', l: 4, p: 'in- 向内', s: '-ion', t: 'n.', d: '指示；教学', m: 'instruct + ion' },
      { w: 'destruction', l: 6, p: 'de- 破坏', s: '-ion', t: 'n.', d: '破坏', m: 'destroy + ion' },
      { w: 'structural', l: 6, p: '', s: '-ural', t: 'adj.', d: '结构的', m: 'structure + al' }
    ]
  },
  {
    id: 'fect', root: 'fact/fect/fic', variants: ['fact', 'fect', 'fic'], meaning: '做，造',
    hook: 'fact/fect/fic 是「做」的三张脸。factory 做东西的地方=工厂；affect 去做(影响)；effect 做出来的结果=效果；efficient 做得好=高效；sufficient 做得够=充足。',
    words: [
      { w: 'factory', l: 4, p: '', r: 'fact', s: '-ory', t: 'n.', d: '工厂', m: 'fact(做)+ory(地方) → 做东西的地方', e: 'He works in a car factory.' },
      { w: 'effect', l: 4, p: 'e- 向外', r: 'fect', s: '', t: 'n.', d: '效果，影响', m: 'e(向外)+fect(做) → 做出来的结果' },
      { w: 'affect', l: 4, p: 'af- 向', r: 'fect', s: '', t: 'v.', d: '影响', m: 'af(向)+fect(做) → 对…下手 = 影响' },
      { w: 'efficient', l: 4, p: 'ef- 向外', r: 'fic', s: '-ient', t: 'adj.', d: '高效的', m: 'ef(向外)+fic(做) → 做得又快又好' },
      { w: 'sufficient', l: 6, p: 'suf- 下面', r: 'fic', s: '-ient', t: 'adj.', d: '充足的', m: 'suf(下面)+fic(做) → 在下面做得够 = 充足' },
      { w: 'fiction', l: 6, p: '', r: 'fic', s: '-tion', t: 'n.', d: '小说；虚构', m: 'fic(做)+tion → 做出来的故事' },
      { w: 'manufacture', l: 6, p: 'manu- 手', r: 'fact', s: '-ure', t: 'v./n.', d: '制造', m: 'manu(手)+fact(做) → 用手做 = 制造' },
      { w: 'beneficial', l: 6, p: 'bene- 好', r: 'fic', s: '-ial', t: 'adj.', d: '有益的', m: 'bene(好)+fic(做) → 做好事 = 有益' },
      { w: 'defect', l: 6, p: 'de- 向下', r: 'fect', s: '', t: 'n.', d: '缺陷', m: 'de(向下)+fect(做) → 没做到位 = 缺陷' },
      { w: 'artificial', l: 6, p: 'art- 技巧', r: 'fic', s: '-ial', t: 'adj.', d: '人工的', m: 'art(技巧)+fic(做) → 靠技巧做出来的' }
    ]
  },
  {
    id: 'tain', root: 'ten/tain/tin', variants: ['ten', 'tain', 'tin'], meaning: '保持，握',
    hook: 'tain = 保持。maintain 用手保持=维持；contain 一起握住=包含；retain 握回来=保留；sustain 从下面撑住=支撑。',
    words: [
      { w: 'maintain', l: 4, p: 'main- 手', s: '', t: 'v.', d: '维持，保养', m: 'main(手)+tain(握) → 用手保持住', e: 'It is important to maintain a healthy diet.' },
      { w: 'contain', l: 4, p: 'con- 共同', s: '', t: 'v.', d: '包含，容纳', m: 'con(共同)+tain(握) → 一起握住 = 包含' },
      { w: 'obtain', l: 4, p: 'ob- 向', s: '', t: 'v.', d: '获得', m: 'ob(向)+tain(握) → 握到手 = 得到' },
      { w: 'retain', l: 6, p: 're- 回', s: '', t: 'v.', d: '保留', m: 're(回)+tain(握) → 握回来' },
      { w: 'sustain', l: 6, p: 'sus- 下面', s: '', t: 'v.', d: '维持；遭受', m: 'sus(下面)+tain(握) → 从下面撑住' },
      { w: 'tenure', l: 6, p: '', r: 'ten', s: '-ure', t: 'n.', d: '任期', m: 'ten(保持)+ure → 保持职位的时间' },
      { w: 'continuous', l: 6, p: 'con- 共同', r: 'tin', s: '-uous', t: 'adj.', d: '连续的', m: 'con+tin(保持) → 一直保持 = 连续' },
      { w: 'tenant', l: 6, p: '', r: 'ten', s: '-ant', t: 'n.', d: '租户', m: 'ten(握)+ant(人) → 握住房子的人' },
      { w: 'detention', l: 6, p: 'de- 向下', s: '-ion', t: 'n.', d: '拘留', m: 'de+tain → 把人扣住' }
    ]
  },
  {
    id: 'sid', root: 'sid/sess', variants: ['sid', 'sess'], meaning: '坐',
    hook: 'sid/sess = 坐。president 坐在前面=主席；reside 坐下来=居住；session 坐一段时间=会议；obsess 坐在…上不放=痴迷；possess 坐拥=拥有。',
    words: [
      { w: 'reside', l: 6, p: 're- 回', s: '', t: 'v.', d: '居住', m: 're(回)+sid(坐) → 坐下来 = 定居' },
      { w: 'president', l: 4, p: 'pre- 前', s: '-ent', t: 'n.', d: '总统，主席', m: 'pre(前)+sid(坐)+ent → 坐在前面的人' },
      { w: 'session', l: 6, p: '', r: 'sess', s: '-ion', t: 'n.', d: '会议；一段时间', m: 'sess(坐)+ion → 坐下来开会' },
      { w: 'obsess', l: 6, p: 'ob- 在…上', r: 'sess', s: '', t: 'v.', d: '使痴迷', m: 'ob(在…上)+sess(坐) → 坐在上面不肯走' },
      { w: 'dissident', l: 6, p: 'dis- 分开', s: '-ent', t: 'n.', d: '持异议者', m: 'dis(分开)+sid(坐) → 坐到另一边' },
      { w: 'possess', l: 4, p: 'pos- 能/掌握', r: 'sess', s: '', t: 'v.', d: '拥有', m: 'pos(能，potis)+sess(坐) → 有权坐着占据 = 拥有（possible / potential 同族）' },
      { w: 'obsession', l: 6, p: 'ob- 在…上', r: 'sess', s: '-ion', t: 'n.', d: '痴迷', m: 'obsess + ion' },
      { w: 'residence', l: 6, p: 're- 回', s: '-ence', t: 'n.', d: '住所', m: 'reside + ence' },
      { w: 'preside', l: 6, p: 'pre- 前', s: '', t: 'v.', d: '主持', m: 'pre(前)+sid(坐) → 坐在前面主持' }
    ]
  },
  {
    id: 'log', root: 'log/logue', variants: ['log', 'logue'], meaning: '说；学问',
    hook: '-logy 是「…学」的后缀，来自 log（说/理性）。biology 生物学、technology 技术学、ecology 生态学——看到 -logy 就知道是一门学问。',
    words: [
      { w: 'dialogue', l: 4, p: 'dia- 穿过', s: '', t: 'n.', d: '对话', m: 'dia(穿过)+logue(说) → 两人之间说话' },
      { w: 'logic', l: 4, p: '', s: '-ic', t: 'n.', d: '逻辑', m: 'log(理性)+ic → 讲道理的学问' },
      { w: 'catalog', l: 6, p: 'cata- 向下', s: '', t: 'n.', d: '目录', m: 'cata(向下)+log(说) → 逐条说下来' },
      { w: 'biology', l: 4, p: 'bio- 生命', s: '-y', t: 'n.', d: '生物学', m: 'bio(生命)+log(学问)' },
      { w: 'technology', l: 4, p: 'techn- 技艺', s: '-y', t: 'n.', d: '技术', m: 'techn(技艺)+log(学问)' },
      { w: 'psychology', l: 6, p: 'psycho- 心理', s: '-y', t: 'n.', d: '心理学', m: 'psycho(心理)+log(学问)' },
      { w: 'ecology', l: 6, p: 'eco- 生态', s: '-y', t: 'n.', d: '生态学', m: 'eco(生态)+log(学问)' },
      { w: 'apology', l: 6, p: 'apo- 离开', s: '-y', t: 'n.', d: '道歉', m: 'apo(离开)+log(说) → 说开 = 道歉' },
      { w: 'logical', l: 4, p: '', s: '-ical', t: 'adj.', d: '合逻辑的', m: 'logic + al' },
      { w: 'biologist', l: 6, p: 'bio- 生命', s: '-ist', t: 'n.', d: '生物学家', m: 'biology + ist' }
    ]
  },
  {
    id: 'voc', root: 'voc/vok', variants: ['voc', 'voke'], meaning: '声音，叫',
    hook: 'voc = 声音。vocal 发声的；vocabulary 词汇（一堆声音）；vocation 职业=内心的召唤；evoke 唤出；provoke 往前叫=激怒。',
    words: [
      { w: 'vocal', l: 6, p: '', s: '-al', t: 'adj.', d: '发声的，直言的', m: 'voc(声音)+al' },
      { w: 'vocabulary', l: 4, p: '', s: '-abulary', t: 'n.', d: '词汇', m: 'voc(声音)+abulary → 一堆音 = 词汇' },
      { w: 'invoke', l: 6, p: 'in- 向内', r: 'voke', s: '', t: 'v.', d: '祈求，唤起', m: 'in(向内)+voke(叫) → 心里呼叫' },
      { w: 'evoke', l: 6, p: 'e- 向外', r: 'voke', s: '', t: 'v.', d: '唤起，引起', m: 'e(向外)+voke(叫) → 把记忆叫出来' },
      { w: 'provoke', l: 6, p: 'pro- 向前', r: 'voke', s: '', t: 'v.', d: '激怒，引发', m: 'pro(向前)+voke(叫) → 冲着人叫' },
      { w: 'vocation', l: 6, p: '', s: '-ation', t: 'n.', d: '职业，天职', m: 'voc(叫)+ation → 内心的召唤 = 天职' },
      { w: 'vocalist', l: 6, p: '', s: '-ist', t: 'n.', d: '歌手', m: 'vocal + ist' },
      { w: 'equivocal', l: 6, p: 'equi- 等', s: '', t: 'adj.', d: '模棱两可的', m: 'equi(相等)+voc(说) → 两种说法一样 = 含糊' }
    ]
  },
  {
    id: 'sci', root: 'sci', variants: ['sci'], meaning: '知道',
    hook: 'sci = 知道。science 知识=科学；conscious 一起知道=有意识的；conscience 知道对错=良心；prescient 提前知道=预知的。',
    words: [
      { w: 'science', l: 4, p: '', s: '-ence', t: 'n.', d: '科学', m: 'sci(知道)+ence → 成体系的知识' },
      { w: 'scientific', l: 4, p: '', s: '-entific', t: 'adj.', d: '科学的', m: 'science + ific' },
      { w: 'scientist', l: 4, p: '', s: '-entist', t: 'n.', d: '科学家', m: 'science + ist' },
      { w: 'conscious', l: 6, p: 'con- 共同', s: '-ous', t: 'adj.', d: '有意识的', m: 'con(共同)+sci(知道) → 心里明白' },
      { w: 'conscience', l: 6, p: 'con- 共同', s: '-ence', t: 'n.', d: '良心', m: 'con+sci(知道) → 心里知道对错' },
      { w: 'prescient', l: 6, p: 'pre- 提前', s: '-ent', t: 'adj.', d: '预知的', m: 'pre(提前)+sci(知道)' },
      { w: 'subconscious', l: 6, p: 'sub- 下面', s: '-ous', t: 'adj.', d: '潜意识的', m: 'sub(下面)+conscious' },
      { w: 'conscientious', l: 6, p: 'con- 共同', s: '-ious', t: 'adj.', d: '认真负责的', m: 'conscience + ous → 凭良心做事' }
    ]
  },
  {
    id: 'soc', root: 'soc', variants: ['soc'], meaning: '社会，伙伴',
    hook: 'soc = 伙伴/社会。social 社会的；associate 结成伙伴=联系；sociable 爱交朋友的；sociology 社会学。',
    words: [
      { w: 'social', l: 4, p: '', s: '-ial', t: 'adj.', d: '社会的', m: 'soc(社会)+ial' },
      { w: 'society', l: 4, p: '', s: '-iety', t: 'n.', d: '社会', m: 'soc(伙伴)+iety' },
      { w: 'associate', l: 4, p: 'as- 向', s: '-iate', t: 'v./n.', d: '联系；伙伴', m: 'as(向)+soc(伙伴) → 结成伙伴' },
      { w: 'socialize', l: 6, p: '', s: '-ize', t: 'v.', d: '社交', m: 'social + ize' },
      { w: 'sociology', l: 6, p: '', s: '-iology', t: 'n.', d: '社会学', m: 'soc + iology(学问)' },
      { w: 'association', l: 4, p: 'as- 向', s: '-iation', t: 'n.', d: '协会；联系', m: 'associate + ion' },
      { w: 'sociable', l: 6, p: '', s: '-able', t: 'adj.', d: '好交际的', m: 'soc(伙伴)+able → 能做伙伴的' },
      { w: 'socialist', l: 6, p: '', s: '-ist', t: 'n.', d: '社会主义者', m: 'social + ist' }
    ]
  },
  {
    id: 'eco', root: 'eco', variants: ['eco'], meaning: '生态；经济',
    hook: 'eco 有两个常用义：生态 / 经济（都源自希腊 oikos「家」）。ecology 生态学；economy 家政=经济；ecosystem 生态系统。写作环保话题整串调用。',
    words: [
      { w: 'ecology', l: 6, p: '', s: '-logy', t: 'n.', d: '生态学', m: 'eco(家/生态)+logy(学问)' },
      { w: 'economy', l: 4, p: '', s: '-nomy', t: 'n.', d: '经济', m: 'eco(家)+nomy(管理) → 管家 = 经济' },
      { w: 'economic', l: 4, p: '', s: '-ic', t: 'adj.', d: '经济的', m: 'economy + ic' },
      { w: 'ecosystem', l: 6, p: '', s: 'system', t: 'n.', d: '生态系统', m: 'eco(生态)+system(系统)' },
      { w: 'ecological', l: 6, p: '', s: '-ical', t: 'adj.', d: '生态的', m: 'ecology + ical' },
      { w: 'economist', l: 6, p: '', s: '-ist', t: 'n.', d: '经济学家', m: 'economy + ist' },
      { w: 'economics', l: 6, p: '', s: '-ics', t: 'n.', d: '经济学', m: 'economy + ics' },
      { w: 'eco-friendly', l: 6, p: '', s: '', t: 'adj.', d: '环保的', m: 'eco(生态)+friendly(友好)' }
    ]
  },
  {
    id: 'vers', root: 'vers/vert', variants: ['vers', 'vert'], meaning: '转',
    hook: 'vers/vert = 转。convert 转过去=转换；reverse 转回来=颠倒；universe 转向一体的=宇宙；diverse 转向不同=多样；controversy 转向反面=争议。',
    words: [
      { w: 'convert', l: 4, p: 'con- 共同', r: 'vert', s: '', t: 'v.', d: '转换，改变', m: 'con(共同)+vert(转) → 完全转过去' },
      { w: 'invert', l: 6, p: 'in- 向内', r: 'vert', s: '', t: 'v.', d: '倒置', m: 'in(向内)+vert(转) → 翻过来' },
      { w: 'reverse', l: 6, p: 're- 回', s: '', t: 'v./adj.', d: '颠倒，倒退', m: 're(回)+vers(转) → 转回来' },
      { w: 'universe', l: 4, p: 'uni- 一', s: '', t: 'n.', d: '宇宙', m: 'uni(一)+vers(转) → 万物转向一体' },
      { w: 'diverse', l: 6, p: 'di- 分开', s: '', t: 'adj.', d: '多样的', m: 'di(分开)+vers(转) → 转向各方' },
      { w: 'divert', l: 6, p: 'di- 分开', r: 'vert', s: '', t: 'v.', d: '转移，使分心', m: 'di(分开)+vert(转) → 转走' },
      { w: 'version', l: 4, p: '', s: '-ion', t: 'n.', d: '版本', m: 'vers(转)+ion → 转述出来的一个说法' },
      { w: 'controversy', l: 6, p: 'contra- 相反', s: '', t: 'n.', d: '争议', m: 'contra(相反)+vers(转) → 转向反面争论' },
      { w: 'versatile', l: 6, p: '', s: '-atile', t: 'adj.', d: '多才多艺的', m: 'vers(转)+atile → 能转向各种方向' },
      { w: 'adverse', l: 6, p: 'ad- 向', s: '', t: 'adj.', d: '不利的，相反的', m: 'ad(向)+vers(转) → 转过来对着你' }
    ]
  },
  {
    id: 'sta', root: 'sta/stat', variants: ['sta', 'stat', 'stab'], meaning: '站，立',
    hook: 'sta = 站。status 站着的状态=地位；stable 站得稳=稳定；establish 使站稳=建立；static 静止的；statistic 站住的数据=统计。',
    words: [
      { w: 'status', l: 4, p: '', s: '-us', t: 'n.', d: '地位，状态', m: 'stat(站)+us → 站的位置' },
      { w: 'stable', l: 4, p: '', r: 'stab', s: '-le', t: 'adj.', d: '稳定的', m: 'stab(站)+le → 站得住' },
      { w: 'establish', l: 4, p: 'e- 向外', r: 'stab', s: '-lish', t: 'v.', d: '建立', m: 'e+stab(站) → 使站稳 = 建立' },
      { w: 'statistic', l: 6, p: '', s: '-istic', t: 'n.', d: '统计数字', m: 'stat(站)+istic → 站得住的数据' },
      { w: 'state', l: 4, p: '', s: '', t: 'n.', d: '状态；国家', m: 'sta(站)+te → 站立的状态' },
      { w: 'static', l: 6, p: '', s: '-ic', t: 'adj.', d: '静态的', m: 'stat(站)+ic → 站着不动' },
      { w: 'stature', l: 6, p: '', s: '-ure', t: 'n.', d: '身高；声望', m: 'stat(站)+ure → 站起来的高度' },
      { w: 'stagnant', l: 6, p: '', r: 'stag', s: '-nant', t: 'adj.', d: '停滞的', m: 'stag(站)+nant → 站着不动 = 停滞' },
      { w: 'statement', l: 4, p: '', s: '-ement', t: 'n.', d: '陈述', m: 'state + ment' },
      { w: 'stability', l: 6, p: '', r: 'stab', s: '-ility', t: 'n.', d: '稳定性', m: 'stable + ility' }
    ]
  },
  {
    id: 'graph', root: 'graph', variants: ['graph', 'gram'], meaning: '写，图',
    hook: 'graph = 写/画。photograph 光写的=照片；biography 写一生=传记；geography 写大地=地理；paragraph 旁边写=段落；autograph 自己写=签名。',
    words: [
      { w: 'photograph', l: 4, p: 'photo- 光', s: '', t: 'n.', d: '照片', m: 'photo(光)+graph(写) → 用光写出来的' },
      { w: 'biography', l: 6, p: 'bio- 生命', s: '', t: 'n.', d: '传记', m: 'bio(生命)+graph(写) → 写一生' },
      { w: 'geography', l: 4, p: 'geo- 地', s: '', t: 'n.', d: '地理', m: 'geo(地)+graph(写)' },
      { w: 'paragraph', l: 4, p: 'para- 旁边', s: '', t: 'n.', d: '段落', m: 'para(旁边)+graph(写) → 旁边另起一段' },
      { w: 'autograph', l: 6, p: 'auto- 自己', s: '', t: 'n.', d: '亲笔签名', m: 'auto(自己)+graph(写)' },
      { w: 'graphic', l: 6, p: '', s: '-ic', t: 'adj.', d: '图解的；生动的', m: 'graph(画)+ic' },
      { w: 'telegraph', l: 6, p: 'tele- 远', s: '', t: 'n.', d: '电报', m: 'tele(远)+graph(写) → 远处写来的' },
      { w: 'photography', l: 4, p: 'photo- 光', s: '-y', t: 'n.', d: '摄影', m: 'photograph + y' },
      { w: 'autobiography', l: 6, p: 'auto- 自己', s: '', t: 'n.', d: '自传', m: 'auto(自己)+bio(生命)+graph(写)' }
    ]
  },
  {
    id: 'gen', root: 'gen', variants: ['gen'], meaning: '产生，种族',
    hook: 'gen = 产生/种族。generate 产生；gene 基因；general 普遍的；genuine 天生的=真正的；genius 天赋；hydrogen 水生成的=氢。',
    words: [
      { w: 'generate', l: 4, p: '', s: '-erate', t: 'v.', d: '产生，生成', m: 'gen(产生)+erate', e: 'Solar panels generate electricity.' },
      { w: 'gene', l: 6, p: '', s: '', t: 'n.', d: '基因', m: 'gen(产生) → 决定产生的单位' },
      { w: 'general', l: 4, p: '', s: '-eral', t: 'adj.', d: '普遍的；将军', m: 'gen(种族)+eral → 涉及全类的' },
      { w: 'generous', l: 4, p: '', s: '-erous', t: 'adj.', d: '慷慨的', m: 'gen(产生)+erous → 天生大方' },
      { w: 'genius', l: 4, p: '', s: '-ius', t: 'n.', d: '天才', m: 'gen(天生)+ius → 天生的才能' },
      { w: 'genuine', l: 6, p: '', s: '-uine', t: 'adj.', d: '真正的', m: 'gen(天生)+uine → 天生的 = 货真价实' },
      { w: 'genetic', l: 6, p: '', s: '-etic', t: 'adj.', d: '遗传的', m: 'gene + tic' },
      { w: 'gender', l: 4, p: '', s: '-der', t: 'n.', d: '性别', m: 'gen(种族)+der' },
      { w: 'hydrogen', l: 6, p: 'hydro- 水', s: '', t: 'n.', d: '氢', m: 'hydro(水)+gen(产生) → 生成水的元素' },
      { w: 'generator', l: 6, p: '', s: '-erator', t: 'n.', d: '发电机', m: 'generate + or' }
    ]
  },
  {
    id: 'cess', root: 'ceed/cess', variants: ['ceed', 'cess', 'cede'], meaning: '走',
    hook: 'ceed/cess = 走。succeed 从下走上=成功；proceed 向前走=继续；access 走向=通道；excess 走过头=过量；process 向前走的过程=过程。',
    words: [
      { w: 'succeed', l: 4, p: 'suc- 从下', s: '', t: 'v.', d: '成功；接替', m: 'suc(从下)+ceed(走) → 从下面走上去', e: 'She succeeded in passing the exam.' },
      { w: 'proceed', l: 6, p: 'pro- 向前', s: '', t: 'v.', d: '继续进行', m: 'pro(向前)+ceed(走)' },
      { w: 'access', l: 4, p: 'ac- 向', r: 'cess', s: '', t: 'n./v.', d: '通道；使用权', m: 'ac(向)+cess(走) → 能走向它' },
      { w: 'excess', l: 6, p: 'ex- 超出', r: 'cess', s: '', t: 'n./adj.', d: '过量', m: 'ex(超出)+cess(走) → 走过头' },
      { w: 'process', l: 4, p: 'pro- 向前', r: 'cess', s: '', t: 'n./v.', d: '过程；加工', m: 'pro(向前)+cess(走) → 一步步往前' },
      { w: 'recess', l: 6, p: 're- 回', r: 'cess', s: '', t: 'n.', d: '休会，休假', m: 're(回)+cess(走) → 退回去' },
      { w: 'concede', l: 6, p: 'con- 共同', r: 'cede', s: '', t: 'v.', d: '承认；让步', m: 'con+cede(走) → 让一步' },
      { w: 'recede', l: 6, p: 're- 回', r: 'cede', s: '', t: 'v.', d: '后退', m: 're(回)+cede(走)' },
      { w: 'succession', l: 6, p: 'suc- 从下', r: 'cess', s: '-ion', t: 'n.', d: '连续；继承', m: 'succeed + ion' },
      { w: 'accessible', l: 6, p: 'ac- 向', r: 'cess', s: '-ible', t: 'adj.', d: '可接近的', m: 'access + ible' }
    ]
  },
  {
    id: 'pend', root: 'pend/pens', variants: ['pend', 'pens'], meaning: '挂；称量；花费',
    hook: 'pend = 挂/秤。depend 挂在…上=依靠；suspend 挂在下面=悬挂/暂停；expense 花出去的钱=费用；pension 定期发的钱=养老金。',
    words: [
      { w: 'depend', l: 4, p: 'de- 向下', s: '', t: 'v.', d: '依靠', m: 'de(向下)+pend(挂) → 挂在…上', e: 'Success depends on hard work.' },
      { w: 'independent', l: 4, p: 'in- 不', s: '-ent', t: 'adj.', d: '独立的', m: 'in(不)+depend+ent' },
      { w: 'suspend', l: 6, p: 'sus- 下面', s: '', t: 'v.', d: '悬挂；暂停', m: 'sus(下面)+pend(挂) → 吊在下面' },
      { w: 'expense', l: 4, p: 'ex- 向外', r: 'pens', s: '', t: 'n.', d: '费用', m: 'ex(向外)+pens(称) → 花出去的钱' },
      { w: 'expensive', l: 4, p: 'ex- 向外', r: 'pens', s: '-ive', t: 'adj.', d: '昂贵的', m: 'expense + ive' },
      { w: 'pension', l: 6, p: '', r: 'pens', s: '-ion', t: 'n.', d: '养老金', m: 'pens(花费)+ion → 定期给的钱' },
      { w: 'pendant', l: 6, p: '', s: '-ant', t: 'n.', d: '吊坠', m: 'pend(挂)+ant → 挂着的东西' },
      { w: 'appendix', l: 6, p: 'ap- 向', s: '', t: 'n.', d: '附录；阑尾', m: 'ap(向)+pend(挂) → 挂在书后面的' },
      { w: 'dependence', l: 6, p: 'de- 向下', s: '-ence', t: 'n.', d: '依赖', m: 'depend + ence' }
    ]
  },
  {
    id: 'cred', root: 'cred', variants: ['cred'], meaning: '相信',
    hook: 'cred = 相信。credit 信用；credible 可信的；incredible 难以置信；credulous 轻信的；credential 让人相信的证书。',
    words: [
      { w: 'credit', l: 4, p: '', s: '', t: 'n.', d: '信用；学分', m: 'cred(相信) → 值得相信' },
      { w: 'credible', l: 6, p: '', s: '-ible', t: 'adj.', d: '可信的', m: 'cred(相信)+ible' },
      { w: 'incredible', l: 4, p: 'in- 不', s: '-ible', t: 'adj.', d: '难以置信的', m: 'in(不)+cred(相信)+ible' },
      { w: 'credulous', l: 6, p: '', s: '-ulous', t: 'adj.', d: '轻信的', m: 'cred(相信)+ulous → 太容易信' },
      { w: 'credential', l: 6, p: '', s: '-ential', t: 'n.', d: '证书，资历', m: 'cred(相信)+ential → 让人相信你的东西' },
      { w: 'discredit', l: 6, p: 'dis- 不', s: '', t: 'v.', d: '使受怀疑', m: 'dis(不)+cred(相信)' },
      { w: 'credence', l: 6, p: '', s: '-ence', t: 'n.', d: '信任', m: 'cred + ence' },
      { w: 'creditor', l: 6, p: '', s: '-itor', t: 'n.', d: '债权人', m: 'cred(相信)+itor → 相信你会还钱的人' }
    ]
  },
  {
    id: 'memor', root: 'memor', variants: ['memor', 'member'], meaning: '记忆',
    hook: 'memor = 记忆。memory 记忆；memorize 背下来；memorial 让人记住的纪念碑；remember 想起来；commemorate 共同纪念。',
    words: [
      { w: 'memory', l: 4, p: '', s: '-ory', t: 'n.', d: '记忆', m: 'memor(记忆)+y' },
      { w: 'memorize', l: 4, p: '', s: '-ize', t: 'v.', d: '记住', m: 'memory + ize' },
      { w: 'memorial', l: 6, p: '', s: '-ial', t: 'n.', d: '纪念碑', m: 'memor(记忆)+ial → 让人记住的东西' },
      { w: 'remember', l: 4, p: 're- 回', r: 'member', s: '', t: 'v.', d: '记得', m: 're(回)+member(memor记忆) → 回忆起来' },
      { w: 'commemorate', l: 6, p: 'com- 共同', s: '-ate', t: 'v.', d: '纪念', m: 'com(共同)+memor(记忆) → 大家一起记' },
      { w: 'memorable', l: 6, p: '', s: '-able', t: 'adj.', d: '难忘的', m: 'memory + able' },
      { w: 'remembrance', l: 6, p: 're- 回', r: 'member', s: '-ance', t: 'n.', d: '回忆，纪念', m: 'remember + ance' },
      { w: 'memorandum', l: 6, p: '', s: '-andum', t: 'n.', d: '备忘录', m: 'memor(记忆)+andum → 帮你记的' }
    ]
  },
  {
    id: 'form', root: 'form', variants: ['form'], meaning: '形状，形式',
    hook: 'form = 形状。reform 再塑形=改革；transform 变形=转变；inform 使成形=通知；uniform 单一形状=制服；conform 符合形状=遵守。',
    words: [
      { w: 'reform', l: 4, p: 're- 再次', s: '', t: 'v./n.', d: '改革', m: 're(再)+form(塑形) → 重新塑造', e: 'The government introduced reforms.' },
      { w: 'transform', l: 4, p: 'trans- 改变', s: '', t: 'v.', d: '转变', m: 'trans(改变)+form(形状)' },
      { w: 'inform', l: 4, p: 'in- 使', s: '', t: 'v.', d: '通知', m: 'in(使)+form(成形) → 使想法成形告诉别人' },
      { w: 'uniform', l: 4, p: 'uni- 单一', s: '', t: 'adj./n.', d: '统一的；制服', m: 'uni(一)+form(形状) → 一个样式' },
      { w: 'conform', l: 6, p: 'con- 共同', s: '', t: 'v.', d: '遵守，符合', m: 'con(共同)+form(形状) → 符合大家的形状' },
      { w: 'perform', l: 4, p: 'per- 完全', s: '', t: 'v.', d: '表演；执行', m: 'per(完全)+form(做) → 把形式做完整' },
      { w: 'format', l: 4, p: '', s: '', t: 'n.', d: '格式', m: 'form(形状)+at' },
      { w: 'formal', l: 4, p: '', s: '-al', t: 'adj.', d: '正式的', m: 'form + al' },
      { w: 'information', l: 4, p: 'in- 使', s: '-ation', t: 'n.', d: '信息', m: 'inform + ation' },
      { w: 'transformation', l: 6, p: 'trans- 改变', s: '-ation', t: 'n.', d: '转变', m: 'transform + ation' }
    ]
  },
  {
    id: 'cur', root: 'cur/curs', variants: ['cur', 'curs'], meaning: '跑，流动',
    hook: 'cur = 跑。current 跑着的=水流/当前的；occur 跑来=发生；recur 再跑来=复发；curriculum 跑道=课程；excursion 跑出去=远足。',
    words: [
      { w: 'current', l: 4, p: '', s: '-ent', t: 'adj./n.', d: '当前的；水流', m: 'cur(跑)+rent → 正在跑的', e: 'The current situation is improving.' },
      { w: 'curriculum', l: 6, p: '', s: '-iculum', t: 'n.', d: '课程', m: 'cur(跑)+riculum → 学习的跑道' },
      { w: 'occur', l: 4, p: 'oc- 向', s: '', t: 'v.', d: '发生', m: 'oc(向)+cur(跑) → 跑到你面前 = 发生' },
      { w: 'incur', l: 6, p: 'in- 向内', s: '', t: 'v.', d: '招致', m: 'in(向内)+cur(跑) → 跑到自己身上' },
      { w: 'recur', l: 6, p: 're- 再次', s: '', t: 'v.', d: '复发，重现', m: 're(再)+cur(跑) → 又跑回来' },
      { w: 'concur', l: 6, p: 'con- 共同', s: '', t: 'v.', d: '同意，同时发生', m: 'con(共同)+cur(跑) → 跑到一起' },
      { w: 'excursion', l: 6, p: 'ex- 向外', r: 'curs', s: '-ion', t: 'n.', d: '远足', m: 'ex(向外)+curs(跑) → 跑出去玩' },
      { w: 'cursory', l: 6, p: '', r: 'curs', s: '-ory', t: 'adj.', d: '匆忙的，粗略的', m: 'curs(跑)+ory → 跑着看 = 草率' },
      { w: 'currency', l: 6, p: '', s: '-ency', t: 'n.', d: '货币；流通', m: 'cur(流动)+rency → 流通的东西' }
    ]
  },
  {
    id: 'flu', root: 'flu', variants: ['flu', 'flux'], meaning: '流',
    hook: 'flu = 流。fluent 流利的；fluid 流体；influence 流入=影响；affluent 流向你=富裕；fluctuate 流来流去=波动。',
    words: [
      { w: 'fluent', l: 4, p: '', s: '-ent', t: 'adj.', d: '流利的', m: 'flu(流)+ent → 话说得流畅', e: 'She is fluent in three languages.' },
      { w: 'fluid', l: 4, p: '', s: '-id', t: 'n./adj.', d: '流体；流动的', m: 'flu(流)+id' },
      { w: 'influence', l: 4, p: 'in- 向内', s: '-ence', t: 'n./v.', d: '影响', m: 'in(向内)+flu(流) → 流进心里' },
      { w: 'affluent', l: 6, p: 'af- 向', s: '-ent', t: 'adj.', d: '富裕的', m: 'af(向)+flu(流) → 财富流向你' },
      { w: 'fluctuate', l: 6, p: '', s: '-ctuate', t: 'v.', d: '波动', m: 'flu(流)+ctuate → 流来流去' },
      { w: 'influx', l: 6, p: 'in- 向内', r: 'flux', s: '', t: 'n.', d: '流入', m: 'in(向内)+flux(流)' },
      { w: 'fluency', l: 6, p: '', s: '-ency', t: 'n.', d: '流利', m: 'fluent + cy' },
      { w: 'influential', l: 6, p: 'in- 向内', s: '-ential', t: 'adj.', d: '有影响力的', m: 'influence + ial' }
    ]
  },
  {
    id: 'sent', root: 'sens/sent', variants: ['sens', 'sent'], meaning: '感觉',
    hook: 'sens/sent = 感觉。sensitive 敏感的；sensible 能感觉的=明智的；consent 共同感觉=同意；resent 回过来的感觉=怨恨；sensation 感觉/轰动。',
    words: [
      { w: 'sense', l: 4, p: '', s: '', t: 'n./v.', d: '感觉；意义', m: 'sens(感觉)' },
      { w: 'sensitive', l: 4, p: '', s: '-itive', t: 'adj.', d: '敏感的', m: 'sens(感觉)+itive' },
      { w: 'sensible', l: 6, p: '', s: '-ible', t: 'adj.', d: '明智的', m: 'sens(感觉)+ible → 能判断的' },
      { w: 'sentiment', l: 6, p: '', s: '-iment', t: 'n.', d: '情感', m: 'sent(感觉)+iment' },
      { w: 'consent', l: 6, p: 'con- 共同', s: '', t: 'v./n.', d: '同意', m: 'con(共同)+sent(感觉) → 感觉一致' },
      { w: 'resent', l: 6, p: 're- 回', s: '', t: 'v.', d: '怨恨', m: 're(回)+sent(感觉) → 反过来感觉 = 记恨' },
      { w: 'sensation', l: 6, p: '', s: '-ation', t: 'n.', d: '感觉；轰动', m: 'sens(感觉)+ation' },
      { w: 'sensory', l: 6, p: '', s: '-ory', t: 'adj.', d: '感官的', m: 'sens + ory' },
      { w: 'insensitive', l: 6, p: 'in- 不', s: '-itive', t: 'adj.', d: '不敏感的', m: 'in + sensitive' },
      { w: 'sentimental', l: 6, p: '', s: '-imental', t: 'adj.', d: '感伤的', m: 'sentiment + al' }
    ]
  },
  {
    id: 'aud', root: 'aud/audit', variants: ['aud', 'audit'], meaning: '听',
    hook: 'aud = 听。audience 听众；audible 听得见的；inaudible 听不见的；auditorium 听的地方=礼堂；audit 听账=审计。',
    words: [
      { w: 'audience', l: 4, p: '', s: '-ience', t: 'n.', d: '观众，听众', m: 'aud(听)+ience → 听的人' },
      { w: 'audit', l: 6, p: '', s: '', t: 'v./n.', d: '审计', m: 'audit(听) → 古时查账靠听人念' },
      { w: 'audible', l: 6, p: '', s: '-ible', t: 'adj.', d: '听得见的', m: 'aud(听)+ible' },
      { w: 'inaudible', l: 6, p: 'in- 不', s: '-ible', t: 'adj.', d: '听不见的', m: 'in + audible' },
      { w: 'auditorium', l: 6, p: '', s: '-itorium', t: 'n.', d: '礼堂', m: 'aud(听)+itorium(地方)' },
      { w: 'audition', l: 6, p: '', s: '-ition', t: 'n./v.', d: '试听，试镜', m: 'aud(听)+ition' },
      { w: 'auditor', l: 6, p: '', s: '-itor', t: 'n.', d: '审计员', m: 'audit + or' },
      { w: 'audiovisual', l: 6, p: '', s: '-visual', t: 'adj.', d: '视听的', m: 'audio(听)+visual(看)' }
    ]
  },
  {
    id: 'manu', root: 'man/manu', variants: ['man', 'manu'], meaning: '手',
    hook: 'manu = 手。manual 手工的；manufacture 用手做=制造；manuscript 手写的=手稿；manipulate 用手操作=操纵；manner 手势=举止。',
    words: [
      { w: 'manual', l: 4, p: '', s: '-al', t: 'adj./n.', d: '手工的；手册', m: 'manu(手)+al' },
      { w: 'manufacture', l: 6, p: 'manu- 手', s: '-ure', t: 'v./n.', d: '制造', m: 'manu(手)+fact(做) → 用手做' },
      { w: 'manipulate', l: 6, p: '', s: '-ulate', t: 'v.', d: '操纵', m: 'manu(手)+pulate → 用手摆弄' },
      { w: 'manuscript', l: 6, p: '', s: '-script', t: 'n.', d: '手稿', m: 'manu(手)+script(写)' },
      { w: 'maneuver', l: 6, p: '', s: '', t: 'n./v.', d: '机动，策略', m: 'man(手)+euver → 手上动作' },
      { w: 'manner', l: 4, p: '', s: '-ner', t: 'n.', d: '方式；举止', m: 'man(手)+ner → 手势 = 举止' },
      { w: 'mandate', l: 6, p: '', s: '-date', t: 'n.', d: '授权，命令', m: 'man(手)+date(给) → 交到手上' },
      { w: 'manifest', l: 6, p: '', s: '-fest', t: 'adj./v.', d: '明显的；表明', m: 'man(手)+fest(打) → 用手一指 = 明显' }
    ]
  },
  {
    id: 'chron', root: 'chron', variants: ['chron'], meaning: '时间',
    hook: 'chron = 时间。chronic 长期的/慢性的；chronicle 编年史；synchronize 使同步；chronological 按年代的；anachronism 时代错误。',
    words: [
      { w: 'chronic', l: 6, p: '', s: '-ic', t: 'adj.', d: '慢性的，长期的', m: 'chron(时间)+ic → 时间很长的' },
      { w: 'chronicle', l: 6, p: '', s: '-icle', t: 'n.', d: '编年史', m: 'chron(时间)+icle → 按时间记的历史' },
      { w: 'synchronize', l: 6, p: 'syn- 共同', s: '-ize', t: 'v.', d: '使同步', m: 'syn(共同)+chron(时间) → 同一时间' },
      { w: 'chronological', l: 6, p: '', s: '-ological', t: 'adj.', d: '按时间顺序的', m: 'chron(时间)+ological' },
      { w: 'anachronism', l: 6, p: 'ana- 逆', s: '-ism', t: 'n.', d: '时代错误', m: 'ana(逆)+chron(时间) → 时间搞反了' },
      { w: 'chronology', l: 6, p: '', s: '-ology', t: 'n.', d: '年代学', m: 'chron + ology' },
      { w: 'synchronous', l: 6, p: 'syn- 共同', s: '-ous', t: 'adj.', d: '同步的', m: 'syn + chron + ous' }
    ]
  },
  {
    id: 'ann', root: 'ann/enn', variants: ['ann', 'enn'], meaning: '年',
    hook: 'ann/enn = 年。annual 每年的；anniversary 周年；perennial 常年；annuity 年金；biannual 一年两次。',
    words: [
      { w: 'annual', l: 4, p: '', s: '-ual', t: 'adj.', d: '每年的', m: 'ann(年)+ual' },
      { w: 'anniversary', l: 6, p: '', s: '-iversary', t: 'n.', d: '周年纪念', m: 'ann(年)+iversary → 每年转回来的日子' },
      { w: 'perennial', l: 6, p: 'per- 贯穿', s: '-ennial', t: 'adj.', d: '常年的，多年生的', m: 'per(贯穿)+enn(年) → 贯穿全年' },
      { w: 'annuity', l: 6, p: '', s: '-uity', t: 'n.', d: '年金', m: 'ann(年)+uity → 每年给的钱' },
      { w: 'biannual', l: 6, p: 'bi- 二', s: '-ual', t: 'adj.', d: '一年两次的', m: 'bi(二)+ann(年)+ual' },
      { w: 'annals', l: 6, p: '', s: '-als', t: 'n.', d: '年鉴', m: 'ann(年)+als' }
    ]
  },
  {
    id: 'path', root: 'path', variants: ['path'], meaning: '感受，病',
    hook: 'path = 感受/病。sympathy 同感=同情；empathy 进入感受=共情；apathy 无感=冷漠；pathology 病的学问=病理学；pathetic 让人心疼的。',
    words: [
      { w: 'sympathy', l: 6, p: 'sym- 共同', s: '-y', t: 'n.', d: '同情', m: 'sym(共同)+path(感受) → 一起感受' },
      { w: 'empathy', l: 6, p: 'em- 进入', s: '-y', t: 'n.', d: '共情', m: 'em(进入)+path(感受) → 走进对方感受' },
      { w: 'pathology', l: 6, p: '', s: '-ology', t: 'n.', d: '病理学', m: 'path(病)+ology(学问)' },
      { w: 'patient', l: 4, p: '', s: '-ient', t: 'n./adj.', d: '病人；耐心的', m: 'path(病)+ient → 生病的人' },
      { w: 'passion', l: 4, p: '', s: '-ion', t: 'n.', d: '激情', m: 'pass(path感受)+ion → 强烈感受' },
      { w: 'apathy', l: 6, p: 'a- 无', s: '-y', t: 'n.', d: '冷漠', m: 'a(无)+path(感受) → 没有感觉' },
      { w: 'pathetic', l: 6, p: '', s: '-etic', t: 'adj.', d: '可怜的', m: 'path(感受)+etic → 让人有感受的' },
      { w: 'sympathetic', l: 6, p: 'sym- 共同', s: '-etic', t: 'adj.', d: '同情的', m: 'sympathy + etic' }
    ]
  },
  {
    id: 'viv', root: 'vit/viv', variants: ['vit', 'viv'], meaning: '生命',
    hook: 'vit/viv = 生命。vital 生命的/至关重要的；vivid 活的=生动；survive 活过=幸存；revival 重新活=复苏；vitamin 维持生命的=维生素。',
    words: [
      { w: 'vital', l: 4, p: '', s: '-al', t: 'adj.', d: '至关重要的；生命的', m: 'vit(生命)+al → 关乎生命的', e: 'Sleep is vital to good health.' },
      { w: 'vivid', l: 6, p: '', s: '-id', t: 'adj.', d: '生动的', m: 'viv(活)+id → 活灵活现' },
      { w: 'survive', l: 4, p: 'sur- 超过', s: '', t: 'v.', d: '幸存', m: 'sur(超过)+viv(活) → 活得比…久' },
      { w: 'vitamin', l: 4, p: '', s: '-amin', t: 'n.', d: '维生素', m: 'vit(生命)+amin → 维持生命的胺' },
      { w: 'vitality', l: 6, p: '', s: '-ality', t: 'n.', d: '活力', m: 'vital + ity' },
      { w: 'convivial', l: 6, p: 'con- 共同', s: '-ial', t: 'adj.', d: '欢乐的', m: 'con(共同)+viv(活) → 一起热闹' },
      { w: 'vivacious', l: 6, p: '', s: '-acious', t: 'adj.', d: '活泼的', m: 'viv(活)+acious' },
      { w: 'revival', l: 6, p: 're- 再', s: '-al', t: 'n.', d: '复苏', m: 're(再)+viv(活) → 再活过来' },
      { w: 'survival', l: 6, p: 'sur- 超过', s: '-al', t: 'n.', d: '生存', m: 'survive + al' }
    ]
  }
];

/* ============================================================
 * 词缀体系
 * ============================================================ */

const PREFIXES = [
  { p: 'sub-', meaning: '在…下面 / 次一级', note: '辅音同化：sub → sup / suf / sug / suc / sus / sur。意思永远是「下面」，只是换了张脸。', ex: 'subway, support, suffer, suggest, succeed, suspend' },
  { p: 'in-', meaning: '①向内 ②不', note: '两个意思完全无关。判断法：去掉 in- 后剩下的还是完整词，多半是「否定」（incorrect）；否则多为「向内」（import, inject）。同化变体：im-/il-/ir-。', ex: 'import / inject / inspect ｜ invisible / illegal / irregular' },
  { p: 're-', meaning: '回 / 再次', note: '最高频前缀之一，两个意思都要记：return（回）、review（再）。', ex: 'return, review, revise, report, reconstruct' },
  { p: 'pre-', meaning: '在…之前', note: 'predict 提前说=预测；prevent 提前来=阻止；president 坐前面=主席。', ex: 'predict, prevent, president, prepare' },
  { p: 'pro-', meaning: '向前 / 赞同', note: 'produce 向前引=生产；progress 向前走=进步。注意和 pre- 区分：pre 是时间「之前」，pro 是空间「向前」。', ex: 'produce, progress, propose, promote' },
  { p: 'ex-', meaning: '向外 / 出', note: '同化变体：ef-/ef-（efficient, effect）、e-（export 有时写 e-）。export 运出去，expose 放出去。', ex: 'export, expose, extract, exclude, emit' },
  { p: 'trans-', meaning: '跨越 / 转变', note: 'transport 跨地运；transform 变形；transfer 转移。', ex: 'transport, transform, transfer, transmit' },
  { p: 'inter-', meaning: '在…之间', note: 'international 国际的；intervene 干预；interact 互动。', ex: 'international, intervene, interact, interval' },
  { p: 'con-', meaning: '共同 / 一起', note: '同化变体：com-/col-/cor-/co-。connect 连一起；compose 放一起；collaborate 共同劳动。', ex: 'connect, compose, conduct, collaborate, combine' },
  { p: 'dis-', meaning: '否定 / 分开', note: 'disagree 不同意；distract 拉开注意力；dismiss 送走。', ex: 'disagree, distract, dismiss, discover' },
  { p: 'un-', meaning: '不 / 相反动作', note: 'happy→unhappy；do→undo。四六级最高频否定前缀。', ex: 'unhappy, unable, undo, uncover' },
  { p: 'de-', meaning: '向下 / 去除 / 否定', note: 'decrease 减少；defect 缺陷；decode 解码。', ex: 'decrease, defect, decode, defend' },
  { p: 'ob-', meaning: '对着 / 反对', note: '同化变体：of-/op-/oc-。object 反对；oppose 反对；offer 提供。', ex: 'object, oppose, occlude, offend' },
  { p: 'ad-', meaning: '朝向 / 附加', note: '同化变体：ac-/af-/ag-/al-/an-/ap-/ar-/as-/at-。adjust 调整；accept 接受；attract 吸引。', ex: 'adjust, accept, affect, attract, appear' },
  { p: 'per-', meaning: '贯穿 / 完全', note: 'persist 坚持到底；perceive 完全抓住=察觉；percent 每一百。', ex: 'persist, perceive, percent, perform' },
  { p: 'super-', meaning: '在…上面 / 超级', note: 'supervise 从上往下看=监督；superficial 表面上的。', ex: 'supervise, superficial, supermarket' },
  { p: 'anti-', meaning: '反对，对抗；相反', note: '希腊 anti-「against」。唯一常见混淆：anticipate 里的 anti- 其实是拉丁 ante-「在前」的旧拼法（OED 列为 ante-/anti- 混写的历史遗留），不能把「提前」当成 anti- 的常见义去套别的词。', ex: 'antibody, antiwar, antisocial ｜ 特例：anticipate' },
  { p: 'tele-', meaning: '远距离', note: 'telephone 远声；television 远看；telescope 远镜。', ex: 'telephone, television, telescope' },
  { p: 'auto-', meaning: '自己', note: 'automatic 自动的；autobiography 自传；autograph 亲笔签名。', ex: 'automatic, autobiography, autograph' },
  { p: 'bi- / uni- / multi-', meaning: '二 / 一 / 多', note: '数字前缀成串记：uni-一、bi-二、tri-三、multi-多、semi-半。', ex: 'uniform, biannual, triangle, multinational, semiconductor' }
];

const SUFFIXES = [
  { s: '-tion / -sion', pos: '名词', meaning: '动作、状态、结果', ex: 'attention, decision, information, composition', note: '选词填空第一步判词性，看到 -tion 基本锁定名词。' },
  { s: '-ment', pos: '名词', meaning: '动作、结果', ex: 'development, equipment, agreement' },
  { s: '-ness', pos: '名词', meaning: '性质、状态', ex: 'awareness, weakness, kindness' },
  { s: '-ity / -ty', pos: '名词', meaning: '性质、状态', ex: 'ability, responsibility, security, majority' },
  { s: '-ance / -ence', pos: '名词', meaning: '动作、性质', ex: 'performance, evidence, importance, patience' },
  { s: '-er / -or / -ist', pos: '名词', meaning: '做…的人', ex: 'teacher, actor, scientist, journalist' },
  { s: '-age', pos: '名词', meaning: '结果、集合', ex: 'shortage, percentage, luggage' },
  { s: '-able / -ible', pos: '形容词', meaning: '能…的，可…的', ex: 'available, responsible, visible, possible', note: '规则：自己能动词的用 -able（accept→acceptable）；拉丁词根多用 -ible（visible, credible）。' },
  { s: '-ful / -less', pos: '形容词', meaning: '充满 / 没有', ex: 'careful / careless, useful / useless, hopeful / hopeless', note: '成对记效率最高：一个词同时拿下反义词。' },
  { s: '-ous / -ious', pos: '形容词', meaning: '具有…的', ex: 'dangerous, curious, cautious, ambitious' },
  { s: '-ive', pos: '形容词', meaning: '有…倾向的', ex: 'effective, sensitive, positive, creative' },
  { s: '-al / -ial / -ual', pos: '形容词', meaning: '…的', ex: 'natural, essential, official, annual, visual' },
  { s: '-ic / -ical', pos: '形容词', meaning: '…的', ex: 'scientific / historical, economic / economical', note: '-ic 与 -ical 有时意义不同：economic（经济的）vs economical（节约的）。' },
  { s: '-ant / -ent', pos: '形容词/名词', meaning: '…的；人', ex: 'significant, sufficient, different, assistant' },
  { s: '-ize / -ise', pos: '动词', meaning: '使…化', ex: 'realize, organize, memorize, modernize' },
  { s: '-ify', pos: '动词', meaning: '使…化', ex: 'simplify, identify, justify, satisfy' },
  { s: '-ate', pos: '动词', meaning: '使…', ex: 'create, educate, generate, communicate' },
  { s: '-en', pos: '动词', meaning: '使…', ex: 'widen, strengthen, sharpen, broaden' },
  { s: '-ly', pos: '副词（多数）', meaning: '以…方式', ex: 'quickly, gradually, seriously', note: '⚠️ 例外：lovely / friendly / lonely / lively / elderly / daily / weekly 是形容词，别一见 -ly 就判副词。' }
];

/* ============================================================
 * 主题词场（写作 / 翻译高频话题，按语义网络成串调用）
 * ============================================================ */

const THEMES = [
  {
    id: 'env', name: '环境保护', icon: 'bi bi-leaf', desc: '写作/翻译最高频话题，按「问题→原因→对策→结果」串记。',
    words: [
      { w: 'emission', d: '排放' }, { w: 'carbon', d: '碳' }, { w: 'sustainable', d: '可持续的' },
      { w: 'renewable', d: '可再生的' }, { w: 'ecosystem', d: '生态系统' }, { w: 'conservation', d: '保护' },
      { w: 'biodegradable', d: '可降解的' }, { w: 'pollutant', d: '污染物' }, { w: 'recycle', d: '回收利用' },
      { w: 'climate', d: '气候' }, { w: 'habitat', d: '栖息地' }, { w: 'biodiversity', d: '生物多样性' }
    ]
  },
  {
    id: 'edu', name: '教育学习', icon: 'bi bi-book', desc: '校园场景词汇，听力与写作双高频。',
    words: [
      { w: 'curriculum', d: '课程' }, { w: 'scholarship', d: '奖学金' }, { w: 'vocational', d: '职业的' },
      { w: 'compulsory', d: '强制的，必修的' }, { w: 'academic', d: '学术的' }, { w: 'lecture', d: '讲座' },
      { w: 'assignment', d: '作业' }, { w: 'dropout', d: '辍学' }, { w: 'critical thinking', d: '批判性思维' },
      { w: 'enrollment', d: '入学，注册' }, { w: 'tutorial', d: '辅导课' }, { w: 'dissertation', d: '学位论文' }
    ]
  },
  {
    id: 'tech', name: '科技互联网', icon: 'bi bi-cpu', desc: '阅读科技类文章的核心词群。',
    words: [
      { w: 'artificial intelligence', d: '人工智能' }, { w: 'innovation', d: '创新' }, { w: 'breakthrough', d: '突破' },
      { w: 'automation', d: '自动化' }, { w: 'digital divide', d: '数字鸿沟' }, { w: 'algorithm', d: '算法' },
      { w: 'cyberspace', d: '网络空间' }, { w: 'database', d: '数据库' }, { w: 'obsolete', d: '过时的' },
      { w: 'privacy', d: '隐私' }, { w: 'virtual', d: '虚拟的' }, { w: 'infrastructure', d: '基础设施' }
    ]
  },
  {
    id: 'health', name: '健康医疗', icon: 'bi bi-heart-pulse', desc: '听力健康场景 + 写作生活方式话题。',
    words: [
      { w: 'obesity', d: '肥胖' }, { w: 'mental health', d: '心理健康' }, { w: 'sedentary', d: '久坐的' },
      { w: 'immunity', d: '免疫力' }, { w: 'chronic', d: '慢性的' }, { w: 'nutrition', d: '营养' },
      { w: 'depression', d: '抑郁' }, { w: 'insomnia', d: '失眠' }, { w: 'prevention', d: '预防' },
      { w: 'therapy', d: '治疗' }, { w: 'well-being', d: '身心健康' }, { w: 'addiction', d: '成瘾' }
    ]
  },
  {
    id: 'econ', name: '经济商业', icon: 'bi bi-graph-up', desc: '经济类阅读与图表作文常用。',
    words: [
      { w: 'inflation', d: '通货膨胀' }, { w: 'recession', d: '衰退' }, { w: 'prosperous', d: '繁荣的' },
      { w: 'fluctuate', d: '波动' }, { w: 'subsidy', d: '补贴' }, { w: 'demand', d: '需求' },
      { w: 'supply', d: '供给' }, { w: 'market share', d: '市场份额' }, { w: 'unemployment', d: '失业' },
      { w: 'enterprise', d: '企业' }, { w: 'revenue', d: '收入' }, { w: 'investment', d: '投资' }
    ]
  },
  {
    id: 'society', name: '社会文化', icon: 'bi bi-globe', desc: '社会现象类写作的万能话题词。',
    words: [
      { w: 'globalization', d: '全球化' }, { w: 'localization', d: '本土化' }, { w: 'tradition', d: '传统' },
      { w: 'heritage', d: '遗产' }, { w: 'diversity', d: '多样性' }, { w: 'inequality', d: '不平等' },
      { w: 'generational gap', d: '代沟' }, { w: 'urbanization', d: '城市化' }, { w: 'volunteer', d: '志愿者' },
      { w: 'ethics', d: '伦理' }, { w: 'identity', d: '身份认同' }, { w: 'compromise', d: '妥协' }
    ]
  }
];

/* ============================================================
 * 易混词对比（成对记，避免考场翻车）
 * ============================================================ */

const CONFUSABLES = [
  { a: 'affect', b: 'effect', tip: 'affect 通常是动词「影响」，effect 通常是名词「效果」。记忆：A=Action(动词)，E=End(结果名词)。' },
  { a: 'acquire', b: 'require', tip: 'acquire 获得（经过努力得到），require 要求（需要）。词根都是 quir「寻求」，前缀不同：ac- 向 / re- 回。' },
  { a: 'conscience', b: 'conscious', tip: 'conscience 名词「良心」，conscious 形容词「有意识的」。拼写：良心是名词所以结尾 -ence。' },
  { a: 'adapt', b: 'adopt', tip: 'adapt 适应（改变自己），adopt 采纳/收养（拿过来）。aDapt 的 D 像调整方向，aDopt 的 D 像拿进来。' },
  { a: 'principle', b: 'principal', tip: 'principle 原则（抽象名词），principal 校长/主要的。记忆：规则 principle 带 -le，像 rule。' },
  { a: 'complement', b: 'compliment', tip: 'complement 补充物（complete 同源），compliment 赞美（带 i 像 smile）。' },
  { a: 'imply', b: 'infer', tip: '说话人 imply 暗示，听话人 infer 推断。方向不同：一个往外扔，一个往里带。' },
  { a: 'rise', b: 'raise', tip: 'rise 不及物「上升」，raise 及物「提高/举起」。rise 自己起来，raise 把东西抬起来。' },
  { a: 'economic', b: 'economical', tip: 'economic 经济的（与经济有关），economical 节约的（省钱）。' },
  { a: 'sensible', b: 'sensitive', tip: 'sensible 明智的（能判断），sensitive 敏感的（易受刺激）。' },
  { a: 'historic', b: 'historical', tip: 'historic 有历史意义的（重大），historical 与历史有关的（泛）。' },
  { a: 'continual', b: 'continuous', tip: 'continual 频繁重复（有间断），continuous 连续不断（无间断）。' },
  { a: 'assure', b: 'ensure', b2: 'insure', tip: 'assure 使某人放心（对人），ensure 确保某事（对事），insure 保险。' },
  { a: 'emigrate', b: 'immigrate', tip: 'emigrate 移出（e- 向外），immigrate 移入（im- 向内）。和 exit / import 同构。' },
  { a: 'literal', b: 'literary', tip: 'literal 字面的，literary 文学的。' },
  { a: 'stationary', b: 'stationery', tip: 'stationary 静止的，stationery 文具。记忆：stationerY 里的 Y 像一支笔的尾部，文具和书写有关。' },
  { a: 'temporarily', b: 'contemporarily', tip: 'temporary 暂时的，contemporary 当代的。多一个 con- 意思完全变了。' },
  { a: 'ingenious', b: 'ingenuous', tip: 'ingenious 巧妙的（有创造力），ingenuous 天真的（坦率）。' }
];

/* ============================================================
 * 记忆法研究结论（源自检索到的权威资料）
 * ============================================================ */

const METHODS = [
  {
    id: 'root', rank: 1, name: '词根词缀法', tag: '规律核心',
    summary: '英语约 70% 的单词由拉丁/希腊词根构成。掌握核心词根和前后缀，就能从「记一个词」变成「记一串词」。',
    detail: '关键不是背规则，而是理解两条「变脸」规律：①前缀辅音同化——sub- 会变成 sup/suf/sug/suc/sus/sur，意思永远是「下面」；②词根变脸——cap/cep/cip/ceive 骨架相同、意思都是「拿」。把词根背成「辅音骨架 + 大致意思」，而不是固定拼写。',
    source: '新东方四六级《词根词缀法高效应用指南》、山东现代学院图书馆整理稿',
    url: 'https://cet4-6.xdf.cn/202507/14690643.html'
  },
  {
    id: 'context', rank: 2, name: '真题语境法', tag: '从认到用',
    summary: '孤立背释义效率最低。把单词连同真题句子一起记，同时拿下搭配、场景和考点。',
    detail: '用「真题生词本」代替单词表：圈出阅读/听力原文里的生词，连同整句摘抄。记「搭配块」而不是「单词点」，如 suffer from sth、commit a crime、at an increased risk from。同一个词要在阅读、听力、自己写的作文里各见一次，才算真正收网。',
    source: '新东方《四六级词汇记忆法：词根词缀+语境联想》《四六级核心词汇高效记忆》',
    url: 'https://www.xdf.cn/204/202508/14733310.html'
  },
  {
    id: 'spaced', rank: 3, name: '间隔重复法', tag: '抗遗忘',
    summary: '遗忘先快后慢。新学内容 1 天后若不复习只剩约 25%，必须在遗忘临界点及时复习。',
    detail: '艾宾浩斯实验数据：20 分钟后剩 58.2%，1 小时后 44.2%，1 天后 33.7%，1 个月后 21.1%。推荐复习节点：5分钟 → 30分钟 → 12小时 → 1天 → 2天 → 4天 → 7天 → 15天。本网站的复习中心已内置这条节奏，答「认识」推进到下一档，答「忘记」回到起点。',
    source: '人民网教育频道《攻克单词记忆顽疾：科学复习更省时》、科普中国《遗忘曲线》',
    url: 'https://edu.people.com.cn/n/2012/1210/c1006-19847954.html'
  },
  {
    id: 'theme', rank: 4, name: '主题词场法', tag: '成串调用',
    summary: '大脑优先按语义网络检索，而不是字母表。按话题打包记，写作时整串词一起涌出来。',
    detail: '把环保、教育、科技、健康、经济、社会六大话题的核心词成组记忆。写作时不会卡在「那个词叫什么来着」。还可配对同义替换词：important ↔ crucial ↔ vital，decrease ↔ decline，提升写作替换能力。',
    source: '新东方《四六级词汇高效记忆法：告别背了就忘的循环》',
    url: 'https://cet4-6.xdf.cn/202611/15484941.html'
  },
  {
    id: 'assoc', rank: 5, name: '联想与谐音法', tag: '难词钩子',
    summary: '人脑对画面和情绪的记忆效率远高于纯文字。给抽象难词贴一个夸张的画面或谐音。',
    detail: '例：ambulance（救护车）→「俺不能死」；pest（害虫）→「拍死它」；chaos（混乱）→「吵死了」。越个性化、越有画面和情绪，记得越牢。注意：谐音只做「钩子」，不能代替词根和语境，且要核对发音，别把错误读音记进脑子。',
    source: '新东方网《词汇量提升攻略！四六级核心词汇记忆法》',
    url: 'https://mtoutiao.xdf.cn/cet4-6/202605/15204906.html'
  },
  {
    id: 'output', rank: 6, name: '输出倒逼法', tag: '最省力',
    summary: '一个词读七遍未必记得，自己造过一次句基本忘不掉。',
    detail: '每天挑 5 个新词，各造一个和自己生活相关的句子。要带画面和情绪，例如用「My roommate’s obsession with iced Americano is getting out of hand.」记 obsession，而不是「I am interested in English.」这种大脑不会分配存储资源的句子。',
    source: '新东方多媒体学习库《四六级词汇高效记忆法：词根词缀+语境记忆》',
    url: 'http://mp.weixin.qq.com/s?__biz=MjM5ODkyNjMxNA==&mid=2649852446&idx=4&sn=248fe84a3ca4a46fa071581882a39895'
  }
];

/* 艾宾浩斯复习档位，单位：分钟 */
const REVIEW_STEPS = [
  { label: '5分钟', min: 5 },
  { label: '30分钟', min: 30 },
  { label: '12小时', min: 720 },
  { label: '1天', min: 1440 },
  { label: '2天', min: 2880 },
  { label: '4天', min: 5760 },
  { label: '7天', min: 10080 },
  { label: '15天', min: 21600 }
];

/* 汇总全部单词，便于检索 / 测验 / SRS */
const ALL_WORDS = ROOT_FAMILIES.flatMap(f =>
  f.words.map(w => ({ ...w, family: f.id, familyRoot: f.root, familyMeaning: f.meaning }))
);

/* 暴露到全局，供 app.js（ESM）读取 */
window.LE_DATA = { ROOT_FAMILIES, PREFIXES, SUFFIXES, THEMES, CONFUSABLES, METHODS, REVIEW_STEPS, ALL_WORDS };
