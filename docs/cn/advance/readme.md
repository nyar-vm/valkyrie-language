# Handler Operators

这是一个示例界面

高级字符串用法

## 字符控制算符

### 转义

```ts
"\u{12 123 1234}"
```


### 多行字符串

```py
"""
multiline
"""
```

### 反转义

```py
r"""
multiline
"""
```

## 数值控制算符



```rs
let byte = 0u8;
let complex = 1 + 2i;
```

| 长度    | 有符号  | 无符号  |
| ------- | ------- | ------- |
| 8-bit   | `i8`    | `u8`    |
| 16-bit  | `i16`   | `u16`   |
| 32-bit  | `i32`   | `u32`   |
| 64-bit  | `i64`   | `u64`   |
| 128-bit | `i128`  | `u128`  |
| arch    | `isize` | `usize` |