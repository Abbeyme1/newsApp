class Animal {
  constructor() {
    this.age = Animal.count++;
  }

  static count = 0;
}

var a = new Animal();
var a = new Animal();
var a = new Animal();
var a = new Animal();
console.log(a);
