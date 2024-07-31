export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="p-6 sm:p-10 mt-10 bg-accent flex justify-center">
      <p className="text-sm text-accent-foreground">
        {year} &copy; Amazing Safari by{" "}
        <a href="https://bearmentor.com" target="_blank" className="font-bold">
          🐻 Bearmentor
        </a>
      </p>
    </footer>
  );
}
