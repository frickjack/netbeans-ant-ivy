/**
 * Little phantomjs script that opens a list of urls given
 * in the first argument as a comma-separated list.
 * Intended for running YUI test suites that callback to
 * phantom at test completion via:
 *    
 *    <pre>
 *       if ( typeof( window.callPhantom ) != 'undefined' ) {
 *           // phantomjs environment!
 *           console.log( "Phantomjs detected!" );
 *           Y.Test.Runner.subscribe( Y.Test.Runner.COMPLETE_EVENT, window.callPhantom );
 *       }
 *
 *    </pre>
 */

var system = require( 'system' );

if ( (system.args.length < 2) || system.args[1].match( /^-+/ ) ) {
    // use comma-separated list - easier to integrate with ant that way
    console.log( "script takes exactly one argument: a comma-separated list of test urls" );
    phantom.exit(1);
}

var urlList = system.args[1].split( /,+/ );
/*
for ( var i = 1; i < system.args.length; ++i ) {
    urlList.push( system.args[i] );
}
*/

var resultList = [];
var currentTest = 0;

var page = require( 'webpage' ).create();
page.onConsoleMessage = function(msg) { console.log( msg ); };

function runTest( url ) {
  page.open( url,
     function( status ) { 
         console.log( url + " status: " + status ); 
         if ( status != "success" ) {
             phantom.exit(1);
         } 
         page.evaluate( function() { console.log( "page location: " + window.location.href ); } );
     }
 );    
}

page.onCallback = function( testResult ) {
    resultList.push( testResult );
    currentTest += 1;
    if ( currentTest < urlList.length ) {
        runTest( urlList[currentTest] );
    } else {
        console.log( "-------------------------------------------------------------" );
        console.log( "-------------------------------------------------------------" );
        console.log( resultList.length + " Tests complete: " );
        console.log( JSON.stringify( resultList ) );
        phantom.exit( 0 );
    }
};


runTest( urlList[0] );


