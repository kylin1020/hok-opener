import { heroes } from "@/services/heroes"
import RoomDetailCard from "@/components/room-detail-card"

interface RoomParams {
  params: {
    id: string
  }
}

export default async function RoomPage({ params }: RoomParams) {
  return (
    <RoomDetailCard roomId={params.id} heroes={heroes} />
  );
} 

