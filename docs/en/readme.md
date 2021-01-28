---
home: true
actionText: Start to read
actionLink: /en/literal/readme.md
footer: CC0 Licensed | Copyright © 2012-2023 Aster™
---

## Introduce

Valkyrie is a experimental multi-stage gradual typed language, hoping to combine the respective advantages of static
typing and dynamic typing.

Integrate functional programming and object-oriented programming paradigms, and explore new effect-based paradigms.

The grammar mainly borrows from scala and swift, But many runtime concepts come from rust.

In fact, you can think of it as scala implemented in rust.

## Features

- **Algebraic Data Types**
    - Your favorite functional paradigm
    - Null-safe, languages under the ADT model are strictly null-safe
- **Algebraic subtyping**
    - Restricted traditional object-oriented paradigm
- **Algebraic Effects** (planned, semantically unclear)
- **Gradual Structure Typing**
    - Intelligent automatic type inference (in progress)
- **AST Macros** (in progress)
    - Multi-stage programming with package isolation (not yet implemented)
- **Concurrent Garbage Collection** (in plan, use rc for now)
- **Lossless Rust FFI** (in plan, waiting for crABI)

## Tools & Community

- [Jupyter Runner](https://github.com/nyar-vm/valkyrie-jupyter/blob/dev/projects/playground/main.ipynb): interactive execution
  environment
- [Idea Intellij](https://plugins.jetbrains.com/plugin/19452-valkyrie-language): IDEA support
- [AST Visitor](https://docs.rs/valkyrie-ast/0.1.7/valkyrie_ast/): AST definition and pretty print


- Advice on Github: [github.com/valkyrie-language](https://github.com/nyar-vm/valkyrie-language/discussions)
- Chat in Discord: [![discord](https://img.shields.io/discord/794446776232443955.svg?logo=discord&style=flat-square)](https://discord.gg/rDScD9GyUC)


## Tutorial

Learn basic syntax first

- [Literals](./literal/readme.md): learn basic literals like bool, string and integer
- [Collections](./collection/readme.md): learn common collections like list, map, set
- [Calls and subscripts](./invoke/readme.md): learn how to call functions and get items
- [Let Bind](./definition/let-binding.md): learn how to define variables
- [Define Function](./definition/def-micro.md): learn how to define functions
- [Module](./definition/module.md) & [Package](./definition/package.md): learn how to organize code

Then learn how to combine FP and OOP

- [Structure and Class](./definition/structure.md): learn polymorphism through subtyping
- [Interface and Trait](./definition/interface.md): learn polymorphism through type class
- [Enumerate](./definition/enumerate.md) & [Flags](./definition/flags.md): Learn to code in a more readable way
- [Disjoint Union and Variants](./definition/disjoint-union.md): learn polymorphism through ADT
- Macro: learn meta programming through AST transformation

Then learn funky control flow

- [If](./control/jump-if.md) & [Switch](./control/jump-switch.md): learn how to jump by condition
- [While Loop](./control/loop-while.md) & [For Loop](./control/loop-for.md): learn how to loop with condition and
  iterator
- [Return, Break and Continue](./control/jump-control.md): learn how to return non-locally
- Try, Catch and Resume: learn how to return non-locally

Finally, a never-ending journey of advancement

- [Pattern Match](./advance/pattern-match.md) & [Extractor](./advance/extractor.md)
- [Constructor and Builder](./advance/builder.md)
- Define Effect
- `Io` effect and `Logging` effect
- Generics, covariance, contravariance and invariance
- Type conversion, type reinterpretation and type transmutation
- Iterators and Generators
- Closures, callbacks and asynchronous programming
- Raw pointers and unsafe programming
- Value types and the stack allocation
- Macro and package isolation compile





