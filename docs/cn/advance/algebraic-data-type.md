## Algebraic Data Type

代数数据类型简称 ADT, Curry-Howard 同构指出了逻辑系统和程序语言之间的相似性


$$\begin{array}{|c|c|c|}\hline
\text { Algebra } & \text { Logic } & \text { Types } \\
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

```ts
type Void;
```

我们声明了一个类型, 但是他没有任何实例, 也就是说他有零个值.

类型 0 用于代表无法正常返回, 程序可能会永远运行下去

```py
def never_return() -> Void {
    while true { }
}
```

### Unit

通过计算类型的可能值可以连接两个相似数字代数。用`Bool`定义：

在计算机科学中，这种类型通常被称为Unit，并做如下定义：

data Unit = Unit
在Haskell中已经有了一个只有一个值的类型叫`()`（发音为Unit），你不能自己定义，但你可以这么用：

### Boolean

```ts
type Boolean = True | False;
```

Bool类型的对象有两个值：False或True。暂且把Bool类型与数字代数中的2对应起来。

### More

以此类推我们还能定义类型 3, 类型 4, 比如

```ts
type Sign = Positive | Negative | Zero;
type Direction = East | South | West | North;
```

对于 `u8`, 它有 $0\sim255$ 一共 $256$ 个取值, 所以对应类型 $256$

同时 `i8` 也有 $256$ 个取值, 也是类型 $256$, 因此这两者能相互转换



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

## Sum Type

笛卡尔积固然能帮助我们构建各式各样的复合类型，但它无法描述这样的场景：我们想为 User 添加一个 payment 的类型，它可以是信用卡，现金，微信，以及 ABT 其中的一种。自然，我们可以这样描述：

```rust
enum Payment {
  Creditcard,
  Cash,
  Wechat,
  Abt,
}
```

但这样的类型并不完备 —— 如果用户选择了信用卡，那么需要信用卡号，过期时间，持卡人等信息，而选择 ABT，则需要钱包地址及其公钥。这该怎么办？我们需要类似于这样的类型：

```
Creditcard(CreditcardType) | Cash(f64) | ... | Abt(WalletType)
```

在集合论中，这被称作 disjoint union（不相交集），表述为 A + B。 如图：

<div align=center><img src="/assets/Equivalentie.svg"></div>

不相交集在数据类型中往往被称作 tagged union (C++) 或者 sum type (haskell, rust)，和 product type 相反的是，大部分编程语言没有 sum type。我们看 rust 是如何使用 sum type 来解决上面的问题的：

围绕着编程语言是否需要 exception，exception 是良药还是毒药，有诸多争议，java / python 是建制派，C++ / haskell 是骑墙派，rust / go 是反对派，erlang / elixir 是无政府主义者，这里便不展开。你问我支持谁？我喜欢尤达大师对卢克说的那句经典台词：do or do not, there's no try。这句话也蕴含了 erlang 的哲理：let it crash。

## Union Type

并类型, 虽然很多时候和和类型是一样的, 但是有时候是不一样的

一定程度上解决了 null 的问题, 但是考虑 get(key), 到底这个值天生就是 null 还是取不到所以是 null?

typescript 和 python 里就常有这样的问题



### Function type

first class function 的语言, 所以函数也是一种类型, 那么函数类型对应的数如何计算呢?




## Generics Type

Generics type，或者说泛型，是让人又爱又恨的类型。它简化了代码，提升了抽象程度，但程序员为之付出的代价是陡升的学习曲线。抛开泛型的好坏不提，我们先看看泛型的数学意义是什么。还是以 Option 类型来说事：

```ts
type Option<T> {
    Some(T),
    None
}
```

Optional<'a>它不是一个类型，而是一个类型构造函数。

Optional<string>是一种类型。

Optional<int>是一种类型，但Optional<'a>不是。

T 代表任意类型，`Option<T>` 是 T 映射到这个 enum 的结果。

所以换个角度，我们可以认为泛型是作用在类型上的一种特殊的函数，它接受一种或者多种类型，返回一种新的类型。

多项式函数 $f(t) = t + 1$

```ts
type Result<T, E> {
  Ok(T),
  Fail(E),
}
```

多项式函数 $f(t, e) = t + e$




### Recursive Type

### Differential Type

### Usage

这就是你可以称之为“无损”的转换。如果您对转换进行往返，则可以恢复原始值。数学家会称之为同构（来自希腊语“相同的形状”）。

另一个例子怎么样？这是一个包含三种情况的类型，是，否，也许。type YesNoMaybe =
    | Yes
    | No
    | Maybe我们可以无损地将其转换为此类型吗？type YesNoOption = { maybeIsYes: bool option }
