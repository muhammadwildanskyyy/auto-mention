import Sidebar from "@/src/components/global/sidebar";
import React from "react";
import Navbar from "@/src/components/global/navbar";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  PrefetchUserAutomations,
  PrefetchUserProfile,
} from "@/src/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};
const layout = async ({ children, params }: Props) => {
  const query = new QueryClient();

  // helper function, prefetch all data for different server actions.
  await PrefetchUserProfile(query);

  await PrefetchUserAutomations(query);
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3">
        {/* Sidebar */}
        <Sidebar slug={params.slug} />

        {/* Infobar */}
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          <Navbar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default layout;
