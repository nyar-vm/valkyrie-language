## 注释

Valkyrie 使用 `//` 进行行注释, 使用 `/* */` 进行块注释, 使用 `///` 与 `/** */` 进行文档注释.

```valkyrie
#! /usr/bin/env valkyrie
// 这是一条行内注释

/// 这是一套文档注释
type MyResult<T = ()> = Result<T, MyError>
```

### 字面量

这里是一些原始字面量:

| 类型      | 示例                               |
|:--------|:---------------------------------|
| Boolean | `true`, `false`                  |
| Integer | `0`, `0u8`, `0int`               |
| Decimal | `0.0`, `0.0f32`, `0.0dec`        |
| String  | `""`, `"Hello world!"`, `"'\n'"` |

下面是一些常见的数据字面量:

| 集合     | 示例                               |
|:-------|:---------------------------------|
| List   | `List()`, `[1, 2, 3]`            |
| Dict   | `Dict()`, `[a: 1, z: 26]`        |
| Tuple  | `()`, `(1,)`,  `(1, "Hello")`    |
| Option | `None`, `Some(1)`                |
| Result | `Success(1)`, `Failure("Error")` |


### 字面量多态

同一个字面量对应多种可能的类型, 除非左边加上类型限定, 或者使用 `as` 转换.

```valkyrie
let string: str = "c"
let char: char = "c"
let list: List<String> = ()
let dict: Dict<String> = ()
```

