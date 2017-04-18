var uid = 0;
Vue.component('todo-item', {
    name: 'todo-item',
    props: ['items','item','index'],
    template: `
            <li>
                <div>
                    <input v-on:click="toggle" :checked="item.done" type="checkbox" name="todo">
                    <label>{{item.title}}</label>
                    <img v-on:click="removeItem" width=16 src="src/images/remove.png"/>
                </div>
            </li>`,
    methods: {
        removeItem: function () {
            this.items.splice(this.index, 1);
        },
        toggle: function () {
            var item = this.items[this.index];
            item.done = !item.done;
        }
    }
})
var app = new Vue({
    el: '#todo-app',
    data: {
        title: 'Todos',
        items: [],
        input: '',
        markAll: false
    },
    computed: {
        left: function () {
            var res = 0;
            this.items.forEach(function (item) {
                if (!item.done) {res++;}
            });
            return res;
        },
        hasItem: function () {
            return this.items.length;
        },
        hasItemDone: function () {
            return !(this.left === this.items.length);
        },
        allDone: function () {
            if (this.items.length === 0) {return false;}
            for (var item of this.items){
                if (!item.done) {return false;}
            }
            return true;
        }
    },
    methods: {
        addItem: function () {
            if(!!this.input){
                this.items.push({id:uid++,title:this.input,done:false});
                this.input = '';
            }
        },
        doAll: function () {
            this.items.forEach(function (item) {
                item.done = this.markAll;
            }.bind(this));
        },
        clearCompletedItems: function () {
            for (var i = 0; i < this.items.length; i++) {
                if(this.items[i].done){
                    this.items.splice(i,1);
                }
            }
        }
    },
    watch: {
        allDone: function (val) {
            this.markAll = val;
        }
    }
})