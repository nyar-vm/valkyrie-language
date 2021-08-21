try comes with a local effect handler

## Option Handler

```valkyrie
let a = try T? {
    map.get("value")! + 1
}
```

Option handler 会捕捉所有实现了 Error 的类型.

也就是说除了 NoneError, 其他 Error 都会被抹除.

## Maybe Handler

只会捕捉 NoneError 这一个 Error 类型的 Handler.

捕捉后可以使用 `as_option` 转为 `Option<T>`

```valkyrie
let a = try Maybe<T> {
    map.get("value")! + 1
}
.as_option()
```
