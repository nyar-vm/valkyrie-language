# 注释

Valkyrie 使用 `//` 进行行注释, 使用 `/* */` 进行块注释, 使用 `///` 与 `/** */` 进行文档注释.

```valkyrie
#! /usr/bin/env valkyrie
// 这是一条行内注释

/// 这是一套文档注释
type MyResult<T = ()> = Result<T, MyError>
```

# 字面量

这里是一些原始字面量:

| 类型      | 示例                               |
|:--------|:---------------------------------|
| Boolean | `true`, `false`                  |
| Integer | `0`, `0u8`, `0int`               |
| Decimal | `0.0`, `0.0f32`, `0.0dec`        |
| String  | `""`, `"Hello world!"`, `"'\n'"` |

## 字面量多态

同一个字面量对应多种可能的类型, 除非左边加上类型限定, 或者使用 `as` 转换.

```valkyrie
let s1: str  = "c"
let s2       = "c" as String
let c1: char = "c"
let c2:      = "c" as Character
```



# 进阶阅读

- [数字字面量](./number.md)
- [字符串插值](./formatter.md)
- [字符串模板](./template.md)
- [字符串标记](./xml.md)
