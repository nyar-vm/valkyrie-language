## Macro

The Valkyrie language provides the ability to define macros, which are reusable code snippets that can be expanded at compile-time.

Macros allow for code generation and metaprogramming.

The `macro` keyword is used to define a macro that can take in different types of arguments, such as `IntegerNode` or `ExpressionNode`, and perform operations on them.

```valkyrie
micro f1(e: Integer) {
    print(e);
}
macro m1(e: IntegerNode) {
    print(e);
}
macro m2(e: ExpressionNode) {
    print(e);
}
```

The above code snippet defines two `macro` macros named `m1` and `m2`.

The `m1` macro takes an `IntegerNode` argument `e` and prints its value.

The `m2` macro takes an `ExpressionNode` argument `e` and prints its value.

```valkyrie
f1(1 + 1) // 2
m1(1 + 1) // fatal error: macro f21: expected IntegerNode, found ExpressionNode
m2(1 + 1) // ExpressionNode { left: IntegerNode { value: 1 }, operator: Add, right: IntegerNode { value: 1 } }
```

The above code snippet demonstrates the usage of the previously defined macros.

- `f1(1 + 1)` invokes the `f1` macro with the argument `1 + 1` and prints the result, which is `2`.
- `m1(1 + 1)` tries to invoke the `m1` macro with the argument `1 + 1`.
  - However, it results in a fatal error because the `m1` macro expects an `IntegerNode` argument, but an `ExpressionNode` is provided instead.
- `m2(1 + 1)` successfully invokes the `m2` macro with the argument `1 + 1`.
  - It prints an `ExpressionNode` object representing the expression `1 + 1`, which consists of two `IntegerNode` objects representing the values `1` and `1`, and an `Add` operator.

### Evaluation Macro

```valkyrie
macro m1(lhs: ExpressionNode, micro rhs: Integer) {
    lhs.evaluate() + rhs
}
```

The above code snippet shows the definition of a `macro` named `m1` that takes an `ExpressionNode` argument `lhs` and a `micro` argument `rhs` of type `Integer`.

This macro evaluates the `lhs` expression using the `evaluate` method and adds it to the `rhs` value.

Please note that the specific implementation details of the `evaluate` method and how the addition is performed are not provided in the code snippet.

## Continuation Capture

Continuation capture in Valkyrie allows macros to receive and manipulate continuations, which represent the remaining code to be executed.

```valkyrie
#continuation
macro f1(e: ExpressionNode, c: ContinuationNode) {
    // continuation is required
}
#continuation
macro f2(e: ExpressionNode, c: ContinuationNode?) {
    // continuation is optional
}
#continuation
macro f3(e: ExpressionNode) {
    // fatal error: expected ContinuationNode, found Nothing
}
```

The last parameter defined must be a `ContinuationNode`.


```valkyrie
f1(1 + 1) // fatal error: macro f: expected ContinuationNode, found None
f1(1 + 1) {
    body
}
f2(1 + 1)
f2(1 + 1) {
    class A { } // syntax error: declaration not allowed in continuation.
    body
}
```

The above code snippet demonstrates the usage of the previously defined continuation capture macros.

- `f1(1 + 1)` tries to invoke the `f1` macro without providing a continuation. However, this macro expects a continuation to be provided, so it results in a fatal error [[2]](https://poe.com/citation?message_id=61591009926&citation=2).
- `f1(1 + 1) { body }` invokes the `f1` macro with the argument `1 + 1` and a continuation block `body`. The macro implementation can manipulate the continuation block as needed.
- `f2(1 + 1)` invokes the `f2` macro with the argument `1 + 1` but without providing a continuation. Since the continuation is optional, this usage is valid.
- `f2(1 + 1) { class A { } body }` invokes the `f2` macro with the argument `1 + 1` and a continuation block containing a class declaration `class A { }` and a `body`. However, this usage results in a syntax error because declarations are not allowed within a continuation [[3]](https://poe.com/citation?message_id=61591009926&citation=3).

### `@Procedural` Macro

```valkyrie
#procedural
macro f1(e: ExpressionNode, dsl: DomainNode) {
    // domain is required
}
#procedural
macro f2(e: ExpressionNode, dsl: DomainNode?) {
    // domain is optional
}
#procedural
macro f3(e: ExpressionNode) {
    // fatal error: expected DomainNode, found Nothing
}
```

```valkyrie
@f(1 + 1) {
    class A { } // ok
    body
}
```

### `#Attribute` Macro


