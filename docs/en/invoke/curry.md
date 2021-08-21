## Curry Function

A curry function cannot be an overloaded function at the same time.

```valkyrie
curry micro add(a: int, b: int): int {
    a + b
}
```

Without any mark, `a, b` represent mixed parameters, so this definition is equivalent to.

```valkyrie
curry micro add(<, a: int, b: int, >): int {
    a + b
}
```

- If no name key is provided, the positional parameters will be filled first.
  - And then the mixed parameters will be filled.
  - If it is redundant, an error will be reported
- If the name key is provided, the corresponding parameters will be filled first,
  - and cannot be filled repeatedly

```valkyrie
add(1)(2)       # 3, filled a = 1, b = 2
add(a: 1)(2)    # 3, filled a = 1, b = 2
add(b: 1)(2)    # 3, filled a = 2, b = 1
add(b: 1, a: 2) # 3, filled a = 2, b = 1
add(0)(1, 2)    # error, except 2 parameters, but 3 parameters are provided
add(0)(a: 1)    # error, mixed parameters `a` had been filled
```

## Defer function

If you need to overwrite the named key multiple times, you can use the defer function

```valkyrie
defer micro add(<, a: int, b: int, >): int {
    a + b
}
```



```valkyrie
add(1)(2)       # 3, filled a = 1, b = 2
add(a: 1)(2)    # 3, filled a = 1, b = 2
add(b: 1)(2)    # 3, filled a = 2, b = 1
add(b: 1, a: 2) # 3, filled a = 2, b = 1
add(0)(1, 2)    # error, except 2 parameters, but 3 parameters are provided
add(0)(a: 2)(1) # 3, filled a = 2, b = 1
```


## Curry with `**args`

If a curry function adds `**args`, it will never fire with unnamed arguments.

```valkyrie
curry micro count(<, **args: Array<int>, >, invoke: bool): int {
    if invoke {
        args.length
    }
    else {
        0
    }
}
```

```valkyrie
count()(0)(1, 2)(invoke: false)         # 0
count()(0)(1, 2)(3, 4, 5)(invoke: true) # 6
```



## Curry with `partial`

`std::functional::partial` can be used to fill in the parameters of any function.

No need to mark `curry` or `defer` in advance.

```valkyrie
micro add(a: int, b: int): int {
    a + b
}

let add1: CurryFunction = std::functional::partial(add, [b: 1], override: true)
```



## Curry with Continuation

If the last parameter is Action type, then this parameter function must be filled before calling.

```valkyrie
micro add(a: int, b: int, k: Action): int {
    cont(a + b)
}
```


```valkyrie
micro add(<, a: int, b: int, >, k: Action): int {
    cont(a + b)
}
```


```valkyrie
add(1)(2) {
    print($it)
}

add(1)(2, k: { print($it)})
```



