/* ============================================================
   lean-english 应用逻辑
   纯原生 ES Module + Bootstrap 6 alpha，零构建步骤。
   ============================================================ */

const D = window.LE_DATA;
const { ROOT_FAMILIES, PREFIXES, SUFFIXES, THEMES, CONFUSABLES, METHODS, REVIEW_STEPS, ALL_WORDS } = D;
const DETAIL = window.LE_DETAIL || { ROOT_ETYMOLOGY: {}, METHOD_STEPS: {}, POLYSEMY: [] };
const { ROOT_ETYMOLOGY, METHOD_STEPS, POLYSEMY } = DETAIL;
const GLOSS = window.LE_GLOSS || { PREFIXES: {}, SUFFIXES: {}, ROOTS: {}, PREFIX_GROUPS: [], SUFFIX_ENTRIES: [], SOURCES: [] };

/* 单词 → 多义条目索引，便于在任何视图里按词查义 */
const POLYSEMY_MAP = new Map(POLYSEMY.map(p => [p.w, p]));

const SRS_KEY = 'lean_english_srs_v1';
const THEME_KEY = 'lean_english_theme';
const MASTER_STAGE = 5; // 达到 4 天间隔即视为已掌握

/* ---------- 本地状态 ---------- */
const state = {
  view: 'home',
  filter: 'all',
  search: '',
  selectedFamily: null,
  glossQuery: '',
  showAnswers: false,
  reviewQueue: [],
  reviewIndex: 0,
  reviewSessionCount: 0,
  quiz: null,
  srs: loadSRS()
};

