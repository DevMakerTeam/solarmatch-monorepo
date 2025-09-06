import { Button } from "@repo/ui";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-blue-100">
      <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500">WEB (pages router)</h1>
        <p className="text-green-600 text-lg">Tailwind 테스트</p>
        <Button>Shared UI Button</Button>
        <div className="w-20 h-20 bg-yellow-400 mx-auto rounded-full"></div>
      </div>
    </main>
  );
}