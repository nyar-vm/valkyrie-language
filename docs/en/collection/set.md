The set in the valkyrie language can be divided into three kinds:

- [IndexSet](#indexset): A set that maintains insertion order.
- [OrderSet](#orderset): A set rearranged according to the [Order]() trait
- [HashSet](#hashset): A set rearranged according to [Hash]() trait

## IndexSet

The `IndexSet` is a set that maintains the insertion order of its elements.

It ensures that each element is unique and retains the order in which the elements were inserted.

Here's an example:

```vk
let map = new IndexMap<String>() {
    "orange"
    "apple"
    "banana"
}
for item in map {
    print("{item}");
}
```

Output should be:

```yaml
orange
apple
banana
```

## OrderSet

The OrderSet is a set that orders its elements according to the Order trait.

It allows custom ordering of the elements based on a specified criterion.

Here's an example:

```vk
let map = new OrderSet<String>() {
    "orange"
    "apple"
    "banana"
}
for item in map {
    print("{item}");
}
```

Output should be:

```yaml
apple
banana
orange
```

## HashSet

The HashSet is an unordered set that arranges its elements based on the Hash trait.

It provides efficient lookups and ensures uniqueness of elements.

Here's an example:

```vk
let map = new HashSet<String>() {
    "orange"
    "apple"
    "banana"
}
for item in map {
    print("{item}");
}
```

Output may be:

```yaml
banana
apple
orange
```

The traversal order of the hash set is random.
