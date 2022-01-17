interface IPrint<T>{
  (val:T):T
}

var getData<T>(val:T) :T{
  return val;
}

var val1: IPrint<string> = getData;
val1('123')

var val2: IPrint<number> = getData;
val2(NaN)

var val3: IPrint<object> = getData;
val3(Object.create(null))