from os import walk

def build(name, version, repo, license, dir, forceBefore=[], forceAfter=[], minify=True):
  header = f'''// {name} v{version}
// Github {repo}
// {license} License
'''
  forceNewline = ['class', 'function', 'var', 'let', 'static']
  data = {}
  for path, dirs, files in walk(dir):
    for file in files:
      id = file.split('.')[0]
      data[id] = open(f'{dir}/{file}', 'r', encoding='utf-8').read()
  source = ''
  for id in forceBefore: source += data[id]
  for id in data.keys():
    if id not in forceBefore+forceAfter: source += data[id]
  for id in forceAfter: source += data[id]

  if minify:
    source = source.replace('\n\n', '\n')
    clean = ''
    for line in source.split('\n'):
      for word in forceNewline:
        if line.startswith(word) and not clean.endswith('\n'): clean += '\n'
      if '//' in line: line = line.split('//')[0]
      clean += line
    source = header + clean + '\n'
    while '  ' in source: source = source.replace('  ', ' ')
  return source

if __name__ == '__main__':
  name = 'Domi.js'
  version = '1.0.0'
  repo = 'https://github.com/Jakub21/Domi.js'
  license = 'MIT'
  dir = './source'
  forceBefore = ['ShpMethods']
  forceAfter = ['AnimatedSwitcher', 'AnimatedNestedSwitcher']
  minify = False
  source = build(name, version, repo, license, dir, forceBefore, forceAfter, minify)
  open(name, 'w', newline='\n').write(source)
