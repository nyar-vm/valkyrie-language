



```valkyrie
interface Interator {
    # The associated type
    type Item
    next(mut self) -> Self::Item?
}
```
