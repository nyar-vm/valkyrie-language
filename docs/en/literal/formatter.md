## String Formatter

## `{v}`

```valkyrie
"{v}"   // v.display()
```

It is recommended to add f before the string to explicitly initialize it by default formatter.

```valkyrie
f"{v}"   // v.display()
```

## `{v:formatter}`

```valkyrie
"{v:?}" // v.display("?")
```



```valkyrie
let time = DateTime("2020-02-29 20:02:29");
"{time:dd.MM.yyyy HH:mm:ss}"
// 02.29.2020 20:02:29
```

```valkyrie
time.display("dd.MM.yyyy HH:mm:ss")
```

## `{v, ...arguments}`

```valkyrie
let time = DateTime("2020-02-29 20:02:29");
"{time, 'dd.MM.yyyy HH:mm:ss', culture: 'en-US'}"
// 02/29/2020 20:02:29
```

```valkyrie
time.display("%Y-%m-%d %H:%M:%S", culture: 'en-US')
```

## Formatter

```valkyrie
trait Display {
    format(self, mut formatter: Formatter, constant ...args): Result<(), DisplayError>;
    format_hint(self): u64 { 0 }
    final display(self, constant ...args) {
        let mut f = Formatter(capacity: self.format_hint());
        self.format(f)
        f.buffer
    }
}
```

