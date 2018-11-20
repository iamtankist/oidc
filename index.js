const Provider = require('oidc-provider');
const configuration = {
    // ... see the available options in Configuration options section
    features: {
        discovery: true,
        registration: {initialAccessToken: true},
        format: {default: 'opaque'},
        devInteractions: true,
        requestUri: true,
        oauthNativeApps: true,
        pkce: true,
        alwaysIssueRefresh: false,
        backchannelLogout: false,
        certificateBoundAccessTokens: false,
        claimsParameter: false,
        clientCredentials: true,
        conformIdTokenClaims: true,
        deviceFlow: false,
        encryption: false,
        frontchannelLogout: false,
        introspection: false,
        jwtIntrospection: false,
        jwtResponseModes: false,
        registrationManagement: false,
        resourceIndicators: false,
        request: false,
        revocation: false,
        sessionManagement: false,
        webMessageResponseMode: false
    },

    // ...
};
const clients = [{
    token_endpoint_auth_method: 'client_secret_post',
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['http://localhost:8080/cb'],
    grant_types: ['authorization_code', 'client_credentials'],
    response_type:[ 'id_token' ]
    /*response_type:[ 'code id_token token',
        'code id_token',
        'code token',
        'code',
        'id_token token',
        'id_token',
        'none' ]*/

}];

const oidc = new Provider('http://localhost:3000', configuration);

let server;
(async () => {
    await oidc.initialize({clients});
    // express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
    oidc.callback

    // koa application for use with koa apps, see /examples/koa.js
    oidc.app

    // or just expose a server standalone, see /examples/standalone.js
    server = oidc.listen(3000, () => {
        console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
    });
})().catch((err) => {
    if (server && server.listening) server.close();
    console.error(err);
    process.exitCode = 1;
});
