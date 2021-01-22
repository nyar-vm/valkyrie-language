Another commonly used looping method is the iterator traversal.

## For Loop

```valkyrie
for pattern in iterator {
    # ...
}
```

equivalent to

```valkyrie
loop {
    let pattern = iterator.next()
    if pattern.is_none() {
        break
    }
    let pattern = pattern.unwrap()
    # ...
}
```

## For Loop Guard

`if` can be added later as a shorthand for select conditions

```valkyrie
for a in iterator if a > 0 {
    # ...
}
```

equivalent to

```valkyrie
for a in iterator.select({ $a > 0 }) {
    # ...
}
```

## Empty For Loop

`otherwise` is used to indicate that the loop never happened once.

```valkyrie
for x in iterator if check(x) {
    # ...
}
otherwise {
    print("empty")
}
```

equivalent to

```valkyrie
let mut no_run = true
for x in iterator {
    guard check(x) else {
        continue
    }
    no_run = false
    # ...
}
if no_run {
    print("empty")
}
```

That is to say, if the if-guard fails, it will not count as executing a loop.


## For Loop with Index

When you need numbered traversal, don't create a new `index` then `index++`.

use the zipper method.

```valkyrie
for (index, value) in iterator.zip_indexer(0) {

}
```

