import AuthForm from "./componets/AuthForm";

export default function Home() {
  return (
    <div className=" flex  p-15 items-center flex-col justify-between flex-wrap bg-red-500 h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md h-full "> <h1 className="pt-5 text-center text-3xl font-bold tracking-tight">spliteWise</h1></div>

      <AuthForm />

    </div>
  );
}
