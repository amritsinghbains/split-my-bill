Ext.define('FriendsWithBenefits.store.People', {
    extend: 'Ext.data.Store',
	requires: [
        'FriendsWithBenefits.model.Person',
        'Ext.data.proxy.Memory',
        'Ext.util.Sorter'
    ],

    config: {
        autoLoad: true,
        //groupField: 'name',
        model: 'FriendsWithBenefits.model.Person',
        storeId: 'People',
        proxy: {
            type: 'memory'
        },
        sorters: {
            property: 'name'
        },
		grouper: {
            groupFn: function(record) {
				return record.get('name').substr(0, 1);
            },
            sortProperty: 'name'
        }
					 
    }
});