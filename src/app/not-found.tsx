import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-fg-muted">
          The page you&apos;re looking for may have moved or the link may be out of date.
        </p>
        <Button href="/" variant="primary" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
