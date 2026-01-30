const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-800 text-white py-8" role="contentinfo">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {year} Max Boksem. All rights reserved.</p>
        <nav className="mt-4" aria-label="Social links">
          <a
            href="https://www.linkedin.com/in/maxboksem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white mx-2 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/maxboksem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white mx-2 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

