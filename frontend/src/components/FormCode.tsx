import React, { useRef, useState } from "react";

export default function CodeInput() {

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) { // Verifica se é um número (ou vazio)
      const newCode = [...code];
      newCode[index] = value.slice(-1); // Apenas 1 caractere por input
      setCode(newCode);
  
      // Move para o próximo input
      if (value.length === 1 && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join(""); // Juntar o código
    console.log("Código:", finalCode);

  };

  return (
    <div className="flex justify-center flex-wrap gap-2">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric" // teclado numérico em dispositivos móveis
              pattern="[0-9]*"
              maxLength={1}
              className="w-[5rem] h-[6rem] tsm:w-[2.9rem] tsm:h-[4rem] tsm:text-2xl lg:mx-1 tsm:mx-[3px] mx-2 ring-2 ring-black rounded text-center text-3xl outline-none focus:ring-4 focus:ring-orange-500"              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={code[index]}
            />
          ))}
        </div>
        <div className="mb-5 mt-5 w-full">
          <button type="submit" className="bg-orange-500 w-full text-white inter text-2xl font-bold p-2 mb-5 rounded-md tsm:text-xl">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};