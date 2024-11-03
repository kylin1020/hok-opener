import { getHeroes } from "@/services/heroes"
import RoomDetailCard from "@/components/room-detail-card"

interface RoomParams {
  params: {
    id: string
  }
}

export default async function RoomPage({ params }: RoomParams) {
  const heroes = await getHeroes()
  return (
    <RoomDetailCard roomId={params.id} heroes={heroes} />
  );
} 

