#!/usr/bin/env python3
"""
Imports the SDEV1001 "Programming Fundamentals" repo into the docs site.

  python3 scripts/import-python-course.py /path/to/clone

Output:
  src/content/docs/getting-started/programming-fundamentals/<topic>/<unit>.md
  public/assets/programming-fundamentals/<unit>/...   (images used by READMEs)
  scripts/programming-fundamentals.sidebar.json       (read by astro.config.mjs)
Re-running overwrites generated pages.
"""
import json, re, shutil, sys
from pathlib import Path

SRC = Path(sys.argv[1]).resolve()
ROOT = Path(__file__).resolve().parent.parent
SECTION = 'programming-fundamentals'
OUT = ROOT / 'src/content/docs/getting-started' / SECTION
ASSETS = ROOT / 'public/assets' / SECTION

TOPICS = [  # (folder, label)
    ('Day 01 - Introduction', 'Day 01: Introduction'),
    ('Day 02 - Math and Data Types', 'Day 02: Math and Data Types'),
    ('Day 04 - Conditionals Part 1', 'Day 04: Conditionals, Part 1'),
    ('Day 05 - Conditionals Part 2', 'Day 05: Conditionals, Part 2'),
    ('Day 06 - Match Case', 'Day 06: Match Case'),
    ('Lists', 'Lists'),
    ('Debugging', 'Debugging'),
    ('Loops', 'Loops and Exceptions'),
    ('Functions', 'Functions and Modules'),
    ('Dictionaries', 'Dictionaries'),
    ('Files', 'Files and CSV'),
    ('Classes', 'Classes and Objects'),
    ('inheritance', 'Inheritance'),
    ('packages_and_virtual_environments', 'Packages, Jupyter and Flask'),
]
# Teaching order inside a topic (by unit base name). Unlisted units follow alphabetically; exercises last.
ORDER = [
    'hello-world-example', 'math_and_data_types', 'fundamental_if_statements', 'high_or_low', 'match_case_example',
    'introduction_to_lists', 'list_methods', 'lists_and_for_loops', 'debugging_intro',
    'intro loops', 'for_loops_with_range', 'while_loops_and_input', 'exceptions_intro',
    'modules_and_functions_intro', 'functions_with_parameters_intro', 'functions_more_concepts',
    'dictionary_fundamentals', 'read_and_write_fundamentals', 'csv_read_and_write',
    'course_example', 'library_example', 'first_pypi_example', 'second_pypi_example',
    'jupyter_pandas_fundamentals', 'jupyter_pandas_matplotlib_example', 'flask_fundamentals', 'flask_using_query_parameters',
]
SKIP_DIRS = {'__pycache__', 'tests_do_not_touch', 'test_do_not_touch', '.git', 'images', 'data', '.venv', 'venv'}
TEXT = {'.py': 'python', '.txt': 'text', '.md': 'md', '.json': 'json'}
SAFE_TAGS = {'details', 'summary', 'b', 'strong', 'em', 'i', 'br', 'p', 'code', 'kbd', 'img', 'a', 'ul', 'ol', 'li',
             'table', 'thead', 'tbody', 'tr', 'td', 'th', 'sup', 'sub', 'hr', 'blockquote', 'pre'}
SUFFIX = re.compile(r'[-_ ]?(start|end|complete)$', re.I)

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
def human(s):
    s = re.sub(r'[_\-]+', ' ', s).strip()
    words = [w if w.isupper() else w.capitalize() for w in s.split()]
    fix = {'Pypi': 'PyPI', 'Csv': 'CSV', 'Nhl': 'NHL', 'Ufo': 'UFO', 'Rps': 'RPS', 'Isp': 'ISP', 'Py': 'py', 'Flask': 'Flask', 'Api': 'API'}
    return ' '.join(fix.get(w, w) for w in words)
def yaml(s): return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'
def fence(t):
    n = max([len(m) for m in re.findall(r'`+', t)] + [2]) + 1
    return '`' * n

def outside_fences(md, fn):
    out, infence = [], None
    for line in md.split('\n'):
        m = re.match(r'^\s*(`{3,}|~{3,})', line)
        if m:
            tick = m.group(1)
            if infence is None: infence = tick
            elif tick[0] == infence[0] and len(tick) >= len(infence): infence = None
            out.append(line); continue
        out.append(line if infence else fn(line))
    return '\n'.join(out)

