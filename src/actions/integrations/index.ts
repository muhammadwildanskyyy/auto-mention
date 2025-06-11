"use server";

import { redirect } from "next/navigation";
import { onCurrentUser } from "../user";
import { createIntegration, getIntegration } from "./queries";
import { generateTokens } from "@/src/lib/fetch";
import axios from "axios";

export const onOAuthInstagram = (strategy: "INSTAGRAM" | "CRM") => {
  if (strategy === "INSTAGRAM") {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string);
  }
};

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser();
  console.log(0);
  try {
    const integration = await getIntegration(user.id);
    console.log(1);
    if (integration && integration.integrations.length === 0) {
      console.log(1.5);
      let token;
      try {
        token = await generateTokens(code);
        console.log("token-->", token);
      } catch (error) {
        console.error("Error saat generateTokens:", error);
        // Bisa juga return atau handle error sesuai kebutuhan
        return { status: 500, error: "Gagal generate token" };
      }

      console.log("token-->", token);
      console.log(2);

      if (token) {
        try {
          const insta_id = await axios.get(
            `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
          );
          console.log(3);

          const today = new Date();
          const expire_date = today.setDate(today.getDate() + 60);
          const create = await createIntegration(
            user.id,
            token.access_token,
            new Date(expire_date),
            insta_id.data.user_id
          );
          console.log(4);
          console.log("create", create);

          return { status: 200, data: create };
        } catch (error) {
          console.log(`error ${error}`);
        }
      }
      console.log("Token not received");
      return { status: 401 };
    } else {
      console.log("integration-->", integration);
      console.log("User sudah punya integrasi.");
      // return { status: 404 };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

// new facebook account
// new email never used before

// create a new instagram account
// using the same credentials that you have used for facebook account.
