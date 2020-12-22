# Valkyrie Language

[![discord](https://img.shields.io/discord/794446776232443955.svg?logo=discord&style=flat-square)](https://discord.gg/rDScD9GyUC)


## Design goals

Valkyrie Language is a dynamic language with progressive types,

Valkyrie’s design goals are flexible, concise and highly consistent.

Its blood comes from Rust, Scala and Swift.

(Originally called vlang, but then vlang was occupied 🤣 :)

Next, we'll introduce the main features of Valkyrie Language

## Extension

If there is no extension, then Valkyrie is a very rigid and strict language.

Strictly uncomfortable, `1 + 1.0`, `"a" +'b'`, `[1] ++ 2`, none of them works.

Extensions gives Valkyrie a high degree of flexibility and possibility.

The extension named `Prelude` will be loaded by default. `Prelude` defines some common and reasonable arithmetic rules.

Extension can be inherited and rewritten, you can also define your own `Prelude`, and then form your own code style.

All the syntactic sugars in Valkyrie are statically determined by the corresponding traits to avoid unnecessary runtime overhead.

### Orphan Rules

If you want to extend a method, either the `class` is defined in your library, or the `trait` is defined in your library

Otherwise, it can only be modified in the `extension package namespace`

This rule is to prevent the introduction of unknown semantics without knowing it

````valkyrie
/// Namespace is generally lowercase, but extension is uppercase
/// Because the performance is similar to the introduce a trait
pkg extension Features;
````

### Operator overload

The most common application is operator overloading.

When you want to integrate two or more third-party library type conversions, it is often prohibited by the orphan rule.

(really hate rust's orphan rules 🤣 :)

So you need to declare extension to achieve compatibility.

There is also a situation where a certain operation is convenient, but it may not be very strict.

For example, we generally default that addition obeys the commutative law, but `"a" + "b" != "b" + "a"` breaks the commutative law.

So you can give the choice to the library user.

````valkyrie
/// Otherwise, all it will inherit all extensions in the current namespace
@no_prelude
pkg extension FreeAdd {
    /// Symbols are defined in the standard library
    /// Types are also defined in the standard library
    /// Overloading is prohibited by the orphan rule
    /// Ordinary overload does not need extension
    def +(i: Integer, f: Decimal) {
        /// The function will return automatically
        /// The return type is automatically inferred
        i as Decimal + f
    }
}
````

### 数字模式

Sometimes we want to enter some special values, such as calculations with units. If you use the constructor, it may make the code unreadable.

In this case, you can use digital mode.

Digital mode is in suffix form.

````valkyrie
tagged Quality {
    Kilogram(auto Decimal),
    Gram(auto Decimal),
}
def +(lhs: Quality, rhg: Quality): Quality {
    /// Some conversion rules, that's it, anyone can write
    @unimplemented()
}

pkg extension SIUnit {
    /// number_suffix means integer_suffix + decimal_suffix
    def number_suffix kg(n): Quality = Quality::Kilogram(n);
    def number_suffix  g(n): Quality = Quality::Gram(n);
}
````

然后你就可以写如下写法了!

````valkyrie
use SIUnit;
let weight = 1kg + 1g;
````

以此类推, 你应该能很轻易的实现下列功能, 这就是 Valkyrie 一致性的体现.

````valkyrie
use Complex;
let z = 1 + 2i;
/// Note that you cannot bind `i` twice in one namespace
use Quaternion;
let q = 1 + 2i + 3j + 4k;
````

### 字符串模式

字符串也是个很复杂的东西, 众口难调, 不同的人喜欢不同的写法

好在我们有字符串模式, 字符串模式是前缀表达.

如果什么前缀也没有, 默认的字符串叫 s-string(slot).

````valkyrie
r"\a"
s"${x}"
f""
re""
````

同样的, 你也可以用 extension 扩展你自己的字符串模式

你已经猜到了, 使用 `string_prefix`, 这也是一致性的体现

你能想到什么应用? 嵌入 json 对象? 嵌入 css 样式? 或者更炫酷的用法?

