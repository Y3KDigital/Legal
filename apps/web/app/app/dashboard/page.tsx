export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Projects</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Approvals</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Recent Projects</h2>
          </div>
          <div className="p-6 text-center text-gray-500">
            No projects yet. Create your first project to get started.
          </div>
        </div>
      </main>
    </div>
  );
}
