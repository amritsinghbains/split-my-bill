Ext.define('FriendsWithBenefits.view.PersonList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.personlist',
	id: 'personlist',
	requires: [
        'Ext.XTemplate'
    ],
	config: {
		itemId: 'list',
		emptyText: 'Loading your favourite friends..',
        store: 'People',
        grouped: true,
        listeners: {
	        itemtap: function(dv, ix, item, e) {
	            // Clear the selection soon
	            setTimeout(function(){dv.deselect(ix);},500);
	        }
	    },
        itemTpl: new Ext.XTemplate(
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
    }

});