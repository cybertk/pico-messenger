Ext.create('Ext.data.Store', {
  model: 'Message',

  data: [
    {id: 1, session_id: 1, direction: 1, time:1, text: 'hi work'},
    {id: 2, session_id: 1, direction: 0, time:1, text: 'hi work'},
    {id: 3, session_id: 1, direction: 0, time:1, text: 'hi work'},
    {id: 4, session_id: 1, direction: 0, time:1, text: 'hi work'},
    {id: 5, session_id: 1, direction: 1, time:1, text: 'hi work'},
    {id: 6, session_id: 1, direction: 0, time:1, text: 'hi work'},
    {id: 7, session_id: 2, direction: 1, time:1, text: 'hi work'},
    {id: 8, session_id: 2, direction: 0, time:1, text: 'hi work'},
    {id: 9, session_id: 2, direction: 1, time:1, text: 'hi work'},
    {id: 10, session_id: 2, direction: 1, time:1, text: 'hi work'}
  ]
});
