Ext.application({
    name: 'GS',

    requires: [
        'Ext.MessageBox'
    ],

    views: ['Main'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var history = Ext.create('Ext.List', {
          fullscreen: true,
          
          store: {
            fields: ['from', 'time', 'last_msg'],
            data: [
              {from:'caoxx', time:'now', last_msg:'he is sb'},
              {from:'xxcao', time:'now', last_msg:'he is sb'}
            ],
          },

          itemTpl: '<p>{from} {time}</p><p>{last_msg}</p>'

        });

        var navView = Ext.create("Ext.navigation.View", {
          //fullscreen: true,
          items: [
            {
              title: 'List',
              xtype: 'list',
              items: [
                {
                  store: {
                    fields: ['name'],
                    data: [
                      {name: '1'},
                      {name: '2'},
                      {name: '3'}
                    ]
                  },

                  itemTpl: '{name}'
                }
              ],
            }  
          ]
        });

        var listView = Ext.create('Ext.List', {
          store: {
            fields: ['name'],
            data: [
              {name: '1'},
              {name: '2'},
              {name: '3'}
            ]
          },

          itemTpl: '{name}'
        });

        //navView.push(listView);

        // Initialize the main view
        Ext.Viewport.add(Ext.create('GS.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
