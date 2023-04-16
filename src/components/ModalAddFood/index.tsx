import { useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { IFood } from '../../@types/food'
import { checkIfIsNumeric } from '../../utils/checkIfIsNumber'

interface IModalAddFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleAddFood: (food: IFood) => Promise<void>
}

export function ModalAddFood({
  handleAddFood,
  isOpen,
  setIsOpen,
}: IModalAddFoodProps) {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit() {
    handleAddFood({
      image,
      name,
      price,
      description,
    })
    setImage('')
    setName('')
    setPrice('')
    setDescription('')
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={price}
          onChange={(event) =>
            checkIfIsNumeric(Number(event.target.value)) &&
            setPrice(event.target.value)
          }
        />

        <Input
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
