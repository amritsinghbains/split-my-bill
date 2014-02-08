Ext.define('FriendsWithBenefits.controller.People', {
    extend: 'Ext.app.Controller',
	
    config: {
        models: [
            'Person'
        ],
        stores: [
            'People'
        ],

        refs: {
            mainView: 'mainview'
        },

        control: {
            "mainview #list": {
                select: 'view'
            }
        }
    },

    view: function(dataview, record, eOpts) {

        // Main navigation view
        var mainView = this.getMainView();
	
        // Navigate to details
        mainView.push({
            xtype: 'detailpanel',
            title: record.data.name,
            data: record.data
        });

    }

});