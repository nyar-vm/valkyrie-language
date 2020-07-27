

## Nominal Type System

具名类型系统

## Structure Type System

结构类型系统

逆变, 协变

```ts

class A {
    [mut, set, get, public]
    a = 0
    b = 1

    [get, private]
    c = 2
    d = 4

    []
    e = 8
}

class B {
    set get public mut a = 0
    set get public mut b = 1
    get private c = 2
    get private d = 4
    e = 8
}

```

