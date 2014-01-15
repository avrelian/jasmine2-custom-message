(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  window.onload = function() {
    execJasmine();
  };

  function execJasmine() {
    if (window.jasmine && window.jasmine.initJasmineCustomMessage) {
      var jcm = window.jasmine.initJasmineCustomMessage;
      jcm.wrapReporter();
      jcm.testJasmine();
      jcm.wrapItAndExpect();
      jcm.testJasmineCustomMessage();
    }

    jasmineEnv.execute();
  }

})();