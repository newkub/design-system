# Typography

Typography components help maintain consistent text styles throughout your application.

## Basic Usage

```vue
<DsTypography>Default paragraph text</DsTypography>
```

## Variants

Different text styles for different purposes:

```vue
<DsTypography variant="display">Display Text</DsTypography>
<DsTypography variant="h1">Heading 1</DsTypography>
<DsTypography variant="h2">Heading 2</DsTypography>
<DsTypography variant="h3">Heading 3</DsTypography>
<DsTypography variant="h4">Heading 4</DsTypography>
<DsTypography variant="body">Body Text</DsTypography>
<DsTypography variant="small">Small Text</DsTypography>
<DsTypography variant="caption">Caption Text</DsTypography>
```

## Font Weights

Control the weight of your text:

```vue
<DsTypography weight="light">Light Text</DsTypography>
<DsTypography weight="normal">Normal Text</DsTypography>
<DsTypography weight="medium">Medium Text</DsTypography>
<DsTypography weight="semibold">Semibold Text</DsTypography>
<DsTypography weight="bold">Bold Text</DsTypography>
```

## Custom HTML Tags

Change the underlying HTML element:

```vue
<DsTypography tag="h1" variant="h2">
  This is an h1 with h2 styling
</DsTypography>

<DsTypography tag="span" variant="body">
  This is a span with body text styling
</DsTypography>
```

## Truncate Text

Truncate text that's too long:

```vue
<DsTypography truncate>
  This is a very long text that will be truncated if it exceeds the width of its container.
</DsTypography>
```