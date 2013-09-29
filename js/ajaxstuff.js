var server_href = 'http://ec2-54-214-196-171.us-west-2.compute.amazonaws.com:8081';

var fetch_tags = function(callback) {
	var tags_url = server_href + '/tags';
	return $.getJSON(tags_url, callback)
}

var fetch_users_for_tags = function(tags, callback) {
	var url = server_href + '?tags=' + tags;
	return $.getJSON(url, callback)
}
