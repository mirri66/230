
function expand(btn){
  var currDiv = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
  var contact = currDiv.rows;
  $('#contact'+currDiv.id).fadeIn(200);
//  contactdiv.style.display='inline';

}

function search2(form) {
	var tags = form.tags.value;
	fetch_users_for_tags(tags, search_results);
}

function search_results(json2){
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
   cellname.setAttribute("width","45%");
   var cellnrow1 = document.createElement("tr");    
   var usename;
   if (json2[i].full_name == undefined){
     usename=json2[i].login;
   }else{
     usename=json2[i].full_name;
   }
   cellnrow1.innerHTML='<p class="namelabel">'+usename +'</p>';
   cellname.appendChild(cellnrow1);
   var cellnrow2 = document.createElement("tr");    
   cellnrow2.innerHTML='<p>Score: '+json2[i].score +'</p>';
   cellname.appendChild(cellnrow2);

   if (json2[i].languages!=undefined){
     var cellnrow2a = document.createElement("tr");    
     cellnrow2a.innerHTML='<p>Languages: '+json2[i].languages +'</p>';
     cellname.appendChild(cellnrow2a);
   }
 //  var cellnrow3 = document.createElement("tr");    
 //  cellnrow3.innerHTML='<button onclick="expand(this)">Contact</button>';
 //  cellname.appendChild(cellnrow3);
   row.appendChild(cellimg);
   row.appendChild(cellname);
   tb.appendChild(row);          
   var contactrow = document.createElement("td");
   contactrow.setAttribute("id",'contactuser'+i);
   contactrow.setAttribute("width","50%");
   var contactinfo='<img src=\'images/octocat.png\' width="30px"><a class="rescontact" href="'+json2[i].html_url+'">'+json2[i].login+'\'s github page</a><br>';
   if (json2[i].email !=undefined){
     contactinfo += '<br><img src="images/email.png" width="25px"><a class="rescontact" href="mailto:test@sdfsdfmail.com">&nbsp;&nbsp;Email '+usename+' </a>';
   }
//   contactrow.innerHTML='<a class="rescontact" href="'+json2[i].html_url+'">'+json2[i].login+'\'s github page</a><br>';
   contactrow.innerHTML=contactinfo;
   contactrow.style.color='black';
//   contactrow.style.display='none';
   var buffercol = document.createElement("td");
   buffercol.innerHTML='<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
   row.appendChild(buffercol);          
   row.appendChild(contactrow);          
   curr.appendChild(tb);
  }
$('#results').fadeIn(300);
$('#footer').css("display","none");
return false;
}





