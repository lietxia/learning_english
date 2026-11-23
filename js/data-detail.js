/* ============================================================
 * lean-english 细化数据：词根词源逻辑 + 一词多义 + 方法步骤
 * 数据来源：etymonline 构词脉络、Varsity Tutors / BrainEOS 拉丁希腊词根表、
 *          新东方四六级「熟词生义」专题、科普中国遗忘曲线。
 * 组织方式：按词根家族 id 挂接，app.js 直接读取 window.LE_DETAIL。
 * ============================================================ */

/* ---------- 一、词根含义逻辑（39 组全覆盖） ----------
 * lang    源语言
 * origin  原始词及字面义
 * logic   从本义到各派生义的演化逻辑（为什么这个根会有这些意思）
 * chain   具体 → 抽象的义项链条
 * trap    易错点：同形异源 / 语义跑偏 / 想当然的拆解
 */
const ROOT_ETYMOLOGY = {
  spect: {
    lang: '拉丁', origin: 'specere「看、观察」，过去分词 spectus「被看见的东西」',
    logic: '一切从「用眼睛看」出发，沿三条路分叉：①看得仔细→检查；②看的角度→态度与视角；③看的对象→景象、奇观。拼写变体 spic/spec 是同一词根在不同语音环境下的面孔，骨架 s-p-c 不变。',
    chain: ['看 → 仔细看：inspect 检查', '回头看 → 另眼相看：respect 尊重', '向前看 → 展望：prospect 前景', '偷着看 → 起疑：suspect 怀疑', '看的对象 → 景象：spectacle 奇观'],
    trap: 'species（物种）、specimen（标本）走的是拉丁 species「外观、种类」这条路，不是直接「看」。词根能帮你猜个大概，但别把每个 spec 都硬拆成「看」。'
  },
  port: {
    lang: '拉丁', origin: 'portare「搬运、携带」',
    logic: '本义是「用手搬着走」。加上方向前缀就得到一整套物流词：运进来 import、运出去 export、跨地运 transport、带回来 report、在下面托着 support。注意名词 port「港口」来自另一个拉丁词 portus「避难所、港湾」，与 portare 同源不同词——「港口」是船停的地方，不是「搬运」的动词义。',
    chain: ['搬运 → 运进：import 进口', '搬运 → 运出：export 出口', '搬运 → 跨越：transport 运输', '带消息回来 → 报告：report', '在下面托 → 支撑：support'],
    trap: 'airport / seaport 里的 port 是「港口」，不是「搬运」。同一个拼写藏着两个拉丁词，这是典型的同形异源。'
  },
  dict: {
    lang: '拉丁', origin: 'dicere「说、讲」，过去分词 dictus「被说过的话」',
    logic: '「说」这个动作加上不同方向和修饰，衍生出整套言语行为：预先说 predict、反着说 contradict、如实说 verdict、说出来指明 indicate。dict 的过去分词形式 dictus 解释了为什么这一族词多以 -dict 出现。',
    chain: ['说 → 提前说：predict 预言', '说 → 反着说：contradict 反驳', '说 → 真实地说：verdict 裁决', '说 → 指着说：indicate 表明', '说 → 收集说法：dictionary 词典'],
    trap: 'benediction（祝福）与 malediction（诅咒）共用 dict，只靠 bene-（好）/male-（坏）区分——这是用词根+前缀瞬间猜出生词的经典案例。'
  },
  duct: {
    lang: '拉丁', origin: 'ducere「引导、带领」，过去分词 ductus「被引导」',
    logic: '本义是「牵着走」。拉丁动词有两个词干：现在式 duc- 与过去分词 duct-，英语把两者都借了进来，所以同族词有的写 duc（educate/produce），有的写 duct（conduct/deduct）。这是「一词两根形」的典型。',
    chain: ['引导 → 引出来：educate 教育（把内在的引导出来）', '引导 → 向前引：produce 生产', '引导 → 往回引：reduce 减少', '引导 → 一起带：conduct 指挥', '引导 → 向下引：deduce 推断'],
    trap: '为什么有 duc 又有 duct？不是两个词根，是同一个拉丁动词的两个形态。记住这条，同族词的拼写就不再混乱。'
  },
  tract: {
    lang: '拉丁', origin: 'trahere「拖、拉」，过去分词 tractus「被拖拉的」',
    logic: '本义是「用力拉」。拉的方向决定词义：拉过来 attract、拉开 distract、拉出来 extract、拉下去 subtract、拉到一处 contract。抽象化后，「拉」变成「吸引」和「收缩」两类。',
    chain: ['拉 → 拉过来：attract 吸引', '拉 → 拉开：distract 分心', '拉 → 拉出来：extract 提取', '拉 → 一起拉：contract 收缩/合同', '拉 → 抽离具体：abstract 抽象的'],
    trap: 'contract 同时是「收缩」和「合同」，两条义项都从「拉到一起」来：物理上拉紧、法律上把双方拉到一起。'
  },
  fer: {
    lang: '拉丁', origin: 'ferre「拿、带、忍受」',
    logic: '本义「拿着走」，由此分出三支：①空间转移 transfer；②心理承受 suffer（在下面扛着）；③带入头脑 infer / refer。fer 与 port 都表「拿」，区别是 port 偏「运输货物」，fer 偏「携带/承受」。',
    chain: ['拿 → 带过去：transfer 转移', '拿 → 带回来查：refer 参考', '拿 → 提前拿：prefer 偏爱', '扛 → 在下面承受：suffer 遭受', '带 → 带进推理：infer 推断'],
    trap: 'fertile（肥沃）也来自 ferre，走的是「能带来收成」这条支路，不是「拿」的直接义。'
  },
  ject: {
    lang: '拉丁', origin: 'iacere「投、扔」，过去分词 iectus「被扔出的」',
    logic: '本义「扔」，方向前缀决定全部词义：扔回来 reject、扔进去 inject、扔向前 project、扔到对面 object、扔到下面 subject。这是一组几乎可以纯靠前缀推导的词根。',
    chain: ['扔 → 扔回：reject 拒绝', '扔 → 扔进：inject 注射', '扔 → 扔向前：project 投射/项目', '扔 → 扔到对面：object 反对', '扔 → 扔到下面：subject 使服从'],
    trap: 'object 从「反对」又衍生出「物体」（被扔到眼前的东西），subject 从「臣服」衍生出「主题」——这是「动作 → 动作对象」的常见跳跃。'
  },
  mit: {
    lang: '拉丁', origin: 'mittere「送、放、让走」，过去分词 missus「被派出的」',
    logic: '本义「送出去」，由此衍生两条线：①实际传送 submit/transmit/dismiss；②「送出话」→ promise（事先送出的话）、commit（把自己送进去=投入/犯罪）。词根有 mit 与 miss 两个形态，同样来自现在式与过去分词。',
    chain: ['送 → 从下送上：submit 提交', '送 → 让它通过：permit 允许', '送 → 跨地送：transmit 传输', '送 → 送走：dismiss 解散', '送 → 事先送出的承诺：promise'],
    trap: 'promise 里的 miss 不读「错过」，是「送出」；admit 是「放进来」而不是「承认」的本义——承认是「允许进入」的引申。'
  },
  vent: {
    lang: '拉丁', origin: 'venire「来」，过去分词 ventus「到来的」',
    logic: '本义「来」，方向决定词义：提前来 prevent（拦在前面）、一起来 convene、往回来的钱 revenue、走到中间 intervene。抽象化后，「来」变成「发生」和「到来之物」。',
    chain: ['来 → 提前来拦：prevent 阻止', '来 → 向外冒出：event 事件', '来 → 回来：revenue 收入', '来 → 进入中间：intervene 干预', '来 → 想出来：invent 发明'],
    trap: 'prevent 的字面是「提前来」，为什么是「阻止」？因为提前来就是为了挡住。理解意图，比死记「pre+vent=阻止」更牢。'
  },
  pose: {
    lang: '拉丁', origin: 'ponere「放置、安放」，过去分词 positus「被放好的」',
    logic: '本义「放」。放的方式决定词义：放一起 compose、放出去 expose、放进去 impose、放对面 oppose、放前面 propose、放下存着 deposit。position「位置」就是「被放的地方」。',
    chain: ['放 → 放到一起：compose 组成', '放 → 放到外面：expose 暴露', '放 → 硬放进去：impose 强加', '放 → 放到对面：oppose 反对', '放 → 放下来：deposit 存放'],
    trap: 'pose 还有一个「摆姿势」义，来自法语 poser，仍是「放置（身体）」的引申。同根不同路径，别强行合并成一个意思。'
  },
  vis: {
    lang: '拉丁', origin: 'videre「看」，过去分词 visus「被看见的」',
    logic: '与 spect 同为「看」，但 vis 更偏「视力/可见性」，spect 更偏「观察/审视」。re「再看」= revise、super「从上往下看」= supervise、e「向外看得出」= evident、pro「提前看到需求」= provide。',
    chain: ['看 → 能看见：visible 可见的', '看 → 再看一遍：revise 修订', '看 → 从上往下看：supervise 监督', '看 → 显出来：evident 明显的', '看 → 提前备好：provide 提供'],
    trap: 'provide 的字面是「提前看」，为什么是「提供」？提前看到需求就会准备——这是「预见 → 预备 → 提供」的三跳。'
  },
  cap: {
    lang: '拉丁', origin: 'capere「拿、抓、容纳」，过去分词 captus',
    logic: '本义「用手抓」。形态变化最大：cap / cep / cip / ceive。ceive 是法语化的结果——拉丁语夹在两个元音之间的 p 在法语里软化成 v，receive 就是这么来的。义项分两支：抓住 capture/captive，与容纳 capacity/concept。',
    chain: ['抓 → 抓住：capture 捕获', '抓 → 接受：accept 接受', '抓 → 拿回来：receive 收到', '抓 → 提前拿到：anticipate 预期', '容纳 → 容量/能力：capacity'],
    trap: 'cap 还有「头」的意思（capital 首都、captain 队长），来自拉丁 caput「头」，与 capere「抓」是不同词根。同形异源，别混。'
  },
  struct: {
    lang: '拉丁', origin: 'struere「堆建、构造」，过去分词 structus「被建好的」',
    logic: '本义「把东西堆起来建造成」。in「在心里建」= instruct 教导，ob「对着建」= obstruct 阻碍，de「拆掉建好的」= destroy 破坏。抽象化后指任何「构成方式」，如 structure 结构。',
    chain: ['建 → 建起来：construct 建造', '建 → 在心里建：instruct 指导', '建 → 对面建墙：obstruct 阻碍', '建 → 拆掉：destroy 破坏', '建 → 构成方式：structure 结构'],
    trap: 'destroy 里的 stroy 是 struct 的变体，不是另一个词根。看到 -stroy 就往「建造/拆建」上靠。'
  },
  fect: {
    lang: '拉丁', origin: 'facere「做、制造」，过去分词 factus「被做出来的」',
    logic: '本义「做」，词根三张脸 fact / fect / fic，取决于前缀与元音同化。做出来的东西是 effect（结果），对着做是 affect（影响），做得好 efficient、做得够 sufficient。 fiction 是「做出来的故事」。',
    chain: ['做 → 做出来的结果：effect 效果', '做 → 对…下手：affect 影响', '做 → 做得好：efficient 高效', '做 → 做得够：sufficient 充足', '做 → 虚构：fiction 小说'],
    trap: 'affect 与 effect 是四六级最经典的辨析题：affect 通常作动词（A=Action），effect 通常作名词（E=End）。词根相同，词性不同。'
  },
  tain: {
    lang: '拉丁', origin: 'tenere「握住、保持」，过去分词 tentus',
    logic: '本义「用手握住」。握住不放 maintain/retain，握在一起 contain，握到手 obtain，从下面撑住 sustain。派生出 ten「保持、伸展」与 tin「持续」等变体。',
    chain: ['握 → 保持住：maintain 维持', '握 → 一起握住：contain 包含', '握 → 握到手：obtain 获得', '握 → 握回来：retain 保留', '握 → 下面撑住：sustain 支撑'],
    trap: 'attend 里的 tend 是「伸展」（伸向某人=出席/照料），与 tenere 同出一源但走的是「伸展」而非「握住」，别硬套。'
  },
  sid: {
    lang: '拉丁', origin: 'sedere「坐」，过去分词 sessus「坐过的」',
    logic: '本义「坐下」。坐在前面 preside/president，坐下来 reside，坐一段 sessio→session，坐在…上不走 obsess。义项从「物理坐下」延伸到「居留、主持、专注」。',
    chain: ['坐 → 坐前面：president 主席', '坐 → 坐下来：reside 居住', '坐 → 坐一段时间：session 会议', '坐 → 坐在上面不走：obsess 痴迷', '坐 → 坐拥：possess 拥有'],
    trap: 'possess 里的 sess 来自 sedere，但前缀是 potis「有能力」而非 pos「放」——「有能力坐着占有」= 拥有。词源细节能防止误拆。'
  },
  log: {
    lang: '希腊', origin: 'logos「话、言语、理性、学问」',
    logic: '本义「说话」，同时含有「道理、秩序」的意思。因此既能组成 dialogue（穿过说话=对话）、apology（说开=道歉），又能作学科后缀 -logy（关于…的学问）：biology、technology、ecology。',
    chain: ['说 → 两人之间说：dialogue 对话', '说 → 说开：apology 道歉', '说 → 有条理地说：logic 逻辑', '学问 → 生命的学问：biology 生物学', '学问 → 环境的学问：ecology 生态学'],
    trap: 'log 与 logue 是同一希腊词的不同拼法；看到 -logy 就能判断「这是一门学问」，这对猜生词极有用。'
  },
  voc: {
    lang: '拉丁', origin: 'vocare「呼叫」，名词 vox「声音」',
    logic: '本义「叫出声」。voc「声音/词汇」与 vok「唤起」两套拼写：vocabulary 是一堆音，vocation 是「被召唤的职业」，evoke/provoke/invoke 是往不同方向「叫」。',
    chain: ['叫 → 声音的：vocal 发声的', '叫 → 一堆音：vocabulary 词汇', '叫 → 内在的召唤：vocation 天职', '叫 → 叫出来：evoke 唤起', '叫 → 冲人叫：provoke 激怒'],
    trap: 'vocation 不是「假期」（vacation），两者只差一个字母：voc=叫（天职），vac=空（假期）。这是形近词高频陷阱。'
  },
  sci: {
    lang: '拉丁', origin: 'scire「知道、明白」',
    logic: '本义「心里知道」。science 是成体系的知识，conscious 是「心里一起知道」= 有意识，conscience 是「知道对错」= 良心，prescient 是「提前知道」= 预知。',
    chain: ['知道 → 知识体系：science 科学', '知道 → 心里明白：conscious 有意识的', '知道 → 知道对错：conscience 良心', '知道 → 提前知道：prescient 预知的', '知道 → 下面也知道：subconscious 潜意识'],
    trap: 'conscience（良心）与 conscious（有意识）只差词尾：名词 -ence 是良心，形容词 -ous 是有意识。'
  },
  soc: {
    lang: '拉丁', origin: 'socius「同伴、伙伴、盟友」',
    logic: '本义「伙伴」。social 是「伙伴的」= 社会的，associate 是「结为伙伴」= 联系，sociable 是「能做伙伴」= 好交际的，sociology 是研究伙伴关系的学问。',
    chain: ['伙伴 → 群体的：social 社会的', '伙伴 → 结为伙伴：associate 联系', '伙伴 → 能做伙伴：sociable 合群的', '伙伴 → 伙伴关系：society 社会', '伙伴 → 研究群体：sociology 社会学'],
    trap: 'society 的词根不是「社交」而是「伙伴/同盟」，这解释了为什么它也指「社团、协会」。'
  },
  eco: {
    lang: '希腊', origin: 'oikos「家、家务、住所」',
    logic: '本义「家」。分成两支：eco+nomy（管理）→ 治家 = 经济；eco+logy（学问）→ 关于家/环境的学问 = 生态。所以 economy 与 ecology 表面差很远，骨子里都是「家」。',
    chain: ['家 → 管理家：economy 经济', '家 → 家的学问：ecology 生态', '家 → 系统：ecosystem 生态系统', '家 → 管家的人：economist 经济学家', '家 → 对家友好：eco-friendly 环保的'],
    trap: 'economic「经济的」与 economical「节约的」不同：前者讲经济体系，后者讲「持家有道」——正好保留了 oikos「治家」的本义。'
  },
  vers: {
    lang: '拉丁', origin: 'vertere「转、转动」，过去分词 versus「被转过的」',
    logic: '本义「转」。转向不同位置得到 convert（转过去=改变）、reverse（转回来=颠倒）、diverse（转向不同=多样）、adverse（转向你=不利）。version 是「转述出来的一个说法」。',
    chain: ['转 → 转过去：convert 转换', '转 → 转回来：reverse 颠倒', '转 → 转向各方：diverse 多样', '转 → 转向反面：controversy 争议', '转 → 转述：version 版本'],
    trap: 'universe 也含 vers：uni「一」+vers「转」=「万物转向一处」→ 宇宙。这个义项跳跃很大，值得单独记。'
  },
  sta: {
    lang: '拉丁', origin: 'stare「站立」，status「站立的状态、位置」',
    logic: '本义「站」。站得稳 stable，使站稳 establish，站着不动 static，站的位置 status→身份/地位，站得住的数据 statistic。抽象路线是「站 → 稳定 → 状态 → 地位」。',
    chain: ['站 → 站得住：stable 稳定', '站 → 使站稳：establish 建立', '站 → 站着不动：static 静态', '站 → 站的位置：status 地位', '站 → 站住的数据：statistic 统计'],
    trap: 'status 为什么是「地位」？因为站在社会中的位置就是身份。state「国家/状态」也同源——「站立的状态」。'
  },
  graph: {
    lang: '希腊', origin: 'graphein「写、画、记录」',
    logic: '本义「写/画」。写的方式决定词义：光写的 photograph、写生命的 biography、写大地的 geography、旁边另写的 paragraph。graph 作名词时指「图表」，因为图表是「画出来的」。',
    chain: ['写 → 用光写：photograph 照片', '写 → 写一生：biography 传记', '写 → 写大地：geography 地理', '写 → 旁边另起：paragraph 段落', '写 → 自己写：autograph 签名'],
    trap: 'graph（希腊「写」）与 scrib/script（拉丁「写」）是两套系统：geography 用 graph，description 用 script，别混。'
  },
  gen: {
    lang: '拉丁/希腊', origin: '拉丁 gignere「生育、产生」、genus「种族」；希腊 genesis「起源」',
    logic: '本义「生出来」。gen 同时含「产生」与「种族/种类」两层，于是有 generate（产生）、gene（基因）、genuine（天生的=真）、genius（天赋）、hydrogen（生成水的元素）。',
    chain: ['生 → 产生：generate 生成', '生 → 遗传单位：gene 基因', '生 → 天生的：genuine 真正的', '生 → 天生的才能：genius 天才', '生 → 种族：gender 性别'],
    trap: 'general 为什么是「普遍的」？因为涉及整个 genus「种类」，而非某一成员——这是「种族 → 全体」的引申。'
  },
  cess: {
    lang: '拉丁', origin: 'cedere「走、让、屈服」，过去分词 cessus',
    logic: '本义「走」，同时含「让步」义。向前走 proceed、走上去 succeed、能走向 access、走过头 excess、退回去 recede、让一步 concede。名词形式多用 cess，动词形式多用 ceed/cede。',
    chain: ['走 → 从下走上：succeed 成功', '走 → 向前走：proceed 继续', '走 → 能走向：access 通道', '走 → 走过头：excess 过量', '走 → 让一步：concede 让步'],
    trap: 'succeed 同时是「成功」和「接替」，都从「从下走上」来：走上高位=成功，走上前任的位置=接替。'
  },
  pend: {
    lang: '拉丁', origin: 'pendere「悬挂、称量」，pensare「称、支付」',
    logic: 'pend 本义「挂」，引申出 hang（悬挂）与 weigh（称量）两支：suspend 挂起来，depend 挂在…上=依靠，expense 是「称出去的钱」=花费，pension 是定期付的钱。',
    chain: ['挂 → 挂在…上：depend 依靠', '挂 → 吊在下面：suspend 悬挂/暂停', '称 → 花出去：expense 费用', '付 → 定期付：pension 养老金', '挂 → 挂在书后：appendix 附录'],
    trap: 'suspend 为什么有「暂停」义？把会议「挂起来」就是暂停。这是从物理悬挂到抽象中止的跳跃。'
  },
  cred: {
    lang: '拉丁', origin: 'credere「相信、信任」',
    logic: '本义「相信」。credit 是「值得相信」→ 信用/学分；credible 可信；incredible 不可信；credential 是「让人相信你的东西」；creditor 是「相信你会还钱的人」。整族几乎不用跳。',
    chain: ['信 → 值得信：credit 信用', '信 → 能信：credible 可信的', '信 → 不信：incredible 难以置信', '信 → 让人信的证书：credential 资历', '信 → 信你会还钱的人：creditor 债权人'],
    trap: 'credulous 是「轻信的」（太容易信），与 credible「可信的」方向相反：一个说给信者的程度，一个说被信者的品质。'
  },
  memor: {
    lang: '拉丁', origin: 'memor「留心的、记得的」',
    logic: '本义「记得」。memory/memorize 记，memorial 是「让人记住的东西」=纪念碑，commemorate 是「大家一起记」，remember 是 re「回」+member「记忆」= 想起来。',
    chain: ['记 → 记住：memorize', '记 → 让人记住：memorial 纪念碑', '记 → 一起记：commemorate 纪念', '记 → 回过来想：remember 记得', '记 → 难忘：memorable'],
    trap: 'remember 里的 member 不是「成员」，是 memor 的变体。拆成「成员」就完全错了。'
  },
  form: {
    lang: '拉丁', origin: 'forma「形状、模样、模型」',
    logic: '本义「形状」。in「使成形」= inform 通知（让想法成形）、re「再塑形」= reform 改革、con「合于形」= conform 遵守、trans「变形」= transform。formal「正式的」就是「合乎形式的」。',
    chain: ['形 → 再塑形：reform 改革', '形 → 变形：transform 转变', '形 → 使成形：inform 通知', '形 → 合于形：conform 遵守', '形 → 一个形：uniform 制服/统一'],
    trap: 'perform 里的 form 也是「做/成形」，per「彻底」+form「做出来」= 执行、表演。别只记「形状」。'
  },
  cur: {
    lang: '拉丁', origin: 'currere「跑」，过去分词 cursus「奔跑、行程」',
    logic: '本义「跑」。跑的状态 current（正在跑=当前的/水流），跑到面前 occur（发生），跑回来 recur（复发），课程 curriculum 原义「跑道」→ 学习历程，excursion 是「跑出去」=远足。',
    chain: ['跑 → 正在跑：current 当前的', '跑 → 跑来：occur 发生', '跑 → 再跑来：recur 复发', '跑 → 跑道：curriculum 课程', '跑 → 跑出去：excursion 远足'],
    trap: 'currency（货币）来自「流通」——钱在跑。这是「跑 → 流动 → 流通」的三跳。'
  },
  flu: {
    lang: '拉丁', origin: 'fluere「流动」',
    logic: '本义「流」。flu 的义项几乎都能用「流」串起来：fluent 话流得顺，fluid 能流的东西，influence 流进心里，affluent 财富流过来，fluctuate 流来流去。',
    chain: ['流 → 流得顺：fluent 流利', '流 → 能流的：fluid 流体', '流 → 流进心里：influence 影响', '流 → 流向你：affluent 富裕', '流 → 流来流去：fluctuate 波动'],
    trap: 'flu 还有一个常见义「流感」（influenza 的缩写）——古人以为流感是「星体影响流入」，所以仍与「流」有关。'
  },
  sent: {
    lang: '拉丁', origin: 'sentire「感觉、感知」，过去分词 sensus「感觉」',
    logic: '本义「感觉」。sensible 是「能感觉/能判断」= 明智，sensitive 是「容易感觉」= 敏感，consent 是「感觉一致」= 同意，resent 是「感觉反过来」= 怨恨。sens 与 sent 是同一词干的两副面孔。',
    chain: ['感觉 → 能判断：sensible 明智的', '感觉 → 易受刺激：sensitive 敏感的', '感觉 → 感觉一致：consent 同意', '感觉 → 反过来感觉：resent 怨恨', '感觉 → 强烈感受：passion 激情'],
    trap: 'sensible 与 sensitive 是高频辨析：前者「明智」，后者「敏感」。记法：-ible 能判断，-itive 易被刺激。'
  },
  aud: {
    lang: '拉丁', origin: 'audire「听」',
    logic: '本义「听」。audience 是听的人，audible 是听得见的，auditorium 是听的地方，audit 是「听人念账」→ 查账。整族从「听」出发，最后跳到「审计」。',
    chain: ['听 → 听的人：audience 听众', '听 → 听得见：audible', '听 → 听的地方：auditorium 礼堂', '听 → 听账：audit 审计', '听 → 试听：audition 试镜'],
    trap: 'audit 为什么是「审计」？古代查账是让 accountant 当众念、审查者听——「听账」演变成查账。这个场景记住就不会忘。'
  },
  manu: {
    lang: '拉丁', origin: 'manus「手」',
    logic: '本义「手」。manual 手工的，manufacture 用手做，manuscript 手写的，manipulate 用手摆弄，manner 原义「用手的方式」→ 举止。抽象化后，「手」变成「操作方式」。',
    chain: ['手 → 手工的：manual', '手 → 用手做：manufacture 制造', '手 → 手写：manuscript 手稿', '手 → 用手摆弄：manipulate 操纵', '手 → 手势：manner 举止'],
    trap: 'mandate（授权）里的 man 是「手」，date 是「给」——把手里的权交给别人。不是「命令」那么简单。'
  },
  chron: {
    lang: '希腊', origin: 'chronos「时间」',
    logic: '本义「时间」。chronic 是时间拖得长=慢性，chronicle 是按时间写=编年史，synchronize 是同一时间=同步，anachronism 是时间搞反=时代错误。',
    chain: ['时间 → 拖得长：chronic 慢性的', '时间 → 按时间写：chronicle 编年史', '时间 → 同一时间：synchronize 同步', '时间 → 时间反了：anachronism 时代错误', '时间 → 时间顺序：chronological'],
    trap: 'chronic 不只是「慢性」，也有「积习难改的」义，仍是「时间很久」的引申。'
  },
  ann: {
    lang: '拉丁', origin: 'annus「年」',
    logic: '本义「年」。annual 每年，anniversary 每年转回来的日子，annuity 每年给的钱，perennial 贯穿全年，biannual 一年两次。整族几乎不用跳。',
    chain: ['年 → 每年的：annual', '年 → 每年转回：anniversary 周年', '年 → 每年给：annuity 年金', '年 → 贯穿全年：perennial 常年', '年 → 一年两次：biannual'],
    trap: 'biannual 可能指「一年两次」或「两年一次」，考试语境通常取「一年两次」；正式表达可用 biannual / biennial 区分。'
  },
  path: {
    lang: '希腊', origin: 'pathos「感受、苦难、经历」',
    logic: '本义「感受」，兼有「痛苦」义。sympathy 一起感受=同情，empathy 进入对方感受=共情，apathy 无感=冷漠，pathology 研究病的学问=病理学。',
    chain: ['感受 → 一起感受：sympathy 同情', '感受 → 进入感受：empathy 共情', '感受 → 没有感受：apathy 冷漠', '痛苦 → 病的学问：pathology 病理学', '感受 → 让人心疼：pathetic 可怜的'],
    trap: 'sympathy 与 empathy 的区别：sympathy 是「我为你难过」，empathy 是「我感受到你的感受」。词源里 sym=一起，em=进入。'
  },
  viv: {
    lang: '拉丁', origin: 'vivere「活」、vita「生命」',
    logic: '本义「活」。vital 关乎生命=至关重要，vivid 活得鲜活=生动，survive 活得过=幸存，revival 再活=复苏，vitamin 维持生命的胺=维生素。',
    chain: ['活 → 关乎生命：vital 至关重要的', '活 → 活灵活现：vivid 生动的', '活 → 活得久：survive 幸存', '活 → 再活：revival 复苏', '活 → 维持生命：vitamin 维生素'],
    trap: 'vital 为什么是「至关重要」？因为它直接等于「生命相关的」。考试里 vital 几乎不考「生命的」本义，只考「至关重要的」。'
  }
};

