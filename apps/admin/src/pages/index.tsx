import { Button } from "@repo/ui";

export default function AdminHome() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ADMIN (pages router)</h1>
        <Button>Shared UI Button</Button>
      </div>
    </main>
  );
}