import urllib
import re


def fetch_github_page(username):
	response = urllib.urlopen('http://www.github.com/%s' % username)
	return response.read()

def fetch_user_field_by_icon(html, icon):
	return re.search(r'<dt>\s*<span\s*class="[^"]*?%s[^"]*">\s*</span>\s*</dt>\s*<dd>(.*?)</dd>' % icon, html, re.MULTILINE | re.DOTALL).group(1)

def fetch_important_field_values(html):
	fields = {'email' : 'octicon-mail', 'location' : 'octicon-location', 'organization' : 'octicon-organization', 'homepage' : 'octicon-link', 'languages' : 'octicon-code'}	
	results = {}
	for fieldName in fields.keys():
		try:
			results[fieldName] = fetch_user_field_by_icon(html, fields[fieldName])
		except:
			pass
	return results

def fetch_name(html):
	return re.search('<span itemprop="name">(.*?)</span>', html).group(1)

def fetch_user_info_from_page(html):
	data = fetch_important_field_values(html)
	data['full-name'] = fetch_name(html)
	return data

def fetch_user_info(user):
	html = fetch_github_page(user)
	return fetch_user_info_from_page(html)

