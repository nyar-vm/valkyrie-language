Another important element in algebraic data types is the sum type,
which is represented by `unite` in the Valkyrie language.

unite Each variant can have its own field, or it can have no field

```valkyrie
unite Test {
    A { }
    B {
        b: int
    }
    C {
        c1: int
        c2: str
    }
}
```

Unite can easily use pattern matching to implement interfaces

```valkyrie
extends Test {
    to_string(self) {
        self.match {
            case A: "A"
            case B(b): "B: integer is {b}"
            case C(c1, c2): "C: integer is {c1}, string is {c2}"
        }
    }
}
```

## Implementation Details

Disjoint union types will be expanded to `trait` + `subtype`.

```valkyrie
unite Result<T, E> {
    Success {
        value: T
    }
    Failure {
        error: E
    }
}

extends Result<T, E> {
    unwrap(self) -> T / E {
        match self {
            Success(value) => value
            Failure(error) => raise error
        }
    }
}
```

You can also manually implement an extensible Σ type based on this.

```valkyrie
@unite
@implements.in(file)
trait Result<T, E> {
    unwrap(self): T / E
}

@variant
class Success<T, E>: Result<T, E> {
    value: T
    construct(value: T) {
        self.value = value
    }
    extract(self) -> [value: T]? {
        Some([self.value])
    }
    unwrap(self) -> T {
        self.value
    }
}

@variant
class Failure<T, E>: Result<T, E> {
    error: E
    construct(error: E) {
        self.error = error
    }
    extract(self) -> [error: E]? {
        Some([self.error])
    }
    unwrap(self) / E {
        raise self.error
    }
}
```

Note that the `construct` and `extract` here are not written in the trait constraints,
so that subclasses can implement them according to their needs
