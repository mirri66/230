var https = require('https');

var client = https.createClient(80, "google.com");
request = client.request();
request.on('response', function( res ) {
    res.on('data', function( data ) {
        console.log( data.toString() );
    } );
} );
request.end();
