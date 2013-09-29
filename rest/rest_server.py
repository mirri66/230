from flask import Flask
from flask.ext import restful
from flask.ext.restful import reqparse
import json

with open('github.users.extra.out') as f:
	users = json.loads(f.read())

with open('imports.data') as f:
	data = json.loads(f.read())

tags = { 'android' : [ 'android', 'com.android' ],
         'java' : ['java', 'javax', 'com.sun', 'sun'] }

app = Flask(__name__)
api = restful.Api(app)

def getUserResultsForTags(tags):
	for user in getUsersByScore(tags):
		score = getUserScore(tags, user)
		if score > 0:
			resultUser = getUserInfo(user).copy()
			resultUser['score'] = score
			yield resultUser

class RestServer(restful.Resource):
    def get(self):
    	parser = reqparse.RequestParser()
	parser.add_argument('tags', type=str, dest='tags', required=True)
	args = parser.parse_args()
	tag_str = args['tags']
	tags = tag_str.split(',')
	return list(getUserResultsForTags(tags))
	    
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

def getUserInfo(username):
	for user in users:
		if user['login'] == username:
			return user
	raise Exception('User: %s not found' % username)

if __name__ == '__main__':
	app.run(debug=True,port=8080,host="0.0.0.0")
