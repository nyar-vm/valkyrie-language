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

### Digit mode

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

Then you can write as follows!

````valkyrie
use SIUnit;
let weight = 1kg + 1g;
````

By analogy, you should be able to easily implement the following functions, which is the embodiment of Valkyrie's consistency.

````valkyrie
use Complex;
let z = 1 + 2i;
/// Note that you cannot bind `i` twice in one namespace
use Quaternion;
let q = 1 + 2i + 3j + 4k;
````

### String mode

String is also a very complicated thing, it is difficult to adjust, different people like different writing.

Fortunately, we have string patterns, which are prefix expressions.

If there is no prefix, the default string is called `s-string(slot)`.

````valkyrie
r"\a"
s"${x}"
f""
re""
````

Similarly, you can also use extension to extend your own string pattern

As you have guessed, use `string_prefix`, which is also a manifestation of consistency

What application can you think of? Embed json object? Embed css style? Or more cool usage?

## Pattern matching

More and more languages use pattern matching or similar grammars, and pattern matching is fast becoming the standard for every language.

Valkyrie of course also has a highly consistent, but desugar flexible pattern matching syntax

### Literal match

Literal matching is basic.

````valkyrie
match x {
    case 1      => "integer"
    case 1.0    => "decimal"
    case '1'    => "character"
    case "1"    => "string"
    case 1...4  => "range"
    case (1, 2) => "tuple"
    case [1, 2] => "list"
    _           => "something else"
}
````

### case guard

Sometimes the amount of pattern matching requires a little conditional judgment, in this case you can use the `case guard`

````valkyrie
match x {
    case x is Integer   => "x is an instance of type `Integer`"
    case x is Callablte => "x satisfies the trait bound `Callable`"
    case x in [1, 2, 3] => "x is one of [1, 2, 3]"
    case x if x < 0     => "x satisfies the condition x < 0"
    _                   => "none of the above conditions are met"
}
````

### case deconstruction

Sometimes you want to match a certain piece of data, then you can use case deconstruction

````valkyrie
if case Point {x: a, y, ...p} = Point {x: 1, y: 2, z: 3, w: 4} {
    print(a) /// 1
    print(y) /// 2
    print(p) /// {z: 3, w: 4}
}

if case Point(a, ..p, y) = Point(1, 2, 3, 4) {
    print(a) /// 1
    print(p) /// [2, 3]
    print(y) /// 4
}
````

### Custom extractor

For custom classes, you can define the `unapply` method to customize the extracted data.

````valkyrie
match input {
    case Regex(group0) => Integer::parse(group0),
}
/// desugar as unapply
if case Some(group0) = Regex::unapply(input) {
    Integer::parse(group0)
}
````
