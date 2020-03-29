### Higher Kinded Type


什么是高阶
我们知道，在强类型编程语言中，每一个表达式都有类型。有些类型，在这门语言中是内置的、基本的，我们把它们叫做“基础”类型。比如Rust里面的 i32 bool char 等等。还有一些类型，是通过其它类型一起组合出来的，比如函数，

fn double(arg: i32) -> i32 {
    arg * 2
}
这个函数类型指的是，接受一个 i32 类型参数，生成一个 i32 类型返回值。它们的类型都是可以列出来的：

expression    |   type
------------------------
true          |   bool
1             |   i32
double        |   i32 -> i32
double(2)     |   i32

如果一个函数，可以接受函数作为参数或者返回值，那么它就是所谓的高阶函数(higher ordered function)。

fn twice(f: fn(i32)->i32) -> Box<Fn(i32)->i32>
{
    Box::new(move |a| f(f(a)))
}

fn double(arg: i32) -> i32 {
    arg * 2
}

fn main() {
    let g = twice(double);
    println!("{}", g(2));
}
上例中，这个 twice 函数，就是高阶函数，它的类型为 (i32->i32) -> (i32->i32)。


Vector 他不是类型, 他是泛型, 具体的 Vector<u8> 才是类型


还有一些更复杂的类型，比如 Vec<i32> 比上面的这些类型更复杂。因为 Vec 本身不是一个合法类型，它必须接受一个类型参数 i32 才能成为一个真正的类型 Vec<i32>。我们可以把 Vec 视为针对类型的“函数”，称作“类型构造器”，给它输入一个类型，它会返回一个类型出来。我们定义一个概念“阶(kind)” 来描述这种现象。比如最基本的类型 i32 bool ，它们的kind就是 type。而 Vec 的kind就是 type -> type。

expression |  kind
-------------------
i32        |  type
i32 -> i32 |  type
Vec<i32>   |  type
Vec        |  type -> type

类似的，假如我们有一个类型构造器，它本身可以接受类型构造器作为参数，那它就是“高阶类型”。比如，我们要设计一个容器类型，它里面装的一组 i32 整数，但是我们把内部具体实现方式（可以用 Vec 或者 List）开放出来作为参数由用户指定，伪代码类似这样：

// 类似 scala 的伪代码
struct Collection<C<_>> {
    data: C<i32>
}
使用的时候，我们可以这样指定泛型参数 Collection<Vec> Collection<LinkedList>，那么这个 Collection 就是所谓的“高阶类型”。

expression          |  kind
-------------------------------------------
Vec<i32>            |  type
Vec                 |  type -> type
Collection          |  (type->type) -> type
Collection<Vec<_>>  |  type -> type

在Rust里面，有个特殊的地方是，泛型参数被分成了两类（两种基本的 kind），分别是 type 以及 lifetime。比如，我们最常见的引用类型，它就是类型构造器，且有生命周期泛型参数：

expression     | kind
-----------------------
&'a i32        | type
&              | (lifetime, type) -> type

高阶生命周期
实际上，现在的Rust已经支持了某种意义上的“高阶类型”，那就是所谓的“高阶生命周期约束”。参考 nomicon。它的语法如下：

for<'a> F: Fn(&'a T) -> &'a T
它代表的意思是，对于任意 'a，F 满足 Fn(&'a T) -> &'a T。比如说，标准库中，就有很多地方用到了这个：

trait Iterator {
    fn filter<P>(self, predicate: P) -> Filter<Self, P>
        where
            P: FnMut(&Self::Item) -> bool
}
这里的泛型参数 P，就用到了高阶生命周期，源码中的写法是省略写法，如果要写完整，它实际上意思是这样：

where P: for<'a> FnMut(&'a Self::Item) -> bool
但是这个语法目前只支持生命周期泛型参数，不能用于普通类型参数。

其它语言中的hkt
这一部分来自于 niko 的博客，本人完全没有把握是否完整理解了 niko 的文章，欢迎各位提意见。

