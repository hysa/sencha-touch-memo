Ext.define('Memo.controller.Memo', {
    extend: 'Ext.app.Controller',

    config: {
        // refs はコンポーネントの別名を定義する
        refs: {
            main: 'main',    // Main.jsのxtype:main
            form: 'memoform'
        },
        // controlはコンポーネントのイベントリスナー
        control: {
            'button[action=add]': {    // UIのセレクタを指定
                tap: 'onAddButtonTap'
            },
            'memolist': {
                itemtap: 'onItemTap'
            },
            'memoform textareafield': {
                change: 'onFieldChange'
            },
            'memoform button[action=remove]': {
                tap: 'onRemoveButtonTap'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    },

    onAddButtonTap: function() {
        var record = Ext.create('Memo.model.Memo', {
            id: Ext.Date.now()
        });

        this.getMain().push({
            xtype: 'memoform',
            record: record          // memoform に recordを突っ込む
        });
    },

    onItemTap: function(list, index, target, record) {
        this.getMain().push({
            xtype: 'memoform',
            record: record,
            title: record.get('title')
        });
    },

    onFieldChange: function(field, value) {
        var form = this.getForm(),
            record = form.getRecord();          // getXXXでmemoformにつっこんだXXXを取得する
        console.log('value', value);
        record.set('title', Ext.String.ellipsis(value, 10));
        record.set('memo', value);
        var store = Ext.getStore('Memos');
        console.log('store', store);
        if (Ext.isEmpty(store.findRecord('id', record.get('id')))) {
            console.log('isEmpty');
            store.add(record);
            console.log('added');
        }
        store.sync();
        console.log('synced');
    },

    onRemoveButtonTap: function() {
        var form = this.getForm(),
            record = form.getRecord(),
            store = Ext.getStore('Memos');

        store.remove(record);
        store.sync();
        this.getMain().onBackButtonTap();
    }
});