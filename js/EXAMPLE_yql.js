
function YQLQuery(query, callback) {
	var encodedQuery = encodeURIComponent(query);
	var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?'
	$.getJSON(url, null, callback)
}

function testYql() {
	console.log('x');
	var query = 'select * from answers.search where query="cars" and category_id=2115500137 and type="resolved"'
	YQLQuery(query, function processResults(data) {
		console.log(data.query.results)
	});
}

