var BOSH_SERVICE = '/xmpp-httpbind';
var connection = null;

// Debug only, removed.
var __JID = 'web@10.60.19.55';
var __PASSWORD = 'web';

function log(msg) 
{
  console.log(msg);
//    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
	log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
	log('Strophe failed to connect.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
	log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
	log('Strophe is disconnected.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
	log('Strophe is connected.');
	log('ECHOBOT: Send a message to ' + connection.jid + 
	    ' to talk to me.');

	connection.addHandler(onMessage, null, 'message', null, null,  null); 
	connection.send($pres().tree());
    }
}

function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
	var body = elems[0];

	log('ECHOBOT: I got a message from ' + from + ': ' + 
	    Strophe.getText(body));
    
	var reply = $msg({to: from, from: to, type: 'chat'})
            .cnode(Strophe.copyElement(body));
	connection.send(reply.tree());

	log('ECHOBOT: I sent ' + from + ': ' + Strophe.getText(body));
    }

    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}

function xmpp_init() {
  connection = new Strophe.Connection(BOSH_SERVICE);

  // Uncomment the following lines to spy on the wire traffic.
  //connection.rawInput = function (data) { log('RECV: ' + data); };
  //connection.rawOutput = function (data) { log('SEND: ' + data); };

  // Uncomment the following line to see all the debug output.
  //Strophe.log = function (level, msg) { log('LOG: ' + msg); };

  connection.connect(__JID, __PASSWORD, onConnect);

  //connection.disconnect();
}
