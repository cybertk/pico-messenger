Ext.define('GS.controller.Login', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      login: 'login',
      titleBar: 'login titlebar',
      loginButton: 'login #loginButton',
      registerButton: 'login #registerButton'
    },

    control: {
      login: {
        show: 'onLoginShow'
      },
      loginButton: {
        tap: 'onLoginButtonTap'
      }
    }
  },

  xmppConnection: null,

  activeCred: null,

  onXmppConnect: function(status) {

    var me = GS.app.getController('Login'),
        titlebar = me.getTitleBar(),
        viewport = Ext.Viewport;

    if (status == Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {

      me.activeCred = null;
      viewport.setMasked(false);
      titlebar.setTitle('Ether username or password is wrong');

      console.log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
	    console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
      viewport.setMasked(false);
      me.activeCred = null;

      console.log('Strophe is disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {

	    me.xmppConnection.send($pres().tree());
	    //me.xmppConnection.addHandler(me.onXmppMessage, null, 'message', null, null,  null); 

      // Save credential persist.
      localStorage.setItem('account', JSON.stringify(me.activeCred));

      me.xmppConnection.jid = me.activeCred.username;
      me.getLogin().fireEvent('authenticated', me.xmppConnection);

      console.log('Strophe is connected. ' + me.activeCred.username);
    }
  },

  onLoginShow: function() {

    var me = this;

    // Fetch credential from localStorage.
    me.activeCred = JSON.parse(localStorage.getItem('account'));

    if (!me.activeCred) return;

    console.log('auto login with ' + me.activeCred.username);
    // Auto login.
    me.doLogin(me.activeCred);
  },

  onLoginButtonTap: function(btn) {

    var me = this,
        cred = me.getLogin().getValues();
    console.log(cred);

    if (cred.username != '' && cred.password != '') {
      me.doLogin(cred);
    }
  },

  doLogin: function(cred) {

    var me = this;

    // Disable UI to prevent interaction with users.
    //Ext.Viewport.setHidden(true);
    Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging in...'});

    // Save current credential.
    me.activeCred = { 
      username: cred.username,
      password: cred.password
    };

    me.xmppConnection = new Strophe.Connection(BOSH_SERVICE);
    me.xmppConnection.connect(cred.username, cred.password,
        me.onXmppConnect);
  },
});
