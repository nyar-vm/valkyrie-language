The map in the valkyrie language can be divided into three kinds:

- [IndexMap](#indexmap): A map table that maintains insertion order.
- [OrderMap](#ordermap): A map table rearranged according to the [Order]() trait
- [HashMap](#hashmap): A map table rearranged according to [Hash]() trait

## IndexMap

The `IndexMap` is a map table that maintains insertion order.

It allows you to store key-value pairs and retrieve them in the order they were inserted.

Here's an example:

```valkyrie
let map = new IndexMap<String, Integer>() {
    Pair("orange", 7),
    Pair("apple", 10),
    Pair("banana", 5),
}
for (key, value) in map {
    print("{key}: value");
}
```

Output should be:

```yaml
orange: 7
apple: 10
banana: 5
```

## OrderMap

The OrderMap is a map table that rearranges its elements according to the Order trait.

It provides a customizable way to order the map's entries.

Here's an example:

```valkyrie
let map = new OrderMap<String, Integer>() {
    Pair("orange", 7),
    Pair("apple", 10),
    Pair("banana", 5),
}
for (key, value) in map {
    print("{key}: value");
}
```

Output should be:

```yaml
apple: 10
banana: 5
orange: 7
```

## HashMap

The HashMap is a map table that rearranges its elements according to the Hash trait.

It provides fast key-value lookups based on hash values.

Here's an example:

```valkyrie
let map = new HashMap<String, Integer>() {
    Pair("orange", 7),
    Pair("apple", 10),
    Pair("banana", 5),
}
for (key, value) in map {
    print("{key}: value");
}
```

Output may be:

```yaml
banana: 5
apple: 10
orange: 7
```

The traversal order of the hash table is random.