一个直观的 hkt 设计方案，就是直接为这个功能设计一种高阶类型的语法。举个例子，假如我们想设计一个通用函数，它能把一个容器中的整数类型转换为浮点数类型，容器本身是泛型的，可以是 Vec 或者 LinkedList，可以这么设计:

// 假设一种表示高阶类型的语法，类似 scala
fn floatify_hkt<I<_>>(ints: &I<i32>) -> I<f32>
//              ^^^^ the notation `I<_>` signals that `I` is
//                   not a complete type
这个例子以及解释是从 Nicholas D. Matsakis 的博客搬运过来的。在这个例子中，I 是一个泛型参数，它是一个类型构造器。假如 I 被实例化为 Vec，那么这个函数的类型就被实例化成了 Vec<i32> -> Vec<f32>，假如 I 被实例化为 LinkedList，那么这个函数的类型就被实例化成了 LinkedList<i32> -> LinkedList<f32>。但是这个设计有许多问题，下面逐一分析。

高阶trait约束
Rust泛型的类型检查，是在泛型函数、类型定义的时候当场检查的，而不是等到实例化的时候才检查。所以，对于上面这个泛型函数，我们一定需要对它指定合理的约束条件，否则类型 I<i32> 什么都干不了。

假设我们定义下面这样的一个 trait，来对 Vec 和 LinkedList 做一个统一抽象：

trait Collection<Item> {
    fn empty() -> Self;
    fn add(&mut self, value: Item);
    fn iterate<'iter>(&'iter self) -> Self::Iter<'iter>;
    type Iter: Iterable<Item>;
}
然后，对上面那个泛型函数添加高阶类型约束条件：

fn floatify_hkt<I<_>>(ints: &I<i32>) -> I<f32>
    where for<T> I<T>: Collection<T>
看起来这个 higher kinded trait bounds 的设计很合理。但是，我们注意到 Haskell 中是不存在 higher kinded trait bounds 这种东西的，它一定是因为某种原因而没有这样设计。所以 Haskell 里面只能这么写，把各种可能性枚举出来：

fn floatify_hkt<I<_>>(ints: &I<i32>) -> I<f32>
    where I<i32>: Collection<i32>,
          I<f32>: Collection<f32>
如果只能用这样的写法呢，是会有问题的。某些情况下，会造成“抽象泄漏”。比如说，像下面这样一个函数：

fn process<I<_>>(inputs: &I<Input>) -> I<Output>
    where I<Input>: Collection<Input>, I<Output>: Collection<Output>,
{
    struct MyType { ... }

    ...
}
如果这个函数内部定义了一个类型，这个函数的输出类型是 I<MyType>。那我们的这个泛型约束就很难写出来，除非把 MyType 定义到这个函数外边。本来我们希望封装到内部的类型，被迫暴露出去了，这就是抽象泄漏。

对 Haskell 来说，这好像是一个比较常见的问题。随手搜索了一下，看起来 Haskell 的解决方案是使用 TypeFamily。这也是Rust设计组准备采用的方案。

在 Scala 中，如何表达任意的高阶类型约束不清楚，希望有网友能告知。

高阶Self类型
在前面，我们定义了一个trait Collection<T>，它的成员类型是 T。因此我们可以对不同的容器写这样的 impl：

impl<T> Collection<T> for Vec<T> {}
//                        ^^ this is a type
在这个impl块中，我们针对的是 Vec<T> 来实现的，它的kind是 type。如果我们要支持高阶类型，那么我们应该支持针对kind为 type->type 的类型impl。我们现在更进一步，如果我们想定义一个高阶trait，怎么办？意思是，impl 的时候 for 后面的那个目标如果是“类型构造器”的话，是什么情况。假设我们这么设计：

trait HkCollection for Self<_> {
//    ^^               ^^^^^^^ declare that `Self` is a type constructor
//    stands for "higher-kinded"

    fn empty<T>() -> Self<T>;
    fn add<T>(self: &mut Self<T>, value: T);
    //    ^^^ the `T` effectively moved from the trait to the methods
    ...
}

