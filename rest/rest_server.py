from flask import Flask
from flask.ext import restful
from flask.ext.restful import reqparse

data = { 'lazaro' : [ 'android.x', 'android.y', 'java' ],
         'benj' : [ 'java.x', 'java.android' ],
	 'grace' : ['android.c'] } 

tags = { 'android' : [ 'android', 'com.android' ],
         'java' : ['java', 'javax', 'com.sun', 'sun'] }

app = Flask(__name__)
api = restful.Api(app)

class RestServer(restful.Resource):
    def get(self):
    	parser = reqparse.RequestParser()
	parser.add_argument('tags', type=str, dest='tags', required=True)
	args = parser.parse_args()
	tag_str = args['tags']
	tags = tag_str.split(',')
        return getUsersByScore(tags) 
	    
api.add_resource(RestServer, '/')

class GetTags(restful.Resource):
	def get(self):
		return tags.keys()

api.add_resource(GetTags, '/tags')

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
