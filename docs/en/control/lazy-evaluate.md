## Lazy Evaluation

Lazy evaluation is a programming technique where the evaluation of an expression or computation is delayed until its
result is actually needed.

In Valkyrie, lazy evaluation can be achieved using the `lazy` keyword.

Here are some examples of lazy evaluation in Valkyrie:

```valkyrie
// by `let` modifiers
let lazy x = evaluate();
// by `lazy` block
let lazy x = lazy {
    evaluate()
};
```

In the above code, the `lazy` keyword is used to create a lazy expression.

The expression is only evaluated when its value is required.

This can be useful in scenarios where the evaluation of an expression is time-consuming and should be
deferred until necessary.

```valkyrie
let mut a = 1;
let b = lazy {
    // Some time-consuming operations
    a + 1
};
@assert(b == 2, "lazy evaluated");
```

In this example, the value of `b` is lazily evaluated as `a + 1`.

The actual evaluation is deferred until the value of `b` is accessed.

This allows for potential performance optimizations by avoiding unnecessary computations.

```valkyrie
let mut a = 1;
let lazy b = a + 1;
a += 1;
@assert(b == 3, "lazy evaluated");
```

Here, the lazy expression `a + 1` is assigned to `b`.

Before accessing the value of `b`, the value of `a` is incremented.

When the value of `b` is finally accessed, the lazy expression is evaluated, taking into account the updated value of `a`.

## Lazy Trigger

Lazy triggering is another feature provided by Valkyrie for controlling the evaluation of lazy expressions.

It allows you to explicitly trigger the evaluation of a lazy expression using the `lazy` keyword followed by parentheses containing any necessary dependencies.

```valkyrie
let mut dirty = true;
let b = lazy(dirty) {
    a += 1;
    a
}
```

In the above code, the lazy expression `a += 1` is wrapped in a `lazy` block with the dependency `dirty`.

This means that the expression will be evaluated whenever `dirty` changes its value.

Lazy triggering can be useful in scenarios where you want to control when a lazy expression is evaluated based on specific conditions or changes in the program state.

