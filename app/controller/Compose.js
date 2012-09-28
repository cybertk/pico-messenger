Ext.define('GS.controller.Compose', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      compose: 'compose',
      sendButton: 'compose #sendButton',
    },

    control: {
      sendButton: {
        tap: 'onSendButtonTap'
      }
    }
  },

  onSendButtonTap: function(btn) {
    var me = this,
        compose = me.getCompose(),
        message = me.getCompose().getValues();

    console.log(message);

    //compose.fireEvent('send', { peer: message.peer, text: message.text });
    compose.fireEvent('send', message);
    //me.getCompose().mask();
  },

});
