# Builder Pattern

The builder pattern is a design pattern designed to provide a flexible solution to various object creation problems in object-oriented programming.

The traditional builder pattern needs to define get, set, with, which is cumbersome.

```rust
A::new(1)
    .with_b(2)
    .with_c("c")
```

Valkyrie Language provides an easy way

```vk
class A {
    a: int
    b: int = 1

    @get
    _c: String = "C"
    set c(value: String) {
        _c = value.to_uppercase()
    }

    constructor(a: int) {
        this.a = a
    }


}

new A(1) {
    b: 2,
    c: "c"
}
```




```vk
let mut a = A(1)
a.b = 2
a.c = "c"

# Result
A {
    a: 1,
    b: 2,
    _c: "C"
}
```
