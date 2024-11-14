"use client";


interface FooterProps {
  currentYear: number;
}

const Footer: React.FC<FooterProps> = ({ currentYear }) => {
  return (
    <footer className="p-4 sm:p-8 bg-secondary text-center text-green-800">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-green-800">
          &copy; {currentYear} Shrekky boy. Öll réttindi étin.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
