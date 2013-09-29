import re
import os
import sys

def filesByPattern(directory, matchFunc):
  for path,dirs,files in os.walk(directory):
    for f in filter(matchFunc, files):
      yield os.path.join(path, f)

directory = sys.argv[1]
javafiles = filesByPattern(directory, lambda fn: fn.endswith('.java'))

for fname in javafiles:
   with open(fname, 'r') as f:
      imports = []
      text = f.read()
      words = re.split(' |\t|\n|;',text)
      for i in range(0,len(words)):
	word = words[i].strip()
	if word == "import":
	  if(words[i+1] != "static"):
	  	imports.append(words[i+1])
	  else:
		imports.append(words[i+2])
      if(len(imports) > 0): print imports
