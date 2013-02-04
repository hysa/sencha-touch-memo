Ext.define('Memo.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
    ],
    config: {
        cls: 'memo',
        useTitleForBackButtonText: true,
        navigationBar : {
            ui: 'memo',
            items: {
                xtype: 'button',
                ui: 'memo',         // Styleの指定
                iconCls: 'add',
                iconMask: true,
                align: 'right',
                action: 'add'
            }
        },
        tabBarPosition: 'bottom',

        items: [{
            title: 'Memo',
            xtype: 'memolist'
        }]
    }
});
