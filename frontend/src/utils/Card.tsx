import { useCards } from "./CardsContext";
  
export default function Card() {

  const { cards } = useCards();

  return (
    <section className="scroll-container scrollbar scrollbar-thumb-blue-500 flex gap-10 tsm:gap-6 overflow-x-auto py-6 ease-out px-2">
      {cards.map((source, index) => (
        <div
          className="flex-shrink-0 w-64 tsm:w-44 h-32 tsm:h-24 rounded-2xl inline-block hover:scale-105"
          key={index}
          style={{
            boxShadow: '0 5px 5px 0 rgba(0,0,0,.14)',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${source.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: "pointer",
            transition: '350ms'
          }}
        >

          <div className="flex w-full h-full items-center justify-center">
            <p className="text-xl tsm:text-base text-center text-white max-w-40 leading-tight receita">
              {source.title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
  