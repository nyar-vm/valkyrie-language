# XML Literal

no less(`<`) and great(`>`) operator, use `<|` and `|>` instead.

### XML Comment

```vk
x"""
<!-- This is comment -->
"""
```

### XML Class

```vk
x"""
<Tag attribute a=1>
    text
<Tag/>
"""
```

desugars to

```vk
Tag(attribute: true, a: 1) {
    "text"
}
```


## XML Inline

```vk
x"""
<Tag attribute a=1/>
"""
```

desugars to

```vk
Tag(attribute: true, a: 1);
```
