import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-mark">H</span>
      <span className="logo-text">Huddle</span>
    </Link>
  );
}