def clean_line(line):
    def esc(seg):
        return re.sub(r'<(/?)([A-Za-z][\w:-]*)([^>]*)>',
                      lambda m: m.group(0) if m.group(2).lower() in SAFE_TAGS else f'&lt;{m.group(1)}{m.group(2)}{m.group(3)}&gt;', seg)
    return '`'.join(esc(s) if i % 2 == 0 else s for i, s in enumerate(line.split('`')))

def strip_h1(md):
    lines = md.split('\n')
    for i, l in enumerate(lines):
        if l.startswith('# '): return l[2:].strip(), '\n'.join(lines[i + 1:]).lstrip('\n')
    return None, md

def slidev_to_md(text):
    """Convert a Slidev deck to plain Markdown sections."""
    segs, cur, infence = [], [], False
    for line in text.split('\n'):
        if re.match(r'^\s*(```|~~~)', line): infence = not infence
        if line.strip() == '---' and not infence:
            segs.append('\n'.join(cur)); cur = []
        else: cur.append(line)
    segs.append('\n'.join(cur))
    keyval = re.compile(r'^[A-Za-z_-]+:(\s.*)?$|^\s+\S.*$')
    slides = []
    for s in segs:
        lines = [l for l in s.split('\n') if l.strip()]
        if not lines: continue
        if all(keyval.match(l) for l in lines) and not any(l.lstrip().startswith(('#', '-', '`')) for l in lines): continue
        s = re.sub(r'<br\s*/?>', '', s)
        s = re.sub(r'</?v-clicks?[^>]*>', '', s)
        s = re.sub(r'\n{3,}', '\n\n', s).strip()
        if s: slides.append(s)
    body = '\n\n---\n\n'.join(slides)
    def demote(l):
        m = re.match(r'^(#{1,5}) ', l)
        return '#' + l if m else l
    return outside_fences(body, demote)

def notebook_to_md(path):
    nb = json.loads(path.read_text())
    out = []
    for c in nb.get('cells', []):
        src = ''.join(c.get('source', [])).rstrip()
        if not src: continue
        if c['cell_type'] == 'markdown':
            out.append(outside_fences(src, lambda l: re.sub(r'^(#{1,5}) ', r'#\1 ', l)))
        elif c['cell_type'] == 'code':
            f = fence(src); out.append(f'{f}python\n{src}\n{f}')
    return '\n\n'.join(out)

def code_blocks(d, base=None, heading_level='###'):
    base = base or d
    blocks = []
    for f in sorted(d.rglob('*')):
        if not f.is_file() or any(p in SKIP_DIRS or p == '__pycache__' for p in f.relative_to(d).parts[:-1]): continue
        if f.name.lower() == 'readme.md' or f.name == '__init__.py' and f.stat().st_size == 0: continue
        rel = f.relative_to(base).as_posix()
        if f.suffix == '.ipynb':
            blocks.append(f'{heading_level} `{rel}`\n\n' + notebook_to_md(f)); continue
        lang = TEXT.get(f.suffix) or ('text' if f.name == 'requirements.txt' else None)
        if not lang or f.stat().st_size > 60000: continue
        try: text = f.read_text().rstrip('\n')
        except UnicodeDecodeError: continue
        if not text.strip(): continue
        fc = fence(text)
        blocks.append(f'{heading_level} `{rel}`\n\n{fc}{lang} title="{rel}"\n{text}\n{fc}')
    return blocks

def sort_key(base):
    b = base.lower()
    if b in ORDER: return (0, ORDER.index(b), b)
    return (2 if 'exercise' in b else 1, 0, b)

# ---------------- build ----------------
shutil.rmtree(OUT, ignore_errors=True); shutil.rmtree(ASSETS, ignore_errors=True)
OUT.mkdir(parents=True); ASSETS.mkdir(parents=True)
sidebar, stats = [], {'pages': 0}

def write_page(topic_slug, name, title, desc, body, order):
    p = OUT / topic_slug; p.mkdir(exist_ok=True)
    fn = slug(name) + '.md'
    n = 2
    while (p / fn).exists(): fn = f'{slug(name)}-{n}.md'; n += 1
    (p / fn).write_text(f'---\ntitle: {yaml(title)}\ndescription: {yaml(desc)}\ntags: [python]\nsidebar:\n  order: {order}\n---\n\n{body}\n')
    stats['pages'] += 1

