type CardProps = {
    sources: Array<{ title: string; src: string }>
  };
  
  export default function Card({ sources }: CardProps) {

    return (

      <section className="scroll-container scrollbar scrollbar-thumb-blue-500 flex gap-10 overflow-x-auto py-6 ease-out px-2">
        {sources.map((source, index) => (
          <div
            className="flex-shrink-0 w-64 h-32 rounded-2xl inline-block hover:scale-105"
            key={index}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${source.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: "pointer",
              transition: '350ms'
            }}
          >
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-xl text-center text-white max-w-40 leading-tight receita">
                {source.title}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }
  