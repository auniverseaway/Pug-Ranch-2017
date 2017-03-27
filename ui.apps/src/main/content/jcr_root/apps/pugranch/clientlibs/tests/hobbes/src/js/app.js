/* global hobs */
new hobs.TestSuite('Milson Pug Ranch Tests', { path: '/apps/pugranch/tests/SampleTests.js', register: true })

    .addTestCase(new hobs.TestCase('Logo on Style Guide')
        .navigateTo('/content/pugranch/style-guide.html')
        .asserts.location('/content/pugranch/style-guide.html', true)
        .asserts.visible('.c-logo', true),
    );
