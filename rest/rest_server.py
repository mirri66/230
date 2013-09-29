from flask import Flask
from flask.ext import restful

data = { 'lazaro' : [ 'android.x', 'android.y', 'java' ],
         'benj' : [ 'java.x', 'java.android' ],
	 'grace' : ['android.c'] } 

tags = { 'android' : [ 'android', 'com.android' ],
         'java' : ['java', 'javax', 'com.sun', 'sun'] }

app = Flask(__name__)
api = restful.Api(app)

class RestServer(restful.Resource):
    def get(self):
            return getUsersByScore(['android']) 
	    
api.add_resource(RestServer, '/')

def getUserScore(specifiedTags, user):
	score = 0
	for  tag in specifiedTags:
		for tagImport in tags[tag]:
			for userImport in data[user]:
				if userImport.startswith(tagImport):
					score = score + 1
	return score

def getUsersByScore(tags):
	return sorted(data, key=lambda u: -getUserScore(tags, u))

if __name__ == '__main__':
	app.run(debug=True)
