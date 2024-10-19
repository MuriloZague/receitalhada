type CardProps = {
    sources: Array<{ title: string; src: string }>
  };
  
  export default function Card({ sources }: CardProps) {
    return (
      <section className="scroll-container scrollbar scrollbar-thumb-blue-500 flex gap-12 overflow-x-auto whitespace-nowrap pb-6">
        {sources.map((source, index) => (
          <div
            className="flex-shrink-0 w-72 h-32 rounded-2xl inline-block"
            key={index}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${source.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minWidth: '18rem', // Largura mínima definida aqui
            }}
          >
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-xl text-center text-white break-words leading-tight receita">
                {source.title}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }
  