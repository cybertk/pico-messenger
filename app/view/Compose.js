Ext.define('GS.view.Compose', {
  extend: 'Ext.form.Panel',
  xtype: 'compose',

  config: {
    title: 'Compose',

    layout: 'vbox',
    scrollable: false,

    items: [
      {
        xtype: 'textfield',
        name: 'peer',
        placeHolder: "Enter your friend's address"
      },
      {
        xtype: 'textareafield',
        name: 'text',
        placeHolder: "Text Message"
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
            text: '+'
          },
          { 
            xtype: 'button',
            text: 'Send',
            id: 'sendButton'
          }
        ]
      }
    ]
  }
});
