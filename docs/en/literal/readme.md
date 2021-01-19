## Comment

The Valkyrie language uses `#` for line comments, `#!` for shebangs, `#?` for documentation comments.

```valkyrie
#! /usr/bin/env vk

# This is a line comment

#? This is a documentation comment
type MyResult<T = ()> = Result<T, MyError>
```

## Literals

Here are some primitive types:

| Atom      | Example                          |
|:----------|:---------------------------------|
| Boolean   | `true`, `false`                  |
| Integer   | `0`, `0u8`, `0int`               |
| Decimal   | `0.0`, `0.0f32`, `0.0dec`        |
| Character | `'n'`, `'\n'`                    |
| String    | `""`, `"Hello world!"`           |

Here are some common collections:

| Collection | Example                          |
|:-----------|:---------------------------------|
| List       | `List()`, `[1, 2, 3]`            |
| Dict       | `Dict()`, `[a: 1, z: 26]`        |
| Tuple      | `()`, `(1,)`,  `(1, "Hello")`    |
| Option     | `None`, `Some(1)`                |
| Result     | `Success(1)`, `Failure("Error")` |

### Literal polymorphism

The content represented by the literal value will be affected by the type on the left

```valkyrie
let string: str = "c"
let char: char = "c"
let list: List[String] = []
let dict: Dict[String] = []
```

