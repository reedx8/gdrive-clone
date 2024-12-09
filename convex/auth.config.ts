// Tells clerk who to communicate with to get a Clerk token and authneticate it against clerk 
export default {
    providers: [
      {
        domain: "https://magical-midge-22.clerk.accounts.dev",
        applicationID: "convex",
      },
    ]
  };