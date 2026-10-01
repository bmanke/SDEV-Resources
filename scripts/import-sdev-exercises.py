#!/usr/bin/env python3
"""
Imports SDEV2501 exercise notes into Guides > SDEV-2150 Intermediate Frontend > Exercises.

  python3 scripts/import-sdev-exercises.py /path/to/SDEV-Resources
"""
import re, sys, shutil
from pathlib import Path

SRC = Path(sys.argv[1]).resolve() / 'SDEV2501-Exercises-Notes'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src/content/docs/sdev-2150-intermediate-frontend/exercises'
shutil.rmtree(OUT, ignore_errors=True); OUT.mkdir(parents=True)

def fence(t): return '`' * (max([len(m) for m in re.findall(r'`+', t)] + [2]) + 1)
def block(path, label):
    t = path.read_text().rstrip('\n'); f = fence(t)
    lang = {'.js': 'js', '.html': 'html', '.css': 'css'}[path.suffix]
    return f'### `{label}`\n\n{f}{lang} title="{label}"\n{t}\n{f}'
def page(name, title, desc, order, body):
    (OUT / f'{name}.md').write_text(f'---\ntitle: "{title}"\ndescription: "{desc}"\nsidebar:\n  order: {order}\ntags: [sdev-2150, exercises]\n---\n\n{body}\n')

# ---- Lesson 06 ----
L6 = SRC / 'Lesson 06 Exercises'
readme = (L6 / 'ReadMe.md').read_text()
intro, *sections = re.split(r'^## (?=Exercise \d+:)', readme, flags=re.M)
intro = re.sub(r'^# .*\n+', '', intro).strip()
secs = {int(re.match(r'Exercise (\d+)', s).group(1)): s for s in sections}
dirs = {int(re.match(r'exercise-(\d+)', d.name).group(1)): d for d in L6.iterdir() if d.is_dir()}

page('lesson-06-overview', 'Lesson 06: Async and Components Exercises', 'Overview of the Lesson 06 exercises.', 1,
     intro + '\n\n## Exercises\n\n' + '\n'.join(f'- [Exercise {n}](/sdev-2150-intermediate-frontend/exercises/lesson-06-exercise-{n}/): ' + re.match(r'Exercise \d+: (.*)', secs[n]).group(1) for n in sorted(secs)))

for n in sorted(secs):
    head, _, rest = secs[n].partition('\n')
    title = f'Lesson 06, Exercise {n}: ' + head.split(':', 1)[1].strip()
    rest = re.sub(r'^###', '###', rest.strip(), flags=re.M)
    d = dirs[n]
    code = block(d / 'src/main.js', 'src/main.js') + '\n\n' + block(d / 'index.html', 'index.html')
    page(f'lesson-06-exercise-{n}', title, f'Instructions and commented starter code for {title}.', 1 + n,
         f'{rest}\n\n## Code\n\nThe project is a Vite app. `src/style.css` is the same shared stylesheet in all four exercises, so it is not repeated here.\n\n{code}')

# ---- Task list exercise ----
page('task-list', 'Task List (Exercise 01)', 'Commented TODO steps for a DOM task list exercise.', 10,
     'Step-by-step comments for building a task list with the DOM: add, complete and delete tasks.\n\n' + block(SRC / 'exercise-01-main.js', 'exercise-01-main.js'))
print('wrote', len(list(OUT.glob('*.md'))), 'pages')