def collect_units(topic_dir):
    """Return {base: {'start': Path, 'end': Path, 'plain': Path}} for unit directories (flattening containers)."""
    units = {}
    def visit(d):
        for sub in sorted(x for x in d.iterdir() if x.is_dir() and x.name not in SKIP_DIRS and x.name != 'slide_builds'):
            m = SUFFIX.search(sub.name)
            if m:
                units.setdefault(SUFFIX.sub('', sub.name), {})['start' if m.group(1).lower() == 'start' else 'end'] = sub
            elif any(c.is_dir() and SUFFIX.search(c.name) for c in sub.iterdir()):
                visit(sub)                                  # container such as intro_to_flask/
            else:
                units.setdefault(sub.name, {})['plain'] = sub
    visit(topic_dir)
    return units

def copy_images(unit_dir, unit_slug):
    img = unit_dir / 'images'
    if img.is_dir():
        dst = ASSETS / unit_slug; dst.mkdir(parents=True, exist_ok=True)
        for f in img.iterdir(): shutil.copy(f, dst / f.name)
        return True
    return False

for folder, label in TOPICS:
    tdir = SRC / folder
    if not tdir.is_dir(): continue
    tslug = slug(label)
    entries = []   # (sort tuple, name, title, desc, body)
    for base, v in collect_units(tdir).items():
        main = v.get('end') or v.get('plain') or v.get('start')
        readme_dir = next((d for d in (v.get('end'), v.get('plain'), v.get('start')) if d and (d / 'readme.md').exists() or d and (d / 'README.md').exists()), None)
        title = human(base)
        parts = []
        if readme_dir:
            rf = next(readme_dir.glob('[Rr][Ee][Aa][Dd][Mm][Ee].md'))
            h1, body = strip_h1(rf.read_text())
            if h1: title = h1
            uslug = slug(base)
            if copy_images(readme_dir, uslug):
                body = re.sub(r'\]\((?:\./)?images/([^)]+)\)', rf']({"/assets/" + SECTION}/{uslug}/\1)', body)
            parts.append(outside_fences(body, clean_line))
        blocks = code_blocks(main)
        if blocks:
            kind = 'Completed code' if (v.get('end') and v.get('start')) or v.get('end') else ('Code' if v.get('plain') else 'Starter code')
            note = {'Completed code': 'The completed files for this lesson, with the instructor comments included.',
                    'Code': 'The source files for this lesson, with the instructor comments included.',
                    'Starter code': 'The starter files for this lesson.'}[kind]
            parts.append(f'## {kind}\n\n{note}\n\n' + '\n\n'.join(blocks))
        if parts:
            entries.append((sort_key(base), base, title, f'Notes and code: {title}.', '\n\n'.join(parts)))
    # loose files at the topic level
    for f in sorted(tdir.glob('*')):
        if f.is_file() and f.suffix == '.py':
            text = f.read_text().rstrip('\n'); fc = fence(text)
            entries.append(((1, 5, f.stem), f.stem, human(f.stem), f'Code: {human(f.stem)}.',
                            f'## Code\n\nThe source file, with the instructor comments included.\n\n{fc}python title="{f.name}"\n{text}\n{fc}'))
    # slide decks
    for f in sorted((tdir / 'slide_builds').glob('*.md')) if (tdir / 'slide_builds').is_dir() else []:
        entries.append(((3, 0, f.stem), 'slides-' + f.stem, 'Slides: ' + human(f.stem), f'Lecture slides: {human(f.stem)}.',
                        outside_fences(slidev_to_md(f.read_text()), clean_line)))
    # Day-folder hello world has only a README; ensure at least a page exists per topic
    entries.sort(key=lambda e: e[0])
    for i, (_, name, title, desc, body) in enumerate(entries, 1):
        write_page(tslug, name, title, desc, body, i)
    if entries:
        sidebar.append({'label': label, 'dir': f'getting-started/{SECTION}/{tslug}'})

(ROOT / 'scripts/programming-fundamentals.sidebar.json').write_text(json.dumps(sidebar, indent=2) + '\n')
print(stats['pages'], 'pages in', len(sidebar), 'topics')
