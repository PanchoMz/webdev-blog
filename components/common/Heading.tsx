interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
}

const Heading = ({ title, subtitle, center, lg, md }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {lg && <h1 className="font-bold text-4xl my-2">{title}</h1>}
      {md && <h2 className="font-bold text-3xl my-2">{title}</h2>}
      {!lg && !md && <h3 className="font-bold text-2xl my-2">{title}</h3>}
      {subtitle && <p className="text-gray-600 text-sm mt-2">{subtitle}</p>}
    </div>
  );
};

export default Heading;
