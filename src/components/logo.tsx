import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo-uara.svg" alt="logo" width={24} height={24} />
      <span className="text-2xl font-mono font-semibold tracking-wider">
        uara.co
      </span>
    </div>
  );
}
