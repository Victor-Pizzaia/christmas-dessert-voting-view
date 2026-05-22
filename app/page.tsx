import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-dark-choc sm:text-5xl">
          Desafios de{" "}
          <span className="text-cherry">Sobremesas</span> com os Amigos
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-milk-choc">
          Crie concursos de doces, compartilhe um link e veja quem faz a
          melhor sobremesa. Votação anônima por categorias!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center rounded-xl bg-strawberry px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-cherry hover:shadow-xl"
          >
            Começar Agora
          </Link>
          <Link
            href="/votacoes"
            className="inline-flex items-center rounded-xl border border-sage px-8 py-3 text-base font-semibold text-milk-choc transition-all hover:bg-caramel/30 hover:text-dark-choc"
          >
            Ver Votações
          </Link>
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-3">
        <div className="rounded-2xl bg-rose/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-strawberry text-2xl">
            🎂
          </div>
          <h3 className="text-lg font-bold text-dark-choc">
            Crie Desafios
          </h3>
          <p className="mt-2 text-sm text-milk-choc">
            Monte um concurso de sobremesas, defina categorias e convide
            amigos pra participar.
          </p>
        </div>

        <div className="rounded-2xl bg-lavender/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lavender text-2xl">
            🔗
          </div>
          <h3 className="text-lg font-bold text-dark-choc">
            Compartilhe o Link
          </h3>
          <p className="mt-2 text-sm text-milk-choc">
            Cada votação tem um link único. Compartilhe com quem quiser
            participar.
          </p>
        </div>

        <div className="rounded-2xl bg-caramel/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-caramel text-2xl">
            🗳️
          </div>
          <h3 className="text-lg font-bold text-dark-choc">
            Vote & Descubra
          </h3>
          <p className="mt-2 text-sm text-milk-choc">
            Votação anônima por categorias. No final, veja o ranking dos
            melhores doces.
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-rose p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-dark-choc sm:text-3xl">
          Pronto para começar?
        </h2>
        <p className="mt-2 text-milk-choc">
          Crie sua primeira votação em segundos e convite seus amigos.
        </p>
        <div className="mt-6">
          <Link
            href="/register"
            className="inline-flex items-center rounded-xl bg-strawberry px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-cherry hover:shadow-xl"
          >
            Criar Votação Grátis
          </Link>
        </div>
      </section>
    </div>
  );
}
