# Non-local Return

| control       | description                                 |
|---------------|---------------------------------------------|
| `break`       | exit the loop                               |
| `continue`    | skip the current iteration                  |
| `fallthrough` | execute the next case in a switch statement |
| `return`      | exit the function                           |
| `raise`       | raise an effect                             |
| `yield`       | yield a value                               |
| `yield from`  | yield a value from an iterator              |
| `yield break` | exit the iterator                           |

## Implementation Details

```valkyrie
micro check235(items: [int]): bool {
    for item in items {
        if item % 2 == 0 {
            break
        }
        if item % 3 == 0 {
            continue
        }
        if item % 5 == 0 {
            return true
        }
        print("next")
    }
    print("no such item")
    false
}
```

The first stage will program all control jumps to goto

```valkyrie
micro check235(items: [int]): bool {
    let mut next = items.next()
    let mut ret = false;
    loop {
        @1
        let i = next.unwrap()
        @label 2
        if item % 2 == 0 {
            @goto 4
        }
        if item % 3 == 0 {
            @goto 1
        }
        if item % 5 == 0 {
            ret = true
            @goto 5
        }
        @label 3
        print("next")
        next = items.next()
        @goto 2
    }
    @2
    print("no such item")
    @label 5
    // drops here
    ret
}
```

The second stage will execute the relooper, compiling goto into a state machine

```valkyrie
micro check235(items: [int]): bool {
    let mut state = 1;
    let mut next = items.next()
    let mut ret = false;
    while true {
        switch {
            case 1:
                if next.is_some() {
                    state = 2
                }
                else {
                    break
                }
            case 2:
                let i = next.unwrap()
                state = 3
            case 3:
                if item % 2 == 0 {
                    state = 7
                }
                else {
                    state = 2
                }
            case 4:
                if item % 3 == 0 {
                    state = 2
                }
                else {
                    state = 5
                }
            case 5:
                if item % 5 == 0 {
                    ret = true
                    break
                }
                else {
                    state = 6
                }
            case 6:
                print("next")
                next = items.next()
                state = 1
            case 7:
                print("no such item")
                break
        }
    }
    ret
}
```


