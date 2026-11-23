#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 vocabulary.json 生成按级别划分的便捷视图：cet4.json / cet6.json。
用法：python3 data/tools/make_views.py
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.dirname(HERE)
src = json.load(open(os.path.join(D, 'vocabulary.json'), encoding='utf-8'))

for level in ['CET4', 'CET6']:
    words = [w for w in src['words'] if level in w['level']]
    out = {
        'meta': {
            'name': f'{level} 词汇表（从 vocabulary.json 派生）',
            'version': src['meta']['version'],
            'generated': src['meta']['generated'],
            'count': len(words),
            'source': 'data/vocabulary.json',
        },
        'words': words,
    }
    p = os.path.join(D, f'{level.lower()}.json')
    json.dump(out, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(level, len(words), '->', p)
