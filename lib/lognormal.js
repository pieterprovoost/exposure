var jerzy = require("jerzy");

Lognormal = function() {};

Lognormal._psi = function(g, n, eps) {
	eps = typeof eps !== "undefined" ? eps : 1e-9;

	var result = 0;
	var addend = 1;
	var i = 1;	

	while (addend > eps) {
		result = result + addend;
		addend = Math.pow(n-1, (i*2)-1) 
			* Math.pow(g, i) 
			/ Math.pow(n, i) 
			/ jerzy.Misc.fac(i); 
		for (var j = 1; j < i; j++) {
			addend = addend / (n + ((j*2)-1));
		}
		i++;
	}

	return result;

};

/**
 * Minimum variance unbiased estimator of the true mean (Hewett & Ganser, 1997).
 */
Lognormal.mvue = function(v) {
	var y = v.log().mean();
	var ss = v.log().variance();
	return Math.exp(y) * this._psi(ss / 2, v.length());
};

/**
 * Maximum likelihood estimate of the true mean (Hewett & Ganser, 1997).
 */
Lognormal.mle = function(v) {
	var mu = v.log().mean();
	var ss = v.log().biasedVariance();
	return Math.exp(mu + ss / 2);
};

/**
 * Approximation of Land's 95% LCL C factor.
 */
Lognormal.landFactor95LCL = function(s, n) {

	var a = -0.85033767;
	var b = -0.5258052;
	var c = 0.92416176;
	var d = 3.3298209;
	var e = 0.94348568;
	var f = 1.3213281;
	var g = 0.8155562;
	var h = -1.018148;
	var i = 0.25248895;

	var f1 = a / Math.pow(n - 2, c) + b;
	var f2 = d / Math.pow(n - 2, f) + e;
	var f3 = g / Math.pow(n - 2, i) + h;
	var f4 = -0.6226 / Math.pow(n - 2, 0.2426) + 1.1470;

	var cl = -0.74295 / (n - 2) - 1.64765 + s * (f3 + f2 * Math.exp(f1 * Math.pow(s, f4)));

	return cl;

};

/**
 * Approximation of Land's 95% UCL C factor.
 */
Lognormal.landFactor95UCL = function(s, n) {

	var a = 0.76766658;
	var b = 3.8716869;
	var c = 0.80598919;
	var d = 6.0321019;
	var e = 0.89998154;
	var f = 2.012669;
	var g = 0.21978875;
	var h = 0.41575588;
	var i = 0.29258276;

	var f1 = s * (i + 1 / Math.pow(n - 2, c));
	var f2 = b + d / Math.pow(n - 2, c);
	var f3 = f1 * (1 - e * Math.exp(-f * f1));
	var f4 = 1 + g * Math.exp(-h * f1);
	var f5 = f2 * f3 / f4;

	var cl = 1.645 + a / (n - 2) + f5;

	return cl;

};

/**
 * Approximation of Land's exact 95% LCL and UCL (Hewett & Ganser, 1997).
 */
Lognormal.landExact95 = function(v) {
	var y = v.log().mean();
	var ss = v.log().variance(); // check
	var s = Math.sqrt(ss);
	var mu = Math.exp(y + ss / 2);
	var n = v.length();

	if (n < 3 || n > 1001) {
		throw "N needs to be between 3 and 1001";
	}

	if (ss < 0.01 || ss > 4) {
		throw "S should be between 0.01 and 4"
	}

	var lclc = this.landFactor95LCL(s, n);
	var uclc = this.landFactor95UCL(s, n);

	return [
		Math.exp(Math.log(mu) + lclc * (s / Math.sqrt(n - 1))),
		Math.exp(Math.log(mu) + uclc * (s / Math.sqrt(n - 1)))
	];

};

/**
 * Point estimate of the exceedance fraction (Hewett & Ganser, 1997).
 */
Lognormal.exceedance = function(v, oel) {
	var y = v.log().mean();
	var s = v.log().sd();
	var z = (Math.log(oel) - y) / s;
	var n = new jerzy.StandardNormal();
	return 1 - n.distr(z);
};

module.exports.Lognormal = Lognormal;