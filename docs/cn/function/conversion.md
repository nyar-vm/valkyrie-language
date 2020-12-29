


```scala
@inline
def inline function_name[Generic](arguements, <, >, ): type / effect = {
    todo("${function_name}")
}
```

### Implicit Type Conversion



隐式类型转换

`Character => String`, `Integer   => Decimal`

```scala
def print_string(string: String) {
    print(string)
}
print_string('c')
# nothing wrong
```


```scala
def print_string(explicit string: String) {
    print(string)
}
print_string('c')
# CompileError: type mismatch;
```

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

