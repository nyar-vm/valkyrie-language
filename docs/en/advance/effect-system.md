
```valkyrie
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

```valkyrie
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


## Implement Details

The core idea is that Valkyrie will do cps transformation for all functions with effect.

```valkyrie
// cps form
micro div2(a: Integer, b: Integer, divide_error: DivideError?): Unit / DivideError {
    if (b == 0) {
        let fill = divide_error;
        print("can't divide zero, default as { fill }")
    }
    else {
        print("{a} / {b} = {a / b}")
    }
}

try {
    div2(0, 0, k)
    div2(1, 0, k)
}
.catch {
    case DivideError(numerator):
        delay(100ms) {
            resume numerator
        }
}
```
