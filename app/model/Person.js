Ext.define('FriendsWithBenefits.model.Person', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'due',
                type: 'int'
            }
        ]
    }
});