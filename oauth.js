const ClientOAuth2 = require("client-oauth2");

const ebayAuth = new ClientOAuth2({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  accessTokenUri: "https://api.ebay.com/identity/v1/oauth2/token",
  authorizationUri: "https://signin.ebay.com/authorize",
  redirectUri: "YOUR_REDIRECT_URI",
  scopes: ["https://api.ebay.com/oauth/api_scope"],
});

exports.handler = async (event) => {
  if (!event.queryStringParameters.code) {
    const uri = ebayAuth.code.getUri();
    return {
      statusCode: 302,
      headers: { Location: uri },
    };
  } else {
    const code = event.queryStringParameters.code;
    const token = await ebayAuth.code.getToken(
      "YOUR_REDIRECT_URI" + "?code=" + code
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ accessToken: token.accessToken }),
    };
  }
};
