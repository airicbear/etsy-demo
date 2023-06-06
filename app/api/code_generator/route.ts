import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // The next two functions help us generate the code challenge
  // required by Etsy’s OAuth implementation.
  const base64URLEncode = (str: Buffer) =>
    str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const sha256 = (buffer: crypto.BinaryLike) =>
    crypto.createHash("sha256").update(buffer).digest();

  // We’ll use the verifier to generate the challenge.
  // The verifier needs to be saved for a future step in the OAuth flow.
  const codeVerifier = base64URLEncode(crypto.randomBytes(32));

  // With these functions, we can generate
  // the values needed for our OAuth authorization grant.
  const codeChallenge = base64URLEncode(sha256(codeVerifier));
  const state = Math.random().toString(36).substring(7);

  const redirectUri = "http://localhost:3000/api/oauth/redirect";
  const fullUrl = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${redirectUri}&scope=email_r&client_id=${process.env.CLIENT_ID}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  console.log(`State: ${state}`);
  console.log(`Code challenge: ${codeChallenge}`);
  console.log(`Code verifier: ${codeVerifier}`);
  console.log(`Full URL: ${fullUrl}`);

  return NextResponse.json({
    state: state,
    code_challenge: codeChallenge,
    code_verifier: codeVerifier,
    full_url: fullUrl,
  });
}
