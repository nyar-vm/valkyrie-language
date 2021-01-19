## 基本字面量

在源代码中能直接输入的类型叫做字面量

V 有以下五种基本字面量

| 类型 | 类型名称  | 缩写     | 默认值    |
| :--- | --------- | -------- | --------- |
| 布尔 | Boolean   | **bool** | `false`   |
| 字符 | Character | **char** | `'\u{0}'` |
| 字符 | String    | `/`      | `""`      |
| 整数 | Integer   | `/`      | `0`       |
| 小数 | Decimal   | `/`      | `0.0`     |



### 布尔值

布尔类型简称 bool, 用于表示逻辑上的真假.

布尔类型只有两种 `true` 和 `false`.

注意, V 中的 `if` 条件并不一定要布尔值才能触发, 任何实现了 `Into<bool>` 的结构体都可以作为跳转判定条件.

if [] {

}





### 整数 & 小数

整数类型简称 int, 用于表示一个任意精度带正负的整数

整数还能使用比特输入, 在[高级算符](../advance)部分会深入介绍

还有一种特殊的数字算符输入, 这个比较复杂, 在[高级算符](../advance)部分会深入介绍

### 整数范围 {#integer-bounds}

你可以访问不同整数类型的 `min` 和 `max` 属性来获取对应类型的最小值和最大值:

```valkyrie
let minValue = UInt8.min  // minValue 为 0, 是 UInt8 类型
let maxValue = UInt8.max  // maxValue 为 255, 是 UInt8 类型
```

`min` 和 `max` 所传回值的类型, 正是其所对的整数类型 (如上例 UInt8, 所传回的类型是 UInt8) , 可用在表达式中相同类型值旁.

### Int {#Int}

一般来说, 你不需要专门指定整数的长度. Swift 提供了一个特殊的整数类型 `Int`, 长度与当前平台的原生字长相同:

* 在32位平台上, `Int` 和 `Int32` 长度相同.
* 在64位平台上, `Int` 和 `Int64` 长度相同.

除非你需要特定长度的整数, 一般来说使用 `Int` 就够了. 这可以提高代码一致性和可复用性. 即使是在32位平台上, `Int` 可以存储的整数范围也可以达到 `-2,147,483,648` ~ `2,147,483,647`, 大多数时候这已经足够大了.

### UInt {#UInt}

Swift 也提供了一个特殊的无符号类型 `UInt`, 长度与当前平台的原生字长相同:

* 在32位平台上, `UInt` 和 `UInt32` 长度相同.
* 在64位平台上, `UInt` 和 `UInt64` 长度相同.

> 注意
>
> 尽量不要使用 `UInt`, 除非你真的需要存储一个和当前平台原生字长相同的无符号整数. 除了这种情况, 最好使用 `Int`, 即使你要存储的值已知是非负的. 统一使用 `Int` 可以提高代码的可复用性, 避免不同类型数字之间的转换, 并且匹配数字的类型推断, 请参考 [类型安全和类型推断](#type-safety-and-type-inference).

## 浮点数 {#floating-point-numbers}

浮点数是有小数部分的数字, 比如 `3.14159`、`0.1` 和 `-273.15`.

浮点类型比整数类型表示的范围更大, 可以存储比 `Int` 类型更大或者更小的数字. Swift 提供了两种有符号浮点数类型:

* `Double` 表示64位浮点数. 当你需要存储很大或者很高精度的浮点数时请使用此类型.
* `Float` 表示32位浮点数. 精度要求不高的话可以使用此类型.

> 注意
>
> `Double` 精确度很高, 至少有 15 位小数, 而 `Float` 只有 6 位小数. 选择哪个类型取决于你的代码需要处理的值的范围, 在两种类型都匹配的情况下, 将优先选择 `Double`.



### 字符 & 字符串

字符类型简称 char, 默认用于表示一个 unicode 字符

字符类型用成对的 `'` 包裹, 支持使用 `\` 转义

可转义

```ts
let a = '\u{12}'
let b = '\U{AF}'
```

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

```valkyrie
let cat = "🐱"; print(cat)
// 输出"🐱"
```
