


case 左边是任意字面量, 中间是 `=>` 箭头, 右边是匹配成功之后的行为

```valkyrie
any.match {
    case 0u8 => print('0')
    case c: char if c == 'c' => print('c')
    case (item, ) => print('tuple')
    case table @ [head, **tail] => {
        print(table);
        print(head);
        print(tail);
    }
    @if(body.length > 2)
    case Body(body) => {
        print('empty')
    }
    case Structure { key: k, value: _, *** } => {
        print(k);
    }
    else => print('else')
}
```



