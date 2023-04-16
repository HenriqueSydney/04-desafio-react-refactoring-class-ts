import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import api from '../../services/api'
import { Food } from '../../components/Food'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'
import { IFoodDTO } from '../../dtos/foodDTO'
import { IFood } from '../../@types/food'

export function Dashboard() {
  const [foods, setFoods] = useState<IFoodDTO[]>([])
  const [editingFood, setEditingFood] = useState<IFoodDTO>({} as IFoodDTO)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  async function handleAddFood(food: IFood) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      const addedFood: IFoodDTO = response.data

      setFoods((oldState) => [...oldState, addedFood])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: IFood) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter((food) => food.id !== id)

    setFoods(foodsFiltered)
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food: IFoodDTO) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  useEffect(() => {
    api.get('/foods').then((data) => setFoods(data.data))
  }, [])

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
