---
home: true
actionText: 开始阅读
actionLink: /cn/basic/
footer: CC0 Licensed | Copyright © 2012-2019 Aster™
---

## 介绍

Valkyrie 是一种实验性的多阶段编程语言, 结合了函数式编程和面向对象编程的特性，并探索了新的基于代数效应的范式。

## 特性

- **代数数据类型**
  - 空安全，基于ADT模型的语言严格遵循空安全规则
- **代数子类型**
  - 受限的传统面向对象范式
- **代数效应（计划中）**
- **渐进式结构类型**
  - 局域类型推导
- **AST 宏**
  - 包隔离级别的多阶段编程

## 工具和社区

- [Jupyter Runner](https://github.com/nyar-vm/valkyrie-jupyter/blob/dev/projects/playground/main.ipynb)：交互式执行环境
- [Idea Intellij](https://plugins.jetbrains.com/plugin/19452-valkyrie-language)：IDEA 支持
- [AST Visitor](https://docs.rs/valkyrie-ast/0.1.7/valkyrie_ast/)：AST 定义和打印

## 语言参考

### 基本概念

- [字面量](./literal/readme.md): 布尔值, 整数值以及字符串
- [常用数据结构](./collections/readme.md): 列表, 字典以及集合
- [函数调用](./invoke/readme.md):
- [下标](./invoke/readme.md):
- [变量定义](./definition/let-binding.md):
- [函数定义](./definition/def-micro.md):
- [模块系统](./definition/module.md)
- [包管理系统](./definition/package.md):

### 习数据控制流

- [If](./control/jump-if.md): 条件语句
- [Switch](./control/jump-switch.md): 跳转表
- [While Loop](./control/loop-while.md): 条件循环
- [For Loop](./control/loop-for.md): 迭代器
- [Return, Break and Continue](./control/jump-control.md): 控制流
- [Try, Catch and Resume](./control/jump-control.md): 控制流

### 自定义代数结构

- [`class`](./definition/structure.md): 基于引用的积类型
- [`structure`](./definition/structure.md): 基于值的积类型
- [`interface`](./definition/interface.md): 接口与子类型多态
- [`trait`](./definition/interface.md): 特质系统
- [`enumerate`](./definition/enumerate.md): 相容编码
- [`flags`](./definition/flags.md): 互斥编码
- [`unite`](./definition/union.md): 不交并, 和类型


- [Extractor](./advance/extractor.md): 提取器模式
- [Constructor and Builder](./advance/builder.md): 构造器模式
- [Pattern Match](./advance/pattern-match.md): 模式匹配



- Define Effect
- `Io` effect and `Logging` effect
- Generics, covariance, contravariance and invariance
- Type conversion, type reinterpretation and type transmutation
- Iterators and Generators
- Closures, callbacks and asynchronous programming
- Raw pointers and unsafe programming
- Value types and the stack allocation
- Macro and package isolation compile





