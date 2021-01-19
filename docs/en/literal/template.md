

Use the `t` prefix for template strings

### Template Comment

```valkyrie
t"""
{# This is comment #}

""
```

### Template Expression

```valkyrie
t"""
{@ x @}
{@ None @}
{@ "string" @}
""
```

### Template If

```valkyrie
t"""
{% if a > 0%}
    yes
{% else %}
    no
{% end if %}
""
```


### Template While

```valkyrie
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
