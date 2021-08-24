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

### Continuation Capture

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




### Domain Capture

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

### Attribute Capture


