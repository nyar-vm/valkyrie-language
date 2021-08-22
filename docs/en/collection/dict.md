## Dictionary

```valkyrie
trait Dictionary {
    type Key
    type Value
    alias type Entry = (key: Key, value: Value)
    /// Whether the value of the dictionary can be changed
    predicate mutable(self);
    /// Whether the keys of the dictionary can be added, deleted or replaced
    predicate scalable(self);
}
```
## IndexMap

`IndexMap` is a Map that preserves the order of the inserts.

```valkyrie
let map = new IndexMap<UTF8Text, Int> {
    first: 1,
    second: 2,
    third: 3,
    forth: 4,
}
for (key, value) in map {
    print("{key}: {value}")
    // first: 1
    // second: 2
    // third: 3
    // forth: 4
}
```

## OrderMap

`OrderMap` is a Map that preserves the order of the keys.

```valkyrie
let map = new OrderMap<UTF8Text, Int> {
    first: 1,
    second: 2,
    third: 3,
    forth: 4,
}
for (key, value) in map {
    print("{key}: {value}")
    // first: 1
    // forth: 4
    // second: 2
    // third: 3
}
```

## HashMap

`HashMap` is a Map that does not preserve the order of the keys.

```valkyrie
let map = new HashMap<UTF8Text, Int, SipHasher24> {
    first: 1,
    second: 2,
    third: 3,
    forth: 4,
}
for (key, value) in map {
    print("{key}: {value}")
    // random
}
```

## Record

`Dict` is a `IndexMap` with string keys.

```valkyrie
type Record<T> = IndexMap<UTF8Text, T>
```
