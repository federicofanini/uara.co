import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo-uara.svg" alt="logo" width={16} height={16} />
      <span className="text-xl font-mono font-semibold tracking-wider">
        uara.co
      </span>
    </div>
  );
}
