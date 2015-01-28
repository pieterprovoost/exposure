# exposure

Statistical analysis of occupational exposure data

## Features

[Lognormal distribution](#lognormal)

<a name="lognormal"></a>
### Lognormal distribution

#### Mean point estimates

```javascript
var v = new jerzy.Vector([1, 2, 3, 8]);

// Minimum Variance Unbiased Estimate of the true mean

console.log(exposure.Lognormal.mvue(v));

// Maximum Likelihood Estimate of the true mean

console.log(exposure.Lognormal.mle(v));
```

``` text
3.4432668868138645
3.49354323801306
```

#### Mean
##### Confidence limits

```javascript
// Approximation of Land's exact 95% LCL and UCL (Hewett & Ganser, 1997)

var v = new jerzy.Vector([0, 1, 2, 8]);
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

#### Exceedance fraction

```javascript
var v = new jerzy.Vector([1, 2, 3, 8]);
console.log(exposure.Lognormal.exceedance(v, 10.0));
```

```text
0.062246072660867346
```

