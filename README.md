# exposure

Statistical analysis of occupational exposure data

## Features

[Lognormal distribution](#lognormal)

<a name="lognormal"></a>
### Lognormal distribution

#### Confidence limits

```javascript
// Approximation of Land's exact 95% LCL and UCL (Hewett & Ganser, 1997)

var v = new jerzy.Vector([0, 1, 2, 3]);
console.log(exposure.Lognormal.landExact95(v));
```

```text
[ 1.81005174980393, 71.40297997261662 ]
```

```javascript
// Approximation of Land's exact 95% LCL and UCL C factors (Hewett & Ganser, 1997)

console.log(exposure.Lognormal.landFactor95LCL(0.1, 3));
console.log(exposure.Lognormal.landFactor95UCL(1.75, 15));
```

```text
-2.127657636768961
4.027838975792285
```
