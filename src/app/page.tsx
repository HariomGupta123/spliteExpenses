import AuthForm from "./componets/AuthForm";

export default function Home() {
  return (
    <div className=" flex   items-center flex-col justify-center flex-wrap h-[100vh] bg-red-500 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md  bg-red-500  ">
        <h1 className="pt-5 text-center text-3xl font-bold tracking-tight">ShareKharch</h1>

        <AuthForm />

      </div>



    </div>
  );
}
