
## Literal Pattern Match


```vk
terms.match {
    case true:
        branch_a
    case "string":
        branch_b
    case 0:
        branch_c
    case _:
        branch_d
}
```


## Conditional Pattern Match


```vk
terms.match {
    when > 0:
        branch_a
    when b == 0:
        branch_b
    else:
        branch_c
}
```


## Type Pattern Match


```vk
terms.match {
    # same as `case a if a is Integer:`
    type Integer a:
        branch_a
    case a if a is Integer:
        branch_c
    # a can cast to T
    case a is Integer:
        branch_b
    # a can convert to T
    case a as Integer:
        branch_b
}
```

## Tuple Pattern Match


```vk
terms.match {
    case (a, _):
        branch_a
    case Named(_, b):
        branch_b
}
```

## Class Pattern Match

```vk
terms.match {
    case { a, *** }:
        branch_a
    case Named{ a: _, b }:
        branch_b
}
```

## Union Pattern Match

All captures with the same name on the same branch must be type-compatible to first capture.

```vk
terms.match {
    case Some(a) | Success { value: a }:
        branch_a
}
```
