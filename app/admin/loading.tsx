export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-4 border-[#1a73e8] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-sm text-gray-600">Загрузка админ-панели...</p>
      </div>
    </div>
  )
}
