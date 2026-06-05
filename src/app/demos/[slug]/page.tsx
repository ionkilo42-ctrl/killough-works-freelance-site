import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoLayout } from "@/components/demo-layout";
import { demoDefinitions, getDemoDefinition } from "@/data/demos";

type DemoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return demoDefinitions.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoDefinition(slug);

  if (!demo) {
    return {
      title: "Demo Not Found | Killough Works",
    };
  }

  return {
    title: `${demo.title} | Killough Works`,
    description: demo.cardDescription,
  };
}

export default async function DemoDetailPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = getDemoDefinition(slug);

  if (!demo) {
    notFound();
  }

  return <DemoLayout demo={demo} />;
}
