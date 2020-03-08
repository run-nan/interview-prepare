/**
 * instaneof
 * 原理：沿着原型链，网上找，如果找得到，就返回true，如果找不到就返回false
 */

function myInstanceOf(sub, sup) {
    let current = sub;
    while(true) {
        if(current === null) {
            return false;
        }
        if(current.__proto__ === sup.prototype) {
            return true;
        }
        current = current.__proto__;
    }
}

// 测试代码
class Person {
    constructor(name) {
        this.name = name;
    }
};

class Man extends Person {
    constructor(name) {
        super(name);
        this.sex = 'male';
    }
}

const man = new Man('mike');

console.log(myInstanceOf(man, Man)); //true
console.log(myInstanceOf(man, Person)); //true
console.log(myInstanceOf(man, Function)); //false

