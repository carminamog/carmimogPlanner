import { useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from '../useLocalStorage';

const [ideas, setIdeas] = useLocalStorage("plannerIdeas", []);


// 🎀 Estilos base
const Container = styled.div`
  background-color: #fff4fa;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #d63384;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Emoji = styled.span`
  font-size: 1.5rem;
`;

const IdeaList = styled.ul`
  list-style: none;
  padding: 0;
`;

const IdeaItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.used ? "#fce4ec" : "#fff")};
  border: 1px solid #f8bbd0;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  transition: background 0.3s;
`;

const IdeaText = styled.span`
  font-size: 0.95rem;
  color: ${(props) => (props.used ? "#aaa" : "#333")};
  text-decoration: ${(props) => (props.used ? "line-through" : "none")};
`;

const UseButton = styled.button`
  background-color: ${(props) => (props.used ? "#e0e0e0" : "#ec4899")};
  color: #fff;
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.used ? "#d6d6d6" : "#db2777")};
  }
`;

const Form = styled.form`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #f3c2d6;
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  background-color: #d63384;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c2185b;
  }
`;

const FilterButton = styled.button`
  margin-top: 0.75rem;
  background-color: #fce4ec;
  color: #d63384;
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #ffe6ef;
  }
`;

const IdeasBoard = () => {
  const [ideas, setIdeas] = useState([
    { text: "Tips de productividad para devs", used: false },
    { text: "Behind the scenes de edición", used: false },
    { text: "Mi rutina tech diaria", used: false },
  ]);

  const [newIdea, setNewIdea] = useState("");
  const [showOnlyUnused, setShowOnlyUnused] = useState(false);

  const toggleUsed = (index) => {
    const updated = [...ideas];
    updated[index].used = !updated[index].used;
    setIdeas(updated);
  };

  const handleAddIdea = (e) => {
    e.preventDefault();
    if (newIdea.trim() === "") return;

    setIdeas([...ideas, { text: newIdea.trim(), used: false }]);
    setNewIdea("");
  };

  const filteredIdeas = showOnlyUnused
    ? ideas.filter((idea) => !idea.used)
    : ideas;

  return (
    <Container>
      <Title>
        <Emoji>💡</Emoji> Ideas de contenido
      </Title>

      <Form onSubmit={handleAddIdea}>
        <Input
          type="text"
          placeholder="Agregar nueva idea..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <AddButton type="submit">Agregar</AddButton>
      </Form>

      <FilterButton onClick={() => setShowOnlyUnused((prev) => !prev)}>
        {showOnlyUnused ? "Ver todas las ideas" : "Ver solo ideas no usadas"}
      </FilterButton>

      <IdeaList>
        {filteredIdeas.map((idea, i) => (
          <IdeaItem key={i} used={idea.used}>
            <IdeaText used={idea.used}>{idea.text}</IdeaText>
            <UseButton used={idea.used} onClick={() => toggleUsed(i)}>
              {idea.used ? "Usada" : "Marcar como usada"}
            </UseButton>
          </IdeaItem>
        ))}
      </IdeaList>
    </Container>
  );
};

export default IdeasBoard;
