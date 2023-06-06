import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = "https://openapi.etsy.com/v3/application/openapi-ping";

  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.CLIENT_ID!,
    },
  };

  const response = await fetch(url, requestOptions);

  const data = await response.json();

  return NextResponse.json({ data });
}
