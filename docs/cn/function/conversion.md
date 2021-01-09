


```vk
@inline
def inline function_name[Generic](arguements, <, >, ): type / effect = {
    todo("${function_name}")
}
```

### Implicit Type Conversion



隐式类型转换

`Character => String`, `Integer   => Decimal`

```vk
def print_string(string: String) {
    print(string)
}
print_string('c')
# nothing wrong
```


```vk
def print_string(explicit string: String) {
    print(string)
}
print_string('c')
# CompileError: type mismatch;
```

也可以用宏从上下文中移除自动转换规则.

```vk
@type_cast.implicit.remove {
    Character => String,
    Integer8 => Integer => Decimal
}
```

### Explicit Type Conversion

```vk
def print_string(string: String) {
    print(string)
}
print_string(1)
# CompileError: type mismatch;
```




```vk
def print_string(into string: String) {
    print(string)
}
print_string(1)
# nothing wrong, same as
print_string(1.into.[String]())
```

### Coercion

