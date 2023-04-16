import { FormEvent, useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { IFoodDTO } from '../../dtos/foodDTO'
import { IFood } from '../../@types/food'

interface IModalEditFood {
  isOpen: boolean
  setIsOpen: () => void
  editingFood: IFoodDTO
  handleUpdateFood: (food: IFood) => Promise<void>
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: IModalEditFood) {
  const [image, setImage] = useState(editingFood.image)
  const [name, setName] = useState(editingFood.name)
  const [price, setPrice] = useState(editingFood.price)
  const [description, setDescription] = useState(editingFood.description)

  async function handleSubmit() {
    handleUpdateFood({
      image,
      name,
      price,
      description,
    })

    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
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
          onChange={(event) => setPrice(event.target.value)}
        />

        <Input
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
