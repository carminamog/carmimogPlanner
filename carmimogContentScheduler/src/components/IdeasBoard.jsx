import {useState} from "react";

const IdeasBoard = () => {
    //lista de ideas
    const [ideas, setIdeas] = useState([
        {id:1, title: "Idea 1", type: "tipo de idea", used: false},
        {id:2, title: "idea 2", type: "tipo de idea", used:false},
    ]);

    //formulario
    const [newIdea, setNewIdea] = useState("");
    const [newType, setNewType] = useState("tech");

    // Agrega una nueva idea
    const handleAddIdea = (e) => {
    e.preventDefault();
    if (newIdea.trim() === "") return;
    const idea = {
      id: Date.now(),
      title: newIdea,
      type: newType,
      used: false,
    };
    setIdeas([idea, ...ideas]);
    setNewIdea("");
    setNewType("tech");
  };

  // Marcar una idea como usada
  const toggleUsed = (id) => {
    setIdeas(ideas.map(i =>
      i.id === id ? { ...i, used: !i.used } : i
    ));
  };


  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 transition-all hover:shadow-xl">
      <h2 className="text-xl font-bold text-pink-600 mb-4 tracking-wide">💡 Ideas de Contenido</h2>

      {/* Formulario para agregar una idea nueva */}
      <form onSubmit={handleAddIdea} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Escribe una idea..."
          className="border p-2 rounded w-full"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="tech">Tech</option>
          <option value="storytelling">Storytelling</option>
          <option value="tutorial">Tutorial</option>
          <option value="trend">Trend</option>
          <option value="otro">Otro</option>
        </select>
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl shadow-sm transition-all">
          Agregar
        </button>
      </form>

      {/* Lista de ideas */}
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className={`border p-2 rounded flex justify-between items-center ${
              idea.used ? "bg-gray-100 text-gray-500 line-through" : ""
            }`}
          >
            <div>
              <span className="font-semibold">{idea.title}</span>
              <span className="text-sm ml-2 text-gray-400">({idea.type})</span>
            </div>
            <button
              onClick={() => toggleUsed(idea.id)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-lg transition-all">
            
              {idea.used ? "Recuperar" : "Usado"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default IdeasBoard;