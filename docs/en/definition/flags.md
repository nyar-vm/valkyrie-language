
```vk
# Takes 16 bits of space, but only uses the last 4 bits
flags FontStyle(16, 4): Show {
    # Nothing will be generated even if it is not written, you can rename `0` to any other name
    Nothing    = 0,
    Bold       = 2 ^ 0,
    Italic     = 2 ^ 1,
    Underline  = 2 ^ 2,
    Red        = 2 ^ 3,
    RedBold    = 2 ^ 3 + 2 ^ 0,
    RedItalic  = Red | Italic,
    # Everything will be generated according to the upper limit even if it is not written
    Everything = 2 ^ 4 - 1,
}
```

Valkyrie has no bit level operator, so you can only use `2 ^ 0` instead of `1 << 0`, use `2 ^ 3 + 2 ^ 0` instead of `1 << 3 | 1 << 0`.

The numbers or operations on the right are compile time big integers, instead of dynamic values.

`Flags` cannot extend a value or function that takes no arguments and returns its own type, as this would lead to confusion

All associated constant values must be written in the `flags` declaration, and does not support duplicate values.

Global variables are not subject to this.

## Operators

- `a | b`: bit set or, returns a new `Flags` with the bits of both `Flags` set to 1.
- `a & b`: bit set and, returns a new `Flags` with the bits of both `Flags` set to 1.
- `a + b`: same as `a | b`
- `a - b`: bit set difference, returns a new `Flags` with the bits of the left `Flags` set to 1 and the bits of the right `Flags` set to 0.
- `-a`: bit set negation, invert 0 and 1 bits according to `Flags::Everything`
- `!a`: same as `-a`
- `Flags::Name`: create a new `Flags` with bits according to the definition.

## Type Conversion

### As Integer

`Flags` and `Integer` cannot be replaced arbitrarily, you need to use `as?` to convert. In Valkyrie, `as?` returns `Result<T, ConvertError>`.

Converting between `Integer` and `Flags` is not free, the layout of Integer is `[u32]`, and cannot be directly truncated to `[u8]`.

Also, you can pass `Integer` to any function parameter that accepts `Flags`.

```vk
micro render(text: String, style: FontStyle): String {
    if style == FontStyle::RedBold {
        return '<b style="color: red">{text}</b>'
    }
    if style.has(FontStyle::Red) {
        return '<span style="color: red">{text}</span>'
    }
    if style.has(FontStyle::Bold) {
        return '<b>{text}</b>'
    }
}
render('Hello, World!', 9)  #ok
```

But if the `Integer` is greater than the maximum value of `Flags`, the large integer will be truncated according to the `Layout` of `Flags`, **and no error will be raised**.

## As String

```vk
imply FontStyle: Show {
    show(self)
}
```


