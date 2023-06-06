import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientID = process.env.CLIENT_ID!;

  // We passed the access token in via the querystring

  const { searchParams } = new URL(req.url);
  const access_token = searchParams.get("access_token");

  // An Etsy access token includes your shop/user ID
  // as a token prefix, so we can extract that too
  const user_id = access_token?.split(".")[0];

  const requestOptions = {
    headers: {
      "x-api-key": clientID,
      // Scoped endpoints require a bearer token
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(
    `https://api.etsy.com/v3/application/users/${user_id}`,
    requestOptions
  );

  if (response.ok) {
    const userData = await response.json();
    // Load the template with the first name as a template variable.
    redirect(`/welcome?first_name=${userData.first_name}`);
  } else {
    // Log http status to the console
    console.log(response.status, response.statusText);

    // For non-500 errors, the endpoints return a JSON object as an error response
    const errorData = await response.json();
    console.log(errorData);
    return NextResponse.json({ errorData });
  }
}
