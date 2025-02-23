interface CardProps {
  title: string;
}

export const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className=" bg-black rounded-2xl p-5 flex flex-col justify-around cursor-pointer">
      <div className="text-4xl font-bold text-white">{title}</div>
    </div>
  );
};
