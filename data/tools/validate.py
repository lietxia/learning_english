#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""校验 data/ 下的 JSON 数据库：结构、必填字段、交叉引用。
用法：python3 data/tools/validate.py
"""
import json, os, sys, collections

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errs, warns = [], []

def load(name):
    p = os.path.join(D, name)
    if not os.path.exists(p):
        errs.append(f'{name}: 文件不存在')
        return None
    try:
        return json.load(open(p, encoding='utf-8'))
    except Exception as e:
        errs.append(f'{name}: 无法解析 JSON: {e}')
        return None

vocab = load('vocabulary.json')
roots = load('roots.json')
affix = load('affixes.json')
extras = load('extras.json')

V = {}
if vocab:
    for w in vocab['words']:
        for k in ['id', 'word', 'level', 'sources']:
            if k not in w:
                errs.append(f"vocabulary: 词条缺字段 {k}: {w.get('word')}")
        if w.get('level') and not set(w['level']) <= {'CET4', 'CET6'}:
            errs.append(f"vocabulary: level 非法: {w['word']} {w['level']}")
        if w['word'] in V:
            errs.append(f"vocabulary: 重复词条 {w['word']}")
        V[w['word']] = w
    print('vocabulary:', vocab['meta']['count'], '条；实际', len(vocab['words']))

if roots:
    R = set()
    for r in roots['roots']:
        rid = r.get('id')
        if not rid:
            errs.append('roots: 缺 id'); continue
        if rid in R:
            errs.append(f'roots: 重复 id {rid}')
        R.add(rid)
        for k in ['root', 'variants', 'meaning_en', 'meaning_zh', 'language',
                  'pronunciation', 'mnemonic', 'quality']:
            if k not in r:
                errs.append(f'roots: {rid} 缺字段 {k}')
        mn = r.get('mnemonic') or {}
        for k in ['core', 'image', 'sound_link', 'chain', 'origin_story', 'trap']:
            if k not in mn:
                errs.append(f'roots: {rid} mnemonic 缺 {k}')
        pr = r.get('pronunciation') or {}
        for k in ['ipa', 'zh_approx', 'method']:
            if k not in pr:
                errs.append(f'roots: {rid} pronunciation 缺 {k}')
        for cw in r.get('cet_words', []):
            if cw.get('word') not in V:
                warns.append(f'roots: {rid} cet_word 不在词库: {cw.get("word")}')
    q = collections.Counter(r.get('quality') for r in roots['roots'])
    print('roots:', len(roots['roots']), '条；quality', dict(q))

if affix:
    for kind in ['prefixes', 'suffixes']:
        for a in affix[kind]:
            for k in ['form', 'kind', 'meaning_zh', 'ipa', 'zh_approx', 'mnemonic']:
                if k not in a:
                    errs.append(f'affixes: {kind} 缺字段 {k}: {a.get("form")}')
    print('affixes:', len(affix['prefixes']), '前缀 /', len(affix['suffixes']), '后缀')

if extras:
    print('extras:', {k: len(extras[k]) for k in
                     ['themes', 'confusables', 'methods', 'method_steps', 'review_steps', 'polysemy']})

print(f'\n错误 {len(errs)} / 警告 {len(warns)}')
for e in errs[:40]:
    print(' !', e)
for w in warns[:20]:
    print(' ~', w)
sys.exit(1 if errs else 0)
