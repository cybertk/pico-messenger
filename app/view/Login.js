Ext.define('GS.view.Login', {
  extend: 'Ext.form.Panel',
  xtype: 'login',

  config: {
    title: 'Login',

    layout: 'vbox',
    scrollable: false,

    items: [
      {
        xtype: 'textfield',
        name: 'username',
        placeHolder: "Enter your username here"
      },
      {
        xtype: 'passwordfield',
        name: 'password',
        placeHolder: "Enter your password here"
      },
      {
        xtype: 'toolbar',
        layout: {
          type: 'hbox',
          align: 'center',
          pack: 'end'
        },

        items: [
          {
            xtype: 'button',
            text: 'Login',
            width: '5em',
            id: 'loginButton'
          },
          {
            xtype: 'button',
            text: 'Register',
            width: '5em',
            id: 'registerButton'
          }
        ]
      }
    ]
  }
});
