export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Satyam.dev
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Built with Next.js + TypeScript
        </p>
      </div>
    </footer>
  );
}