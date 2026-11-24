#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从规范 JSON 生成网页精简数据（全量，字段缩短，保留所有词组）。

额外产出：
  - data/web-affixes.json  前缀 / 后缀含义速查（供前端词素色块显示）
  - 每个单词的 dec 字段：离线预计算的词素分解 {r, rid, p[], s[]}
用法：python3 data/tools/make_web_data.py
"""
import json, os, re

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = json.load(open(os.path.join(D, 'vocabulary.json'), encoding='utf-8'))
r = json.load(open(os.path.join(D, 'roots.json'), encoding='utf-8'))
aff = json.load(open(os.path.join(D, 'affixes.json'), encoding='utf-8'))


def plain(s):
    return re.sub(r'[^a-z]', '', str(s or '').lower())


# ---------- 词素分解：前缀链 + 词根 + 后缀链（允许少量连接字母） ----------
ASSIM = {
    'ad': ['ad', 'ac', 'af', 'ag', 'al', 'ap', 'ar', 'as', 'at'],
    'con': ['con', 'col', 'com', 'cor', 'co'],
    'in': ['in', 'il', 'im', 'ir'],
    'ob': ['ob', 'oc', 'of', 'op'],
    'sub': ['sub', 'suc', 'suf', 'sug', 'sup', 'sur', 'sus'],
    'dis': ['dis', 'di', 'dif'],
    'ex': ['ex', 'e', 'ef'],
    'syn': ['syn', 'sym', 'syl'],
    'per': ['per', 'pel'],
    'se': ['se'], 'de': ['de'], 're': ['re'], 'pre': ['pre'], 'pro': ['pro'],
}
P = sorted({plain(x['form']) for x in aff['prefixes']}
           | {y for vs in ASSIM.values() for y in vs})
S = sorted({plain(x['form']) for x in aff['suffixes']})

FORMS = {}  # 词根形 -> [root_id]
for x in r['roots']:
    for f in {plain(x['root'])} | {plain(v) for v in (x.get('variants') or [])}:
        if len(f) >= 3:
            FORMS.setdefault(f, []).append(x['id'])


def cover(s, table, gap=2):
    """从左到右用 table 拼出 s，最多跳过 gap 个连接字母；失败返回 None。"""
    out = []
    i = 0
    while i < len(s):
        best = None
        for f in table:
            if len(f) < 2:
                continue
            j = s.find(f, i)
            if j == -1 or j - i > gap:
                continue
            if best is None or (j - i, -len(f)) < (best[0], -len(best[1])):
                best = (j, f)
        if best is None:
            return None
        j, f = best
        out.append(f)
        i = j + len(f)
    return out


def decompose(word, gap=1):
    """返回 {'r': 词根形, 'rid': 词根id, 'p': [前缀...], 's': [后缀...]} 或 None。

    门槛：词根形至少 3 个字母（避免 ar/ge 之类误拆）；前后缀最多允许 1 个连接字母。
    """
    w = plain(word)
    L = len(w)
    best = None
    for i in range(L):
        for j in range(i + 3, min(L, i + 12) + 1):
            sub = w[i:j]
            if sub not in FORMS:
                continue
            b, a = w[:i], w[j:]
            pc = cover(b, P, gap) if b else []
            if pc is None:
                if b and len(b) == 1 and b in P:
                    pc = [b]
                else:
                    continue
            sc = cover(a, S, gap) if a else []
            if sc is None:
                continue
            cov = sum(map(len, pc)) + sum(map(len, sc))
            score = ((len(pc) > 0) + (len(sc) > 0), cov, j - i)
            if best is None or score > best[0]:
                best = (score, sub, pc, sc)
    if best is None:
        return None
    _, sub, pc, sc = best
    return {'r': sub, 'rid': FORMS[sub][0], 'p': pc, 's': sc}


# ---------- 词库 ----------
words = []
for w in v['words']:
    words.append({
        'id': w['id'], 'w': w['word'], 'l': w['level'],
        'p': w.get('pos'), 'uk': w.get('ipa_uk'), 'us': w.get('ipa_us'),
        'd': w.get('definition_zh'), 'da': (w.get('definition_zh_all') or [])[:3],
        'f': w.get('frequency'), 'c': w.get('cefr'), 'cat': w.get('category'),
        'e': w.get('example'), 'ph': w.get('phrases') or [],
        'dec': decompose(w['word']),
    })

# ---------- 词根 ----------
roots = []
for x in r['roots']:
    pr = x.get('pronunciation') or {}
    mn = x.get('mnemonic') or {}
    roots.append({
        'id': x['id'], 'r': x['root'], 'v': x.get('variants') or [],
        'me': x.get('meaning_en'), 'mz': x.get('meaning_zh'), 'lang': x.get('language'),
        'org': (x.get('origins') or [])[:3], 'ex': (x.get('examples') or [])[:8],
        'cw': (x.get('cet_words') or []),
        'ipa': pr.get('ipa'), 'zha': pr.get('zh_approx'), 'prm': pr.get('method'),
        'mn': {'core': mn.get('core'), 'image': mn.get('image'),
               'sound': mn.get('sound_link'), 'chain': mn.get('chain'),
               'story': mn.get('origin_story'), 'trap': mn.get('trap')},
        'q': x.get('quality'), 'fam': x.get('project_family'),
    })

# ---------- 词缀速查（前端色块含义） ----------
prefixes = [{'f': plain(x['form']), 'm': x.get('meaning_zh'), 'n': (x.get('note') or '')[:120]}
            for x in aff['prefixes']]
suffixes = [{'f': plain(x['form']), 'm': x.get('meaning_zh'), 'n': (x.get('note') or '')[:120],
             'pos': x.get('pos')} for x in aff['suffixes']]

meta_v = {
    'name': '网页词库（全量四六级）', 'version': v['meta']['version'],
    'generated': v['meta']['generated'], 'word_count': len(words),
    'phrase_count': sum(len(w['ph']) for w in words),
    'source': 'data/vocabulary.json',
}
meta_r = {
    'name': '网页词根图谱（全量）', 'version': r['meta']['version'],
    'generated': r['meta']['generated'], 'root_count': len(roots),
    'source': 'data/roots.json',
}
json.dump({'meta': meta_v, 'words': words}, open(os.path.join(D, 'web-words.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump({'meta': meta_r, 'roots': roots}, open(os.path.join(D, 'web-roots.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump({'meta': {'name': '网页词缀速查', 'version': aff['meta']['version'],
                    'generated': aff['meta']['generated']},
           'prefixes': prefixes, 'suffixes': suffixes},
          open(os.path.join(D, 'web-affixes.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

ok = sum(1 for w in words if w['dec'])
with_p = sum(1 for w in words if w['dec'] and w['dec']['p'])
with_s = sum(1 for w in words if w['dec'] and w['dec']['s'])
both = sum(1 for w in words if w['dec'] and w['dec']['p'] and w['dec']['s'])
print(f'web-words.json {round(os.path.getsize(os.path.join(D,"web-words.json"))/1024/1024,2)} MB')
print(f'web-roots.json {round(os.path.getsize(os.path.join(D,"web-roots.json"))/1024/1024,2)} MB')
print(f'words {len(words)} phrases {meta_v["phrase_count"]} roots {len(roots)}')
print(f'dec 可拆 {ok} ({ok/len(words):.1%}) | 有前缀 {with_p} ({with_p/len(words):.1%}) '
      f'| 有后缀 {with_s} ({with_s/len(words):.1%}) | 前后都有 {both} ({both/len(words):.1%})')
print(f'affixes 前缀 {len(prefixes)} 后缀 {len(suffixes)}')
