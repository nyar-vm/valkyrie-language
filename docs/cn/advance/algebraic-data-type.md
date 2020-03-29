## Algebraic Data Type

代数数据类型简称 ADT, Curry-Howard 同构指出了逻辑系统和程序语言之间的相似性


$$\begin{array}{|c|c|c|}
\hline\text { Algebra } & \text { Logic } & \text { Types } \\
\hline a+b & a \vee b & \text {  a | b } \\
\hline a \times b & a \wedge b & (a, b) \\
\hline a=b & a \Longleftrightarrow b & \text { isomorphism }\\
\hline b^{a} & a \Longrightarrow b & a \rightarrow b \\
\hline \text { 0 } & \perp & ! \\
\hline 1 & ⊤ & \text { () } \\
\hline
\end{array}$$

于是类型可以有如代数一般运算.

## Primitive Type

代数最基本的是数字, 某种程度上我们可以把类型视为一个集合

接着计算所有可能元素的数量以此来定义类型的大小

相同大小的类型可以相互包容相互表示, 也就是说他们同构

### Void

```hs
type Void {};
```

我们声明了一个类型, 但是他没有任何实例, 也就是说他有零个值.

类型 0 用于代表无法正常返回, 程序可能会永远运行下去

```py
def never_return() -> Void {
    while true { }
}
```

### Unit


只有一个值的类型是单例, 有时候也用 `( )` 表示, 函数返回 Unit 时无需分配内存

```hs
type Unit {
    Unit
}
```

### Boolean

```hs
type Boolean {
    True,
    False,
}
```

bool 类型的对象有两个值: False 和 True

### More

以此类推我们还能定义类型 3, 类型 4, 比如

```hs
type Sign {
    Positive,
    Negative,
    Zero,
};
type Direction {
    East,
    South,
    West,
    North,
};
```

对于 `u8`, 它有 $0\sim255$ 一共 $256$ 个取值, 所以对应类型 $256$

同时 `i8` 也有 $256$ 个取值, 也是类型 $256$, 因此这两者能相互转换

## Sum Type

枚举类型, enum

variants/alternation/tagged union

在集合论中, 这被称作 disjoint union（不相交集）, 表述为 A + B。 如图：

<div align=center><img src="/assets/Equivalentie.svg"></div>

不相交集在数据类型中往往被称作 tagged union (C++) 或者 sum type (haskell, rust), 和 product type 相反的是, 大部分编程语言没有 sum type。我们看 rust 是如何使用 sum type 来解决上面的问题的：

围绕着编程语言是否需要 exception, exception 是良药还是毒药, 有诸多争议, java / python 是建制派, C++ / haskell 是骑墙派, rust / go 是反对派, erlang / elixir 是无政府主义者, 这里便不展开。你问我支持谁？我喜欢尤达大师对卢克说的那句经典台词：do or do not, there's no try。这句话也蕴含了 erlang 的哲理：let it crash。

## Union Type

并类型, 虽然很多时候和和类型是一样的, 但是有时候是不一样的

一定程度上解决了 null 的问题, 但是考虑 get(key), 到底这个值天生就是 null 还是取不到所以是 null?

typescript 和 python 里就常有这样的问题


## Product Type

如果我要表示 $256 \times 256$ 方格上的一个整数点, 我可能会使用元组 `(x, y)` 表示.

其中 $x$ 取遍 $0\sim255$, $y$ 同样取遍 $0\sim255$, 于是一共有 $256 \times 256 = 65536$ 个取值.

因此, 类型 `(u8, u8)` 对应类型 $65536$, 当然我还可以用 `class`.

```ts
class Point {
    x: u8 = 0
    y: u8 = 0
}
```

于是 `Point` 和 `(u8, u8)` 也能相互转换, `tuple` 其实就是一个 `untagged class`

数学上集合的积叫做**笛卡尔积** (Cartesian Product), 大小相当于所有子集合大小的乘积.

所以类型论里管这种结构叫**积类型** (Product Type)

### Function type

first class function 的语言, 所以函数也是一种类型, 那么函数类型对应的数如何计算呢?


是的, 我们需要做的就是记下每个可能的实现并计算它们。

简单！例如, 假设我们有一个函数SuitColor映射卡Suit到Color, 红色或黑色。type Suit = Heart | Spade | Diamond | Club
type Color = Red | Black

type SuitColor = Suit -> Color无论提供什么样的诉讼, 一种方法是返回红色：(Heart -> Red); (Spade -> Red); (Diamond -> Red); (Club -> Red)

## Generics Type

泛型或者说参化多态能让你能根据自定义的需求, 编写出适用于任意类型的、灵活可复用的函数及类型

让你避免编写重复的代码, 用一种清晰抽象的方式来表达代码的意图

```ts
type Option<T> {
    Some(T),
    None
}
```

当填入任意类型时, `Optional<String>` 是一种类型, `Optional<Integer>` 是一种类型

但 `Optional<T>` 不是, 它是一个类型构造函数

我们可以认为泛型是作用在类型上的一种特殊的函数, 它接受一种或者多种类型, 返回一种新的类型

因此 `Option<T>` 对应多项式函数 $F(t) = t + 1$

同样的我们还有 `Result<T, E>` 类型, 对应多元多项式函数 $F(t, e) = t + e$

```ts
type Result<T, E> {
  Ok(T),
  Fail(E),
}
```

### Recursive Type

这里的 List 说的是 lisp 中的 List,

虽然 valkyrie 中内置了一个 List类型, 不过那个实际是 `Deque<Any>`


```ts
type List<T> {
    Nil,
    Cons {
        car: T,
        cdr: List<T>,
    }
}
```

- cons:  对象构造器 (constructs memory objects)
- car: 暂存器位址内容 (content of address register)
- cdr: 递减暂存器内容 (content of decrement register)
- nil: 拉丁语, 等价于英语中的 nothing

任何非空的列表, 都可以被视为一对由列表第一个元素及列表其余元素所组成的列表。 Lisp 列表体现了这个概念。我们使用 Cons 的一半来指向列表的第一个元素, 然后用另一半指向列表其余的元素(可能是别的 Cons 或 nil )。

List 是和类型, Nil 是单位类型, Cons 是积类型, 所以可以列出表达式

$$L(t) = 1 + t * L(t)$$

看起来就像是个方程, 我们可以解出

$$L(t) = \frac{1}{1-t}$$

看起来有点诡异, 这是什么意思?

-/



### Differential Type

### Usage

这就是你可以称之为“无损”的转换。如果您对转换进行往返, 则可以恢复原始值。数学家会称之为同构（来自希腊语“相同的形状”）。

另一个例子怎么样？这是一个包含三种情况的类型, 是, 否, 也许。type YesNoMaybe =
    | Yes
    | No
    | Maybe我们可以无损地将其转换为此类型吗？type YesNoOption = { maybeIsYes: bool option }