impl HkCollection for Vec<_> {
//                    ^^ this is a type constructor
    fn empty<T>() -> Vec<T> {
        Vec::new()
    }
    ...
}
如果有了这样的东西，那么我们可以针对任何一个类型构造器 I，写这样的约束条件 where I: HkCollection，而不需要写 where for<T> I<T>: Collection<T>，因为我们的 HkCollection 是作用到类型构造器上的。

这个设计看起来很不错，但它有非常巨大的缺陷。比如，它无法针对 BitSet 这样的容器 impl。

impl HkCollection for BitSet {}
//                    ^^ not a type constructor
另外一个问题是，有些容器，它对内部元素的类型是有约束条件的。比如 HashSet<T>，它要求 T: Hash 条件。在上面这个设计中，像 Self<_> 这样的设计，实际上没有办法约束 _ 应该满足什么条件：

trait HkCollection for HashSet<_>
//                     ^^^^^^^ how can we restrict `_` to `Hash` types?
Haskell 的 HKT 似乎是可以应用到任意类型上的，无法指定约束条件。但是在Rust里面，约束条件无处不在，我们如果选择 Foo<_> 这样的设计，那么一定要想个办法来写清楚 _ 的约束条件。

类型推断
注意到前面我们说过的，Rust的一个特殊之处在于，它的泛型参数有两种 kind，分别是 type 和 lifetime。假如我们有这样的一个类型：

struct ListIter<'iter, T> { ... }
那么，一个完整的 ListIter<'a, T> 它的 kind 是 type，而 ListIter 它的 kind 可以看作 (lifetime, type)->type。如果我们定义一个类型 type I<'_> = ListIter<'_, i32>，那么 I 的 kind 就是 lifetime->type。高阶类型内部还可以嵌套，比如 G<_<_>>，那么这个 G 的 kind 就是 (type->type)->type。这种设计可以让你把“类型”当成“函数”来看待，有些类型本身接受类型参数，然后生成新的类型。但是，它还有个缺陷是，影响了类型推断 type inference。我们来看这个例子：

fn floatify_hkt<I<_>>(ints: &I<i32>) -> I<f32>
这里的类型参数 I 的 kind 是 type->type。这个函数的目的是，把一个容器内部的元素从 i32 转成 f32（Vec<i32> -> Vec<f32> 或者 LinkedList<i32> -> LinkedList<f32>，而不是 Vec<i32> -> LinkedList<f32>）。那么，现在这个类型推断就会出问题了，即便我们已经知道了具体的实参类型和返回值类型，我们还是解不出来这个 I 是什么。

这个问题实际上是这样的，I 实际上是一个“函数”，它输入一个 type，输出一个 type。现在我们可以从实参类型，得到它的其中一个输入以及对应的输出 I<i32> == Vec<i32>。我们还可以从返回类型，得到它的另外一个输入以及对应的输出 I<f32> == Vec<f32>。请问现在这个 I 是什么。这个问题类似于：假设 f(1) == 2 且 f(2) == 3，求函数 f 是什么。这个问题没有“唯一”解。当然，如果我们假设 f 一定是一阶函数，那么我们可以求出来 f(x) = x + 1，但是没有这个条件的情况下就难说了。

Haskell 是没有这个问题的，这是因为 Haskell 限制了泛型参数的应用顺序，即所谓的 Currying。在Rust中没有 Currying，这意味着 Vec<_> 的kind 是 type->type，Result<_, i32> 的kind是 type->type，Result<i32, _> 的kind也是 type->type。所以，假设我们有下面这样一个方程求解：

?1<?2> = Result<i32, u32>
那么 ?1 = Result<i32, _>, ?2 = u32 或者 ?1 = Result<_, u32>, ?2 = i32，都是这个方程的解。

