import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientID = process.env.CLIENT_ID;
  const clientVerifier = process.env.CLIENT_VERIFIER;
  const redirectUri = "http://localhost:3000/api/oauth/redirect";

  const { searchParams } = new URL(req.url);
  const authCode = searchParams.get("code");
  const tokenUrl = "https://api.etsy.com/v3/public/oauth/token";
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: clientID,
      redirect_uri: redirectUri,
      code: authCode,
      code_verifier: clientVerifier,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(tokenUrl, requestOptions);

  // Extract the access token from the response access_token data field
  console.log(response);
  if (response.ok) {
    const tokenData = await response.json();
    redirect(`/api/welcome?access_token=${tokenData.access_token}`);
  } else {
    // Log http status to the console
    console.log(response.status, response.statusText);

    // For non-500 errors, the endpoints return a JSON object as an error response
    const errorData = await response.json();
    console.log(errorData);
    return NextResponse.json({ errorData });
  }
}
