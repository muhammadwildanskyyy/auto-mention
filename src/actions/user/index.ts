"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/src/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import { stripe } from "@/src/lib/stripe";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect("./sign-in");

  return user;
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  console.log("run 1");
  console.log(user.id);
  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.emailAddresses[0].emailAddress);

  try {
    const found = await findUser(user.id);
    console.log("run 2");
    console.log(found);

    if (found) {
      if (found.integrations.length > 0) {
        console.log("run 2.5");
        const today = new Date();
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime();

        const days = Math.round(time_left / (1000 * 3600 * 24));

        if (days < 5) {
          console.log("#refresh#");

          const refresh = await refreshToken(found.integrations[0].token);
          if (!refresh) {
            console.log("refresh failed");
          }
          const today = new Date();
          const expire_date = today.setDate(today.getDate() + 60);

          const update_token = await updateIntegration(
            refresh.access_token,
            new Date(expire_date),
            found.integrations[0].id
          );
          

          if (!update_token) {
            console.log("Update token failed");
          }
          else {
            console.log("update_token succes");
          }
        }
      }
      console.log("run 3");

      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }
    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses[0].emailAddress
    );
    return {
      status: 201,
      data: created,
    };
  } catch (error) {
    console.log("error in onboarding the user-->", error);
    return { status: 500 };
  }
};

export const onUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    if (profile)
      return {
        status: 200,
        data: profile,
      };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const onSubscribe = async (session_id: string) => {
  const user = await onCurrentUser();
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session) {
      const subscribed = await updateSubscription(user.id, {
        customerId: session.customer as string,
        plan: "PRO",
      });

      if (subscribed) return { status: 200 };
      return { status: 401 };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
