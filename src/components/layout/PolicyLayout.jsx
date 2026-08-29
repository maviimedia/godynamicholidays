export default function PolicyLayout({ title, highlight, lastUpdated, sidebarLinks, children }) {
  return (
    <div className="py-10 text-gray-800 font-sans bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold m-0 text-gray-900">
            {title} <span className="text-orange-500">{highlight}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 border-b-2 border-orange-500 inline-block pb-1">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          <aside className="sticky top-[100px] bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="text-base font-semibold mb-3">Contents</h3>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-sm text-gray-600 font-medium py-2 px-3 rounded-md transition-all hover:bg-white hover:text-orange-500 hover:shadow-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>
          <article className="w-full">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}