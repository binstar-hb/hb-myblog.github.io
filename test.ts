class Person<T> {
  // 定义一个泛型数组
  public list: T[] = [];

  add(val: T) {
    this.list.push(val);
    return this;
  }
  delete(index: number) {
    this.list.splice(index, 1);
    return this;
  }
}

var p1 = new Person<number>();
p1.add(1);




p1.add('2')