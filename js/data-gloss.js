/* ============================================================
   拆解词素释义表：前缀 / 后缀 / 词根变体的「常见意思」
   目标：单词拆解里出现的每一个色块都带中文含义，不留下裸拼写。

   释义依据（联网核对，见 report.md「词素释义来源」）：
   - Online Etymology Dictionary (etymonline.com)：-mony / -orium / -ment / -acious / perennial
   - affixes.org / linguisticsgirl / Hull AWE：-acious / -acity / -acle / -icle 系列
   - Dictionary.com / Collins：-ics / -ist / -logy / -nomy
   - LearnEnglishSounds / WVCED《Morphology Matters》：拉丁前缀辅音同化表
   - Grammarist / Wiktionary：ante- 与 anti- 的区分
   - 新都网《词根词缀记忆法》：常用前缀义项
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 前缀：按「同化组」组织，组内常见义一致 ---------- */
  const PREFIX_GROUPS = [
    { f: ['a-'], m: '无 / 不；在…状态', n: '两个来源：希腊 a-/an- 表否定（amoral 非道德的）；古英语 a- 表「在…之中」（asleep 睡着的）。看到时先判断是哪一支。' },
    { f: ['abs-', 'apo-'], m: '离开，远离', n: 'abs- 是拉丁 ab-「离开」在 s/t 前的变体；apo- 是希腊 apo-「从…离开」。' },
    { f: ['ad-', 'ac-', 'af-', 'ap-', 'as-', 'at-'], m: '朝向，附加；加强语气', n: '拉丁 ad-「to, toward」。后接同辅音时被同化：ac-(c) / af-(f) / ap-(p) / as-(s) / at-(t)。长相变，意思不变。' },
    { f: ['ob-', 'oc-', 'of-'], m: '朝向；对着；反对；在…上', n: '拉丁 ob-。在 c/f/p 前同化为 oc-/of-/op-。obtain「拿到手」、object「对着扔→反对」、obvious「挡在路上的→明显的」。' },
    { f: ['in-', 'im-', 'em-'], m: '向内，进入；不，否定', n: '拉丁 in- 有两个互不相关的意思，是四六级最大陷阱。判断法：去掉后剩下完整词多为「否定」（incorrect），否则多为「向内」（import）。在 b/m/p 前同化为 im-，经法语变成 em-/en-。' },
    { f: ['con-', 'com-'], m: '共同，一起；加强（完全）', n: '拉丁 cum「with」。在 b/m/p/l/r 前变 com-/col-/cor-；作强调时译「完全」（confirm 完全确认）。' },
    { f: ['sym-', 'syn-'], m: '共同，一起', n: '希腊 syn-「with」；在 b/m/p 前变 sym-（symbol, sympathy, symphony）。与拉丁 con- 同义不同源。' },
    { f: ['sub-', 'suc-', 'suf-', 'sup-', 'sus-'], m: '在…下面；次一级；从下往上', n: '拉丁 sub-。在 c/f/p/t 前同化为 suc-/suf-/sup-/sus-；在 g 前变 sug-，在 r 前变 sur-。意思永远是「下面」。' },
    { f: ['super-'], m: '在…上面；超过，超级', n: '拉丁 super-「above, over」。' },
    { f: ['sur-'], m: '在上，超过；从下（sub- 变体）', n: '两源要分清：① super- 的法语形式，表「超过 / 在上面」（surface, surpass）；② sub- 在 r 前同化，表「从下」（surreptitious）。按词义反推。' },
    { f: ['ex-', 'e-', 'ef-'], m: '向外，出；彻底；前任', n: '拉丁/希腊 ex-「out of」。在 f 前同化为 ef-（effect, effort），部分词省作 e-（eject）。另有「前任」义（ex-president）。' },
    { f: ['dis-', 'dif-'], m: '不，否定；分开，离开', n: '拉丁 dis-「apart, away, not」。在 f 前同化为 dif-（differ, difficult）。' },
    { f: ['di-'], m: '二，双；分开，离开', n: '希腊 di-「二」（dioxide）；也可能是 dis- 的简化形（divide, diverge）。按词判断。' },
    { f: ['de-'], m: '向下；去除；否定；彻底', n: '拉丁 de-「down, away, off」。decrease 下降、decode 解码、destroy 彻底毁坏、deny 否定，都从「往下 / 拿掉」延伸。' },
    { f: ['re-'], m: '回，向后；再，重新', n: '最高频前缀之一，两个意思都要记：return 回、review 再看一遍。' },
    { f: ['retro-'], m: '向后，回顾', n: '拉丁 retro-「backward」。retrospect 回顾、retrograde 倒退。' },
    { f: ['pre-'], m: '在…之前，预先', n: '拉丁 prae-「before」，表时间或顺序在前。' },
    { f: ['pro-'], m: '向前；赞同；代替；预先', n: '拉丁/希腊 pro-。progress 前进、pro-American 亲美、pronoun 代替名词、prospect 向前看。' },
    { f: ['per-'], m: '贯穿，完全；通过', n: '拉丁 per-「through」。perfect 做透、perspective 看穿、permit 放行。' },
    { f: ['trans-'], m: '跨越，转变；穿过', n: '拉丁 trans-「across」。transport 跨地运、transform 变形、transparent 透光。' },
    { f: ['inter-'], m: '在…之间，相互', n: '拉丁 inter-「between / among」。international, interact。' },
    { f: ['intro-'], m: '向内，在内', n: '拉丁 intro-「inward」，与 intra-「内部」相近。introduce 引进去、introspect 内省。' },
    { f: ['para-'], m: '旁边；辅助；类似；防', n: '希腊 para-「beside」。parallel 并排、paramedic 辅助医护、parasol 挡太阳。' },
    { f: ['cata-'], m: '向下；彻底，按照', n: '希腊 kata-「down」。catalogue 逐条列下、catastrophe 急转直下、catalyst。' },
    { f: ['dia-'], m: '穿过，贯通；两者之间', n: '希腊 dia-「through / across」。dialogue 两人的话穿过、diameter 穿圆心的线、diagnosis 看透病情。' },
    { f: ['ana-'], m: '向上；回，再；分开，贯穿', n: '希腊 ana-「up / back / again / apart」。analysis 拆开来看、anatomy 切开来看。' },
    { f: ['anti-'], m: '反对，对抗；相反', n: '希腊 anti-「against」（antiwar, antibody）。重要特例：anticipate 里的 anti- 其实是拉丁 ante-「在前」的旧拼法，OED 明确列为 ante-/anti- 混写的历史遗留，不能当成 anti- 的常见义去套其他词。' },
    { f: ['contra-'], m: '相反，反对', n: '拉丁 contra-「against」。contrast 对照、contradict 说反话。' },
    { f: ['auto-'], m: '自己，自动', n: '希腊 autos「self」。automatic, autobiography。' },
    { f: ['bene-'], m: '好，善', n: '拉丁 bene「well」。benefit 好处、benevolent 好心的；反义是 mal-「坏」。' },
    { f: ['bi-'], m: '二，双', n: '拉丁 bi-「two」。bicycle, bilingual；注意 biannual 每年两次 vs biennial 每两年一次。' },
    { f: ['uni-'], m: '一，单一', n: '拉丁 unus「one」。uniform 同一形式、unique 独一无二。' },
    { f: ['tele-'], m: '远距离', n: '希腊 tele「far off」。telephone, telescope, television。' },
    { f: ['equi-'], m: '相等，均等', n: '来自拉丁 aequus「equal」，严格说是词根，不是原生前缀。equivalent 等值的、equilibrium 平衡。' },
    { f: ['art-'], m: '技巧，技艺', n: '拉丁 ars / art-「skill」，本身是词根。artificial 靠技巧做出来的、artifact 人工制品。' },
    { f: ['bio-'], m: '生命', n: '希腊 bios「life」，本身是词根。biology 生命之学、biography 生平记录。' },
    { f: ['eco-'], m: '家 / 生态；经济', n: '希腊 oikos「house 家」。economy 本义「治家 / 管家」，ecology「关于家的学问」。两支同源，别只记「生态」。' },
    { f: ['geo-'], m: '地，地球', n: '希腊 ge「earth」，本身是词根。geography, geology, geometry（测地）。' },
    { f: ['hydro-'], m: '水', n: '希腊 hydor「water」，本身是词根。hydrogen 生成水的、hydroelectric 水电。' },
    { f: ['photo-'], m: '光', n: '希腊 phos / phot-「light」，本身是词根。photograph 用光记录、photosynthesis 光合。' },
    { f: ['psycho-'], m: '心理，灵魂', n: '希腊 psyche「soul / mind」，本身是词根。psychology 心灵之学。' },
    { f: ['techn-'], m: '技艺，技术', n: '希腊 techne「art / craft」，本身是词根。technology 技艺之学、technical。' },
    { f: ['ver-'], m: '真实', n: '拉丁 verus「true」，本身是词根。verify 使成真、verdict 说出真相。' },
    { f: ['manu-', 'main-'], m: '手', n: '拉丁 manus「hand」，本身是词根；main- 是它经法语后的形式（maintain 用手维持）。manuscript 手写稿、manufacture 手工做。' },
    { f: ['pass'], m: '通过，走过', n: '拉丁 passus「step / passage」，本身是词根。passport = 让你通过港口的证件；这里不是前缀。' },
    { f: ['pos-'], m: '能，掌握（potis / posse）', n: 'possess 来自拉丁 possidere = potis「能、有权」+ sedere「坐」，本义「坐拥 / 有权占有」，不是「向前」。同族的 possible、potential 都是「能」。' }
  ];

  /* ---------- 后缀：每条都给常见义 + 词性 + 说明 ---------- */
  /* 格式：[形式, 常见意思, 词性/功能, 说明] */
  const SUFFIX_ENTRIES = [
    ['-able', '可…的，能…的', '形容词', '拉丁 -abilis，接动词表「能被…的」。'],
    ['-ible', '可…的，能…的', '形容词', '-able 的异形，多接拉丁过去分词词干（visible, flexible）。'],
    ['-abulary', '词尾拼合（非独立后缀）', '名词', 'vocabulary = voc(叫 / 词) + -able + -ary，整体表「词语的集合」，应拆成 -able + -ary 理解。'],
    ['-acious', '有…倾向的，充满…的', '形容词', '拉丁 -ax/-acis + -ous，表动作强度；对应名词是 -acity（audacious → audacity）。'],
    ['-acity', '…的性质 / 状态', '名词', '与 -acious 配对的抽象名词后缀。'],
    ['-acle', '器具；具有某种功能的事物', '名词', '拉丁 -aculum（工具 / 结果）。spectacle 供看的景象、miracle 令人惊叹之事、obstacle 挡在前面的东西。'],
    ['-al', '…的；动作 / 结果', '形容词 / 名词', '拉丁 -alis：形容词「…的」（natural），接动词可成名词（arrival 到达）。'],
    ['-ality', '…的性质', '名词', '-al + -ity 复合。'],
    ['-als', '…的（复数 / 名词化）', '名词', '-al + -s 的复数或名词化形式。'],
    ['-amin', '词尾拼合（非独立后缀）', '名词', 'vitamin = vit(生命) + amine(胺)，不是 -amin 后缀。'],
    ['-ance', '动作、性质、状态', '名词', '拉丁 -antia；-ence 是它的异形，两者义同。'],
    ['-andum', '应被…的事（被动将来）', '名词', '拉丁动名词 -andum；agenda「待办之事」、memorandum「须记住之事」同源。'],
    ['-ant', '…的；做…的人 / 物', '形容词 / 名词', '拉丁 -ans/-antis；-ent 是异形。important、assistant。'],
    ['-ate', '使…；具有…的', '动词 / 形容词', '拉丁 -atus。动词读 /eɪt/（create），形容词 / 名词读 /ət/（private）。'],
    ['-atile', '能…的，倾向于…的', '形容词', '拉丁 -atilis；versatile「可转向的 → 多才多艺的」。'],
    ['-ation', '动作、过程、结果', '名词', '-ate + -ion 复合，最高频名词后缀之一。'],
    ['-ator', '做…的人 / 器具', '名词', '-ate + -or，表施动者或工具（spectator, generator）。'],
    ['-ctuate', '词尾拼合（非独立后缀）', '动词', 'fluctuate = flu(流) + -ct + -ate，按 -ate「使…」理解。'],
    ['-date', '词尾拼合（非独立后缀）', '动词', 'mandate = man(手) + dare(给) + -ate，按 -ate 理解。'],
    ['-der', '词尾拼合（非独立后缀）', '名词', 'gender = gen(种族 / 出生) + 拉丁派生词尾，不是独立后缀。'],
    ['-ement', '动作、结果', '名词', '-ment 加连接元音 -e-。'],
    ['-ence', '动作、性质、状态', '名词', '-ance 的异形（difference, patience）。'],
    ['-ency', '…的性质 / 状态', '名词', '-ent + -y 复合（frequency, efficiency）。'],
    ['-ennial', '…年的；每隔…年', '形容词', 'enn(年，拉丁 annus) + -ial。perennial 贯穿全年、biennial 两年一次；ann 在复合词里元音变为 enn。'],
    ['-ent', '…的；做…的人 / 物', '形容词 / 名词', '-ant 的异形（different, student）。'],
    ['-ential', '…的', '形容词', '-ence / -ent + -ial 复合（essential, potential）。'],
    ['-entific', '词尾拼合（非独立后缀）', '形容词', 'scientific = science + -ic，按 -ic「…的」理解。'],
    ['-entist', '词尾拼合（非独立后缀）', '名词', 'scientist = science + -ist，按 -ist「从事…的人」理解。'],
    ['-eo', '词尾拼合（非独立后缀）', '—', '多为拉丁词干元音与 -us/-um 连写，不是独立后缀。'],
    ['-er', '做…的人 / 器具；比较级', '名词', '日耳曼 -er，最高频施事后缀（teacher, player）；也表比较级。'],
    ['-eral', '…的', '形容词', '-al 加词干元音；general = gen(种族) + -al「整个族群的 → 普遍的」。'],
    ['-erate', '使…，做…', '动词', '-ate 动词后缀加词干元音（generate, operate）。'],
    ['-erator', '做…的人 / 器具', '名词', '-ate + -or（generator 发电机 / 产生者）。'],
    ['-erous', '产生…的，充满…的', '形容词', '-er + -ous 复合。'],
    ['-etic', '…的，与…有关的', '形容词', '希腊 -etikos，与 -ic 同源（energetic, genetic）。'],
    ['-fest', '词尾拼合（非独立后缀）', '—', 'manifest = man(手) + festus(可抓住的 / 明显的)，此处不是后缀。'],
    ['-ial', '…的', '形容词', '-al 加连接元音 -i-（official, partial）。'],
    ['-iate', '使…，做…', '动词', '-ate 动词后缀加连接元音 -i-（appreciate, associate）。'],
    ['-iation', '动作、过程、结果', '名词', '-iate + -ion（appreciation）。'],
    ['-ibility', '可…性', '名词', '-ible + -ity（flexibility）。'],
    ['-ic', '…的，与…有关的', '形容词', '希腊 -ikos / 拉丁 -icus。'],
    ['-ical', '…的', '形容词', '-ic + -al；常与 -ic 成对且语义有差（historic 有历史意义的 / historical 与历史有关的）。'],
    ['-icle', '小…；小器具', '名词', '拉丁指小 -iculus/-cula（particle 微粒, article 小关节）。'],
    ['-ics', '…学；某领域的知识 / 实践', '名词', '希腊 -ika 中性复数（physics, economics, politics）。作学科名时谓语用单数。'],
    ['-iculum', '小…；小工具 / 场所', '名词', '拉丁指小 / 工具后缀 -iculum（curriculum 原义「跑道 / 课程」）。'],
    ['-id', '…的，倾向于…的', '形容词', '拉丁 -idus（rapid, valid）。'],
    ['-ience', '…的性质 / 状态', '名词', '-ient + -ce（experience, patience）。'],
    ['-ient', '…的；做…的人', '形容词 / 名词', '-ent 加连接元音 -i-（efficient, recipient）。'],
    ['-iety', '…的性质 / 状态', '名词', '-ity 的异形（variety, society, propriety）。'],
    ['-ile', '能…的，属于…的', '形容词', '拉丁 -ilis；与 -able 部分重叠（flexile, fertile）。'],
    ['-ility', '…的性质 / 状态', '名词', '-ile / -able + -ity（ability, stability）。'],
    ['-imen', '结果、物；供…之用的东西', '名词', '拉丁 -imen；specimen「拿来给你看的东西 = 标本」。'],
    ['-iment', '动作、结果、手段', '名词', '-ment 加连接元音 -i-（experiment, monument）。'],
    ['-imental', '…的', '形容词', '-iment + -al（experimental）。'],
    ['-iology', '…学', '名词', '-io- + -logy，与 -ology 同义（physiology）。'],
    ['-ion', '动作、状态、结果', '名词', '拉丁 -io/-ionis，最常见名词后缀。'],
    ['-ionary', '与…有关的（人 / 物）', '形容词 / 名词', '-ion + -ary（diction / dictionary）。'],
    ['-ious', '具有…的', '形容词', '-ous 加连接元音 -i-（curious, various）。'],
    ['-ism', '主义、学说、行为特征', '名词', '希腊 -ismos（tourism, criticism）。'],
    ['-ist', '…主义者；从事…的人', '名词', '希腊 -istes（scientist, economist）。'],
    ['-istic', '…主义的，…的', '形容词', '-ist + -ic（realistic）。'],
    ['-ition', '动作、过程、结果', '名词', '-it(过去分词词干) + -ion（composition, definition）。'],
    ['-itive', '有…倾向的', '形容词', '-it + -ive（competitive, sensitive）。'],
    ['-itor', '做…的人 / 器具', '名词', '-it + -or（competitor, editor）。'],
    ['-itorium', '做…的场所', '名词', '拉丁 -torium/-orium 表「场所 / 工具」；auditorium「听的地方 = 礼堂」。'],
    ['-ius', '拉丁词尾（非独立后缀）', '名词 / 形容词', '拉丁 -ius 表「属于…」，英语里不产新词。'],
    ['-ive', '有…倾向的', '形容词', '拉丁 -ivus（active, perspective）。'],
    ['-iversary', '词尾拼合（非独立后缀）', '名词', 'anniversary = ann(年) + vers(转) + -ary，本义「年份转回来的那一天」。'],
    ['-ize', '使…化，变成…', '动词', '希腊 -izein（modernize, realize）。'],
    ['-le', '小…；工具 / 反复动作', '名词 / 动词', '拉丁 -ulus/-ula 弱化而来；也表反复动作（sparkle）。'],
    ['-lish', '词尾拼合（非独立后缀）', '动词', 'establish = e- + stab(站) + 古法语动词词尾，按「使站稳 → 建立」理解。'],
    ['-logy', '…学，…论', '名词', '希腊 logos「言说 / 学问」（biology, technology）。'],
    ['-nant', '…的；做…的人', '形容词 / 名词', '-ant 加词干 n（dominant, prominent）。'],
    ['-ner', '词尾拼合（非独立后缀）', '名词', '词根 + -er 的拼合，按 -er「人 / 物」理解。'],
    ['-nomy', '…法则 / 管理；学科', '名词', '希腊 nomos「法则」。economy「治家之法」、astronomy「星体运行规律」。'],
    ['-ological', '…学的', '形容词', '-ology + -ical（ecological）。'],
    ['-ology', '…学', '名词', '-o- + -logy（ecology, psychology）。'],
    ['-or', '做…的人 / 器具', '名词', '拉丁 -or，与 -er 同义（professor, tractor）。'],
    ['-ory', '与…有关的；…的场所', '形容词 / 名词', '拉丁 -orius/-orium；中性名词化后表「场所」（laboratory, dormitory）。'],
    ['-ous', '具有…的，充满…的', '形容词', '拉丁 -osus（famous, dangerous）。'],
    ['-script', '词根「写」（非后缀）', '名词', 'manuscript = manu(手) + scrib/script(写)，此处是词根，不是后缀。'],
    ['-tion', '动作、状态、结果', '名词', '-ion 接 -t 词干的最常见形式（attention, information）。'],
    ['-tive', '有…倾向的', '形容词', '-t + -ive（active, effective）。'],
    ['-ture', '动作、结果', '名词', '拉丁 -tura，与 -ure 同源（culture, structure）。'],
    ['-ual', '…的', '形容词', '-al 加连接元音 -u-（actual, annual, visual）。'],
    ['-uine', '词尾拼合（非独立后缀）', '—', 'genuine 等为拉丁词干 + -us 的变形，不是独立后缀。'],
    ['-uity', '…的性质 / 状态', '名词', '-ity 加连接元音 -u-（continuity, ambiguity）。'],
    ['-ulate', '使…，做…', '动词', '-ate 动词后缀加 -ul- 词干（calculate, regulate）。'],
    ['-ulous', '有…倾向的，多…的', '形容词', '拉丁 -ulosus（fabulous, meticulous）。'],
    ['-uous', '有…倾向的，充满…的', '形容词', '拉丁 -uus + -ous（conspicuous 完全看得见 → 显眼）。'],
    ['-ural', '…的', '形容词', '-al 加连接元音（natural, cultural）。'],
    ['-ure', '动作、结果、状态', '名词', '拉丁 -ura（pressure, failure, exposure）。'],
    ['-us', '拉丁名词 / 形容词词尾', '名词 / 形容词', '表「属于…、具有…」，英语里不是活后缀。'],
    ['-visual', '独立词「视觉的」（非后缀）', '—', 'audiovisual = audio(听) + visual(看)，此处是独立词。'],
    ['-y', '…的；…的状态 / 结果', '形容词 / 名词', '多义后缀：形容词「有…的」（rainy），名词「性质 / 结果」（discovery, difficulty）。'],
    ['system', '独立词「系统」（非后缀）', '名词', 'ecosystem = eco(生态) + system(系统)，此处是独立词。']
  ];

  /* ---------- 词根：由主词库自动生成，再补少数手写变体 ---------- */
  const ROOTS = {};
  const families = (window.LE_DATA && window.LE_DATA.ROOT_FAMILIES) || [];
  families.forEach(f => {
    const forms = new Set([
      f.root,
      ...(f.variants || []),
      ...String(f.root).split('/')
    ]);
    forms.forEach(v => {
      const key = String(v).trim().toLowerCase();
      if (key) ROOTS[key] = { m: f.meaning, n: `词根家族 ${f.root}；${f.hook || ''}`.trim(), id: f.id };
    });
  });
  /* 拆解里出现、但没列进 variants 的变体 */
  const EXTRA_ROOTS = {
    'cept': { m: '拿，抓', n: 'cap / cep / cip / ceive 同族，都来自拉丁 capere「拿」。', id: 'cap' },
    'stag': { m: '站，立', n: 'sta / stat / stab / stag 同族，来自拉丁 stare「站」。', id: 'sta' },
    'posit': { m: '放，置', n: 'pon / pos / posit 同族，来自拉丁 ponere「放」。', id: 'pose' },
    'flu': { m: '流', n: 'flu / flux / fluct 同族，来自拉丁 fluere「流」。', id: 'flu' },
    'cur': { m: '跑，流动', n: 'cur / curs / cours 同族，来自拉丁 currere「跑」。', id: 'cur' }
  };
  Object.entries(EXTRA_ROOTS).forEach(([k, v]) => { if (!ROOTS[k]) ROOTS[k] = v; });

  const PREFIXES = {}, SUFFIXES = {};
  PREFIX_GROUPS.forEach(g => g.f.forEach(form => {
    PREFIXES[form] = { m: g.m, n: g.n || '', group: g.f[0] };
  }));
  SUFFIX_ENTRIES.forEach(([form, m, pos, n]) => {
    SUFFIXES[form] = { m, pos: pos || '', n: n || '' };
  });

  window.LE_GLOSS = {
    PREFIXES, SUFFIXES, ROOTS,
    PREFIX_GROUPS, SUFFIX_ENTRIES,
    SOURCES: [
      { name: 'Online Etymology Dictionary', url: 'https://www.etymonline.com/', use: '-mony / -orium / -ment / -acious / perennial 等后缀与词源' },
      { name: 'Affixes.org', url: 'https://affixes.org/', use: '-acious / -acity 释义与例词' },
      { name: 'Linguistics Girl Morphodex', url: 'https://linguisticsgirl.com/morphodex/suffix-acule', use: '-acle / -iculum 指小与工具后缀' },
      { name: 'A Hull AWE -cule / -acle', url: 'http://hull-awe.org.uk/', use: '-acle / -icle 拉丁指小后缀例词表' },
      { name: 'Dictionary.com / Collins', url: 'https://www.dictionary.com/browse/ics', use: '-ics / -ist 定义' },
      { name: 'LearnEnglishSounds', url: 'https://www.learnenglishsounds.com/en/blog/latin-prefix-assimilation-double-letters-accept-approve-rule', use: '拉丁前缀辅音同化对照表（ad-/con-/in-/sub-/ob-/dis-/ex-）' },
      { name: 'WVCED《Morphology Matters》', url: 'https://www.wvced.com/wp-content/uploads/2022/03/Morphology-Matters-April-2019.pdf', use: '同化前缀规则与后缀词性判定' },
      { name: 'Grammarist / Wiktionary', url: 'https://grammarist.com/prefix/ante-vs-anti/', use: 'ante-（在前）与 anti-（反对）的区分' },
      { name: '新都网《词根词缀记忆法》', url: 'http://edu.newdu.com/328643.html', use: '常用前缀义项中文对照' }
    ]
  };
})();
