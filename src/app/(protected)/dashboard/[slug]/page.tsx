import DoubleGradientCard from "@/src/components/global/double-gradient-card";
import { DASHBOARD_CARDS } from "@/src/constants/dashboart";
import { BarDuoToneBlue } from "@/src/icons";
import React from "react";
import Chart from "./_components/Chart";
import MetricsCard from "./_components/matrics/MetricsCard";

type Props = {};

const Page = (props: Props) => {
  //WIP: create the dashboard page

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card) => (
          <DoubleGradientCard key={card.id} {...card} />
        ))}
      </div>

      <div className="border-[1px] relative Oborder-in-active/50 p-5 rounded-xl">
        {" "}
        <span className="flex gap-x-1 z-50 items-center">
          <BarDuoToneBlue />
          <div className="z-50">
            <h2 className="text-2xl font-medium Itext-white">
              {" "}
              Automated Activity
            </h2>
            <p className="text-text-secondary text-sm">
              Automated 0 out of 1 interactions
            </p>{" "}
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg: w-6/12">
            <Chart />
          </div>
          <div className="lg:w-6/12">
            <MetricsCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
