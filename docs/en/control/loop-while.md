
Conditional loops are divided into two types: `while` and `until`.

`until condition` is essentially `while !condition`.

## Unconditional Loop

Unconditional loop, if there is no expression after the loop keyword, then it is an unconditional loop.

```valkyrie
while {


}
until {


}
```

or the expression is a boolean constant.


```valkyrie
while true {


}
until false {


}
```

If the unconditional loop does not produce any side effects, the entire expression is simply removed.

## Conditional Loop

If there is some non-constant expression after the loop keyword, then it is a conditional loop.

```valkyrie
while a > 0 {
    a -= 1
}

until a < 0 {
    a -= 1
}
```

In general, the loop will not end until the statement condition is not satisfied.

You can also use [non-local return](./jump-control.md#non-local-return) to break out of the loop early

## Pattern Loop

You can also use pattern matching as a loop condition:

```valkyrie
while let Some(x) = iter.next() {
    // ...
}
until let None = iter.next() {
    // ...
}
```


## Empty Loop

`otherwise` is used to indicate that the loop never happened once

```valkyrie
while a > 0 {
    // ...
}
otherwise {
    print("empty")
}
```

equivalent to

```valkyrie
let mut no_run = true
while a > 0 {
    no_run = false
    // ...
}
if no_run {
    print("empty")
}
```

Often used to indicate the behavior of an iterator when it is empty
