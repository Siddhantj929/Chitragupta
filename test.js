const Tags = require("./services/tag");
const Users = require("./services/user");

// Tags.check({ name: "Webfixerr", user: "5dccab71beb7504cb298cf11" }).then(console.log);

Users.audit({
    user: '5dccab71beb7504cb298cf11',
    month: 10,
    year: 2019
}).then(console.log);