/* ---------- 工具函数 ---------- */
function loadSRS() {
  try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; }
  catch { return {}; }
}
function saveSRS() {
  try { localStorage.setItem(SRS_KEY, JSON.stringify(state.srs)); }
  catch { toast('浏览器存储不可用，本次进度仅在当前页面有效'); }
  updateStats();
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

/* ---------- 词性缩写 → 中文对照 ---------- */
const POS_CN = {
  'n.': '名词', 'v.': '动词', 'vt.': '及物动词', 'vi.': '不及物动词',
  'adj.': '形容词', 'adv.': '副词', 'prep.': '介词', 'conj.': '连词',
  'pron.': '代词', 'num.': '数词', 'art.': '冠词', 'int.': '感叹词',
  'aux.': '助动词', 'phr.': '短语'
};
const POS_RE = /\b(?:n|v|vt|vi|adj|adv|prep|conj|pron|num|art|int|aux|phr)\./g;
function posKey(raw) {
  const s = String(raw ?? '').trim();
  return s ? (s.endsWith('.') ? s : s + '.') : '';
}
/* 独立词性字段：n./adj. → [n. 名词][adj. 形容词] */
function posChips(raw) {
  if (!raw) return '';
  return String(raw).split(/[\/、,，\s]+/).map(posKey).filter(Boolean)
    .map(k => `<span class="pos-chip">${esc(k)}<em>${esc(POS_CN[k] || '')}</em></span>`).join('');
}
/* 混在中文义项里的词性缩写：地址 n. → 地址 [n. 名词] */
function posText(raw) {
  return esc(raw).replace(POS_RE, m => `<span class="pos-inline">${m} ${esc(POS_CN[m] || '')}</span>`);
}

/* ---------- 拆解词素：每个色块都带「常见意思」 ---------- */
function glossSplit(raw) {
  const parts = String(raw ?? '').trim().split(/\s+/).filter(Boolean);
  return { form: parts[0] || '', inline: parts.slice(1).join(' ') };
}
function inferPrefix(form) {
  const hit = PREFIXES.find(p => p.p === form || p.p.startsWith(form));
  if (hit) return { m: hit.meaning, n: hit.note || '' };
  return { m: '见词缀速查表', n: '该形式未单独收录，请按词缀速查表的同化组查找。' };
}
function inferSuffix(form) {
  const hit = SUFFIXES.find(s => s.s.split(/[\s/]/)[0] === form);
  if (hit) return { m: `${hit.pos} · ${hit.meaning}`, n: hit.note || '' };
  const rules = [
    [/(tion|sion|ation|ition|ion)$/, '名词 · 动作 / 状态 / 结果'],
    [/(ability|ibility|ility|acity|iety|uity|ality|ity|ency|ancy|ence|ance)$/, '名词 · 性质 / 状态'],
    [/(able|ible|ile)$/, '形容词 · 可…的 / 能…的'],
    [/(ically|ical|ic|ial|ual|ural|al)$/, '形容词 · …的'],
    [/(ous|ious|eous|uous|ulous|acious|ive|tive|itive|ant|ent|id|etic)$/, '形容词 · 具有 / 倾向于…'],
    [/(ize|ise|ify|ate|iate|ulate|erate)$/, '动词 · 使…化 / 做…'],
    [/(ator|itor|or|er|ist)$/, '名词 · 做…的人 / 器具'],
    [/(ism|ics|ology|logy|nomy|y)$/, '名词 · 学科 / 主义 / 状态']
  ];
  for (const [re, m] of rules) if (re.test(form)) return { m, n: '按同族后缀推断的常见义，可在词缀速查表核对。' };
  return { m: '词尾（需结合词源判断）', n: '该词尾不是能产的独立后缀。' };
}
function glossPrefix(raw) {
  const { form, inline } = glossSplit(raw);
  const g = GLOSS.PREFIXES[form] || inferPrefix(form);
  return { form, common: g.m, note: g.n || '', inline };
}
function glossSuffix(raw) {
  const { form, inline } = glossSplit(raw);
  const g = GLOSS.SUFFIXES[form] || inferSuffix(form);
  return { form, common: g.m, note: g.n || '', inline };
}
function glossRoot(raw, family) {
  const form = String(raw || (family && family.root) || '').trim();
  const g = GLOSS.ROOTS[form.toLowerCase()] || {
    m: (family && family.meaning) || '见词根家族', n: ''
  };
  return { form, common: g.m, note: g.n || '', inline: '' };
}
function glossChip(kind, gl) {
  const showHere = gl.inline && !gl.common.includes(gl.inline);
  const tip = ['常见义：' + gl.common, gl.inline ? '此处：' + gl.inline : '', gl.note]
    .filter(Boolean).join(' ｜ ');
  return `<span class="chip chip-${kind} gloss-chip" title="${esc(tip)}"><b class="gloss-form">${esc(gl.form)}</b><em class="gloss-mean">${esc(gl.common)}</em>${showHere ? `<i class="gloss-here">此处：${esc(gl.inline)}</i>` : ''}</span>`;
}

let toastHost;
function toast(msg) {
  if (!toastHost) toastHost = $('#toastHost');
  const el = document.createElement('div');
  el.className = 'app-toast';
  el.textContent = msg;
  toastHost.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function speak(word) {
  try {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = .9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { toast('当前浏览器不支持语音朗读'); }
}

function isMastered(word) {
  return (state.srs[word]?.stage ?? -1) >= MASTER_STAGE;
}
function dueWords() {
  const now = Date.now();
  return Object.entries(state.srs)
    .filter(([, v]) => v.due <= now)
    .map(([w, v]) => ({ w, ...v }))
    .sort((a, b) => a.due - b.due);
}
function wordInfo(word) {
  return ALL_WORDS.find(x => x.w === word) || null;
}

/* ---------- 顶部统计 ---------- */
function updateStats() {
  const learned = Object.values(state.srs).filter(v => v.stage >= MASTER_STAGE).length;
  const due = dueWords().length;
  const badge = $('#dueBadge');
  if (badge) badge.textContent = due;
  const sl = $('#sideLearned');
  if (sl) sl.textContent = learned;
  const st = $('#sideTotal');
  if (st) st.textContent = ALL_WORDS.length;
}

/* ---------- 导航 ---------- */
function setView(view) {
  state.view = view;
  $$('#mainNav .nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  $$('.view').forEach(v => v.classList.add('d-none'));
  const target = $(`#view-${view}`);
  if (target) target.classList.remove('d-none');
  const renderers = {
    home: renderHome, roots: renderRoots, affixes: renderAffixes,
    themes: renderThemes, confuse: renderConfuse, review: renderReview,
    quiz: renderQuiz, methods: renderMethods,
    etymology: renderEtymology, polysemy: renderPolysemy
  };
  renderers[view]?.();
  updateStats();
  window.scrollTo?.({ top: 0, behavior: 'smooth' });
}
function pageHead(title, desc) {
  return `<div class="page-head"><h1 class="page-title">${title}</h1><p class="page-desc">${desc}</p></div>`;
}
function empty(text) {
  return `<div class="empty-state"><i class="bi bi-inbox"></i>${text}</div>`;
}

/* ============================================================
   视图 1：总览
   ============================================================ */
function renderHome() {
  const total = ALL_WORDS.length;
  const families = ROOT_FAMILIES.length;
  const added = Object.keys(state.srs).length;
  const mastered = Object.values(state.srs).filter(v => v.stage >= MASTER_STAGE).length;
  const pct = total ? Math.round(mastered / total * 100) : 0;
  const due = dueWords().length;

  $('#view-home').innerHTML = `
    ${pageHead('让单词有迹可循', '用词根词缀建立规律，用真题语境完成内化，用艾宾浩斯节奏抗遗忘。')}

    <div class="row g-3">
      <div class="col-6 lg:col-3"><div class="card-surface stat-card">
        <div class="stat-num">${total}</div><div class="stat-label">核心词总数 · ${families} 个词根家族</div>
        <i class="bi bi-diagram-3 stat-icon"></i></div></div>
      <div class="col-6 lg:col-3"><div class="card-surface stat-card">
        <div class="stat-num" style="color:var(--purple)">${families}</div><div class="stat-label">高频词根 · 记一带十</div>
        <i class="bi bi-bug stat-icon"></i></div></div>
      <div class="col-6 lg:col-3"><div class="card-surface stat-card">
        <div class="stat-num" style="color:var(--amber)">${added}</div><div class="stat-label">已加入复习队列 · 已掌握 ${mastered}</div>
        <i class="bi bi-bookmark-check stat-icon"></i></div></div>
      <div class="col-6 lg:col-3"><div class="card-surface stat-card">
        <div class="stat-num" style="color:var(--green)">${due}</div><div class="stat-label">当前待复习 · 掌握度 ${pct}%</div>
        <i class="bi bi-alarm stat-icon"></i></div></div>
    </div>

    <div class="card-surface mt-16" style="padding:20px">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <div style="font-weight:700;font-size:16px">今日学习闭环</div>
          <div class="hint-inline">规律 → 语境 → 输出 → 复习，四步缺一不可</div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-sm btn-outline-primary" data-goto="roots"><i class="bi bi-diagram-3"></i> 逛词根图谱</button>
          <button class="btn btn-sm btn-outline-success" data-goto="review"><i class="bi bi-repeat"></i> 开始复习</button>
          <button class="btn btn-sm btn-outline-secondary" data-goto="quiz"><i class="bi bi-patch-question"></i> 随机测验</button>
        </div>
      </div>
      <div class="review-progress mt-16"><div style="width:${pct}%"></div></div>
      <div class="hint-inline">已掌握 ${mastered} / ${total} 词（连续复习到 4 天间隔即计入掌握）</div>
    </div>

    <div class="section-label">调研结论 · 六类记忆法按性价比排序</div>
    <div class="row g-3">
      ${METHODS.map(m => `
        <div class="col-12 md:col-6 xl:col-4">
          <div class="card-surface method-card">
            <div class="method-top">
              <span class="method-rank">${m.rank}</span>
              <span class="method-name">${m.name}</span>
              <span class="method-tag">${m.tag}</span>
            </div>
            <div class="method-summary">${m.summary}</div>
            <div class="method-detail">${m.detail}</div>
            <div class="method-source">来源：<a href="${m.url}" target="_blank" rel="noopener">${m.source}</a></div>
          </div>
        </div>`).join('')}
    </div>
  `;
}

/* ============================================================
   视图 2：词根图谱
   ============================================================ */
function filteredFamilies() {
  const q = state.search.trim().toLowerCase();
  return ROOT_FAMILIES.filter(f => {
    if (state.filter !== 'all' && !f.words.some(w => w.l === Number(state.filter))) return false;
    if (!q) return true;
    return f.root.toLowerCase().includes(q) || f.meaning.includes(q) ||
      f.words.some(w => w.w.toLowerCase().includes(q) || (w.d || '').includes(q));
  });
}

function renderRoots() {
  const families = filteredFamilies();
  const sel = state.selectedFamily ? ROOT_FAMILIES.find(f => f.id === state.selectedFamily) : null;

  $('#view-roots').innerHTML = `
    ${pageHead('词根图谱', `${ROOT_FAMILIES.length} 组高频词根，覆盖四六级核心词。点击词根展开派生词链，看每个词是怎么「长」出来的。`)}
    <div class="filter-bar">
      <div class="search-box"><i class="bi bi-search"></i>
        <input id="rootSearch" type="search" placeholder="搜索单词、词根或含义…" value="${esc(state.search)}"></div>
      <div class="seg" id="levelSeg">
        <button data-level="all" class="${state.filter === 'all' ? 'active' : ''}">全部</button>
        <button data-level="4" class="${state.filter === '4' ? 'active' : ''}">四级</button>
        <button data-level="6" class="${state.filter === '6' ? 'active' : ''}">六级</button>
      </div>
      <span class="hint-inline">匹配 ${families.length} 组词根</span>
    </div>
    <div class="pos-legend">
      <span class="pos-legend-title">词性标注对照</span>${['n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.'].map(k => `<span class="pos-chip">${k}<em>${POS_CN[k]}</em></span>`).join('')}
      <span class="pos-legend-hint">拆解色块：<b style="color:var(--accent)">蓝=前缀</b> · <b style="color:var(--purple)">紫=词根</b> · <b style="color:var(--cyan)">青=后缀</b>，每个色块内都标了常见意思，悬停可看词源说明。</span>
    </div>

    <div class="root-grid">
      ${families.map(f => `
        <div class="root-card ${state.selectedFamily === f.id ? 'selected' : ''}" data-family="${f.id}">
          <div class="root-name">${esc(f.root)}</div>
          <div class="root-meaning">${esc(f.meaning)}</div>
          <div class="root-variants">${f.variants.map(v => `<span class="variant-chip" title="常见意思：${esc(f.meaning)}（${esc(f.root)} 的变体，长相变意思不变）">${esc(v)}</span>`).join('')}</div>
          <div class="root-foot"><span>${f.words.length} 个派生词</span><span>查看详情 →</span></div>
        </div>`).join('') || empty('没有匹配的词根，换个关键词试试')}
    </div>

    ${sel ? renderFamilyDetail(sel) : ''}
  `;
}

function renderFamilyDetail(f) {
  const words = f.words.filter(w => state.filter === 'all' || w.l === Number(state.filter));
  const ety = ROOT_ETYMOLOGY[f.id];
  return `
    <div class="card-surface detail-panel" id="familyDetail">
      <div class="detail-title">
        <span class="detail-root">${esc(f.root)}</span>
        <span class="detail-meaning">= ${esc(f.meaning)}</span>
        <span class="hint-inline">变体：${f.variants.join(' / ')}（同义：${esc(f.meaning)}）</span>
      </div>
      <div class="detail-hook">${esc(f.hook)}</div>
      ${ety ? `
        <div class="ety-block">
          <div class="ety-head"><span class="ety-lang">${esc(ety.lang)}语源</span><span class="ety-origin">${esc(ety.origin)}</span></div>
          <div class="ety-logic">${esc(ety.logic)}</div>
          <div class="ety-chain">
            ${ety.chain.map((c, i) => `<div class="ety-chain-item"><span class="ety-step">${i + 1}</span>${esc(c)}</div>`).join('')}
          </div>
          <div class="ety-trap"><i class="bi bi-exclamation-triangle"></i> ${esc(ety.trap)}</div>
        </div>` : ''}
      <div class="section-label">派生词链 · ${words.length} 词</div>
      ${words.map(w => renderWordRow(w, f)).join('')}
    </div>`;
}

function renderWordRow(w, family) {
  const added = !!state.srs[w.w];
  return `
    <div class="word-row">
      <div>
        <div class="word-head">
          <span class="word-name">${w.w}</span>
          <span class="lv-badge lv-${w.l}">CET-${w.l}</span>
          <button class="speak-btn" data-speak="${w.w}" title="朗读"><i class="bi bi-volume-up"></i></button>
        </div>
        <div class="word-meta mt-8">${posChips(w.t)}${w.s ? `<span class="pos-suffix">· 后缀 ${esc(w.s)}</span>` : ''}</div>
      </div>
      <div>
        <div class="decomp">
          ${w.p ? `${glossChip('prefix', glossPrefix(w.p))}<span class="chip-plus">+</span>` : ''}
          ${glossChip('root', glossRoot(w.r, family))}
          ${w.s ? `<span class="chip-plus">+</span>${glossChip('suffix', glossSuffix(w.s))}` : ''}
        </div>
        <div class="word-def">${esc(w.d)}</div>
        ${POLYSEMY_MAP.has(w.w) ? `
          <div class="poly-inline">
            <span class="poly-inline-label">更多义项</span>
            ${POLYSEMY_MAP.get(w.w).senses.map(s => `<div class="poly-inline-item"><b>${posText(s.m)}</b>${s.clue ? ` <span class="hint-inline">· ${esc(s.clue)}</span>` : ''}</div>`).join('')}
            <button class="link-btn" data-goto="polysemy">查看完整辨析 →</button>
          </div>` : ''}
        ${w.m ? `<div class="word-memo">${esc(w.m)}</div>` : ''}
        ${w.e ? `<div class="word-ex">${esc(w.e)}</div>` : ''}
        <div class="word-add">
          <button class="add-btn" data-add="${w.w}">
            <i class="bi ${added ? 'bi-check2-circle' : 'bi-plus-circle'}"></i>
            ${added ? stageText(state.srs[w.w].stage) : '加入复习'}
          </button>
        </div>
      </div>
    </div>`;
}
function stageText(stage) {
  return `已加入 · ${REVIEW_STEPS[Math.min(stage, REVIEW_STEPS.length - 1)].label}`;
}

/* ============================================================
   视图 3：词缀速查（含拆解词素全对照）
   ============================================================ */
function renderGlossTable() {
  const q = state.glossQuery.trim().toLowerCase();
  const groups = [
    { key: 'prefix', label: '前缀 · 方向与态度', icon: 'bi-arrow-bar-right', map: GLOSS.PREFIXES },
    { key: 'root', label: '词根 · 核心动作 / 事物', icon: 'bi-diagram-3', map: GLOSS.ROOTS },
    { key: 'suffix', label: '后缀 · 词性与功能', icon: 'bi-tag', map: GLOSS.SUFFIXES }
  ];
  const hit = (form, g) => !q ||
    (form + ' ' + g.m + ' ' + (g.n || '') + ' ' + (g.pos || '') + ' ' + (g.id || ''))
      .toLowerCase().includes(q);
  const total = groups.reduce((n, gr) => n + Object.keys(gr.map).length, 0);
  const shown = groups.reduce((n, gr) => n + Object.entries(gr.map).filter(([f, g]) => hit(f, g)).length, 0);

  return `
    <div class="card-surface mt-16 gloss-panel">
      <div class="section-label">拆解词素全对照 · 每个色块的常见意思</div>
      <div class="hint-inline" style="margin-bottom:10px">
        单词拆解里出现的 ${total} 个词素全部收录：前缀定方向、词根定核心义、后缀定词性。悬停色块可看词源说明；同化变体（suc-/suf-/sup- 等）保持同一常见义。
      </div>
      <div class="filter-bar">
        <div class="search-box"><i class="bi bi-search"></i>
          <input id="glossSearch" type="search" placeholder="搜索词素、常见意思或说明…" value="${esc(state.glossQuery)}"></div>
        <span class="hint-inline">匹配 ${shown} / ${total} 条</span>
      </div>
      ${groups.map(gr => {
        const rows = Object.entries(gr.map).filter(([f, g]) => hit(f, g));
        return rows.length ? `
          <div class="gloss-group gloss-${gr.key}">
            <div class="gloss-group-title"><i class="bi ${gr.icon}"></i> ${gr.label} <span class="hint-inline">${rows.length} 条</span></div>
            <div class="gloss-rows">
              ${rows.map(([form, g]) => `
                <div class="gloss-row">
                  <span class="gloss-form gloss-form-${gr.key}">${esc(form)}</span>
                  <span class="gloss-mean">${esc(g.m)}</span>
                  ${g.pos && g.pos !== '—' && gr.key === 'suffix' ? `<span class="gloss-pos">${esc(g.pos)}</span>` : ''}
                  ${g.n ? `<div class="gloss-note">${esc(g.n)}</div>` : ''}
                </div>`).join('')}
            </div>
          </div>` : '';
      }).join('') || empty('没有匹配的词素')}
      <div class="gloss-sources">
        <b>释义来源（联网核对）：</b>
        ${GLOSS.SOURCES.map(s => `<a href="${s.url}" target="_blank" rel="noopener" title="${esc(s.use)}">${esc(s.name)}</a>`).join(' · ')}
      </div>
    </div>`;
}

function renderAffixes() {
  $('#view-affixes').innerHTML = `
    ${pageHead('词缀速查表', '前缀定方向、词根定核心义、后缀定词性。每条都标了常见意思，拆解里的色块也带中文，不留裸拼写。按功能记，不要按字母顺序背。')}
    <div class="row g-3">
      <div class="col-12 xl:col-6">
        <div class="card-surface" style="padding:20px">
          <div style="font-weight:700;font-size:16px;margin-bottom:6px"><i class="bi bi-arrow-bar-right" style="color:var(--accent)"></i> 前缀 · 方向与态度</div>
          <div class="hint-inline">共 ${PREFIXES.length} 组。重点看「变脸」提示。</div>
          ${PREFIXES.map(p => `
            <div class="affix-item">
              <div class="d-flex align-items-baseline gap-2 flex-wrap">
                <span class="affix-name">${esc(p.p)}</span><span class="affix-mean"><b>常见意思：</b>${esc(p.meaning)}</span>
              </div>
              ${p.note ? `<div class="affix-note">${esc(p.note)}</div>` : ''}
              <div class="affix-ex">例：${esc(p.ex)}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="col-12 xl:col-6">
        <div class="card-surface" style="padding:20px">
          <div style="font-weight:700;font-size:16px;margin-bottom:6px"><i class="bi bi-tag" style="color:var(--cyan)"></i> 后缀 · 词性开关</div>
          <div class="hint-inline">选词填空三步法：判词性 → 缩范围 → 定语义。后缀是判词性最快的抓手。</div>
          ${SUFFIXES.map(s => `
            <div class="affix-item">
              <div class="d-flex align-items-baseline gap-2 flex-wrap">
                <span class="affix-name" style="color:var(--cyan)">${esc(s.s)}</span>
                <span class="affix-mean"><b>常见意思：</b>${esc(s.pos)} · ${esc(s.meaning)}</span>
              </div>
              ${s.note ? `<div class="affix-note">${esc(s.note)}</div>` : ''}
              <div class="affix-ex">例：${esc(s.ex)}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
    ${renderGlossTable()}`;
}

/* ============================================================
   视图 4：主题词场
   ============================================================ */
function renderThemes() {
  $('#view-themes').innerHTML = `
    ${pageHead('主题词场', '大脑按语义网络检索，而不是字母表。按六大话题成串记，写作时整组调用。')}
    <div class="row g-3">
      ${THEMES.map(t => `
        <div class="col-12 md:col-6">
          <div class="card-surface theme-card">
            <div class="theme-title"><i class="${t.icon}"></i>${t.name}
              <span class="hint-inline" style="margin-left:auto">${t.words.length} 词</span></div>
            <div class="theme-desc">${t.desc}</div>
            <div class="theme-words">
              ${t.words.map(w => `<span class="theme-word" data-speak="${esc(w.w)}" title="点击朗读"><b>${esc(w.w)}</b><span>${esc(w.d)}</span></span>`).join('')}
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   视图 5：易混词对比
   ============================================================ */
function renderConfuse() {
  $('#view-confuse').innerHTML = `
    ${pageHead('易混词对比', '成对记、对比记。形近词单独建纠错本，考场才不会翻车。')}
    ${CONFUSABLES.map(c => `
      <div class="card-surface confuse-card">
        <div class="confuse-pair">
          <span class="confuse-word a">${esc(c.a)}</span>
          <span class="confuse-vs">VS</span>
          <span class="confuse-word b">${esc(c.b)}</span>
          ${c.b2 ? `<span class="confuse-vs">/</span><span class="confuse-word" style="color:var(--amber)">${esc(c.b2)}</span>` : ''}
          <button class="speak-btn" data-speak="${esc(c.a)}"><i class="bi bi-volume-up"></i></button>
          <button class="speak-btn" data-speak="${esc(c.b)}"><i class="bi bi-volume-up"></i></button>
        </div>
        <div class="confuse-tip">${esc(c.tip)}</div>
      </div>`).join('')}`;
}

/* ============================================================
   视图 6：间隔复习（艾宾浩斯）
   ============================================================ */
function buildReviewQueue() {
  let q = dueWords();
  if (!q.length) {
    // 没有到期词时，允许提前复习已加入队列中最早的一批
    q = Object.entries(state.srs)
      .map(([w, v]) => ({ w, ...v }))
      .sort((a, b) => a.due - b.due)
      .slice(0, 10);
  }
  state.reviewQueue = q;
  state.reviewIndex = 0;
  state.reviewSessionCount = 0;
  state.showAnswers = false;
}

function renderReview() {
  if (!state.reviewQueue.length) buildReviewQueue();
  const q = state.reviewQueue;
  const idx = state.reviewIndex;
  const box = $('#view-review');

  if (!q.length) {
    box.innerHTML = `${pageHead('间隔复习', '按照艾宾浩斯遗忘曲线，在遗忘临界点及时复习。')}
      <div class="review-wrap"><div class="card-surface flash-card">
        <i class="bi bi-calendar-check" style="font-size:40px;color:var(--muted)"></i>
        <div style="font-size:18px;font-weight:700;margin-top:14px">复习队列还是空的</div>
        <div class="hint-inline mt-8">先去词根图谱把想记的词「加入复习」，这里会按 5分钟 → 30分钟 → 12小时 → 1天 → 2天 → 4天 → 7天 → 15天 自动排期。</div>
        <button class="btn btn-primary mt-16" data-goto="roots">去词根图谱挑词</button>
      </div></div>`;
    return;
  }

  if (idx >= q.length) {
    box.innerHTML = `${pageHead('间隔复习', '按照艾宾浩斯遗忘曲线，在遗忘临界点及时复习。')}
      <div class="review-wrap"><div class="card-surface flash-card">
        <i class="bi bi-trophy" style="font-size:42px;color:var(--amber)"></i>
        <div style="font-size:22px;font-weight:800;margin-top:14px">本轮完成 ${state.reviewSessionCount} 词</div>
        <div class="hint-inline mt-8">答「认识」推进到下一档间隔，答「忘记」回到 5 分钟档重新开始。</div>
        <div class="d-flex gap-2 mt-16">
          <button class="btn btn-primary" data-action="rebuildReview">再来一轮</button>
          <button class="btn btn-outline-secondary" data-goto="quiz">去测验</button>
        </div>
      </div></div>`;
    return;
  }

  const item = q[idx];
  const info = wordInfo(item.w);
  const rootPart = info ? (info.r || info.familyRoot) : '';
  const pct = Math.round(idx / q.length * 100);
  const stage = Math.min(item.stage ?? 0, REVIEW_STEPS.length - 1);

  box.innerHTML = `
    ${pageHead('间隔复习', '先遮住答案自己回忆，再翻开核对——提取练习比反复看有效得多。')}
    <div class="review-wrap">
      <div class="d-flex justify-content-between hint-inline">
        <span>第 ${idx + 1} / ${q.length} 词</span><span>当前档位：${REVIEW_STEPS[stage].label}</span>
      </div>
      <div class="review-progress"><div style="width:${pct}%"></div></div>

      <div class="card-surface flash-card">
        <div class="flash-label">Recall the meaning</div>
        <div class="flash-word">${esc(item.w)}</div>
        <div class="flash-root">${rootPart ? esc(rootPart) + ' · ' : ''}${info ? esc(info.familyMeaning) : ''}</div>
        <button class="speak-btn" data-speak="${esc(item.w)}" style="font-size:18px"><i class="bi bi-volume-up"></i></button>
        <div class="flash-divider"></div>

        ${state.showAnswers ? `
          <div class="flash-answer">
            <div class="flash-def">${info ? esc(info.d) : '（该词来自主题词场）'}${info?.t ? `<span class="flash-pos">${posChips(info.t)}</span>` : ''}</div>
            ${info ? `<div class="flash-decomp">
              ${info.p ? `${glossChip('prefix', glossPrefix(info.p))}<span class="chip-plus">+</span>` : ''}
              ${glossChip('root', glossRoot(info.r, { root: info.familyRoot, meaning: info.familyMeaning }))}
              ${info.s ? `<span class="chip-plus">+</span>${glossChip('suffix', glossSuffix(info.s))}` : ''}
            </div>` : ''}
            ${info?.m ? `<div class="flash-memo">${esc(info.m)}</div>` : ''}
            ${info?.e ? `<div class="flash-memo">${esc(info.e)}</div>` : ''}
          </div>
          <div class="review-actions">
            <button class="btn btn-again" data-grade="0"><i class="bi bi-x-circle"></i> 忘记</button>
            <button class="btn btn-hard" data-grade="1"><i class="bi bi-dash-circle"></i> 模糊</button>
            <button class="btn btn-good" data-grade="2"><i class="bi bi-check-circle"></i> 认识</button>
          </div>` : `
          <div class="flash-hidden">先在脑子里回忆词义和词根拆解</div>
          <button class="btn btn-primary mt-16" data-action="showAnswer">显示答案 <i class="bi bi-arrow-right"></i></button>`}
      </div>

      <div class="schedule-strip">
        ${REVIEW_STEPS.map((s, i) => `<span class="schedule-chip ${i === stage ? 'active' : ''}">${s.label}</span>`).join('')}
      </div>
    </div>`;
}

function gradeReview(grade) {
  const item = state.reviewQueue[state.reviewIndex];
  if (!item) return;
  const rec = state.srs[item.w] || { stage: 0, reps: 0 };
  let stage = rec.stage ?? 0;
  let delay;
  if (grade === 2) {
    stage = Math.min(stage + 1, REVIEW_STEPS.length - 1);
    delay = REVIEW_STEPS[stage].min;
  } else if (grade === 1) {
    stage = Math.max(0, stage - 1);
    delay = Math.max(5, Math.floor(REVIEW_STEPS[stage].min / 2));
  } else {
    stage = 0;
    delay = 5;
  }
  state.srs[item.w] = {
    stage,
    due: Date.now() + delay * 60 * 1000,
    reps: (rec.reps || 0) + 1,
    last: Date.now()
  };
  state.reviewSessionCount++;
  state.reviewIndex++;
  state.showAnswers = false;
  saveSRS();
  renderReview();
  updateStats();
}

/* ============================================================
   视图 7：快速测验
   ============================================================ */
function startQuiz() {
  const pool = ALL_WORDS.filter(w => state.filter === 'all' || w.l === Number(state.filter));
  const picked = [...pool].sort(() => Math.random() - .5).slice(0, 10);
  state.quiz = {
    items: picked.map(w => ({
      w,
      reverse: Math.random() < .4
    })),
    idx: 0, correct: 0, answered: false, chosen: -1
  };
}

function renderQuiz() {
  if (!state.quiz) startQuiz();
  const q = state.quiz;
  const box = $('#view-quiz');

  if (!q.items.length) {
    box.innerHTML = `${pageHead('快速测验', '从核心词里随机抽 10 题，检验规律是否真的记住了。')}${empty('当前筛选条件下没有可用题目')}`;
    return;
  }

  if (q.idx >= q.items.length) {
    const score = Math.round(q.correct / q.items.length * 100);
    box.innerHTML = `${pageHead('快速测验', '从核心词里随机抽 10 题，检验规律是否真的记住了。')}
      <div class="quiz-card"><div class="card-surface" style="border:0;box-shadow:none;text-align:center">
        <i class="bi ${score >= 80 ? 'bi-trophy' : 'bi-emoji-smile'}" style="font-size:44px;color:var(--amber)"></i>
        <div style="font-size:30px;font-weight:800;margin:10px 0">${score} 分</div>
        <div class="hint-inline">答对 ${q.correct} / ${q.items.length} 题</div>
        <div class="mt-16"><button class="btn btn-primary" data-action="restartQuiz">再来一组</button></div>
      </div></div>`;
    return;
  }

  const cur = q.items[q.idx];
  const target = cur.w;
  const others = ALL_WORDS.filter(w => w.w !== target.w && w.l === target.l)
    .sort(() => Math.random() - .5).slice(0, 3);
  if (!q.options || q.optionFor !== q.idx) {
    q.options = [target, ...others].sort(() => Math.random() - .5);
    q.optionFor = q.idx;
    q.answered = false;
    q.chosen = -1;
  }
  const ansIdx = q.options.findIndex(o => o.w === target.w);

  box.innerHTML = `
    ${pageHead('快速测验', '从核心词里随机抽 10 题，检验规律是否真的记住了。')}
    <div class="quiz-card">
      <div class="quiz-score">第 ${q.idx + 1} / ${q.items.length} 题 · 答对 ${q.correct} · ${cur.reverse ? '看释义选单词' : '看单词选释义'}</div>
      <div class="quiz-q">${cur.reverse ? esc(target.d) : esc(target.w)}</div>
      ${q.options.map((o, i) => {
        let cls = 'quiz-option';
        if (q.answered) {
          if (i === ansIdx) cls += ' correct';
          else if (i === q.chosen) cls += ' wrong';
        }
        return `<button class="${cls}" data-option="${i}" ${q.answered ? 'disabled' : ''}>
          ${cur.reverse ? esc(o.w) : `<b style="font-family:Georgia,serif;font-size:16px">${esc(o.w)}</b> <span class="hint-inline">${esc(o.d)}</span>`}
        </button>`;
      }).join('')}
      <div class="quiz-feedback">${q.answered
        ? (q.chosen === ansIdx ? '<span style="color:var(--green)">回答正确</span>' : `<span style="color:var(--red)">正确答案：${esc(target.w)} — ${esc(target.d)}</span>`)
        : ''}</div>
      ${q.answered ? `<div class="text-center mt-16"><button class="btn btn-primary" data-action="nextQuiz">${q.idx === q.items.length - 1 ? '查看成绩' : '下一题'} <i class="bi bi-arrow-right"></i></button></div>` : ''}
    </div>`;
}

function answerQuiz(i) {
  const q = state.quiz;
  if (!q || q.answered) return;
  const cur = q.items[q.idx];
  const ansIdx = q.options.findIndex(o => o.w === cur.w.w);
  q.chosen = i;
  q.answered = true;
  if (i === ansIdx) q.correct++;
  renderQuiz();
}

/* ============================================================
   视图 8：记忆法指南
   ============================================================ */
function renderMethods() {
  $('#view-methods').innerHTML = `
    ${pageHead('记忆法指南', '六种方法，每种都给到可执行的操作步骤、示例和避坑点。所有结论来自新东方四六级频道、人民网教育频道、科普中国等公开资料，按实际性价比排序。')}
    <div class="row g-2 mb-16">
      <div class="col-6 md:col-4"><button class="btn btn-outline-primary w-100" data-goto="etymology"><i class="bi bi-diagram-3"></i> 39 组词源逻辑图谱</button></div>
      <div class="col-6 md:col-4"><button class="btn btn-outline-warning w-100" data-goto="polysemy"><i class="bi bi-layers"></i> ${POLYSEMY.length} 词一词多义速查</button></div>
      <div class="col-12 md:col-4"><button class="btn btn-outline-secondary w-100" data-goto="roots"><i class="bi bi-collection"></i> 回到词根图谱记单词</button></div>
    </div>

    <div class="card-surface ebbinghaus-wrap">
      <div style="font-weight:700;font-size:16px;margin-bottom:4px">艾宾浩斯遗忘曲线</div>
      <div class="hint-inline">遗忘先快后慢：1 小时后剩 44.2%，1 天后剩 33.7%，1 个月后仅 21.1%。必须在遗忘临界点复习。</div>
      <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="艾宾浩斯遗忘曲线示意图">
        <defs>
          <linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style="stop-color:var(--accent);stop-opacity:.35"/>
            <stop offset="100%" style="stop-color:var(--accent);stop-opacity:0"/>
          </linearGradient>
        </defs>
        <line x1="60" y1="185" x2="650" y2="185" style="stroke:var(--border)" stroke-width="1.5"/>
        <line x1="60" y1="20" x2="60" y2="185" style="stroke:var(--border)" stroke-width="1.5"/>
        ${[0, 25, 50, 75, 100].map((v, i) => {
          const y = 185 - v * 1.55;
          return `<text x="52" y="${y + 4}" text-anchor="end" style="fill:var(--muted)" font-size="10">${v}%</text>
                  ${i ? `<line x1="60" y1="${y}" x2="650" y2="${y}" style="stroke:var(--border)" stroke-width="0.5" stroke-dasharray="3 5"/>` : ''}`;
        }).join('')}
        <path d="M60,30 C100,80 130,104 180,120 C250,140 350,151 450,157 C530,162 600,164 650,165 L650,185 L60,185 Z" fill="url(#curveFill)"/>
        <path d="M60,30 C100,80 130,104 180,120 C250,140 350,151 450,157 C530,162 600,164 650,165" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>
        ${[
          [60, 30, '刚学完', '100%'], [112, 89, '1小时', '44.2%'],
          [180, 120, '1天', '33.7%'], [360, 152, '8天', '25.4%'], [650, 165, '1个月', '21.1%']
        ].map(([x, y, label, val]) => `
          <circle cx="${x}" cy="${y}" r="4" style="fill:var(--accent);stroke:var(--surface)" stroke-width="2"/>
          <text x="${x}" y="${y - 10}" text-anchor="middle" style="fill:var(--text)" font-size="10" font-weight="700">${val}</text>
          <text x="${x}" y="200" text-anchor="middle" style="fill:var(--muted)" font-size="10">${label}</text>`).join('')}
      </svg>
      <div class="chart-note">复习不是「再看一遍」，而是遮住释义主动回忆。本网站的复习中心按 5分钟 / 30分钟 / 12小时 / 1天 / 2天 / 4天 / 7天 / 15天 八档自动排期。</div>
    </div>

    <div class="row g-3">
      ${METHODS.map(m => {
        const st = METHOD_STEPS[m.id] || { steps: [], example: '', pitfall: '' };
        return `
        <div class="col-12 md:col-6">
          <div class="card-surface method-card" style="height:100%">
            <div class="method-top">
              <span class="method-rank">${m.rank}</span>
              <span class="method-name">${m.name}</span>
              <span class="method-tag">${m.tag}</span>
            </div>
            <div class="method-summary">${m.summary}</div>
            <div class="method-detail">${m.detail}</div>
            ${st.steps.length ? `
              <div class="method-steps-label">操作步骤</div>
              <ol class="method-steps">${st.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
            ${st.example ? `<div class="method-example"><b>示例</b><br>${esc(st.example)}</div>` : ''}
            ${st.pitfall ? `<div class="method-pitfall"><i class="bi bi-exclamation-triangle"></i> ${esc(st.pitfall)}</div>` : ''}
            <div class="method-source">来源：<a href="${m.url}" target="_blank" rel="noopener">${m.source}</a></div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="card-surface mt-16" style="padding:20px">
      <div style="font-weight:700;font-size:16px;margin-bottom:10px">两条最容易踩的坑</div>
      <div class="affix-note">① 前缀会变脸（辅音同化）：sub- → sup/suf/sug/suc/sus/sur。认不出前缀，是因为你在找它的脸，而不是找它的魂。</div>
      <div class="affix-note">② 词根也会变脸：cap/cep/cip/ceive 都是「拿」。别把词根背成固定拼写，要背成「辅音骨架 + 大致意思」。</div>
      <div class="hint-inline mt-16">也要警惕「望词生义」：salary 来自拉丁 sal（盐，古罗马士兵买盐的钱），understand 的 under 是古义「在…之中」而非「下面」。拆不通的词直接查词源，那个故事本身就是最好的记忆点。</div>
    </div>`;
}

/* ============================================================
   视图 9：词源逻辑图谱（39 组词根，按含义逻辑串讲）
   ============================================================ */
function renderEtymology() {
  const q = state.search.trim().toLowerCase();
  const list = ROOT_FAMILIES.filter(f => {
    if (!q) return true;
    const e = ROOT_ETYMOLOGY[f.id] || {};
    return [f.root, f.meaning, e.origin, e.logic, ...(e.chain || [])]
      .join(' ').toLowerCase().includes(q);
  });
  $('#view-etymology').innerHTML = `
    ${pageHead('词源逻辑图谱', '每个词根为什么是这个意思？从拉丁/希腊本义出发，看含义如何一步步分叉、抽象化。共 ' + ROOT_FAMILIES.length + ' 组。')}
    <div class="filter-bar">
      <div class="search-box"><i class="bi bi-search"></i>
        <input id="etySearch" type="search" placeholder="搜索词根、本义或含义链…" value="${esc(state.search)}"></div>
      <span class="hint-inline">匹配 ${list.length} 组 · 点开看完整逻辑</span>
      <button class="btn btn-sm btn-outline-secondary" data-action="toggleAllEty">${state.etyOpenAll ? '全部收起' : '展开全部'}</button>
    </div>
    ${list.map((f, idx) => {
      const e = ROOT_ETYMOLOGY[f.id];
      if (!e) return '';
      const open = state.etyOpenAll || (state.etyOpen?.[f.id] ?? idx < 3);
      return `
      <div class="card-surface ety-card" data-ety="${f.id}">
        <div class="ety-card-head" data-action="toggleEty" data-id="${f.id}">
          <span class="ety-index">${String(idx + 1).padStart(2, '0')}</span>
          <span class="ety-root-title">${esc(f.root)}</span>
          <span class="ety-root-mean">${esc(f.meaning)}</span>
          <span class="ety-lang">${esc(e.lang)}</span>
          <i class="bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} ety-chevron"></i>
        </div>
        ${open ? `
        <div class="ety-card-body">
          <div class="ety-origin-row"><span class="ety-k">原始词</span><span>${esc(e.origin)}</span></div>
          <div class="ety-logic">${esc(e.logic)}</div>
          <div class="ety-chain">
            ${e.chain.map((c, i) => `<div class="ety-chain-item"><span class="ety-step">${i + 1}</span>${esc(c)}</div>`).join('')}
          </div>
          <div class="ety-trap"><i class="bi bi-exclamation-triangle"></i> ${esc(e.trap)}</div>
          <div class="ety-words">本组派生词：${f.words.map(w => `<button class="word-link" data-goto-word="${esc(w.w)}">${esc(w.w)}</button>`).join('')}</div>
        </div>` : ''}
      </div>`;
    }).join('') || empty('没有匹配的词根')}
  `;
}

/* ============================================================
   视图 10：一词多义速查（熟词僻义）
   ============================================================ */
function renderPolysemy() {
  const q = state.search.trim().toLowerCase();
  const list = POLYSEMY.filter(p => {
    if (!q) return true;
    return [p.w, p.common, p.why, ...p.senses.map(s => s.m + (s.clue || '') + (s.ex || ''))]
      .join(' ').toLowerCase().includes(q);
  });
  $('#view-polysemy').innerHTML = `
    ${pageHead('一词多义 · 熟词僻义速查', '四六级阅读最隐蔽的陷阱不是生词，而是你以为认识的词。共 ' + POLYSEMY.length + ' 个高频多义词，每个都给判断线索和词源解释。')}
    <div class="filter-bar">
      <div class="search-box"><i class="bi bi-search"></i>
        <input id="polySearch" type="search" placeholder="搜索单词或义项…" value="${esc(state.search)}"></div>
      <span class="hint-inline">匹配 ${list.length} 词</span>
      <span class="hint-inline">线索栏目是解题关键：看到线索语境，立刻切换义项</span>
    </div>
    ${list.map(p => `
      <div class="card-surface poly-card">
        <div class="poly-card-head">
          <span class="poly-word">${esc(p.w)}</span>
          <button class="speak-btn" data-speak="${esc(p.w)}"><i class="bi bi-volume-up"></i></button>
          <span class="poly-common">常见义：${posText(p.common)}</span>
          <span class="poly-count">+${p.senses.length} 个常考义项</span>
        </div>
        <div class="poly-senses">
          ${p.senses.map((s, i) => `
            <div class="poly-sense">
              <span class="poly-num">${i + 1}</span>
              <div>
                <div class="poly-sense-m">${posText(s.m)}</div>
                ${s.clue ? `<div class="poly-clue"><i class="bi bi-key"></i> 判断线索：${esc(s.clue)}</div>` : ''}
                ${s.ex ? `<div class="word-ex">${esc(s.ex)}</div>` : ''}
                ${s.发音 ? `<div class="hint-inline">发音：${esc(s.发音)}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
        <div class="poly-why"><i class="bi bi-lightbulb"></i> <b>为什么会这样：</b>${esc(p.why)}</div>
      </div>`).join('') || empty('没有匹配的单词')}
  `;
}

/* ============================================================
   事件绑定
   ============================================================ */
document.addEventListener('click', e => {
  const t = e.target;

  // 导航 / 跳转
  const gotoEl = t.closest('[data-goto]');
  if (gotoEl) { setView(gotoEl.dataset.goto); return; }
  const navEl = t.closest('#mainNav [data-view]');
  if (navEl) { setView(navEl.dataset.view); return; }

  // 朗读
  const speakEl = t.closest('[data-speak]');
  if (speakEl) { speak(speakEl.dataset.speak); return; }

  // 词根卡片
  const familyEl = t.closest('[data-family]');
  if (familyEl && !t.closest('[data-add]')) {
    const id = familyEl.dataset.family;
    state.selectedFamily = state.selectedFamily === id ? null : id;
    renderRoots();
    if (state.selectedFamily) {
      setTimeout(() => $('#familyDetail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
    return;
  }

  // 加入复习
  const addEl = t.closest('[data-add]');
  if (addEl) {
    const w = addEl.dataset.add;
    if (!state.srs[w]) {
      state.srs[w] = { stage: 0, due: Date.now() + 5 * 60 * 1000, reps: 0, last: Date.now() };
      saveSRS();
      toast(`「${w}」已加入复习，5 分钟后第一次复习`);
      renderRoots();
    } else {
      delete state.srs[w];
      saveSRS();
      toast(`「${w}」已移出复习队列`);
      renderRoots();
    }
    return;
  }

  // 级别筛选
  const lvlEl = t.closest('#levelSeg [data-level]');
  if (lvlEl) {
    state.filter = lvlEl.dataset.level;
    renderRoots();
    return;
  }

  // 复习卡动作
  const actionEl = t.closest('[data-action]');
  if (actionEl) {
    const a = actionEl.dataset.action;
    if (a === 'showAnswer') { state.showAnswers = true; renderReview(); }
    if (a === 'rebuildReview') { buildReviewQueue(); renderReview(); }
    if (a === 'restartQuiz') { state.quiz = null; renderQuiz(); }
    if (a === 'nextQuiz') { state.quiz.idx++; renderQuiz(); }
    return;
  }
  const gradeEl = t.closest('[data-grade]');
  if (gradeEl) { gradeReview(Number(gradeEl.dataset.grade)); return; }

  // 测验选项
  const optEl = t.closest('[data-option]');
  if (optEl) { answerQuiz(Number(optEl.dataset.option)); return; }

  // 词源卡片展开/收起
  const etyToggle = t.closest('[data-action="toggleEty"], [data-action="toggleAllEty"]');
  if (etyToggle) {
    if (etyToggle.dataset.action === 'toggleAllEty') {
      state.etyOpenAll = !state.etyOpenAll;
      renderEtymology();
    } else {
      const id = etyToggle.dataset.id;
      state.etyOpen = state.etyOpen || {};
      state.etyOpen[id] = !state.etyOpen[id];
      const card = etyToggle.closest('[data-ety]');
      const body = card?.querySelector('.ety-card-body');
      const chevron = etyToggle.querySelector('.ety-chevron');
      if (body) body.remove();
      else {
        const f = ROOT_FAMILIES.find(x => x.id === id);
        const e = ROOT_ETYMOLOGY[id];
        if (f && e) {
          const div = document.createElement('div');
          div.className = 'ety-card-body';
          div.innerHTML = `
            <div class="ety-origin-row"><span class="ety-k">原始词</span><span>${esc(e.origin)}</span></div>
            <div class="ety-logic">${esc(e.logic)}</div>
            <div class="ety-chain">${e.chain.map((c, i) => `<div class="ety-chain-item"><span class="ety-step">${i + 1}</span>${esc(c)}</div>`).join('')}</div>
            <div class="ety-trap"><i class="bi bi-exclamation-triangle"></i> ${esc(e.trap)}</div>
            <div class="ety-words">本组派生词：${f.words.map(w => `<button class="word-link" data-goto-word="${esc(w.w)}">${esc(w.w)}</button>`).join('')}</div>`;
          card?.appendChild(div);
        }
      }
      if (chevron) chevron.className = `bi ${body ? 'bi-chevron-down' : 'bi-chevron-up'} ety-chevron`;
    }
    return;
  }

  // 从词源图跳到词根图谱的对应词
  const wordLink = t.closest('[data-goto-word]');
  if (wordLink) {
    const w = wordLink.dataset.gotoWord;
    const info = wordInfo(w);
    if (info) {
      state.selectedFamily = info.family;
      state.filter = 'all';
      state.search = '';
      setView('roots');
      setTimeout(() => {
        const row = $$('.word-row').find(r => r.querySelector('.word-name')?.textContent === w);
        row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
    return;
  }
});

document.addEventListener('input', e => {
  const id = e.target.id;
  if (id === 'glossSearch') {
    state.glossQuery = e.target.value;
    const pos = e.target.selectionStart;
    renderAffixes();
    const input = $('#glossSearch');
    if (input) { input.focus(); input.setSelectionRange(pos, pos); }
    return;
  }
  const rerender = { rootSearch: renderRoots, etySearch: renderEtymology, polySearch: renderPolysemy }[id];
  if (rerender) {
    state.search = e.target.value;
    const pos = e.target.selectionStart;
    rerender();
    const input = $(`#${id}`);
    if (input) { input.focus(); input.setSelectionRange(pos, pos); }
  }
});

// 主题切换
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
  const btn = $('#themeToggle');
  if (btn) btn.innerHTML = `<i class="bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}"></i>`;
}
$('#themeToggle')?.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// 初始化
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; } catch {}
applyTheme(savedTheme);
setView('home');
