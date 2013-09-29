// YQL serves JSONP (with a callback) so all we have to do
// is create a script element with the right 'src':
/*
function YQLQuery(query, callback) {
    this.query = query;
    this.callback = callback || function(){};
    this.fetch = function() {
 
        if (!this.query || !this.callback) {
            throw new Error('YQLQuery.fetch(): Parameters may be undefined');
        }
 
        var scriptEl = document.createElement('script'),
            uid = 'yql' + +new Date(),
            encodedQuery = encodeURIComponent(this.query.toLowerCase()),
            instance = this;
 
        YQLQuery[uid] = function(json) {
            instance.callback(json);
            delete YQLQuery[uid];
            document.body.removeChild(scriptEl);
        };
 
        scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery + '&format=json&callback=YQLQuery.' + uid; 
        document.body.appendChild(scriptEl);
 
    };
}

function submit(event) {
	search(event.value);
}

function search(tags){
    var query = 'USE "http://myserver.com/mytables.xml" AS performance; SELECT * FROM performance WHERE tags="' + tags + '"';
    YQLQuery(query, function processResults(data) {
      var users = data.query.results;
      
    });
}
*/


function search2(form){
  var tags = form.tags;
  $('#desc').hide();
  $('#desc').attr('height','0px');
  
  // for each hit, append a section
  var json2 = window.fakejson;
  for (var i=0; i<json2.length; i++){
   $('<div/>', {
       class: 'res',
       id: 'user'+i,
       href: json2[i].html_url,
       rel: 'external',
       text: json2[i].login,
   }).appendTo('#results');
   var curr = document.getElementById('user'+i);
  }
return false;
}





