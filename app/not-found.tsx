import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-slate-600">The page you are looking for is unavailable or has moved.</p>
      <Button asChild href="/">Browse colleges</Button>
    </section>
  );
}
