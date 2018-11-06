/**
 * Created by shuqiong on 2018/11/6.
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { observable, autorun, computed, action, map } from 'mobx';

function demo1() {
    const  value = observable.box(0);

    autorun(() => {
        {/*console.log(`Value is ${value.get()}`)*/}
        console.log('Value is ' , value.get())
    });

    value.set(2);
    value.set(8);
    value.set(-3);
}

function demo2() {
    const value = observable.box(0);

    const condition = computed(() => (value.get() >= 0));

    autorun(() => {
       console.log(`condition is : ${condition.get()}`) ;
    });

    value.set(2);
    value.set(8);
    value.set(-3);
}

function demo3() {
    const value = observable({
        foo: 0,
        bar: 0,
        get condition() {
            return this.foo >= 0;
        }
    });
    autorun(() => {
       console.log(`value.foo is: ${value.foo}`);
    });
    autorun(() => {
       console.log(`value.condition is ${value.condition}`);
    });

    value.foo = 2;
    value.foo = 8;
    value.foo = -3;

    value.bar = 1;
    value.bar = 2;
}

function demo4() {
    const value = observable([0]);

    autorun(() => {
       console.log(`value.length is: ${value.length}`);
    });

    autorun(() => {
       console.log('value is: ', value[0])
    });

    // const first = computed(() => value[0]);
    //
    // autorun(() => {
    //    console.log(`first is: ${first.get()}`);
    // });

    value[0] = 1;
    value.push(2);
    value.push(3);

    value.splice(0, 1);

}

class Foo{
    @observable
    selected = 0;

    @observable
    items = [];

    @computed
    get selectedItem() {
        if (this.selected >= this.items.length) {
            return null;
        }
        return this.items[this.selected];
    }

    @action
    addItem(item) {
        this.items.push(item);
    }

    @action
    removeAt(id) {
        this.items.splice(id, 1);
        if (this.selected >= id) {
            this.selected --;
        }
    }

    @action
    removeSelected() {
        this.items.splice(this.selected, 1)
    }
}

function demo5() {
    const foo = new Foo();
    autorun(() => {
       console.log(`Current selected is: ${foo.selectedItem}`);
    });
    foo.addItem(0);
    foo.addItem(1);
    foo.addItem(2);
    foo.addItem(3);

    foo.selected = 2;

    foo.removeSelected();

    foo.removeAt(0);
}

function demo6() {
    const foo = map({});
    autorun(() => {
       console.log(`map have ${foo.size} keys`);
    });

    foo.set('foo', 1);
    foo.set('bar', 1);
    foo.set('foo', 2);
    foo.delete('bar');
}

export default class DemoList extends Component {

    render() {
        return (
            <View>
                {/*{demo1()}*/}
                {/*{demo2()}*/}
                {/*{demo3()}*/}
                {/*{demo4()}*/}
                {/*{demo5()}*/}
                {demo6()}
            </View>
        );
    }
}
