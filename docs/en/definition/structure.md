## Class

```valkyrie
class A {
    field: Type = default_value;
}
```

In principle, it is best to separate the data from the calling method.

If the first argument is not `self`, then this is a static method that can be called via `A::method1()`.

```valkyrie
extends A {
    // static method
    method1(): String {
        "call method1"
    }
}
```

If the first argument is `self`, then this is an instance method that can be called via `A().method2()`.

```valkyrie
extends A {
    method2(self): String {
        self.field.to_string()
    }
}
```

## Structure

```valkyrie
structure B {
    field: Type = default_value;
}
```

| Parameter   | `class A`     | `structure B`    |
|-------------|---------------|------------------|
| `x: X`      | pass `&x`     | pass `x.clone()` |
| `ref x: X`  | pass `&x`     | pass `&x`        |
| `mut x: X`  | pass `&mut x` | pass `move x`    |
| `move x: X` | pass `move x` | pass `move x`    |



## Implementation Details

The structure will be compiled into a `Record`, and all fields are regarded as row type `field: (self) -> T`.

```valkyrie
type A = [
    field: (self) -> Type,
    delay: (self) -> Lazy<Type>,
    method1: () -> String,
    method2: (self) -> String,
]
```

This means that the two calls `a.b` and `a.b()` are indistinguishable.

For convenience, leave out the parentheses if `b` is like a noun, and add parentheses if `b` is like a verb.
