## Literal

在源代码中能直接输入的类型叫做字面量

Valkyrie 有以下五种基本类型

| 类型 | 类型名称  | 缩写     | 默认值    |
| :--- | --------- | -------- | --------- |
| 布尔 | Boolean   | **bool** | `false`   |
| 整数 | Integer   | **int**  | `0`       |
| 小数 | Decimal   | **dec**  | `0.0`     |
| 字符 | String    | **str**  | `""`      |
| 字符 | Character | **char** | `'\u{0}'` |

### Boolean

布尔类型简称 bool, 用于表示逻辑上的真假

布尔类型只有两种 `true` 和 `false`

```ts
let yep = true
let nope = false
```

### Integer

整数类型简称 int, 用于表示一个任意精度带正负的整数

### Decimal

还有一种特殊的数字算符输入, 这个比较复杂, 在[高级算符](../advance)部分会深入介绍



### Character

字符类型简称 char, 默认用于表示一个 unicode 字符

字符类型用成对的 `'` 包裹, 支持使用 `\` 转义

可转义

```ts
let a = '\u{12}'
let b = '\U{AF}'
```


### String


如果有两个以上的引号那么就是多行字符串

多行字符串比较复杂, 这部分在[高级算符](../advance)部分会深入介绍

### Comment

某种程度上来讲, 注释也是一种字面量, 但是注释无法影响到程序的解析和执行

注释分为单行注释和多行注释

```rs
/// NORMAL: 这是普通注释
//* ATTENTION: 这里需要引起注意
//! FIXME: 这里是急需修复的部分
//? TODO: 这里是待办事项

%%%
这里是多行注释, 用于表示文档
%%%
```

## Literal Container

字典, 列表

### Tuple

元组

### List

内部数据结构是 VectorDeque

### Record

内部数据结构是 LinkedHashmap

## Literal Polymorphism

Valkyrie 拥有字面量多态(Literal Polymorphism), 也就是说一个字面量的类型不止取决于本身, 也取决于上下文

```ts
let a = 0 //? 这是整数
let b = 0 //? 这是小数

a + 1
b + 1.0
```

还有一种方法就是标记类型, 这样也能自动转换输入的字面量

```ts
let a: Integer = 0
let b: Decimal = 0
```
