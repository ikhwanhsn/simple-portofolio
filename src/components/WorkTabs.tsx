"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";

const Experience = dynamic(() => import("@/components/Experience"));
const Projects = dynamic(() => import("@/components/Projects"));
const Misc = dynamic(() => import("@/components/Misc"));
const Skills = dynamic(() => import("@/components/Skills"));

const tabs = [
  { id: "agents", label: "Agents" },
  { id: "work", label: "Selected work" },
  { id: "misc", label: "Misc." },
  { id: "stack", label: "Tech Stack" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const WorkTabs = () => {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("agents");

  return (
    <section className="mt-12">
      <nav
        className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-greyText border-b border-outline pb-3"
        role="tablist"
        aria-label="Work sections"
      >
        {tabs.map((tab, index) => {
          const selected = active === tab.id;

          return (
            <span key={tab.id} className="inline-flex items-center gap-2">
              <button
                type="button"
                role="tab"
                id={`${baseId}-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`cursor-pointer underline-offset-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text ${
                  selected
                    ? "font-bold text-text border-b border-text"
                    : "hover:text-text hover:border-b hover:border-greyText"
                }`}
              >
                {tab.label}
              </button>
              {index < tabs.length - 1 && <span aria-hidden>/</span>}
            </span>
          );
        })}
      </nav>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-${active}`}
        className="mt-6"
      >
        {active === "agents" && <Experience embedded />}
        {active === "work" && <Projects embedded />}
        {active === "misc" && <Misc embedded />}
        {active === "stack" && <Skills embedded />}
      </div>
    </section>
  );
};

export default WorkTabs;
