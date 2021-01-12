# Switch Statement

Compiling a jump table, in general, will perform better than long if-else-if statements.

```vk
switch {
    when a > 0:
        print("a > 0")
    when a < 0:
        print("a < 0")
    when a == 0:
        print("a == 0")
    else:
        print("a is None")
}
```
