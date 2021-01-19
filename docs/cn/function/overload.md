## Overloading Function

```valkyrie
def overload print_number(number: Integer) {
    print("Integer: ${context}")
}
def overload print_number(number: Integer) {
    print("Decimal: ${context}")
}
```

- 重载函数必须标记 `overload`
- 重载函数必须写在同一个文件或者同一个扩展中
- 重载函数的返回值必须和第一个完全相同
- 如果没有合适的重载函数会在调用出产生编译错误

注意编译器总是按照定义顺序从上到下尝试匹配, 除此以外没有任何解析规则.

如果第一个函数匹配成功, 则编译器将不再尝试第二个函数.

任何复杂的解析过程都是人脑难以记忆的, 这样简单的规则有利于排查问题.

## Dynamic Invoke Function



## Multiple Dispatch Function

多派发也被称为运行时动态重载

多派发使用通过定义序

```valkyrie
@dispatch(for_int, order: 100)
def print_number(number: Integer) {
    print("Integer: ${context}")
}
@dispatch(for_dec, before: for_int)
def print_number(number: Decimal) {
    print("Decimal: ${context}")
}
@dispatch(any)
def print_number(number: Any) {
    print("Unknown Type")
}
```

- 必须添加 `@dispatch(any)`
