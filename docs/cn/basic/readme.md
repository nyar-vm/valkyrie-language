

## 基本字面量

在源代码中能直接输入的类型叫做字面量

V 有以下五种基本类型

| 类型 | 类型名称  | 缩写     | 默认值    |
| :--- | --------- | -------- | --------- |
| 单元 | Unit      | **()**   | `()`      |
| 布尔 | Boolean   | **bool** | `false`   |
| 整数 | Integer   | **int**  | `0`       |
| 小数 | Decimal   | **dec**  | `0.0`     |
| 字符 | String    | **str**  | `""`      |
| 字符 | Character | **char** | `'\u{0}'` |

### 布尔值

布尔类型简称 bool, 用于表示逻辑上的真假

布尔类型只有两种 `true` 和 `false`

### 整数

整数类型简称 int, 用于表示一个任意精度带正负的整数

整数还能使用比特输入, 在[高级算符](../advance)部分会深入介绍

### 小数

还有一种特殊的数字算符输入, 这个比较复杂, 在[高级算符](../advance)部分会深入介绍



### 字符

字符类型简称 char, 默认用于表示一个 unicode 字符

字符类型用成对的 `'` 包裹, 支持使用 `\` 转义

可转义

```ts
let a = '\u{12}'
let b = '\U{AF}'
```


### 字符串


如果有三个以上的引号那么就是多行字符串

多行字符串比较复杂, 这部分在[高级算符](../advance)部分会深入介绍

## 复合字面量

### 元组

**元组 (tuples)** 指把多个值组合成一个复合值.

元组内的值可以是任意类型, 并不要求是相同类型.

下面这个例子中, `(404, "Not Found")` 是一个描述 *HTTP 状态码 (HTTP status code)* 的元组.

HTTP 状态码是当你请求网页的时候 web 服务器返回的一个特殊值.

如果你请求的网页不存在就会返回一个 `404 Not Found` 状态码.

```valkyrie
let http404 = (404, "Not Found")
/// http404 的类型是 (Integer, String), 值是 (404, "Not Found")
```

`(404, "Not Found")` 元组把一个 `Integer` 值和一个 `String` 值组合起来表示 HTTP 状态码的两个部分: 一个数字和一个人类可读的描述.

这个元组可以被描述为: "一个类型为 `(Integer, String)` 的元组".

你可以把任意顺序的类型组合成一个元组, 这个元组可以包含所有类型.

你可以将一个元组的内容分解 (decompose) 成单独的常量和变量, 然后你就可以正常使用它们了:

```valkyrie
let (status_code, status_message) = http404Error;
print("The status code is ${status_code}")
/// 输出 "The status code is 404"
print("The status message is ${status_message}")
/// 输出 "The status message is Not Found"
```

如果你只需要一部分元组值, 分解的时候可以把要忽略的部分用下划线 (`_`) 标记:

```valkyrie
let (just_status_code, _) = http404;
print("The status code is ${just_status_code}")
/// 输出 "The status code is 404"
```

此外, 你还可以通过下标来访问元组中的单个元素, 下标从零开始:

```valkyrie
print("The status code is ${http404.0}")
/// 输出"The status code is 404"
print("The status message is ${http404.1}")
/// 输出"The status message is Not Found"
```

元组一般被用于轻量级的数据结构, 比如函数的返回值.

### List

内部数据结构是 VectorDeque

### Object

对象(Object)表示一个可扩展的匿名结构体.

这一结构在不同的语言中有不同的叫法, 例如对象(Object), 字典(Dictionary), 记录(Record), 映射(Map)等等.

## 字面量多态

Literal Polymorphism

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


## 注释

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

## 分号 {#semicolons}

与其他大部分编程语言不同, Swift 并不强制要求你在每条语句的结尾处使用分号 (`;`) , 当然, 你也可以按照你自己的习惯添加分号. 有一种情况下必须要用分号, 即你打算在同一行内写多条独立的语句:

```swift
let cat = "🐱"; print(cat)
// 输出"🐱"
```
