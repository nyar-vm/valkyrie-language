## Macro

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


```valkyrie
f1(1 + 1) // 2
m1(1 + 1) // fatal error: macro f21: expected IntegerNode, found ExpressionNode
m2(1 + 1) // ExpressionNode { left: IntegerNode { value: 1 }, operator: Add, right: IntegerNode { value: 1 } }
```

### Evaluation


```valkyrie
macro m1(lhs: ExpressionNode, micro rhs: Integer) {
    lhs.evaluate() + rhs
}
```



### Continuation Capture

```valkyrie
#continuation
macro f1(e: ExpressionNode, c: ContinuationNode) {
    // ...
}
#continuation
macro f2(e: ExpressionNode, c: ContinuationNode?) {
    // ...
}
```


```valkyrie
f1(1 + 1) // fatal error: macro f: expected ContinuationNode, found None
f1(1 + 1) {
    body
}
f2(1 + 1)
f2(1 + 1) {
    body
}
```




### Domain Capture

```valkyrie
#domain
macro f1(e: ExpressionNode) {
    // ...
}
macro f2(e: ExpressionNode, c: DomainNode?) {
    // ...
}
```

```valkyrie
@f(1 + 1) {
    using core
    class A { }
}
@f(1 + 1) {
    using core
    class A { }
}
```

### Attribute Capture


