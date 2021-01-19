## Structure

Valkyrie defines structures through the `structure` keyword,
and each structure can have its own fields and methods.

```valkyrie
structure A {
    field: Type = default_value;
    lazy delay: Type = {
        lazy_progress
    }
}
```

In principle, it is best to separate the data from the calling method, unless it is a particularly closely related method such as setter or getter.

General extension methods can be written in the extends statement.

If the first argument is not `self`, then this is a static method that can be called via `A::method()`.


```valkyrie
extends A {
    method1(): String {
        "call method1"
    }
}
```

If the first argument is `self`, then this is an instance method that can be called via `a.method2()`.

```valkyrie
extends A {
    method2(self): String {
        self.field.to_string()
    }
}
```


## Class

A class is a structure that automatically implements many interfaces and traits, otherwise there is no difference.

Temporarily gain the following features:

- [Constructor](../advance/builder.md): Support call like `Class(args)`
- [Extractor](../advance/extractor.md): Support call like `case Class(pats): `
- [Clone](): How to get an independent copy object
- [Copy](): Support for zero-heap allocation cloning
- [ShowDebug](): How to display the fields that the structure actually has, without properties
- [ShowDetail](): How to display the fields that the structure actually has, with properties and getters.
- [Equality](): Determine whether two objects are interchangeable
- [Congruence](): If it is a value type, it means that the values are equal, and if it is a reference type, it means
  that the pointers are the same

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
