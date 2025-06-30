import { useState } from "react";

const HashtagBoard = () => {
  // Lista de grupos con hashtags
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Tech & programación",
      tags: ["#programadora", "#techtok", "#desarrolloweb"],
    },
    {
      id: 2,
      name: "Crecimiento y engagement",
      tags: ["#fyp", "#parati", "#viral"],
    },
  ]);

  // Estado para nuevo grupo y hashtag
  const [newGroup, setNewGroup] = useState("");
  const [newTag, setNewTag] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Crear un nuevo grupo
  const handleAddGroup = () => {
    if (!newGroup.trim()) return;
    setGroups([{ id: Date.now(), name: newGroup, tags: [] }, ...groups]);
    setNewGroup("");
  };

  // Agregar un hashtag a un grupo específico
  const handleAddTag = () => {
    if (!newTag.trim() || selectedGroup === null) return;
    setGroups(groups.map(group =>
      group.id === selectedGroup
        ? { ...group, tags: [...group.tags, newTag] }
        : group
    ));
    setNewTag("");
  };

  // Copiar hashtags de un grupo
  const copyTags = (tags) => {
    navigator.clipboard.writeText(tags.join(" ")).then(() => {
      alert("📋 Hashtags copiados");
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
      <h2 className="text-xl font-semibold mb-3">🏷️ Hashtag Board</h2>

      {/* Crear nuevo grupo */}
      <div className="flex mb-3 gap-2">
        <input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Nuevo grupo"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAddGroup} className="bg-pink-500 text-white px-3 rounded">
          Crear
        </button>
      </div>

      {/* Seleccionar grupo y agregar hashtag */}
      <div className="flex mb-4 gap-2">
        <select
          value={selectedGroup ?? ""}
          onChange={(e) => setSelectedGroup(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="#nuevohashtag"
          className="border p-2 rounded"
        />
        <button onClick={handleAddTag} className="bg-gray-800 text-white px-3 rounded">
          +
        </button>
      </div>

      {/* Mostrar grupos con sus hashtags */}
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.id} className="border rounded p-3 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{group.name}</h3>
              <button
                onClick={() => copyTags(group.tags)}
                className="text-sm text-blue-600 hover:underline">
              
                Copiar
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {group.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagBoard;
