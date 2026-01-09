import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | The AI-Powered Resume Analyzer" },
  ];
}

export default function Home() {
  return <div>Home</div>
}
