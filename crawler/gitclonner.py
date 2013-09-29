from subprocess import check_call
import os

outdir = "../../230_data"

with open("github.user.to.repo.map",'r') as f:
	for line in f:
		line = line.strip()
		user, repo = line.split("\t")
		userdir = outdir + "/" + user
		if not (os.path.exists(userdir) and os.path.isdir(userdir)):
			print "mkdir " + userdir
			check_call(["mkdir", userdir])	
		base, ext = os.path.splitext(repo.split("/")[-1])		
		repodir = userdir + "/" + base		
		oldrepodir = base
		#check_call(["mv", oldrepodir, repodir])
		check_call(["git", "clone", repo, repodir])


