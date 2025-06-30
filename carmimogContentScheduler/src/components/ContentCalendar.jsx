import { useState } from "react";
import ContentModal from "./ContentModal";

const weekdays = [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

//días por defecto mes actual
const getDaysInMonth = (year, month) => {
    return new Date(year, month  + 1,0).getDate();
};

const ContentCalendar = () => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    //días del mes actual
    const daysInMonth = getDaysInMonth(year, month);
    //día de la semana con el cual empieza el mes
    const firstDayOfMonth = new Date(year, month,1).getDay();

    const blanks = Array(firstDayOfMonth).fill(null);

    const daysArray = Array.from({length: daysInMonth}, (_,i)=> i + 1);


    //modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDDay] = useState(null);

    const openModal = (day) => {
        setSelectedDDay(day);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);
    //simular guardado
    const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      type: form.type.value,
      caption: form.caption.value,
      hashtags: form.hashtags.value,
      notes: form.notes.value,
    };
    console.log("Guardado para el día", selectedDay, data);
    closeModal();
  };

    //cambiar de mes
    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
    };

    return(
        <div className="bg -white p-4 rounded-xl shadow-md col-span-2">
            {/*Título con nombres del mes*/}
            <div className="flex justify-between items-center-mb-4">
                
                <h2 className="text-xl font-bold text-pink-600 mb-4 tracking-wide">📆 Calendario de contenido</h2>
                
                <div className="flex gap-2">

                    <button onClick={()=>changeMonth(-1)} className="text-sm px-2 py-1 bg-gray-200 rounded">← Mes anterior</button>
                    <button onClick={()=> changeMonth(1)} className="text-sm px-2 py-1 bg-gray-200 rounded">Mes siguiente →</button>

                </div>

            </div>
            {/*Encabezado días de la semana*/}
            <div className="grid grid-cols-7 text-center font-semibold mb-2">
                {weekdays.map(day => <div key={day}>{day}</div>)}

            </div>
            {/*Celdas del calendario*/}
            <div className="grid grid-cols-7 gap-1">
                {/*Espacios vacíos*/}
                {blanks.map((_,i) => <div key={`blank-${i}`} className="p-2"/>)}

                {/*días del mes*/}
                {daysArray.map(day =>(
                    <div key={day} className="border rounded p-2 h-24 text-sm flex flex-col justify-between"
                    onClick={()=> openModal(day)}>
                        <div className="font-bold">{day}</div>
                        {/*Tipo de contenido*/}
                        <div className="text-xs text-pink-600">Reel</div>
                        <div className="text-xs text-pink-600">Tiktok</div>
                        <div className="text-xs text-pink-600">Caption</div>
                        <div className="text-xs text-pink-600">Hashtag</div>
                    </div>
                ))}
            </div>
            {/* Modal */}
      <ContentModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedDay={selectedDay}
        onSave={handleSave}
      />
        </div>
    );

};

export default ContentCalendar;
