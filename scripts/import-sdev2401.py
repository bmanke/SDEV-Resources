#!/usr/bin/env python3
"""
Imports the SDEV2401 Rapid Backend Development (Django) repo into
Semester 2 > SDEV-2401 Rapid Backend Development.

  python3 scripts/import-sdev2401.py /path/to/sdev2401-clone

Each lesson page = lesson README (taught content) + the starter project files
that are new or changed since the earlier lesson (the projects are cumulative,
so repeating every file would bury the changes). Images are not imported.
"""
import re, sys, shutil
from pathlib import Path

SRC = Path(sys.argv[1]).resolve()
ROOT = Path(__file__).resolve().parent.parent
SECTION = 'sdev-2401-rapid-backend'
OUT = ROOT / 'src/content/docs' / SECTION
shutil.rmtree(OUT, ignore_errors=True)
OUT.mkdir(parents=True)

SKIP_DIRS = {'static', 'staticfiles', 'migrations', '__pycache__', '.vscode', 'venv', '.venv', 'node_modules', 'media', 'images',
             'images-to-use', 'csvs-to-use', 'csv-to-use', '.git', 'staticfiles'}
LANG = {'.py': 'python', '.html': 'html', '.css': 'css', '.js': 'js', '.txt': 'text', '.md': 'md', '.json': 'json'}
SAFE = {'details', 'summary', 'b', 'strong', 'em', 'i', 'br', 'p', 'code', 'kbd', 'img', 'a', 'ul', 'ol', 'li', 'table', 'thead',
        'tbody', 'tr', 'td', 'th', 'sup', 'sub', 'hr', 'blockquote', 'pre'}

def yaml(s): return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'
def fence(t): return '`' * (max([len(m) for m in re.findall(r'`+', t)] + [2]) + 1)
def human(s):
    fix = {'Orm': 'ORM', 'Paas': 'PaaS', 'Api': 'API', 'Urls': 'URLs', 'Csv': 'CSV', 'Djoser': 'Djoser', 'Rest': 'REST', 'And': 'and', 'To': 'to', 'With': 'with', 'Of': 'of'}
    w = [x.capitalize() for x in re.sub(r'[-_]+', ' ', s).split()]
    return ' '.join(fix.get(x, x) for x in w)

def outside_fences(md, fn):
    out, inf = [], None
    for line in md.split('\n'):
        m = re.match(r'^\s*(`{3,}|~{3,})', line)
        if m:
            t = m.group(1)
            if inf is None: inf = t
            elif t[0] == inf[0] and len(t) >= len(inf): inf = None
            out.append(line); continue
        out.append(line if inf else fn(line))
    return '\n'.join(out)

def clean_line(line):
    def esc(seg):
        return re.sub(r'<(/?)([A-Za-z][\w:-]*)([^>]*)>',
                      lambda m: m.group(0) if m.group(2).lower() in SAFE else f'&lt;{m.group(1)}{m.group(2)}{m.group(3)}&gt;', seg)
    return '`'.join(esc(s) if i % 2 == 0 else s for i, s in enumerate(line.split('`')))

def strip_h1(md):
    ls = md.split('\n')
    for i, l in enumerate(ls):
        if l.startswith('# '): return l[2:].strip(), '\n'.join(ls[i + 1:]).lstrip('\n')
    return None, md

seen = {}      # relpath-in-project -> last shown text
entries = []
lessons = sorted(d for d in SRC.iterdir() if d.is_dir() and re.match(r'(\d+|djoser)', d.name))
for d in lessons:
    m = re.match(r'(\d+)-(.*?)-start$', d.name)
    num, name = (m.group(1), m.group(2)) if m else ('', d.name.replace('-start', ''))
    h1, body = strip_h1((d / 'README.md').read_text())
    title = f'Lesson {num}: {human(name)}' if num else human(name)
    slug = d.name.replace('-start', '')

    # images referenced by the README
    # Images are intentionally not imported: drop the markdown image lines.
    body = re.sub(r'^\s*!\[[^\]]*\]\([^)]*\)\s*$\n?', '', body, flags=re.M)
    body = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', body)
    body = outside_fences(body, clean_line)

    blocks = []
    for f in sorted(d.rglob('*')):
        rel = f.relative_to(d)
        if not f.is_file() or f.name.lower() == 'readme.md' or any(p in SKIP_DIRS for p in rel.parts[:-1]): continue
        if f.suffix not in LANG and f.name != 'requirements.txt': continue
        if f.name in ('tests.py',) or (f.name == '__init__.py') or f.stat().st_size > 30000: continue
        try: text = f.read_text().rstrip('\n')
        except UnicodeDecodeError: continue
        if not text.strip() or seen.get(rel.as_posix()) == text: continue
        seen[rel.as_posix()] = text
        fc = fence(text)
        blocks.append(f'### `{rel.as_posix()}`\n\n{fc}{LANG.get(f.suffix, "text")} title="{rel.as_posix()}"\n{text}\n{fc}')
    parts = [body]
    if blocks:
        parts.append('## Starter code\n\nThe project files as they are at the start of this lesson. '
                     'Files identical to an earlier lesson are not repeated, so only new or changed files appear.\n\n' + '\n\n'.join(blocks))
    entries.append((slug, title, '\n\n'.join(parts)))

for i, (slug, title, body) in enumerate(entries, 1):
    (OUT / f'{slug}.md').write_text(
        f'---\ntitle: {yaml(title)}\ndescription: {yaml("Notes and starter code: " + title + ".")}\ntags: [sdev-2401, django]\nsidebar:\n  order: {i}\n---\n\n{body}\n')
print(len(entries), 'pages')
