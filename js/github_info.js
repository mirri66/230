
function YQLQuery(query, callback) {
	var encodedQuery = encodeURIComponent(query);
	var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?'
	$.getJSON(url, null, callback)
}

function testYql(user, callback) {
	var query = 'select * from github.users where user="'+user+'"'
	YQLQuery(query, function processResults(data) {
		callback(data.query.results)
	});
}

