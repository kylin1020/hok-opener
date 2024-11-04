import { heroes } from "@/services/heroes"
import ConfigFormWithLocalStorage from "@/components/config-form-with-local-storage"

export default async function CreatePage() {
  return (
      <ConfigFormWithLocalStorage
        heroes={heroes} 
      />
  )
}

