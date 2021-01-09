

Use the `t` prefix for template strings

### Template Comment

```vk
t"""
{# This is comment #}

""
```

### Template Expression

```vk
t"""
{@ x @}
{@ None @}
{@ "string" @}
""
```

### Template If

```vk
t"""
{% if a > 0%}
    yes
{% else %}
    no
{% end if %}
""
```


### Template While

```vk
t"""
{% while a > 0 %}
    {% if a > 1 %}
        yes
        {@ a -= 1 @}
    {% else %}
        no
    {% end if %}
{% end while %}
```
