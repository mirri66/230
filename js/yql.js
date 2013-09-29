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

function expand(btn){
  var currTable = btn.parentNode.parentNode.parentNode.parentNode;
  var contact = currTable.rows;
  var contactdiv = currTable.querySelector("#contact");
//  alert(contactdiv.innerHTML);
  contactdiv.style.color='black';
}

function search2(form){
  var tags = form.tags;
  $('#desc').hide();
  $('#desc').attr('height','0px');
  
  $('#results').html('');
  $('#results').css("display","none");

  // for each hit, append a section
  var json2 = window.fakejson;
  for (var i=0; i<json2.length; i++){
   $('<div/>', {
       class: 'res',
       id: 'user'+i,
   }).appendTo('#results');
   var curr = document.getElementById('user'+i);
   var tb = document.createElement("table");
   var row = document.createElement("tr");
   var cellimg = document.createElement("td");    
   cellimg.innerHTML='<img src="'+ json2[i].avatar_url +'">';
   var cellname = document.createElement("td");    
   var cellnrow1 = document.createElement("tr");    
   cellnrow1.innerHTML='<p class="namelabel">'+json2[i].login +'</p>';
   cellname.appendChild(cellnrow1);
   var cellnrow2 = document.createElement("tr");    
   cellnrow2.innerHTML='<p>Score: '+json2[i].score +'</p>';
   cellname.appendChild(cellnrow2);
   var cellnrow3 = document.createElement("tr");    
   cellnrow3.innerHTML='<button onclick="expand(this)">Contact</button>';
   cellname.appendChild(cellnrow3);
   row.appendChild(cellimg);
   row.appendChild(cellname);
   tb.appendChild(row);          
   var contactrow = document.createElement("td");
   contactrow.setAttribute("id","contact");
   contactrow.innerHTML='<a href="'+json2[i].html_url+'">'+json2[i].login+'\'s github page</a>';
   row.appendChild(contactrow);          
   curr.appendChild(tb);
  }
$('#results').fadeIn(300);
$('#footer').css("display","none");
return false;
}





