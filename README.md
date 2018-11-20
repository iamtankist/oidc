# OIDC Provider Prototype v0.0.1

As requested, client_credentials only for a start

### Setup

 ```
git clone https://github.com/iamtankist/oidc.git
cd oidc
yarn
yarn start
```

### Usage

In another terminal window

```bash
# Getting access_token with client credentials
curl -X POST http://localhost:3000/token \
  -d 'grant_type=client_credentials&client_id=foo&client_secret=bar'

# OIDC Dicsovery
curl -X GET http://localhost:3000/.well-known/openid-configuration
```

### TODO:
- [ ] Use proper CERTs
- [ ] Use different Client Adapter (Database? WebService?)
- [ ] Remove dev-env related warnings
