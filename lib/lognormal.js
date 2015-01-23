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

module.exports.Lognormal = Lognormal;