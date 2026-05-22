import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sage/30 bg-sage/10 py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="text-sm font-bold text-dark-choc">
            Christmas Dessert Voting
          </Link>
          <nav className="flex gap-6 text-sm text-milk-choc">
            <Link href="/votacoes" className="hover:text-dark-choc transition-colors">
              Votações
            </Link>
            <Link href="/doces" className="hover:text-dark-choc transition-colors">
              Doces
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-milk-choc/60">
          &copy; {new Date().getFullYear()} Christmas Dessert Voting. Feito com
          amor por amantes de sobremesas.
        </div>
      </div>
    </footer>
  );
}
