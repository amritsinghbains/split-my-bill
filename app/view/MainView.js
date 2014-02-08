Ext.define('FriendsWithBenefits.view.MainView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainview',
	id: 'mainView',
	requires: [
        'FriendsWithBenefits.view.PersonList'
		//'Ext.MessageBox'
    ],
	show: function(){
		Ext.getCmp('personlist').getStore().load();
		if(localStorage.myName===undefined){
			localStorage.currency='₹';
			Ext.create('Ext.form.Panel', {
		        fullscreen: true,
		        height: 150,
				width: 300,
		        hidden: false,
		        id: 'welcome',
		        centered: true,
		        items: [
		            {
		                id: 'myName',
		                html: 'You need to be logged on to use this app'
		            },
		            {
		                xtype: 'button',
		                name: 'okButton',
		                text: 'OK',
		                ui: 'confirm',
		                width: 250,
		                hidden: true,
		                style: 'margin-top:20px;margin-left:20px;',
		                handler: function(){
		                	//your name comes here
							//TODO capitalize
							value = Ext.getCmp('myName')._value.trim();
							if(value.length<1){
									value="Me"
							}
							value = value.charAt(0).toUpperCase() + value.slice(1);
							localStorage.myName=value;
							var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
							db.transaction(function (tx) {
								tx.executeSql('CREATE TABLE IF NOT EXISTS dueInfo (name string unique, due int)');
								tx.executeSql('INSERT INTO dueInfo VALUES ("'+value+'",0)');
							});
							Ext.getCmp('personlist').getStore().add({
								name: value,
								due: 0
							});
							Ext.getCmp('welcome').hide();
		                }

		            }
		        ]
		    });
			
		}
		//load from websql
		var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
        db.transaction(function (tx) {
	        tx.executeSql('SELECT * from dueInfo', [], 
				function (tx, results) {
		            for (var i = 0; i < results.rows.length; i++){
		                //console.log(results.rows.item(i));
		                Ext.getCmp('personlist').getStore().add(results.rows.item(i));
		                
		            }
	            }
	        );
        });

	},
    config: {
    	layout:{
    		animation: false
    	},
    	navigationBar : {
		    docked : 'top',
		    items : [
		        {
		            text : 'New Event',
		            align : 'right',
		            ui: 'confirm',
		            handler: function(){
		            	console.log('New Event button pressed');
						Ext.getCmp('mainView').push(Ext.create('FriendsWithBenefits.view.MyContainer',{
							title: 'Add Event'
						}));
		            }
		        },{
		            
		            align : 'left',
		            iconCls: 'settings',
		            id: 'settings',
		            handler: function(){
		            	Ext.create('Ext.Panel', {
						    modal      : true,
						    centered   : true,
						    scrollable : false,
						    width      : 300,
						    height     : 150,
						    hideOnMaskTap : true,
						    layout     : {
						        type  : 'hbox',
						        align : 'stetch'
						    },
						    items      : [
						        {
						            xtype: 'fieldset',
						            title: 'Select Currency',
						            items: [
						                {
						                    xtype: 'selectfield',
						                    id:'currencySymbol',
						                    options: [
						                        {text: 'Rupee ₹',  value: '₹'},
						                        {text: 'Dollar $', value: '$'},
						                        {text: 'Euro €',  value: '€'},
						                        {text: 'Pound £',  value: '£'},
						                        {text: 'Yen ¥',  value: '¥'}
						                    ],
						                    listeners: {
						                    	change: function(amzRules, newValue, oldValue, eOpts ){
						                    		//console.log(newValue);
						                    		localStorage.currency=newValue;
						                    		Ext.getCmp('personlist').setItemTpl(new Ext.XTemplate(
												        	"<tpl if='name == localStorage.myName'>",
													        	 '<div>{name} (Me) </div>',
													        '</tpl>',
													        "<tpl if='name != localStorage.myName'>",
												            '<div>{name}<div align=right style="color:{[this.findColor(values.due)]};margin-top:-22px;margin-left:70%;"> ',
												            "<tpl if='localStorage.currency !== undefined'>",
													        	localStorage.currency,
													        '</tpl>',
												            ' {due}</div></div>',
												        	'</tpl>',
												        	{
													        	findColor: function(value){
																	if(value<0){
																		return "red";
																	}else{
																		return "green";
																	}
																}
															}
												        )
						                    		);

						                    	}
						                    }
						                }
						            ]
						        }
						    ]
						}).showBy(Ext.getCmp('settings'));
		            }
		        },{
		            
		            align : 'left',
		            iconCls: 'refresh',
		            id: 'refresh',
		            handler: function(){
		            	Ext.getCmp('mainView').show();
		            }
		        }
		    ]
		},
        itemId: 'mainView',
		items: [{
			xtype: 'personlist',
			title: 'Split My Bill'
		}]
    }

});