# XML Literal

no less(`<`) and great(`>`) operator, use `<|` and `|>` instead.

### XML Comment

```valkyrie
x"""
<!-- This is comment -->
"""
```

### XML Class

```valkyrie
x"""
<Tag attribute a=1>
    text
<Tag/>
"""
```

desugars to

```valkyrie
Tag(attribute: true, a: 1) {
    "text"
}
```


## XML Inline

```valkyrie
x"""
<Tag attribute a=1/>
"""
```

desugars to

```valkyrie
Tag(attribute: true, a: 1);
```
