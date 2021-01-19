

## Implementation Details

Disjoint union types will be expanded to `trait` + `subtype`.

```vk
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

```vk
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
