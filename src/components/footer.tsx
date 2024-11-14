"use client";


interface FooterProps {
  currentYear: number;
}

const Footer: React.FC<FooterProps> = ({ currentYear }) => {
  return (
    <footer className="p-4 sm:p-8 bg-green-300 text-center text-green-800">
        <p className="text-green-800">
          &copy; {currentYear} Shrekky boy. Öll réttindi étin.
        </p>
    </footer>
  );
};

export default Footer;
