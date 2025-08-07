import { useState } from "react";
import ContentModal from "./ContentModal";
import styled from "styled-components";
import { useLocalStorage } from '../useLocalStorage';

const [posts, setPosts] = useLocalStorage("contentPosts", {});



const weekdays = [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

//días por defecto mes actual
const getDaysInMonth = (year, month) => {
    return new Date(year, month  + 1,0).getDate();
};

const CalendarContainer = styled.div`
  background: #fff0fb;
  padding: 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-family: 'Inter', sans-serif;
  color: #333;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #e75480;
  letter-spacing: 0.5px;
`;
const NavButton = styled.button`
  font-size: 0.875rem;
  padding: 0.4rem 0.75rem;
  background: #f0f0f0;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    background: #f9e1f2;
  }
`;
const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const DayCell = styled.div`
  border: 1px solid #f2c4e0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  height: 6rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #fff7fb;
  }
`;

const DayNumber = styled.div`
  font-weight: bold;
`;

const Tag = styled.div`
  font-size: 0.65rem;
  color: #c71585;
`;

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

//     const [posts, setPosts] = useState(() => {
//   const saved = localStorage.getItem('contentPosts');
//   return saved ? JSON.parse(saved) : {};
// });


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
            time: form.time.value,
            caption: form.caption.value,
            hashtags: form.hashtags.value,
            notes: form.notes.value,
        };
        setPosts((prev) => ({
    ...prev,
    [selectedDay]: data,
  }));
    console.log("Guardado para el día", selectedDay, data);
    closeModal();
  };

    //cambiar de mes
    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
    };

    const getColorByType = (type) => {
  switch (type) {
    case "Reel":
      return "#ccf6fd"; // azul
    case "Tiktok":
      return "#e0ccfd"; // morado
    case "Carrusel":
      return "#f9fdcc"; // amarillo
    case "Post":
      return "#ccfdcd"; // verde
    default:
      return "#fdcccc"; // durazno por defecto
  }
};

    return(
        <CalendarContainer>
            {/*Título con nombres del mes*/}
            <Header>
                
                <Title>📆 Calendario de contenido</Title>
                
                <div>

                    <NavButton onClick={()=>changeMonth(-1)} className="text-sm px-2 py-1 bg-gray-200 rounded">← Mes anterior</NavButton>
                    <NavButton onClick={()=> changeMonth(1)} className="text-sm px-2 py-1 bg-gray-200 rounded">Mes siguiente →</NavButton>

                </div>

            </Header>
            {/*Encabezado días de la semana*/}
            <Weekdays>
                {weekdays.map(day => <div key={day}>{day}</div>)}

            </Weekdays>
            {/*Celdas del calendario*/}
            <DaysGrid>
                {/*Espacios vacíos*/}
                {blanks.map((_,i) => <div key={`blank-${i}`} className="p-2"/>)}

                {/*días del mes*/}
                {daysArray.map((day) => {
  const post = posts[day];

  return (
    <DayCell
      key={day}
      onClick={() => openModal(day)}
      style={{
        backgroundColor: post ? getColorByType(post.type) : "white",
        color: "#1f2937",
      }}
    >
      <DayNumber>{day}</DayNumber>

      {post ? (
        <>
          <Tag><strong>{post.type}</strong></Tag>
          {post.time && <Tag>⏰ {post.time}</Tag>}
        </>
      ) : (
        <>
          {/* <Tag>Reel</Tag>
          <Tag>Tiktok</Tag>
          <Tag>Caption</Tag>
          <Tag>Hashtag</Tag> */}
        </>
      )}
    </DayCell>
  ); })}

            </DaysGrid>
            {/* Modal */}
      <ContentModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedDay={selectedDay}
        onSave={handleSave}
      />
        </CalendarContainer>
    );

};

export default ContentCalendar;
