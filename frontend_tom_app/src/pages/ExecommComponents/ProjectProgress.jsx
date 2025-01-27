import React from "react";
import BorderLinearProgress from "../../components/BorderLinearProgress";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckBadgeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ButtonIcon from "../../components/ButtonIcon";
BorderLinearProgress;
const ProjectProgress = () => {
  const projects = [
    {
      name: "MindBreakers",
      progress: 100,
    },
    {
      name: "SAGSAR",
      progress: 50,
    },
    {
      name: "CWSAP",
      progress: 32,
    },
    {
      name: "Outreach",
      progress: 0,
    },
  ];

  return (
    <>
      <div className="bg-white p-5  rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="mb-2">
            <p>Project Status</p>
          </div>

          <ButtonIcon text="Add Project" icon={PlusIcon} />
        </div>
        <div className="">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex hover:bg-gray-100 cursor-pointer items-center border-b mb-1 p-5 rounded-lg group"
            >
              <div>
                <h5>{project.name}</h5>
              </div>
              <div className="w-2/4 ml-auto">
                {project.progress < 100 ? (
                  <>
                    <div className="text-gray-500 gap-1 flex text-xs mb-1">
                      <div>Progress:</div>
                      <div className="text-amber-500">{project.progress}%</div>
                    </div>
                    <BorderLinearProgress
                      className=""
                      variant="determinate"
                      value={project.progress}
                    />
                  </>
                ) : (
                  <>
                    <div className="ml-auto flex gap-1 items-center bg-green-400 text-white text-[8pt] w-fit py-1 px-2 rounded-xl ">
                      Done
                      <CheckBadgeIcon className="size-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectProgress;
