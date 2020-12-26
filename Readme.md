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
r"raw-string:    ${x + 1}\n"
s"slot-string:   ${x + 1}\n"
f"format-string: %s %f\s \n"
````

Similarly, you can also use extension to extend your own string pattern

As you have guessed, use `string_prefix`, which is also a manifestation of consistency

What application can you think of? Embed json object? Embed re object? Or more cool usage?

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
    case _      => "something else"
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
    case _              => "none of the above conditions are met"
}
````

### case deconstruction

Sometimes you want to match a certain piece of data, then you can use case deconstruction

````valkyrie
if case Point {x: a, y, ...p} = Point {x: 1, y: 2, z: 3, w: 4, } {
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

## Closures and Lambda Functions

Closures are also a necessary feature of a modern language.

Consider the following function:

````valkyrie
def doulbe_even(x) {
    match x {
        x if x % 2 => 2 * x,
        x          => x,
    }
}
[1, 2, 3, 4].map(doulbe_even)
````

If the last parameter accepted by a function is a closure, then `()` can be omitted.

Now consider writing it as an anonymous function:

````valkyrie
[1, 2, 3, 4].map {
    /// `{lambda (x) expr}` even longer than python 🤣
    lambda (x) match x {
        x if x % 2 => 2 * x,
        x          => x,
    }
}
````

(This looks so complicated 🤣 :)

This is a full form of closure, it only exists as a result of desugar, and is not actually used.

The following `case closure` is commonly used:

````valkyrie
[1, 2, 3, 4].map {
    case x if x % 2 => 2 * x,
    case x          => x,
}
````

There is also a shorthand method called `slot closure`:

````valkyrie
[1, 2, 3, 4].map {
    if $0 % 2 {2 * $0} else {$0}
}
/// Looks like perl, maybe the ternary operator should be banned
[1, 2, 3, 4].map {$0 % 2 ? 2 * $0 : $0}
````


## Polymorphism

Sometimes we need some polymorphic interfaces, such as functions that accept strings and integers at the same time

The most intrusive but the most convenient to use is implicit type conversion

````valkyrie
/// First define ordinary type conversion
extends Integer: From<String> {
    def from(s) { Self::parse(i) }
}
/// `ImplicitFrom<T>` needs to meet trait bound `From<T>`
extends Integer: ImplicitFrom<String>;

def add_one(input: Integer): Integer {
    input + 1
}
/// Found type mismatch, try implicit type conversion
add_one("1") /// 2
````

Followed by explicit type conversion, automatic convert input.

````valkyrie
def add_one(auto input: Integer): Integer {
    input + 1
}
/// Found that the type does not match, call the `from` method
add_one("1") /// 2
````

The more standard is to use trait-based generic static dispatch

This constraint method is also called parametric polymorphism, or generic

````valkyrie
def add_one<T>(input: T): Integer
for T: Into<Integer>
{
    input.into() + 1
}
````

The above methods are all non-limiting polymorphism, and the input does not need to be predetermined.

But sometimes the input is fixed in several categories, which requires definite polymorphism.

Restrictive polymorphism can be realized by combining types and sum types. Many languages do not distinguish between the two, or even confuse the two.

But think about it carefully, can `Optional<Optional<T>>` and `Nullable<Nullable<T>>` be the same?

````valkyrie
/// This is the sum type, tagged union
tagged Optional<T> {
    Some<T>,
    None,
}

/// This is the union type, untagged union
class Null {};
type Nullable<T> = T | Null;

Optional<Optional<T>> ==> Optional<Optional<T>>
Nullable<Nullable<T>> ==> Nullable<T>
````

So the treatment of the two is also different.

But in fact the compiler should be able to optimize to the same.

````valkyrie
/// sum type matching
def add_one(input: Integer|String): Integer {
    let y = match input {
        x is Integer => x,
        x is String => Integer::parse(x)
    }
    y + 1
}

/// union type matching
tagged Canbe {
    Integer(Integer)
    String(String)
}

def add_one(input: Canbe): Integer {
    let y = match input {
        Canbe::Integer(x) => x,
        Canbe::String(x) => Integer::parse(x)
    }
    y + 1
}
````

## Specially designed REPL mode

REPL mode refers to a working mode similar to Mathematica, Observable or Jupyter

### Sequential and non-sequential mode

Consider the following code:

````ts
let second  = 1 + first;
let first  = 1;
````

In a sequential language, this should report an error directly, the first line occurs before the second line, and an undeclared and uninitialized variable `first` cannot be used.

But in a non-chronological language, this is achievable, because all declarations happen at the same time, and no one comes first.

Then consider the following code:

````ts
let a = 1;
let a = 2;
````

In a non-sequential language, it is obvious that the second line should cover the declaration of `a` in the first line.

But in an unscheduled language, an error will be reported, because all declarations occur at the same time, and no one comes first.

The scope and closure in Valkyrie are sequential, but the function still cannot be declared repeatedly.

Other packages, classes, traits, and tagged are all non-sequential, so repeated declarations are prohibited.

### REPL mode

But in REPL mode, the package namespace is time-sequential, and you can modify a function repeatedly and overwrite the previous one, which is very convenient for debugging.

All undeclared variables in REPL mode default to the variable variables declared for the first time. This setting borrows from Mathematica and is also very convenient for debugging.

In REPL mode, you can use `use?` to import an external module and allow repeated imports to achieve hot reloading

Here `?` means do not add to the global method table, because once added, it will pollute all definitions, and this pollution is irreversible.

REPL mode can use `¶` and `⁋` to get historical input and output, which is equivalent to Mathematica's `In`, `Out` and `%`

## AST-based macro

AST-based macros may not be as powerful as token-based macros, but do you really want to write a completely different language in another language?

In particular, the IDE support of Token macros is generally very poor, but AST macros with TokenKind can get very good support.

## IR compatibility

Valkyrie's syntax is not absolutely stable. Valkyrie will compile the source file into a single IR file to shield this change and obtain forward compatibility.

Valkyrie uses a Rust-like Edition release model.

