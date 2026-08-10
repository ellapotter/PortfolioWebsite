import { site } from "@/data/portfolio";
import { sectionContainer } from "@/components/ui/sectionLayout";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-pink-200 bg-rose-50 py-8 lg:py-10">
      <div
        className={`flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-12 ${sectionContainer}`}
      >
        <p className="font-mono text-xs text-pink-600 lg:text-sm">
          © {year} {site.name}.
        </p>
        <p className="text-xs text-pink-600 lg:text-sm">{site.role}</p>
      </div>
    </footer>
  );
}
