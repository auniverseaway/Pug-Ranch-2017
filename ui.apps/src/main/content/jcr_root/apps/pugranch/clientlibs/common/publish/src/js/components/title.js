'use strict';

const test = 'hello from title';

const helloTitle = function () {
    console.log(test);
};

const title = { helloTitle };

export { title };