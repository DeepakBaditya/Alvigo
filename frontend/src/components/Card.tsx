import Link from "next/link";

interface CardProps {
  title: string;
  href: string;
}

export const Card: React.FC<CardProps> = ({ title, href }) => {
  return (
    <Link
      href={href}
      className=" bg-black rounded-2xl p-5 border cursor-pointer"
    >
      <div className="text-2xl font-bold text-white">{title}</div>
    </Link>
  );
};
