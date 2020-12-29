

```scala
def function_name(self, position_only, <, simple, >, name_only) {

}
```

Keyword arguments are arguments that can be called by their name.

Required arguments are arguments that must passed to the function.

Optional arguments are arguments that can be not passed to the function. In Python, optional arguments are arguments that have a default value.

## Overloading Function

```scala
def overload print_number(number: Integer) {
    print(context)
}
def overload print_number(number: Integer) {
    print(context)
}
```

- 重载函数必须标记 `overload`
- 重载函数必须写在同一个文件或者同一个扩展中
- 重载函数的返回值必须和第一个完全相同
- 如果没有合适的重载函数会在调用出产生编译错误

注意编译器总是按照定义顺序从上到下尝试匹配, 除此以外没有任何解析过程.

如果第一个函数匹配成功, 则编译器将不再尝试第二个函数, 但是 IDE 可能会尝试其他的重载函数变体.

## Multiple Dispatch Function




## Positional arguments

位置参数



- `(arg1) -> (arg1, <, >)`
- `(arg1, <, arg2) -> (arg1, <, arg2, >)`
- `(arg1, >, arg2) -> (arg1, <, >, arg2)`


### Context Receiver



隐式类型转换

`Character => String`, `Integer   => Decimal`



或者可以从上下文中移除自动转换

```scala
@implicit_cast.remove {
    Character: String
}
```

### Explicit Type Conversion

```scala
def print_string(string: String) {
    print(string)
}
print_string(1)
# CompileError: type mismatch;
```




```scala
def print_string(into string: String) {
    print(string)
}
print_string(1)
# nothing wrong, same as
print_string(1.into.[String]())
```

### Coercion

