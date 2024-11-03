import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* 现有代码... */}
        
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/create-room')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            新建房间
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            返回主页
          </button>
        </div>
      </div>
    </nav>
  );
} 