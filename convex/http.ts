import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Clerk webhook to handle user creation and org membership
// (see clerk dashboard -> configure -> webhooks -> endpoints)
http.route({
  path: "/clerk", // eg https://<convex-deployment>.convex.site/clerk
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      switch (result.type) {
        case "user.created":
            // const tokenId = `https://${process.env.CLERK_ISSUER_URL}|${result.data.id}`;
            // console.log("tokenId", tokenId);
            // console.log("result", result.data);

            // internal.users.createUser -> see convex/users.ts
          await ctx.runMutation(internal.users.createUser, {
            // next_public_clerk_frontend_api: see clerk dashboard -> configure -> api keys -> show api urls
            tokenIdentifier: `https://magical-midge-22.clerk.accounts.dev|${result.data.id}`,
            // tokenIdentifier: `https://${process.env.CLERK_ISSUER_URL}|${result.data.id}`,
            // tokenIdentifier: tokenId,
            // name: `${result.data.first_name ?? ""} ${
            //   result.data.last_name ?? ""
            // }`,
            // image: result.data.image_url,
          });
          break;
        case "organizationMembership.created":
          await ctx.runMutation(internal.users.addOrgIdToUser, {
            tokenIdentifier: `https://${process.env.CLERK_ISSUER_URL}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            // role: result.data.role === "org:admin" ? "admin" : "member",
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;