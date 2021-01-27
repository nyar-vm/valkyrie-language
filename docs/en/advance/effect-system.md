
```vk
class DivideError: Error {
    numerator: Integer
    # The left side represents the uploaded parameters,
    # and the right side represents the downloaded parameters
    effect divide_zero(numerator: Integer) -> Integer {
        # Must return Self, must be a Pure function
        new Self { numerator }
    }
}
```

The type signature part is divided into two parts `Type` / `Effect`, both of which can be omitted, the default value of `Type` is Unit, and the default value of `Effect` is Pure.


There are two types of pattern matching, match matches `Type`, catch matches `Effect`, raise changes `Type` to `Effect`, resume changes `Effect` to `Type`.

```vk
micro div2(a: Integer, b: Integer): Unit / DivideError {
    if (b == 0) {
        let fill = raise DivideError::divide_zero(a);
        print("can't divide zero, default as { fill }")
    }
    else {
        print("{a} / {b} = {a / b}")
    }
}

try {
    Some(), None(), Success(), Failure()
    Class(),

    div2(0, 0)
    div2(1, 0)
}
.catch {
    case DivideError(numerator):
        delay(100ms) {
            resume numerator
        }
}
```