Rust是不能采用Currying的设计的。第一个原因是它有两种基本的 kind。比如说我们有个类型 Iterable<'a, T>，按Haskell的观点，它的 kind 可以写成 lifetime -> type -> type（实际上它还要求 T: 'a，这个就更复杂了先忽略）。我们希望给它一个指定的 T，那么它的kind就会变成 lifetime -> type。但是Currying是不允许这样的，参数是按顺序的，你必须先指定一个固定的lifetime，让它的kind变成 type->type。

Rust不采用Currying的第二个原因是，在实际中有些类型不是按顺序应用泛型参数的。比如我们的 HashMap 类型，它有三个泛型参数：pub struct HashMap<K, V, S = RandomState>，我们可能希望有一个类型构造器是这样的 M = HashMap<_, _, S>，但是用 Currying 是得不到的。

ATC
前面讲了很多为什么不在Rust中直接支持HKT的理由。接下来我们回到正题，说一说这个RFC究竟是一个什么样的提案。从这个提案的名字上，我们就可以看出一点端倪，它叫做 generic associated types (泛型关联类型)，或者叫做 associated type constructors (关联类型构造器)。它的实质就是，允许trait里面的“关联类型”成为“类型构造器”。比如说：

trait Iterable {
    type Item<'a>; // 注意它携带泛型参数
    // Item 的 kind 是 lifetime -> type
}

trait Foo {
    type Bar<T>;  // 泛型参数可以是生命周期，可以是类型
    // Bar 的 kind 是 type -> type
}
语法上非常简单，就是这么一个小小的扩展。我们来看看在这个功能基础上，怎么设计本文前面的那个 floatify 函数。首先我们当然需要一个 trait，来统一抽象我们的容器类型：

trait Collection<T> {
    fn empty() -> Self;
    fn add(&mut self, value: T);
    fn iterate(&self) -> Self::Iter;
    type Iter: Iterator<Item=T>;
}
假设我们有一个具体容器，名字叫做 List<T>，我们针对这个类型，实现这个 trait：

impl<T> Collection<T> for List<T> {
    fn empty() -> List<T> {
        List::new()
    }

    fn add(&mut self, value: T) {
        self.prepend(value);
    }

    fn iterate<'iter>(&'iter self) -> ListIter<'iter, T> {
        self.iter()
    }

    type Iter = ListIter<'iter, T>;
    //                   ^^^^^ oh, wait, this is not in scope!
}
从这里我们看到了问题所在，在写最后的关联类型的时候，我们发现，这个生命周期参数没法写。这时候，就该ATC这个功能出场了。我们可以让这个关联类型不是一个具体类型，而是一个“类型构造器”，它的 kind 为 lifetime->type，这样我们可以让它在各种场合下，针对不同的生命周期，生成合适的类型。修改 trait 的设计如下：

trait Collection<T> {
    // as before
    fn empty() -> Self;
    fn add(&mut self, value: T);

    // Here, we use associated type constructors:
    fn iterate<'iter>(&'iter self) -> Self::Iter<'iter>;
    type Iter<'iter>: Iterator<Item=T>;
}
注意这个语法，有点容易混淆，这个关联类型 Iter 在声明的时候有个参数，就代表它是“类型构造器”，在 iterator 方法返回的时候，我们要给 Iter 一个合适的参数，它才能生成具体的类型。我们对具体类型来impl这个trait：

use std::slice;
impl<T> Collection<T> for Vec<T> {
    fn empty() -> Self { vec![] }
    fn add(&mut self, value: T) { self.push(value); }
    fn iterate<'iter>(&'iter self) -> slice::Iter<'self, T> { self.iter() }
    type Iter<'iter> = slice::Iter<'iter, T>;
}
那么，用这样的一个 trait，我们就可以实现最开始的那个函数了：

fn floatify<I, F>(ints: &I) -> F
    where I: Collection<i32>, F: Collection<f32>
{
    let mut floats = F::empty();
    for &f in c.iterate() {
        floats.add(f as f32);
    }
    floats
}
这个函数是可以工作的。但是，它有一个缺点，那就是，不仅可以支持 Vec<i32> -> Vec<f32> 还可以支持 Vec<i32> -> LinkedList<f32>。

