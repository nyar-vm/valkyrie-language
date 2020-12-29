


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

### Explicit Type Conversion

```scala
def print_string(into string: String) {
    print(string)
}
print_string('c')
# CompileError: type mismatch;
```

def print() {
    raise ConsoleMessage(arguments)
}
def print_line() {
    raise Console.log(arguments)
}

### Coercion

