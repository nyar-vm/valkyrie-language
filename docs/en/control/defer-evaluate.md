## Defer Evaluation

```valkyrie
fn processFile(path: Path): String {
    let mut file = File::open(path);
    defer {
        print("Closing file...");
        file.close();
    }
    file.read_to_string()
}
```

## Defer in Defer

```valkyrie
// add example here
```

## Principle Explanation

### Exit Hooks

```valkyrie
keyword macro defer(k: Continuation<()>) {
    @scope(caller).exit += k;
}
```


```valkyrie
@scope.exit += {
    print("Exiting Scope...");
}
```
