import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full  mt-14  bg-custom-foreground text-custom-background text-center p-4">
      
          <p>For the love of the Beautiful Game</p>
          <p>&copy; {currentYear} - By{" "}
              <Link
                  href="https://yalmeida.vercel.app"
              >
              <span className='text-yellow-600 text-h-2 underline'>Yuri Almeida</span>
              </Link>
          </p>
    </footer>
  );
}