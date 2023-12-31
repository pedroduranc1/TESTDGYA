import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../assets/services";
import { ArrowBigRightIcon, Check, Lock } from "lucide-react";

export const Contabilidad = () => {
  const { User } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  return (
    <MainLayout>
      <div className="h-full mb-[3.9%] w-full px-[2%] ">
        {/* cartas de servicios */}
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-4 bg-white shadow-md rounded-md p-8 mt-8">
          {services.map((servicio, index) => (
            <Link
              key={index}
              to="/Contabilidad"
              className="relative flex flex-col w-full p-5 bg-slate-100 rounded-md shadow-md "
            >
              {servicio.Plan == User?.UserPlan ? (
                ""
              ) : (
                <div className="absolute w-10 h-10 flex items-center justify-center -right-2 -top-2 bg-white rounded-full shadow-md">
                  <Lock className="w-5 h-5" />
                </div>
              )}

              <h2 className="text-2xl font-bold mb-5">
                {servicio.description}
              </h2>

              <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-10">
                {servicio.contents.map((content, contentIndex) => (
                  <div
                    className="flex gap-3 items-center w-full"
                    key={contentIndex}
                  >
                    <Check className="m-1" />

                    <li className="w-[80%] text-xs flex gap-x-2 items-center text-slate-800">
                      {content.title}
                    </li>
                  </div>
                ))}
              </ul>

              <div className="absolute left-[4%] bottom-[6%] flex items-end w-full">
                Haz click aqui para empezar tramite <ArrowBigRightIcon />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
