import { ConfigFormComponent } from "@/components/config-form"
import { getHeroes } from "@/services/heroes"

export default async function DefinePage() {
  const heroes = await getHeroes()
  return <ConfigFormComponent heroes={heroes} />
}