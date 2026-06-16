import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-mark">
        <img
          src="https://brand.huddlesurety.co/logo/md-light-transparent.svg"
          alt=""
        />
      </span>
      <span className="logo-text">Huddle</span>
    </Link>
  );
}
