Ext.define('GS.controller.Login', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      login: 'login',
      loginButton: 'login #loginButton',
      registerButton: 'login #registerButton'
    },

    control: {
      loginButton: {
        tap: 'onLoginButtonTap'
      }
    }
  },

  onLoginButtonTap: function(btn) {

    var me = this,
        cred = me.getLogin().getValues();
    console.log(cred);

    if (cred.username != '' && cred.password != '') {

      me.getLogin().fireEvent('login',
          { username: cred.username, password: cred.password });
    }
  }
});
