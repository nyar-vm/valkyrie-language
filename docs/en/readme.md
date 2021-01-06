---
home: true
actionText: Start to read
actionLink: /en/appendix/
footer: CC0 Licensed | Copyright © 2012-2023 Aster™
---

## Introduce

Valkyrie is a experimental multi-stage gradual typed language, hoping to combine the respective advantages of static typing and dynamic typing.

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



## Tools

- [Jupyter]()
- [Idea Intellij]()
- [VS Code]()
- [AST]()


## Tutorial


首先学习基础语法
- [Literals](./literal/readme.md)
- [Collections](./collection/readme.md)
- [Function calls and subscripts](./invoke/readme.md)
- [Monadic calls and null safety](./invoke/readme.md)
- [Let Binding]()
- [Define Function]()
- [Module]() & [Package]()

接着学习FP与 OOP 如何结合
- [Interface and Trait]()
- [Structure and Class]()
- [Constructor and builder pattern]()
- [Disjoint Union and Variants]()
- [Union, Enumerate and Flags]()
- [Macro]()

然后学习新潮的控制流
- [If] & [Switch]
- [While Loop] & [For Loop]
- [Try, Catch, Return and Resume]



最后是永无止境的进阶之旅
- Annotation and Macroes
- Define Effect
- IO effect and logging effect
- Generics, covariance, contravariance and invariance
- Type conversion, type reinterpretation and type transmutation
- Iterators and Generators
- Closures, callbacks and asynchronous programming
- Extractor & Pattern Match
- Raw pointers and unsafe programming
- 值类型与栈
- Macro and package isolation compile





