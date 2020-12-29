

```scala
def function_name(self, position_only, <, simple, >, name_only) {

}
```


## Positional arguments

位置参数

```scala
def f(a, <) {}

f()     # Error, argument required
f(1)    # Allowed, it's a positional argument
f(a=1)  # Error, positional only argument
```

```scala
def f(a=2, <) {}

f()     # Allowed, argument is optional
f(1)    # Allowed, it's a positional argument
f(a=1)  # Error, positional only  argument
```

## Keyword arguments

具名参数






### Context Receiver



隐式类型转换

`Character => String`, `Integer   => Decimal`

```scala
def print_context(>, receiver context: String) {
    print(context)
}

let context = "test"
print_context() #> test
# same as
print_context(context: context)
```

或者可以从上下文中移除自动转换

```scala
@implicit_cast.remove {
    Character: String
}
```

## 省略规则

- `(arg1) -> (arg1, <, >)`
- `(arg1, <, arg2) -> (arg1, <, arg2, >)`
- `(arg1, >, arg2) -> (arg1, <, >, arg2)`

Keyword arguments are arguments that can be called by their name.

Required arguments are arguments that must passed to the function.

Optional arguments are arguments that can be not passed to the function. In Python, optional arguments are arguments that have a default value.

