---
home: true
actionText: 开始阅读
actionLink: /cn/basic/
footer: CC0 Licensed | Copyright © 2012-2019 Aster™
---

## 安装


## 配置


## 运行

```valkyrie
> "Hello World!"
```

## 目标

具有渐进类型的动态语言

借鉴的语言有 Rust, Scala 以及 Swift

保证 Null Safe, Type Safe 的情况下写得越少越好

以下简称 V

## 类型安全和类型推断 {#type-safety-and-type-inference}

Swift 是一个*类型安全 (type safe) *的语言. 类型安全的语言可以让你清楚地知道代码要处理的值的类型. 如果你的代码需要一个 `String`, 你绝对不可能不小心传进去一个 `Int`.

由于 Swift 是类型安全的, 所以它会在编译你的代码时进行*类型检查 (type checks) *, 并把不匹配的类型标记为错误. 这可以让你在开发的时候尽早发现并修复错误.

当你要处理不同类型的值时, 类型检查可以帮你避免错误. 然而, 这并不是说你每次声明常量和变量的时候都需要显式指定类型. 如果你没有显式指定类型, Swift 会使用*类型推断 (type inference) *来选择合适的类型. 有了类型推断, 编译器可以在编译代码的时候自动推断出表达式的类型. 原理很简单, 只要检查你赋的值即可.

因为有类型推断, 和 C 或者 Objective-C 比起来 Swift 很少需要声明类型. 常量和变量虽然需要明确类型, 但是大部分工作并不需要你自己来完成.

当你声明常量或者变量并赋初值的时候类型推断非常有用. 当你在声明常量或者变量的时候赋给它们一个字面量 (literal value 或 literal) 即可触发类型推断.  (字面量就是会直接出现在你代码中的值, 比如 `42` 和 `3.14159` . )

例如, 如果你给一个新常量赋值 `42` 并且没有标明类型, Swift 可以推断出常量类型是 `Int` , 因为你给它赋的初始值看起来像一个整数:

```valkyrie
let meaningOfLife = 42
# meaningOfLife 会被推测为 Int 类型
```

同理, 如果你没有给浮点字面量标明类型, Swift 会推断你想要的是 `Double`:

```valkyrie
let pi = 3.14159
# pi 会被推测为 Double 类型
```

当推断浮点数的类型时, Swift 总是会选择 `Double` 而不是 `Float`.

如果表达式中同时出现了整数和浮点数, 会被推断为 `Double` 类型:

```valkyrie
let anotherPi = 3 + 0.14159
# anotherPi 会被推测为 Double 类型
```

原始值 `3` 没有显式声明类型, 而表达式中出现了一个浮点字面量, 所以表达式会被推断为 `Double` 类型.



- 错误处理


