import type { NowBuildingProject } from "@/data/site";

type NowBuildingProjectProps = {
  project: NowBuildingProject;
};

export function NowBuildingProjectBlock({ project }: NowBuildingProjectProps) {
  return (
    <section className="editorial-block now-building-block" id="now-building">
      <p className="block-eyebrow">Now Building</p>
      <h2>{project.name}</h2>
      <p className="project-status">{project.status}</p>
      <p className="block-lede">{project.summary}</p>
      <p className="project-collaboration-note">{project.collaborationNote}</p>
      <p className="block-cta">
        <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">
          {project.githubLabel} →
        </a>
      </p>
    </section>
  );
}