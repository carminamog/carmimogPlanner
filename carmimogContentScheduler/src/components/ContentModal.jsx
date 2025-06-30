const ContentModal = ({ isOpen, onClose, selectedDay, onSave}) =>{
    if(!isOpen) return null;

    const handleInsideClick = (e) => e.stopPropagation();

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md" onClick={handleInsideClick}>
        <h2 className="text-xl font-bold text-pink-600 mb-4 tracking-wide">✏️ Editar contenido del día {selectedDay}</h2>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Tipo de contenido</label>
            <select name="type" className="w-full border p-2 rounded">
              <option>Reel</option>
              <option>TikTok</option>
              <option>Post</option>
              <option>Carrusel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Caption</label>
            <textarea name="caption" rows="2" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Hashtags</label>
            <input name="hashtags" type="text" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Notas</label>
            <textarea name="notes" rows="2" className="w-full border p-2 rounded" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="px-3 py-1 bg-pink-500 text-white rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default ContentModal;