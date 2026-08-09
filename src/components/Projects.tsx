import { profile } from "@/data/profile";

type ProjectsProps = {
  embedded?: boolean;
};

const Projects = ({ embedded = false }: ProjectsProps) => {
  return (
    <div className={embedded ? undefined : "mt-14"}>
      {!embedded && (
        <h2 className="font-mono text-xs text-greyText">Selected work</h2>
      )}

      <div className={embedded ? "mt-0" : "mt-4"}>
        <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
          <p className="font-mono text-xs text-greyText">Products</p>
          <p className="font-mono text-[11px] text-greyText">
            {profile.projects.length} shipped
          </p>
        </div>

        <ul>
          {profile.projects.map((item, index) => (
            <li key={item.name} className="border-b border-outline">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="inline-flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-[11px] text-greyText shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-medium leading-snug group-hover:text-greyText group-hover:underline group-hover:underline-offset-4 group-hover:decoration-outline">
                      {item.name}
                    </h3>
                    <span
                      className="shrink-0 text-greyText opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-greyText">
                    {item.year}
                  </span>
                </div>
                <p className="mt-2 pl-8 font-medium text-greyText leading-relaxed">
                  {item.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
