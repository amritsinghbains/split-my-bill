Ext.define('FriendsWithBenefits.view.DetailPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.detailpanel',
	requires: [
        'Ext.XTemplate'
    ],
    initialize: function(){
        var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
        var summaryDisplayer='';
        db.transaction(function (tx) {
            tx.executeSql('SELECT * from summary', [], 
                function (tx, results) {

                    for (var i = 0; i < results.rows.length; i++){
                        if(results.rows.item(i).name.indexOf(Ext.getCmp('mainView').$currentTitle) != -1){
                            summaryDisplayer+=results.rows.item(i).name;
                        }
                        //console.log(Ext.getCmp('mainView').$currentTitle);
                    }
                    Ext.getCmp('summaryDisplay').setHtml(summaryDisplayer);
                }

            );
        });
        
    },
    config: {
        
        scrollable: true,
        centered: false,
        id: 'detailPanel',
        padding: 10,
        layout: {
            type: 'hbox',
            animation: false
        },
        tpl: [
            '<div style="font-size:25px">Due: ',
            "<tpl if='localStorage.currency !== undefined'>",
                localStorage.currency,
            '</tpl>',
            ' {due}</div>',{
                width: '25%'
            }
        ],
		items: [{
			xtype: 'label',
			html: 'No Events with this friend',
            id: 'summaryDisplay',
			margin: '0 0 0 0',
            width: '70%'
		}]
    }

});