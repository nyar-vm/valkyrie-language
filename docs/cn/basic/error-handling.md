

Option

Result





| 错误类型 | 场景                         |
| :------- | :--------------------------- |
| Result   |                              |
| Option   |                              |
| int      | 返回状态码                   |
| bool     | 返回是否成功                 |
| panic    | 无法恢复的错误, 立即退出程序 |


| 函数                | 简写 |
| :------------------ | :--- |
| unwrap              | `!`  |
| unwrap_or           |      |
| unwrap_or_default() | `!!` |
| throw               | `?`  |



### `Option` 枚举和其相对于空值的优势

在之前的部分, 我们看到了 `IpAddr` 枚举如何利用 Rust 的类型系统在程序中编码更多信息而不单单是数据. 接下来我们分析一个 `Option` 的案例, `Option` 是标准库定义的另一个枚举. `Option` 类型应用广泛因为它编码了一个非常普遍的场景, 即一个值要么有值要么没值. 从类型系统的角度来表达这个概念就意味着编译器需要检查是否处理了所有应该处理的情况, 这样就可以避免在其他编程语言中非常常见的 bug.

编程语言的设计经常要考虑包含哪些功能, 但考虑排除哪些功能也很重要. Rust 并没有很多其他语言中有的空值功能. **空值** (*Null* ) 是一个值, 它代表没有值. 在有空值的语言中, 变量总是这两种状态之一: 空值和非空值.

Tony Hoare, null 的发明者, 在他 2009 年的演讲 "Null References: The Billion Dollar Mistake" 中曾经说到:

> I call it my billion-dollar mistake. At that time, I was designing the first
> comprehensive type system for references in an object-oriented language. My
> goal was to ensure that all use of references should be absolutely safe, with
> checking performed automatically by the compiler. But I couldn't resist the
> temptation to put in a null reference, simply because it was so easy to
> implement. This has led to innumerable errors, vulnerabilities, and system
> crashes, which have probably caused a billion dollars of pain and damage in
> the last forty years.
>
> 我称之为我十亿美元的错误. 当时, 我在为一个面向对象语言设计第一个综合性的面向引用的类型系统. 我的目标是通过编译器的自动检查来保证所有引用的使用都应该是绝对安全的. 不过我未能抵抗住引入一个空引用的诱惑, 仅仅是因为它是这么的容易实现. 这引发了无数错误、漏洞和系统崩溃, 在之后的四十多年中造成了数十亿美元的苦痛和伤害.

空值的问题在于当你尝试像一个非空值那样使用一个空值, 会出现某种形式的错误. 因为空和非空的属性无处不在, 非常容易出现这类错误.

然而, 空值尝试表达的概念仍然是有意义的: 空值是一个因为某种原因目前无效或缺失的值.

问题不在于概念而在于具体的实现. 为此, Rust 并没有空值, 不过它确实拥有一个可以编码存在或不存在概念的枚举. 这个枚举是 `Option<T>`, 而且它[定义于标准库中][option]<!-- ignore -->, 如下:

[option]: https://doc.rust-lang.org/std/option/enum.Option.html

```vk
enum Option<T> {
    Some(T),
    None,
}
```

`Option<T>` 枚举是如此有用以至于它甚至被包含在了 prelude 之中, 你不需要将其显式引入作用域. 另外, 它的成员也是如此, 可以不需要 `Option::` 前缀来直接使用 `Some` 和 `None`. 即便如此 `Option<T>` 也仍是常规的枚举, `Some(T)` 和 `None` 仍是 `Option<T>` 的成员.

`<T>` 语法是一个我们还未讲到的 Rust 功能. 它是一个泛型类型参数, 第十章会更详细的讲解泛型. 目前, 所有你需要知道的就是 `<T>` 意味着 `Option` 枚举的 `Some` 成员可以包含任意类型的数据. 这里是一些包含数字类型和字符串类型 `Option` 值的例子:

```vk
let some_number = Some(5);
let some_string = Some("a string");

let absent_number: Option<i32> = None;
```

如果使用 `None` 而不是 `Some`, 需要告诉 Rust `Option<T>` 是什么类型的, 因为编译器只通过 `None` 值无法推断出 `Some` 成员保存的值的类型.

当有一个 `Some` 值时, 我们就知道存在一个值, 而这个值保存在 `Some` 中. 当有个 `None` 值时, 在某种意义上, 它跟空值具有相同的意义: 并没有一个有效的值. 那么, `Option<T>` 为什么就比空值要好呢？

简而言之, 因为 `Option<T>` 和 `T` (这里 `T` 可以是任何类型) 是不同的类型, 编译器不允许像一个肯定有效的值那样使用 `Option<T>`. 例如, 这段代码不能编译, 因为它尝试将 `Option<i8>` 与 `i8` 相加:

```vk
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y;
```

如果运行这些代码, 将得到类似这样的错误信息:

```text
error[E0277]: the trait bound `i8: std::ops::Add<std::option::Option<i8>>` is
not satisfied
 -->
  |
5 |     let sum = x + y;
  |                 ^ no implementation for `i8 + std::option::Option<i8>`
  |
```

很好! 事实上, 错误信息意味着 Rust 不知道该如何将 `Option<i8>` 与 `i8` 相加, 因为它们的类型不同. 当在 Rust 中拥有一个像 `i8` 这样类型的值时, 编译器确保它总是有一个有效的值. 我们可以自信使用而无需做空值检查. 只有当使用 `Option<i8>` (或者任何用到的类型) 的时候需要担心可能没有值, 而编译器会确保我们在使用值之前处理了为空的情况.

换句话说, 在对 `Option<T>` 进行 `T` 的运算之前必须将其转换为 `T`. 通常这能帮助我们捕获到空值最常见的问题之一: 假设某值不为空但实际上为空的情况.

不再担心会错误的假设一个非空值, 会让你对代码更加有信心. 为了拥有一个可能为空的值, 你必须要显式的将其放入对应类型的 `Option<T>` 中. 接着, 当使用这个值时, 必须明确的处理值为空的情况. 只要一个值不是 `Option<T>` 类型, 你就 **可以** 安全的认定它的值不为空. 这是 Rust 的一个经过深思熟虑的设计决策, 来限制空值的泛滥以增加 Rust 代码的安全性.

那么当有一个 `Option<T>` 的值时, 如何从 `Some` 成员中取出 `T` 的值来使用它呢？`Option<T>` 枚举拥有大量用于各种情况的方法: 你可以查看[它的文档][docs]<!-- ignore -->. 熟悉 `Option<T>` 的方法将对你的 Rust 之旅非常有用.

[docs]: https://doc.rust-lang.org/std/option/enum.Option.html

总的来说, 为了使用 `Option<T>` 值, 需要编写处理每个成员的代码. 你想要一些代码只当拥有 `Some(T)` 值时运行, 允许这些代码使用其中的 `T`. 也希望一些代码在值为 `None` 时运行, 这些代码并没有一个可用的 `T` 值. `match` 表达式就是这么一个处理枚举的控制流结构: 它会根据枚举的成员运行不同的代码, 这些代码可以使用匹配到的值中的数据.
