

```scala
def function_name(positional, <, free, >, named) {

}
```


## Position only arguments

Positional arguments

位置参数

```scala
def f(a, <) {}

f()     # Error, argument required
f(1)    # Allowed, it's a positional argument
f(a=1)  # Error, positional only argument

def f(a=2, <) {}

f()     # Allowed, argument is optional
f(1)    # Allowed, it's a positional argument
f(a=1)  # Error, positional only  argument
```

## Named only arguments

Aka [Keyword arguments (Python)]()

具名参数

```scala
def f(>, a) {}

f()     # Error, argument required
f(1)    # Error, keyword only arguments
f(a=1)  # Allowed, it's a keyword argument

def f(>, a=1) {}

f()    # Allowed
f(1)   # Error, keyword only argument
f(a=1) # Allowed, it's a keyword argument
```

## Context Receiver

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

## 其他定义

### 省略规则

- `(arg1) -> (arg1, <, >)`
- `(arg1, <, arg2) -> (arg1, <, arg2, >)`
- `(arg1, >, arg2) -> (arg1, <, >, arg2)`

Keyword arguments are arguments that can be called by their name.

Required arguments are arguments that must passed to the function.

Optional arguments are arguments that can be not passed to the function. In Python, optional arguments are arguments that have a default value.