/* ---------- 二、方法操作步骤（六法细化） ---------- */
const METHOD_STEPS = {
  root: {
    steps: ['遇到生词先拆：前缀 + 词根 + 后缀，写出字面义', '查词源确认本义，搞清从本义到引申义的路径', '把同根词放进一张纸条，按「方向前缀」排成一条链', '隔天盖住中文，只看词根猜义，再对照修正'],
    example: 'invisible = in(不) + vis(看) + ible(能…的) → 不能被看到的',
    pitfall: '不要望词生义：salary 的 sal 是「盐」（古罗马士兵的买盐钱），understand 的 under 是古义「在…之中」。拆不通就查词源。'
  },
  context: {
    steps: ['做完一篇真题阅读/听力，圈出所有不认识的词', '连同所在的完整句子一起摘抄，不要只抄单词', '标出搭配块（动词+介词、形容词+名词）与话题场景', '把生词带到自己的作文里用一次'],
    example: 'suffer：单词表只写「遭受」；真题语境 People suffering from sleep loss are at an increased risk... 同时拿下 suffer from、健康话题、at risk from',
    pitfall: '抄十遍不如在不同句子里遇见三次。不要背词典例句，要背真题例句——它自带考点和搭配。'
  },
  spaced: {
    steps: ['把新词按 5分钟→30分钟→12小时→1天→2天→4天→7天→15天 排期', '每次复习先遮住释义，主动回忆，再看答案', '答不出的词标记，缩短间隔；答对的拉长间隔', '考前两周只看标记的生词本，不再翻整本词汇书'],
    example: '本网站复习中心：点「忘记」回 5 分钟档，点「认识」推进到下一档',
    pitfall: '复习≠再看一遍。只是看着释义点头不会产生提取练习，必须遮住自己想。'
  },
  theme: {
    steps: ['按环保/教育/科技/健康/经济/社会六大话题整理词表', '每个话题整理 10–15 个高频词，成组记忆', '同步整理同义替换对，如 important↔crucial↔vital', '写一篇该话题短文，强制用完这一组'],
    example: '环保：emission → pollutant → purify → conservation → sustainable，写作时整串调用',
    pitfall: '话题词不要按字母序背。大脑按语义网络检索，按话题打包才能在考场上「一串涌出来」。'
  },
  assoc: {
    steps: ['挑出用词根也拆不通的抽象难词', '给它编一个谐音或夸张画面，越离谱越好', '把画面和词义、发音绑定，大声读一遍', '第二天先回忆画面，再回想单词'],
    example: 'ambulance→「俺不能死」；pest→「拍死它」；chaos→「吵死了」',
    pitfall: '谐音只是钩子，不能代替词根和语境。务必核对真实发音，别把错误读音记进脑子。'
  },
  output: {
    steps: ['每天挑 5 个新词', '各造一个和自己生活相关的句子', '句子要有画面和情绪，不用简单模板句', '把句子读出来，第二天试着复述'],
    example: '✅ My roommate’s obsession with iced Americano is getting out of hand. ❌ I am interested in English.',
    pitfall: '不要造「I like it」这种句子，大脑不会给它分配存储资源。有画面、有情绪才留得住。'
  }
};

