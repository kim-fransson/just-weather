export interface CardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

export const Card = ({ title, value, icon }: CardProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/32 p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-900/60 body">{title}</h2>
        <span className="whitespace-nowrap text-gray-900 headline-md">
          {value}
        </span>
      </div>
      <span className="opacity-60 [&>svg]:h-8 [&>svg]:w-8">{icon}</span>
    </div>
  );
};
