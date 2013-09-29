import re
import os
import sys

def filesByPattern(directory, matchFunc):
  for path,dirs,files in os.walk(directory):
    for f in filter(matchFunc, files):
      yield os.path.join(path, f)

def grab_imports(directory):
	javafiles = filesByPattern(directory, lambda fn: fn.endswith('.java'))
	imports = []
	for fname in javafiles:
	   with open(fname, 'r') as f:
	      text = f.read()
	      words = re.split(' |\t|\n|;',text)
	      for i in range(0,len(words)):
		word = words[i].strip()
		if word == "import":
		  val = words[i+1]
		  if(val == "static"):
		  	val = words[i+2]
		  if(val not in imports):
		  	imports.append(val)

	imports.sort()
	return imports

def crawl_users_dir(usersdir):
	s = "{"
	usernames = os.listdir(usersdir)
	for j in range(0, len(usernames)):
		username = usernames[j]
		s += "\"" + username + "\": ["
		imports = grab_imports(usersdir + "/" + username)
		for i in range(0, len(imports)):
			imp = imports[i]
			s += "\"" + imp + "\""
			if(i != len(imports)-1): s += ", "
		s += "]"
		if(j != len(usernames)-1): s += ", "
	s += "}"
	return s

usersdir = sys.argv[1]
outs = crawl_users_dir(usersdir)
with open(usersdir + "/" + "imports.data", "w") as outf:
	outf.write(outs)

#directory = sys.argv[1]
#imports = grab_imports(directory)
#with open(directory + "/" + "imports.info", "w") as outf:
#	for imp in imports:
#		outf.write(imp + "\n")