fn test(x: &Vec<i32>) {
    let y: Vec<f32> = floatify(x); // 可以通过
    let z: LinkedList<f32> = floatify(x); // 可以通过
    let p = floatify(x); // 编译错误，p 的类型无法推断
}
所以，这个实现依然不是我们想要的东西，我们想要的是类似这样的函数：

// 输入和输出是同样的容器类型
fn floatify_hkt<I>(ints: &I<i32>) -> I<f32>
//                        ^^^^^^ wait up, what is `I` here?
接下来，我们要用一种“设计模式”，叫做 type family（也是从 Haskell 学的）。我们另外定义一个trait：

trait CollectionFamily {
    // Member 也是一个 type constructor
    type Member<T>: Collection<T, Family = Self>;
}
针对具体类型 Vec 和 List 实现这个trait：

struct VecFamily;

impl CollectionFamily for VecFamily {
    type Member<T> = Vec<T>;
}

struct ListFamily;

impl CollectionFamily for ListFamily {
    type Member<T> = List<T>;
}
并且在原先的 Collection 中，再添加一个关联类型，指向 family：

trait Collection<T> {
    // Backlink to `Family`.
    type Family: CollectionFamily;
    ...
接下来，我们用这个 CollectionFamily 来重新实现 floatify:

fn floatify_family<C>(ints: &C) -> C::Family::Member<f32>
    where C: Collection<i32>
{
    let mut floats = C::Family::Member<f32>::empty();
    for &f in c.iterate() {
        floats.add(f as f32);
    }
    floats
}
上面这个设计圆满了，它满足了我们所有的需求。注意上面我们用到了针对 ATC 的约束：type Member<T>: Collection<T, Family = Self>;，它代表的真实含义实际上是：

for<T> Self::Member<T>: Collection<T, Family = Self>;
所以，我们也同时做到了针对高阶类型的约束。ATC 这个设计，语法改动小，基本是现有语法的一个自然延伸，而且可以完成高阶类型的功能，非常契合Rust当前的状态，相比而言，直接支持高阶类型语法不是一个好的选择。

目前，Rust编译器里面关于trait的逻辑很乱，还有一些难以修复的bug。因此，niko开了一个新项目 https://github.com/nikomatsakis/chalk，重写整个trait系统。在这个新的架构下，ATC功能基本是水到渠成顺手就做了的事情。所以，只要等 chalk 什么时候合并到正式编译器里面，用户就可以使用这个功能了，目测2017年有点悬，2018年肯定能实现。

高阶类型的出现，很可能可以解锁一些以前难以实现的问题，这还需要社区做更多的探索。比如，最近就有人提到，Generator 生成器最好是基于ATC来实现，否则有些场景下会出现编译错误，限制用户的发挥，参考 https://internals.rust-lang.org/t/streaming-generators/5850。

总结
很长一段时间以来，编程语言界出现了一大批换汤不换药的新语言，它们基本上都在朝一个方向努力，即降低开发难度。Rust偏偏剑走偏锋，主打底层和安全，是一个非常精明的举措。细看Rust的设计，其实也没有什么是独特的创新的，不论语法、安全、抽象、优化等等各方面，都有前人有过充分的研究和探讨。但是Rust设计组把它们组合起来，却进入了一个全新的境界，这应该是第一个把底层控制力、安全性、高级抽象能力各方面做得最平衡的一门语言。既面向底层，又有高级类型系统，恰好市面上没有竞争对手。

随着接下来 const generic 等 RFC 陆续设计完成，Rust在类型系统上的能力还会大幅提高。既要有高阶抽象能力，又要高性能，看起来并不是不可能完成的任务，不是么？或许在这个领域内，以后还会有其它更优秀的语言出现，但这没关系，方向已经指明，前途已经明朗，基础已经铺就，Rust证明了安全性、高级抽象能力、底层控制力，并非水火不相容。
