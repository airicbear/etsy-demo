export default function Home() {
  const redirectUri = "http://localhost:3000/api/oauth/redirect";
  const authUrl = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${redirectUri}&scope=email_r&client_id=${process.env.CLIENT_ID}&state=${process.env.STATE}&code_challenge=${process.env.CODE_CHALLENGE}&code_challenge_method=S256`;

  return (
    <main>
      <h1>Etsy Demo</h1>
      <a href={authUrl}>Authenticate with Etsy</a>
    </main>
  );
}