/* ---------- 三、一词多义：熟词僻义专题（新东方等资料整理） ----------
 * w 单词 | common 常见义 | senses 义项数组（m 义项, clue 判断线索, ex 例句）
 * why 为什么会有这个义项（词根/语义链视角）
 */
const POLYSEMY = [
  { w: 'address', common: '地址 n.', senses: [
    { m: '处理、解决 v.', clue: '后接问题类名词，且前面有 need to / must', ex: 'We must address the problem of environmental pollution.' },
    { m: '向…讲话 v.', clue: '后接人/听众', ex: 'address the audience' }
  ], why: 'address 来自拉丁 ad-（向）+ dictare（说），本义「向某人说话」。「称呼→写地址→处理」都是「把话/注意力朝向某对象」的延伸。' },
  { w: 'appreciate', common: '感激 v.', senses: [
    { m: '理解、意识到 v.', clue: '后接抽象名词或 that 从句，没有感谢对象', ex: 'I appreciate the difficulty of the task.' }
  ], why: 'ap-（加强）+ preci（价值，同 price）→「看到价值」。看到价值既能是「感激」，也能是「意识到」。' },
  { w: 'bear', common: '熊 n.', senses: [
    { m: '忍受、承受 v.', clue: '后接痛苦/责任类名词', ex: 'The document bears his signature.' },
    { m: '带有（特征）v.', clue: '宾语是印记、签名、特征', ex: 'bears his signature' }
  ], why: '名词「熊」与动词「承受」在古英语本是同一个词的不同用法——像熊一样扛得住。' },
  { w: 'observe', common: '观察 v.', senses: [
    { m: '遵守 v.', clue: '宾语是规则、法律', ex: 'Students must observe the school rules.' },
    { m: '庆祝 v.', clue: '宾语是节日', ex: 'observe Thanksgiving' },
    { m: '评论说 v.', clue: '后接 that 从句', ex: 'observe that...' }
  ], why: 'ob-（朝向）+ serv（保持、看）→「保持关注」。关注规则=遵守，关注节日=庆祝，关注后说出=评论。' },
  { w: 'subject', common: '科目 n.', senses: [
    { m: '主题 n.', clue: '讨论、文章的语境', ex: 'the subject of the debate' },
    { m: '易受…影响的 adj.', clue: 'be subject to 固定搭配', ex: 'The area is subject to heavy flooding.' },
    { m: '使遭受 v.', clue: 'subject sb to sth', ex: 'subjected to harsh conditions' }
  ], why: 'sub-（下面）+ ject（扔）→「被扔在下面的」→ 臣服的、受支配的。科目、主题都是「被摆在下面讨论的对象」。' },
  { w: 'issue', common: '问题 n.', senses: [
    { m: '发行、发布 v.', clue: '宾语是政策、声明、报纸', ex: 'The government will issue a new policy.' },
    { m: '（报刊）期号 n.', clue: 'the latest issue of...' }
  ], why: 'issue 来自拉丁 ex-（出）+ ire（走）→「走出去」。消息走出去=发布，争议走出去=问题，报刊走出去=一期。' },
  { w: 'firm', common: '公司 n.', senses: [
    { m: '坚定的、结实的 adj.', clue: '修饰 action / belief / grip', ex: 'We need to take firm action.' }
  ], why: 'firm 本义是「坚固的」（来自拉丁 firmus），「公司」是「坚固的合伙组织」的缩写用法。' },
  { w: 'develop', common: '发展 v.', senses: [
    { m: '患（病）v.', clue: '宾语是疾病、症状', ex: 'develop a disease' },
    { m: '冲洗（胶片）v.', clue: '宾语是 film/photo' },
    { m: '阐述、展开 v.', clue: '宾语是 idea/theory', ex: 'develop an idea further' }
  ], why: 'de-（去掉）+ velop（包裹）→「解开包裹」。解开后东西展开=发展、阐述；疾病显现=患病；影像显现=冲洗。' },
  { w: 'secure', common: '安全的 adj.', senses: [
    { m: '获得、争取到 v.', clue: '宾语是合同、职位、资金', ex: 'The company secured a major contract.' }
  ], why: 'se-（脱离）+ cure（担忧）→「无忧」=安全。动词义是「把某物弄到手从而安心」=获得。' },
  { w: 'entertain', common: '娱乐、招待 v.', senses: [
    { m: '心怀、抱有 v.', clue: '宾语是 doubt / hope / possibility', ex: 'entertain a doubt' }
  ], why: 'enter-（在…中）+ tain（保持）→「在心里保持一个想法」=抱有；在别人心里保持快乐=娱乐。' },
  { w: 'exploit', common: '剥削 v.', senses: [
    { m: '充分利用、开发 v.', clue: '宾语是资源、机会', ex: 'exploit natural resources' },
    { m: '功绩、壮举 n.', clue: 'the exploits of...' }
  ], why: 'ex-（出）+ ploit（折叠/展开）→「展开利用」。中性义是开发，贬义是剥削，褒义是功绩。' },
  { w: 'approach', common: '接近 v.', senses: [
    { m: '方法 n.', clue: 'an approach to sth', ex: 'a new approach to teaching' },
    { m: '处理、探讨 v.', clue: '宾语是问题/任务', ex: 'approach the problem' }
  ], why: 'ap-（向）+ proach（靠近）→「走向」。走向一个问题的路=方法，走向并处理=探讨。' },
  { w: 'attend', common: '出席 v.', senses: [
    { m: '照料、看护 v.', clue: 'attend to sb/sth', ex: 'attend to the patient' },
    { m: '伴随 v.', clue: 'attend sb' }
  ], why: 'at-（向）+ tend（伸展）→「把注意力伸向」。伸向会议=出席，伸向病人=照料。' },
  { w: 'attribute', common: '把…归于 v.', senses: [
    { m: '特征、属性 n.', clue: 'personal attributes', ex: 'attribute v. to n.' }
  ], why: 'at-（向）+ tribut（分配）→「把原因分配给某物」=归因；被分配到的东西=属性。' },
  { w: 'balance', common: '平衡 n./v.', senses: [
    { m: '余额 n.', clue: '银行、账户语境', ex: 'account balance' }
  ], why: '天平两端相等=平衡；账目两边相抵后剩下的=余额。' },
  { w: 'coin', common: '硬币 n.', senses: [
    { m: '创造（新词）v.', clue: '宾语是 term/phrase', ex: 'coin a new term' }
  ], why: '造硬币=造出新东西，引申为「造词」。' },
  { w: 'condition', common: '状况 n.', senses: [
    { m: '条件 n.', clue: 'on condition that...' },
    { m: '制约、决定 v.', clue: '宾语是 outcome/results', ex: 'conditioned by environment' }
  ], why: 'con-（共同）+ dic（说）→「一起说定」=约定条件；条件决定结果=制约。' },
  { w: 'count', common: '计算 v.', senses: [
    { m: '有价值、重要 v.', clue: 'it counts / count for', ex: 'Every point counts.' },
    { m: '认为 v.', clue: 'count sb as...' }
  ], why: '算得上的=重要的；算作=认为。' },
  { w: 'course', common: '课程 n.', senses: [
    { m: '过程、进程 n.', clue: 'in the course of', ex: 'in the course of the year' },
    { m: '一道菜 n.', clue: '餐厅语境' }
  ], why: 'course 来自拉丁 cursus「奔跑、路线」。跑的路线=进程，学习的路线=课程，上菜的路线=一道菜。' },
  { w: 'critical', common: '批判的 adj.', senses: [
    { m: '至关重要的 adj.', clue: 'critical role / importance', ex: 'play a critical role' },
    { m: '危急的 adj.', clue: 'critical condition（病危）' }
  ], why: 'crit 来自希腊 krinein「判断」。需要判断的=关键的；善于判断的=批判的；到判断关头=危急的。' },
  { w: 'deposit', common: '存款 n./v.', senses: [
    { m: '押金 n.', clue: '租房、预订语境' },
    { m: '沉淀物 n.', clue: '地质、化学语境' }
  ], why: 'de-（向下）+ posit（放）→「放下去」。钱放下去=存款，保证金放下去=押金，泥沙放下去=沉淀。' },
  { w: 'edge', common: '边缘 n.', senses: [
    { m: '优势 n.', clue: 'competitive edge', ex: 'have an edge over sb' }
  ], why: '站在边缘=占住有利位置→优势。' },
  { w: 'express', common: '表达 v.', senses: [
    { m: '快递的、明确的 adj.', clue: 'express delivery / express purpose' }
  ], why: 'ex-（向外）+ press（压）→「把意思压出来」=表达；把货物直接压送到=快递；说得明白=明确的。' },
  { w: 'establish', common: '建立 v.', senses: [
    { m: '证实、确定 v.', clue: '宾语是 fact / link', ex: 'establish the truth' }
  ], why: 'e-（使）+ stab（站）→「使站稳」。机构站稳=建立，事实站稳=证实。' },
  { w: 'explode', common: '爆炸 v.', senses: [
    { m: '迅速扩大、激增 v.', clue: '宾语/主语是 population / cost', ex: 'population exploded' }
  ], why: '爆炸=瞬间剧烈扩张，引申为数量激增。' },
  { w: 'faculty', common: '院系、全体教师 n.', senses: [
    { m: '能力、才能 n.', clue: 'a faculty for sth', ex: 'a faculty for languages' }
  ], why: 'faculty 来自拉丁 facultas「能力」（facere 做），「教师」是「有能力的人」的集体义。' },
  { w: 'foreign', common: '外国的 adj.', senses: [
    { m: '陌生的、不相干的 adj.', clue: 'foreign to sb', ex: 'The idea is foreign to me.' }
  ], why: '外面的=外国的；对自己而言是外面的=陌生的。' },
  { w: 'ground', common: '地面 n.', senses: [
    { m: '（复数）理由、根据 n.', clue: 'on the grounds that', ex: 'on the grounds of fairness' },
    { m: '场地 n.', clue: 'playground / camping ground' }
  ], why: '把论证「建立在地上」=根据。grounds 复数专指「依据」。' },
  { w: 'hit', common: '击、打 v.', senses: [
    { m: '风行一时的事物 n.', clue: 'a big hit', ex: 'The show was a big hit.' }
  ], why: '一击命中=大获成功→热门作品。' },
  { w: 'lead', common: '引导 v.', senses: [
    { m: '铅 n.', clue: '金属语境，发音不同 /led/' },
    { m: '线索 n.', clue: 'police lead' }
  ], why: '引导=lead（领导）；金属铅是另一个词，拼写相同但来源不同。线索是「引导破案的东西」。' },
  { w: 'mean', common: '意思是 v.', senses: [
    { m: '打算 v.', clue: 'mean to do', ex: 'I didn’t mean to hurt you.' },
    { m: '吝啬的 adj.', clue: 'be mean to sb' }
  ], why: '本义「意图、指向」，「意思是」是「指向某含义」，「打算」是「指向某行动」。' },
  { w: 'position', common: '位置 n.', senses: [
    { m: '观点、立场 n.', clue: 'take a position on', ex: 'his position on the issue' },
    { m: '职位 n.', clue: 'apply for a position' }
  ], why: 'pos（放）+ition→「被放置的地方」。物理位置=位置，观点上站的地点=立场，职场站的位置=职位。' },
  { w: 'reason', common: '原因 n.', senses: [
    { m: '推理、推断 v.', clue: 'reason that...', ex: 'He reasoned that...' }
  ], why: '原因=推理得出的结论；reason 作动词就是「讲道理、推理」。' },
  { w: 'save', common: '拯救、节约 v.', senses: [
    { m: '除…之外 prep.', clue: 'save for / save that（正式语体）' }
  ], why: 'save 的介词义来自法语 sauf「除了」，与动词「拯救」同形不同源。' },
  { w: 'school', common: '学校 n.', senses: [
    { m: '学派、流派 n.', clue: 'the Impressionist school' },
    { m: '（鱼、鲸）群 n.', clue: 'a school of whales' }
  ], why: '学校=一群人一起学；学派=一群人共享思想；鱼群=一群鱼。核心是「群」。' },
  { w: 'share', common: '分享 v.', senses: [
    { m: '股份 n.', clue: 'stock shares', ex: 'buy shares' }
  ], why: '分享=把东西分成份；股份=公司分成的份。' },
  { w: 'shoulder', common: '肩膀 n.', senses: [
    { m: '承担 v.', clue: 'shoulder the responsibility', ex: 'shoulder the burden' }
  ], why: '用肩膀扛→承担责任。' },
  { w: 'spell', common: '拼写 v.', senses: [
    { m: '招致 v.', clue: 'spell disaster for', ex: 'spell disaster for sb' },
    { m: '一段时间 n.', clue: 'a brief spell' },
    { m: '咒语 n.', clue: 'magic spell' }
  ], why: '三条线：拼写（按序说出字母）、一段时期（连续的一小段）、咒语（说出来的话有魔力）。' },
  { w: 'stand', common: '站立 v.', senses: [
    { m: '忍受 v.', clue: 'can’t stand', ex: 'I can’t stand the noise.' },
    { m: '观点、立场 n.', clue: 'take a stand' }
  ], why: 'sta「站」：站着不动=忍受，站的位置=立场。' },
  { w: 'stomach', common: '胃 n.', senses: [
    { m: '忍受 v.', clue: 'can’t stomach', ex: 'can’t stomach the idea' }
  ], why: '胃能「消化」某些事，引申为心理上能接受。' },
  { w: 'dismiss', common: '解雇 v.', senses: [
    { m: '不予考虑、摒弃 v.', clue: 'dismiss the idea / dismiss as', ex: 'dismiss the possibility' }
  ], why: 'dis-（离开）+ miss（送）→「送走」。把人送走=解雇，把想法送走=摒弃。' },
  { w: 'assume', common: '假定 v.', senses: [
    { m: '承担、就任 v.', clue: 'assume responsibility / office', ex: 'assume his new responsibilities' },
    { m: '呈现（样子）v.', clue: 'assume an air of...' }
  ], why: 'as-（向）+ sume（拿）→「拿过来」。拿过来当真=假定，拿过责任=承担，拿出某种姿态=呈现。' },
  { w: 'obscure', common: '模糊的 adj.', senses: [
    { m: '鲜为人知的 adj.', clue: 'an obscure writer' },
    { m: '使隐晦 v.', clue: 'obscure the truth' }
  ], why: 'ob-（覆盖）+ scur（暗）→「被盖住变暗」。看不清=模糊，没人知道=冷门，故意盖住=使隐晦。' },
  { w: 'exercise', common: '锻炼、练习 n./v.', senses: [
    { m: '行使、运用 v.', clue: 'exercise power / rights', ex: 'exercise the right to vote' }
  ], why: 'ex-（向外）+erc（限制、驱动）→「把力量使出来」。使身体=锻炼，使权利=行使。' },
  { w: 'sentence', common: '句子 n.', senses: [
    { m: '判决、宣判 n./v.', clue: '法律语境', ex: 'sentence sb to death' }
  ], why: '句子是「说完的一段话」，判决是「正式宣布的一句话」。' },
  { w: 'scale', common: '规模 n.', senses: [
    { m: '天平、刻度 n.', clue: 'on a scale of' },
    { m: '攀登 v.', clue: 'scale a cliff', ex: 'scale a 300m cliff' },
    { m: '缩减 v.', clue: 'scale down' }
  ], why: 'scale 本义「梯子」（拉丁 scala），爬梯子=攀登，梯子的等级=规模/刻度，沿梯子调整=缩放。' },
  { w: 'desperate', common: '绝望的 adj.', senses: [
    { m: '极度渴望的 adj.', clue: 'desperate for', ex: 'desperate for water' },
    { m: '孤注一掷的 adj.', clue: 'desperate measures' }
  ], why: 'de-（完全）+ sper（希望）→「没希望了」。没希望就绝望，也就极度渴望、不惜冒险。' },
  { w: 'plant', common: '植物 n.', senses: [
    { m: '工厂 n.', clue: 'a car plant', ex: 'a manufacturing plant' },
    { m: '种植 v.', clue: 'plant trees' }
  ], why: 'plant 的动词「种植」是本义；名词「植物」是种出来的东西；「工厂」是「种下设备的地方」的隐喻。' },
  { w: 'capital', common: '首都 n.', senses: [
    { m: '资本、资金 n.', clue: '经济语境', ex: 'venture capital' },
    { m: '大写字母 n.', clue: 'capital letter' },
    { m: '死刑的 adj.', clue: 'capital punishment' }
  ], why: 'cap「头」：国家的头=首都，钱的头本=资本，字母的头=大写，刑罚的头=死罪。一条「头」串起四义。' },
  { w: 'board', common: '木板 n.', senses: [
    { m: '董事会 n.', clue: 'board of directors' },
    { m: '寄宿 v.', clue: 'board at school' },
    { m: '上车/船/飞机 v.', clue: 'board a flight' }
  ], why: '木板→桌板→围桌开会的人=董事会；供桌板=膳食=寄宿；踏上甲板=登船。' },
  { w: 'weather', common: '天气 n.', senses: [
    { m: '经受住、平安度过 v.', clue: 'weather the storm', ex: 'weather the storm of recession' }
  ], why: '经受住风雨（本义的动词化），引申为度过难关。' },
  { w: 'credit', common: '信用 n.', senses: [
    { m: '学分 n.', clue: 'university context' },
    { m: '赞扬、功劳 n.', clue: 'give credit to', ex: 'give him credit' },
    { m: '（影视）片头字幕 n.', clue: 'credits' }
  ], why: 'cred「相信」：值得相信=信用，学习被认可=学分，功劳被认可=赞扬，制作人员被列名=字幕。' },
  { w: 'interest', common: '兴趣 n.', senses: [
    { m: '利益 n.', clue: 'public / personal interest', ex: 'in the public interest' },
    { m: '利息 n.', clue: 'interest rate', ex: 'The bank charges high interest.' }
  ], why: 'inter-（在…之间）+ est（是）→「和你有关」。与你有关=兴趣、利益；钱生的利益=利息。' },
  { w: 'novel', common: '小说 n.', senses: [
    { m: '新颖的 adj.', clue: '作定语：a novel solution', ex: 'a novel approach' }
  ], why: 'nov「新」（拉丁 novus）：小说=新的文体，新颖=新的。' },
  { w: 'minute', common: '分钟 n.', senses: [
    { m: '极小的、详细的 adj.', clue: 'minute detail，发音 /maɪˈnjuːt/', ex: 'every minute detail' },
    { m: '会议记录 n.', clue: 'the minutes（复数）' }
  ], why: 'min「小」：一分钟是时间的小单位，minute adj 是「小到细微」，会议记录是「逐细记下」。' },
  { w: 'market', common: '市场 n.', senses: [
    { m: '推销、营销 v.', clue: 'market a product', ex: 'market the new product' }
  ], why: '市场=买卖场所；把产品推向市场=营销。' },
  { w: 'project', common: '项目 n.', senses: [
    { m: '预计、预测 v.', clue: 'project a rise / growth', ex: 'project a 5% increase' },
    { m: '投射 v.', clue: 'project light onto' }
  ], why: 'pro-（向前）+ ject（扔）→「向前扔」：光向前扔=投射，数据向前推=预测，任务向前推=项目。' },
  { w: 'respect', common: '尊重 n./v.', senses: [
    { m: '方面 n.', clue: 'in many respects', ex: 'in many respects' },
    { m: '遵守 v.', clue: 'respect the rules' }
  ], why: 're-（回）+ spect（看）→「回头看」=重视。重视一个人=尊重，重视一条规则=遵守，看的一个角度=方面。' },
  { w: 'complex', common: '复杂的 adj.', senses: [
    { m: '综合体、建筑群 n.', clue: 'a shopping complex', ex: 'a vast new shopping complex' }
  ], why: 'complex 来自「编织在一起」：交织的=复杂的，交织的建筑=综合体。' },
  { w: 'fine', common: '好的 adj.', senses: [
    { m: '细微的 adj.', clue: 'fine distinction', ex: 'fine distinctions' },
    { m: '罚款 n./v.', clue: 'a parking fine' }
  ], why: 'fine「好的」来自「精炼的」→ 精细的；罚款是「了结、付清」的另一词源。' },
  { w: 'fashion', common: '时尚 n.', senses: [
    { m: '制作、形成 v.', clue: 'fashion sth from sth', ex: 'fashioned from wood' }
  ], why: 'fashion 来自拉丁 facere「做」：做出来的样式=时尚，做=形成。' },
  { w: 'harbour', common: '港湾 n.', senses: [
    { m: '怀有（想法）v.', clue: 'harbour doubts / grudge', ex: 'harbour some sort of grudge' }
  ], why: '港口是「藏船的地方」，心里藏着想法=怀有。' },
  { w: 'draw', common: '画 v.', senses: [
    { m: '吸引 v.', clue: 'draw attention', ex: 'draw sb’s eye' },
    { m: '取（钱）v.', clue: 'draw money from a bank', ex: 'draw $8,000 in cash' },
    { m: '打成平局 v.', clue: 'draw a game' }
  ], why: 'draw 本义「拖、拉」：拉过来=吸引，把钱拉出来=取款，拉平比分=平局，用笔拉出线=画。' },
  { w: 'compromise', common: '妥协 n./v.', senses: [
    { m: '危及、损害 v.', clue: 'compromise her reputation', ex: 'compromise her reputation' }
  ], why: 'com-（共同）+ promise（承诺）→「双方各让一步」=妥协；让掉原则=损害。' },
  { w: 'due', common: '到期的 adj.', senses: [
    { m: '适当的、应得的 adj.', clue: 'due care', ex: 'due care and attention' },
    { m: '由于 prep.', clue: 'due to' }
  ], why: 'due 来自「欠着的」：该付的=到期，该给的=应得，欠的原因=由于。' },
  { w: 'employ', common: '雇佣 v.', senses: [
    { m: '使用、运用 v.', clue: 'employ methods / techniques', ex: 'employ teaching methods' }
  ], why: 'em-（进入）+ ploy（折叠/使用）→「投入使用」。用于人=雇佣，用于方法=运用。' },
  { w: 'outstanding', common: '杰出的 adj.', senses: [
    { m: '未解决的 adj.', clue: 'outstanding issues', ex: 'some outstanding issues' }
  ], why: 'out「在外」+ standing「站着」：站出来=杰出，悬而未决地站在那里=未解决。' },
  { w: 'pool', common: '水塘 n.', senses: [
    { m: '集中、汇集 v.', clue: 'pool ideas / resources', ex: 'pool ideas and information' }
  ], why: '把资源倒进一个池子=汇集。' },
  { w: 'spring', common: '春天 n.', senses: [
    { m: '突然出现 v.', clue: 'spring into / spring up', ex: 'Tears sprang into her eyes.' },
    { m: '弹簧 n.', clue: '物理语境' }
  ], why: '春天=万物冒出来；冒出来=突然出现；能弹出来的=弹簧。' },
  { w: 'sound', common: '声音 n.', senses: [
    { m: '合理的、健康的 adj.', clue: 'sound advice / sound sleep', ex: 'sound advice' }
  ], why: 'sound「健全的」来自拉丁 sanus「健康」，与「声音」是同形异源。' },
  { w: 'term', common: '学期 n.', senses: [
    { m: '术语 n.', clue: 'the medical term' },
    { m: '（复数）关系 n.', clue: 'be on good terms with', ex: 'be on good terms with sb' }
  ], why: 'term 本义「界限、期限」：一段时间=学期，限定意义的说法=术语，相处的界限=关系。' },
  { w: 'wage', common: '工资 n.', senses: [
    { m: '发动（战争）v.', clue: 'wage war on', ex: 'wage war on drug pushers' }
  ], why: 'wage 作动词是「进行、发动」，来自「以…为赌注」；作名词「工资」是另一条线。' },
  { w: 'wind', common: '风 n.', senses: [
    { m: '蜿蜒 v.', clue: 'wind its way', ex: 'wind its way along the coast', 发音: '/waɪnd/' }
  ], why: 'wind 作动词「缠绕」与名词「风」同形异源；蜿蜒=像绳子一样绕。' },
  { w: 'well', common: '好 adv.', senses: [
    { m: '井 n.', clue: 'a deep well' },
    { m: '涌出 v.', clue: 'well up', ex: 'tears well up in my eyes' }
  ], why: '井里水涌上来=well up；「好」是另一词源。' }
];

/* 汇总到全局 */
window.LE_DETAIL = { ROOT_ETYMOLOGY, METHOD_STEPS, POLYSEMY };
