#!/usr/bin/env python3
"""
Imports a course workbook repo into the docs site.

  python3 scripts/import-workbook.py /path/to/workbook-clone

Writes Markdown to src/content/docs/getting-started/frontend-development/
  lessons/   one page per lesson: README (taught content) + the lesson's
             commented source files
  resources/ one page per file in the workbook's Resources/ folder
Re-running overwrites the generated pages.
"""
import re, sys, shutil
from pathlib import Path

SRC = Path(sys.argv[1]).resolve()
ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'src/content/docs/getting-started/frontend-development'
URL = '/getting-started/frontend-development'

TOPICS = {
 '02': 'Git, GitHub, Node.js and Vite',
 '03': 'Intro to JavaScript',
 '04': 'Conditionals and Loops',
 '05': 'DOM Selection and Manipulation',
 '06': 'DOM Relationships and Timers',
 '08': 'Events',
 '09': 'Event Propagation and Delegation',
 '10': 'Forms and Submission',
 '11': 'Form Validation',
 '13': 'npm Packages and Scripts',
 '14': 'Modules and Imports',
 '15': 'REST APIs and JSON Server',
 '16': 'Fetching Data from an API',
 '18': 'CRUD with an API',
 '19': 'Web Components: Templates and Shadow DOM',
 '20': 'Web Components: Styling',
 '21': 'Web Components: Custom Events',
 '23': 'Web Components: Lifecycle and Properties',
 '24': 'Testing with Vitest',
 '25': 'Debugging Walkthrough',
 '26': 'Browser DevTools',
 '27': 'Building and Deploying',
}
LANG = {'.js': 'js', '.mjs': 'js', '.html': 'html', '.css': 'css', '.json': 'json', '.http': 'http', '.md': 'md'}
CODE_DIRS = ['src', 'public/css', '__test__', '__tests__']
CODE_TOP = ['index.html', 'main.js', 'db.json', 'requests.http', 'vitest.config.js']

def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

def fence(text):
    n = max([len(m) for m in re.findall(r'`+', text)] + [2]) + 1
    return '`' * n

def yaml(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

def fix_links(md, res_slugs):
    """Rewrite ./FILE.md links to site routes, outside code fences only."""
    out, infence = [], None
    for line in md.split('\n'):
        m = re.match(r'^\s*(`{3,}|~{3,})', line)
        if m:
            if infence is None: infence = m.group(1)[0] * len(m.group(1))
            elif m.group(1).startswith(infence) and len(m.group(1)) >= len(infence): infence = None
        elif infence is None:
            def r(mm):
                f, anchor = mm.group(1), mm.group(2) or ''
                s = slug(Path(f).stem)
                return f']({URL}/resources/{s}/{anchor})' if s in res_slugs else mm.group(0)
            line = re.sub(r'\]\((?:\./)?([A-Za-z0-9_-]+\.md)(#[^)]*)?\)', r, line)
            # Escape bare custom/unknown tags so the browser doesn't swallow them (keep inline code intact).
            line = '`'.join(
                (re.sub(r'<(/?)(user-card|slot|main)\b([^>]*)>', lambda m: f'&lt;{m.group(1)}{m.group(2)}{m.group(3)}&gt;', seg) if i % 2 == 0 else seg)
                for i, seg in enumerate(line.split('`')))
            line = re.sub(r'\]\(assets/([^)]+)\)', rf'](/assets/frontend-development/\1)', line)
        out.append(line)
    return '\n'.join(out)

def strip_h1(md):
    lines = md.split('\n')
    for i, l in enumerate(lines):
        if l.startswith('# '):
            return l[2:].strip(), '\n'.join(lines[i + 1:]).lstrip('\n')
    return None, md

# ---------- resources ----------
res_files = sorted((SRC / 'Resources').glob('*.md'))
res_slugs = {slug(f.stem) for f in res_files}
rdir = BASE / 'resources'; ldir = BASE / 'lessons'
for d in (rdir, ldir):
    shutil.rmtree(d, ignore_errors=True); d.mkdir(parents=True)
for f in res_files:
    title, body = strip_h1(f.read_text())
    title = title or f.stem
    (rdir / f'{slug(f.stem)}.md').write_text(
        f'---\ntitle: {yaml(title)}\ndescription: {yaml("Course resource: " + title)}\n---\n\n{fix_links(body, res_slugs)}\n')

# ---------- lessons ----------
n_lessons = 0
for d in sorted(SRC.glob('lesson-*')):
    num = re.match(r'lesson-(\d+)', d.name).group(1)
    _, body = strip_h1((d / 'README.md').read_text())
    topic = TOPICS.get(num, '')
    title = f'Lesson {num}: {topic}' if topic else f'Lesson {num}'
    parts = [f'---\ntitle: {yaml(title)}\ndescription: {yaml("Notes and commented code from lesson " + num + ".")}\ntags: [frontend, lesson-{num}]\nsidebar:\n  order: {int(num)}\n---\n', fix_links(body, res_slugs)]

    extra = d / 'EXERCISE.md'
    if extra.exists():
        _, eb = strip_h1(extra.read_text())
        eb = re.sub(r'^(#+) ', lambda m: '#' + m.group(1) + ' ', eb, flags=re.M)  # demote headings; fences rarely start with '#'
        parts.append('## Exercise\n\n' + fix_links(eb, res_slugs))

    files = []
    for t in CODE_TOP:
        if (d / t).is_file(): files.append(d / t)
    for sub in CODE_DIRS:
        p = d / sub
        if p.is_dir():
            files += sorted(x for x in p.rglob('*') if x.is_file() and x.suffix in LANG)
    seen, blocks = set(), []
    for f in files:
        if f in seen: continue
        seen.add(f)
        text = f.read_text().rstrip('\n')
        rel = f.relative_to(d).as_posix()
        fc = fence(text)
        blocks.append(f'### `{rel}`\n\n{fc}{LANG[f.suffix]} title="{rel}"\n{text}\n{fc}\n')
    if blocks:
        parts.append('## Lesson Code\n\nThe complete source files for this lesson, with the instructor comments included.\n\n' + '\n'.join(blocks))
    (ldir / f'lesson-{num}.md').write_text('\n\n'.join(parts) + '\n')
    n_lessons += 1

# lesson-15 screenshot
a = SRC / 'lesson-15-starter/assets'
if a.is_dir():
    dst = ROOT / 'public/assets/frontend-development'; dst.mkdir(parents=True, exist_ok=True)
    for f in a.iterdir(): shutil.copy(f, dst / f.name)
print(f'{n_lessons} lessons, {len(res_files)} resources')
