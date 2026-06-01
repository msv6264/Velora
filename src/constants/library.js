import {
  TvMinimalPlay,
  FileText,
  GitBranch,
  Layout,
} from "lucide-react";

export const STATUS_CONFIG = {
  not_started: {
    label: "Not Started",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  revisit_needed: {
    label: "Revisit Needed",
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
};

export const suggestions = [
  "Research",
  "Dev Tools",
  "Design Inspo",
  "AI & ML",
  "Web Dev",
];

export const RESOURCE_CATEGORIES = [
  { id: "Article", icon: <FileText size={16} /> },
  { id: "Video", icon: <TvMinimalPlay size={16} /> },
  { id: "Repository", icon: <GitBranch size={16} /> },
  { id: "PDF", icon: <GitBranch size={16} /> },
  { id: "Courses", icon: <GitBranch size={16} /> },
  { id: "Tool", icon: <Layout size={16} /> },
];

export const filterArr = [
  "All",
  "Articles",
  "Videos",
  "Repositories",
  "PDFs",
  "Courses",
  "Tools",
];

export const catFilterMap = {
  Articles: "Article",
  Videos: "Video",
  Repositories: "Repository",
  PDFs: "PDF",
  Courses: "Course",
  Tools: "Tool",
};