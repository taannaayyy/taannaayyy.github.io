import { getCollection, type CollectionEntry } from "astro:content";

/** Published projects, in `order` (then title) order. Drafts are never built. */
export async function getProjects() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort(
    (a, b) =>
      a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)
  );
}

/** URL of a project page. Folder projects (`seniki/index.md`) use the folder name. */
export const projectUrl = (project: CollectionEntry<"projects">) =>
  `/projects/${project.id}/`;
