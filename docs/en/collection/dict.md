## Dictionary

The `Dictionary` trait defines a generic dictionary data structure in Valkyrie.

It provides several associated types and predicates for working with dictionaries.

### Associated Types

- `Key`: Represents the type of keys in the dictionary.
- `Value`: Represents the type of values in the dictionary.
- `Entry`: Represents the type of entries in the dictionary.

### Alias Types

- `Pair`: Represents the type of key-value pairs in the dictionary.
  - It is an alias for a tuple `(key: Key, value: Value)`.

### Predicates

- `mutable`: Specifies whether the value of the dictionary can be changed.
- `scalable`: Specifies whether the keys of the dictionary can be added, deleted, or replaced.
- `default`: Specifies whether the dictionary has a default value when a key is not found.

These associated types and predicates provide flexibility and control over the behavior of dictionaries in Valkyrie.

### Methods

- `get(key: Self::Key): Self::Value?`
  - Returns the value associated with the specified key, or `null` if the key is not found.
- `get_or(key: Self::Key, default: Self::Value): Self::Value`
  - Returns the value associated with the specified key, or the default value if the key is not found.
- `get_or_default(key: Self::Key): Self::Value`
  - Returns the value associated with the specified key, or the default value if the key is not found.
- `insert(key: Self::Key, value: Self::Value): Self::Value?`
  - Inserts a new key-value pair into the dictionary.
- `remove(key: Self::Key): Self::Value?`
  - Removes the key-value pair associated with the specified key from the dictionary.

## Instance Classes

### IndexMap

`IndexMap` is a specific implementation of the dictionary data structure in Valkyrie that preserves the order of inserts. It behaves like a map where elements are stored in the order in which they were added.

The code snippet demonstrates the usage of `IndexMap`. It creates a new `IndexMap` called `map` with keys of type `UTF8Text` and values of type `Int`. The map is initialized with four key-value pairs: `first: 1`, `second: 2`, `third: 3`, and `forth: 4`.

A `for` loop is then used to iterate over the key-value pairs in the `map`, printing each key and value. The output shows the keys and values in the order they were inserted.

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

The example demonstrates the preservation of insertion order in the `IndexMap`.

### OrderMap

`OrderMap` is another implementation of the dictionary data structure in Valkyrie that preserves the order of the keys. It maintains the keys in the order they were added or last updated.

The code snippet showcases the usage of `OrderMap`. It creates a new `OrderMap` called `map` with keys of type `UTF8Text` and values of type `Int`. The map is initialized with four key-value pairs: `first: 1`, `second: 2`, `third: 3`, and `forth: 4`.

Similar to the previous example, a `for` loop is used to iterate over the key-value pairs in the `map`, printing each key and value. The output displays the keys and values in the order of the keys.

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

The example demonstrates how `OrderMap` preserves the order of the keys, even if updates are made to the values.

### HashMap

`HashMap` is yet another implementation of the dictionary data structure in Valkyrie, but it does not preserve the order of the keys. It provides efficient key-value storage and retrieval, but the order of the keys is not guaranteed.

The code snippet illustrates the usage of `HashMap`. It creates a new `HashMap` called `map` with keys of type `UTF8Text`, values of type `Int`, and a `SipHasher24` as the hash function. The map is initialized with four key-value pairs: `first: 1`, `second: 2`, `third: 3`, and `forth: 4`.

Similarly, a `for` loop is used to iterate over the key-value pairs in the `map`, but unlike the previous examples, the output does not follow a specific order. The keys and values are printed in a random order.

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

This example highlights that `HashMap` does not guarantee the preservation of key order.

### Record

The `Record<T>` type is an alias for `IndexMap<UTF8Text, T>`, providing a convenient shorthand for creating dictionaries with string keys.

```valkyrie
type Record<T> = IndexMap<UTF8Text, T>
```

The `Record<T>` type definition creates a specialized dictionary where the keys are of type `UTF8Text` and the values can be of any type `T`. It essentially represents a `IndexMap` with string keys.

The `Record<T>` type can be used to define dictionaries with string keys in Valkyrie, providing a more expressive and readable way to work with such dictionaries.
