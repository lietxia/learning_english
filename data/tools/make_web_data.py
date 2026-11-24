#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从规范 JSON 生成网页精简数据（全量，字段缩短，保留所有词组）。
用法：python3 data/tools/make_web_data.py
"""
import json, os

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = json.load(open(os.path.join(D, 'vocabulary.json'), encoding='utf-8'))
r = json.load(open(os.path.join(D, 'roots.json'), encoding='utf-8'))

words = []
for w in v['words']:
    words.append({
        'id': w['id'], 'w': w['word'], 'l': w['level'],
        'p': w.get('pos'), 'uk': w.get('ipa_uk'), 'us': w.get('ipa_us'),
        'd': w.get('definition_zh'), 'da': (w.get('definition_zh_all') or [])[:3],
        'f': w.get('frequency'), 'c': w.get('cefr'), 'cat': w.get('category'),
        'e': w.get('example'), 'ph': w.get('phrases') or [],
    })

roots = []
for x in r['roots']:
    pr = x.get('pronunciation') or {}
    mn = x.get('mnemonic') or {}
    roots.append({
        'id': x['id'], 'r': x['root'], 'v': x.get('variants') or [],
        'me': x.get('meaning_en'), 'mz': x.get('meaning_zh'), 'lang': x.get('language'),
        'org': (x.get('origins') or [])[:3], 'ex': (x.get('examples') or [])[:8],
        'cw': (x.get('cet_words') or [])[:8],
        'ipa': pr.get('ipa'), 'zha': pr.get('zh_approx'), 'prm': pr.get('method'),
        'mn': {'core': mn.get('core'), 'image': mn.get('image'),
               'sound': mn.get('sound_link'), 'chain': mn.get('chain'),
               'story': mn.get('origin_story'), 'trap': mn.get('trap')},
        'q': x.get('quality'), 'fam': x.get('project_family'),
    })

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
for n in ['web-words.json', 'web-roots.json']:
    p = os.path.join(D, n)
    print(n, round(os.path.getsize(p) / 1024 / 1024, 2), 'MB')
print('words', len(words), 'phrases', meta_v['phrase_count'], 'roots', len(roots))
