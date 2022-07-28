import Link from "next/link";
import Image from "next/image";

export default function GameCard({ nameGame, imageGame, urlGame }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
      <Link href={urlGame}>
        <a>
          <Image
            src={imageGame}
            priority={true}
            width={400}
            height={400}
            alt={nameGame}
          />
        </a>
      </Link>
      <Link href={urlGame}>
        <a className="flex items-center justify-center px-5 py-3 mb-4 space-x-1 text-lg font-semibold transition-colors duration-150 rounded-md text-slate-300 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500">
          <span>Play</span>
          <span>{nameGame}</span>
        </a>
      </Link>
    </div>
  );
}
