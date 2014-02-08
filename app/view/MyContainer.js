Ext.define('FriendsWithBenefits.view.MyContainer', {
    extend: 'Ext.Container',
	id: 'newEvent',
	requires: ['Ext.MessageBox'],
	addFriend: function(){
		Ext.create('Ext.form.Panel', {
	        fullscreen: true,
	        height: 300,
			width: 300,
	        hidden: false,
	        fullscreen: true,
	        hideOnMaskTap: true,
	        id: 'addFriendPanel',
	        centered: true,
	        padding: '10px',
	        items: [
	            {
	                xtype: 'textfield',
	                name: 'name',
	                label: 'Name',
	                id: 'friendName',
	                style: 'margin-top:60px;',
					placeHolder: 'Enter friend\'s name' 
	            },
	            {
	                xtype: 'button',
	                name: 'okButton',
	                text: 'OK',
	                ui: 'confirm',
	                width: 250,
	                style: 'margin-top:20px;margin-left:10px;',
	                handler: function(){
	                	var value = Ext.getCmp('friendName')._value.trim();
						if(value.length<1){
							return 1;
						}
						value = value.charAt(0).toUpperCase() + value.slice(1);
						var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
						db.transaction(function (tx) {
							tx.executeSql('CREATE TABLE IF NOT EXISTS dueInfo (name string unique, due int)');
							tx.executeSql('INSERT INTO dueInfo VALUES ("'+value+'",0)');
						});
						Ext.getCmp('personlist').getStore().add({
							name: value,
							due: 0
						});	
						Ext.getCmp('addFriendPanel').hide();

	                }

	            },
	            {
	            	xtype: 'button',
	                name: 'cancelButton',
	                text: 'Cancel',
	                ui: 'confirm',
	                width: 250,
	                style: 'margin-top:10px;margin-left:10px;',
	                handler: function(){
	                	Ext.getCmp('addFriendPanel').hide();
	                }
	            }
	        ]
	    });
	},
	config: {
		layout:{
    		animation: false
    	},
        items: [
            
            {
                xtype: 'formpanel'
            },
            {
                xtype: 'textfield',
                label: 'Name of Event',
                labelWidth: '45%',
                id: 'nameOfEvent'
            },
            {
                xtype: 'numberfield',
                label: 'Total Bill',
                labelWidth: '45%',
                id: 'totalBill'
            },{
				layout: 'hbox',
				height: '10%',
				width: '100%',
				items: [{
					height: '10%',
					width: '49%',
					xtype: 'label',
					html: 'Who Paid',
					id: 'whoPaid',
					padding: '10px'
				},
				{
					height: '10%',
					width: '49%',
					xtype: 'label',
					html: '<div align=right>Paid For</div>',
					id: 'paidFor',
					padding: '10px',
				}]
			},
			{
				layout: 'hbox',
				height: '100%',
				width: '100%',
				items: [{
					xtype: 'list',
					id: 'whoPaidList',
					height: '60%',
					width: '49%',
					padding: '10px',
					emptyText: 'Loading your favourite friends..',
					mode: 'MULTI',
					store: 'People',
					grouped: true,
					itemTpl: [
						'<div>{name}</div>'
					]
				},{
					margin: '0 0 0 10px',
					xtype: 'list',
					id: 'paidForList',
					height: '60%',
					width: '49%',
					padding: '10px',
					emptyText: 'Loading your favourite friends..',
					mode: 'MULTI',
					store: 'People',
					grouped: true,
					itemTpl: [
						'<div>{name}</div>'
					]
				}]
			},{
				layout: 'hbox',
				height: '20%',
				width: '100%',
				docked: 'bottom',
				items: [{
					xtype: 'button',
					ui: 'confirm',
					text: 'Add Friend',
					height: '20%',
					width: '49%',
					handler: function(){
						if(Ext.getCmp('addFriendPanel')===undefined){
							Ext.getCmp('newEvent').addFriend();
						}else{
							Ext.getCmp('addFriendPanel').show();
						}
						

					}
				},
				{
					margin: '0 0 0 10px',
					xtype: 'button',
					ui: 'confirm',
					text: 'Submit',
					width: '49%',
					height: '20%',
					handler: function(){
						//This is the ultimate show
						//get all selected - Ext.getCmp('whoPaidList').getSelection();
						
						//check for inserted data
						if(Ext.getCmp('nameOfEvent')._value.length<1 || Ext.getCmp('totalBill')._value.length<1){

							return 1;
						}
						if(Ext.getCmp('whoPaidList').getSelection().length<1 || Ext.getCmp('paidForList').getSelection()<1){

							return 1;
						}
						console.log('Correct Info Submitted');

						//calculate the case no

						var whoPaidLength=Ext.getCmp('whoPaidList').getSelection().length;
						var paidForLength=Ext.getCmp('paidForList').getSelection().length;	
						var i=0;
						var whoPaidFlag=0;
						var eventSummary1='';
						var eventSummary2='';
						
						while(i<whoPaidLength){
							if(Ext.getCmp('whoPaidList').getSelection()[i].data.name===localStorage.myName){
								whoPaidFlag=1;
							}
							eventSummary1+=Ext.getCmp('whoPaidList').getSelection()[i].data.name+', ';
							i++;
						}
						var j=0;
						var paidForFlag=0;
						while(j<paidForLength){
							if(Ext.getCmp('paidForList').getSelection()[j].data.name===localStorage.myName){
								paidForFlag=1;
							}
							eventSummary2+=Ext.getCmp('paidForList').getSelection()[j].data.name+', ';
							j++;
						}
						console.log('Case: '+whoPaidFlag+','+paidForFlag);
										
						var totalBill = Ext.getCmp('totalBill')._value;
						var eachTransaction = Ext.getCmp('totalBill')._value/whoPaidLength/paidForLength;
						//save as summary of date
						var today = new Date();
						var todayToShow;
						switch(today.getMonth()){
							case 0:todayToShow="Jan ";break;
							case 1:todayToShow="Feb ";break;
							case 2:todayToShow="Mar ";break;
							case 3:todayToShow="Apr ";break;
							case 4:todayToShow="May ";break;
							case 5:todayToShow="Jun ";break;
							case 6:todayToShow="Jul ";break;
							case 7:todayToShow="Aug ";break;
							case 8:todayToShow="Sept ";break;
							case 9:todayToShow="Oct ";break;
							case 10:todayToShow="Nov ";break;
							case 11:todayToShow="Dec ";break;
						}
						todayToShow +=today.getDate();
						var eventSummary ='<div style=font-size:40px>'+Ext.getCmp('nameOfEvent')._value+'</div>'+
											'<div style=font-size:17px><i>'+todayToShow+'</i> Bill: '+totalBill+'</div>';
						//var eventSummary = 'Date: '+todayToShow+' Event: '+Ext.getCmp('nameOfEvent')._value+' Total Bill: '+totalBill+'<br/>';
						eventSummary+='Payers: '+eventSummary1+'<br/>';
						eventSummary+='Enjoyers: '+eventSummary2+'<br/><br/>';
						//console.log(eventSummary);
						var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
						db.transaction(function (tx) {
							tx.executeSql('CREATE TABLE IF NOT EXISTS summary (name string)');
							tx.executeSql('INSERT INTO summary VALUES ("'+eventSummary+'")');
						});
						//save the result in array first
						var resultToBeUpdated = new Array();

						if(whoPaidFlag===0 && paidForFlag===0){
							//case 1

						}else if(whoPaidFlag===1 && paidForFlag===0){
							//case 2
							
							for(var i=0;i<whoPaidLength;i++){
								for(var j=0;j<paidForLength;j++){
									if(Ext.getCmp('whoPaidList').getSelection()[i].data.name===Ext.getCmp('paidForList').getSelection()[j].data.name){
										/*var nameToUse=Ext.getCmp('paidForList').getSelection()[j].data.name;
										console.log('sub from '+nameToUse);
										resultToBeUpdated[resultToBeUpdated.length]=[nameToUse,-eachTransaction/whoPaidLength];
										*/	
									}else{
										var nameToUse2=Ext.getCmp('paidForList').getSelection()[j].data.name;
										if(Ext.getCmp('whoPaidList').getSelection()[i].data.name===localStorage.myName){
											console.log('add in '+nameToUse2);
											resultToBeUpdated[resultToBeUpdated.length]=[nameToUse2,eachTransaction];
										}
											
									}
								}
							}
							
							var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
							for(var k=0;k<resultToBeUpdated.length;k++){
								//console.log(resultToBeUpdated[k]);
								
								(function(k){
									db.transaction(function (tx) {
										tx.executeSql('UPDATE dueInfo SET due=due+'+resultToBeUpdated[k][1]+' where name="'+resultToBeUpdated[k][0]+'"');
									});
								})(k);
							}
							
							


							
						}else{
							//case 3 and 4
							for(var i=0;i<whoPaidLength;i++){
								for(var j=0;j<paidForLength;j++){
									
									if(Ext.getCmp('whoPaidList').getSelection()[i].data.name!==Ext.getCmp('paidForList').getSelection()[j].data.name){
										if(Ext.getCmp('whoPaidList').getSelection()[i].data.name===localStorage.myName){
											var nameToUse2=Ext.getCmp('paidForList').getSelection()[j].data.name;
											console.log('amrit pays to '+nameToUse2);
											resultToBeUpdated[resultToBeUpdated.length]=[nameToUse2,eachTransaction];
											
										}else if(Ext.getCmp('paidForList').getSelection()[j].data.name===localStorage.myName){
											var nameToUse=Ext.getCmp('whoPaidList').getSelection()[i].data.name;
											console.log(nameToUse+' pays for amrit');
											resultToBeUpdated[resultToBeUpdated.length]=[nameToUse,-eachTransaction];
										}
									}
								}
							}
							var db = openDatabase('dueDb', '1.0', 'my first database', 2 * 1024 * 1024);
						
							for(var k=0;k<resultToBeUpdated.length;k++){
								//console.log(resultToBeUpdated[k]);
								(function(k){
									db.transaction(function (tx) {
										tx.executeSql('UPDATE dueInfo SET due=due+'+resultToBeUpdated[k][1]+' where name="'+resultToBeUpdated[k][0]+'"');
									});
								})(k);
							}

						}

						
						//setting the store
						Ext.getCmp('personlist').getStore().removeAll();
						Ext.getCmp('personlist').getStore().load();
					
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
				        Ext.getCmp('mainView').pop();





					}
				}]
			}
        ]
    }

});