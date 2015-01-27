describe('exposure.Lognormal', function() {
	describe("#landFactorLCL", function() {
		it("should return the correct values", function() {
			var e = 0.03;
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.10, 3), -2.130, 2.130 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.10, 101), -1.642, 1.642 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.60, 3), -1.589, 1.589 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.60, 10), -1.602, 1.602 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.60, 31), -1.662, 1.662 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(0.60, 101), -1.711, 1.711 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(3.50, 10), -2.855, 2.855 * e);
			assert.closeTo(exposure.Lognormal.landFactor95LCL(3.50, 101), -3.780, 3.780 * e);
		});
	});
	describe("#landFactorUCL", function() {
		it("should return the correct values", function() {
			var e = 0.05;
			assert.closeTo(exposure.Lognormal.landFactor95UCL(0.10, 3), 2.750, 2.750 * e);
			assert.closeTo(exposure.Lognormal.landFactor95UCL(0.10, 101), 1.670, 1.670 * e);
			assert.closeTo(exposure.Lognormal.landFactor95UCL(0.60, 3), 7.807, 1.589 * e);
			assert.closeTo(exposure.Lognormal.landFactor95UCL(0.60, 101), 1.891, 1.891 * e);
		});
	});
});