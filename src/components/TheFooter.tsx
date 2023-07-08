export default function TheFooter() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-100 text-gray-30 text-xs">
      <div className="container mx-auto flex justify-between py-2.5 px-4">
        <div>
          <span className="font-semibold">Brain EQ</span>
          <span> - 1.0.1</span>
        </div>
        <div>
          <span>
            by{' '}
            <a
              href="https://www.youtube.com/watch?v=F6sC8qlRaHQ&ab_channel=L.M."
              target="_blank"
              className="font-semibold hover:opacity-80 hover:transition-all"
              rel="noreferrer"
            >
              enjilo
            </a>{' '}
            &{' '}
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              target="_blank"
              className="font-semibold hover:opacity-80 hover:transition-all"
              rel="noreferrer"
            >
              lilya
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
