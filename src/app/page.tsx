import AuthForm from "./componets/AuthForm";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-500 px-4">
      <div className="w-full sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-800">
          ShareKharch
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
