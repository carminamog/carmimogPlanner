import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: #fff0fb;
  padding: 2rem;
  border-radius: 1.25rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Inter', sans-serif;
  position: relative;
`

const Title = styled.h2`
  font-size: 1.25rem;
  color: #d63384;
  font-weight: 700;
  margin-bottom: 1rem;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f8bbd0;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    background: #ec4899;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.25rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #f3c2d6;
  border-radius: 0.5rem;
  font-size: 0.9rem;
`

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #f3c2d6;
  border-radius: 0.5rem;
  font-size: 0.9rem;
`

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #f3c2d6;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  resize: vertical;
`

const SaveButton = styled.button`
  background-color: #d63384;
  color: white;
  padding: 0.6rem;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #c2185b;
  }
`

const ContentModal = ({ isOpen, onClose, selectedDay, onSave }) => {
  if (!isOpen) return null

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Editar contenido – Día {selectedDay}</Title>
        <Form onSubmit={onSave}>
          <div>
            <Label>Tipo de contenido</Label>
            <Select name="type" required>
              <option value="">Selecciona uno</option>
              <option value="Reel">Reel</option>
              <option value="Tiktok">Tiktok</option>
              <option value="Carrusel">Carrusel</option>
              <option value="Post">Post</option>
            </Select>
          </div>
          <div>
            <Label>Hora de publicación</Label>
            <Input name="time" type="time" />
          </div>
          <div>
            <Label>Caption</Label>
            <Textarea name="caption" rows="2" />
          </div>
          <div>
            <Label>Hashtags</Label>
            <Input name="hashtags" placeholder="#dev #creadora" />
          </div>
          <div>
            <Label>Notas</Label>
            <Textarea name="notes" rows="2" />
          </div>
          <SaveButton type="submit">Guardar</SaveButton>
        </Form>
      </ModalContainer>
    </Overlay>
  )
}

export default ContentModal
