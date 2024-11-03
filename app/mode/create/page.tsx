import { getHeroes } from "@/services/heroes"
import ConfigFormWithLocalStorage from "@/components/config-form-with-local-storage"

export default async function CreatePage() {
  const heroes = await getHeroes()
  return (
      <ConfigFormWithLocalStorage
        heroes={heroes} 
      />
  )
}

